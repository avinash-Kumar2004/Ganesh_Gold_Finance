import { useState, useRef, useEffect } from "react";

// ══════════════════════════════════════════════════════════════════
// FAQ DATA — Shree Ganesh Finance
// ══════════════════════════════════════════════════════════════════
const FAQ_CATEGORIES = [
  {
    id: "gold-loan",
    label: "Gold Loan",
    icon: "🏅",
    faqs: [
      {
        q: "What is a Gold Loan and how does it work at Shree Ganesh Finance?",
        a: "A Gold Loan is a secured loan where you pledge your gold ornaments (18–22 karat) as collateral and receive funds instantly. At Shree Ganesh Finance, our certified appraiser evaluates your gold at the branch or at your doorstep, and the loan amount — up to 75% of gold's market value (as per RBI's LTV norms) — is disbursed directly to your bank account within hours. No income proof or CIBIL score is required.",
      },
      {
        q: "What is the minimum and maximum gold loan amount I can get?",
        a: "Shree Ganesh Finance offers gold loans starting from as low as ₹1,500 with no defined upper limit — the maximum amount depends entirely on the weight, purity (18–22 karat), and current market rate of your gold ornaments, subject to the RBI-mandated 75% Loan-to-Value (LTV) ratio. Higher the gold value, higher the loan eligibility.",
      },
      {
        q: "What is the interest rate on a Gold Loan?",
        a: "Our gold loan interest rates start from 9.99% per annum. The exact rate depends on the loan scheme you choose — Standard Gold Loan, Gold Flexi Credit, or Bullet Repayment. All rates and charges are disclosed upfront as per RBI's fair lending guidelines. There is zero processing fee on select schemes.",
      },
      {
        q: "What documents are required to apply for a gold loan?",
        a: "Gold loans require minimal documentation: (1) Aadhaar Card — mandatory under PMLA norms, (2) PAN Card — required for loans above ₹1 lakh, (3) One recent passport-size photograph, and (4) Your gold ornaments for in-branch valuation. No salary slips, bank statements, or income tax returns are needed.",
      },
      {
        q: "Is my gold safe with Shree Ganesh Finance?",
        a: "Absolutely. All pledged gold is stored in RBI-compliant, high-security insured vaults with 24×7 surveillance and comprehensive all-risk insurance coverage throughout the custody period. The gold is returned in the same condition upon full loan repayment. Our custody practices adhere strictly to RBI's safe custody norms for NBFCs.",
      },
      {
        q: "Can I repay my gold loan before the tenure ends?",
        a: "Yes. Shree Ganesh Finance allows part-payment and full pre-closure of gold loans at any time without any prepayment penalty or foreclosure charges. You can reduce your outstanding principal anytime, which directly reduces your interest burden. Upon full repayment, your gold ornaments are returned immediately.",
      },
      {
        q: "What is the Gold Loan at Home service?",
        a: "Our Gold Loan at Home service brings the entire gold loan process to your doorstep. A trained, uniformed, and verified executive visits your residence at a time convenient to you, conducts the gold valuation using certified equipment, and disburses the loan to your bank account — all within the same visit. This service is especially popular with senior citizens, homemakers, and busy professionals. Available 6 days a week across all serviceable pincodes.",
      },
    ],
  },
  {
    id: "eligibility",
    label: "Eligibility",
    icon: "✅",
    faqs: [
      {
        q: "Who is eligible to apply for a loan at Shree Ganesh Finance?",
        a: "Any Indian resident aged 18 years and above is eligible to apply for a gold loan. For other loan products like Personal Loan, Home Loan, or Business Loan, additional eligibility criteria apply based on income, credit score, and employment type. For gold loans specifically, there is no minimum income requirement — the gold's value is the only eligibility criterion.",
      },
      {
        q: "Do I need a good CIBIL score to get a gold loan?",
        a: "No. Gold loans at Shree Ganesh Finance do not require any minimum CIBIL score. Since the loan is secured against your gold ornaments, your credit history is not a determining factor. However, for unsecured products like Personal Loans and SME Loans, a CIBIL score of 700+ is preferred.",
      },
      {
        q: "Can a self-employed person or farmer apply for a loan?",
        a: "Yes. Gold loans are particularly beneficial for self-employed individuals, farmers, traders, and business owners who may not have formal income documentation. The loan is purely based on the value of your gold. For agricultural gold loans, special schemes with lower interest rates may be available at select branches.",
      },
      {
        q: "Can NRIs (Non-Resident Indians) avail a gold loan?",
        a: "NRIs can avail gold loans by authorizing a resident relative to pledge gold on their behalf through a valid Power of Attorney (PoA). The PoA holder must be KYC-compliant and present at the branch. Loan disbursement is made to the PoA holder's Indian bank account as per FEMA guidelines.",
      },
    ],
  },
  {
    id: "repayment",
    label: "Repayment",
    icon: "💳",
    faqs: [
      {
        q: "What are the repayment options available for gold loans?",
        a: "Shree Ganesh Finance offers multiple repayment structures: (1) EMI-based repayment — fixed monthly instalments covering both principal and interest, (2) Bullet Repayment — pay the entire principal + interest at the end of tenure, (3) Interest-only EMI — pay only monthly interest and repay principal at maturity, and (4) Flexi Repayment — under the Gold Flexi Credit scheme, repay and redraw as per your convenience within the sanctioned limit.",
      },
      {
        q: "What happens if I miss an EMI or cannot repay my gold loan?",
        a: "If you miss an EMI, a penal interest as per your loan agreement will be levied on the overdue amount. Shree Ganesh Finance will proactively reach out to help you find a solution — including EMI restructuring or tenure extension. In case of prolonged default, as per RBI's fair practice code, we will send formal notices before initiating any recovery action. Auction of pledged gold is a last resort and is conducted transparently as per RBI guidelines.",
      },
      {
        q: "Can I renew my gold loan instead of repaying it fully?",
        a: "Yes. You can renew your gold loan at maturity without having to bring your gold back to the branch. Our team will re-evaluate the gold's current market value and renew the loan accordingly. If gold prices have increased since your original pledge, you may even be eligible for a higher loan amount upon renewal.",
      },
      {
        q: "How do I make repayments? Are there digital payment options?",
        a: "Yes. Shree Ganesh Finance accepts repayments through multiple channels: NEFT/RTGS/IMPS bank transfers, UPI (GPay, PhonePe, Paytm), cheque or demand draft at any branch, and auto-debit via NACH mandate from your bank account. You will also receive SMS and email reminders before your EMI due date.",
      },
    ],
  },
  {
    id: "other-loans",
    label: "Other Products",
    icon: "📋",
    faqs: [
      {
        q: "What types of loans and financial services does Shree Ganesh Finance offer?",
        a: "Shree Ganesh Finance is a full-service NBFC offering: Gold Loans, Gold Flexi Credit, Gold Loan at Home, Housing Finance, Personal Loans, Small Business Loans (MSME), SME Loans, Corporate Business Loans, Vehicle Loans, Insurance (as a licensed IRDAI Corporate Agent), Mutual Fund Distribution (AMFI-registered), Credit Score Check, and Domestic & International Money Transfer (RBI-authorised).",
      },
      {
        q: "How long does it take to get a personal loan approved?",
        a: "Personal loan applications at Shree Ganesh Finance are processed within 24–48 working hours of document submission. For applicants with strong credit profiles (CIBIL 750+) and complete documentation, approvals can be as fast as same-day. Disbursement is made directly to your bank account via NEFT/IMPS within 24 hours of sanction.",
      },
      {
        q: "Does Shree Ganesh Finance offer a balance transfer facility for home loans?",
        a: "Yes. You can transfer your existing home loan from any bank or NBFC to Shree Ganesh Finance at a potentially lower interest rate, along with a top-up loan option. Our team will guide you through the entire process — from eligibility check to NOC from your existing lender. RBI mandates zero prepayment penalty on floating-rate home loans, so switching is typically cost-free.",
      },
      {
        q: "Can I invest in Mutual Funds through Shree Ganesh Finance?",
        a: "Yes. Shree Ganesh Finance is an AMFI-registered Mutual Fund Distributor (ARN holder). We offer SIP, lump sum, and STP investments across equity, debt, hybrid, ELSS (tax-saving), and index fund schemes from all major SEBI-registered AMCs. Our advisors follow SEBI's appropriateness framework to recommend funds aligned with your risk profile and financial goals.",
      },
    ],
  },
  {
    id: "about",
    label: "About Us",
    icon: "🏢",
    faqs: [
      {
        q: "Is Shree Ganesh Finance a regulated financial institution?",
        a: "Yes. Shree Ganesh Finance is a Reserve Bank of India (RBI) registered Non-Banking Financial Company (NBFC). We operate strictly within the regulatory framework prescribed by the RBI for NBFCs, including adherence to KYC/AML norms under PMLA, fair lending practices, and safe custody guidelines for pledged gold. We are also a licensed IRDAI Corporate Agent for insurance and an AMFI-registered distributor for mutual funds.",
      },
      {
        q: "Where are Shree Ganesh Finance branches located?",
        a: "Shree Ganesh Finance has a growing network of branches across India. To find the nearest branch, visit our Contact page or call our toll-free number. Our Gold Loan at Home service also extends our reach to customers in serviceable pincodes who prefer not to visit a branch.",
      },
      {
        q: "How do I contact Shree Ganesh Finance customer support?",
        a: "You can reach us through multiple channels: (1) Visit any Shree Ganesh Finance branch (Mon–Sat, 9:30 AM – 6:00 PM), (2) Submit an inquiry through our Contact page, (3) Email us at info@shreegf.com, or (4) Request a callback through our website. Our financial advisors are available to assist with loan queries, account management, and financial planning.",
      },
      {
        q: "How does Shree Ganesh Finance protect my personal data?",
        a: "Shree Ganesh Finance is fully compliant with the Information Technology Act and applicable RBI data protection guidelines. Your personal data collected for KYC purposes is stored securely and used only for the purpose of providing our financial services. We do not share your information with third parties without your consent, except as required by law or regulatory authorities.",
      },
    ],
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

// ── Single FAQ Item ──
function FAQItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-red-200 shadow-md shadow-red-50"
          : "border-gray-100 hover:border-red-100 hover:shadow-sm"
      }`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      {/* Question */}
      <button
        onClick={onToggle}
        className={`w-full flex items-start justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left transition-colors duration-300 ${
          isOpen ? "bg-red-50" : "bg-white hover:bg-gray-50"
        }`}
        aria-expanded={isOpen}
      >
        {/* Number + Question */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span
            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5 transition-colors duration-300 ${
              isOpen ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {index + 1}
          </span>
          <span
            className={`text-sm sm:text-[15px] font-bold leading-snug transition-colors duration-300 ${
              isOpen ? "text-red-700" : "text-gray-800"
            }`}
            itemProp="name"
          >
            {faq.q}
          </span>
        </div>

        {/* Toggle icon */}
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 mt-0.5 ${
            isOpen ? "bg-red-600 text-white rotate-180" : "bg-gray-100 text-gray-400"
          }`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {/* Answer */}
      <div
        style={{
          height: `${height}px`,
          transition: "height 380ms cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div ref={contentRef}>
          <div className="px-5 sm:px-6 pb-5 pt-1 bg-white">
            {/* Left accent line */}
            <div className="flex gap-4">
              <div className="w-0.5 flex-shrink-0 bg-gradient-to-b from-red-400 to-red-100 rounded-full ml-[11px]" />
              <p
                className="text-sm sm:text-[15px] text-gray-600 leading-7 pt-2"
                itemProp="text"
              >
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("gold-loan");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [sectionRef, sectionVisible] = useScrollReveal(0.08);

  const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory);

  const handleCategoryChange = (id) => {
    if (id === activeCategory) return;
    setOpenFAQ(null);
    setActiveCategory(id);
  };

  const handleToggle = (idx) => {
    setOpenFAQ((prev) => (prev === idx ? null : idx));
  };

  const totalFAQs = FAQ_CATEGORIES.reduce((sum, c) => sum + c.faqs.length, 0);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 sm:py-20"
      aria-label="Frequently Asked Questions"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-10">

        {/* ── Header ── */}
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-[10px] font-black tracking-[0.15em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Support Centre
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-3">
            Frequently Asked<br className="hidden sm:block" /> Questions
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Everything you need to know about Shree Ganesh Finance's products and services.
            Can't find your answer?{" "}
            <a href="/contact" className="text-red-600 font-semibold hover:underline">
              Talk to our team.
            </a>
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8">
            {[
              { value: `${totalFAQs}+`, label: "Questions Answered" },
              { value: "24h", label: "Response Time" },
              { value: "RBI", label: "Regulated NBFC" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-black text-red-600">{s.value}</span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide uppercase mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Category Tabs ── */}
        <div
          className={`flex gap-2 overflow-x-auto pb-2 mb-8 transition-all duration-700 delay-100 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ scrollbarWidth: "none" }}
        >
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-100"
                  : "bg-white border-gray-100 text-gray-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                {cat.faqs.length}
              </span>
            </button>
          ))}
        </div>

        {/* ── FAQ List ── */}
        <div
          className={`transition-all duration-500 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Category heading */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <span className="text-2xl">{currentCategory?.icon}</span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900">{currentCategory?.label}</h3>
              <p className="text-xs text-gray-400">{currentCategory?.faqs.length} questions in this category</p>
            </div>
          </div>

          <div className="space-y-3">
            {currentCategory?.faqs.map((faq, i) => (
              <div
                key={`${activeCategory}-${i}`}
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 400ms ${250 + i * 60}ms, transform 400ms ${250 + i * 60}ms`,
                }}
              >
                <FAQItem
                  faq={faq}
                  index={i}
                  isOpen={openFAQ === i}
                  onToggle={() => handleToggle(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Still have questions CTA ── */}
        <div
          className={`mt-12 sm:mt-16 rounded-3xl overflow-hidden transition-all duration-700 delay-300 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-br from-gray-900 via-[#1c1c1c] to-red-950 p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-red-600/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative">
              <p className="text-[10px] font-black tracking-[0.2em] text-red-400 uppercase mb-3">
                Still have questions?
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                Our experts are here to help
              </h3>
              <p className="text-white/50 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                Speak with a Shree Ganesh Finance financial advisor — Mon to Sat, 9:30 AM to 6:00 PM.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-black transition-all active:scale-95 shadow-lg shadow-red-900/40"
                >
                  Contact Us
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="tel:18001234567"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-black transition-all active:scale-95"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Toll-Free
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}