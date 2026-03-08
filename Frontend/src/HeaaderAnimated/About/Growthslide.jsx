import { useEffect, useRef, useState } from "react";

const BARS = [
  { year: "2019", pct: 14,  amount: "₹2.1 Cr"  },
  { year: "2020", pct: 28,  amount: "₹3.8 Cr"  },
  { year: "2021", pct: 45,  amount: "₹5.9 Cr"  },
  { year: "2022", pct: 61,  amount: "₹8.2 Cr"  },
  { year: "2023", pct: 76,  amount: "₹11.4 Cr" },
  { year: "2024", pct: 89,  amount: "₹15.7 Cr" },
  { year: "2025", pct: 100, amount: "₹21 Cr+"  },
];

const KPI = [
  { value: "₹21 Cr+", label: "Portfolio Size" },
  { value: "2+",      label: "Branches"       },
  { value: "6 Yrs",   label: "Of Growth"      },
  { value: "98%",     label: "Retention"      },
];

const N        = BARS.length;
const BAR_H_PX = 140; // fixed pixel height of bar area
const PATH_LEN = 1600;

// SVG for trend line — viewBox matches bar area exactly
// We use percentage-based x positions matching flex bars
// x goes 0..100 (percent), y goes 0..100 (percent, 0=top)
function buildLinePath(bars) {
  const pts = bars.map((b, i) => {
    const x = (i / (N - 1)) * 100;
    const y = 100 - b.pct; // invert: 100% bar = y=0 (top)
    return [x, y];
  });
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1][0] + pts[i][0]) / 2;
    d += ` C ${cx} ${pts[i-1][1]}, ${cx} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
  }
  const last = pts[N-1];
  const first = pts[0];
  const area = `${d} L ${last[0]} 100 L ${first[0]} 100 Z`;
  return { d, area, pts };
}

const { d: LINE_D, area: AREA_D, pts: LINE_PTS } = buildLinePath(BARS);

export default function GrowthSlide() {
  const ref      = useRef(null);
  const cycleRef = useRef(null);
  const timers   = useRef([]);

  const [show,    setShow]    = useState(false);
  const [cycle,   setCycle]   = useState(0);
  const [animate, setAnimate] = useState(false);
  const [lineOn,  setLineOn]  = useState(false);
  const [dotsOn,  setDotsOn]  = useState(false);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const runCycle = () => {
    clear();
    setAnimate(false);
    setLineOn(false);
    setDotsOn(false);
    setCycle(c => c + 1);
    // Small delay so React resets bar heights before re-animating
    const t0 = setTimeout(() => setAnimate(true), 80);
    const t1  = setTimeout(() => setLineOn(true),  N * 80 + 300);
    const t2  = setTimeout(() => setDotsOn(true),  N * 80 + 780);
    timers.current = [t0, t1, t2];
  };

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); runCycle(); }
      else { setShow(false); setAnimate(false); setLineOn(false); setDotsOn(false); clear(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); clear(); };
  }, []);

  useEffect(() => {
    if (!show) return;
    cycleRef.current = setInterval(runCycle, 3800);
    return () => clearInterval(cycleRef.current);
  }, [show]);

  return (
    <>
      <style>{`
        @keyframes gsFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gsFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes gsLineDraw {
          from { stroke-dashoffset: ${PATH_LEN}; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes gsDotPop {
          0%   { transform: scale(0); opacity: 0; }
          70%  { transform: scale(1.4); }
          100% { transform: scale(1); opacity: 1; }
        }
        .gs-kpi {
          transition: transform .22s cubic-bezier(.34,1.4,.64,1), box-shadow .22s, border-color .2s;
          cursor: default;
        }
        .gs-kpi:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          border-color: rgba(185,28,28,0.4) !important;
        }
        .gs-bar-inner {
          width: 100%;
          border-radius: 4px 4px 0 0;
          transition: height 0.55s cubic-bezier(0.34,1.05,0.64,1),
                      opacity 0.3s ease;
        }
      `}</style>

      <div ref={ref} style={{
        width: "100%",
        background: "#fff",
        padding: "clamp(16px,2.5vw,32px) clamp(14px,4vw,5vw) clamp(12px,2vw,22px)",
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        borderTop: "3px solid #B91C1C",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Deco ring */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 220, height: 220, borderRadius: "50%",
          border: "44px solid rgba(185,28,28,0.04)",
          pointerEvents: "none",
        }}/>

        {/* ══ HEADER ══ */}
        <div style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: "clamp(8px,1.5vw,16px)",
          marginBottom: "clamp(10px,1.8vw,20px)",
          opacity: show ? 1 : 0,
          animation: show ? "gsFadeUp 0.45s ease both" : "none",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
              <div style={{ width: 3, height: 18, borderRadius: 99, background: "#B91C1C", flexShrink: 0 }}/>
              <span style={{
                fontSize: "clamp(0.52rem,0.85vw,0.68rem)", fontWeight: 700,
                letterSpacing: "0.13em", textTransform: "uppercase", color: "#B91C1C",
              }}>Ganesh Finance · Est. 2019</span>
            </div>
            <h2 style={{
              margin: 0, fontSize: "clamp(0.95rem,2vw,1.4rem)",
              fontWeight: 800, color: "#111", letterSpacing: "-0.025em", lineHeight: 1.2,
            }}>
              India's Most Growing{" "}
              <span style={{ color: "#B91C1C" }}>Gold Loan</span> Brand
            </h2>
            <p style={{
              margin: "4px 0 0", fontSize: "clamp(0.54rem,0.8vw,0.68rem)",
              color: "#b0b8c4", letterSpacing: "0.01em",
            }}>Consistent year-on-year portfolio expansion since inception.</p>
          </div>

          <div style={{ display: "flex", gap: "clamp(5px,0.8vw,8px)", flexWrap: "wrap" }}>
            {KPI.map((k, i) => (
              <div key={k.label} className="gs-kpi" style={{
                textAlign: "center",
                padding: "clamp(6px,0.9vw,9px) clamp(9px,1.4vw,15px)",
                border: "1px solid #e5e7eb", borderRadius: 10, background: "#fafafa",
                minWidth: "clamp(48px,7vw,60px)",
                opacity: show ? 1 : 0,
                animation: show ? `gsFadeUp 0.4s ease ${180 + i * 70}ms both` : "none",
              }}>
                <div style={{
                  fontSize: "clamp(0.7rem,1.2vw,1rem)", fontWeight: 800,
                  color: "#111", letterSpacing: "-0.01em", lineHeight: 1.2,
                }}>{k.value}</div>
                <div style={{
                  fontSize: "clamp(0.44rem,0.58vw,0.57rem)", fontWeight: 600,
                  color: "#b0b8c4", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 3,
                }}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ CHART AREA ══ */}
        <div style={{
          opacity: show ? 1 : 0,
          animation: show ? "gsFade 0.3s ease 0.1s both" : "none",
        }}>

          {/* Y-axis labels — absolute left */}
          <div style={{ position: "relative", display: "flex", gap: 0 }}>

            {/* Y labels column */}
            <div style={{
              width: 36, flexShrink: 0, position: "relative",
              height: BAR_H_PX, marginTop: 8,
            }}>
              {[1, 0.75, 0.5, 0.25].map(t => (
                <div key={t} style={{
                  position: "absolute",
                  top: `${(1 - t) * 100}%`,
                  right: 4,
                  fontSize: "clamp(0.42rem,0.6vw,0.58rem)",
                  color: "#ccc",
                  transform: "translateY(-50%)",
                  whiteSpace: "nowrap",
                }}>₹{Math.round(t * 21)}Cr</div>
              ))}
            </div>

            {/* Main chart column */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* ── SVG overlay for trend line — sits on top of bars ── */}
              <div style={{
                position: "relative",
                height: BAR_H_PX + 8, // +8 for amount labels above
                marginBottom: 0,
              }}>

                {/* Grid lines */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  paddingTop: 8, pointerEvents: "none",
                }}>
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                      height: 1,
                      background: i === 0 ? "#e5e7eb" : "#f3f4f6",
                    }}/>
                  ))}
                </div>

                {/* SVG trend line overlay */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{
                    position: "absolute",
                    left: 0, right: 0,
                    top: 8,         // skip amount-label space
                    height: BAR_H_PX,
                    width: "100%",
                    overflow: "visible",
                    pointerEvents: "none",
                  }}
                >
                  <defs>
                    <linearGradient id="gsGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#B91C1C" stopOpacity="0.12"/>
                      <stop offset="100%" stopColor="#B91C1C" stopOpacity="0"/>
                    </linearGradient>
                  </defs>

                  {/* Area */}
                  {lineOn && (
                    <path key={`area-${cycle}`} d={AREA_D}
                      fill="url(#gsGrad2)"
                      vectorEffect="non-scaling-stroke"
                      style={{ animation: "gsFade 0.5s ease both" }}/>
                  )}

                  {/* Line */}
                  {lineOn && (
                    <path key={`line-${cycle}`} d={LINE_D}
                      fill="none" stroke="#B91C1C" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      strokeDasharray={PATH_LEN} strokeDashoffset={PATH_LEN}
                      style={{ animation: `gsLineDraw 0.9s cubic-bezier(0.4,0,0.2,1) both` }}/>
                  )}

                  {/* Dots */}
                  {dotsOn && LINE_PTS.map(([x, y], i) => (
                    <g key={`dot-${cycle}-${i}`} style={{
                      transformOrigin: `${x}px ${y}px`,
                      animation: `gsDotPop 0.3s cubic-bezier(.34,1.56,.64,1) ${i * 55}ms both`,
                    }}>
                      <circle cx={x} cy={y} r="2.2"
                        fill="#fff" stroke="#B91C1C" strokeWidth="0.8"
                        vectorEffect="non-scaling-stroke"/>
                      {i === N - 1 && <circle cx={x} cy={y} r="1" fill="#B91C1C"/>}
                    </g>
                  ))}
                </svg>

                {/* Amount labels — rendered as absolutely positioned divs */}
                {dotsOn && LINE_PTS.map(([x, y], i) => (
                  <div key={`amt-${cycle}-${i}`} style={{
                    position: "absolute",
                    left: `${x}%`,
                    // y is 0-100 in SVG space mapped to BAR_H_PX px, +8 for top offset
                    top: `${(y / 100) * BAR_H_PX + 8 - 18}px`,
                    transform: "translateX(-50%)",
                    fontSize: "clamp(0.44rem,0.62vw,0.6rem)",
                    fontWeight: 700,
                    color: "#9ca3af",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    animation: `gsFade 0.25s ease ${i * 55 + 80}ms both`,
                  }}>
                    {BARS[i].amount}
                  </div>
                ))}
              </div>

              {/* ── HTML BARS — simple flex divs, guaranteed to show ── */}
              <div style={{
                display: "flex",
                alignItems: "flex-end",
                height: BAR_H_PX,
                borderBottom: "1.5px solid #e5e7eb",
                gap: "clamp(3px,0.6vw,8px)",
                marginTop: -BAR_H_PX, // overlap with SVG area above
                position: "relative",
                zIndex: 1,
              }}>
                {BARS.map((bar, i) => {
                  const isLast = i === N - 1;
                  const alpha  = (0.18 + (i / (N - 1)) * 0.58).toFixed(2);
                  const fill   = isLast ? "#B91C1C" : `rgba(185,28,28,${alpha})`;
                  const targetH = animate ? (bar.pct / 100) * BAR_H_PX : 0;

                  return (
                    <div key={`bar-${cycle}-${i}`} style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "flex-end",
                      height: "100%",
                    }}>
                      <div
                        className="gs-bar-inner"
                        style={{
                          height: targetH,
                          background: fill,
                          transitionDelay: `${i * 0.075}s`,
                          opacity: animate ? 1 : 0,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X-axis year labels */}
              <div style={{
                display: "flex",
                gap: "clamp(3px,0.6vw,8px)",
                paddingTop: 5,
              }}>
                {BARS.map((bar, i) => (
                  <div key={bar.year} style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "clamp(0.48rem,0.66vw,0.62rem)",
                    fontWeight: i === N - 1 ? 700 : 500,
                    color: i === N - 1 ? "#B91C1C" : "#9ca3af",
                    letterSpacing: "0.02em",
                    userSelect: "none",
                  }}>{bar.year}</div>
                ))}
              </div>

            </div>{/* end main chart col */}
          </div>{/* end flex row */}

        </div>{/* end chart area */}

        {/* Y axis title */}
        <div style={{
          fontSize: "clamp(0.4rem,0.55vw,0.52rem)",
          color: "#d1d5db",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: 6,
          paddingLeft: 36,
          userSelect: "none",
        }}>Portfolio (₹ Cr)</div>

        {/* Footnote */}
        <p style={{
          margin: "clamp(4px,0.8vw,8px) 0 0",
          fontSize: "clamp(0.42rem,0.58vw,0.55rem)",
          color: "#d1d5db", letterSpacing: "0.02em", userSelect: "none",
        }}>
          *Indicative figures for illustrative purposes only. Ganesh Finance, Est. 2019.
        </p>

      </div>
    </>
  );
}