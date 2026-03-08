import React, { useEffect, useRef, useState } from "react";

const STATS = [
  {
    id: "founded",
    label1: "Serving with",
    label2: "Trust & Integrity",
    accent: "Since 2019",
    footnote: null,
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <circle cx="28" cy="28" r="24" stroke="#B91C1C" strokeWidth="1.8" fill="none" opacity="0.3"/>
        <circle cx="28" cy="28" r="18" stroke="#B91C1C" strokeWidth="1.4" fill="none" opacity="0.5"/>
        <text x="28" y="24" textAnchor="middle" fontSize="11" fontWeight="900"
          fill="#B91C1C" fontFamily="Georgia,serif">2019</text>
        <text x="28" y="34" textAnchor="middle" fontSize="5.5" fontWeight="700"
          fill="#B91C1C" fontFamily="Georgia,serif" letterSpacing="3">SINCE</text>
        <line x1="16" y1="38" x2="40" y2="38" stroke="#B91C1C" strokeWidth="0.7" strokeDasharray="2,2" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: "trusted",
    label1: "Financial Services",
    label2: "Brand",
    accent: "Most Trusted",
    footnote: "*TRA's Brand Trust Report",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <path d="M28 6 L46 15 L46 30 C46 41 37 49 28 52 C19 49 10 41 10 30 L10 15 Z"
          stroke="#B91C1C" strokeWidth="1.8" fill="none"/>
        <path d="M20 28 L26 34 L36 22"
          stroke="#B91C1C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "gold",
    label1: "Gold Loan Portfolio",
    label2: "in Our Region",
    accent: "Largest",
    footnote: null,
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <path d="M14 34 C14 24 20 16 28 14 C36 16 42 24 42 34" stroke="#B91C1C" strokeWidth="1.8" fill="none"/>
        <ellipse cx="28" cy="38" rx="14" ry="5" stroke="#B91C1C" strokeWidth="1.5" fill="none"/>
        <circle cx="28" cy="14" r="4" stroke="#B91C1C" strokeWidth="1.5" fill="none"/>
        <line x1="28" y1="18" x2="28" y2="33" stroke="#B91C1C" strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "customers",
    label1: "Satisfied",
    label2: "Customers",
    accent: "Thousands of",
    footnote: null,
    icon: (
      <svg viewBox="0 0 56 56" fill="none" width="100%" height="100%">
        <circle cx="28" cy="18" r="7" stroke="#B91C1C" strokeWidth="1.8" fill="none"/>
        <circle cx="14" cy="22" r="5" stroke="#B91C1C" strokeWidth="1.4" fill="none" opacity="0.7"/>
        <circle cx="42" cy="22" r="5" stroke="#B91C1C" strokeWidth="1.4" fill="none" opacity="0.7"/>
        <path d="M8 42 C8 34 17 30 28 30 C39 30 48 34 48 42"
          stroke="#B91C1C" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M2 42 C2 37 8 34 14 33"
          stroke="#B91C1C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45"/>
        <path d="M54 42 C54 37 48 34 42 33"
          stroke="#B91C1C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45"/>
      </svg>
    ),
  },
];

function StatCard({ stat, i, inView }) {
  return (
    <div
      className="sb-card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "1 1 0",
        minWidth: 0,
        opacity: inView ? 1 : 0,
        animation: inView
          ? `sbCardIn 0.55s cubic-bezier(.34,1.1,.64,1) ${i * 110}ms both`
          : "none",
      }}
    >
      {/* Bubble */}
      <div
        className="sb-bubble"
        style={{
          width: "clamp(80px, 13vw, 130px)",
          height: "clamp(80px, 13vw, 130px)",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #f2f2f2, #dcdcdc)",
          boxShadow: "5px 5px 14px rgba(0,0,0,0.14), -3px -3px 10px rgba(255,255,255,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: "clamp(18px, 3vw, 28px)",
          flexShrink: 0,
          cursor: "default",
        }}
      >
        {/* Inner ring */}
        <div style={{
          position: "absolute", inset: "clamp(4px,0.6vw,7px)",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #e6e6e6, #f9f9f9)",
          boxShadow: "inset 2px 2px 7px rgba(0,0,0,0.09), inset -1px -1px 4px rgba(255,255,255,0.7)",
        }}/>

        {/* Icon — sized via padding box inside bubble */}
        <div style={{
          position: "relative", zIndex: 1,
          width: "clamp(38px, 7vw, 56px)",
          height: "clamp(38px, 7vw, 56px)",
        }}>
          {stat.icon}
        </div>

        {/* Teardrop */}
        <div style={{
          position: "absolute",
          bottom: "clamp(-10px, -1.5vw, -13px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "clamp(6px,1vw,9px) solid transparent",
          borderRight: "clamp(6px,1vw,9px) solid transparent",
          borderTop: `clamp(9px,1.4vw,14px) solid #d4d4d4`,
          filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.12))",
        }}/>
      </div>

      {/* Text */}
      <div style={{ textAlign: "center", lineHeight: 1.5, padding: "0 4px" }}>
        <p style={{
          margin: 0,
          fontSize: "clamp(0.58rem, 1vw, 0.9rem)",
          color: "#555",
          fontWeight: 400,
        }}>
          {stat.label1}
        </p>
        <p style={{
          margin: "2px 0 0",
          fontSize: "clamp(0.62rem, 1.05vw, 0.95rem)",
          color: "#1a1a1a",
          fontWeight: 800,
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}>
          <span style={{ color: "#B91C1C" }}>{stat.accent} </span>
          {stat.label2}
        </p>
        {stat.footnote && (
          <p style={{
            margin: "3px 0 0",
            fontSize: "clamp(0.48rem, 0.7vw, 0.65rem)",
            color: "#aaa",
          }}>{stat.footnote}</p>
        )}
      </div>
    </div>
  );
}

function Separator({ i, inView, vertical }) {
  if (vertical) {
    // Mobile: horizontal line between cards
    return (
      <div style={{
        width: "clamp(40px, 30%, 120px)",
        height: 0,
        borderTop: "2px dashed #ccc",
        margin: "4px auto",
        position: "relative",
        opacity: inView ? 1 : 0,
        transition: `opacity .4s ease ${i * 110 + 150}ms`,
      }}>
        {inView && (
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 16, height: 16,
            borderRadius: "50%",
            border: "2.5px solid #B91C1C",
            background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: `sbDotPop 0.45s cubic-bezier(.34,1.56,.64,1) ${i * 110 + 350}ms both`,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B91C1C" }}/>
          </div>
        )}
      </div>
    );
  }

  // Desktop: vertical separator between cards
  return (
    <div
      className="sb-sep"
      style={{
        flex: "0 0 clamp(20px, 3vw, 48px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "clamp(38px, 6.5vw, 65px)",
        position: "relative",
      }}
    >
      {inView && (
        <div
          className="sb-line-draw"
          style={{
            width: "100%", height: 0,
            borderTop: "2px dashed #b0b0b0",
            animationDelay: `${i * 110 + 150}ms`,
          }}
        />
      )}
      {inView && (
        <div style={{ position: "relative", height: 20, width: "100%", marginTop: -1 }}>
          <div style={{
            position: "absolute", top: 0, left: "50%",
            width: 20, height: 20, borderRadius: "50%",
            border: "2px solid #B91C1C", opacity: 0,
            animation: `sbPulse 1.8s ease-out ${i * 110 + 500}ms infinite`,
          }}/>
          <div style={{
            position: "absolute", top: 0, left: "50%",
            width: 20, height: 20, borderRadius: "50%",
            border: "3px solid #B91C1C", background: "#fff",
            animation: `sbDotPop 0.45s cubic-bezier(.34,1.56,.64,1) ${i * 110 + 350}ms both`,
            boxSizing: "border-box",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B91C1C" }}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StatsBanner() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .sb-bubble {
          transition: transform 0.35s cubic-bezier(.34,1.4,.64,1), box-shadow 0.35s ease;
        }
        .sb-bubble:hover {
          transform: translateY(-5px) scale(1.04) !important;
          box-shadow:
            6px 6px 20px rgba(0,0,0,0.18),
            -3px -3px 12px rgba(255,255,255,0.95),
            0 0 0 3px rgba(185,28,28,0.1) !important;
        }

        @keyframes sbLineDraw {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        .sb-line-draw {
          animation: sbLineDraw 0.7s cubic-bezier(0.4,0,0.2,1) 0.35s both;
        }

        @keyframes sbDotPop {
          0%   { transform: translateX(-50%) scale(0); opacity: 0; }
          70%  { transform: translateX(-50%) scale(1.3); }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }

        @keyframes sbPulse {
          0%   { transform: translateX(-50%) scale(1); opacity: 0.6; }
          100% { transform: translateX(-50%) scale(2.2); opacity: 0; }
        }

        @keyframes sbCardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        ref={ref}
        style={{
          width: "100%",
          background: "linear-gradient(160deg, #f7f7f7 0%, #efefef 100%)",
          /* ── Tight padding matches other slides ── */
          padding: "clamp(18px,3vw,40px) clamp(12px,4vw,6vw) clamp(14px,2.5vw,32px)",
          boxSizing: "border-box",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid bg */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "radial-gradient(circle, #ccc 1px, transparent 1px)",
          backgroundSize: "clamp(18px,2.5vw,28px) clamp(18px,2.5vw,28px)",
          opacity: 0.18, pointerEvents: "none",
        }}/>

        {/* ── DESKTOP: row layout ── */}
        {!isMobile && (
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 0,
            position: "relative", zIndex: 1,
          }}>
            {STATS.map((stat, i) => (
              <React.Fragment key={stat.id}>
                <StatCard stat={stat} i={i} inView={inView} />
                {i < STATS.length - 1 && (
                  <Separator i={i} inView={inView} vertical={false} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ── MOBILE: 2x2 grid ── */}
        {isMobile && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(14px,4vw,22px) clamp(8px,3vw,16px)",
            position: "relative", zIndex: 1,
          }}>
            {STATS.map((stat, i) => (
              <div key={stat.id} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                opacity: inView ? 1 : 0,
                animation: inView
                  ? `sbCardIn 0.5s cubic-bezier(.34,1.1,.64,1) ${i * 90}ms both`
                  : "none",
              }}>
                {/* Bubble */}
                <div className="sb-bubble" style={{
                  width: "clamp(76px,20vw,108px)",
                  height: "clamp(76px,20vw,108px)",
                  borderRadius: "50%",
                  background: "linear-gradient(145deg,#f2f2f2,#dcdcdc)",
                  boxShadow: "4px 4px 12px rgba(0,0,0,0.13),-2px -2px 8px rgba(255,255,255,0.9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                  marginBottom: "clamp(14px,4vw,20px)",
                  flexShrink: 0, cursor: "default",
                }}>
                  <div style={{
                    position:"absolute",inset:"clamp(4px,1vw,6px)",borderRadius:"50%",
                    background:"linear-gradient(145deg,#e6e6e6,#f9f9f9)",
                    boxShadow:"inset 2px 2px 6px rgba(0,0,0,0.08)",
                  }}/>
                  <div style={{
                    position:"relative",zIndex:1,
                    width:"clamp(34px,10vw,48px)",
                    height:"clamp(34px,10vw,48px)",
                  }}>{stat.icon}</div>
                  {/* Teardrop */}
                  <div style={{
                    position:"absolute",bottom:"clamp(-8px,-2vw,-11px)",left:"50%",
                    transform:"translateX(-50%)",
                    width:0,height:0,
                    borderLeft:"clamp(5px,1.5vw,8px) solid transparent",
                    borderRight:"clamp(5px,1.5vw,8px) solid transparent",
                    borderTop:`clamp(8px,2vw,12px) solid #d4d4d4`,
                    filter:"drop-shadow(0 2px 2px rgba(0,0,0,0.1))",
                  }}/>
                </div>

                {/* Text */}
                <div style={{textAlign:"center",lineHeight:1.45,padding:"0 2px"}}>
                  <p style={{
                    margin:0,
                    fontSize:"clamp(0.55rem,2.8vw,0.72rem)",
                    color:"#666",fontWeight:400,
                  }}>{stat.label1}</p>
                  <p style={{
                    margin:"2px 0 0",
                    fontSize:"clamp(0.58rem,3vw,0.78rem)",
                    color:"#1a1a1a",fontWeight:800,
                    letterSpacing:"-0.01em",lineHeight:1.25,
                  }}>
                    <span style={{color:"#B91C1C"}}>{stat.accent} </span>
                    {stat.label2}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Divider between 2x2 rows on mobile */}
        {isMobile && inView && (
          <div style={{
            position:"absolute",
            top:"50%",left:"clamp(12px,4vw,6vw)",right:"clamp(12px,4vw,6vw)",
            height:0,
            borderTop:"1.5px dashed #ccc",
            zIndex:0,
          }}/>
        )}
      </div>
    </>
  );
}