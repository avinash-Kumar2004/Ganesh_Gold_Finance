import { useEffect, useRef, useState } from "react";

// ══════════════════════════════════════════════════════════════════
// ANIMATED COUNTER HOOK
// ══════════════════════════════════════════════════════════════════
function useCounter(target, duration = 1400, active = false, isFloat = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(isFloat ? +(ease * target).toFixed(1) : Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return val;
}

// ══════════════════════════════════════════════════════════════════
// STAT CARD
// ══════════════════════════════════════════════════════════════════
function StatCard({ prefix = "", target, suffix = "", label, sublabel, active, delay, isFloat, icon }) {
  const val = useCounter(target, 1600, active, isFloat);
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 0",
        minWidth: "clamp(70px,10vw,120px)",
        padding: "clamp(5px,0.8vw,9px) clamp(4px,0.6vw,8px)",
        background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? "rgba(212,160,23,0.35)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 10,
        textAlign: "center",
        transition: "all 0.25s ease",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.25)" : "none",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
        backdropFilter: "blur(6px)",
        cursor: "default",
      }}
    >
      <div style={{
        fontSize: "clamp(0.9rem,1.5vw,1.3rem)",
        marginBottom: 2,
        filter: "drop-shadow(0 1px 4px rgba(212,160,23,0.4))",
      }}>{icon}</div>

      <div style={{
        fontFamily: "'Barlow Condensed','Impact',sans-serif",
        fontSize: "clamp(1.1rem,2.2vw,1.7rem)",
        fontWeight: 900,
        lineHeight: 1,
        color: "#F5C842",
        letterSpacing: "-0.01em",
      }}>
        {prefix}{val}{suffix}
      </div>

      <div style={{
        fontSize: "clamp(0.48rem,0.7vw,0.6rem)",
        fontWeight: 700,
        color: "rgba(255,255,255,0.85)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginTop: 3,
        lineHeight: 1.3,
      }}>{label}</div>

      {sublabel && (
        <div style={{
          fontSize: "clamp(0.4rem,0.55vw,0.5rem)",
          color: "rgba(255,255,255,0.35)",
          marginTop: 1,
          letterSpacing: "0.04em",
        }}>{sublabel}</div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// WHY INVEST ROW
// ══════════════════════════════════════════════════════════════════
const WHY = [
  { icon: "🏛️", text: "RBI Regulated" },
  { icon: "🔒", text: "Secured Returns" },
  { icon: "📈", text: "Consistent Growth" },
  { icon: "🤝", text: "Transparent Process" },
  { icon: "⚡", text: "Quick Processing" },
  { icon: "💰", text: "Competitive Rates" },
];

// ══════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════
export default function InvestorHeroSlide() {
  const ref      = useRef(null);
  const cycleRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [cycle, setCycle]   = useState(0);
  const [step, setStep]     = useState(0);

  const runCycle = () => {
    setStep(0); setCycle(c => c + 1);
    setTimeout(() => setStep(1),  80);
    setTimeout(() => setStep(2),  350);
    setTimeout(() => setStep(3),  620);
    setTimeout(() => setStep(4),  1050);
    setTimeout(() => setStep(5),  1300);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); runCycle(); }
      else { setInView(false); setStep(0); clearInterval(cycleRef.current); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    cycleRef.current = setInterval(runCycle, 5000);
    return () => clearInterval(cycleRef.current);
  }, [inView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes inv-fade-up  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes inv-fade-dn  { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes inv-slide-r  { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes inv-scale-in { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
        @keyframes inv-shimmer  { 0%{background-position:-250% 0} 100%{background-position:250% 0} }
        @keyframes inv-glow     { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes inv-ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes inv-chip     { from{opacity:0;transform:translateY(10px) scale(0.92)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes inv-pulse    { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }

        .inv-cta {
          transition: transform .22s cubic-bezier(.34,1.5,.64,1), box-shadow .22s ease;
          cursor: pointer; position: relative; overflow: hidden;
          border: none; outline: none;
        }
        .inv-cta:hover { transform: translateY(-3px) scale(1.05); }
        .inv-cta-outline {
          transition: all .22s ease;
          cursor: pointer; background: transparent; outline: none;
        }
        .inv-cta-outline:hover {
          background: rgba(255,255,255,0.08) !important;
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .inv-wrap { padding: 8px 14px 6px !important; }
          .inv-chart-col { display: none !important; }
          .inv-why-grid  { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 420px) {
          .inv-stats-row { flex-wrap: wrap !important; }
          .inv-why-grid  { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <div
        ref={ref}
        className="inv-wrap"
        style={{
          width: "100%",
          background: "linear-gradient(150deg,#0a0f1e 0%,#0d1628 45%,#0a1520 100%)",
          borderTop: "3px solid #D4A017",
          /* ✅ FIX: padding kam kiya — height chhoti hogi */
          padding: "clamp(7px,1.2vw,13px) 5vw clamp(6px,1vw,10px)",
          boxSizing: "border-box",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div style={{
          position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
          backgroundImage:
            "linear-gradient(rgba(212,160,23,0.03) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(212,160,23,0.03) 1px,transparent 1px)",
          backgroundSize:"48px 48px",
        }}/>

        {/* Glow blobs */}
        <div style={{
          position:"absolute", top:"-20%", left:"60%",
          width:"clamp(180px,30vw,360px)", height:"clamp(180px,30vw,360px)",
          borderRadius:"50%",
          background:"radial-gradient(circle,rgba(212,160,23,0.07) 0%,transparent 65%)",
          pointerEvents:"none", zIndex:0,
        }}/>
        <div style={{
          position:"absolute", bottom:"-15%", left:"10%",
          width:"clamp(120px,20vw,260px)", height:"clamp(120px,20vw,260px)",
          borderRadius:"50%",
          background:"radial-gradient(circle,rgba(185,28,28,0.06) 0%,transparent 65%)",
          pointerEvents:"none", zIndex:0,
        }}/>

        {/* MAIN LAYOUT */}
        <div style={{
          display:"flex", gap:"clamp(8px,1.5vw,18px)",
          position:"relative", zIndex:1,
          alignItems:"stretch",
        }}>

          {/* LEFT */}
          <div style={{
            flex:1, minWidth:0,
            display:"flex", flexDirection:"column",
            /* ✅ FIX: gap kam kiya */
            gap:"clamp(4px,0.8vw,8px)",
          }}>

            {/* Logo + brand */}
            <div style={{
              display:"flex", alignItems:"center",
              gap:"clamp(5px,0.8vw,9px)",
              opacity:step>=1?1:0,
              animation:step>=1?"inv-slide-r .48s cubic-bezier(.34,1.1,.64,1) both":"none",
            }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <img
                  src="/half logo.png"
                  alt="Ganesh Finance"
                  style={{
                    /* ✅ FIX: logo thoda chhota */
                    width:"clamp(28px,4vw,42px)",
                    height:"clamp(28px,4vw,42px)",
                    objectFit:"contain",
                    borderRadius:"50%",
                    display:"block",
                  }}
                  onError={e => { e.target.style.display="none"; }}
                />
                {step>=1 && (
                  <div style={{
                    position:"absolute", inset:-3, borderRadius:"50%",
                    border:"1.5px solid rgba(212,160,23,0.4)",
                    animation:"inv-pulse 2.2s ease .6s infinite",
                  }}/>
                )}
              </div>

              <div>
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:5,
                  marginBottom:1,
                }}>
                  <div style={{ width:"clamp(12px,1.6vw,18px)", height:1.5, background:"#D4A017", borderRadius:99 }}/>
                  <span style={{
                    fontSize:"clamp(0.48rem,0.7vw,0.6rem)",
                    fontWeight:600, letterSpacing:".12em",
                    textTransform:"uppercase", color:"#D4A017",
                  }}>Investor Relations</span>
                  <div style={{ width:"clamp(12px,1.6vw,18px)", height:1.5, background:"#D4A017", borderRadius:99 }}/>
                </div>
                <div style={{
                  /* ✅ FIX: brand name font chhota */
                  fontSize:"clamp(0.75rem,1.3vw,0.95rem)",
                  fontWeight:700, color:"#fff",
                  letterSpacing:".02em", lineHeight:1.15,
                }}>Ganesh Finance</div>
                <div style={{
                  fontSize:"clamp(0.44rem,0.6vw,0.54rem)",
                  color:"rgba(255,255,255,.4)",
                  letterSpacing:".08em", textTransform:"uppercase",
                }}>Est. 2019 · NBFC · India</div>
              </div>
            </div>

            {/* Main headline */}
            <div key={`h-${cycle}`} style={{
              opacity:step>=2?1:0,
              animation:step>=2?"inv-fade-up .5s cubic-bezier(.34,1.1,.64,1) both":"none",
            }}>
              <h2 style={{
                margin:0,
                fontFamily:"'Barlow Condensed','Impact',sans-serif",
                /* ✅ FIX: heading size significantly reduced */
                fontSize:"clamp(1rem,2.1vw,1.55rem)",
                fontWeight:900,
                lineHeight:1.05,
                textTransform:"uppercase",
                letterSpacing:".01em",
                color:"#fff",
              }}>
                Grow Your Wealth{" "}
                <span style={{
                  background:"linear-gradient(90deg,#F5C842 0%,#FFE066 40%,#D4A017 70%,#F5C842 100%)",
                  backgroundSize:"250% 100%",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                  animation:"inv-shimmer 3s linear 1s infinite",
                  display:"inline-block",
                }}>With Confidence</span>
              </h2>

              {/* Underline */}
              <div style={{
                height:2, width:"clamp(30px,4vw,44px)", marginTop:5, borderRadius:99,
                background:"linear-gradient(90deg,#D4A017,#B91C1C)",
                transformOrigin:"left",
                transform:step>=2?"scaleX(1)":"scaleX(0)",
                transition:"transform .55s cubic-bezier(.34,1.1,.64,1) .2s",
              }}/>

              <p style={{
                margin:"5px 0 0",
                /* ✅ FIX: description font chhota */
                fontSize:"clamp(0.56rem,0.82vw,0.7rem)",
                color:"rgba(255,255,255,.5)",
                fontWeight:300, lineHeight:1.55,
                maxWidth:"min(420px,90vw)",
              }}>
                Partner with Ganesh Finance — India's fastest-growing gold loan NBFC.
                Transparent operations, consistent returns, and a legacy of trust since 2019.
              </p>
            </div>

            {/* STATS ROW */}
            <div className="inv-stats-row" style={{
              display:"flex",
              gap:"clamp(3px,0.5vw,6px)",
            }}>
              {[
                { prefix:"₹", target:21, suffix:"Cr+", label:"Portfolio Size",   sublabel:"AUM",           icon:"💼", delay:0   },
                { prefix:"",  target:6,  suffix:" Yrs", label:"Years of Growth", sublabel:"2019–2025",     icon:"📅", delay:80  },
                { prefix:"",  target:98, suffix:"%",   label:"Client Retention", sublabel:"Satisfaction",  icon:"⭐", delay:160 },
                { prefix:"",  target:2,  suffix:"+",   label:"Branches",         sublabel:"& Expanding",   icon:"🏢", delay:240 },
              ].map(s => (
                <StatCard key={s.label} {...s} active={step>=3}/>
              ))}
            </div>

            {/* WHY INVEST CHIPS */}
            <div className="inv-why-grid" style={{
              display:"grid",
              gridTemplateColumns:"repeat(6,1fr)",
              gap:"clamp(2px,0.4vw,5px)",
            }}>
              {WHY.map((w,i) => (
                <div key={w.text} style={{
                  display:"flex", flexDirection:"column",
                  alignItems:"center", gap:3,
                  padding:"clamp(4px,0.5vw,6px) clamp(2px,0.3vw,4px)",
                  background:"rgba(255,255,255,0.03)",
                  border:"1px solid rgba(255,255,255,0.06)",
                  borderRadius:8,
                  opacity:step>=4?1:0,
                  animation:step>=4?`inv-chip .38s ease ${i*55}ms both`:"none",
                }}>
                  <span style={{ fontSize:"clamp(0.75rem,1.2vw,1rem)" }}>{w.icon}</span>
                  <span style={{
                    fontSize:"clamp(0.4rem,0.55vw,0.52rem)",
                    fontWeight:600,
                    color:"rgba(255,255,255,.55)",
                    textTransform:"uppercase",
                    letterSpacing:".06em",
                    textAlign:"center",
                    lineHeight:1.3,
                  }}>{w.text}</span>
                </div>
              ))}
            </div>

            {/* CTA ROW */}
            <div style={{
              display:"flex", alignItems:"center",
              gap:"clamp(4px,0.8vw,9px)",
              flexWrap:"wrap",
              opacity:step>=5?1:0,
              animation:step>=5?"inv-scale-in .4s cubic-bezier(.34,1.3,.64,1) both":"none",
            }}>
              <button className="inv-cta" style={{
                padding:"clamp(6px,0.9vw,9px) clamp(13px,2vw,22px)",
                background:"linear-gradient(135deg,#D4A017,#F5C842)",
                borderRadius:7,
                fontFamily:"'Barlow Condensed',sans-serif",
                fontSize:"clamp(0.62rem,0.95vw,0.82rem)",
                fontWeight:800,
                textTransform:"uppercase",
                letterSpacing:".1em",
                color:"#0a0f1e",
                boxShadow:"0 5px 18px rgba(212,160,23,0.35)",
              }}>
                Invest With Us →
              </button>

              <button className="inv-cta-outline" style={{
                padding:"clamp(5px,0.8vw,8px) clamp(11px,1.8vw,19px)",
                border:"1.5px solid rgba(255,255,255,0.18)",
                borderRadius:7,
                fontFamily:"'Barlow Condensed',sans-serif",
                fontSize:"clamp(0.62rem,0.95vw,0.82rem)",
                fontWeight:700,
                textTransform:"uppercase",
                letterSpacing:".1em",
                color:"rgba(255,255,255,0.7)",
              }}>
                Learn More
              </button>

              {/* Trust badge */}
              <div style={{
                display:"flex", alignItems:"center", gap:4,
                padding:"4px 9px",
                background:"rgba(212,160,23,0.08)",
                border:"1px solid rgba(212,160,23,0.2)",
                borderRadius:99,
              }}>
                <div style={{
                  width:5, height:5, borderRadius:"50%",
                  background:"#4ade80",
                  animation:"inv-glow 1.8s ease infinite",
                }}/>
                <span style={{
                  fontSize:"clamp(0.44rem,0.62vw,0.54rem)",
                  fontWeight:600,
                  color:"rgba(255,255,255,0.55)",
                  letterSpacing:".06em",
                  textTransform:"uppercase",
                }}>Actively Seeking Partners</span>
              </div>
            </div>

          </div>

          {/* RIGHT — Mini bar chart */}
          <div className="inv-chart-col" style={{
            width:"clamp(85px,13vw,155px)",
            flexShrink:0,
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-end",
            gap:6,
            paddingBottom:2,
          }}>
            <div style={{
              fontSize:"clamp(0.46rem,0.65vw,0.56rem)",
              fontWeight:600,
              color:"rgba(255,255,255,.3)",
              textTransform:"uppercase",
              letterSpacing:".1em",
              marginBottom:3,
              opacity:step>=3?1:0,
              transition:"opacity .4s ease",
            }}>
              Portfolio Growth
            </div>

            <div style={{
              display:"flex",
              alignItems:"flex-end",
              gap:"clamp(2px,0.5vw,5px)",
              /* ✅ FIX: chart height chhoti */
              height:"clamp(42px,5.5vw,65px)",
              borderBottom:"1px solid rgba(255,255,255,0.08)",
            }}>
              {[
                {yr:"19", pct:14}, {yr:"20", pct:27},
                {yr:"21", pct:44}, {yr:"22", pct:60},
                {yr:"23", pct:76}, {yr:"24", pct:89},
                {yr:"25", pct:100},
              ].map((b,i) => (
                <div key={b.yr} style={{
                  flex:1, display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  justifyContent:"flex-end",
                  height:"100%",
                }}>
                  <div style={{
                    width:"100%",
                    height: step>=3 ? `${b.pct}%` : "0%",
                    borderRadius:"3px 3px 0 0",
                    background: i===6
                      ? "linear-gradient(180deg,#F5C842,#D4A017)"
                      : `rgba(212,160,23,${0.18+(i/6)*0.55})`,
                    transition:`height .6s cubic-bezier(.34,1.05,.64,1) ${i*65}ms`,
                  }}/>
                </div>
              ))}
            </div>

            <div style={{
              display:"flex",
              gap:"clamp(2px,0.5vw,5px)",
              opacity:step>=3?1:0,
              transition:"opacity .4s ease .3s",
            }}>
              {["19","20","21","22","23","24","25"].map((y,i) => (
                <div key={y} style={{
                  flex:1, textAlign:"center",
                  fontSize:"clamp(0.38rem,0.52vw,0.48rem)",
                  fontWeight: i===6?700:400,
                  color: i===6?"#F5C842":"rgba(255,255,255,.28)",
                  letterSpacing:".02em",
                }}>'{y}</div>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM TICKER */}
        <div style={{
          /* ✅ FIX: ticker margin kam kiya */
          marginTop:"clamp(5px,0.9vw,9px)",
          borderTop:"1px solid rgba(255,255,255,0.05)",
          paddingTop:"clamp(4px,0.6vw,7px)",
          overflow:"hidden",
          opacity:step>=5?1:0,
          transition:"opacity .4s ease .2s",
        }}>
          <div style={{
            display:"flex", gap:36,
            animation:"inv-ticker 20s linear infinite",
            width:"max-content", userSelect:"none",
          }}>
            {[...Array(2)].map((_,r) => (
              <div key={r} style={{ display:"flex", gap:36, alignItems:"center" }}>
                {[
                  "Gold Loan NBFC","Trusted Since 2019","₹21Cr+ Portfolio",
                  "2+ Branches","98% Retention","Actively Expanding",
                  "Transparent Returns","RBI Compliant","Partner With Us",
                ].map((t,i) => (
                  <span key={i} style={{
                    display:"inline-flex", alignItems:"center", gap:7,
                    fontSize:"clamp(0.44rem,0.62vw,0.54rem)",
                    fontWeight:600,
                    color:"rgba(255,255,255,.22)",
                    letterSpacing:".1em",
                    textTransform:"uppercase",
                    whiteSpace:"nowrap",
                  }}>
                    <span style={{ color:"#D4A017", fontSize:"0.42rem" }}>◆</span>
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <p style={{
          margin:"clamp(4px,0.7vw,7px) 0 0",
          fontSize:"clamp(0.4rem,0.56vw,0.5rem)",
          color:"rgba(255,255,255,.15)",
          letterSpacing:".03em",
          position:"relative", zIndex:1,
        }}>
          *Indicative figures. Investment subject to market risks. Ganesh Finance, Est. 2019. NBFC, India.
        </p>

      </div>
    </>
  );
}