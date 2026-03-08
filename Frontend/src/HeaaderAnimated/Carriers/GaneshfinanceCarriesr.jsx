import { useEffect, useRef, useState } from "react";

const ROLES = [
  { title: "Branch Manager",    icon: "🏛️", tag: "Leadership"  },
  { title: "Gold Loan Officer",  icon: "💰", tag: "Sales"       },
  { title: "Field Executive",    icon: "🤝", tag: "Operations"  },
  { title: "Credit Analyst",     icon: "📊", tag: "Finance"     },
  { title: "Customer Relations", icon: "⭐", tag: "Service"     },
  { title: "Cashier",            icon: "🔐", tag: "Finance"     },
];

function RoleCard({ title, icon, tag, active, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "clamp(5px,.75vw,8px) clamp(7px,1vw,11px)",
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? "rgba(255,200,50,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 8,
        opacity: active ? 1 : 0,
        transform: active ? "translateX(0)" : "translateX(18px)",
        transition: `opacity .4s ease ${delay}ms, transform .45s cubic-bezier(.34,1.1,.64,1) ${delay}ms, background .2s, border-color .2s`,
        cursor: "default", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: hov ? 0 : "-100%",
        width: "100%", height: "100%",
        background: "linear-gradient(90deg,rgba(255,200,50,.04),transparent)",
        transition: "left .35s ease",
        pointerEvents: "none",
      }} />
      <span style={{ fontSize: "clamp(.75rem,1.1vw,.95rem)", flexShrink: 0 }}>{icon}</span>
      <span style={{
        fontSize: "clamp(.5rem,.72vw,.62rem)", fontWeight: 600,
        color: hov ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.5)",
        letterSpacing: ".02em", transition: "color .2s", flex: 1,
      }}>{title}</span>
      <span style={{
        fontSize: "clamp(.38rem,.52vw,.46rem)", fontWeight: 700,
        color: hov ? "#FFD632" : "rgba(255,200,50,.3)",
        textTransform: "uppercase", letterSpacing: ".1em",
        transition: "color .2s", flexShrink: 0,
      }}>{tag}</span>
    </div>
  );
}

export default function CareersSlide2() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const run = () => {
      setStep(0);
      setTimeout(() => setStep(1), 60);
      setTimeout(() => setStep(2), 280);
      setTimeout(() => setStep(3), 520);
      setTimeout(() => setStep(4), 780);
      setTimeout(() => setStep(5), 1000);
    };
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) run(); else setStep(0); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,700;1,600&family=Josefin+Sans:wght@300;400;600;700&display=swap');

        @keyframes c2-left  { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes c2-up    { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes c2-fade  { from{opacity:0} to{opacity:1} }
        @keyframes c2-line  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes c2-ticker{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes c2-dot   { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes c2-ring  {
          0%   { transform:rotate(0deg) scale(1);   opacity:.5; }
          50%  { transform:rotate(180deg) scale(1.04); opacity:.8; }
          100% { transform:rotate(360deg) scale(1);   opacity:.5; }
        }
        @keyframes c2-float {
          0%,100%{ transform:translateY(0) rotate(-1deg); }
          50%    { transform:translateY(-6px) rotate(1deg); }
        }
        @keyframes c2-count {
          from{opacity:0;transform:scale(.75) translateY(8px)}
          to  {opacity:1;transform:scale(1) translateY(0)}
        }
        @keyframes c2-shimmer {
          0%  {background-position:-200% 0}
          100%{background-position: 200% 0}
        }

        .c2-btn {
          cursor:pointer;border:none;outline:none;
          transition:transform .2s cubic-bezier(.34,1.5,.64,1),box-shadow .2s;
        }
        .c2-btn:hover{ transform:translateY(-2px) scale(1.05); }
      `}</style>

      <div
        ref={ref}
        style={{
          width: "100%", boxSizing: "border-box",
          background: "linear-gradient(140deg,#080608 0%,#100c14 50%,#080a10 100%)",
          fontFamily: "'Josefin Sans',system-ui,sans-serif",
          position: "relative", overflow: "hidden", padding: "0",
          borderTop: "2px solid #C8860A",
        }}
      >
        {/* Subtle purple-gold ambient */}
        <div style={{
          position:"absolute",top:"-30%",right:"10%",
          width:"clamp(200px,30vw,350px)",height:"clamp(200px,30vw,350px)",
          borderRadius:"50%",zIndex:0,pointerEvents:"none",
          background:"radial-gradient(circle,rgba(200,134,10,.07) 0%,transparent 65%)",
        }}/>
        <div style={{
          position:"absolute",bottom:"-20%",left:"35%",
          width:"clamp(140px,20vw,240px)",height:"clamp(140px,20vw,240px)",
          borderRadius:"50%",zIndex:0,pointerEvents:"none",
          background:"radial-gradient(circle,rgba(120,40,120,.05) 0%,transparent 65%)",
        }}/>

        {/* Hex pattern */}
        <div style={{
          position:"absolute",inset:0,zIndex:0,pointerEvents:"none",opacity:.025,
          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='46'%3E%3Cpolygon points='26,2 50,14 50,40 26,52 2,40 2,14' fill='none' stroke='%23C8860A' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize:"52px 46px",
        }}/>

        {/* ══ GRID ══ */}
        <div style={{
          position:"relative",zIndex:1,
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          minHeight:"clamp(240px,32vw,440px)",
        }}>

          {/* ══ LEFT: Headline + visual ══ */}
          <div style={{
            padding:"clamp(18px,2.6vw,28px) clamp(12px,1.8vw,20px) clamp(14px,2vw,22px) clamp(16px,2.5vw,28px)",
            display:"flex",flexDirection:"column",
            justifyContent:"space-between",
            borderRight:"1px solid rgba(255,255,255,.05)",
          }}>

            {/* Brand */}
            <div style={{
              opacity:step>=1?1:0,
              animation:step>=1?"c2-left .45s ease both":"none",
            }}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <img src="/half logo.png" alt=""
                  style={{
                    width:"clamp(24px,3vw,34px)",height:"clamp(24px,3vw,34px)",
                    borderRadius:"50%",objectFit:"contain",
                    boxShadow:"0 0 0 1.5px rgba(200,134,10,.35)",
                  }}
                  onError={e=>e.target.style.display="none"}
                />
                <div>
                  <div style={{fontSize:"clamp(.52rem,.72vw,.62rem)",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"#C8860A"}}>Ganesh Finance</div>
                  <div style={{fontSize:"clamp(.4rem,.54vw,.5rem)",color:"rgba(255,255,255,.25)",letterSpacing:".1em",textTransform:"uppercase"}}>Gold Loan NBFC · Est. 2019</div>
                </div>
                {/* Hiring badge */}
                <div style={{
                  marginLeft:"auto",display:"flex",alignItems:"center",gap:4,
                  padding:"3px 8px",borderRadius:99,
                  background:"rgba(34,168,107,.1)",
                  border:"1px solid rgba(34,168,107,.25)",
                }}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#22a86b",animation:"c2-dot 2s ease infinite"}}/>
                  <span style={{fontSize:"clamp(.4rem,.54vw,.5rem)",fontWeight:700,color:"rgba(34,168,107,.8)",letterSpacing:".1em",textTransform:"uppercase"}}>Hiring</span>
                </div>
              </div>

              {/* Eyebrow */}
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
                <div style={{width:"clamp(14px,2vw,22px)",height:1.5,background:"#C8860A",borderRadius:99}}/>
                <span style={{fontSize:"clamp(.44rem,.6vw,.54rem)",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(200,134,10,.65)",fontWeight:600}}>Careers</span>
              </div>

              {/* Big headline */}
              <h2 style={{
                margin:0,
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontSize:"clamp(1.2rem,2.4vw,2rem)",
                fontWeight:700,lineHeight:1.08,
                color:"#fff",letterSpacing:"-.01em",
              }}>
                Shape Your Future<br/>
                <span style={{
                  background:"linear-gradient(90deg,#FFE566,#D4A017,#FFE566)",
                  backgroundSize:"200% 100%",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                  animation:"c2-shimmer 3s linear infinite",
                  display:"inline-block",
                }}>in Gold Finance.</span>
              </h2>

              {/* Underline */}
              <div style={{
                height:1.5,width:"clamp(28px,4vw,42px)",marginTop:8,
                background:"linear-gradient(90deg,#C8860A,transparent)",
                transformOrigin:"left",
                transform:step>=1?"scaleX(1)":"scaleX(0)",
                transition:"transform .5s ease .3s",
              }}/>

              <p style={{
                margin:"7px 0 0",
                fontSize:"clamp(.5rem,.7vw,.62rem)",
                color:"rgba(255,255,255,.32)",
                lineHeight:1.65,fontWeight:300,
                maxWidth:"min(320px,90vw)",
              }}>
                Be part of India's emerging gold loan NBFC — where every employee is a stakeholder in our growth story.
              </p>
            </div>

            {/* Bottom: 3 pillars horizontal */}
            <div style={{
              display:"grid",gridTemplateColumns:"repeat(3,1fr)",
              gap:"clamp(5px,.8vw,9px)",
            }}>
              {[
                {icon:"💼",val:"₹",   label:"Competitive Pay",  delay:0  },
                {icon:"📈",val:"Fast", label:"Growth Path",      delay:80 },
                {icon:"🤝",val:"Team", label:"Great Culture",    delay:160},
              ].map((p)=>(
                <div key={p.label} style={{
                  padding:"clamp(6px,.9vw,9px) clamp(5px,.7vw,7px)",
                  background:"rgba(255,255,255,.025)",
                  border:"1px solid rgba(255,255,255,.06)",
                  borderRadius:8,textAlign:"center",
                  opacity:step>=3?1:0,
                  transform:step>=3?"translateY(0)":"translateY(10px)",
                  transition:`all .4s ease ${p.delay}ms`,
                }}>
                  <div style={{fontSize:"clamp(.9rem,1.4vw,1.1rem)",marginBottom:3}}>{p.icon}</div>
                  <div style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:"clamp(.7rem,1.1vw,.9rem)",
                    fontWeight:700,color:"#FFD632",lineHeight:1,marginBottom:2,
                  }}>{p.val}</div>
                  <div style={{
                    fontSize:"clamp(.4rem,.56vw,.5rem)",fontWeight:600,
                    color:"rgba(255,255,255,.3)",textTransform:"uppercase",letterSpacing:".08em",
                  }}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT: Roles + CTA ══ */}
          <div style={{
            padding:"clamp(18px,2.6vw,28px) clamp(16px,2.4vw,26px) clamp(14px,2vw,22px) clamp(14px,2vw,20px)",
            display:"flex",flexDirection:"column",
            justifyContent:"space-between",
            gap:"clamp(8px,1.2vw,12px)",
          }}>

            {/* Right header */}
            <div style={{
              opacity:step>=2?1:0,
              animation:step>=2?"c2-up .4s ease both":"none",
            }}>
              <div style={{
                display:"flex",alignItems:"center",
                justifyContent:"space-between",
                marginBottom:8,
              }}>
                <div style={{
                  fontSize:"clamp(.46rem,.65vw,.56rem)",
                  fontWeight:700,letterSpacing:".16em",
                  textTransform:"uppercase",color:"rgba(200,134,10,.6)",
                }}>Open Positions</div>
                <div style={{
                  padding:"2px 8px",borderRadius:99,
                  background:"rgba(200,134,10,.1)",
                  border:"1px solid rgba(200,134,10,.2)",
                  fontSize:"clamp(.4rem,.56vw,.5rem)",
                  fontWeight:700,color:"#FFD632",
                  letterSpacing:".1em",
                }}>{ROLES.length} Roles</div>
              </div>

              {/* Divider */}
              <div style={{
                height:1,
                background:"linear-gradient(90deg,rgba(200,134,10,.25),transparent)",
                marginBottom:8,
                transformOrigin:"left",
                transform:step>=2?"scaleX(1)":"scaleX(0)",
                transition:"transform .5s ease .1s",
              }}/>
            </div>

            {/* Role cards */}
            <div style={{
              flex:1,display:"flex",flexDirection:"column",
              gap:"clamp(4px,.6vw,6px)",
            }}>
              {ROLES.map((r,i)=>(
                <RoleCard key={r.title} {...r} active={step>=3} delay={i*55}/>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              display:"flex",alignItems:"center",
              gap:"clamp(5px,.8vw,9px)",flexWrap:"wrap",
              opacity:step>=5?1:0,
              transition:"opacity .4s ease",
            }}>
              <button className="c2-btn" style={{
                padding:"clamp(5px,.8vw,8px) clamp(14px,2vw,20px)",
                background:"linear-gradient(135deg,#B8750A,#FFD200,#B8750A)",
                backgroundSize:"200% 100%",borderRadius:6,
                fontFamily:"'Josefin Sans',sans-serif",
                fontSize:"clamp(.52rem,.74vw,.64rem)",
                fontWeight:700,textTransform:"uppercase",
                letterSpacing:".12em",color:"#06080e",
                boxShadow:"0 4px 16px rgba(200,134,10,.28)",
              }}>Apply Now →</button>

              <button className="c2-btn" style={{
                padding:"clamp(4px,.7vw,7px) clamp(11px,1.6vw,16px)",
                background:"transparent",
                border:"1px solid rgba(255,255,255,.1)",borderRadius:6,
                fontFamily:"'Josefin Sans',sans-serif",
                fontSize:"clamp(.52rem,.74vw,.64rem)",
                fontWeight:500,textTransform:"uppercase",
                letterSpacing:".1em",color:"rgba(255,255,255,.4)",
              }}>Learn More</button>

              <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:"clamp(.4rem,.54vw,.5rem)",color:"rgba(255,255,255,.2)",letterSpacing:".08em",textTransform:"uppercase"}}>🏛️ RBI Regulated</span>
              </div>
            </div>

          </div>
        </div>

        {/* ══ TICKER ══ */}
        <div style={{
          background:"rgba(0,0,0,.4)",
          borderTop:"1px solid rgba(200,134,10,.1)",
          padding:"clamp(4px,.6vw,6px) 0",
          overflow:"hidden",
          opacity:step>=5?1:0,
          transition:"opacity .4s ease",
        }}>
          <div style={{
            display:"flex",gap:40,width:"max-content",
            animation:"c2-ticker 22s linear infinite",
            userSelect:"none",
          }}>
            {[...Array(2)].map((_,r)=>(
              <div key={r} style={{display:"flex",gap:40,alignItems:"center"}}>
                {["Branch Manager","Gold Loan Officer","Field Executive","Credit Analyst",
                  "Customer Relations","Cashier","Join Ganesh Finance","Grow With Us"].map((t,i)=>(
                  <span key={i} style={{
                    display:"inline-flex",alignItems:"center",gap:7,
                    fontSize:"clamp(.4rem,.56vw,.5rem)",fontWeight:500,
                    color:"rgba(200,134,10,.28)",letterSpacing:".14em",
                    textTransform:"uppercase",whiteSpace:"nowrap",
                  }}>
                    <span style={{color:"#C8860A",fontSize:".34rem"}}>◈</span>{t}
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