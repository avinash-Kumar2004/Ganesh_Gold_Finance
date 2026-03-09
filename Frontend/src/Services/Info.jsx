import { useState, useEffect, useRef, useCallback } from "react";

// ══════════════════════════════════════════════════════════════
// GOLD LOAN INFO — Production-Level Component
// Sections: Info tabs | Features | Calculator | Refer + Expert
// ══════════════════════════════════════════════════════════════

// ── Intersection Observer Hook for scroll animations ──
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Number counter animation ──
function useCountUp(target, duration = 1200, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
}

// ── Schemes data ──
const SCHEMES = [
  { id: "standard", label: "Standard Gold Loan", rate: 10.5 },
  { id: "flexi",    label: "Gold Flexi Credit",  rate: 9.99 },
  { id: "home",     label: "Gold Loan at Home",  rate: 11.0 },
  { id: "bullet",   label: "Bullet Repayment",   rate: 12.5 },
];

// ── Features list ──
const FEATURES = [
  { icon: "📉", title: "Lower Interest Rates", desc: "Competitive rates starting from 9.99% p.a. — secured nature keeps costs low." },
  { icon: "📋", title: "Simplified Application", desc: "Minimal paperwork. KYC + gold valuation is all you need to get started." },
  { icon: "✅", title: "Flexible Eligibility", desc: "No income proof or CIBIL score required. Gold value decides your eligibility." },
  { icon: "⚡", title: "Quick Loan Disbursal", desc: "Funds credited within hours of gold valuation. Same-day disbursement guaranteed." },
  { icon: "🔓", title: "No Fund Usage Restriction", desc: "Use the loan amount for any purpose — business, medical, education, or travel." },
  { icon: "🔒", title: "Complete Ornament Safety", desc: "Gold stored in RBI-compliant insured vaults with comprehensive all-risk coverage." },
  { icon: "📄", title: "Minimal Documentation", desc: "Just Aadhaar + PAN + photograph. No salary slips or bank statements needed." },
  { icon: "💳", title: "Easy Repayment", desc: "Choose EMI, bullet, or flexi repayment. Part-payment anytime without penalty." },
];

// ── Tabs for info section ──
const INFO_TABS = [
  {
    id: "what",
    label: "Gold Loan Info",
    heading: "What is a Gold Loan?",
    paragraphs: [
      "A gold loan is a secured financing option that allows you to obtain funds against your gold ornaments without selling them. In India, the concept of borrowing money by pledging gold is centuries old — but today the process is fully digital, regulated by the Reserve Bank of India, and completed within hours.",
      "You pledge your gold jewellery (18–22 karat) with a licensed NBFC like Shree Ganesh Finance. The loan amount is determined by the current gold rate and the Loan-to-Value (LTV) ratio capped at 75% by the RBI. Interest is charged only for the period you use the funds.",
      "Once the full loan amount and interest is repaid, your gold ornaments are returned immediately. Unlike personal loans, gold loans carry no restriction on end-use — you can deploy the funds for business, medical needs, education, or any personal requirement.",
    ],
  },
  {
    id: "invest",
    label: "Invest in Gold Loan",
    heading: "Why Invest Through Gold Loans?",
    paragraphs: [
      "Gold-backed lending is one of the most resilient financial products in India. As an investor or borrower, the intrinsic value of gold as collateral provides unmatched security for both parties. The RBI's strict LTV guidelines ensure that the loan never exceeds 75% of the gold's market value.",
      "For investors, gold loan NBFCs offer attractive fixed-income instruments (NCDs, FDs) backed by a gold-secured loan book — one of the lowest NPA asset classes in Indian finance. The predictable cash flows and collateral quality make this a preferred choice for conservative investors.",
      "Shree Ganesh Finance's gold loan portfolio maintains a sub-1% NPA ratio, offering investors and borrowers alike a safe, transparent, and high-return financial relationship built on centuries of trust.",
    ],
  },
];

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function GoldLoanInfo() {
  const [activeTab, setActiveTab] = useState("what");
  const [scheme, setScheme] = useState("flexi");
  const [loanAmount, setLoanAmount] = useState(300000);
  const [tenureDays, setTenureDays] = useState(365);

  // Refs for scroll reveal
  const [featRef, featVisible] = useScrollReveal(0.1);
  const [calcRef, calcVisible] = useScrollReveal(0.1);
  const [ctaRef, ctaVisible] = useScrollReveal(0.15);

  // Calculator derived values
  const selectedScheme = SCHEMES.find((s) => s.id === scheme);
  const annualRate = selectedScheme?.rate || 9.99;
  const dailyRate = annualRate / 100 / 365;
  const totalInterest = loanAmount * dailyRate * tenureDays;
  const monthlyEMI = tenureDays >= 30
    ? ((loanAmount * (annualRate / 100 / 12)) /
        (1 - Math.pow(1 + annualRate / 100 / 12, -Math.round(tenureDays / 30)))).toFixed(2)
    : (loanAmount + totalInterest).toFixed(2);
  const totalPayable = (parseFloat(loanAmount) + totalInterest).toFixed(2);
  const months = Math.round(tenureDays / 30);

  const formatINR = (n) =>
    Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Slider thumb position helper
  const loanPct = ((loanAmount - 1500) / (1000000 - 1500)) * 100;
  const tenurePct = ((tenureDays - 1) / (365 - 1)) * 100;

  return (
    <div className="w-full bg-white font-sans">

      {/* ══════════════════════════════════════
          SECTION 1 — INFO TABS
      ══════════════════════════════════════ */}
      <section className="w-full border border-gray-100 rounded-2xl overflow-hidden shadow-sm mx-auto max-w-[1400px] my-8 sm:my-12">
        {/* Tab headers */}
        <div className="flex border-b border-gray-100">
          {INFO_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 sm:py-5 text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-300 relative ${
                activeTab === tab.id
                  ? "text-red-600 bg-white"
                  : "text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {INFO_TABS.map((tab) => (
          <div
            key={tab.id}
            className={`transition-all duration-500 ${
              activeTab === tab.id ? "block" : "hidden"
            }`}
          >
            <div className="px-6 sm:px-10 lg:px-14 py-8 sm:py-10">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5 leading-tight">
                {tab.heading}
              </h2>
              <div className="space-y-4">
                {tab.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-gray-600 text-sm sm:text-base leading-7 sm:leading-8"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Quick stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-gray-100">
                {[
                  { label: "Interest Rate", value: "9.99%", sub: "per annum" },
                  { label: "LTV Ratio", value: "75%", sub: "RBI mandated" },
                  { label: "Disbursement", value: "Same Day", sub: "post valuation" },
                  { label: "Min Amount", value: "₹1,500", sub: "no max limit" },
                ].map((s) => (
                  <div key={s.label} className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-red-400 mb-1">{s.label}</p>
                    <p className="text-base sm:text-lg font-black text-red-700">{s.value}</p>
                    <p className="text-[11px] text-gray-500">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — FEATURES
      ══════════════════════════════════════ */}
      <section
        ref={featRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12"
      >
        <div
          className={`transition-all duration-700 ${
            featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2 leading-tight">
            Features of Gold Loan
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-2xl leading-7">
            Every individual has certain phases in life where financial aid becomes essential — from educational expenses to business expansion. Pledging gold is the fastest, simplest way to arrange funds when you need them most.
          </p>
          <p className="text-gray-600 text-sm font-medium mb-6">
            Here are the key features offered by a gold loan:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className={`group bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-red-200 hover:shadow-lg hover:shadow-red-50 transition-all duration-300 cursor-default ${
                featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-lg group-hover:scale-110 transition-transform duration-300">
                  {feat.icon}
                </span>
                <div className="w-5 h-0.5 bg-red-200 group-hover:w-10 transition-all duration-300 rounded-full" />
              </div>
              <h3 className="text-sm font-black text-gray-800 mb-1.5 group-hover:text-red-700 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs text-gray-500 leading-5">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — CALCULATOR
      ══════════════════════════════════════ */}
      <section
        ref={calcRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12"
      >
        <div
          className={`transition-all duration-700 ${
            calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2">
            Calculator for Gold Loan
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-2xl leading-7">
            Calculate your gold loan eligibility and estimated EMI using our online calculator. Adjust the sliders to find the perfect loan plan for your needs.
          </p>
        </div>

        <div
          className={`bg-gradient-to-br from-gray-900 via-[#1c1c1c] to-red-950 rounded-3xl overflow-hidden transition-all duration-700 delay-200 ${
            calcVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Calculator header */}
          <div className="px-6 sm:px-10 pt-8 pb-5 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold text-red-400 uppercase mb-1">
                  Shree Ganesh Finance
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Gold Loan Calculator
                </h3>
              </div>
              {/* Scheme selector */}
              <div className="relative">
                <select
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  className="appearance-none bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:border-red-400 cursor-pointer hover:bg-white/15 transition-colors"
                >
                  {SCHEMES.map((s) => (
                    <option key={s.id} value={s.id} className="bg-gray-900 text-white">
                      {s.label}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Calculator body */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left — Visual result */}
            <div className="px-6 sm:px-10 py-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Gold ornament illustration */}
              <div className="relative mb-6">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 border border-yellow-400/30 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-lg" fill="none">
                    {/* Gold necklace SVG */}
                    <ellipse cx="50" cy="38" rx="32" ry="18" stroke="#F59E0B" strokeWidth="5" fill="none"/>
                    <ellipse cx="50" cy="38" rx="32" ry="18" stroke="#FBBF24" strokeWidth="2" fill="none" opacity="0.4"/>
                    {[0,1,2,3,4,5,6,7].map(i => {
                      const angle = (i / 8) * Math.PI;
                      const x = 50 + 32 * Math.cos(Math.PI + angle);
                      const y = 38 + 18 * Math.sin(Math.PI + angle);
                      return <circle key={i} cx={x} cy={y} r="3.5" fill="#F59E0B" />;
                    })}
                    <line x1="50" y1="56" x2="50" y2="72" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="50" cy="78" r="10" fill="#F59E0B" opacity="0.9"/>
                    <circle cx="50" cy="78" r="6" fill="#FBBF24"/>
                    <circle cx="50" cy="78" r="2.5" fill="#FEF3C7"/>
                    <circle cx="35" cy="66" r="3" fill="#F59E0B" opacity="0.7"/>
                    <circle cx="65" cy="66" r="3" fill="#F59E0B" opacity="0.7"/>
                  </svg>
                </div>
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full border border-yellow-400/20 animate-ping" style={{ animationDuration: "3s" }} />
              </div>

              <div className="text-center space-y-4 w-full">
                <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                  <p className="text-xs font-bold tracking-widest uppercase text-red-400 mb-1">Monthly EMI</p>
                  <p className="text-3xl sm:text-4xl font-black text-white">
                    ₹ <span className="tabular-nums">{formatINR(monthlyEMI)}</span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">for {months} month{months !== 1 ? "s" : ""}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-0.5">Total Interest</p>
                    <p className="text-sm font-black text-yellow-400">₹ {formatINR(totalInterest)}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-0.5">Total Payable</p>
                    <p className="text-sm font-black text-emerald-400">₹ {formatINR(totalPayable)}</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-0.5">Interest Rate</p>
                  <p className="text-sm font-black text-white">{annualRate}% p.a.</p>
                </div>

                <p className="text-[11px] text-white/30 leading-5 px-2">
                  These are estimated values. Please contact us or visit your nearest branch for exact details.
                </p>
              </div>
            </div>

            {/* Right — Sliders */}
            <div className="px-6 sm:px-10 py-8 space-y-10">

              {/* ── Loan Amount Slider ── */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-black tracking-widest uppercase text-white/60">Loan Amount</p>
                  <div className="bg-red-600 text-white text-sm font-black px-4 py-1.5 rounded-lg shadow-lg shadow-red-900/50">
                    ₹{loanAmount.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="relative h-6 flex items-center">
                  {/* Track background */}
                  <div className="absolute w-full h-1.5 bg-white/10 rounded-full" />
                  {/* Track fill */}
                  <div
                    className="absolute h-1.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-100"
                    style={{ width: `${loanPct}%` }}
                  />
                  {/* Range input */}
                  <input
                    type="range"
                    min={1500}
                    max={1000000}
                    step={500}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
                  />
                  {/* Custom thumb */}
                  <div
                    className="absolute w-5 h-5 rounded-full bg-white border-4 border-red-600 shadow-xl shadow-red-900/40 transition-all duration-100 pointer-events-none"
                    style={{ left: `calc(${loanPct}% - 10px)` }}
                  />
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-[11px] text-white/30 font-medium">₹1,500</span>
                  <span className="text-[11px] text-white/30 font-medium">₹10,00,000</span>
                </div>

                {/* Amount quick-select chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[25000, 50000, 100000, 250000, 500000].map((v) => (
                    <button
                      key={v}
                      onClick={() => setLoanAmount(v)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                        loanAmount === v
                          ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-900/30"
                          : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80"
                      }`}
                    >
                      ₹{v >= 100000 ? `${v / 100000}L` : `${v / 1000}K`}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Tenure Slider ── */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-black tracking-widest uppercase text-white/60">Loan Tenure</p>
                  <div className="bg-red-600 text-white text-sm font-black px-4 py-1.5 rounded-lg shadow-lg shadow-red-900/50">
                    {tenureDays} Day{tenureDays !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="relative h-6 flex items-center">
                  <div className="absolute w-full h-1.5 bg-white/10 rounded-full" />
                  <div
                    className="absolute h-1.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-100"
                    style={{ width: `${tenurePct}%` }}
                  />
                  <input
                    type="range"
                    min={1}
                    max={365}
                    step={1}
                    value={tenureDays}
                    onChange={(e) => setTenureDays(Number(e.target.value))}
                    className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className="absolute w-5 h-5 rounded-full bg-white border-4 border-red-600 shadow-xl shadow-red-900/40 transition-all duration-100 pointer-events-none"
                    style={{ left: `calc(${tenurePct}% - 10px)` }}
                  />
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-[11px] text-white/30 font-medium">1 Day</span>
                  <span className="text-[11px] text-white/30 font-medium">365 Days</span>
                </div>

                {/* Tenure quick-select chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[30, 90, 180, 270, 365].map((v) => (
                    <button
                      key={v}
                      onClick={() => setTenureDays(v)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                        tenureDays === v
                          ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-900/30"
                          : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80"
                      }`}
                    >
                      {v === 30 ? "1M" : v === 90 ? "3M" : v === 180 ? "6M" : v === 270 ? "9M" : "1Y"}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Breakdown bar ── */}
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase text-white/40 mb-3">Repayment Breakdown</p>
                <div className="flex rounded-lg overflow-hidden h-3">
                  <div
                    className="bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500"
                    style={{ width: `${(loanAmount / parseFloat(totalPayable)) * 100}%` }}
                  />
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 flex-1" />
                </div>
                <div className="flex gap-6 mt-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                    <span className="w-2.5 h-2.5 rounded-sm bg-red-500 flex-shrink-0" />Principal
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                    <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 flex-shrink-0" />Interest
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator footer CTA */}
          <div className="px-6 sm:px-10 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02]">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div>
                <p className="text-xs text-white/40 font-medium">Apply For Gold Loan</p>
              </div>
              <a
                href="/contact"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-black transition-all active:scale-95 shadow-lg shadow-red-900/40"
              >
                APPLY NOW
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div>
                <p className="text-xs text-white/40 font-medium">Check status of your Gold Loan</p>
              </div>
              <a
                href="/contact"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-black transition-all active:scale-95"
              >
                CHECK NOW
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4 — REFER + EXPERT
      ══════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Refer a Friend */}
          <div
            className={`group relative overflow-hidden bg-white border-2 border-gray-100 rounded-3xl p-6 sm:p-8 hover:border-red-200 hover:shadow-xl hover:shadow-red-50 transition-all duration-500 ${
              ctaVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            {/* Background decoration */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <p className="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-2">
                Refer a Friend *
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 leading-tight">
                Refer a friend &amp; get a chance to win exciting prizes
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-6">
                Share Shree Ganesh Finance with your friends and family. When they avail a gold loan, both of you benefit.
              </p>

              <div className="flex items-center justify-between">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-black transition-all active:scale-95 shadow-md shadow-red-100"
                >
                  REFER NOW
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* Gift box illustration */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <div className="absolute inset-0 bg-red-50 rounded-2xl group-hover:rotate-6 transition-transform duration-500" />
                  <div className="relative w-full h-full flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-500">
                    🎁
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 mt-4">*T&amp;C apply</p>
            </div>
          </div>

          {/* Ask an Expert */}
          <div
            className={`group relative overflow-hidden bg-gradient-to-br from-gray-900 to-red-950 rounded-3xl p-6 sm:p-8 transition-all duration-500 ${
              ctaVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-red-600/10 blur-2xl" />

            <div className="relative">
              <p className="text-[10px] font-black tracking-[0.2em] text-red-400 uppercase mb-3">
                Ask an Expert
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-5 leading-tight">
                Speak with our financial advisors
              </h3>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black tracking-widest uppercase text-red-400 mb-1">
                    North, East &amp; West India (Toll-Free)
                  </p>
                  <a href="tel:18003131212" className="text-white font-black text-lg hover:text-red-300 transition-colors">
                    1800 313 1212
                  </a>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black tracking-widest uppercase text-red-400 mb-1">
                    South India Call Centre
                  </p>
                  <a href="tel:9946901212" className="text-white font-black text-lg hover:text-red-300 transition-colors">
                    99469 01212
                  </a>
                  <p className="text-[11px] text-white/30 mt-0.5">Mon–Sat, 9:30 AM to 6 PM</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-3">
                    <p className="text-[10px] font-black tracking-widest uppercase text-red-400 mb-1">Write to Us</p>
                    <a href="mailto:info@shreegf.com" className="text-white text-xs font-semibold hover:text-red-300 transition-colors break-all">
                      info@shreegf.com
                    </a>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-3">
                    <p className="text-[10px] font-black tracking-widest uppercase text-red-400 mb-1">Branch Timings</p>
                    <p className="text-white text-xs font-semibold">Mon–Sat</p>
                    <p className="text-white/50 text-[11px]">9:30 AM – 6 PM</p>
                  </div>
                </div>
              </div>

              {/* Advisor illustration */}
              <div className="absolute bottom-6 right-6 text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                💬
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slider custom CSS */}
      <style>{`
        input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; }
        input[type='range']::-moz-range-thumb { appearance: none; width: 0; height: 0; border: none; }
        input[type='range']:focus { outline: none; }
      `}</style>
    </div>
  );
}