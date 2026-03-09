import { useState, useEffect, useRef, useCallback } from "react";

// ══════════════════════════════════════════════════════════════════
// BLOG DATA — 9 blogs using local images /Blog/img1.png – img9.png
// ══════════════════════════════════════════════════════════════════
const BLOGS = [
  {
    id: 1,
    slug: "capital-gains-tax",
    image: "/Blog/img1.png",
    category: "Tax & Investment",
    title: "CAPITAL GAINS TAX: MEANING, TYPES & RATES",
    excerpt: "Capital gains tax is levied on profits earned from the sale of capital assets like shares, property, or gold.",
    readTime: "5 min read",
    date: "Mar 2026",
    content: {
      intro: "Capital Gains Tax (CGT) is a tax on the profit realised when you sell a capital asset — shares, mutual funds, real estate, gold, or bonds — at a price higher than what you paid.",
      points: [
        "Short-Term Capital Gains (STCG): Assets held less than 12–36 months. Taxed at 20% for equity (post-2024 Budget) or as per income slab for others.",
        "Long-Term Capital Gains (LTCG): Equity LTCG above ₹1.25 lakh taxed at 12.5% without indexation. Debt/real estate LTCG at 20% with indexation.",
        "Exemptions under Sec 54, 54EC, 54F allow reinvestment of gains in specified assets to reduce or eliminate tax liability.",
        "Mutual fund investors must track purchase NAVs carefully — each SIP instalment has its own acquisition date and cost.",
      ],
      cta: "Consult our financial advisor to optimise your capital gains tax liability.",
    },
  },
  {
    id: 2,
    slug: "best-index-funds-2026",
    image: "/Blog/img2.png",
    category: "Mutual Funds",
    title: "BEST INDEX FUNDS TO INVEST IN INDIA IN 2026",
    excerpt: "Index funds track market benchmarks like Nifty 50 or Sensex with low expense ratios — ideal for long-term wealth creation.",
    readTime: "6 min read",
    date: "Mar 2026",
    content: {
      intro: "Index funds passively replicate a market index — like Nifty 50 or BSE Sensex — making them one of the most cost-efficient investment vehicles in India.",
      points: [
        "Nifty 50 Index Funds: Track India's top 50 large-cap companies. Expense ratios as low as 0.05–0.10%. Ideal for core portfolio allocation.",
        "Nifty Next 50 Funds: Exposure to companies ranked 51–100 by market cap — often called 'large-cap in waiting.' Higher growth potential.",
        "Nifty Midcap 150 Index Funds: For investors with higher risk appetite and 7+ year horizon. Historically outperforms large-cap over long periods.",
        "International Index Funds (S&P 500, Nasdaq 100): Geographical diversification under RBI's LRS framework.",
      ],
      cta: "Start your SIP in index funds through Shree Ganesh Finance — AMFI registered distributor.",
    },
  },
  {
    id: 3,
    slug: "gold-bees",
    image: "/Blog/img3.png",
    category: "Gold Investment",
    title: "UNDERSTANDING GOLD BEES: HOW IT WORKS, NAV & RETURNS",
    excerpt: "Gold BeES is India's first Gold ETF tracking domestic gold prices — trade it on NSE like a stock, no physical gold needed.",
    readTime: "4 min read",
    date: "Feb 2026",
    content: {
      intro: "Gold BeES is an ETF representing 1 gram of 99.5% purity physical gold. Listed on NSE, it can be bought/sold during market hours at live gold prices.",
      points: [
        "1 unit ≈ 1 gram of gold stored with a custodian bank. NAV tracks domestic gold prices in real-time with full SEBI transparency.",
        "No making charges, storage risk, or impurity concerns — unlike physical gold jewellery.",
        "Long-term gains (3+ years) taxed at 20% with indexation. Short-term gains added to income slab.",
        "Can be pledged as collateral for loans. Minimum investment is 1 unit (approx ₹650–700 at current rates).",
      ],
      cta: "Invest in gold the smart way — ask us about Gold ETF options on our platform.",
    },
  },
  {
    id: 4,
    slug: "multi-cap-vs-flexi-cap",
    image: "/Blog/img4.png",
    category: "Mutual Funds",
    title: "MULTI CAP AND FLEXI CAP MUTUAL FUNDS: HOW ARE THEY DIFFERENT?",
    excerpt: "Both invest across large, mid, and small caps — but SEBI regulations make them fundamentally different in fund manager allocation flexibility.",
    readTime: "5 min read",
    date: "Feb 2026",
    content: {
      intro: "SEBI mandates Multi Cap funds to maintain at least 25% each in large, mid, and small-cap stocks. Flexi Cap funds have no such restriction — full manager discretion.",
      points: [
        "Multi Cap: Mandated 25-25-25 allocation means forced exposure to mid and small caps even in bear markets. Disciplined but higher volatility.",
        "Flexi Cap: Fund manager can shift 100% to large-caps during downturns or 100% to mid/small-caps in bull markets. Skill-dependent.",
        "For first-time investors: Flexi Cap is generally preferred. Multi Cap suits investors wanting guaranteed small/mid-cap exposure.",
        "Taxation same for both: LTCG >₹1.25L at 12.5%; STCG at 20% (post-Budget 2024 equity rates).",
      ],
      cta: "Our advisors can help you choose the right fund category based on your risk profile.",
    },
  },
  {
    id: 5,
    slug: "online-vs-offline-personal-loan",
    image: "/Blog/img5.png",
    category: "Personal Loan",
    title: "ONLINE PERSONAL LOAN VS. OFFLINE PERSONAL LOAN — WHICH IS BETTER?",
    excerpt: "Online loans offer instant approval in minutes. Offline loans offer personal guidance and better rate negotiation. Complete comparison inside.",
    readTime: "4 min read",
    date: "Feb 2026",
    content: {
      intro: "Digital lending has transformed personal loans in India. Online NBFCs can disburse in under 30 minutes — but offline channels still hold advantages for larger amounts.",
      points: [
        "Online: Instant eligibility check, Video KYC, e-NACH for EMI. Faster but sometimes higher rates for new-to-credit borrowers.",
        "Offline: Relationship manager can negotiate better rates. Better for self-employed with complex income documentation.",
        "RBI's Key Fact Statement (KFS) mandate (2024) requires all lenders to disclose Annual Percentage Rate upfront — no hidden charges.",
        "Shree Ganesh Finance offers both channels at equivalent interest rates — walk in or apply digitally.",
      ],
      cta: "Apply for a personal loan online or visit your nearest Shree Ganesh Finance branch.",
    },
  },
  {
    id: 6,
    slug: "digital-wallet",
    image: "/Blog/img6.png",
    category: "Digital Finance",
    title: "WHAT IS A DIGITAL WALLET: MEANING, TYPES, EXAMPLES & BENEFITS",
    excerpt: "Digital wallets store payment info electronically for cashless transactions via UPI, NFC, or QR codes — from PhonePe to Amazon Pay.",
    readTime: "4 min read",
    date: "Jan 2026",
    content: {
      intro: "A digital wallet stores payment credentials, bank details, and transaction history, enabling electronic payments without physical cash or cards.",
      points: [
        "Closed Wallets: Amazon Pay, Ola Money — usable only on their own platform. Balances non-transferable to bank accounts.",
        "Semi-Closed Wallets: RBI-regulated (Paytm, PhonePe pre-UPI). Multiple merchants but no bank withdrawal without KYC.",
        "Open Wallets: Bank-issued (HDFC PayZapp). Full functionality — purchase, transfer, ATM withdrawal with full KYC.",
        "India processed 15+ billion UPI transactions/month in 2025 — the world's largest real-time payments ecosystem.",
      ],
      cta: "Use our AePS and UPI-based money transfer services at any Shree Ganesh Finance branch.",
    },
  },
  {
    id: 7,
    slug: "what-is-refinancing",
    image: "/Blog/img7.png",
    category: "Home Loan",
    title: "WHAT IS REFINANCING: MEANING, TYPES, BENEFITS & EXAMPLES",
    excerpt: "Refinancing replaces your existing loan with a new one at a lower rate. Balance transfer is the most common form of refinancing in India.",
    readTime: "5 min read",
    date: "Jan 2026",
    content: {
      intro: "Loan refinancing means paying off an existing loan by taking a new one — often from a different lender — at a lower interest rate or with more favorable repayment terms.",
      points: [
        "Rate-and-Term Refinancing: Replace existing loan at a lower rate. Even a 0.5% reduction on ₹50L home loan saves ₹3–5L over tenure.",
        "Cash-Out Refinancing: Borrow more than outstanding balance, receive difference as cash. Useful for renovation or business expansion.",
        "Balance transfer to Shree Ganesh Finance includes a top-up loan option — no re-processing of property documents required.",
        "RBI mandates zero prepayment penalty on floating-rate home loans. Check fixed-rate loan agreement before refinancing.",
      ],
      cta: "Calculate your savings with our balance transfer calculator — speak with our home loan team.",
    },
  },
  {
    id: 8,
    slug: "debt-trap",
    image: "/Blog/img8.png",
    category: "Financial Wellness",
    title: "WHAT IS A DEBT TRAP? MEANING, CAUSES & HOW TO AVOID IT",
    excerpt: "A debt trap is when you borrow to repay existing loans, creating a vicious cycle. Learn to recognise the warning signs and escape it.",
    readTime: "5 min read",
    date: "Jan 2026",
    content: {
      intro: "A debt trap occurs when a borrower cannot generate enough income to repay principal and interest — and is forced to borrow more just to service existing EMIs.",
      points: [
        "Warning signs: EMIs exceeding 50% of take-home pay; using credit cards for basic necessities; borrowing from multiple lenders simultaneously.",
        "Common causes: High-interest personal loans or credit cards (24–36% p.a.); income disruption; lifestyle inflation beyond income growth.",
        "Prevention: Maintain 6-month emergency fund. Avoid credit card revolving credit. Never borrow beyond your FOIR limit per RBI norms.",
        "Escape: Debt consolidation — replace multiple high-rate loans with a single lower-rate gold loan at 9.99% p.a. Reduces total interest significantly.",
      ],
      cta: "Use a gold loan at 9.99% p.a. to consolidate high-cost credit card or personal loan debt.",
    },
  },
  {
    id: 9,
    slug: "gold-price-forecast-2026",
    image: "/Blog/img9.png",
    category: "Gold Market",
    title: "GOLD PRICE FORECAST 2026: WILL GOLD PRICES RISE OR FALL?",
    excerpt: "Gold touched ₹85,000+ per 10g in 2025. Geopolitical tensions and central bank buying will determine if the bull run continues in 2026.",
    readTime: "6 min read",
    date: "Mar 2026",
    content: {
      intro: "Gold has been in a structural bull market since 2020, driven by central bank diversification away from USD, geopolitical uncertainty, and record ETF inflows globally.",
      points: [
        "Bullish factors: Central banks (China, India, Russia) accumulating gold reserves. Fed rate cuts in 2025 weakened USD — supporting gold prices.",
        "Bearish risks: USD strengthening, geopolitical de-escalation, or sharp rise in real US interest rates could pressure gold.",
        "For gold loan borrowers: Higher gold prices = higher loan eligibility at same LTV — your ornaments unlock more liquidity.",
        "Indian demand remains inelastic — festivals, weddings, and investment buying continue regardless of price level.",
      ],
      cta: "Lock in today's gold valuation — apply for a gold loan now before prices fluctuate.",
    },
  },
];

// ── Scroll Reveal Hook ──
function useScrollReveal(threshold = 0.1) {
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

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function OurBlogs() {
  const [activeBlog, setActiveBlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expandedVisible, setExpandedVisible] = useState(false);
  const [sectionRef, sectionVisible] = useScrollReveal(0.1);
  const expandRef = useRef(null);
  const autoRef = useRef(null);

  // Responsive cards per view
  const [cardsPerView, setCardsPerView] = useState(5);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCardsPerView(1);
      else if (w < 768) setCardsPerView(2);
      else if (w < 1024) setCardsPerView(3);
      else if (w < 1280) setCardsPerView(4);
      else setCardsPerView(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, BLOGS.length - cardsPerView);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, [isAutoPlaying, maxIndex]);

  // Handle card click
  const handleCardClick = useCallback((blog) => {
    setIsAutoPlaying(false);
    clearInterval(autoRef.current);
    if (activeBlog?.id === blog.id) {
      setActiveBlog(null);
      setExpandedVisible(false);
      setIsAutoPlaying(true);
    } else {
      setExpandedVisible(false);
      setActiveBlog(blog);
      setTimeout(() => {
        setExpandedVisible(true);
        setTimeout(() => {
          expandRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }, 50);
    }
  }, [activeBlog]);

  const slide = (dir) => {
    setIsAutoPlaying(false);
    clearInterval(autoRef.current);
    setCurrentIndex((prev) =>
      dir === "prev" ? Math.max(0, prev - 1) : Math.min(maxIndex, prev + 1)
    );
  };

  const cardWidth = 100 / cardsPerView;

  return (
    <section ref={sectionRef} className="w-full bg-white py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">

        {/* ── Header ── */}
        <div
          className={`flex items-end justify-between mb-8 sm:mb-10 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-[10px] font-black tracking-[0.15em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Knowledge Centre
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-none tracking-tight">
              Our Blogs
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 font-medium">
              Expert insights on gold loans, investments &amp; personal finance
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => slide("prev")}
              disabled={currentIndex === 0}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-red-300 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => slide("next")}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-red-300 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div
          className={`overflow-hidden transition-all duration-700 delay-150 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}
          >
            {BLOGS.map((blog, i) => {
              const isActive = activeBlog?.id === blog.id;
              return (
                <div
                  key={blog.id}
                  className="flex-shrink-0 px-1.5 sm:px-2"
                  style={{ width: `${cardWidth}%` }}
                >
                  <div
                    onClick={() => handleCardClick(blog)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 select-none ${
                      isActive
                        ? "border-red-500 shadow-xl shadow-red-100 scale-[1.02]"
                        : "border-transparent hover:border-red-200 hover:shadow-lg hover:shadow-red-50 hover:-translate-y-1"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isActive ? "scale-110" : "group-hover:scale-105"
                        }`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.classList.add("bg-gradient-to-br", "from-red-50", "to-gray-100");
                        }}
                      />
                      {/* Hover overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

                      {/* Category badge */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[9px] font-black tracking-widest uppercase bg-red-600 text-white px-2 py-1 rounded-md shadow">
                          {blog.category}
                        </span>
                      </div>

                      {/* Active down-arrow indicator */}
                      {isActive && (
                        <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-white">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div className="py-3 px-1">
                      <p className={`text-xs font-black leading-tight tracking-wide uppercase line-clamp-2 transition-colors duration-200 ${
                        isActive ? "text-red-600" : "text-gray-800 group-hover:text-red-600"
                      }`}>
                        {blog.title}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1.5 font-medium">{blog.readTime} · {blog.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); setIsAutoPlaying(false); }}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-6 h-2 bg-red-600" : "w-2 h-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* ── Expanded Info Panel ── */}
        <div ref={expandRef}>
          <div
            className="overflow-hidden transition-all ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              maxHeight: expandedVisible ? "600px" : "0px",
              opacity: expandedVisible ? 1 : 0,
              transform: expandedVisible ? "translateY(0)" : "translateY(12px)",
              transitionDuration: expandedVisible ? "600ms" : "300ms",
              transitionProperty: "max-height, opacity, transform",
              marginTop: expandedVisible ? "24px" : "0px",
            }}
          >
            {activeBlog && (
              <div className="rounded-3xl overflow-hidden border border-red-100 shadow-2xl shadow-red-50/60">
                <div className="grid grid-cols-1 lg:grid-cols-5">

                  {/* Left — image with parallax-style zoom on mount */}
                  <div className="lg:col-span-2 relative overflow-hidden min-h-[200px] lg:min-h-0 bg-gray-900">
                    <img
                      src={activeBlog.image}
                      alt={activeBlog.title}
                      className="w-full h-full object-cover absolute inset-0 opacity-75"
                      style={{
                        transform: expandedVisible ? "scale(1.05)" : "scale(1.12)",
                        transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                    {/* Dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    {/* Red accent line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-transparent" />

                    <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end">
                      <span
                        className="text-[9px] font-black tracking-widest uppercase bg-red-600 text-white px-2.5 py-1 rounded-md w-fit mb-3"
                        style={{
                          opacity: expandedVisible ? 1 : 0,
                          transform: expandedVisible ? "translateY(0)" : "translateY(8px)",
                          transition: "opacity 400ms 200ms, transform 400ms 200ms",
                        }}
                      >
                        {activeBlog.category}
                      </span>
                      <h3
                        className="text-white font-black text-lg sm:text-xl leading-snug"
                        style={{
                          opacity: expandedVisible ? 1 : 0,
                          transform: expandedVisible ? "translateY(0)" : "translateY(10px)",
                          transition: "opacity 400ms 280ms, transform 400ms 280ms",
                        }}
                      >
                        {activeBlog.title}
                      </h3>
                      <p
                        className="text-white/50 text-xs mt-2"
                        style={{
                          opacity: expandedVisible ? 1 : 0,
                          transition: "opacity 400ms 360ms",
                        }}
                      >
                        {activeBlog.readTime} · {activeBlog.date}
                      </p>
                    </div>
                  </div>

                  {/* Right — content */}
                  <div className="lg:col-span-3 bg-white p-6 sm:p-8 lg:p-10">

                    {/* Header row */}
                    <div
                      className="flex items-start justify-between mb-5"
                      style={{
                        opacity: expandedVisible ? 1 : 0,
                        transform: expandedVisible ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 400ms 150ms, transform 400ms 150ms",
                      }}
                    >
                      <div className="flex-1 pr-4">
                        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-red-500 mb-1.5">Quick Summary</p>
                        <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">{activeBlog.content.intro}</p>
                      </div>
                      {/* Close button */}
                      <button
                        onClick={() => {
                          setExpandedVisible(false);
                          setTimeout(() => { setActiveBlog(null); setIsAutoPlaying(true); }, 300);
                        }}
                        className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all duration-200 text-gray-400 hover:rotate-90 hover:scale-110"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Key points — staggered */}
                    <div className="space-y-2.5 mb-6">
                      {activeBlog.content.points.map((point, i) => (
                        <div
                          key={`${activeBlog.id}-${i}`}
                          className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50/60 transition-colors duration-200"
                          style={{
                            opacity: expandedVisible ? 1 : 0,
                            transform: expandedVisible ? "translateX(0)" : "translateX(-10px)",
                            transition: `opacity 400ms ${200 + i * 80}ms, transform 400ms ${200 + i * 80}ms`,
                          }}
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-xs sm:text-sm text-gray-700 leading-5 sm:leading-6">{point}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA strip — only Talk to Expert */}
                    <div
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-gray-100"
                      style={{
                        opacity: expandedVisible ? 1 : 0,
                        transition: `opacity 400ms ${200 + activeBlog.content.points.length * 80 + 60}ms`,
                      }}
                    >
                      <p className="text-xs sm:text-sm text-gray-400 italic max-w-sm leading-5">
                        💡 {activeBlog.content.cta}
                      </p>
                      <a
                        href="/contact"
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-all duration-200 active:scale-95 shadow-md shadow-red-100 whitespace-nowrap"
                      >
                        Talk to Expert
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

     
      </div>
    </section>
  );
}