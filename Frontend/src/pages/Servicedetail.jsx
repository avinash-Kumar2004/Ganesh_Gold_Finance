import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// ═══════════════════════════════════════════════════════════════════════════════
// ─── SAME SERVICE_TRANSLATIONS as GoldServices (import from shared file ideally)
// ═══════════════════════════════════════════════════════════════════════════════
const SERVICES_DATA = {
  "gold-flexi-credit": {
    icon: "💳",
    title: "Gold Flexi Credit",
    tagline: "Revolving credit line against your gold — pay interest only on what you use.",
    overview: `Shree Ganesh Finance's Gold Flexi Credit is an innovative revolving credit facility where you pledge your gold ornaments and receive a pre-approved credit limit. Unlike a standard gold loan, you withdraw only what you need, when you need it — and interest is charged solely on the utilized amount.`,
    overview_extra: `Governed under RBI's fair lending practices and NBFC norms, this facility ensures complete transparency in interest computation, with no hidden charges. Repay and redraw within your sanctioned limit at any time during the tenure.`,
    benefits: [
      "Interest charged only on amount withdrawn, not on entire sanctioned limit",
      "Revolving facility — repay and redraw multiple times within tenure",
      "Loan amount up to ₹50 lakhs against gold ornaments (18–22 karat)",
      "Minimal documentation — KYC + gold valuation report sufficient",
      "Flexible tenure: 6 to 24 months, renewable on review",
      "No prepayment penalty — foreclose at any time without charges",
      "Gold kept in secure, insured vaults compliant with RBI custody norms",
    ],
    eligibility_points: [
      "Indian residents aged 18 years and above",
      "KYC compliant (Aadhaar + PAN mandatory as per RBI/PMLA guidelines)",
      "Gold ornaments of 18–22 karat purity acceptable",
      "No minimum income criterion — gold value determines eligibility",
    ],
    documents: [
      "Aadhaar Card (mandatory under PMLA norms)",
      "PAN Card",
      "Recent passport-size photograph",
      "Gold ornaments for valuation",
      "Address proof (if address differs from Aadhaar)",
    ],
    stats: { interest: "0.83% p.a.", amount: "₹1,500 – ₹50L", tenure: "6–24 months", fee: "NIL" },
  },
  "credit-score": {
    icon: "📊",
    title: "Credit Score",
    tagline: "Free credit health check — know your CIBIL score and improve your borrowing power.",
    overview: `Your CIBIL / Experian credit score is a 3-digit numeric summary (300–900) computed by credit bureaus licensed by the Reserve Bank of India. Shree Ganesh Finance provides a complimentary credit score check to all customers.`,
    overview_extra: `A score above 750 qualifies you for preferential interest rates. Our advisors help you understand payment history (35%), credit utilization (30%), credit age (15%), credit mix (10%), and new inquiries (10%).`,
    benefits: [
      "Free CIBIL / Experian score check — no charge, no hidden cost",
      "Detailed breakdown of score components as per RBI bureau guidelines",
      "Personalized improvement plan from certified financial advisors",
      "Score check does not impact your credit record (soft inquiry only)",
      "Available online and at all branch locations",
      "Linked to pre-approved loan offers based on your score band",
    ],
    eligibility_points: [
      "Any Indian resident with a PAN card",
      "Applicants with no prior credit history can also check",
      "Available for both salaried and self-employed individuals",
    ],
    documents: [
      "PAN Card (mandatory for bureau query)",
      "Aadhaar Card for identity verification",
      "Mobile number linked to Aadhaar for OTP",
    ],
    stats: { interest: "Free", amount: "Score: 300–900", tenure: "Instant", fee: "₹0" },
  },
  "gold-loan": {
    icon: "🏅",
    title: "Gold Loan",
    tagline: "India's most trusted secured loan — instant funds against your gold ornaments.",
    overview: `A Gold Loan from Shree Ganesh Finance is a secured lending product where you pledge your gold jewellery as collateral and receive funds instantly. We adhere to the RBI-mandated 75% LTV ratio, ensuring responsible lending and asset protection.`,
    overview_extra: `Gold loans start from ₹1,500 with no defined upper ceiling. Same-day disbursement, transparent interest calculation, and gold stored in insured, secure vaults. All pledged gold is covered under comprehensive insurance.`,
    benefits: [
      "Instant disbursement — funds credited within hours of valuation",
      "Loan amount: ₹1,500 minimum; no maximum limit (subject to 75% LTV per RBI)",
      "Competitive interest rates starting from 9.99% p.a.",
      "Zero income proof or credit score requirement",
      "Pre and part-payment options available anytime",
      "Gold insured and stored in RBI-compliant, high-security vaults",
      "Simple renewal process — extend tenure without surrendering gold",
    ],
    eligibility_points: [
      "Indian residents aged 18 years and above",
      "KYC compliance mandatory (Aadhaar + PAN)",
      "Gold jewellery / ornaments of 18–22 karat purity",
      "No minimum income or CIBIL score required",
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card (mandatory for loans above ₹1 lakh)",
      "Recent passport-size photograph",
      "Gold ornaments for in-branch valuation",
    ],
    stats: { interest: "9.99% p.a.", amount: "₹1,500 – No Limit", tenure: "3–24 months", fee: "NIL" },
    popular: true,
  },
  "gold-loan-at-home": {
    icon: "🏠",
    title: "Gold Loan at Home",
    tagline: "Doorstep gold loan in 3 steps — our executive visits you, no branch visit needed.",
    overview: `Our Gold Loan at Home service brings the complete gold loan facility to your doorstep. A trained executive visits at your chosen time, conducts on-site gold valuation, and disburses the loan directly to your bank account.`,
    overview_extra: `Designed for senior citizens, homemakers, and busy professionals. The process is digitally documented with secure chain-of-custody for your gold from pickup to vault storage. All operations comply with RBI's KYC and safe custody guidelines.`,
    benefits: [
      "Zero branch visit required — entire process at your doorstep",
      "Certified gold appraiser with calibrated valuation kit",
      "Loan disbursed directly to your bank account within the same visit",
      "Available 6 days a week — schedule at your convenience",
      "Secure, GPS-tracked transport of pledged gold to vaults",
      "Gold covered under all-risk insurance from moment of pickup",
      "Senior citizen priority slots available — no waiting",
    ],
    eligibility_points: [
      "Indian residents aged 18 and above within serviceable pincodes",
      "Valid KYC documents (Aadhaar + PAN)",
      "Minimum gold quantity: equivalent to ₹5,000 loan value",
      "Active bank account for disbursement (NEFT/IMPS/UPI)",
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Bank account details (passbook copy / cancelled cheque)",
      "Gold ornaments (valued at home)",
    ],
    stats: { interest: "9.99% p.a.", amount: "₹5,000 – ₹50L", tenure: "3–24 months", fee: "NIL" },
  },
  "housing-finance": {
    icon: "🏗️",
    title: "Housing Finance",
    tagline: "Make your dream home a reality — affordable home loans with long tenures.",
    overview: `We offer housing loans for purchase of ready-to-move and under-construction properties, home construction, and balance transfer of existing home loans. Products are aligned with NHB and RBI guidelines.`,
    overview_extra: `Financing up to 80% of property value as per RBI LTV norms. Flexible EMI structures and tenures up to 20 years make home ownership accessible for salaried, self-employed, and NRI borrowers.`,
    benefits: [
      "Finance up to 80% of property value per RBI/NHB LTV guidelines",
      "Loan tenure up to 20 years",
      "Available for purchase, construction, extension, and renovation",
      "Balance transfer facility with top-up loan option",
      "PMAY subsidy assistance for eligible borrowers",
      "Dedicated relationship manager for end-to-end guidance",
      "Doorstep documentation service available",
    ],
    eligibility_points: [
      "Salaried: Minimum 2 years employment; net income ₹25,000/month",
      "Self-employed: Minimum 3 years business continuity with ITR",
      "Age: 21–65 years at loan maturity",
      "Property must have clear title and statutory approvals",
    ],
    documents: [
      "Identity & Address Proof (Aadhaar + PAN)",
      "Income documents (3 months salary slips / 2 years ITR)",
      "Bank statements (6 months)",
      "Property documents (sale deed, NOC, approved plan)",
    ],
    stats: { interest: "8.50% p.a.", amount: "₹5L – ₹5 Crore", tenure: "Up to 20 years", fee: "0.50%" },
  },
  "personal-loan": {
    icon: "👤",
    title: "Personal Loan",
    tagline: "Unsecured quick cash for your goals — no collateral, minimal documentation.",
    overview: `An unsecured credit product for any personal financial requirement — medical emergencies, education, travel, or weddings. We follow strict fair lending practices with full disclosure of all charges upfront.`,
    overview_extra: `No collateral pledged. Approvals based on CIBIL score, income stability, and repayment capacity. APR disclosed upfront as per RBI's Key Fact Statement mandate effective 2024.`,
    benefits: [
      "No collateral required",
      "Quick digital approval — decision within 24–48 hours",
      "Loan amount from ₹50,000 to ₹25 lakhs",
      "Flexible tenure: 12 to 60 months",
      "APR disclosed upfront per RBI's KFS mandate",
      "Part-prepayment allowed after 6 EMIs",
      "Top-up loan available on good repayment track record",
    ],
    eligibility_points: [
      "Salaried: Minimum net monthly income ₹20,000",
      "Self-employed: Minimum annual turnover as per ITR",
      "CIBIL score 700 and above preferred",
      "Age: 21–60 years",
    ],
    documents: [
      "Aadhaar Card + PAN Card",
      "3 months salary slips / ITR",
      "6 months bank statements",
      "Employment ID / appointment letter",
    ],
    stats: { interest: "12.00% p.a.", amount: "₹50K – ₹25L", tenure: "12–60 months", fee: "1%–2%" },
  },
  "small-business-loan": {
    icon: "🏪",
    title: "Small Business Loan",
    tagline: "Fuel your entrepreneurial ambitions — flexible business finance for MSMEs.",
    overview: `Designed for MSMEs registered under the MSMED Act, 2006. We offer secured and unsecured variants for working capital, machinery purchase, business expansion, and trade financing.`,
    overview_extra: `Aligned with RBI's Priority Sector Lending guidelines and CGTMSE credit guarantee schemes. Collateral-free loans up to ₹2 crore available. Mudra Loan (PMMY) linkages facilitated.`,
    benefits: [
      "Collateral-free loans up to ₹2 crore under CGTMSE",
      "Mudra Loan linkage — Shishu/Kishore/Tarun",
      "Working capital, term loan, and overdraft facilities",
      "Minimal documentation for GST-registered businesses",
      "Flexible repayment: monthly, quarterly, or seasonal",
      "Priority processing for women entrepreneurs and SC/ST borrowers",
    ],
    eligibility_points: [
      "MSME registered under Udyam Registration",
      "Minimum 2 years business operation with audited financials",
      "GST registration mandatory for loans above ₹10 lakhs",
    ],
    documents: [
      "Udyam Registration Certificate",
      "GST Registration + 12 months GST returns",
      "2 years ITR with audited P&L",
      "Bank statements (12 months)",
    ],
    stats: { interest: "14.00% p.a.", amount: "₹50K – ₹2 Crore", tenure: "12–84 months", fee: "1%–2%" },
  },
  "insurance": {
    icon: "🛡️",
    title: "Insurance",
    tagline: "Protect what matters most — life, health, and asset insurance under one roof.",
    overview: `Shree Ganesh Finance is a licensed Corporate Agent for IRDAI-regulated insurance products — Life, Health, Motor, and Property Insurance from leading insurers.`,
    overview_extra: `All products comply with IRDAI regulations. Free-look period guidance, claim assistance, and annual portfolio reviews provided. Our advisors follow IRDAI's Suitability Framework.`,
    benefits: [
      "Life Insurance: Term plans, endowment, and ULIPs",
      "Health Insurance: Individual, family floater, and top-up plans",
      "Motor Insurance: Comprehensive and third-party liability",
      "Property and Home Insurance for loan-linked assets",
      "Free-look period: 15 days (30 days for electronic policies)",
      "Claim assistance — we liaise with insurer on your behalf",
      "Annual policy review and renewal reminders",
    ],
    eligibility_points: [
      "Indian residents aged 18 and above",
      "Medical underwriting may apply for health/life policies",
      "No prior insurance mandatory",
    ],
    documents: [
      "Aadhaar Card + PAN Card",
      "Passport-size photograph",
      "Medical reports (if required)",
      "Vehicle RC book (for motor insurance)",
    ],
    stats: { interest: "IRDAI Approved", amount: "As per plan", tenure: "1–30 years", fee: "NIL" },
  },
  "sme-loan": {
    icon: "📈",
    title: "SME Loan",
    tagline: "Scale your business confidently — structured credit for growing enterprises.",
    overview: `Purpose-built for established businesses looking to scale operations, upgrade technology, expand capacity, or manage seasonal cash flow gaps. Aligned with RBI's SME credit assessment guidelines.`,
    overview_extra: `Funded and non-funded credit facilities available including term loans, working capital, bank guarantees, and letter of credit based on business requirements.`,
    benefits: [
      "Funded and non-funded credit facilities",
      "Working capital: Overdraft, Cash Credit, and Bill Discounting",
      "Term loans for machinery, equipment, and expansion",
      "CIBIL MSME Rank-based preferential pricing",
      "Invoice financing for B2B businesses",
      "Dedicated Relationship Manager for all SME accounts",
    ],
    eligibility_points: [
      "Annual turnover between ₹50 lakhs and ₹250 crore",
      "Minimum 3 years of audited financials",
      "Satisfactory CIBIL MSME rank",
      "GST returns consistent with declared turnover",
    ],
    documents: [
      "3 years audited financials (P&L, Balance Sheet)",
      "3 years ITR (Entity + Promoters)",
      "GST registration + 24 months returns",
      "KYC of all directors/partners",
    ],
    stats: { interest: "13.00% p.a.", amount: "₹25L – ₹10 Crore", tenure: "12–120 months", fee: "1%–2%" },
  },
  "corporate-business-loan": {
    icon: "🏢",
    title: "Corporate Business Loan",
    tagline: "High-value structured finance for large corporates and conglomerates.",
    overview: `A large-ticket structured credit product for companies with significant revenue, stable cash flows, and formal corporate governance. Often involves consortium or co-lending arrangements.`,
    overview_extra: `Operates under RBI's Large Exposure Framework (LEF) and IRB credit assessment methodology. Qualified CAs and legal teams conduct detailed due diligence for responsible disbursement.`,
    benefits: [
      "High-value structured credit for corporate cash flow cycles",
      "Term loans, working capital lines, and project finance",
      "Consortium lending for large exposures",
      "Competitive pricing linked to credit rating and collateral",
      "Co-lending with scheduled commercial banks",
      "Dedicated corporate banking team with sectoral expertise",
    ],
    eligibility_points: [
      "Companies with annual turnover above ₹250 crore",
      "Credit rating from CRISIL, ICRA, CARE, or FITCH preferred",
      "Minimum 5 years of audited financials",
      "Board resolution authorizing borrowing required",
    ],
    documents: [
      "5 years audited financials + board-approved projections",
      "Credit rating report (if available)",
      "MOA, AOA, board resolution",
      "KYC of all directors and significant shareholders",
    ],
    stats: { interest: "11.00% p.a.", amount: "₹1 Crore+", tenure: "12–180 months", fee: "0.50%–1%" },
  },
  "vehicle-loan": {
    icon: "🚗",
    title: "Vehicle Loan",
    tagline: "Drive home your dream vehicle — new and used vehicle financing at your doorstep.",
    overview: `Vehicle loans for new and pre-owned cars, two-wheelers, and commercial vehicles. Financing up to 85% of on-road price (new) or 80% of assessed value (used) per RBI norms.`,
    overview_extra: `Loans are hypothecated as per the Motor Vehicles Act, 1988. Comprehensive insurance mandatory throughout tenure. Used vehicle loans available for vehicles up to 7 years old.`,
    benefits: [
      "Finance up to 85% of on-road price for new vehicles",
      "Used car loans for vehicles up to 7 years old",
      "Transparent amortization schedules",
      "Flexible tenure: 12 to 84 months",
      "RC endorsement completed within 7 working days",
      "Part-prepayment accepted after 6 EMIs without penalty",
    ],
    eligibility_points: [
      "Salaried / self-employed Indian residents aged 21–65",
      "Minimum net income: ₹15,000/month (salaried)",
      "CIBIL score 650+ preferred",
      "Valid driving license required",
    ],
    documents: [
      "Aadhaar + PAN",
      "3 months salary slips / ITR",
      "6 months bank statements",
      "Vehicle quotation / valuation report",
      "Driving License",
    ],
    stats: { interest: "9.50% p.a.", amount: "₹50K – ₹50L", tenure: "12–84 months", fee: "1%" },
  },
  "mutual-funds": {
    icon: "📂",
    title: "Mutual Funds",
    tagline: "Invest in SEBI-regulated mutual funds — grow wealth systematically.",
    overview: `Shree Ganesh Finance is an AMFI-registered Mutual Fund Distributor (ARN holder). We offer equity, debt, hybrid, and solution-oriented schemes from SEBI-registered AMCs.`,
    overview_extra: `All investments subject to market risk. We facilitate SIP, lump sum, and STP investments with goal-based financial planning mapping each recommendation to your stated objective.`,
    benefits: [
      "Full range: Equity, Debt, Hybrid, Index, ELSS funds",
      "SIP starting from ₹500/month",
      "SEBI-mandated risk-o-meter for every scheme",
      "Goal-based planning: retirement, education, home purchase",
      "Annual portfolio review and rebalancing advisory",
      "KYC once — invest across all AMCs",
    ],
    eligibility_points: [
      "KYC-compliant Indian residents",
      "NRIs can invest subject to FEMA norms",
      "Minors can invest through guardian",
      "No minimum income requirement",
    ],
    documents: [
      "PAN Card (mandatory per SEBI/PMLA)",
      "Aadhaar for KYC verification",
      "Bank account for NACH/UPI mandate",
      "Passport-size photograph",
    ],
    stats: { interest: "Market Returns", amount: "₹500 SIP onwards", tenure: "No lock-in*", fee: "0%" },
  },
  "money-transfer": {
    icon: "💸",
    title: "Money Transfer",
    tagline: "Fast, safe, RBI-authorised domestic and international remittances.",
    overview: `Domestic money transfer via RBI-authorised BC network. NEFT, RTGS, IMPS, UPI, and AePS (Aadhaar-enabled) for last-mile banking in rural areas.`,
    overview_extra: `International remittances under RBI's LRS — up to USD 2,50,000 per financial year. Full FEMA compliance and Form A2 filing assistance provided.`,
    benefits: [
      "Domestic: NEFT/RTGS/IMPS/UPI — 24×7",
      "AePS cash withdrawal at BC outlets",
      "International remittance under LRS (up to USD 2.5L/year)",
      "Inward remittance through authorized bank tie-ups",
      "Real-time tracking and SMS/email confirmation",
      "Competitive forex rates",
    ],
    eligibility_points: [
      "Any KYC-compliant Indian resident for domestic transfers",
      "For LRS: PAN mandatory",
      "For AePS: Aadhaar-linked bank account required",
    ],
    documents: [
      "Aadhaar + PAN",
      "Form A2 for international remittance",
      "Purpose declaration for LRS amounts above ₹25,000",
      "Bank account details of beneficiary",
    ],
    stats: { interest: "Low Fee", amount: "No Upper Limit*", tenure: "Instant", fee: "Minimal" },
  },
};

// ─── Icons ───
const ArrowRight = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

const StatCard = ({ label, value, accent }) => (
  <div className={`flex flex-col gap-1 px-4 py-3 rounded-xl border ${accent ? "border-red-200 bg-red-50" : "border-gray-100 bg-gray-50"}`}>
    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{label}</span>
    <span className={`text-sm sm:text-base font-black ${accent ? "text-red-700" : "text-gray-800"}`}>{value}</span>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN COMPONENT — reads :serviceId from URL
// ═══════════════════════════════════════════════════════════════════════════════
export default function ServiceDetail() {
  const { serviceId } = useParams(); // e.g. "gold-loan", "gold-loan-at-home"
  const service = SERVICES_DATA[serviceId];

  // 404
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <p className="text-6xl">🔍</p>
        <h1 className="text-2xl font-black text-gray-800">Service not found</h1>
        <Link to="/services" className="text-red-600 font-bold hover:underline">← Back to Service</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Back */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 pt-6 pb-2">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors group"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          ← Back to Services
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-4">
        <div className="bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-red-950 rounded-3xl px-6 sm:px-10 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-4xl">{service.icon}</span>
                {service.popular && (
                  <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-yellow-900 text-[10px] font-black tracking-wide uppercase">
                    ⭐ Most Popular
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-bold tracking-wide uppercase border border-white/10">
                  RBI Regulated
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
                {service.title}
              </h1>
              <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                {service.tagline}
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all active:scale-95 shadow-lg shadow-red-900/30 whitespace-nowrap"
            >
              Apply Now <ArrowRight />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-8">
            <StatCard label="Interest From" value={service.stats.interest} accent />
            <StatCard label="Loan Amount" value={service.stats.amount} />
            <StatCard label="Tenure" value={service.stats.tenure} />
            <StatCard label="Processing Fee" value={service.stats.fee} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-8 space-y-6">

        {/* Overview */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-4">Overview</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">{service.overview}</p>
          {service.overview_extra && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed border-l-4 border-red-200 pl-4 bg-red-50/50 py-3 rounded-r-lg">
              {service.overview_extra}
            </p>
          )}
        </div>

        {/* Benefits + Eligibility/Docs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-black text-gray-800 mb-5">
              <span>✅</span> Key Benefits
            </h2>
            <ul className="space-y-3">
              {service.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 pb-2.5 border-b border-gray-50 last:border-0 last:pb-0">
                  <CheckIcon /><span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-black text-gray-800 mb-5">
                <span>👤</span> Eligibility
              </h2>
              <ul className="space-y-3">
                {service.eligibility_points.map((e, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-red-400 mt-0.5 flex-shrink-0"><ArrowRight /></span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-black text-gray-800 mb-5">
                <span>📄</span> Documents Required
              </h2>
              <ul className="space-y-3">
                {service.documents.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <DocIcon /><span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6 sm:p-8">
          <div>
            <p className="font-black text-gray-900 text-lg">Ready to get started?</p>
            <p className="text-gray-500 text-sm mt-0.5">Apply now or speak with our financial advisor.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/services"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-white text-gray-700 hover:text-red-700 text-sm font-bold transition-all"
            >
              ← Back to Services
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all active:scale-95 shadow-md shadow-red-100"
            >
              Apply Now <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}