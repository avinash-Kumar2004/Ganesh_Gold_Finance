import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../Common/Navbaar";

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  en: {
    title:"GOLD LOAN Calculator", subtitle:"Calculate your loan eligibility instantly",
    name:"Full Name", email:"Email ID", contact:"Contact No.", select_state:"Select State",
    pincode:"Pin Code", metal:"Metal Type", gold:"Gold", silver:"Silver", platinum:"Platinum",
    gold_type:"Gold Purity", weight:"Weight (grams)", amount_req:"Amount Required (₹)",
    generate_otp:"Calculate Eligibility",
    note:"#Note: Approximate value. Final amount depends on branch valuation.",
    pop_greeting:"Hello", pop_total_gold:"Your Metal Value", pop_required:"Amount You Need",
    pop_eligible:"Eligible Loan Amount", pop_based:"Based on current market price",
    pop_ok:"Apply Now", pop_close:"Close", pop_congrats:"Great News!",
    select_gold_type:"Select Purity", select_metal:"Select Metal",
    fetching:"Fetching live prices...", live_rate:"Live Rate", approx:"Approx",
  },
  hi: {
    title:"गोल्ड लोन कैलकुलेटर", subtitle:"तुरंत अपनी लोन पात्रता जानें",
    name:"पूरा नाम", email:"ईमेल आईडी", contact:"संपर्क नंबर", select_state:"राज्य चुनें",
    pincode:"पिन कोड", metal:"धातु प्रकार", gold:"सोना", silver:"चांदी", platinum:"प्लेटिनम",
    gold_type:"सोने की शुद्धता", weight:"वजन (ग्राम)", amount_req:"आवश्यक राशि (₹)",
    generate_otp:"पात्रता जांचें",
    note:"#नोट: यह अनुमानित मूल्य है। अंतिम राशि शाखा मूल्यांकन पर निर्भर करती है।",
    pop_greeting:"नमस्ते", pop_total_gold:"आपके धातु का मूल्य", pop_required:"आपकी जरूरत",
    pop_eligible:"पात्र लोन राशि", pop_based:"वर्तमान बाजार भाव पर आधारित",
    pop_ok:"अभी आवेदन करें", pop_close:"बंद करें", pop_congrats:"बधाई हो!",
    select_gold_type:"शुद्धता चुनें", select_metal:"धातु चुनें",
    fetching:"लाइव कीमत...", live_rate:"लाइव दर", approx:"अनुमानित",
  },
  mr: {
    title:"गोल्ड लोन कॅल्क्युलेटर", subtitle:"तत्काळ कर्ज पात्रता तपासा",
    name:"पूर्ण नाव", email:"ईमेल आयडी", contact:"संपर्क क्रमांक", select_state:"राज्य निवडा",
    pincode:"पिन कोड", metal:"धातू प्रकार", gold:"सोने", silver:"चांदी", platinum:"प्लॅटिनम",
    gold_type:"सोन्याची शुद्धता", weight:"वजन (ग्रॅम)", amount_req:"आवश्यक रक्कम (₹)",
    generate_otp:"पात्रता तपासा",
    note:"#नोंद: हे अंदाजे मूल्य आहे. अंतिम रक्कम शाखा मूल्यांकनावर अवलंबून आहे.",
    pop_greeting:"नमस्कार", pop_total_gold:"तुमच्या धातूचे मूल्य", pop_required:"तुम्हाला हवी असलेली रक्कम",
    pop_eligible:"पात्र कर्ज रक्कम", pop_based:"सध्याच्या बाजारभावावर आधारित",
    pop_ok:"आता अर्ज करा", pop_close:"बंद करा", pop_congrats:"अभिनंदन!",
    select_gold_type:"शुद्धता निवडा", select_metal:"धातू निवडा",
    fetching:"लाइव किंमत...", live_rate:"लाइव दर", approx:"अंदाजे",
  },
};
["gu","te","ta","kn","as","ur"].forEach(l => { T[l] = T.en; });

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const OZ_TO_GRAM = 31.1035;
const LTV = 0.75;
const PURITY_MULT = {
  gold:     { "24K":1, "22K":22/24, "18K":18/24 },
  silver:   { "999":1, "925":0.925, "800":0.8 },
  platinum: { "950":0.95, "900":0.9, "850":0.85 },
};
const SUBTYPES = {
  gold:["24K","22K","18K"], silver:["999","925","800"], platinum:["950","900","850"],
};
const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
  "Chandigarh","Puducherry",
];

// ─────────────────────────────────────────────────────────────────────────────
// LIVE PRICE FETCH — tumhare backend se aata hai
// Backend → GoldAPI.io (real INR gold price) + cached 1 hr
// CORS issue nahi kyunki backend call kar raha hai, browser nahi
// ─────────────────────────────────────────────────────────────────────────────
async function fetchLivePrices() {
  const fallback = { gold24k:8800, silver999:98, platinum950:3100, isLive:false };
  try {
    const res = await fetch("http://localhost:3000/api/metal-prices", {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error("backend price failed");
    const data = await res.json();
    if (!data.gold24k || data.gold24k < 1000) throw new Error("bad price data");
    return data;
  } catch {
    return fallback;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SILENT DATA SEND — apna backend URL yahan dalo
// ─────────────────────────────────────────────────────────────────────────────
async function silentSend(payload) {
  try {
    await fetch("http://localhost:3000/api/loan-leads", {
      // ↑ Dev mein localhost:3000, production mein apna domain dalo
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString(), source:"gold-loan-calculator" }),
    });
  } catch { /* silent fail */ }
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type="info", ms=3000) => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type, on:false }]);
    setTimeout(() => setToasts(p => p.map(t => t.id===id ? {...t,on:true} : t)), 20);
    setTimeout(() => {
      setToasts(p => p.map(t => t.id===id ? {...t,on:false} : t));
      setTimeout(() => setToasts(p => p.filter(t => t.id!==id)), 450);
    }, ms);
  };
  return { toasts, show };
}

const Toasts = ({ toasts }) => (
  <div style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", zIndex:9999, display:"flex", flexDirection:"column", gap:8, alignItems:"center", pointerEvents:"none" }}>
    {toasts.map(t => (
      <div key={t.id} style={{
        padding:"11px 22px", borderRadius:50, fontWeight:700, fontSize:13, color:"#fff",
        display:"flex", alignItems:"center", gap:8, whiteSpace:"nowrap",
        background: t.type==="success" ? "#16a34a" : t.type==="error" ? "#dc2626" : "#1f2937",
        boxShadow:"0 8px 32px rgba(0,0,0,0.22)",
        transition:"all 0.35s cubic-bezier(.34,1.4,.64,1)",
        opacity: t.on ? 1 : 0,
        transform: t.on ? "translateY(0) scale(1)" : "translateY(-14px) scale(0.9)",
      }}>
        {t.type==="success" ? "✅" : t.type==="error" ? "❌" : "ℹ️"} {t.msg}
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// FORM FIELD — proper floating label, no text-on-text
// ─────────────────────────────────────────────────────────────────────────────
const Field = ({ label, type="text", value, onChange, maxLength, err, children }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || (value !== undefined ? !!value : false);

  const wrapStyle = { position:"relative", paddingTop:18, marginBottom:0 };
  const labelS = {
    position:"absolute", left:0, top: lifted ? 0 : 18,
    fontSize: lifted ? 11 : 14, fontWeight: lifted ? 700 : 400,
    color: lifted ? (err ? "#dc2626" : "#c0392b") : "#aaa",
    transition:"all 0.18s ease", pointerEvents:"none", lineHeight:1, zIndex:1,
    whiteSpace:"nowrap",
  };
  const lineBase = {
    width:"100%", border:"none", borderBottom:`1.5px solid ${focused ? "#c0392b" : err ? "#dc2626" : "#ddd"}`,
    background:"transparent", padding:"4px 0 6px", fontSize:14, fontWeight:500,
    color:"#111", outline:"none", display:"block", boxSizing:"border-box",
  };
  const bar = {
    position:"absolute", bottom:0, left:0, height:2,
    width: focused ? "100%" : "0%",
    background:"linear-gradient(to right,#c0392b,#e67e22)",
    transition:"width 0.28s ease",
  };

  if (children) {
    // select
    return (
      <div style={wrapStyle}>
        <label style={labelS}>{label}</label>
        <select value={value} onChange={onChange}
          style={{ ...lineBase, appearance:"none", cursor:"pointer", color: value ? "#111" : "transparent" }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        >
          {children}
        </select>
        <div style={{ position:"absolute", right:4, bottom:10, pointerEvents:"none", color:"#aaa" }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div style={bar} />
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <label style={labelS}>{label}</label>
      <input type={type} value={value} onChange={onChange} maxLength={maxLength}
        style={lineBase}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      />
      <div style={bar} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA SECTION
// Large screen (≥1024): person big on left, balance/video small bottom-right of left panel
// Small screen (<1024): person2 + video stacked
// ─────────────────────────────────────────────────────────────────────────────
const MediaSection = ({ isMobile }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); setAnimKey(k => k+1); }
      else setVis(false);
    }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const slideIn = (from, delay="0s") => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translate(0,0)" : `translate(${from})`,
    transition:`opacity 0.65s ease ${delay}, transform 0.65s cubic-bezier(.34,1.1,.64,1) ${delay}`,
  });

  if (!isMobile) {
    // ── LARGE SCREEN ── person1 big + video small bottom-right
    return (
      <div ref={ref} style={{
        position:"relative", width:"44%", flexShrink:0, minHeight:360,
        background:"linear-gradient(135deg,#fff6f6 0%,#fff 60%,#fffbeb 100%)",
        overflow:"hidden", display:"flex", alignItems:"flex-end",
      }}>
        {/* blob decorations */}
        <div style={{ position:"absolute", top:10, left:10, width:100, height:100, borderRadius:"50%", background:"radial-gradient(#fecaca88,transparent)", filter:"blur(30px)" }} />
        <div style={{ position:"absolute", bottom:30, right:10, width:110, height:110, borderRadius:"50%", background:"radial-gradient(#fef3c788,transparent)", filter:"blur(30px)" }} />

        {/* Person1 — big, left side, bottom-aligned */}
        <div key={`p${animKey}`} style={{ ...slideIn("-60px,0","0.05s"), position:"absolute", left:0, bottom:0, zIndex:2 }}>
          <img
            src="/Calculate/person1.png" alt="Advisor"
            onError={e => e.target.style.display="none"}
            style={{ height:"clamp(260px,34vw,360px)", width:"auto", objectFit:"contain", filter:"drop-shadow(0 8px 18px rgba(0,0,0,0.12))" }}
          />
        </div>

        {/* Video — bottom right corner of left panel */}
        <div key={`v${animKey}`} style={{ ...slideIn("0,50px","0.2s"), position:"absolute", bottom:12, right:12, zIndex:3, width:"46%" }}>
          <video
            src="/Calculate/video.mp4"
            autoPlay loop muted playsInline
            style={{ width:"100%", borderRadius:14, objectFit:"cover", maxHeight:160, boxShadow:"0 4px 18px rgba(0,0,0,0.14)", border:"2px solid rgba(255,255,255,0.85)" }}
          />
        </div>
      </div>
    );
  }

  // ── SMALL SCREEN ── person2 left + video right, same row, smaller
  return (
    <div ref={ref} style={{
      position:"relative", width:"100%",
      background:"linear-gradient(135deg,#fff6f6 0%,#fff 60%,#fffbeb 100%)",
      overflow:"hidden", display:"flex", flexDirection:"row", alignItems:"flex-end",
      minHeight:180,
    }}>
      <div style={{ position:"absolute", top:8, left:8, width:70, height:70, borderRadius:"50%", background:"radial-gradient(#fecaca88,transparent)", filter:"blur(24px)" }} />

      {/* Person2 */}
      <div key={`ps${animKey}`} style={{ ...slideIn("-40px,0","0.05s"), flex:"0 0 48%", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
        <img
          src="/Calculate/person2.png" alt="Advisor"
          onError={e => e.target.style.display="none"}
          style={{ height:"clamp(130px,28vw,190px)", width:"auto", objectFit:"contain", filter:"drop-shadow(0 6px 14px rgba(0,0,0,0.12))" }}
        />
      </div>

      {/* Video */}
      <div key={`vs${animKey}`} style={{ ...slideIn("40px,0","0.18s"), flex:"0 0 48%", padding:"0 10px 10px 0", display:"flex", alignItems:"flex-end" }}>
        <video
          src="/Calculate/video.mp4"
          autoPlay loop muted playsInline
          style={{ width:"100%", borderRadius:12, objectFit:"cover", maxHeight:120, boxShadow:"0 3px 14px rgba(0,0,0,0.12)", border:"2px solid rgba(255,255,255,0.85)" }}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// POPUP — fixed, no cut-off, scrollable
// ─────────────────────────────────────────────────────────────────────────────
const Popup = ({ open, onClose, data, t }) => {
  if (!open || !data) return null;
  const fmt = n => new Intl.NumberFormat("en-IN",{ style:"currency", currency:"INR", maximumFractionDigits:0 }).format(n);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(5px)" }} />
      <div style={{
        position:"relative", background:"#fff", borderRadius:22,
        width:"100%", maxWidth:410,
        maxHeight:"calc(100vh - 40px)", overflowY:"auto",
        boxShadow:"0 32px 80px rgba(0,0,0,0.25)",
        animation:"popIn 0.38s cubic-bezier(.34,1.56,.64,1) forwards",
        zIndex:1,
      }}>
        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#f59e0b,#dc2626)", padding:"28px 24px 42px", textAlign:"center", position:"relative", overflow:"hidden", borderRadius:"22px 22px 0 0" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.1) 10px,rgba(255,255,255,.1) 11px)" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:38, marginBottom:6 }}>🏆</div>
            <h2 style={{ color:"#fff", fontWeight:900, fontSize:19, margin:0 }}>{t("pop_congrats")}</h2>
            <p style={{ color:"rgba(255,255,255,0.88)", fontSize:13, margin:"6px 0 0" }}>{t("pop_greeting")}, {data.name}!</p>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:"0 18px 20px", marginTop:-22 }}>
          <div style={{ background:"#fff", borderRadius:14, boxShadow:"0 4px 18px rgba(0,0,0,0.08)", border:"1px solid #f0f0f0", overflow:"hidden" }}>
            {[
              { label:t("pop_total_gold"), value:fmt(data.goldValue), icon:"💰", sub:null },
              { label:t("pop_required"),   value:fmt(data.required),  icon:"📋", sub:null },
            ].map((row,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"15px 18px", borderBottom:"1px solid #f5f5f5" }}>
                <div>
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:1.8, color:"#aaa", textTransform:"uppercase", margin:0 }}>{row.label}</p>
                  <p style={{ fontSize:19, fontWeight:900, color:"#111", margin:"3px 0 0" }}>{row.value}</p>
                </div>
                <span style={{ fontSize:26 }}>{row.icon}</span>
              </div>
            ))}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"15px 18px", background:"linear-gradient(to right,#fff1f2,#fffbeb)", borderRadius:"0 0 14px 14px" }}>
              <div>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:1.8, color:"#dc2626", textTransform:"uppercase", margin:0 }}>{t("pop_eligible")}</p>
                <p style={{ fontSize:22, fontWeight:900, color:"#b91c1c", margin:"3px 0 2px" }}>{fmt(data.eligible)}</p>
                <p style={{ fontSize:10, color:"#aaa", margin:0 }}>{t("pop_based")}</p>
                {data.isLive && (
                  <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:9, color:"#16a34a", fontWeight:700, marginTop:4 }}>
                    <span style={{ width:5, height:5, borderRadius:"50%", background:"#16a34a", display:"inline-block", animation:"blink 1.4s infinite" }} />
                    {t("live_rate")}
                  </span>
                )}
              </div>
              <span style={{ fontSize:34 }}>🎯</span>
            </div>
          </div>

          <div style={{ display:"flex", gap:10, marginTop:14 }}>
            <button onClick={onClose} style={{ flex:1, padding:"12px 0", borderRadius:10, border:"2px solid #e5e7eb", background:"#fff", color:"#555", fontWeight:700, fontSize:13, cursor:"pointer" }}>
              {t("pop_close")}
            </button>
            <button onClick={onClose} style={{ flex:2, padding:"12px 0", borderRadius:10, border:"none", background:"linear-gradient(to right,#dc2626,#b91c1c)", color:"#fff", fontWeight:900, fontSize:13, cursor:"pointer", boxShadow:"0 4px 16px rgba(220,38,38,0.28)" }}>
              {t("pop_ok")}
            </button>
          </div>
        </div>

        <button onClick={onClose} style={{ position:"absolute", top:12, right:12, width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.22)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <style>{`
        @keyframes popIn { from{opacity:0;transform:scale(.82) translateY(24px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function Calculate() {
  let lang = "en";
  let t = k => T.en[k] ?? k;
  try {
    const ctx = useLanguage?.();
    if (ctx?.lang) { lang = ctx.lang; t = k => T[lang]?.[k] ?? T.en[k] ?? k; }
  } catch {}

  const [form, setForm] = useState({ name:"", email:"", contact:"", state:"", pincode:"", metal:"", subtype:"", weight:"", amount:"" });
  const [errors, setErrors]   = useState({});
  const [showPop, setShowPop] = useState(false);
  const [popData, setPopData] = useState(null);
  const [rates, setRates]     = useState(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 1024);
  const { toasts, show:toast } = useToast();

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    fetchLivePrices().then(r => { setRates(r); setRatesLoading(false); });
  }, []);

  const setF = f => e => { setForm(p => ({...p,[f]:e.target.value})); setErrors(p => ({...p,[f]:false})); };
  const setMetal = e => { setForm(p => ({...p,metal:e.target.value,subtype:""})); setErrors(p => ({...p,metal:false,subtype:false})); };

  const baseRate = metal => {
    if (!rates) return { gold:8800, silver:98, platinum:3100 }[metal]||8800;
    return { gold:rates.gold24k, silver:rates.silver999, platinum:rates.platinum950 }[metal]||rates.gold24k;
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name=true;
    if (!form.email.includes("@")||!form.email.includes(".")) e.email=true;
    if (!/^\d{10}$/.test(form.contact)) e.contact=true;
    if (!form.state) e.state=true;
    if (!/^\d{6}$/.test(form.pincode)) e.pincode=true;
    if (!form.metal) e.metal=true;
    if (!form.subtype) e.subtype=true;
    if (!form.weight||isNaN(form.weight)||+form.weight<=0) e.weight=true;
    return e;
  };

  const handleSubmit = () => {
    const e = validate(); setErrors(e);
    const n = Object.keys(e).length;
    if (n) { toast(`Please fill ${n} required field${n>1?"s":""}`, "error"); return; }

    const rate      = baseRate(form.metal) * (PURITY_MULT[form.metal]?.[form.subtype]??1);
    const goldValue = Math.round(rate * parseFloat(form.weight));
    const eligible  = Math.round(goldValue * LTV);
    const required  = form.amount && +form.amount>0 ? +form.amount : eligible;

    silentSend({ ...form, goldValue, eligible, required, lang });
    toast("Calculating your eligibility...", "success", 2000);
    setTimeout(() => { setPopData({ name:form.name, goldValue, eligible, required, isLive:rates?.isLive }); setShowPop(true); }, 700);
  };

  const metalOpts   = ["gold","silver","platinum"].map(v => ({ v, l:t(v) }));
  const subtypeOpts = form.metal ? SUBTYPES[form.metal].map(s => ({ v:s, l:s })) : [];
  const pgRate      = form.metal && form.subtype ? Math.round(baseRate(form.metal) * (PURITY_MULT[form.metal]?.[form.subtype]??1)) : null;

  // ── grid gap consistent with image reference ──
  const formGap = isMobile ? "18px 14px" : "22px 28px";

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#fafafa 0%,#fff1f2 55%,#fffbeb 100%)", padding:"28px 16px", fontFamily:"inherit" }}>
      <Toasts toasts={toasts} />

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <h1 style={{ fontSize:"clamp(19px,2.8vw,28px)", fontWeight:900, color:"#111", letterSpacing:-0.4, margin:0 }}>{t("title")}</h1>
        <p style={{ color:"#888", fontSize:13, marginTop:7, marginBottom:0 }}>{t("subtitle")}</p>
        <div style={{ width:72, height:3, borderRadius:2, background:"linear-gradient(to right,#c0392b,#e67e22)", margin:"10px auto 0" }} />

        {/* Live ticker */}
        <div style={{ marginTop:10, display:"inline-flex", alignItems:"center", gap:7, background:"#fff", border:"1px solid #efefef", borderRadius:40, padding:"5px 14px", fontSize:11.5, color:"#666", boxShadow:"0 2px 6px rgba(0,0,0,0.05)" }}>
          {ratesLoading ? (
            <><span style={{ width:6, height:6, borderRadius:"50%", background:"#ccc", display:"inline-block" }} />{t("fetching")}</>
          ) : (
            <>
              <span style={{ width:6, height:6, borderRadius:"50%", background: rates?.isLive?"#16a34a":"#f59e0b", display:"inline-block", animation: rates?.isLive ? "blink2 2s infinite" : "none" }} />
              <span>Gold ₹{rates?.gold24k?.toLocaleString("en-IN")}/g &nbsp;|&nbsp; Silver ₹{rates?.silver999?.toLocaleString("en-IN")}/g &nbsp;|&nbsp; Platinum ₹{rates?.platinum950?.toLocaleString("en-IN")}/g</span>
              {!rates?.isLive && <span style={{ color:"#f59e0b" }}>({t("approx")})</span>}
            </>
          )}
        </div>
      </div>

      {/* Main Card */}
      <div style={{
        maxWidth:980, margin:"0 auto", background:"#fff", borderRadius:24,
        boxShadow:"0 20px 60px rgba(200,50,50,0.07), 0 3px 14px rgba(0,0,0,0.05)",
        border:"1px solid #f0f0f0", overflow:"hidden",
        display:"flex", flexDirection: isMobile ? "column" : "row",
      }}>

        {/* LEFT: Media */}
        <MediaSection isMobile={isMobile} />

        {/* RIGHT: Form */}
        <div style={{ flex:1, padding: isMobile ? "22px 18px 26px" : "28px 32px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:formGap }}>

            {/* Full Name */}
            <Field label={`${t("name")}*`} value={form.name} onChange={setF("name")} err={errors.name} />
            {/* Email */}
            <Field label={`${t("email")}*`} type="email" value={form.email} onChange={setF("email")} err={errors.email} />
            {/* Contact */}
            <Field label={`${t("contact")}*`} type="tel" maxLength={10} value={form.contact} onChange={setF("contact")} err={errors.contact} />
            {/* State */}
            <Field label={`${t("select_state")}*`} value={form.state} onChange={setF("state")} err={errors.state}>
              <option value="">{t("select_state")}</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </Field>
            {/* Pincode */}
            <Field label={`${t("pincode")}*`} type="tel" maxLength={6} value={form.pincode} onChange={setF("pincode")} err={errors.pincode} />
            {/* Metal */}
            <Field label={`${t("metal")}*`} value={form.metal} onChange={setMetal} err={errors.metal}>
              <option value="">{t("select_metal")}</option>
              {metalOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </Field>
            {/* Purity */}
            <Field label={`${form.metal==="gold" ? t("gold_type") : t("select_gold_type")}*`} value={form.subtype} onChange={setF("subtype")} err={errors.subtype}>
              <option value="">{form.metal ? t("select_gold_type") : "—"}</option>
              {subtypeOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </Field>
            {/* Amount */}
            <div style={{ position:"relative" }}>
              <Field label={t("amount_req")} type="number" value={form.amount} onChange={setF("amount")} />
              {pgRate && (
                <span style={{ position:"absolute", right:0, bottom:6, fontSize:10, color:"#16a34a", fontWeight:700, display:"flex", alignItems:"center", gap:3 }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:"#16a34a", display:"inline-block", animation:"blink2 2s infinite" }} />
                  ₹{pgRate.toLocaleString("en-IN")}/g
                </span>
              )}
            </div>
            {/* Weight — full width */}
            <div style={{ gridColumn:"1 / -1" }}>
              <Field label={`${t("weight")}*`} type="number" value={form.weight} onChange={setF("weight")} err={errors.weight} />
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop:26, display:"flex", flexDirection:"column", alignItems: isMobile ? "stretch" : "flex-end", gap:7 }}>
            <button
              onClick={handleSubmit}
              style={{
                padding:"13px 42px", borderRadius:50, border:"none",
                background:"linear-gradient(to right,#dc2626,#b91c1c)",
                color:"#fff", fontWeight:900, fontSize:14, cursor:"pointer",
                boxShadow:"0 8px 22px rgba(220,38,38,0.3)", letterSpacing:0.2,
                transition:"transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="scale(1.03)"; e.currentTarget.style.boxShadow="0 12px 28px rgba(220,38,38,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 8px 22px rgba(220,38,38,0.3)"; }}
              onMouseDown={e => e.currentTarget.style.transform="scale(0.97)"}
              onMouseUp={e => e.currentTarget.style.transform="scale(1.02)"}
            >
              {t("generate_otp")}
            </button>
            <p style={{ fontSize:10, color:"#aaa", margin:0, textAlign: isMobile ? "center" : "right", maxWidth:340, lineHeight:1.6 }}>{t("note")}</p>
          </div>
        </div>
      </div>

      <Popup open={showPop} onClose={() => setShowPop(false)} data={popData} t={t} />

      <style>{`
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes blink2 { 0%,100%{opacity:1} 50%{opacity:.4} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}