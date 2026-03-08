import { useEffect, useRef, useState } from "react";

function useCount(to, dur = 1500, run = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) { setV(0); return; }
    let s = null;
    const f = (t) => {
      if (!s) s = t;
      const p = Math.min((t - s) / dur, 1);
      setV(Math.floor((1 - Math.pow(2, -10 * p)) * to));
      if (p < 1) requestAnimationFrame(f);
      else setV(to);
    };
    requestAnimationFrame(f);
  }, [run, to]);
  return v;
}

export default function SovereignSlide() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);

  const crVal = useCount(21,  1500, step >= 2);
  const yrVal = useCount(6,   1200, step >= 2);
  const clVal = useCount(500, 1800, step >= 2);

  useEffect(() => {
    const run = () => {
      setStep(0);
      setTimeout(() => setStep(1), 80);
      setTimeout(() => setStep(2), 350);
      setTimeout(() => setStep(3), 700);
      setTimeout(() => setStep(4), 1000);
    };
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) run(); else setStep(0);
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { icon: "💼", val: `₹${crVal}Cr+`, label: "Self-Built AUM" },
    { icon: "🚫", val: "0%",           label: "External Debt"  },
    { icon: "🔐", val: "0",            label: "Outside Investors" },
    { icon: "📅", val: `${yrVal}Yrs`,  label: "Organic Growth" },
    { icon: "👥", val: `${clVal}+`,    label: "Clients Served" },
  ];

  const facts = [
    { icon: "🏅", text: "100% promoter-owned — no equity ever diluted to any external party." },
    { icon: "📈", text: "Profitable since inception. Bootstrapped, zero burn, no funding rounds." },
    { icon: "🌱", text: "2+ branches opened purely from operational profits — zero borrowed capital." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@300;400;500;600;700&display=swap');

        @keyframes sv-up     { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sv-shine  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes sv-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes sv-spin   { to{transform:rotate(360deg)} }
        @keyframes sv-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes sv-dot    { 0%,100%{opacity:.35} 50%{opacity:1} }

        .sv-gold { cursor:pointer;border:none;outline:none;transition:transform .2s,box-shadow .2s; }
        .sv-gold:hover { transform:translateY(-2px) scale(1.03);box-shadow:0 10px 26px rgba(200,134,10,.42) !important; }
        .sv-ghost { cursor:pointer;outline:none;transition:all .2s; }
        .sv-ghost:hover { background:rgba(200,134,10,.07) !important;border-color:rgba(200,134,10,.3) !important; }

        .sv-stat:hover { border-color:rgba(200,134,10,.35) !important;background:rgba(200,134,10,.07) !important; }

        @media(max-width:560px){
          .sv-right { display:none !important; }
          .sv-stats { flex-wrap:wrap !important; }
          .sv-stats > * { min-width:calc(33% - 4px) !important; }
        }
      `}</style>

      <div
        ref={ref}
        style={{
          width: "100%",
          boxSizing: "border-box",
          /* KEY FIX: no overflow:hidden on outer, let content breathe */
          background: "linear-gradient(140deg,#07090f 0%,#0b1119 55%,#070c14 100%)",
          borderTop: "2px solid #C8860A",
          fontFamily: "'Outfit',system-ui,sans-serif",
          position: "relative",
          /* Generous but not excessive padding */
          padding: "clamp(10px,1.5vw,16px) clamp(14px,2.5vw,28px) clamp(8px,1.2vw,14px)",
        }}
      >
        {/* BG hex pattern */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:0,opacity:.025,
          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='46'%3E%3Cpolygon points='26,2 50,14 50,40 26,52 2,40 2,14' fill='none' stroke='%23C8860A' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize:"52px 46px",
        }}/>
        {/* Glow */}
        <div style={{
          position:"absolute",top:"-40%",right:"-5%",zIndex:0,pointerEvents:"none",
          width:"clamp(160px,25vw,280px)",height:"clamp(160px,25vw,280px)",borderRadius:"50%",
          background:"radial-gradient(circle,rgba(200,134,10,.055) 0%,transparent 65%)",
        }}/>

        {/* ═══ MAIN FLEX ═══ */}
        <div style={{
          position:"relative",zIndex:1,
          display:"flex",gap:"clamp(10px,2vw,22px)",alignItems:"stretch",
        }}>

          {/* ── LEFT ── */}
          <div style={{
            flex:1,minWidth:0,
            display:"flex",flexDirection:"column",
            gap:"clamp(6px,1vw,10px)",
          }}>

            {/* Row 1: Brand + badge */}
            <div style={{
              display:"flex",alignItems:"center",gap:8,
              opacity:step>=1?1:0,
              animation:step>=1?"sv-up .4s cubic-bezier(.34,1.1,.64,1) both":"none",
            }}>
              <img src="/half logo.png" alt=""
                style={{width:"clamp(24px,3vw,34px)",height:"clamp(24px,3vw,34px)",borderRadius:"50%",objectFit:"contain",flexShrink:0}}
                onError={e=>e.target.style.display="none"}
              />
              <div>
                <div style={{fontSize:"clamp(.54rem,.75vw,.64rem)",fontWeight:700,color:"#C8860A",letterSpacing:".14em",textTransform:"uppercase",lineHeight:1.2}}>
                  Ganesh Finance
                </div>
                <div style={{fontSize:"clamp(.42rem,.58vw,.52rem)",color:"rgba(255,255,255,.28)",letterSpacing:".08em",textTransform:"uppercase"}}>
                  Gold Loan NBFC · Est. 2019 · India
                </div>
              </div>
              {/* badge */}
              <div style={{
                marginLeft:"auto",display:"flex",alignItems:"center",gap:4,
                padding:"3px 8px",borderRadius:99,
                border:"1px solid rgba(200,134,10,.18)",
                background:"rgba(200,134,10,.04)",
              }}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"#4ade80",animation:"sv-dot 2s ease infinite"}}/>
                <span style={{fontSize:"clamp(.4rem,.55vw,.5rem)",fontWeight:600,color:"rgba(255,255,255,.35)",letterSpacing:".1em",textTransform:"uppercase"}}>
                  Zero Debt · Self-Owned
                </span>
              </div>
            </div>

            {/* Row 2: Headline */}
            <div style={{
              opacity:step>=1?1:0,
              animation:step>=1?"sv-up .48s cubic-bezier(.34,1.1,.64,1) .08s both":"none",
            }}>
              <div style={{fontSize:"clamp(.44rem,.62vw,.54rem)",fontWeight:600,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(200,134,10,.6)",marginBottom:4}}>
                The Sovereign Difference
              </div>
              <h2 style={{
                margin:0,
                fontFamily:"'Playfair Display',Georgia,serif",
                fontSize:"clamp(.95rem,1.9vw,1.5rem)",
                fontWeight:900,lineHeight:1.1,color:"#fff",letterSpacing:"-.01em",
              }}>
                Built on Gold.{" "}
                <span style={{
                  background:"linear-gradient(90deg,#FFE566,#FFD200,#C8860A,#FFD200,#FFE566)",
                  backgroundSize:"200% 100%",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                  animation:"sv-shine 3.5s linear infinite",display:"inline-block",
                }}>Owned by None.</span>
              </h2>
              <p style={{
                margin:"4px 0 0",
                fontSize:"clamp(.52rem,.74vw,.64rem)",
                color:"rgba(255,255,255,.35)",lineHeight:1.6,fontWeight:300,
                maxWidth:"min(400px,90vw)",
              }}>
                No external debt. No outside investors. Every rupee is our own —
                making Ganesh Finance one of India's rarest{" "}
                <em style={{color:"rgba(255,255,255,.55)",fontStyle:"normal"}}>financially sovereign</em>{" "}
                gold NBFCs.
              </p>
            </div>

            {/* Row 3: Stats */}
            <div className="sv-stats" style={{display:"flex",gap:"clamp(3px,.5vw,6px)"}}>
              {stats.map((s,i)=>(
                <div key={s.label} className="sv-stat" style={{
                  flex:"1 1 0",
                  display:"flex",flexDirection:"column",alignItems:"center",gap:3,
                  padding:"clamp(6px,.9vw,9px) clamp(3px,.4vw,5px)",
                  background:"rgba(255,255,255,.025)",
                  border:"1px solid rgba(255,255,255,.06)",
                  borderRadius:8,
                  opacity:step>=2?1:0,
                  transform:step>=2?"translateY(0)":"translateY(14px)",
                  transition:`all .45s cubic-bezier(.34,1.1,.64,1) ${i*60}ms`,
                  cursor:"default",
                }}>
                  <span style={{fontSize:"clamp(.85rem,1.3vw,1.1rem)"}}>{s.icon}</span>
                  <span style={{
                    fontFamily:"'Playfair Display',Georgia,serif",
                    fontSize:"clamp(.95rem,1.6vw,1.3rem)",fontWeight:700,color:"#FFD632",lineHeight:1,
                  }}>{s.val}</span>
                  <span style={{
                    fontSize:"clamp(.42rem,.58vw,.52rem)",fontWeight:600,textTransform:"uppercase",
                    letterSpacing:".08em",color:"rgba(255,255,255,.4)",textAlign:"center",lineHeight:1.3,
                  }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Row 4: Facts — inline, compact */}
            <div style={{
              display:"flex",flexDirection:"column",gap:"clamp(3px,.45vw,5px)",
              paddingLeft:"clamp(8px,1.1vw,12px)",
              borderLeft:"1.5px solid rgba(200,134,10,.15)",
            }}>
              {facts.map((f,i)=>(
                <div key={i} style={{
                  display:"flex",alignItems:"flex-start",gap:6,
                  opacity:step>=3?1:0,
                  transform:step>=3?"translateX(0)":"translateX(-12px)",
                  transition:`all .4s ease ${i*70}ms`,
                }}>
                  <span style={{
                    fontSize:"clamp(.62rem,.9vw,.75rem)",flexShrink:0,marginTop:1,
                  }}>{f.icon}</span>
                  <span style={{
                    fontSize:"clamp(.5rem,.7vw,.62rem)",
                    color:"rgba(255,255,255,.38)",lineHeight:1.55,fontWeight:300,
                  }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Row 5: CTA */}
            <div style={{
              display:"flex",alignItems:"center",gap:"clamp(4px,.7vw,8px)",flexWrap:"wrap",
              opacity:step>=4?1:0,
              transform:step>=4?"translateY(0)":"translateY(8px)",
              transition:"all .4s cubic-bezier(.34,1.1,.64,1)",
            }}>
              <button className="sv-gold" style={{
                padding:"clamp(5px,.8vw,8px) clamp(14px,2vw,20px)",
                background:"linear-gradient(135deg,#B8750A,#FFD200,#B8750A)",
                backgroundSize:"200% 100%",
                borderRadius:6,fontFamily:"'Outfit',sans-serif",
                fontSize:"clamp(.54rem,.78vw,.68rem)",fontWeight:700,
                textTransform:"uppercase",letterSpacing:".1em",color:"#06080e",
                boxShadow:"0 4px 16px rgba(200,134,10,.28)",
              }}>Partner With Us →</button>

              <button className="sv-ghost" style={{
                padding:"clamp(4px,.7vw,7px) clamp(11px,1.6vw,17px)",
                border:"1px solid rgba(255,255,255,.1)",borderRadius:6,
                fontFamily:"'Outfit',sans-serif",
                fontSize:"clamp(.54rem,.78vw,.68rem)",fontWeight:500,
                textTransform:"uppercase",letterSpacing:".08em",
                color:"rgba(255,255,255,.45)",background:"transparent",
              }}>Our Story</button>

              <div style={{
                display:"flex",alignItems:"center",gap:4,
                padding:"3px 8px",borderRadius:99,
                background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",
              }}>
                <span style={{fontSize:".6rem"}}>🏛️</span>
                <span style={{fontSize:"clamp(.4rem,.55vw,.5rem)",fontWeight:500,color:"rgba(255,255,255,.28)",letterSpacing:".08em",textTransform:"uppercase"}}>
                  RBI Regulated
                </span>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Emblem ── */}
          <div className="sv-right" style={{
            width:"clamp(80px,10vw,125px)",flexShrink:0,
            display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",
            position:"relative",
          }}>
            {/* Rings */}
            <div style={{
              position:"absolute",
              width:"clamp(76px,9.5vw,118px)",height:"clamp(76px,9.5vw,118px)",
              borderRadius:"50%",border:"1px dashed rgba(200,134,10,.15)",
              animation:"sv-spin 30s linear infinite",
            }}/>
            <div style={{
              position:"absolute",
              width:"clamp(54px,6.8vw,85px)",height:"clamp(54px,6.8vw,85px)",
              borderRadius:"50%",border:"1px solid rgba(200,134,10,.08)",
            }}/>

            {/* Coin */}
            <div style={{
              width:"clamp(44px,5.8vw,72px)",height:"clamp(44px,5.8vw,72px)",
              borderRadius:"50%",
              background:"radial-gradient(circle at 38% 32%,#FFE87A 0%,#C8860A 52%,#7A4F04 100%)",
              boxShadow:"0 0 22px rgba(200,134,10,.32),inset 0 2px 4px rgba(255,255,255,.15)",
              display:"flex",alignItems:"center",justifyContent:"center",
              animation:step>=2?"sv-float 5s ease-in-out infinite":"none",
              opacity:step>=2?1:0,transition:"opacity .5s ease .3s",
              position:"relative",zIndex:2,
            }}>
              <span style={{fontSize:"clamp(1.1rem,1.8vw,1.6rem)",filter:"drop-shadow(0 2px 3px rgba(0,0,0,.5))"}}>🪙</span>
            </div>

            {/* Orbit labels */}
            {[
              {val:"0%", sub:"Debt",      top:"8%",  left:"50%"},
              {val:"0",  sub:"Investors", top:"50%", left:"98%"},
              {val:"100%",sub:"Own",      top:"90%", left:"50%"},
            ].map((o,i)=>(
              <div key={i} style={{
                position:"absolute",top:o.top,left:o.left,
                transform:"translate(-50%,-50%)",textAlign:"center",zIndex:3,
                opacity:step>=3?1:0,
                transition:`opacity .35s ease ${350+i*90}ms`,
                pointerEvents:"none",
              }}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(.55rem,.82vw,.7rem)",fontWeight:700,color:"#FFD632",lineHeight:1}}>{o.val}</div>
                <div style={{fontSize:"clamp(.34rem,.46vw,.42rem)",color:"rgba(255,255,255,.28)",textTransform:"uppercase",letterSpacing:".1em",marginTop:1}}>{o.sub}</div>
              </div>
            ))}

            <div style={{
              marginTop:"clamp(36px,5vw,58px)",
              fontSize:"clamp(.38rem,.5vw,.46rem)",fontWeight:600,
              letterSpacing:".12em",textTransform:"uppercase",
              color:"rgba(200,134,10,.38)",textAlign:"center",
              opacity:step>=3?1:0,transition:"opacity .4s ease .6s",
              whiteSpace:"nowrap",
            }}>Financially Sovereign</div>
          </div>

        </div>

        {/* ═══ TICKER ═══ */}
        <div style={{
          marginTop:"clamp(6px,.9vw,10px)",
          borderTop:"1px solid rgba(255,255,255,.04)",
          paddingTop:"clamp(4px,.6vw,6px)",
          overflow:"hidden",
          opacity:step>=4?1:0,transition:"opacity .4s ease",
        }}>
          <div style={{
            display:"flex",gap:36,width:"max-content",
            animation:"sv-ticker 22s linear infinite",userSelect:"none",
          }}>
            {[...Array(2)].map((_,r)=>(
              <div key={r} style={{display:"flex",gap:36,alignItems:"center"}}>
                {["Zero External Debt","100% Self-Funded","No Outside Investors","Gold Loan NBFC","6 Years Organic Growth","RBI Regulated","Profitable Since Day 1","Bootstrapped","Ganesh Finance"].map((t,i)=>(
                  <span key={i} style={{
                    display:"inline-flex",alignItems:"center",gap:6,
                    fontSize:"clamp(.4rem,.56vw,.5rem)",fontWeight:500,
                    color:"rgba(255,255,255,.15)",letterSpacing:".12em",
                    textTransform:"uppercase",whiteSpace:"nowrap",
                  }}>
                    <span style={{color:"#C8860A",fontSize:".36rem"}}>◈</span>{t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <p style={{
          margin:"clamp(3px,.5vw,5px) 0 0",
          fontSize:"clamp(.36rem,.5vw,.46rem)",
          color:"rgba(255,255,255,.09)",letterSpacing:".03em",
          position:"relative",zIndex:1,
        }}>
          *RBI-registered NBFC. All figures indicative. Past performance is not indicative of future returns.
        </p>

      </div>
    </>
  );
}