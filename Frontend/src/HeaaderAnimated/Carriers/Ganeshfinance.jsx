import { useEffect, useRef, useState } from "react";

export default function CareersSlide() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const run = () => {
      setStep(0);
      setTimeout(() => setStep(1), 80);
      setTimeout(() => setStep(2), 350);
      setTimeout(() => setStep(3), 600);
      setTimeout(() => setStep(4), 900);
      setTimeout(() => setStep(5), 1150);
    };
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) run(); else setStep(0); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Team members — using colored silhouette avatars since no real photos
  const team = [
    { label: "Branch Manager",  color: "#1a1a2e", delay: 0,   fromX: 120, scale: 1.08, zIdx: 3 },
    { label: "Loan Officer",    color: "#16213e", delay: 120,  fromX: 80,  scale: 0.96, zIdx: 2 },
    { label: "Field Executive", color: "#0f3460", delay: 240,  fromX: 60,  scale: 0.88, zIdx: 1 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700;900&family=Josefin+Sans:wght@300;400;600;700&display=swap');

        @keyframes cr-left   { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes cr-up     { from{opacity:0;transform:translateY(18px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes cr-fade   { from{opacity:0} to{opacity:1} }
        @keyframes cr-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes cr-dot    { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes cr-flare  {
          0%   { opacity:0;transform:translateX(-80px) skewX(-15deg); }
          40%  { opacity:.15; }
          100% { opacity:0;transform:translateX(130vw) skewX(-15deg); }
        }
        @keyframes cr-person {
          from { opacity:0; transform:translateX(var(--fromX)) scale(.92); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }
        @keyframes cr-badge  {
          0%   { opacity:0;transform:translateY(-18px) scale(.85); }
          60%  { transform:translateY(3px) scale(1.04); }
          100% { opacity:1;transform:translateY(0) scale(1); }
        }
        @keyframes cr-glow {
          0%,100% { box-shadow: 0 0 18px rgba(185,28,28,.3),0 0 40px rgba(185,28,28,.1); }
          50%      { box-shadow: 0 0 28px rgba(185,28,28,.5),0 0 60px rgba(185,28,28,.2); }
        }
        @keyframes cr-spotlight {
          0%,100%{ opacity:.6; transform:scaleX(1); }
          50%    { opacity:1;  transform:scaleX(1.08); }
        }

        .cr-btn {
          cursor:pointer;border:none;outline:none;
          transition:transform .2s cubic-bezier(.34,1.5,.64,1),box-shadow .2s;
        }
        .cr-btn:hover { transform:translateY(-2px) scale(1.05); }
      `}</style>

      <div
        ref={ref}
        style={{
          width:"100%", boxSizing:"border-box",
          background:"#F5F0E8",
          fontFamily:"'Josefin Sans',system-ui,sans-serif",
          position:"relative", overflow:"hidden",
          padding:"0",
        }}
      >
        {/* Gold top rule */}
        <div style={{
          position:"absolute",top:0,left:0,right:0,height:3,
          background:"linear-gradient(90deg,#8B6914,#D4A017,#F5C842,#D4A017,#8B6914)",
          zIndex:10,
        }}/>

        {/* Red diagonal left panel */}
        <div style={{
          position:"absolute",top:0,left:0,bottom:0,width:"46%",
          background:"linear-gradient(155deg,#7A0A0A 0%,#B91C1C 50%,#8B0E0E 100%)",
          clipPath:"polygon(0 0,100% 0,78% 100%,0 100%)",
          zIndex:0,
        }}/>

        {/* Flare on red */}
        <div style={{
          position:"absolute",top:0,left:0,bottom:0,width:"50%",
          zIndex:1,pointerEvents:"none",overflow:"hidden",
          clipPath:"polygon(0 0,100% 0,78% 100%,0 100%)",
        }}>
          <div style={{
            position:"absolute",top:0,bottom:0,width:"80px",
            background:"linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)",
            animation:"cr-flare 6s ease-in-out 1.5s infinite",
          }}/>
        </div>

        {/* Grain */}
        <div style={{
          position:"absolute",inset:0,zIndex:1,pointerEvents:"none",opacity:.015,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:"180px",
        }}/>

        {/* ══ MAIN GRID ══ */}
        <div style={{
          position:"relative",zIndex:2,
          display:"grid",
          gridTemplateColumns:"44% 1fr",
          minHeight:"clamp(240px,32vw,440px)",
        }}>

          {/* ── LEFT: Red panel ── */}
          <div style={{
            padding:"clamp(18px,2.6vw,28px) clamp(14px,2vw,22px) clamp(16px,2.2vw,22px)",
            display:"flex",flexDirection:"column",
            justifyContent:"space-between",
            color:"#FFF5F5",
          }}>

            {/* Brand row */}
            <div style={{
              opacity:step>=1?1:0,
              animation:step>=1?"cr-left .45s ease both":"none",
            }}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <img src="/half logo.png" alt="Ganesh Finance"
                  style={{
                    width:"clamp(26px,3.2vw,38px)",
                    height:"clamp(26px,3.2vw,38px)",
                    borderRadius:"50%",objectFit:"contain",
                    border:"1.5px solid rgba(255,200,50,.35)",
                  }}
                  onError={e=>e.target.style.display="none"}
                />
                <div style={{width:1,height:"clamp(18px,2.5vw,26px)",background:"rgba(255,200,50,.35)"}}/>
                <div>
                  <div style={{fontSize:"clamp(.54rem,.75vw,.64rem)",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"#FFD632",lineHeight:1.2}}>Ganesh Finance</div>
                  <div style={{fontSize:"clamp(.4rem,.55vw,.5rem)",color:"rgba(255,245,245,.3)",letterSpacing:".1em",textTransform:"uppercase"}}>Gold Loan NBFC · Est. 2019</div>
                </div>
              </div>

              {/* Eyebrow */}
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                <div style={{
                  padding:"2px 8px",borderRadius:3,
                  background:"rgba(255,210,50,.15)",
                  border:"1px solid rgba(255,210,50,.25)",
                }}>
                  <span style={{fontSize:"clamp(.42rem,.58vw,.52rem)",letterSpacing:".18em",textTransform:"uppercase",color:"#FFD632",fontWeight:700}}>Careers</span>
                </div>
              </div>

              {/* Big headline */}
              <h2 style={{
                margin:0,
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontSize:"clamp(1.3rem,2.6vw,2.2rem)",
                fontWeight:700,lineHeight:1.05,
                color:"#FFF5F5",letterSpacing:"-.01em",
              }}>
                Grow With<br/>
                <em style={{fontStyle:"italic",color:"#FFD632"}}>Ganesh Finance.</em>
              </h2>

              <p style={{
                margin:"6px 0 0",
                fontSize:"clamp(.44rem,.62vw,.54rem)",
                color:"rgba(255,245,245,.35)",
                lineHeight:1.65,fontWeight:300,
              }}>
                Join India's fastest-growing gold loan NBFC — build a career with purpose & stability.
              </p>
            </div>

            {/* Bottom perks */}
            <div style={{display:"flex",flexDirection:"column",gap:"clamp(4px,.6vw,7px)"}}>
              {[
                {val:"₹",    label:"Competitive Salary & Incentives", delay:0  },
                {val:"📍",   label:"2+ Branches · Pan India Growth",  delay:80 },
                {val:"🏆",   label:"Performance-Based Promotions",    delay:160},
              ].map((s)=>(
                <div key={s.label} style={{
                  display:"flex",alignItems:"center",gap:"clamp(6px,1vw,10px)",
                  opacity:step>=2?1:0,
                  animation:step>=2?`cr-left .4s ease ${s.delay}ms both`:"none",
                }}>
                  <span style={{
                    fontSize:"clamp(.9rem,1.6vw,1.3rem)",
                    lineHeight:1,minWidth:"clamp(22px,3vw,32px)",textAlign:"center",
                  }}>{s.val}</span>
                  <span style={{
                    fontSize:"clamp(.44rem,.62vw,.54rem)",
                    color:"rgba(255,245,245,.38)",
                    letterSpacing:".08em",textTransform:"uppercase",
                    lineHeight:1.4,fontWeight:600,
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Cream panel ── */}
          <div style={{
            padding:"clamp(18px,2.6vw,28px) clamp(10px,1.5vw,18px) clamp(14px,2vw,20px) clamp(14px,2vw,22px)",
            display:"flex",flexDirection:"column",
            justifyContent:"space-between",
            gap:"clamp(8px,1.2vw,12px)",
            position:"relative",
          }}>

            {/* Section label */}
            <div style={{
              opacity:step>=2?1:0,
              animation:step>=2?"cr-up .4s ease both":"none",
            }}>
              <div style={{
                fontSize:"clamp(.46rem,.65vw,.56rem)",
                fontWeight:700,letterSpacing:".18em",
                textTransform:"uppercase",color:"#B91C1C",
                marginBottom:4,
              }}>Our Team</div>
              <p style={{
                margin:0,
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontSize:"clamp(.8rem,1.4vw,1.1rem)",
                fontWeight:300,color:"#2A1208",
                lineHeight:1.6,
              }}>
                People who lead with integrity, serve with pride, and grow with gold.
              </p>
            </div>

            {/* ── ANIMATED TEAM ── */}
            <div style={{
              flex:1,
              display:"flex",
              alignItems:"flex-end",
              justifyContent:"center",
              position:"relative",
              minHeight:"clamp(100px,14vw,180px)",
            }}>

              {/* Stage spotlight glow */}
              {step>=3 && (
                <div style={{
                  position:"absolute",
                  bottom:0,left:"50%",
                  transform:"translateX(-50%)",
                  width:"80%",height:"clamp(12px,2vw,20px)",
                  background:"radial-gradient(ellipse,rgba(185,28,28,.25) 0%,transparent 70%)",
                  borderRadius:"50%",
                  animation:"cr-spotlight 3s ease-in-out infinite",
                  filter:"blur(4px)",
                }}/>
              )}

              {/* Team figures — overlapping like Muthoot style */}
              <div style={{
                display:"flex",
                alignItems:"flex-end",
                justifyContent:"center",
                position:"relative",
                width:"100%",
                gap:0,
              }}>
                {[
                  { role:"Branch Manager",  bg:"linear-gradient(170deg,#1a1a2e,#2d2d44)", fromX:"60px",  delay:0,   zIdx:3, size:1.0,  left:"50%", translateX:"-50%", pos:"absolute" },
                  { role:"Loan Officer",    bg:"linear-gradient(170deg,#2c1810,#4a2820)", fromX:"90px",  delay:100, zIdx:2, size:0.88, left:"68%", translateX:"0%",   pos:"absolute" },
                  { role:"Field Executive", bg:"linear-gradient(170deg,#0f2027,#203a43)", fromX:"120px", delay:200, zIdx:1, size:0.82, left:"32%", translateX:"-100%",pos:"absolute" },
                ].map((p,i)=>(
                  <div key={p.role} style={{
                    position:"absolute",
                    bottom:0,
                    left:p.left,
                    transform:`translateX(${p.translateX})`,
                    zIndex:p.zIdx,
                    opacity:step>=3?1:0,
                    animation:step>=3?`cr-person .55s cubic-bezier(.34,1.1,.64,1) ${p.delay}ms both`:"none",
                    ["--fromX"]:p.fromX,
                    display:"flex",flexDirection:"column",alignItems:"center",
                    gap:4,
                  }}>
                    {/* Person silhouette card */}
                    <div style={{
                      width:`clamp(${Math.round(52*p.size)}px,${7*p.size}vw,${Math.round(88*p.size)}px)`,
                      height:`clamp(${Math.round(80*p.size)}px,${11*p.size}vw,${Math.round(140*p.size)}px)`,
                      background:p.bg,
                      borderRadius:"clamp(6px,1vw,10px) clamp(6px,1vw,10px) 0 0",
                      border:"1px solid rgba(255,255,255,.08)",
                      display:"flex",flexDirection:"column",
                      alignItems:"center",justifyContent:"flex-end",
                      padding:"0 4px clamp(6px,1vw,10px)",
                      position:"relative",overflow:"hidden",
                      boxShadow:i===0?"0 -4px 20px rgba(185,28,28,.2)":"0 -2px 10px rgba(0,0,0,.15)",
                    }}>
                      {/* Silhouette SVG */}
                      <svg
                        viewBox="0 0 60 100"
                        style={{
                          position:"absolute",
                          top:"8%",left:"50%",
                          transform:"translateX(-50%)",
                          width:"65%",
                          opacity:.85,
                        }}
                      >
                        {/* Head */}
                        <ellipse cx="30" cy="18" rx="11" ry="13" fill="rgba(255,255,255,0.55)"/>
                        {/* Neck */}
                        <rect x="26" y="29" width="8" height="6" fill="rgba(255,255,255,0.45)"/>
                        {/* Body / suit */}
                        <path d="M12,35 Q14,31 22,31 L30,38 L38,31 Q46,31 48,35 L52,75 L8,75 Z"
                          fill={i===0?"rgba(185,28,28,0.7)":"rgba(255,255,255,0.25)"}/>
                        {/* Collar */}
                        <path d="M22,31 L30,38 L38,31" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/>
                        {/* Arms */}
                        <path d="M12,35 L6,62 Q8,64 12,62 L18,42" fill={i===0?"rgba(185,28,28,0.6)":"rgba(255,255,255,0.2)"}/>
                        <path d="M48,35 L54,62 Q52,64 48,62 L42,42" fill={i===0?"rgba(185,28,28,0.6)":"rgba(255,255,255,0.2)"}/>
                      </svg>

                      {/* Gold badge on center person */}
                      {i===0 && (
                        <div style={{
                          position:"absolute",top:6,right:6,
                          width:"clamp(14px,2vw,20px)",height:"clamp(14px,2vw,20px)",
                          borderRadius:"50%",
                          background:"linear-gradient(135deg,#C8860A,#FFD632)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:"clamp(.45rem,.6vw,.55rem)",
                          boxShadow:"0 2px 6px rgba(200,134,10,.4)",
                          animation:"cr-glow 2.5s ease infinite",
                        }}>★</div>
                      )}
                    </div>

                    {/* Role label */}
                    <div style={{
                      fontSize:"clamp(.38rem,.52vw,.48rem)",
                      fontWeight:600,
                      color:i===0?"#B91C1C":"#7A5040",
                      textTransform:"uppercase",
                      letterSpacing:".08em",
                      textAlign:"center",
                      whiteSpace:"nowrap",
                      background:i===0?"rgba(185,28,28,.08)":"rgba(139,105,20,.06)",
                      border:`1px solid ${i===0?"rgba(185,28,28,.2)":"rgba(139,105,20,.12)"}`,
                      padding:"2px 6px",borderRadius:99,
                    }}>{p.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA + open roles */}
            <div style={{
              display:"flex",alignItems:"center",
              gap:"clamp(5px,.8vw,9px)",flexWrap:"wrap",
              opacity:step>=4?1:0,
              transition:"opacity .4s ease",
            }}>
              <button className="cr-btn" style={{
                padding:"clamp(5px,.8vw,8px) clamp(14px,2vw,20px)",
                background:"linear-gradient(135deg,#9B1515,#B91C1C)",
                borderRadius:5,
                fontFamily:"'Josefin Sans',sans-serif",
                fontSize:"clamp(.52rem,.74vw,.64rem)",
                fontWeight:700,textTransform:"uppercase",
                letterSpacing:".12em",color:"#FFF5F5",
                boxShadow:"0 4px 16px rgba(185,28,28,.3)",
              }}>Apply Now →</button>

              <button className="cr-btn" style={{
                padding:"clamp(4px,.7vw,7px) clamp(12px,1.7vw,17px)",
                background:"transparent",
                border:"1px solid rgba(185,28,28,.25)",
                borderRadius:5,
                fontFamily:"'Josefin Sans',sans-serif",
                fontSize:"clamp(.52rem,.74vw,.64rem)",
                fontWeight:500,textTransform:"uppercase",
                letterSpacing:".1em",color:"#B91C1C",
              }}>View Openings</button>

              <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"#22a86b",animation:"cr-dot 2s ease infinite"}}/>
                <span style={{fontSize:"clamp(.4rem,.54vw,.5rem)",fontWeight:600,color:"#7A5040",letterSpacing:".1em",textTransform:"uppercase"}}>Hiring Now</span>
              </div>
            </div>

          </div>
        </div>

        {/* Dark red ticker */}
        <div style={{
          background:"#6B0808",
          borderTop:"1px solid rgba(255,210,50,.12)",
          padding:"clamp(4px,.6vw,6px) 0",
          overflow:"hidden",
          opacity:step>=5?1:0,
          transition:"opacity .4s ease",
        }}>
          <div style={{
            display:"flex",gap:40,width:"max-content",
            animation:"cr-ticker 22s linear infinite",
            userSelect:"none",
          }}>
            {[...Array(2)].map((_,r)=>(
              <div key={r} style={{display:"flex",gap:40,alignItems:"center"}}>
                {["Join Our Team","Branch Manager","Loan Officer","Field Executive",
                  "Gold Loan NBFC","Growth Opportunities","Apply Today","Ganesh Finance Careers"].map((t,i)=>(
                  <span key={i} style={{
                    display:"inline-flex",alignItems:"center",gap:7,
                    fontSize:"clamp(.4rem,.56vw,.5rem)",fontWeight:500,
                    color:"rgba(255,210,50,.32)",letterSpacing:".14em",
                    textTransform:"uppercase",whiteSpace:"nowrap",
                  }}>
                    <span style={{color:"#D4A017",fontSize:".34rem"}}>◆</span>{t}
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