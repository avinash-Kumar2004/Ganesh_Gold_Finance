// GaneshFinance_InstantLoan_v2 — FIXED VERSION — replace GaneshfinanceDigitl.jsx with this
import { useEffect, useRef, useState } from "react";

// ── Realistic Person: Man in formal shirt holding gold coin/document ──
function RealisticPerson({ step }) {
  return (
    <svg viewBox="0 0 280 460" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", filter: "drop-shadow(8px 16px 32px rgba(0,0,0,0.35))" }}>

      {/* Shadow on ground */}
      <ellipse cx="140" cy="450" rx="85" ry="14" fill="rgba(0,0,0,0.18)"/>

      {/* ── LEGS ── */}
      <rect x="100" y="320" width="36" height="120" rx="10" fill="#1a2744"/>
      <rect x="144" y="320" width="36" height="120" rx="10" fill="#1c2c50"/>
      {/* Shoes */}
      <ellipse cx="118" cy="438" rx="22" ry="9" fill="#111"/>
      <ellipse cx="162" cy="438" rx="22" ry="9" fill="#0d0d0d"/>

      {/* ── SHIRT / BODY ── */}
      {/* Formal light blue shirt */}
      <path d="M88 200 Q80 240 78 290 Q78 330 100 340 L180 340 Q202 330 202 290 Q200 240 192 200 Z"
        fill="#4A7FA5"/>
      {/* Shirt shading */}
      <path d="M140 200 L140 340" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
      <path d="M88 200 Q90 250 92 290" stroke="rgba(255,255,255,0.15)" strokeWidth="8" strokeLinecap="round"/>

      {/* Suit jacket */}
      <path d="M88 200 Q72 220 68 280 Q66 310 78 330 Q90 340 100 340 L120 300 L120 200 Z"
        fill="#1a2744"/>
      <path d="M192 200 Q208 220 212 280 Q214 310 202 330 Q190 340 180 340 L160 300 L160 200 Z"
        fill="#1c2c50"/>

      {/* Tie */}
      <path d="M132 200 L128 240 L140 260 L152 240 L148 200 Z" fill="#B91C1C"/>
      <path d="M134 200 L130 235 L140 252" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
      {/* Tie knot */}
      <path d="M133 196 Q140 205 147 196 Q143 192 140 192 Q137 192 133 196 Z" fill="#8B1414"/>

      {/* Collar */}
      <path d="M120 198 Q132 210 140 205 Q148 210 160 198 Q148 186 140 190 Q132 186 120 198 Z"
        fill="#f0f4f8"/>

      {/* Shirt buttons */}
      <circle cx="140" cy="220" r="2" fill="rgba(0,0,0,0.2)"/>
      <circle cx="140" cy="234" r="2" fill="rgba(0,0,0,0.2)"/>
      <circle cx="140" cy="248" r="2" fill="rgba(0,0,0,0.2)"/>

      {/* Pocket square */}
      <path d="M86 225 L94 225 L92 235 L86 233 Z" fill="#FFD632"/>

      {/* ── LEFT ARM — pointing/gesturing ── */}
      <path d="M88 210 Q60 230 45 255 Q35 270 38 285"
        stroke="#D4956A" strokeWidth="26" strokeLinecap="round"/>
      {/* Jacket sleeve left */}
      <path d="M88 210 Q62 228 47 252"
        stroke="#1a2744" strokeWidth="28" strokeLinecap="round"/>
      {/* Shirt cuff */}
      <path d="M44 258 Q38 268 38 280"
        stroke="#D4956A" strokeWidth="22" strokeLinecap="round"/>
      <path d="M38 275 Q36 282 40 288"
        stroke="#D4956A" strokeWidth="20" strokeLinecap="round"/>
      {/* Cuff band */}
      <ellipse cx="43" cy="265" rx="14" ry="5" fill="none" stroke="#f0f4f8" strokeWidth="3"/>

      {/* Left hand fingers */}
      <ellipse cx="40" cy="290" rx="13" ry="10" fill="#D4956A"/>
      <path d="M30 288 Q26 284 28 280" stroke="#D4956A" strokeWidth="8" strokeLinecap="round"/>
      <path d="M50 292 Q55 290 54 284" stroke="#D4956A" strokeWidth="7" strokeLinecap="round"/>
      <path d="M44 296 Q48 298 50 294" stroke="#D4956A" strokeWidth="7" strokeLinecap="round"/>

      {/* ── RIGHT ARM — holding gold coin ── */}
      <path d="M192 210 Q218 230 228 255 Q235 270 232 290"
        stroke="#1c2c50" strokeWidth="28" strokeLinecap="round"/>
      <path d="M225 262 Q233 278 232 295"
        stroke="#D4956A" strokeWidth="22" strokeLinecap="round"/>

      {/* Right hand + gold coin */}
      <ellipse cx="232" cy="300" rx="15" ry="12" fill="#D4956A"/>
      {/* Fingers holding coin */}
      <path d="M220 298 Q216 294 218 290" stroke="#D4956A" strokeWidth="8" strokeLinecap="round"/>
      <path d="M244 302 Q248 298 246 293" stroke="#D4956A" strokeWidth="7" strokeLinecap="round"/>

      {/* ── GOLD COIN ── */}
      <circle cx="232" cy="278" r="26" fill="url(#coinGrad)" filter="url(#coinGlow)"/>
      <circle cx="232" cy="278" r="22" fill="none" stroke="#C8860A" strokeWidth="2.5"/>
      <circle cx="232" cy="278" r="18" fill="url(#coinInner)"/>
      {/* Coin shine */}
      <ellipse cx="224" cy="270" rx="6" ry="4" fill="rgba(255,255,255,0.35)" transform="rotate(-30 224 270)"/>
      {/* Rupee symbol */}
      <text x="232" y="275" textAnchor="middle" fontSize="14" fontWeight="900"
        fill="#7A4F00" fontFamily="serif">₹</text>
      <text x="232" y="285" textAnchor="middle" fontSize="5" fontWeight="700"
        fill="#8B6000" fontFamily="sans-serif" letterSpacing="1">GOLD</text>

      {/* ── NECK ── */}
      <rect x="128" y="160" width="24" height="36" rx="10" fill="#D4956A"/>

      {/* ── HEAD ── */}
      <ellipse cx="140" cy="128" rx="42" ry="48" fill="#C8855A"/>

      {/* Hair — short, professional */}
      <path d="M98 115 Q100 72 140 65 Q180 72 182 115 Q178 88 165 78 Q152 70 140 70 Q128 70 115 78 Q102 88 98 115 Z"
        fill="#1a0a00"/>
      {/* Hair side */}
      <path d="M98 115 Q96 105 100 95" stroke="#1a0a00" strokeWidth="8" strokeLinecap="round"/>
      <path d="M182 115 Q184 105 180 95" stroke="#1a0a00" strokeWidth="8" strokeLinecap="round"/>

      {/* Ear */}
      <ellipse cx="98" cy="130" rx="8" ry="11" fill="#C8855A"/>
      <ellipse cx="182" cy="130" rx="8" ry="11" fill="#C8855A"/>
      <ellipse cx="98" cy="130" rx="5" ry="7" fill="#B8754A"/>
      <ellipse cx="182" cy="130" rx="5" ry="7" fill="#B8754A"/>

      {/* ── FACE DETAILS ── */}
      {/* Eyebrows */}
      <path d="M120 108 Q130 104 138 107" stroke="#1a0a00" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M142 107 Q150 104 160 108" stroke="#1a0a00" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Eyes */}
      <ellipse cx="129" cy="118" rx="7" ry="6" fill="white"/>
      <ellipse cx="151" cy="118" rx="7" ry="6" fill="white"/>
      <circle cx="130" cy="118" r="4" fill="#2a1500"/>
      <circle cx="152" cy="118" r="4" fill="#2a1500"/>
      <circle cx="132" cy="116" r="1.5" fill="white"/>
      <circle cx="154" cy="116" r="1.5" fill="white"/>
      {/* Eye crease */}
      <path d="M122 113 Q129 110 136 113" stroke="#B8754A" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M144 113 Q151 110 158 113" stroke="#B8754A" strokeWidth="1" fill="none" opacity="0.5"/>

      {/* Nose */}
      <path d="M138 125 Q136 134 134 138 Q140 142 146 138 Q144 134 142 125"
        fill="#B8754A" opacity="0.5"/>
      <ellipse cx="135" cy="138" rx="4" ry="2.5" fill="#A06040" opacity="0.4"/>
      <ellipse cx="145" cy="138" rx="4" ry="2.5" fill="#A06040" opacity="0.4"/>

      {/* Smile */}
      <path d="M126 148 Q140 158 154 148"
        stroke="#8B4A25" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M128 148 Q140 155 152 148"
        stroke="#C87050" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4"/>

      {/* Cheek blush */}
      <ellipse cx="116" cy="140" rx="8" ry="5" fill="#E8886A" opacity="0.25"/>
      <ellipse cx="164" cy="140" rx="8" ry="5" fill="#E8886A" opacity="0.25"/>

      {/* Mustache */}
      <path d="M128 142 Q134 146 140 143 Q146 146 152 142 Q146 139 140 140 Q134 139 128 142 Z"
        fill="#1a0a00" opacity="0.7"/>

      {/* Watch on left wrist */}
      <rect x="34" y="270" width="18" height="12" rx="3" fill="#FFD632"/>
      <rect x="36" y="272" width="14" height="8" rx="2" fill="#1a2744"/>

      {/* defs */}
      <defs>
        <radialGradient id="coinGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FFE566"/>
          <stop offset="40%" stopColor="#F5C842"/>
          <stop offset="100%" stopColor="#C8860A"/>
        </radialGradient>
        <radialGradient id="coinInner" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FFF0A0"/>
          <stop offset="100%" stopColor="#D4A017"/>
        </radialGradient>
        <filter id="coinGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
    </svg>
  );
}

// ── Animated gold coin sparkle ──
function GoldCoinFloat({ visible }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transition: "opacity 0.5s ease 1s",
    }}>
      {[
        { top:"10%", left:"15%", size:28, delay:"0s",   dur:"3.2s" },
        { top:"25%", left:"5%",  size:18, delay:"0.5s", dur:"2.8s" },
        { top:"60%", left:"12%", size:22, delay:"1.0s", dur:"3.5s" },
        { top:"45%", left:"78%", size:16, delay:"0.3s", dur:"2.6s" },
        { top:"15%", left:"70%", size:24, delay:"0.8s", dur:"3.0s" },
      ].map((c, i) => (
        <div key={i} style={{
          position:"absolute", top:c.top, left:c.left,
          width:c.size, height:c.size, borderRadius:"50%",
          background:`radial-gradient(circle at 35% 35%, #FFE566, #C8860A)`,
          boxShadow:`0 2px 8px rgba(200,134,10,0.5)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:c.size*0.45, color:"#7A4F00", fontWeight:900,
          animation:`coin-float ${c.dur} ease-in-out ${c.delay} infinite`,
          pointerEvents:"none", zIndex:1,
        }}>₹</div>
      ))}
    </div>
  );
}

const STEPS_DATA = [
  { icon:"📋", label:"Apply",    sub:"Online/Branch" },
  { icon:"📦", label:"Submit",   sub:"Gold Ornaments" },
  { icon:"⚡", label:"Approve",  sub:"In 30 Minutes"  },
  { icon:"💰", label:"Receive",  sub:"Instant Cash"   },
];


// ── Realistic Phone Mockup — Ganesh Finance App ──
function PhoneMockup() {
  const services = [
    { icon:"🏅", label:"Gold Loan",    color:"#F5C842", bg:"rgba(245,200,66,0.1)"  },
    { icon:"⚡", label:"Instant Cash", color:"#22a86b", bg:"rgba(34,168,107,0.1)"  },
    { icon:"🔒", label:"Safe Storage", color:"#60a5fa", bg:"rgba(96,165,250,0.1)"  },
    { icon:"📊", label:"Track Loan",   color:"#f97316", bg:"rgba(249,115,22,0.1)"  },
    { icon:"💳", label:"Easy Repay",   color:"#a78bfa", bg:"rgba(167,139,250,0.1)" },
    { icon:"🔔", label:"Alerts",       color:"#f43f5e", bg:"rgba(244,63,94,0.1)"   },
  ];
  return (
    <div style={{
      width:"clamp(110px,13vw,175px)",
      background:"#0a0a0a",
      borderRadius:"clamp(16px,2.2vw,28px)",
      boxShadow:"0 0 0 2px #2a2a2a, 0 0 0 4px #1a1100, 0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(200,134,10,0.15)",
      overflow:"hidden",
      position:"relative",
      transform:"rotate(2deg)",
      flexShrink:0,
    }}>
      {/* Side button */}
      <div style={{position:"absolute",right:-3,top:"28%",width:3,height:"clamp(18px,2.5vw,32px)",background:"#333",borderRadius:"0 2px 2px 0"}}/>
      <div style={{position:"absolute",left:-3,top:"22%",width:3,height:"clamp(12px,1.8vw,22px)",background:"#333",borderRadius:"2px 0 0 2px"}}/>
      <div style={{position:"absolute",left:-3,top:"30%",width:3,height:"clamp(12px,1.8vw,22px)",background:"#333",borderRadius:"2px 0 0 2px"}}/>

      {/* Screen */}
      <div style={{
        margin:"clamp(3px,0.5vw,6px)",
        borderRadius:"clamp(12px,1.8vw,22px)",
        overflow:"hidden",
        background:"#0f0a00",
      }}>
        {/* Status bar */}
        <div style={{
          background:"#0f0a00",
          padding:"clamp(4px,0.6vw,7px) clamp(8px,1.2vw,14px) clamp(2px,0.4vw,4px)",
          display:"flex",justifyContent:"space-between",alignItems:"center",
        }}>
          <span style={{fontSize:"clamp(5px,0.65vw,7px)",color:"rgba(255,255,255,0.5)",fontWeight:600}}>9:41</span>
          <div style={{
            width:"clamp(30px,4vw,50px)",height:"clamp(8px,1.1vw,13px)",
            background:"#0f0a00",border:"1.5px solid #333",
            borderRadius:99,display:"flex",alignItems:"center",justifyContent:"center",gap:4,
          }}>
            <div style={{width:4,height:4,borderRadius:"50%",background:"#333"}}/>
          </div>
          <div style={{display:"flex",gap:3,alignItems:"center"}}>
            {[3,4,5].map(i=><div key={i} style={{width:2,height:i,background:"rgba(255,255,255,0.4)",borderRadius:1}}/>)}
            <div style={{width:"clamp(10px,1.4vw,16px)",height:"clamp(5px,0.7vw,7px)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:2,marginLeft:2}}>
              <div style={{width:"60%",height:"100%",background:"#22a86b",borderRadius:1}}/>
            </div>
          </div>
        </div>

        {/* App header */}
        <div style={{
          background:"linear-gradient(135deg,#1A0E00,#2A1800)",
          padding:"clamp(6px,1vw,12px) clamp(8px,1.2vw,14px)",
          borderBottom:"1px solid rgba(200,134,10,0.2)",
        }}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
            <div style={{
              width:"clamp(16px,2.2vw,26px)",height:"clamp(16px,2.2vw,26px)",
              borderRadius:"50%",background:"rgba(200,134,10,0.15)",
              border:"1px solid rgba(200,134,10,0.4)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:"clamp(7px,1vw,11px)",
            }}>🏛</div>
            <div>
              <div style={{fontSize:"clamp(5px,0.7vw,7.5px)",fontWeight:700,color:"#F5C842",letterSpacing:"0.12em",textTransform:"uppercase"}}>Ganesh Finance</div>
              <div style={{fontSize:"clamp(4px,0.55vw,5.5px)",color:"rgba(200,134,10,0.45)",letterSpacing:"0.08em"}}>Gold Loan · Est. 2019</div>
            </div>
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:3}}>
              <div style={{width:4,height:4,borderRadius:"50%",background:"#22a86b"}}/>
              <span style={{fontSize:"clamp(4px,0.52vw,5px)",color:"#22a86b",fontWeight:700}}>LIVE</span>
            </div>
          </div>
          {/* Balance card */}
          <div style={{
            background:"linear-gradient(135deg,rgba(200,134,10,0.15),rgba(245,200,66,0.08))",
            border:"1px solid rgba(200,134,10,0.25)",
            borderRadius:8,padding:"clamp(5px,0.8vw,9px)",
          }}>
            <div style={{fontSize:"clamp(4px,0.52vw,5.5px)",color:"rgba(200,134,10,0.5)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Gold Loan Limit</div>
            <div style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(10px,1.6vw,18px)",fontWeight:900,
              color:"#F5C842",letterSpacing:"-0.02em",lineHeight:1,
            }}>₹5,00,000</div>
            <div style={{fontSize:"clamp(3.5px,0.48vw,5px)",color:"rgba(200,134,10,0.4)",marginTop:1}}>Eligible based on your gold</div>
            {/* Progress bar */}
            <div style={{marginTop:5,height:3,background:"rgba(200,134,10,0.1)",borderRadius:99,overflow:"hidden"}}>
              <div style={{width:"72%",height:"100%",background:"linear-gradient(90deg,#C8860A,#F5C842)",borderRadius:99}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
              <span style={{fontSize:"clamp(3px,0.44vw,4.5px)",color:"rgba(200,134,10,0.35)"}}>Used: ₹3.6L</span>
              <span style={{fontSize:"clamp(3px,0.44vw,4.5px)",color:"rgba(200,134,10,0.35)"}}>72%</span>
            </div>
          </div>
        </div>

        {/* Quick Apply banner */}
        <div style={{
          background:"#B91C1C",
          padding:"clamp(4px,0.6vw,7px) clamp(8px,1.2vw,14px)",
          display:"flex",alignItems:"center",justifyContent:"space-between",
        }}>
          <div>
            <div style={{fontSize:"clamp(5px,0.7vw,7px)",fontWeight:800,color:"#fff",letterSpacing:"0.08em",textTransform:"uppercase"}}>⚡ Instant Approval</div>
            <div style={{fontSize:"clamp(3.5px,0.5vw,5px)",color:"rgba(255,255,255,0.7)"}}>Apply in 2 minutes</div>
          </div>
          <div style={{
            background:"rgba(255,255,255,0.2)",
            borderRadius:4,padding:"clamp(2px,0.4vw,4px) clamp(5px,0.8vw,8px)",
            fontSize:"clamp(4px,0.56vw,5.5px)",fontWeight:700,color:"#fff",
          }}>APPLY →</div>
        </div>

        {/* Services grid */}
        <div style={{
          padding:"clamp(5px,0.8vw,10px) clamp(6px,1vw,12px)",
          background:"#0f0a00",
        }}>
          <div style={{fontSize:"clamp(4px,0.55vw,5.5px)",color:"rgba(200,134,10,0.35)",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"clamp(4px,0.6vw,7px)",fontWeight:600}}>Our Services</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"clamp(3px,0.5vw,6px)"}}>
            {services.map(s=>(
              <div key={s.label} style={{
                background:s.bg,
                border:`1px solid ${s.color}22`,
                borderRadius:6,
                padding:"clamp(4px,0.6vw,7px) clamp(2px,0.4vw,4px)",
                textAlign:"center",
              }}>
                <div style={{fontSize:"clamp(8px,1.2vw,14px)",marginBottom:2}}>{s.icon}</div>
                <div style={{fontSize:"clamp(3px,0.45vw,4.5px)",fontWeight:700,color:s.color,letterSpacing:"0.04em",lineHeight:1.2}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{
          background:"#0a0800",
          borderTop:"1px solid rgba(200,134,10,0.1)",
          padding:"clamp(4px,0.6vw,7px) clamp(8px,1.2vw,14px)",
          display:"flex",justifyContent:"space-around",
        }}>
          {["🏠","💰","📋","👤"].map((ic,i)=>(
            <div key={i} style={{
              display:"flex",flexDirection:"column",alignItems:"center",gap:1,
            }}>
              <span style={{fontSize:"clamp(7px,1vw,11px)",opacity:i===1?1:0.4}}>{ic}</span>
              <div style={{width:i===1?12:4,height:2,borderRadius:99,background:i===1?"#F5C842":"transparent"}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InstantGoldLoanSlide() {
  const ref    = useRef(null);
  const [vis,  setVis]  = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        let s = 0;
        const id = setInterval(() => { s++; setStep(s); if (s >= 10) clearInterval(id); }, 110);
        return () => clearInterval(id);
      } else { setVis(false); setStep(0); }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Josefin+Sans:wght@300;400;600;700&display=swap');

        @keyframes coin-float {
          0%,100% { transform: translateY(0) rotate(0deg) scale(1); }
          33%     { transform: translateY(-12px) rotate(15deg) scale(1.05); }
          66%     { transform: translateY(-6px) rotate(-8deg) scale(0.97); }
        }
        @keyframes gl-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes gl-rise {
          from { opacity:0; transform: translateY(22px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes gl-left {
          from { opacity:0; transform: translateX(-20px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes gl-person {
          from { opacity:0; transform: translateX(30px) scale(0.97); }
          to   { opacity:1; transform: translateX(0) scale(1); }
        }
        @keyframes gl-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes gl-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.4); }
          50%     { box-shadow: 0 0 0 10px rgba(245,200,66,0); }
        }
        @keyframes gl-glow {
          0%,100% { opacity:0.6; }
          50%     { opacity:1; }
        }
        @keyframes gl-count {
          from { opacity:0; transform:scale(0.7); }
          to   { opacity:1; transform:scale(1); }
        }
        .gl-cta {
          transition: transform 0.2s cubic-bezier(.34,1.4,.64,1), box-shadow 0.2s;
          cursor: pointer;
        }
        .gl-cta:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 28px rgba(245,200,66,0.45) !important;
        }
        .gl-step-card {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .gl-step-card:hover {
          transform: translateY(-3px) scale(1.03);
        }

        /* ── RESPONSIVE: Person column hidden below 640px ── */
        .gl-person-col {
          display: flex;
        }
        @media (max-width: 640px) {
          .gl-person-col {
            display: none !important;
          }
          .gl-main-grid {
            grid-template-columns: 1fr clamp(110px,30vw,175px) !important;
          }
        }

        /* ── RESPONSIVE: Also hide phone on very small screens (< 420px) ── */
        @media (max-width: 420px) {
          .gl-phone-col {
            display: none !important;
          }
          .gl-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div ref={ref} style={{
        width:"100%",
        minHeight:"clamp(240px,32vw,440px)",
        background:"linear-gradient(135deg,#0C0800 0%,#1A1000 35%,#241500 60%,#0C0800 100%)",
        fontFamily:"'Josefin Sans',system-ui,sans-serif",
        position:"relative",
        overflow:"hidden",
        display:"flex",
        alignItems:"stretch",
        borderTop:"2px solid #C8860A",
      }}>

        {/* ── Gold particle field ── */}
        <div style={{
          position:"absolute",inset:0,zIndex:0,pointerEvents:"none",
          backgroundImage:`
            radial-gradient(circle, rgba(200,134,10,0.12) 1px, transparent 1px),
            radial-gradient(circle, rgba(245,200,66,0.06) 1px, transparent 1px)
          `,
          backgroundSize:"32px 32px, 18px 18px",
          backgroundPosition:"0 0, 16px 16px",
        }}/>

        {/* ── Radial glow center-right ── */}
        <div style={{
          position:"absolute",top:"50%",right:"25%",
          transform:"translate(50%,-50%)",
          width:"clamp(200px,35vw,500px)",
          height:"clamp(200px,35vw,500px)",
          borderRadius:"50%",
          background:"radial-gradient(circle,rgba(200,134,10,0.14) 0%,transparent 65%)",
          pointerEvents:"none",zIndex:0,
          animation:"gl-glow 4s ease infinite",
        }}/>

        {/* Floating coins */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1}}>
          <GoldCoinFloat visible={step>=3}/>
        </div>

        {/* ══ MAIN GRID ══ */}
        <div className="gl-main-grid" style={{
          position:"relative",zIndex:2,width:"100%",
          display:"grid",
          gridTemplateColumns:"1fr clamp(130px,16vw,200px) clamp(180px,22vw,280px)",
          alignItems:"center",
        }}>

          {/* ── LEFT: Content ── */}
          <div style={{
            padding:"clamp(16px,2.5vw,32px) clamp(16px,3vw,40px)",
            display:"flex",flexDirection:"column",
            justifyContent:"center",
            gap:"clamp(8px,1.1vw,13px)",
          }}>

            {/* Logo row */}
            <div style={{
              display:"flex",alignItems:"center",gap:10,
              opacity:step>=1?1:0,
              animation:step>=1?"gl-left .4s ease both":"none",
            }}>
              <img src="/half logo.png" alt=""
                style={{
                  width:"clamp(26px,3.5vw,42px)",height:"clamp(26px,3.5vw,42px)",
                  borderRadius:"50%",objectFit:"contain",
                  background:"rgba(255,255,255,0.08)",padding:3,
                  border:"1.5px solid rgba(200,134,10,0.4)",
                }}
                onError={e=>e.target.style.display="none"}
              />
              <div>
                <div style={{fontSize:"clamp(0.5rem,0.75vw,0.65rem)",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#C8860A"}}>Ganesh Finance</div>
                <div style={{fontSize:"clamp(0.38rem,0.52vw,0.48rem)",color:"rgba(200,134,10,0.45)",letterSpacing:"0.12em",textTransform:"uppercase"}}>Gold Loan NBFC · Est. 2019</div>
              </div>
              {/* Live badge */}
              <div style={{
                marginLeft:"auto",display:"flex",alignItems:"center",gap:5,
                padding:"3px 10px",borderRadius:99,
                background:"rgba(34,168,107,0.12)",
                border:"1px solid rgba(34,168,107,0.3)",
              }}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"#22a86b",animation:"gl-glow 1.5s ease infinite"}}/>
                <span style={{fontSize:"clamp(0.38rem,0.52vw,0.48rem)",fontWeight:700,color:"rgba(34,168,107,0.85)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Instant</span>
              </div>
            </div>

            {/* Eyebrow */}
            <div style={{
              opacity:step>=2?1:0,
              animation:step>=2?"gl-left .4s ease both":"none",
              display:"flex",alignItems:"center",gap:8,
            }}>
              <div style={{width:"clamp(14px,2vw,22px)",height:"1.5px",background:"#C8860A"}}/>
              <span style={{
                fontSize:"clamp(0.42rem,0.62vw,0.56rem)",letterSpacing:"0.2em",
                textTransform:"uppercase",color:"rgba(200,134,10,0.6)",fontWeight:600,
              }}>Instant Gold Loan</span>
            </div>

            {/* Main headline */}
            <div style={{
              opacity:step>=3?1:0,
              animation:step>=3?"gl-rise .5s ease both":"none",
            }}>
              <h1 style={{
                margin:0,lineHeight:1.0,
                fontFamily:"'Playfair Display',Georgia,serif",
              }}>
                <span style={{
                  display:"block",
                  fontSize:"clamp(1.1rem,2.4vw,2rem)",
                  color:"rgba(255,255,255,0.55)",
                  fontWeight:700,fontStyle:"italic",
                  letterSpacing:"0.01em",
                }}>Your Gold,</span>
                <span style={{
                  display:"block",
                  fontSize:"clamp(1.6rem,4vw,3.2rem)",
                  background:"linear-gradient(90deg,#FFE566,#F5C842,#D4A017,#FFE566,#F5C842)",
                  backgroundSize:"250% 100%",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                  animation:"gl-shimmer 2.8s linear infinite",
                  fontWeight:900,letterSpacing:"-0.01em",
                }}>Instant Cash.</span>
                <span style={{
                  display:"block",
                  fontSize:"clamp(0.85rem,1.6vw,1.3rem)",
                  color:"rgba(255,255,255,0.35)",
                  fontWeight:400,fontStyle:"italic",letterSpacing:"0.02em",marginTop:2,
                }}>Trusted. Fast. Secure.</span>
              </h1>
            </div>

            {/* Stats row */}
            <div style={{
              display:"flex",gap:"clamp(8px,1.2vw,16px)",flexWrap:"wrap",
              opacity:step>=4?1:0,
              animation:step>=4?"gl-rise .4s ease both":"none",
            }}>
              {[
                {val:"30",unit:"Min",label:"Disbursal"},
                {val:"₹21",unit:"Cr+",label:"AUM"},
                {val:"0%",unit:"",label:"External Debt"},
              ].map((s,i)=>(
                <div key={s.label} style={{
                  background:"rgba(200,134,10,0.08)",
                  border:"1px solid rgba(200,134,10,0.2)",
                  borderRadius:8,
                  padding:"clamp(5px,0.8vw,8px) clamp(8px,1.2vw,14px)",
                  textAlign:"center",
                }}>
                  <div style={{
                    fontFamily:"'Playfair Display',serif",
                    fontSize:"clamp(0.9rem,1.6vw,1.3rem)",
                    fontWeight:900,color:"#F5C842",lineHeight:1,
                    animation:step>=5?`gl-count 0.4s ease ${i*0.1}s both`:"none",
                  }}>{s.val}<span style={{fontSize:"0.65em",color:"#C8860A"}}>{s.unit}</span></div>
                  <div style={{
                    fontSize:"clamp(0.38rem,0.54vw,0.5rem)",
                    color:"rgba(200,134,10,0.5)",fontWeight:600,
                    textTransform:"uppercase",letterSpacing:"0.1em",marginTop:2,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Process steps */}
            <div style={{
              display:"flex",gap:"clamp(4px,0.6vw,8px)",flexWrap:"wrap",
              opacity:step>=5?1:0,
              animation:step>=5?"gl-rise .4s ease both":"none",
            }}>
              {STEPS_DATA.map((s,i)=>(
                <div key={s.label} className="gl-step-card" style={{
                  display:"flex",flexDirection:"column",alignItems:"center",
                  gap:3,
                  background:"rgba(255,255,255,0.03)",
                  border:"1px solid rgba(200,134,10,0.15)",
                  borderRadius:8,
                  padding:"clamp(5px,0.7vw,7px) clamp(6px,1vw,10px)",
                  minWidth:"clamp(44px,6vw,62px)",
                  opacity:step>=5?1:0,
                  transition:`opacity 0.3s ease ${i*0.08}s`,
                }}>
                  <div style={{fontSize:"clamp(0.8rem,1.2vw,1rem)"}}>{s.icon}</div>
                  <div style={{fontSize:"clamp(0.42rem,0.6vw,0.54rem)",fontWeight:700,color:"#F5C842",letterSpacing:"0.06em",textTransform:"uppercase"}}>{s.label}</div>
                  <div style={{fontSize:"clamp(0.36rem,0.5vw,0.46rem)",color:"rgba(200,134,10,0.45)",textAlign:"center",lineHeight:1.3}}>{s.sub}</div>
                  {i < STEPS_DATA.length-1 && (
                    <div style={{position:"absolute",right:"-clamp(6px,1vw,10px)",top:"50%",transform:"translateY(-50%)",color:"rgba(200,134,10,0.3)",fontSize:"0.6rem"}}>›</div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              display:"flex",gap:"clamp(6px,1vw,12px)",alignItems:"center",flexWrap:"wrap",
              opacity:step>=7?1:0,
              animation:step>=7?"gl-rise .4s ease both":"none",
            }}>
              <button className="gl-cta" style={{
                background:"linear-gradient(135deg,#C8860A,#FFD200,#C8860A)",
                backgroundSize:"200% 100%",
                border:"none",borderRadius:7,
                padding:"clamp(7px,1.1vw,11px) clamp(16px,2.5vw,28px)",
                fontFamily:"'Josefin Sans',sans-serif",
                fontSize:"clamp(0.52rem,0.8vw,0.7rem)",
                fontWeight:700,textTransform:"uppercase",
                letterSpacing:"0.14em",color:"#06080e",
                boxShadow:"0 4px 20px rgba(200,134,10,0.3)",
                animation:"gl-pulse 2.5s ease infinite",
              }}>Get Loan Now →</button>

              <button className="gl-cta" style={{
                background:"transparent",
                border:"1px solid rgba(200,134,10,0.3)",
                borderRadius:7,
                padding:"clamp(6px,1vw,10px) clamp(12px,2vw,22px)",
                fontFamily:"'Josefin Sans',sans-serif",
                fontSize:"clamp(0.5rem,0.76vw,0.66rem)",
                fontWeight:500,textTransform:"uppercase",
                letterSpacing:"0.1em",color:"rgba(200,134,10,0.6)",
                cursor:"pointer",
              }}>Check Eligibility</button>
            </div>

          </div>


          {/* ── CENTER: Realistic Phone Mockup ── */}
          <div className="gl-phone-col" style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            padding:"clamp(10px,1.5vw,20px) clamp(4px,0.8vw,10px)",
            opacity: step>=4?1:0,
            animation: step>=4?"gl-rise .6s cubic-bezier(.34,1.1,.64,1) both":"none",
          }}>
            <PhoneMockup/>
          </div>

          {/* ── RIGHT: Person ── */}
          <div className="gl-person-col" style={{
            position:"relative",
            height:"100%",
            minHeight:"clamp(240px,32vw,440px)",
            display:"flex",
            alignItems:"flex-end",
            justifyContent:"center",
            overflow:"hidden",
            opacity:step>=2?1:0,
            animation:step>=2?"gl-person .7s cubic-bezier(.34,1.1,.64,1) both":"none",
          }}>

            {/* Glow behind person */}
            <div style={{
              position:"absolute",
              bottom:"-10%",left:"50%",
              transform:"translateX(-50%)",
              width:"180%",height:"80%",
              borderRadius:"50%",
              background:"radial-gradient(ellipse,rgba(200,134,10,0.12) 0%,transparent 65%)",
              pointerEvents:"none",
            }}/>

            {/* Gold arc lines behind */}
            <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.08,pointerEvents:"none"}}
              viewBox="0 0 300 440" preserveAspectRatio="xMidYMid slice">
              {[60,90,120,150,180].map(r=>(
                <circle key={r} cx="150" cy="440" r={r} fill="none" stroke="#F5C842" strokeWidth="1"/>
              ))}
            </svg>

            {/* Person */}
            <div style={{
              width:"clamp(160px,22vw,290px)",
              height:"clamp(220px,30vw,420px)",
              flexShrink:0,
              position:"relative",zIndex:2,
            }}>
              <RealisticPerson step={step}/>
            </div>

          </div>

        </div>

        {/* ── BOTTOM TICKER ── */}
        <div style={{
          position:"absolute",bottom:0,left:0,right:0,
          background:"rgba(200,134,10,0.1)",
          borderTop:"1px solid rgba(200,134,10,0.2)",
          padding:"clamp(3px,0.5vw,5px) 0",
          overflow:"hidden",
          opacity:step>=8?1:0,transition:"opacity .4s ease",
        }}>
          <div style={{
            display:"flex",gap:40,width:"max-content",
            animation:"gl-ticker 22s linear infinite",
            userSelect:"none",
          }}>
            {[...Array(2)].map((_,r)=>(
              <div key={r} style={{display:"flex",gap:40,alignItems:"center"}}>
                {["Instant Gold Loan","30 Min Disbursal","Safe Gold Storage","RBI Regulated","Zero Debt Company","₹21 Cr+ Portfolio","500+ Happy Clients","Low Interest Rates"].map((t,i)=>(
                  <span key={i} style={{
                    fontSize:"clamp(0.38rem,0.54vw,0.5rem)",fontWeight:600,
                    color:"rgba(200,134,10,0.4)",letterSpacing:"0.16em",
                    textTransform:"uppercase",whiteSpace:"nowrap",
                    display:"inline-flex",alignItems:"center",gap:7,
                  }}>
                    <span style={{color:"#C8860A",fontSize:"0.35rem"}}>◈</span>{t}
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