// GaneshFinance_Contact_Slide — matches InstantGoldLoanSlide aesthetic
import { useEffect, useRef, useState } from "react";

const CONTACT_INFO = [
  {
    icon: "📞",
    label: "Call Us",
    value: "+91 93248 48838",
    sub: "Mon–Sat, 9AM–7PM",
    color: "#22a86b",
    href: "tel:+91 93248 48838",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+91 93248 48838",
    sub: "Instant Response",
    color: "#25D366",
    href: "https://wa.me/93248 48838",
  },
  {
    icon: "📧",
    label: "Email",
    value: "loans@ganeshfinance.in",
    sub: "Reply within 2 hours",
    color: "#60a5fa",
    href: "mailto:loans@ganeshfinance.in",
  },
  {
    icon: "📍",
    label: "Branch",
    value: "MG Road, Pune – 411001",
    sub: "Walk in anytime",
    color: "#F5C842",
    href: "#",
  },
];

function GoldOrb({ style }) {
  return (
    <div style={{
      borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, #FFE566 0%, #C8860A 60%, #7A4F00 100%)",
      boxShadow: "0 4px 24px rgba(200,134,10,0.45)",
      pointerEvents: "none",
      ...style,
    }} />
  );
}

export default function GaneshFinanceContact() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0;
        const id = setInterval(() => { s++; setStep(s); if (s >= 10) clearInterval(id); }, 100);
        return () => clearInterval(id);
      } else { setStep(0); }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Josefin+Sans:wght@300;400;600;700&display=swap');

        @keyframes gc-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gc-left {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes gc-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes gc-glow {
          0%,100% { opacity: 0.5; }
          50%     { opacity: 1; }
        }
        @keyframes gc-pulse-ring {
          0%   { transform: scale(0.92); opacity: 0.7; }
          100% { transform: scale(1.6);  opacity: 0; }
        }
        @keyframes gc-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes gc-float {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-8px); }
        }
        @keyframes gc-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .gc-card {
          transition: transform 0.22s cubic-bezier(.34,1.4,.64,1), box-shadow 0.22s, border-color 0.22s;
          cursor: pointer;
          text-decoration: none;
        }
        .gc-card:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 12px 36px rgba(200,134,10,0.22) !important;
          border-color: rgba(200,134,10,0.45) !important;
        }
        .gc-cta {
          transition: transform 0.2s cubic-bezier(.34,1.4,.64,1), box-shadow 0.2s;
          cursor: pointer;
        }
        .gc-cta:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 28px rgba(245,200,66,0.5) !important;
        }

        @media (max-width: 600px) {
          .gc-right-panel { display: none !important; }
          .gc-grid { grid-template-columns: 1fr !important; }
          .gc-cards-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 380px) {
          .gc-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div ref={ref} style={{
        width: "100%",
        minHeight: "clamp(240px,32vw,440px)",
        background: "linear-gradient(135deg,#0C0800 0%,#1A1000 35%,#241500 60%,#0C0800 100%)",
        fontFamily: "'Josefin Sans',system-ui,sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
        borderTop: "2px solid #C8860A",
      }}>

        {/* ── Dot grid texture ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            radial-gradient(circle, rgba(200,134,10,0.11) 1px, transparent 1px),
            radial-gradient(circle, rgba(245,200,66,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 18px 18px",
          backgroundPosition: "0 0, 16px 16px",
        }} />

        {/* ── Ambient glow ── */}
        <div style={{
          position: "absolute", top: "50%", left: "30%",
          transform: "translate(-50%,-50%)",
          width: "clamp(200px,40vw,520px)",
          height: "clamp(200px,40vw,520px)",
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(200,134,10,0.1) 0%,transparent 65%)",
          pointerEvents: "none", zIndex: 0,
          animation: "gc-glow 4s ease infinite",
        }} />

        {/* ── Decorative floating orbs ── */}
        <GoldOrb style={{
          position:"absolute", width:60, height:60,
          top:"8%", right:"32%", opacity:0.12,
          animation:"gc-float 5s ease-in-out infinite",
          zIndex:0,
        }}/>
        <GoldOrb style={{
          position:"absolute", width:28, height:28,
          bottom:"18%", left:"38%", opacity:0.1,
          animation:"gc-float 4s ease-in-out 1s infinite",
          zIndex:0,
        }}/>

        {/* ── Diagonal gold accent line ── */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.04,pointerEvents:"none",zIndex:0}}
          preserveAspectRatio="none" viewBox="0 0 800 440">
          <line x1="0" y1="440" x2="800" y2="0" stroke="#F5C842" strokeWidth="120"/>
        </svg>

        {/* ══ MAIN GRID ══ */}
        <div className="gc-grid" style={{
          position: "relative", zIndex: 2, width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr clamp(160px,22vw,280px)",
          alignItems: "center",
        }}>

          {/* ── LEFT: Contact Content ── */}
          <div style={{
            padding: "clamp(18px,2.8vw,36px) clamp(18px,3.2vw,44px)",
            display: "flex", flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(10px,1.3vw,16px)",
          }}>

            {/* Logo + brand */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              opacity: step>=1 ? 1 : 0,
              animation: step>=1 ? "gc-left .4s ease both" : "none",
            }}>
              <img src="/half logo.png" alt=""
                style={{
                  width:"clamp(26px,3.5vw,42px)", height:"clamp(26px,3.5vw,42px)",
                  borderRadius:"50%", objectFit:"contain",
                  background:"rgba(255,255,255,0.08)", padding:3,
                  border:"1.5px solid rgba(200,134,10,0.4)",
                }}
                onError={e=>e.target.style.display="none"}
              />
              <div>
                <div style={{fontSize:"clamp(0.5rem,0.75vw,0.65rem)",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#C8860A"}}>Ganesh Finance</div>
                <div style={{fontSize:"clamp(0.38rem,0.52vw,0.48rem)",color:"rgba(200,134,10,0.45)",letterSpacing:"0.12em",textTransform:"uppercase"}}>Gold Loan NBFC · Est. 2019</div>
              </div>
              {/* Badge */}
              <div style={{
                marginLeft: "auto", display:"flex", alignItems:"center", gap:5,
                padding:"3px 10px", borderRadius:99,
                background:"rgba(200,134,10,0.1)",
                border:"1px solid rgba(200,134,10,0.25)",
              }}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"#F5C842",animation:"gc-glow 1.5s ease infinite"}}/>
                <span style={{fontSize:"clamp(0.38rem,0.52vw,0.48rem)",fontWeight:700,color:"rgba(245,200,66,0.8)",letterSpacing:"0.1em",textTransform:"uppercase"}}>24/7 Support</span>
              </div>
            </div>

            {/* Eyebrow */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              opacity: step>=2 ? 1 : 0,
              animation: step>=2 ? "gc-left .4s ease both" : "none",
            }}>
              <div style={{width:"clamp(14px,2vw,22px)",height:"1.5px",background:"#C8860A"}}/>
              <span style={{
                fontSize:"clamp(0.42rem,0.62vw,0.56rem)",letterSpacing:"0.2em",
                textTransform:"uppercase",color:"rgba(200,134,10,0.6)",fontWeight:600,
              }}>Get In Touch</span>
            </div>

            {/* Headline */}
            <div style={{
              opacity: step>=3 ? 1 : 0,
              animation: step>=3 ? "gc-rise .5s ease both" : "none",
            }}>
              <h2 style={{
                margin:0, lineHeight:1.05,
                fontFamily:"'Playfair Display',Georgia,serif",
              }}>
                <span style={{
                  display:"block",
                  fontSize:"clamp(1rem,2vw,1.7rem)",
                  color:"rgba(255,255,255,0.5)",
                  fontWeight:700, fontStyle:"italic",
                }}>Need More Info?</span>
                <span style={{
                  display:"block",
                  fontSize:"clamp(1.4rem,3.2vw,2.6rem)",
                  background:"linear-gradient(90deg,#FFE566,#F5C842,#D4A017,#FFE566,#F5C842)",
                  backgroundSize:"250% 100%",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  animation:"gc-shimmer 2.8s linear infinite",
                  fontWeight:900, letterSpacing:"-0.01em",
                }}>Contact Us Now.</span>
              </h2>
            </div>

            {/* Contact cards grid */}
            <div className="gc-cards-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "clamp(6px,0.9vw,12px)",
              opacity: step>=4 ? 1 : 0,
              animation: step>=4 ? "gc-rise .5s ease both" : "none",
            }}>
              {CONTACT_INFO.map((c, i) => (
                <a key={c.label} href={c.href} className="gc-card" style={{
                  display: "flex", flexDirection:"column", gap:4,
                  background:"rgba(255,255,255,0.03)",
                  border:`1px solid rgba(200,134,10,0.15)`,
                  borderRadius:10,
                  padding:"clamp(8px,1.1vw,13px) clamp(8px,1.2vw,14px)",
                  opacity: step>=4+i ? 1 : 0,
                  transition: `opacity 0.3s ease ${i*0.09}s`,
                  boxShadow:"0 2px 12px rgba(0,0,0,0.25)",
                  textDecoration:"none",
                }}>
                  {/* Icon with pulse ring */}
                  <div style={{position:"relative", width:"fit-content", marginBottom:2}}>
                    <span style={{fontSize:"clamp(1rem,1.6vw,1.4rem)"}}>{c.icon}</span>
                    <div style={{
                      position:"absolute", inset:-4,
                      borderRadius:"50%",
                      border:`1.5px solid ${c.color}`,
                      opacity:0,
                      animation:`gc-pulse-ring 2.5s ease-out ${i*0.4}s infinite`,
                    }}/>
                  </div>
                  <div style={{fontSize:"clamp(0.4rem,0.58vw,0.52rem)",fontWeight:700,color:c.color,textTransform:"uppercase",letterSpacing:"0.1em"}}>{c.label}</div>
                  <div style={{fontSize:"clamp(0.42rem,0.65vw,0.58rem)",fontWeight:600,color:"rgba(255,255,255,0.8)",lineHeight:1.3,wordBreak:"break-all"}}>{c.value}</div>
                  <div style={{fontSize:"clamp(0.36rem,0.5vw,0.45rem)",color:"rgba(200,134,10,0.4)",lineHeight:1.3}}>{c.sub}</div>
                </a>
              ))}
            </div>

            {/* CTA row */}
            <div style={{
              display:"flex", gap:"clamp(6px,1vw,12px)", alignItems:"center", flexWrap:"wrap",
              opacity: step>=8 ? 1 : 0,
              animation: step>=8 ? "gc-rise .4s ease both" : "none",
            }}>
              <a href="tel:+919876543210" className="gc-cta" style={{
                background:"linear-gradient(135deg,#C8860A,#FFD200,#C8860A)",
                backgroundSize:"200% 100%",
                border:"none", borderRadius:7,
                padding:"clamp(7px,1.1vw,11px) clamp(16px,2.5vw,28px)",
                fontFamily:"'Josefin Sans',sans-serif",
                fontSize:"clamp(0.52rem,0.8vw,0.7rem)",
                fontWeight:700, textTransform:"uppercase",
                letterSpacing:"0.14em", color:"#06080e",
                boxShadow:"0 4px 20px rgba(200,134,10,0.3)",
                textDecoration:"none",
                display:"inline-flex", alignItems:"center", gap:6,
              }}>📞 Call Now</a>

              <a href="https://wa.me/93248 48838" className="gc-cta" style={{
                background:"transparent",
                border:"1px solid rgba(37,211,102,0.35)",
                borderRadius:7,
                padding:"clamp(6px,1vw,10px) clamp(12px,2vw,22px)",
                fontFamily:"'Josefin Sans',sans-serif",
                fontSize:"clamp(0.5rem,0.76vw,0.66rem)",
                fontWeight:500, textTransform:"uppercase",
                letterSpacing:"0.1em", color:"rgba(37,211,102,0.75)",
                textDecoration:"none",
                display:"inline-flex", alignItems:"center", gap:6,
              }}>💬 WhatsApp Us</a>
            </div>

          </div>

          {/* ── RIGHT: Visual Panel ── */}
          <div className="gc-right-panel" style={{
            position:"relative",
            height:"100%",
            minHeight:"clamp(240px,32vw,440px)",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            overflow:"hidden",
            padding:"clamp(16px,2vw,28px) clamp(10px,1.5vw,20px)",
            gap:"clamp(10px,1.4vw,18px)",
            opacity: step>=3 ? 1 : 0,
            animation: step>=3 ? "gc-rise .7s cubic-bezier(.34,1.1,.64,1) both" : "none",
            borderLeft:"1px solid rgba(200,134,10,0.1)",
          }}>

            {/* Rotating decorative ring */}
            <svg style={{
              position:"absolute", top:"50%", left:"50%",
              transform:"translate(-50%,-50%)",
              width:"130%", height:"130%",
              opacity:0.06, pointerEvents:"none",
              animation:"gc-spin-slow 30s linear infinite",
            }} viewBox="0 0 300 300">
              <circle cx="150" cy="150" r="120" fill="none" stroke="#F5C842" strokeWidth="1" strokeDasharray="8 12"/>
              <circle cx="150" cy="150" r="90"  fill="none" stroke="#C8860A" strokeWidth="1" strokeDasharray="4 16"/>
            </svg>

            {/* Central logo medallion */}
            <div style={{
              position:"relative",
              width:"clamp(60px,8vw,100px)",
              height:"clamp(60px,8vw,100px)",
              borderRadius:"50%",
              background:"linear-gradient(135deg,rgba(200,134,10,0.2),rgba(245,200,66,0.08))",
              border:"2px solid rgba(200,134,10,0.35)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 0 8px rgba(200,134,10,0.06), 0 8px 32px rgba(0,0,0,0.4)",
              animation:"gc-float 4s ease-in-out infinite",
              zIndex:2,
            }}>
              <img src="/half logo.png" alt="Ganesh Finance"
                style={{
                  width:"70%", height:"70%", objectFit:"contain",
                  filter:"drop-shadow(0 2px 8px rgba(200,134,10,0.4))",
                }}
                onError={e=>{
                  e.target.style.display="none";
                  e.target.nextSibling.style.display="flex";
                }}
              />
              {/* Fallback */}
              <span style={{
                display:"none", fontSize:"clamp(18px,2.8vw,36px)",
                position:"absolute",
              }}>🏛</span>
              {/* Pulse ring */}
              <div style={{
                position:"absolute", inset:-10,
                borderRadius:"50%",
                border:"1.5px solid rgba(200,134,10,0.3)",
                animation:"gc-pulse-ring 2s ease-out infinite",
              }}/>
            </div>

            {/* Company name */}
            <div style={{textAlign:"center", zIndex:2}}>
              <div style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:"clamp(0.7rem,1.1vw,0.95rem)",
                fontWeight:900, color:"#F5C842",
                letterSpacing:"0.04em",
                textShadow:"0 2px 12px rgba(200,134,10,0.4)",
              }}>Ganesh Finance</div>
              <div style={{
                fontSize:"clamp(0.36rem,0.52vw,0.46rem)",
                color:"rgba(200,134,10,0.4)",
                letterSpacing:"0.14em", textTransform:"uppercase", marginTop:3,
              }}>Gold Loan Specialists</div>
            </div>

            {/* Quick info pills */}
            <div style={{
              display:"flex", flexDirection:"column", gap:"clamp(5px,0.7vw,8px)",
              width:"100%", zIndex:2,
            }}>
              {[
                {icon:"⏰", text:"Open Mon – Sat"},
                {icon:"🏅", text:"RBI Regulated NBFC"},
                {icon:"🔒", text:"100% Safe & Secure"},
              ].map((item, i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:7,
                  background:"rgba(200,134,10,0.07)",
                  border:"1px solid rgba(200,134,10,0.14)",
                  borderRadius:6,
                  padding:"clamp(4px,0.6vw,7px) clamp(8px,1.1vw,12px)",
                }}>
                  <span style={{fontSize:"clamp(0.65rem,1vw,0.85rem)"}}>{item.icon}</span>
                  <span style={{fontSize:"clamp(0.38rem,0.55vw,0.5rem)",color:"rgba(200,134,10,0.65)",fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase"}}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div style={{
              display:"flex", flexDirection:"column", alignItems:"center", gap:4, zIndex:2,
            }}>
              <div style={{display:"flex", gap:3}}>
                {[...Array(5)].map((_,i)=>(
                  <span key={i} style={{fontSize:"clamp(0.65rem,1vw,0.85rem)",color:"#F5C842",filter:"drop-shadow(0 1px 4px rgba(245,200,66,0.5))"}}>★</span>
                ))}
              </div>
              <div style={{fontSize:"clamp(0.36rem,0.5vw,0.44rem)",color:"rgba(200,134,10,0.4)",letterSpacing:"0.1em",textTransform:"uppercase"}}>500+ Happy Clients</div>
            </div>

          </div>

        </div>

        {/* ── BOTTOM TICKER ── */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          background:"rgba(200,134,10,0.08)",
          borderTop:"1px solid rgba(200,134,10,0.18)",
          padding:"clamp(3px,0.5vw,5px) 0",
          overflow:"hidden",
          opacity: step>=9 ? 1 : 0, transition:"opacity .4s ease",
        }}>
          <div style={{
            display:"flex", gap:40, width:"max-content",
            animation:"gc-ticker 20s linear infinite",
            userSelect:"none",
          }}>
            {[...Array(2)].map((_,r)=>(
              <div key={r} style={{display:"flex",gap:40,alignItems:"center"}}>
                {["Call Us Today","WhatsApp Available","Visit Our Branch","Email Support","RBI Regulated","Zero Hidden Charges","Instant Disbursal","Trusted by 500+ Clients"].map((t,i)=>(
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