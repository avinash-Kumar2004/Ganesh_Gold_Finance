import { useEffect, useRef, useState } from "react";

function PersonWithPhone() {
  return (
    <svg viewBox="0 0 300 420" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", filter: "drop-shadow(4px 8px 24px rgba(0,0,0,0.18))" }}>
      <ellipse cx="150" cy="380" rx="90" ry="50" fill="rgba(0,0,0,0.08)"/>
      <rect x="105" y="290" width="90" height="100" rx="8" fill="#C2440A"/>
      <path d="M95 180 Q80 240 85 310 Q120 340 155 330 Q185 320 200 300 Q205 240 195 180 Z" fill="#D4540C" opacity="0.95"/>
      <path d="M95 185 Q80 242 86 312" stroke="#F5C842" strokeWidth="4" strokeDasharray="6,4"/>
      <path d="M195 185 Q208 242 200 302" stroke="#F5C842" strokeWidth="4" strokeDasharray="6,4"/>
      <path d="M108 178 Q108 160 150 158 Q192 160 192 178 L195 205 Q150 215 105 205 Z" fill="#B03008"/>
      <rect x="138" y="138" width="24" height="28" rx="8" fill="#D4956A"/>
      <ellipse cx="150" cy="115" rx="38" ry="44" fill="#D4956A"/>
      <path d="M112 100 Q112 60 150 55 Q188 60 188 100 Q188 85 180 78 Q165 68 150 70 Q135 68 120 78 Q112 85 112 100 Z" fill="#1a0a00"/>
      <circle cx="150" cy="88" r="3.5" fill="#B91C1C"/>
      <ellipse cx="137" cy="112" rx="5" ry="6" fill="#c07850" opacity="0.5"/>
      <ellipse cx="163" cy="112" rx="5" ry="6" fill="#c07850" opacity="0.5"/>
      <circle cx="137" cy="111" r="3" fill="#2a1800"/>
      <circle cx="163" cy="111" r="3" fill="#2a1800"/>
      <path d="M140 124 Q150 130 160 124" stroke="#8B3A1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="112" cy="120" r="4" fill="#F5C842" opacity="0.9"/>
      <circle cx="188" cy="120" r="4" fill="#F5C842" opacity="0.9"/>
      <circle cx="150" cy="72" r="4" fill="#F5C842"/>
      <line x1="150" y1="76" x2="150" y2="88" stroke="#F5C842" strokeWidth="1.2"/>
      <path d="M192 175 Q230 190 240 230 Q242 250 238 265" stroke="#D4956A" strokeWidth="22" strokeLinecap="round"/>
      <ellipse cx="236" cy="272" rx="14" ry="18" fill="#D4956A"/>
      <ellipse cx="222" cy="245" rx="14" ry="5" fill="none" stroke="#F5C842" strokeWidth="3"/>
      <ellipse cx="222" cy="252" rx="14" ry="5" fill="none" stroke="#B91C1C" strokeWidth="2"/>
      <rect x="218" y="210" width="52" height="88" rx="7" fill="#1a1a2e" stroke="#444" strokeWidth="1.5"/>
      <rect x="221" y="215" width="46" height="78" rx="5" fill="#0f3460"/>
      <rect x="224" y="218" width="40" height="10" rx="2" fill="#B91C1C"/>
      <text x="244" y="226" textAnchor="middle" fontSize="4.5" fill="white" fontFamily="sans-serif" fontWeight="700">Ganesh Finance</text>
      {[0,1,2,3].map(j => (
        <rect key={j} x={224+(j%2)*21} y={232+Math.floor(j/2)*14} width="18" height="11" rx="2"
          fill={j===0?"#F5C842":j===1?"#22a86b":j===2?"#B91C1C":"#2563eb"} opacity="0.85"/>
      ))}
      <text x="244" y="262" textAnchor="middle" fontSize="3.5" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif">Apply for Loan</text>
      <rect x="228" y="264" width="32" height="8" rx="3" fill="#B91C1C"/>
      <text x="244" y="270" textAnchor="middle" fontSize="3.5" fill="white" fontFamily="sans-serif" fontWeight="700">GET LOAN →</text>
      <rect x="234" y="212" width="16" height="3" rx="1.5" fill="#111"/>
      <path d="M108 175 Q75 200 72 235" stroke="#D4956A" strokeWidth="20" strokeLinecap="round"/>
      <ellipse cx="71" cy="245" rx="12" ry="14" fill="#D4956A"/>
      <ellipse cx="79" cy="228" rx="12" ry="4" fill="none" stroke="#F5C842" strokeWidth="2.5"/>
      <ellipse cx="79" cy="234" rx="12" ry="4" fill="none" stroke="#B91C1C" strokeWidth="2"/>
      <path d="M128 158 Q150 170 172 158" stroke="#F5C842" strokeWidth="2" fill="none"/>
      <circle cx="150" cy="168" r="4" fill="#F5C842"/>
    </svg>
  );
}

function AppMockup({ visible }) {
  return (
    <div style={{
      width: "clamp(90px,18vw,130px)",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 12px 40px rgba(0,0,0,0.22), 0 0 0 2px rgba(0,0,0,0.08)",
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) rotate(-3deg)" : "translateY(20px) rotate(-3deg)",
      transition: "all 0.6s cubic-bezier(.34,1.1,.64,1) 0.8s",
      flexShrink: 0,
    }}>
      <div style={{ background:"#B91C1C", padding:"6px 10px 5px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:"clamp(5px,1.5vw,8px)", color:"#fff", fontWeight:700, letterSpacing:1 }}>GANESH FINANCE</span>
        <div style={{ display:"flex", gap:2 }}>
          {[1,2,3].map(i=><div key={i} style={{ width:3, height:3, borderRadius:"50%", background:"#FFD632" }}/>)}
        </div>
      </div>
      <div style={{ background:"linear-gradient(135deg,#FFF3CC,#FFE066)", padding:"7px 8px" }}>
        <div style={{ fontSize:"clamp(5px,1.2vw,7px)", fontWeight:800, color:"#7A4F00" }}>GOLD LOAN</div>
        <div style={{ fontSize:"clamp(9px,2.2vw,13px)", fontWeight:900, color:"#B91C1C", lineHeight:1.1 }}>Instant<br/>Approval</div>
        <div style={{ fontSize:"clamp(4px,1vw,6px)", color:"#555", marginTop:2 }}>Get loan in 30 minutes</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3, padding:"5px 7px" }}>
        {[
          { icon:"⚡", label:"Quick\nLoan", color:"#FFF3CC" },
          { icon:"🔒", label:"Safe\nVault", color:"#E8F5E9" },
          { icon:"📊", label:"Track\nLoan", color:"#E3F2FD" },
          { icon:"💰", label:"Low\nRates", color:"#FCE4EC" },
        ].map(f=>(
          <div key={f.label} style={{ background:f.color, borderRadius:5, padding:"4px 3px", textAlign:"center" }}>
            <div style={{ fontSize:"clamp(8px,2vw,13px)" }}>{f.icon}</div>
            <div style={{ fontSize:"clamp(4px,0.9vw,5.5px)", fontWeight:700, color:"#333", whiteSpace:"pre-line", lineHeight:1.2 }}>{f.label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"3px 7px 7px" }}>
        <div style={{ background:"#B91C1C", borderRadius:6, padding:"4px 0", textAlign:"center", fontSize:"clamp(5px,1.2vw,7px)", fontWeight:800, color:"#fff", letterSpacing:1 }}>APPLY NOW →</div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon:"📱", text:"Digital Loan Apply"   },
  { icon:"⚡", text:"30-Min Disbursal"     },
  { icon:"🔔", text:"SMS/WhatsApp Alerts"  },
  { icon:"📊", text:"Live Portfolio Track" },
];

export default function DigitalInitiativeSlide() {
  const ref   = useRef(null);
  const [vis,  setVis]    = useState(false);
  const [step, setStep]   = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        let s = 0;
        const id = setInterval(() => { s++; setStep(s); if (s >= 8) clearInterval(id); }, 120);
      } else { setVis(false); setStep(0); }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Josefin+Sans:wght@300;400;600;700&display=swap');

        @keyframes di-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes di-float {
          0%,100% { transform: translateY(0px) rotate(-3deg); }
          50%     { transform: translateY(-8px) rotate(-3deg); }
        }
        @keyframes di-glow {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%     { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes di-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes di-spark {
          0%,100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50%     { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes di-slide-left {
          from { opacity:0; transform: translateX(-22px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes di-slide-up {
          from { opacity:0; transform: translateY(16px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes di-person {
          from { opacity:0; transform: translateX(30px); }
          to   { opacity:1; transform: translateX(0); }
        }
        .di-chip { transition: transform 0.2s, box-shadow 0.2s; cursor:default; }
        .di-chip:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 4px 16px rgba(185,28,28,0.2); }
        .di-cta { border:none; cursor:pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .di-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(185,28,28,0.4) !important; }
      `}</style>

      <div ref={ref} style={{
        width: "100%",
        background: "linear-gradient(118deg,#F5C200 0%,#F0A800 30%,#E89000 60%,#D4780A 100%)",
        fontFamily: "'Josefin Sans',system-ui,sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Bokeh blobs */}
        {[
          { top:"10%", left:"8%",  size:120, delay:"0s"   },
          { top:"55%", left:"22%", size:80,  delay:"0.7s" },
          { top:"20%", left:"42%", size:60,  delay:"1.2s" },
          { top:"70%", left:"55%", size:100, delay:"0.4s" },
        ].map((b,i)=>(
          <div key={i} style={{
            position:"absolute", top:b.top, left:b.left,
            width:b.size, height:b.size, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(255,255,255,0.35) 0%,transparent 70%)",
            animation:`di-glow 3s ease ${b.delay} infinite`,
            pointerEvents:"none", zIndex:0,
          }}/>
        ))}

        {/* Dot grid */}
        <div style={{
          position:"absolute",inset:0,zIndex:0,pointerEvents:"none",
          backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.2) 1px,transparent 1px)",
          backgroundSize:"28px 28px",
        }}/>

        {/* Wave lines */}
        <svg style={{position:"absolute",right:0,top:0,height:"100%",width:"35%",zIndex:0,opacity:0.15,pointerEvents:"none"}}
          viewBox="0 0 300 400" preserveAspectRatio="none">
          {[0,20,40,60,80,100,120,140,160,180,200].map(o=>(
            <path key={o} d={`M ${o} 0 Q ${o+60} 200 ${o} 400`} stroke="#fff" strokeWidth="1.5" fill="none"/>
          ))}
        </svg>

        {/* Sparkles */}
        {[[12,8],[28,55],[48,20],[65,70],[80,35]].map(([l,t],i)=>(
          <div key={i} style={{
            position:"absolute",left:`${l}%`,top:`${t}%`,
            fontSize:"clamp(10px,1.4vw,18px)",
            animation:`di-spark ${2+i*0.4}s ease ${i*0.3}s infinite`,
            pointerEvents:"none",zIndex:1,
          }}>✦</div>
        ))}

        {/* ══ LAYOUT ══
            Desktop: two-column grid
            Mobile:  single column, person row at bottom
        ══ */}
        <div style={{
          position:"relative",zIndex:2,width:"100%",
          display:"grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr clamp(220px,30vw,380px)",
          gridTemplateRows: "auto",
          alignItems: mobile ? "start" : "center",
        }}>

          {/* ── TEXT CONTENT ── */}
          <div style={{
            padding: mobile
              ? "clamp(16px,5vw,28px) clamp(16px,5vw,28px) clamp(8px,3vw,16px)"
              : "clamp(18px,2.8vw,36px) clamp(16px,3vw,40px)",
            display:"flex", flexDirection:"column",
            justifyContent:"center",
            gap:"clamp(6px,1.5vw,14px)",
          }}>

            {/* Logo row */}
            <div style={{
              display:"flex", alignItems:"center", gap:10,
              opacity:step>=1?1:0,
              animation:step>=1?"di-slide-left .4s ease both":"none",
            }}>
              <img src="/half logo.png" alt="Ganesh Finance"
                style={{
                  width:"clamp(28px,6vw,44px)", height:"clamp(28px,6vw,44px)",
                  borderRadius:"50%", objectFit:"contain",
                  boxShadow:"0 2px 12px rgba(0,0,0,0.2)",
                  background:"#fff", padding:3,
                }}
                onError={e=>e.target.style.display="none"}
              />
              <div>
                <div style={{fontSize:"clamp(0.52rem,1.5vw,0.72rem)",fontWeight:700,letterSpacing:"0.14em",color:"rgba(100,30,0,0.75)",textTransform:"uppercase"}}>Ganesh Finance</div>
                <div style={{fontSize:"clamp(0.4rem,1.1vw,0.52rem)",color:"rgba(100,30,0,0.5)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Gold Loan NBFC · RBI Regulated</div>
              </div>
            </div>

            {/* Eyebrow */}
            <div style={{ opacity:step>=2?1:0, animation:step>=2?"di-slide-left .4s ease both":"none" }}>
              <span style={{
                display:"inline-block", background:"#B91C1C", color:"#fff",
                fontSize:"clamp(0.44rem,1.2vw,0.64rem)",
                fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase",
                padding:"3px 10px", borderRadius:3,
              }}>Digital Transformation Initiative</span>
            </div>

            {/* Headline */}
            <div>
              <div style={{
                fontFamily:"'Bebas Neue',Impact,sans-serif",
                fontSize:"clamp(1.1rem,3.5vw,1.6rem)",
                color:"rgba(60,15,0,0.75)", letterSpacing:"0.04em", lineHeight:1,
                opacity:step>=3?1:0, animation:step>=3?"di-slide-left .45s ease both":"none",
              }}>EMPOWERING</div>

              <div style={{
                fontFamily:"'Bebas Neue',Impact,sans-serif",
                fontSize: mobile ? "clamp(2.4rem,12vw,4rem)" : "clamp(2rem,5.5vw,4.2rem)",
                lineHeight:0.92, letterSpacing:"0.02em",
                background:"linear-gradient(90deg,#7A0A0A,#B91C1C,#7A0A0A,#B91C1C)",
                backgroundSize:"300% 100%",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                animation:"di-shimmer 3s linear infinite",
                opacity:step>=4?1:0,
              }}>EXPERIENCE</div>

              <div style={{
                fontFamily:"'Bebas Neue',Impact,sans-serif",
                fontSize:"clamp(1.1rem,3.5vw,1.6rem)",
                color:"rgba(60,15,0,0.75)", letterSpacing:"0.04em", lineHeight:1,
                opacity:step>=3?1:0, animation:step>=3?"di-slide-left .45s ease 0.1s both":"none",
              }}>THROUGH</div>

              <div style={{
                fontFamily:"'Bebas Neue',Impact,sans-serif",
                fontSize: mobile ? "clamp(1.5rem,7.5vw,3rem)" : "clamp(1.4rem,3.8vw,3rem)",
                lineHeight:1, letterSpacing:"0.03em", color:"#3D0A00",
                opacity:step>=5?1:0, animation:step>=5?"di-slide-left .5s ease both":"none",
              }}>DIGITAL INNOVATION</div>
            </div>

            {/* Feature chips — hide on small mobile to save space */}
            {!mobile && (
              <div style={{
                display:"flex", flexWrap:"wrap", gap:"clamp(4px,0.6vw,7px)",
                opacity:step>=6?1:0, animation:step>=6?"di-slide-up .4s ease both":"none",
              }}>
                {FEATURES.map((f,i)=>(
                  <div key={f.text} className="di-chip" style={{
                    display:"flex", alignItems:"center", gap:5,
                    background:"rgba(255,255,255,0.28)", backdropFilter:"blur(4px)",
                    border:"1px solid rgba(255,255,255,0.5)", borderRadius:99,
                    padding:"clamp(3px,0.5vw,5px) clamp(7px,1vw,12px)",
                    fontSize:"clamp(0.44rem,0.65vw,0.6rem)", fontWeight:600,
                    color:"#3D0A00", letterSpacing:"0.04em",
                  }}>
                    <span style={{fontSize:"clamp(0.7rem,1vw,0.9rem)"}}>{f.icon}</span>{f.text}
                  </div>
                ))}
              </div>
            )}

            {/* Mobile: 2-col chip grid */}
            {mobile && (
              <div style={{
                display:"grid", gridTemplateColumns:"1fr 1fr", gap:6,
                opacity:step>=6?1:0, animation:step>=6?"di-slide-up .4s ease both":"none",
              }}>
                {FEATURES.map((f,i)=>(
                  <div key={f.text} className="di-chip" style={{
                    display:"flex", alignItems:"center", gap:5,
                    background:"rgba(255,255,255,0.28)", backdropFilter:"blur(4px)",
                    border:"1px solid rgba(255,255,255,0.5)", borderRadius:8,
                    padding:"6px 8px",
                    fontSize:"clamp(0.5rem,2.8vw,0.62rem)", fontWeight:600,
                    color:"#3D0A00",
                  }}>
                    <span style={{fontSize:"clamp(0.8rem,3.5vw,1rem)"}}>{f.icon}</span>{f.text}
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div style={{
              display:"flex", gap:10, flexWrap:"wrap", alignItems:"center",
              opacity:step>=7?1:0, animation:step>=7?"di-slide-up .4s ease both":"none",
            }}>
              <button className="di-cta" style={{
                background:"#B91C1C", color:"#fff", borderRadius:6,
                padding:"clamp(7px,2vw,10px) clamp(16px,4vw,24px)",
                fontFamily:"'Josefin Sans',sans-serif",
                fontSize:"clamp(0.52rem,2vw,0.68rem)",
                fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase",
                boxShadow:"0 4px 16px rgba(185,28,28,0.35)",
              }}>Apply Online →</button>
              <span style={{
                fontSize:"clamp(0.42rem,1.6vw,0.54rem)",
                color:"rgba(60,15,0,0.55)", fontWeight:600, letterSpacing:"0.06em",
              }}>🏛️ RBI Regulated · Est. 2019</span>
            </div>

          </div>

          {/* ── RIGHT / BOTTOM: Phone + Person — hidden on mobile ── */}
          {!mobile && <div style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"flex-end",
            justifyContent: mobile ? "center" : "flex-end",
            overflow:"visible",
            opacity:step>=2?1:0,
            animation:step>=2?"di-person .7s cubic-bezier(.34,1.1,.64,1) both":"none",
            gap:"clamp(4px,1.5vw,14px)",
            padding: mobile
              ? "0 clamp(12px,4vw,24px) 0"
              : "0 0 0 0",
            // On mobile, limit height so it doesn't get too tall
            maxHeight: mobile ? "clamp(180px,55vw,260px)" : "none",
            minHeight: mobile ? 0 : "clamp(240px,32vw,440px)",
          }}>

            {/* Glow */}
            <div style={{
              position:"absolute",
              bottom:mobile?"auto":"0%",
              top:mobile?"0":"auto",
              right:"0%",
              width:"140%", height:"80%",
              borderRadius:"50%",
              background:"radial-gradient(ellipse,rgba(255,255,255,0.2) 0%,transparent 65%)",
              pointerEvents:"none",
            }}/>

            {/* App mockup */}
            <div style={{
              flexShrink:0,
              alignSelf:"center",
              animation:step>=5?"di-float 3.5s ease-in-out infinite":"none",
              marginBottom: mobile ? 0 : "clamp(8px,2vw,20px)",
              zIndex:3, position:"relative",
            }}>
              <AppMockup visible={step>=5}/>
            </div>

            {/* Person */}
            <div style={{
              width: mobile ? "clamp(100px,40vw,170px)" : "clamp(120px,16vw,210px)",
              height: mobile ? "clamp(140px,56vw,240px)" : "clamp(200px,28vw,370px)",
              flexShrink:0,
              alignSelf:"flex-end",
              zIndex:2, position:"relative",
            }}>
              <PersonWithPhone/>
            </div>

          </div>}

        </div>

        {/* Ticker */}
        <div style={{
          background:"rgba(60,10,0,0.18)",
          borderTop:"1px solid rgba(255,255,255,0.2)",
          padding:"clamp(4px,0.8vw,6px) 0",
          overflow:"hidden",
          opacity:step>=7?1:0, transition:"opacity .4s ease",
          position:"relative", zIndex:2,
        }}>
          <div style={{
            display:"flex", gap:48, width:"max-content",
            animation:"di-ticker 20s linear infinite",
            userSelect:"none",
          }}>
            {[...Array(2)].map((_,r)=>(
              <div key={r} style={{display:"flex",gap:48,alignItems:"center"}}>
                {["Apply Online","Instant Loan","30 Min Disbursal","RBI Regulated","Ganesh Finance","Safe & Secure","Low Interest","Digital India"].map((t,i)=>(
                  <span key={i} style={{
                    fontSize:"clamp(0.38rem,1vw,0.52rem)", fontWeight:700,
                    color:"rgba(60,10,0,0.6)", letterSpacing:"0.16em",
                    textTransform:"uppercase", whiteSpace:"nowrap",
                    display:"inline-flex", alignItems:"center", gap:8,
                  }}>
                    <span style={{color:"rgba(185,28,28,0.6)",fontSize:"0.4rem"}}>◆</span>{t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}