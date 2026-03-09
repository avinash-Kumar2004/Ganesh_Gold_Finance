import { useState, useRef, useEffect, useContext } from "react";
import { LanguageContext } from '../Common/Navbaar'; // adjust import path as needed
import { Link } from "react-router-dom"; // top pe add karo

// ═══════════════════════════════════════════════════════════════════════════════
// ─── TRANSLATIONS FOR ALL SERVICE CONTENT
// ═══════════════════════════════════════════════════════════════════════════════
const SERVICE_TRANSLATIONS = {
  en: {
    services_title: "Our Financial Services",
    services_subtitle: "RBI-regulated financial solutions tailored for every need",
    read_more: "Read More",
    show_less: "Show Less",
    key_benefits: "Key Benefits",
    eligibility: "Eligibility",
    documents: "Documents Required",
    apply_now: "Apply Now",
    learn_more: "Learn More",
    emi_starts: "EMI starts from",
    per_month: "/month",
    interest_from: "Interest from",
    per_annum: "p.a.",
    loan_amount: "Loan Amount",
    tenure: "Tenure",
    processing_fee: "Processing Fee",
    up_to: "Up to",
    min: "Min",
    months: "months",
    years: "years",
    nil: "NIL",
    overview: "Overview",
    highlight_badge: "Most Popular",
    rbi_approved: "RBI Regulated",
    services: {
      gold_flexi_credit: {
        title: "Gold Flexi Credit",
        tagline: "Revolving credit line against your gold — pay interest only on what you use.",
        overview: `Shree Ganesh Finance's Gold Flexi Credit is an innovative revolving credit facility where you pledge your gold ornaments and receive a pre-approved credit limit. Unlike a standard gold loan, you withdraw only what you need, when you need it — and interest is charged solely on the utilized amount. This makes it an ideal instrument for business owners, traders, and individuals with fluctuating financial requirements.`,
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
        stats: { interest: "0.83%", amount: "₹1,500 – ₹50L", tenure: "6–24 months", fee: "NIL" },
      },
      credit_score: {
        title: "Credit Score",
        tagline: "Free credit health check — know your CIBIL score and improve your borrowing power.",
        overview: `Your CIBIL / Experian credit score is a 3-digit numeric summary (300–900) computed by credit bureaus licensed by the Reserve Bank of India. It reflects your credit history across all lenders. Shree Ganesh Finance provides a complimentary credit score check to all customers as part of our financial literacy initiative.`,
        overview_extra: `A score above 750 qualifies you for preferential interest rates on personal loans, business loans, and other credit products. Our financial advisors help you understand the factors impacting your score — payment history (35%), credit utilization (30%), credit age (15%), credit mix (10%), and new inquiries (10%) — and suggest actionable steps to improve it.`,
        benefits: [
          "Free CIBIL / Experian score check — no charge, no hidden cost",
          "Detailed breakdown of score components as per RBI bureau guidelines",
          "Personalized improvement plan from our certified financial advisors",
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
      gold_loan: {
        title: "Gold Loan",
        tagline: "India's most trusted secured loan — instant funds against your gold ornaments.",
        overview: `A Gold Loan from Shree Ganesh Finance is a secured lending product where you pledge your gold jewellery or ornaments as collateral and receive funds instantly. As an RBI-regulated NBFC, we adhere strictly to the Loan-to-Value (LTV) ratio mandated by the Reserve Bank of India — currently capped at 75% of the gold's appraised value — ensuring responsible lending and asset protection for our customers.`,
        overview_extra: `Our gold loans start from as low as ₹1,500 with no defined upper ceiling (subject to gold value and LTV norms). With same-day disbursement, transparent interest calculation, and gold stored in insured, secure vaults, Shree Ganesh Finance offers the most reliable gold loan experience across India. All pledged gold is covered under comprehensive insurance during the custody period.`,
        benefits: [
          "Instant disbursement — funds credited within hours of valuation",
          "Loan amount: ₹1,500 minimum; no maximum limit (subject to 75% LTV per RBI)",
          "Competitive interest rates starting from 9.99% p.a. (flat / reducing as applicable)",
          "Zero income proof or credit score requirement",
          "Pre and part-payment options available — reduce interest burden anytime",
          "Gold insured and stored in RBI-compliant, high-security vaults",
          "Simple renewal process — extend tenure without surrendering gold",
        ],
        eligibility_points: [
          "Indian residents aged 18 years and above",
          "KYC compliance mandatory (Aadhaar + PAN as per RBI/PMLA guidelines)",
          "Gold jewellery / ornaments of 18–22 karat purity",
          "No minimum income or CIBIL score required",
        ],
        documents: [
          "Aadhaar Card",
          "PAN Card (mandatory for loans above ₹1 lakh — PMLA compliance)",
          "Recent passport-size photograph",
          "Gold ornaments for in-branch valuation",
        ],
        stats: { interest: "9.99%", amount: "₹1,500 – No Limit", tenure: "3–24 months", fee: "NIL" },
        popular: true,
      },
      gold_loan_at_home: {
        title: "Gold Loan at Home",
        tagline: "Doorstep gold loan in 3 steps — our executive visits you, no branch visit needed.",
        overview: `Shree Ganesh Finance's Gold Loan at Home service brings our complete gold loan facility to your doorstep. A trained, verified, and uniformed executive visits your residence at your chosen time, conducts the gold valuation on-site using certified equipment, and disburses the loan amount directly to your bank account — all within the same visit or within a few hours.`,
        overview_extra: `This service is designed for senior citizens, homemakers, busy professionals, and anyone who values convenience and privacy. The entire process is digitally documented, with a secure chain-of-custody for your gold from pickup to secure vault storage. All operations comply with RBI's KYC norms and safe custody guidelines.`,
        benefits: [
          "Zero branch visit required — entire process at your doorstep",
          "Certified gold appraiser visits with calibrated, sealed valuation kit",
          "Loan disbursed directly to your bank account within the same visit",
          "Available 6 days a week — schedule at your convenience",
          "Secure, GPS-tracked transport of pledged gold to vaults",
          "Gold covered under all-risk insurance from the moment of pickup",
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
          "Gold ornaments (will be valued at home)",
        ],
        stats: { interest: "9.99%", amount: "₹5,000 – ₹50L", tenure: "3–24 months", fee: "NIL" },
      },
      housing_finance: {
        title: "Housing Finance",
        tagline: "Make your dream home a reality — affordable home loans with long tenures.",
        overview: `Shree Ganesh Finance offers housing loans for purchase of ready-to-move and under-construction properties, home construction, and balance transfer of existing home loans. Our housing finance products are aligned with NHB (National Housing Bank) and RBI guidelines, ensuring fair and transparent lending.`,
        overview_extra: `We offer financing up to 80% of property value (as per RBI LTV norms for housing loans). Our flexible EMI structures and long repayment tenures up to 20 years make home ownership accessible for salaried professionals, self-employed individuals, and NRIs. Our dedicated housing finance team assists from property due diligence to final disbursement.`,
        benefits: [
          "Finance up to 80% of property value as per RBI/NHB LTV guidelines",
          "Loan tenure up to 20 years for comfortable EMI planning",
          "Available for purchase, construction, extension, and renovation",
          "Balance transfer facility with top-up loan option",
          "PMAY (Pradhan Mantri Awas Yojana) subsidy assistance for eligible borrowers",
          "Dedicated relationship manager for end-to-end property and loan guidance",
          "Doorstep documentation service available",
        ],
        eligibility_points: [
          "Salaried: Minimum 2 years of employment; minimum net income ₹25,000/month",
          "Self-employed: Minimum 3 years of business continuity with ITR",
          "Age: 21–65 years at loan maturity",
          "Property must have clear title and all statutory approvals",
        ],
        documents: [
          "Identity & Address Proof (Aadhaar + PAN)",
          "Income documents (3 months salary slips / 2 years ITR)",
          "Bank statements (6 months)",
          "Property documents (sale deed, NOC, approved plan)",
          "Passport-size photographs",
        ],
        stats: { interest: "8.50%", amount: "₹5L – ₹5 Crore", tenure: "Up to 20 years", fee: "0.50%" },
      },
      personal_loan: {
        title: "Personal Loan",
        tagline: "Unsecured quick cash for your goals — no collateral, minimal documentation.",
        overview: `Shree Ganesh Finance's Personal Loan is an unsecured credit product that puts funds in your hands quickly for any personal financial requirement — be it medical emergencies, education, travel, wedding expenses, or debt consolidation. As an RBI-regulated NBFC, we follow strict fair lending practices with full disclosure of all charges upfront.`,
        overview_extra: `Unlike secured loans, no collateral is pledged. Loan approvals are based on your creditworthiness (CIBIL score), income stability, and repayment capacity as per RBI's income-based lending norms. We offer transparent pricing with the Annual Percentage Rate (APR) disclosed upfront, in line with RBI's Key Fact Statement (KFS) mandate for retail loans effective 2024.`,
        benefits: [
          "No collateral required — purely income and credit score based",
          "Quick digital approval — decision within 24–48 hours",
          "Loan amount from ₹50,000 to ₹25 lakhs based on eligibility",
          "Flexible tenure: 12 to 60 months",
          "Annual Percentage Rate (APR) disclosed upfront per RBI's KFS mandate",
          "Part-prepayment allowed after 6 EMIs (no penalty after lock-in)",
          "Top-up loan available on good repayment track record",
        ],
        eligibility_points: [
          "Salaried employees: Minimum net monthly income ₹20,000",
          "Self-employed: Minimum annual turnover as per ITR",
          "CIBIL score 700 and above preferred",
          "Age: 21–60 years",
          "Minimum 1 year at current employer / 2 years in business",
        ],
        documents: [
          "Aadhaar Card + PAN Card",
          "3 months latest salary slips / ITR for self-employed",
          "6 months bank statements",
          "Employment ID / appointment letter",
          "Passport-size photographs",
        ],
        stats: { interest: "12.00%", amount: "₹50K – ₹25L", tenure: "12–60 months", fee: "1%–2%" },
      },
      small_business_loan: {
        title: "Small Business Loan",
        tagline: "Fuel your entrepreneurial ambitions — flexible business finance for MSMEs.",
        overview: `Shree Ganesh Finance's Small Business Loan is designed for Micro, Small, and Medium Enterprises (MSMEs) registered under the MSMED Act, 2006. We offer both secured and unsecured business loan variants to support working capital needs, machinery purchase, business expansion, and trade financing.`,
        overview_extra: `Our MSME lending is aligned with RBI's Priority Sector Lending (PSL) guidelines and the MSME Ministry's credit guarantee schemes (CGTMSE). Eligible borrowers can avail collateral-free loans up to ₹2 crore under the CGTMSE umbrella. We also facilitate Mudra Loan (PMMY) linkages for micro-enterprises under the Shishu, Kishore, and Tarun categories.`,
        benefits: [
          "Collateral-free loans up to ₹2 crore under CGTMSE scheme",
          "Mudra Loan (PMMY) linkage for micro-enterprises — Shishu/Kishore/Tarun",
          "Working capital, term loan, and overdraft facilities available",
          "Minimal documentation for GST-registered businesses",
          "Flexible repayment: monthly, quarterly, or seasonal schedules",
          "Overdraft against receivables / stock available for trade businesses",
          "Priority processing for women entrepreneurs and SC/ST borrowers",
        ],
        eligibility_points: [
          "MSME registered under MSMED Act / Udyam Registration",
          "Minimum 2 years of business operation with audited financials",
          "GST registration mandatory for loans above ₹10 lakhs",
          "Satisfactory banking and credit history",
        ],
        documents: [
          "Udyam Registration Certificate",
          "GST Registration + last 12 months GST returns",
          "2 years ITR with audited P&L and Balance Sheet",
          "Bank statements (12 months)",
          "KYC of proprietor/partners/directors",
        ],
        stats: { interest: "14.00%", amount: "₹50K – ₹2 Crore", tenure: "12–84 months", fee: "1%–2%" },
      },
      insurance: {
        title: "Insurance",
        tagline: "Protect what matters most — life, health, and asset insurance under one roof.",
        overview: `Shree Ganesh Finance acts as a licensed Corporate Agent for IRDAI-regulated insurance products. We offer a curated portfolio of Life Insurance, Health Insurance, Motor Insurance, and Property Insurance from leading insurers. As a regulated intermediary, we are obligated to recommend products that genuinely match your needs — not just commission-driven offerings.`,
        overview_extra: `All insurance products sold through us comply with IRDAI (Insurance Regulatory and Development Authority of India) regulations. We provide free-look period guidance, claim assistance, and annual portfolio reviews. Our advisors follow the 'Suitability Framework' mandated by IRDAI to ensure you purchase only what you need at the right coverage level.`,
        benefits: [
          "Life Insurance: Term plans, endowment, and ULIPs from IRDAI-approved insurers",
          "Health Insurance: Individual, family floater, and top-up plans",
          "Motor Insurance: Comprehensive and third-party liability as per Motor Vehicles Act",
          "Property and Home Insurance for loan-linked assets",
          "Free-look period: 15 days (30 days for electronic policies) per IRDAI norms",
          "Claim assistance service — we liaise with the insurer on your behalf",
          "Annual policy review and renewal reminders",
        ],
        eligibility_points: [
          "Indian residents aged 18 and above (varies by product)",
          "Medical underwriting may be required for health/life policies",
          "No prior insurance mandatory — fresh policies welcome",
        ],
        documents: [
          "Aadhaar Card + PAN Card",
          "Passport-size photograph",
          "Medical reports (if required by insurer for health/life)",
          "Vehicle RC book (for motor insurance)",
          "Bank account for premium mandate / disbursement",
        ],
        stats: { interest: "IRDAI Approved", amount: "As per plan", tenure: "1–30 years", fee: "NIL" },
      },
      sme_loan: {
        title: "SME Loan",
        tagline: "Scale your business confidently — structured credit for growing enterprises.",
        overview: `SME (Small and Medium Enterprise) Loans at Shree Ganesh Finance are purpose-built for established businesses looking to scale operations, upgrade technology, expand capacity, or manage seasonal cash flow gaps. Unlike small business loans, SME loans cater to entities with higher revenue thresholds and require structured financial documentation.`,
        overview_extra: `Our SME lending framework is aligned with RBI's credit assessment guidelines for MSME / SME lending, including mandatory credit appraisal, CIBIL MSME rank checks, and sector-specific risk assessment. We offer both funded facilities (term loans, working capital loans) and non-funded facilities (bank guarantees, letter of credit) based on business requirements.`,
        benefits: [
          "Funded and non-funded credit facilities available",
          "Working capital loans: Overdraft, Cash Credit, and Bill Discounting",
          "Term loans for machinery, equipment, and expansion",
          "CIBIL MSME Rank-based preferential pricing for well-rated SMEs",
          "Loans against receivables / invoice financing for B2B businesses",
          "Sector-specific lending programs for manufacturing, retail, and services",
          "Dedicated Relationship Manager for all SME accounts",
        ],
        eligibility_points: [
          "Entities with annual turnover between ₹50 lakhs and ₹250 crore",
          "Minimum 3 years of audited financials",
          "Satisfactory CIBIL MSME rank and commercial bureau score",
          "GST returns consistent with declared turnover",
        ],
        documents: [
          "3 years audited financials (P&L, Balance Sheet, Cash Flow)",
          "3 years ITR (Entity + Promoters)",
          "GST registration + 24 months returns",
          "Existing loan statements (SOA) if applicable",
          "KYC of all directors/partners",
        ],
        stats: { interest: "13.00%", amount: "₹25L – ₹10 Crore", tenure: "12–120 months", fee: "1%–2%" },
      },
      corporate_business_loan: {
        title: "Corporate Business Loan",
        tagline: "High-value structured finance for large corporates and conglomerates.",
        overview: `Shree Ganesh Finance's Corporate Business Loan is a large-ticket structured credit product for companies with significant revenue, stable cash flows, and formal corporate governance structures. These facilities are tailored through bespoke credit assessment, often involving consortium or co-lending arrangements for large exposures.`,
        overview_extra: `Corporate lending operates under RBI's Large Exposure Framework (LEF) and the Internal Rating-Based (IRB) credit assessment methodology. We work with qualified CAs and legal teams to conduct detailed due diligence, ensuring responsible disbursement and covenant compliance throughout the loan life cycle.`,
        benefits: [
          "High-value structured credit tailored to corporate cash flow cycles",
          "Term loans, working capital lines, and project finance available",
          "Consortium lending options for exposures exceeding single-entity limits",
          "Competitive pricing linked to credit rating and collateral quality",
          "Co-lending arrangements with scheduled commercial banks where beneficial",
          "Structured repayment: bullet, amortizing, or balloon payment schedules",
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
          "Complete KYC of all directors and significant shareholders",
          "Details of existing credit facilities from all lenders",
        ],
        stats: { interest: "11.00%", amount: "₹1 Crore+", tenure: "12–180 months", fee: "0.50%–1%" },
      },
      vehicle_loan: {
        title: "Vehicle Loan",
        tagline: "Drive home your dream vehicle — new and used vehicle financing at your doorstep.",
        overview: `Shree Ganesh Finance offers vehicle loans for new and pre-owned cars, two-wheelers, and commercial vehicles. Our financing covers up to 85% of the on-road price (new vehicles) or 80% of the assessed value (used vehicles), in line with RBI's asset-backed lending norms.`,
        overview_extra: `All vehicle loans are hypothecated in favour of Shree Ganesh Finance and RC-book endorsed as per the Motor Vehicles Act, 1988. Comprehensive insurance with Shree Ganesh Finance noted as financier is mandatory throughout the loan tenure, providing complete asset protection. Used vehicle loans are available for vehicles up to 7 years old, subject to valuation.`,
        benefits: [
          "Finance up to 85% of on-road price for new vehicles",
          "Used car loans available for vehicles up to 7 years old",
          "Competitive interest rates with transparent amortization schedules",
          "Flexible tenure: 12 to 84 months based on vehicle type",
          "Quick RC endorsement and hypothecation completion within 7 working days",
          "Doorstep document collection available in major cities",
          "Part-prepayment accepted after 6 EMIs without penalty",
        ],
        eligibility_points: [
          "Salaried / self-employed Indian residents aged 21–65",
          "Minimum net income: ₹15,000/month (salaried) or ₹2L/year (self-employed)",
          "CIBIL score 650+ preferred for unsecured portion",
          "Valid driving license (for individual borrowers)",
        ],
        documents: [
          "Aadhaar + PAN",
          "3 months salary slips / ITR",
          "6 months bank statements",
          "Vehicle quotation / valuation report (used vehicles)",
          "Driving License",
        ],
        stats: { interest: "9.50%", amount: "₹50K – ₹50L", tenure: "12–84 months", fee: "1%" },
      },
      mutual_funds: {
        title: "Mutual Funds",
        tagline: "Invest in SEBI-regulated mutual funds — grow wealth systematically.",
        overview: `Shree Ganesh Finance is an AMFI-registered Mutual Fund Distributor (ARN holder). We offer distribution of a wide range of mutual fund schemes across equity, debt, hybrid, and solution-oriented categories from SEBI-registered Asset Management Companies (AMCs). Our advisors follow SEBI's 'Appropriateness' framework to recommend schemes matching your risk profile and investment horizon.`,
        overview_extra: `All mutual fund investments are subject to market risk as per SEBI regulatory disclosures. We facilitate SIP (Systematic Investment Plan), lump sum, and STP (Systematic Transfer Plan) investments. We are committed to goal-based financial planning — mapping each mutual fund recommendation to your stated financial objective, whether it is wealth creation, tax saving (ELSS), retirement, or children's education.`,
        benefits: [
          "Full range: Equity, Debt, Hybrid, Index, ELSS (tax-saving) funds",
          "SIP starting from ₹500/month — ideal for long-term wealth creation",
          "SEBI-mandated risk-o-meter disclosure for every scheme",
          "Zero additional distribution commission passed to investors in Direct plans",
          "Goal-based planning: retirement, education, home purchase, etc.",
          "Annual portfolio review and rebalancing advisory",
          "KYC once — invest across all AMCs through single platform",
        ],
        eligibility_points: [
          "KYC-compliant Indian residents (Aadhaar-based eKYC available)",
          "NRIs can invest subject to FEMA and RBI repatriation norms",
          "Minors can invest through guardian",
          "No minimum income requirement",
        ],
        documents: [
          "PAN Card (mandatory for all MF investments per SEBI/PMLA)",
          "Aadhaar for KYC verification",
          "Bank account for mandate registration (NACH/UPI for SIP)",
          "Passport-size photograph",
        ],
        stats: { interest: "Market Returns", amount: "₹500 SIP onwards", tenure: "No lock-in*", fee: "0%" },
      },
      money_transfer: {
        title: "Money Transfer",
        tagline: "Fast, safe, RBI-authorised domestic and international remittances.",
        overview: `Shree Ganesh Finance offers domestic money transfer services through our RBI-authorised Business Correspondent (BC) network and Payment Aggregator tie-ups. We enable NEFT, RTGS, IMPS, and UPI-based fund transfers, along with Aadhaar-enabled Payment System (AePS) for last-mile banking in rural areas.`,
        overview_extra: `For international remittances, we operate under the RBI's Liberalised Remittance Scheme (LRS) allowing outward remittance up to USD 2,50,000 per financial year per individual for permissible purposes. Inward remittances from abroad are processed through our authorized dealer bank tie-ups, with full Form A2 and FEMA compliance documentation maintained.`,
        benefits: [
          "Domestic transfers: NEFT/RTGS/IMPS/UPI — 24×7 availability",
          "AePS (Aadhaar-enabled) cash withdrawal and transfer at BC outlets",
          "Outward international remittance under RBI's LRS (up to USD 2.5L/year)",
          "Inward remittance processing through authorized bank tie-ups",
          "Real-time transaction tracking and SMS/email confirmation",
          "Competitive forex rates for international transfers",
          "Full FEMA compliance — Form A2 filing assistance provided",
        ],
        eligibility_points: [
          "Any KYC-compliant Indian resident for domestic transfers",
          "For LRS: PAN mandatory; purpose must be within RBI's permitted list",
          "For AePS: Aadhaar-linked bank account required",
        ],
        documents: [
          "Aadhaar + PAN (mandatory for LRS transactions)",
          "Form A2 for outward international remittance",
          "Purpose declaration for LRS amounts above ₹25,000",
          "Bank account details of beneficiary",
        ],
        stats: { interest: "Low Fee", amount: "No Upper Limit*", tenure: "Instant", fee: "Minimal" },
      },
    },
  },
  hi: {
    services_title: "हमारी वित्तीय सेवाएं",
    services_subtitle: "आरबीआई-विनियमित वित्तीय समाधान, हर जरूरत के लिए",
    read_more: "और पढ़ें",
    show_less: "कम दिखाएं",
    key_benefits: "मुख्य लाभ",
    eligibility: "पात्रता",
    documents: "आवश्यक दस्तावेज",
    apply_now: "अभी आवेदन करें",
    learn_more: "अधिक जानें",
    emi_starts: "ईएमआई शुरू से",
    per_month: "/माह",
    interest_from: "ब्याज से",
    per_annum: "प्रति वर्ष",
    loan_amount: "ऋण राशि",
    tenure: "अवधि",
    processing_fee: "प्रोसेसिंग शुल्क",
    up_to: "तक",
    min: "न्यूनतम",
    months: "महीने",
    years: "वर्ष",
    nil: "शून्य",
    overview: "विवरण",
    highlight_badge: "सर्वाधिक लोकप्रिय",
    rbi_approved: "आरबीआई विनियमित",
    services: {
      gold_loan: {
        title: "गोल्ड लोन",
        tagline: "भारत का सबसे भरोसेमंद सुरक्षित ऋण — अपने सोने के आभूषणों पर तत्काल नकदी।",
        overview: `श्री गणेश फाइनेंस का गोल्ड लोन एक सुरक्षित ऋण उत्पाद है जिसमें आप अपने सोने के गहने गिरवी रखकर तुरंत धनराशि प्राप्त करते हैं। आरबीआई-विनियमित एनबीएफसी के रूप में हम आरबीआई द्वारा निर्धारित 75% एलटीवी अनुपात का सख्ती से पालन करते हैं।`,
        overview_extra: `हमारे गोल्ड लोन ₹1,500 से शुरू होते हैं। उसी दिन वितरण, पारदर्शी ब्याज गणना और बीमाकृत तिजोरियों में सुरक्षित सोना — श्री गणेश फाइनेंस सबसे विश्वसनीय गोल्ड लोन अनुभव प्रदान करता है।`,
        benefits: [
          "तत्काल वितरण — मूल्यांकन के कुछ घंटों में खाते में पैसे",
          "₹1,500 न्यूनतम; कोई अधिकतम सीमा नहीं (आरबीआई 75% एलटीवी के अधीन)",
          "9.99% प्रति वर्ष से प्रतिस्पर्धी ब्याज दरें",
          "कोई आय प्रमाण या क्रेडिट स्कोर आवश्यक नहीं",
          "पूर्व और आंशिक भुगतान विकल्प उपलब्ध",
          "आरबीआई-अनुपालक, उच्च-सुरक्षा तिजोरियों में बीमाकृत सोना",
        ],
        eligibility_points: [
          "18 वर्ष और उससे अधिक आयु के भारतीय निवासी",
          "केवाईसी अनुपालन अनिवार्य (आधार + पैन)",
          "18–22 कैरेट शुद्धता के सोने के गहने",
          "कोई न्यूनतम आय या सिबिल स्कोर नहीं",
        ],
        documents: ["आधार कार्ड", "पैन कार्ड", "पासपोर्ट साइज फोटो", "मूल्यांकन के लिए सोने के गहने"],
        stats: { interest: "9.99%", amount: "₹1,500 – कोई सीमा नहीं", tenure: "3–24 महीने", fee: "शून्य" },
        popular: true,
      },
    },
  },
};

// For languages not fully translated, fall back to English
const getContent = (lang) => {
  const base = SERVICE_TRANSLATIONS.en;
  const override = SERVICE_TRANSLATIONS[lang];
  if (!override) return base;
  return {
    ...base,
    ...override,
    services: { ...base.services, ...(override.services || {}) },
  };
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── SERVICE TABS CONFIG
// ═══════════════════════════════════════════════════════════════════════════════
const SERVICE_TABS = [
  { id: "gold_flexi_credit", icon: "💳" },
  { id: "credit_score", icon: "📊" },
  { id: "gold_loan", icon: "🏅" },
  { id: "gold_loan_at_home", icon: "🏠" },
  { id: "housing_finance", icon: "🏗️" },
  { id: "personal_loan", icon: "👤" },
  { id: "small_business_loan", icon: "🏪" },
  { id: "insurance", icon: "🛡️" },
  { id: "sme_loan", icon: "📈" },
  { id: "corporate_business_loan", icon: "🏢" },
  { id: "vehicle_loan", icon: "🚗" },
  { id: "mutual_funds", icon: "📂" },
  { id: "money_transfer", icon: "💸" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ─── ICONS
// ═══════════════════════════════════════════════════════════════════════════════
const ArrowRight = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);
const ChevDown = ({ open }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
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

// ═══════════════════════════════════════════════════════════════════════════════
// ─── STAT CARD
// ═══════════════════════════════════════════════════════════════════════════════
const StatCard = ({ label, value, accent }) => (
  <div className={`flex flex-col gap-1 px-4 py-3 rounded-xl border ${accent ? "border-red-200 bg-red-50" : "border-gray-100 bg-gray-50"}`}>
    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{label}</span>
    <span className={`text-sm sm:text-base font-black ${accent ? "text-red-700" : "text-gray-800"}`}>{value}</span>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ─── COLLAPSIBLE SECTION
// ═══════════════════════════════════════════════════════════════════════════════
const Collapsible = ({ title, icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors ${open ? "bg-red-50 border-b border-red-100" : "bg-gray-50 hover:bg-gray-100"}`}
      >
        <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
          <span>{icon}</span>{title}
        </span>
        <ChevDown open={open} />
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function GoldServices() {
  const { lang } = useContext(LanguageContext);
  const content = getContent(lang);
  const [activeTab, setActiveTab] = useState("gold_loan");
  const [expanded, setExpanded] = useState(false);
  const tabsRef = useRef(null);
  const activeTabRef = useRef(null);

  const service = content.services[activeTab];

  // scroll active tab into view
  useEffect(() => {
    setExpanded(false);
    if (activeTabRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const el = activeTabRef.current;
      const elLeft = el.offsetLeft;
      const elWidth = el.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({ left: elLeft - containerWidth / 2 + elWidth / 2, behavior: "smooth" });
    }
  }, [activeTab]);

  if (!service) return null;

  return (
    <section className="w-full bg-white py-10 sm:py-14">
      {/* ── Section Header ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-[11px] font-bold tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {content.rbi_approved}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              {content.services_title}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1.5 font-medium">{content.services_subtitle}</p>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        <div
          ref={tabsRef}
          className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SERVICE_TABS.map((tab) => {
            const svc = content.services[tab.id];
            if (!svc) return null;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border-2 text-center transition-all duration-200 min-w-[100px] max-w-[120px] ${
                  isActive
                    ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-100 scale-[1.03]"
                    : "border-gray-100 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-[11px] font-bold leading-tight">{svc.title}</span>
                {content.services[tab.id]?.popular && !isActive && (
                  <span className="text-[9px] font-bold bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full leading-none">
                    {content.highlight_badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content Panel ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 mt-6">
        <div className="bg-white border-2 border-gray-100 rounded-3xl overflow-hidden shadow-sm">

          {/* Panel Header */}
          <div className="bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-red-950 px-6 sm:px-8 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {service.popular && (
                    <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-yellow-900 text-[10px] font-black tracking-wide uppercase">
                      ⭐ {content.highlight_badge}
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-bold tracking-wide uppercase border border-white/10">
                    {content.rbi_approved}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">{service.title}</h3>
                <p className="text-white/60 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">{service.tagline}</p>
              </div>
              <a
                href="/contact"
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all active:scale-95 shadow-lg shadow-red-900/30 whitespace-nowrap"
              >
                {content.apply_now} <ArrowRight />
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6">
              <StatCard label={content.interest_from} value={`${service.stats.interest} ${service.stats.interest.includes("%") ? content.per_annum : ""}`} accent />
              <StatCard label={content.loan_amount} value={service.stats.amount} />
              <StatCard label={content.tenure} value={service.stats.tenure} />
              <StatCard label={content.processing_fee} value={service.stats.fee} />
            </div>
          </div>

          {/* Panel Body */}
          <div className="px-6 sm:px-8 py-6 space-y-5">

            {/* Overview */}
            <div>
              <h4 className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-3">{content.overview}</h4>
              <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed">{service.overview}</p>
              {service.overview_extra && (
                <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-[300px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                  <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">{service.overview_extra}</p>
                </div>
              )}
              {service.overview_extra && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-bold transition-colors"
                >
                  {expanded ? content.show_less : content.read_more}
                  <ChevDown open={expanded} />
                </button>
              )}
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-3">
              <Collapsible title={content.key_benefits} icon="✅" defaultOpen={true}>
                <ul className="space-y-2">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckIcon /><span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Collapsible>

              <Collapsible title={content.eligibility} icon="👤">
                <ul className="space-y-2">
                  {service.eligibility_points.map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <ArrowRight /><span>{e}</span>
                    </li>
                  ))}
                </ul>
              </Collapsible>

              <Collapsible title={content.documents} icon="📄">
                <ul className="space-y-2">
                  {service.documents.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <DocIcon /><span>{d}</span>
                    </li>
                  ))}
                </ul>
              </Collapsible>
            </div>

            {/* CTA Footer */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
              <a
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all active:scale-95 shadow-md shadow-red-100"
              >
                {content.apply_now} <ArrowRight />
              </a>
        <Link
  to={`/services/${activeTab.replace(/_/g, "-")}`}
  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700 text-gray-700 text-sm font-bold transition-all"
>
  {content.learn_more} <ArrowRight />
</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}