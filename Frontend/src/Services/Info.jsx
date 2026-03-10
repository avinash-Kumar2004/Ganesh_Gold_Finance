import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../Common/Navbaar"; // Adjust import path as needed

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
const GOLD_LOAN_TRANSLATIONS = {
  en: {
    // Info Tabs
    gold_loan_info: "Gold Loan Info",
    invest_in_gold: "Invest in Gold Loan",
    what_is_gold_loan: "What is a Gold Loan?",
    why_invest: "Why Invest Through Gold Loans?",
   
    // Info paragraphs
    gold_loan_para1: "A gold loan is a secured financing option that allows you to obtain funds against your gold ornaments without selling them. In India, the concept of borrowing money by pledging gold is centuries old — but today the process is fully digital, regulated by the Reserve Bank of India, and completed within hours.",
    gold_loan_para2: "You pledge your gold jewellery (18–22 karat) with a licensed NBFC like Shree Ganesh Finance. The loan amount is determined by the current gold rate and the Loan-to-Value (LTV) ratio capped at 75% by the RBI. Interest is charged only for the period you use the funds.",
    gold_loan_para3: "Once the full loan amount and interest is repaid, your gold ornaments are returned immediately. Unlike personal loans, gold loans carry no restriction on end-use — you can deploy the funds for business, medical needs, education, or any personal requirement.",
   
    invest_para1: "Gold-backed lending is one of the most resilient financial products in India. As an investor or borrower, the intrinsic value of gold as collateral provides unmatched security for both parties. The RBI's strict LTV guidelines ensure that the loan never exceeds 75% of the gold's market value.",
    invest_para2: "For investors, gold loan NBFCs offer attractive fixed-income instruments (NCDs, FDs) backed by a gold-secured loan book — one of the lowest NPA asset classes in Indian finance. The predictable cash flows and collateral quality make this a preferred choice for conservative investors.",
    invest_para3: "Shree Ganesh Finance's gold loan portfolio maintains a sub-1% NPA ratio, offering investors and borrowers alike a safe, transparent, and high-return financial relationship built on centuries of trust.",
   
    // Stats
    interest_rate: "Interest Rate",
    per_annum: "per annum",
    ltv_ratio: "LTV Ratio",
    rbi_mandated: "RBI mandated",
    disbursement: "Disbursement",
    same_day: "Same Day",
    post_valuation: "post valuation",
    min_amount: "Min Amount",
    no_max_limit: "no max limit",
   
    // Features section
    features_title: "Features of Gold Loan",
    features_subtitle: "Every individual has certain phases in life where financial aid becomes essential — from educational expenses to business expansion. Pledging gold is the fastest, simplest way to arrange funds when you need them most.",
    features_desc: "Here are the key features offered by a gold loan:",
   
    // Feature items
    lower_interest: "Lower Interest Rates",
    lower_interest_desc: "Competitive rates starting from 9.99% p.a. — secured nature keeps costs low.",
    simplified_app: "Simplified Application",
    simplified_app_desc: "Minimal paperwork. KYC + gold valuation is all you need to get started.",
    flexible_eligibility: "Flexible Eligibility",
    flexible_eligibility_desc: "No income proof or CIBIL score required. Gold value decides your eligibility.",
    quick_disbursal: "Quick Loan Disbursal",
    quick_disbursal_desc: "Funds credited within hours of gold valuation. Same-day disbursement guaranteed.",
    no_restriction: "No Fund Usage Restriction",
    no_restriction_desc: "Use the loan amount for any purpose — business, medical, education, or travel.",
    safety: "Complete Ornament Safety",
    safety_desc: "Gold stored in RBI-compliant insured vaults with comprehensive all-risk coverage.",
    minimal_docs: "Minimal Documentation",
    minimal_docs_desc: "Just Aadhaar + PAN + photograph. No salary slips or bank statements needed.",
    easy_repayment: "Easy Repayment",
    easy_repayment_desc: "Choose EMI, bullet, or flexi repayment. Part-payment anytime without penalty.",
   
    // Calculator section
    calculator_title: "Calculator for Gold Loan",
    calculator_subtitle: "Calculate your gold loan eligibility and estimated EMI using our online calculator. Adjust the sliders to find the perfect loan plan for your needs.",
    shree_ganesh: "Shree Ganesh Finance",
    gold_loan_calc: "Gold Loan Calculator",
   
    // Calculator fields
    loan_amount: "Loan Amount",
    loan_tenure: "Loan Tenure",
    monthly_emi: "Monthly EMI",
    total_interest: "Total Interest",
    total_payable: "Total Payable",
    interest_rate_label: "Interest Rate",
    estimated_values: "These are estimated values. Please contact us or visit your nearest branch for exact details.",
    repayment_breakdown: "Repayment Breakdown",
    principal: "Principal",
    interest: "Interest",
   
    // Calculator footer
    apply_for_loan: "Apply For Gold Loan",
    apply_now: "APPLY NOW",
    check_status: "Check status of your Gold Loan",
    check_now: "CHECK NOW",
   
    // Refer section
    refer_friend: "Refer a Friend *",
    refer_title: "Refer a friend & get a chance to win exciting prizes",
    refer_desc: "Share Shree Ganesh Finance with your friends and family. When they avail a gold loan, both of you benefit.",
    refer_now: "REFER NOW",
    tc_apply: "*T&C apply",
   
    // Expert section
    ask_expert: "Ask an Expert",
    expert_title: "Speak with our financial advisors",
    north_east_west: "North, East & West India (Toll-Free)",
    south_india: "South India Call Centre",
    write_to_us: "Write to Us",
    branch_timings: "Branch Timings",
    mon_sat: "Mon–Sat",
    timing: "9:30 AM – 6 PM",
   
    // Scheme names
    standard: "Standard Gold Loan",
    flexi: "Gold Flexi Credit",
    home: "Gold Loan at Home",
    bullet: "Bullet Repayment",
   
    // Days/Months
    day: "Day",
    days: "Days",
    month: "month",
    months: "months",
    for_: "for",
  },

  hi: {
    gold_loan_info: "गोल्ड लोन जानकारी",
    invest_in_gold: "गोल्ड लोन में निवेश करें",
    what_is_gold_loan: "गोल्ड लोन क्या है?",
    why_invest: "गोल्ड लोन के माध्यम से निवेश क्यों करें?",

    gold_loan_para1: "गोल्ड लोन एक सुरक्षित वित्तीय विकल्प है जिससे आप अपने सोने के गहनों को बेचे बिना उन पर ऋण प्राप्त कर सकते हैं। भारत में सोने को गिरवी रखकर पैसे उधार लेने की परंपरा सदियों पुरानी है — लेकिन आज यह पूरी तरह डिजिटल है, भारतीय रिजर्व बैंक द्वारा नियंत्रित है और कुछ घंटों में पूरा हो जाता है।",
    gold_loan_para2: "आप अपने सोने के आभूषण (18-22 कैरेट) को लाइसेंस प्राप्त NBFC जैसे श्री गणेश फाइनेंस के पास गिरवी रखते हैं। ऋण राशि वर्तमान सोने की दर और RBI द्वारा 75% तक सीमित Loan-to-Value (LTV) अनुपात पर निर्भर करती है। ब्याज केवल उस अवधि के लिए लिया जाता है जब आप फंड का उपयोग करते हैं।",
    gold_loan_para3: "पूर्ण ऋण राशि और ब्याज चुकाने के बाद आपके सोने के गहने तुरंत वापस कर दिए जाते हैं। पर्सनल लोन के विपरीत, गोल्ड लोन में उपयोग की कोई पाबंदी नहीं है — आप फंड का उपयोग व्यवसाय, चिकित्सा, शिक्षा या किसी भी व्यक्तिगत जरूरत के लिए कर सकते हैं।",

    invest_para1: "गोल्ड बैक्ड लेंडिंग भारत में सबसे मजबूत वित्तीय उत्पादों में से एक है। निवेशक या उधारकर्ता के रूप में, सोने की अंतर्निहित मूल्य सुरक्षा दोनों पक्षों को बेजोड़ सुरक्षा प्रदान करती है। RBI के सख्त LTV दिशानिर्देश सुनिश्चित करते हैं कि ऋण सोने के बाजार मूल्य का 75% कभी ना पार करे।",
    invest_para2: "निवेशकों के लिए, गोल्ड लोन NBFC आकर्षक फिक्स्ड-इनकम इंस्ट्रूमेंट्स (NCDs, FDs) प्रदान करते हैं जो गोल्ड-सिक्योर्ड लोन बुक पर आधारित हैं — भारतीय वित्त में सबसे कम NPA वाली एसेट क्लास में से एक। पूर्वानुमानित कैश फ्लो और कोलेटरल क्वालिटी इसे रूढ़िवादी निवेशकों की पसंदीदा पसंद बनाती है।",
    invest_para3: "श्री गणेश फाइनेंस का गोल्ड लोन पोर्टफोलियो 1% से कम NPA अनुपात बनाए रखता है, जो निवेशकों और उधारकर्ताओं दोनों के लिए सदियों के विश्वास पर आधारित सुरक्षित, पारदर्शी और उच्च-रिटर्न वाली वित्तीय साझेदारी प्रदान करता है।",

    interest_rate: "ब्याज दर",
    per_annum: "प्रति वर्ष",
    ltv_ratio: "LTV अनुपात",
    rbi_mandated: "RBI द्वारा अनिवार्य",
    disbursement: "वितरण",
    same_day: "उसी दिन",
    post_valuation: "मूल्यांकन के बाद",
    min_amount: "न्यूनतम राशि",
    no_max_limit: "कोई अधिकतम सीमा नहीं",

    features_title: "गोल्ड लोन की विशेषताएं",
    features_subtitle: "हर व्यक्ति के जीवन में कुछ ऐसी स्थिति आती है जब वित्तीय सहायता जरूरी हो जाती है — शिक्षा खर्च से लेकर व्यवसाय विस्तार तक। सोना गिरवी रखना सबसे तेज और सरल तरीका है जब आपको फंड की सबसे ज्यादा जरूरत हो।",
    features_desc: "गोल्ड लोन द्वारा दी जाने वाली प्रमुख विशेषताएं इस प्रकार हैं:",

    lower_interest: "कम ब्याज दरें",
    lower_interest_desc: "9.99% p.a. से शुरू होने वाली प्रतिस्पर्धी दरें — सुरक्षित प्रकृति लागत को कम रखती है।",
    simplified_app: "सरल आवेदन प्रक्रिया",
    simplified_app_desc: "न्यूनतम कागजी कार्रवाई। KYC + सोने का मूल्यांकन ही शुरू करने के लिए काफी है।",
    flexible_eligibility: "लचीली पात्रता",
    flexible_eligibility_desc: "आय प्रमाण या CIBIL स्कोर की जरूरत नहीं। सोने का मूल्य ही आपकी पात्रता तय करता है।",
    quick_disbursal: "त्वरित ऋण वितरण",
    quick_disbursal_desc: "सोने के मूल्यांकन के कुछ घंटों में फंड क्रेडिट। उसी दिन वितरण की गारंटी।",
    no_restriction: "कोई फंड उपयोग प्रतिबंध नहीं",
    no_restriction_desc: "ऋण राशि का उपयोग किसी भी उद्देश्य के लिए करें — व्यवसाय, चिकित्सा, शिक्षा या यात्रा।",
    safety: "पूर्ण आभूषण सुरक्षा",
    safety_desc: "RBI-अनुपालन वाले बीमित वॉल्ट में सोना संग्रहित, पूर्ण जोखिम कवरेज के साथ।",
    minimal_docs: "न्यूनतम दस्तावेज",
    minimal_docs_desc: "केवल आधार + पैन + फोटो। सैलरी स्लिप या बैंक स्टेटमेंट की जरूरत नहीं।",
    easy_repayment: "आसान चुकौती",
    easy_repayment_desc: "EMI, बुलेट या फ्लेक्सी चुकौती चुनें। बिना पेनाल्टी के कभी भी आंशिक भुगतान।",

    calculator_title: "गोल्ड लोन कैलकुलेटर",
    calculator_subtitle: "हमारे ऑनलाइन कैलकुलेटर से अपनी गोल्ड लोन पात्रता और अनुमानित EMI जानें। स्लाइडर समायोजित करके अपनी जरूरत के अनुसार प्लान चुनें।",
    shree_ganesh: "श्री गणेश फाइनेंस",
    gold_loan_calc: "गोल्ड लोन कैलकुलेटर",

    loan_amount: "ऋण राशि",
    loan_tenure: "ऋण अवधि",
    monthly_emi: "मासिक EMI",
    total_interest: "कुल ब्याज",
    total_payable: "कुल देय राशि",
    interest_rate_label: "ब्याज दर",
    estimated_values: "ये अनुमानित मूल्य हैं। सटीक जानकारी के लिए हमसे संपर्क करें या निकटतम ब्रांच विजिट करें।",
    repayment_breakdown: "चुकौती विवरण",
    principal: "मूलधन",
    interest: "ब्याज",

    apply_for_loan: "गोल्ड लोन के लिए आवेदन करें",
    apply_now: "अभी आवेदन करें",
    check_status: "अपने गोल्ड लोन की स्थिति जांचें",
    check_now: "अभी जांचें",

    refer_friend: "मित्र को रेफर करें *",
    refer_title: "मित्र को रेफर करें और रोमांचक पुरस्कार जीतने का मौका पाएं",
    refer_desc: "श्री गणेश फाइनेंस को अपने दोस्तों और परिवार के साथ शेयर करें। जब वे गोल्ड लोन लेंगे तो दोनों को फायदा होगा।",
    refer_now: "अभी रेफर करें",
    tc_apply: "*T&C लागू",

    ask_expert: "एक्सपर्ट से पूछें",
    expert_title: "हमारे वित्तीय सलाहकारों से बात करें",
    north_east_west: "उत्तर, पूर्व एवं पश्चिम भारत (टोल-फ्री)",
    south_india: "दक्षिण भारत कॉल सेंटर",
    write_to_us: "हमें लिखें",
    branch_timings: "ब्रांच समय",
    mon_sat: "सोम-शनि",
    timing: "9:30 AM – 6 PM",

    standard: "मानक गोल्ड लोन",
    flexi: "गोल्ड फ्लेक्सी क्रेडिट",
    home: "घर पर गोल्ड लोन",
    bullet: "बुलेट चुकौती",

    day: "दिन",
    days: "दिन",
    month: "महीना",
    months: "महीने",
    for_: "के लिए",
  },

  mr: {
    gold_loan_info: "गोल्ड लोन माहिती",
    invest_in_gold: "गोल्ड लोनमध्ये गुंतवणूक करा",
    what_is_gold_loan: "गोल्ड लोन म्हणजे काय?",
    why_invest: "गोल्ड लोनद्वारे गुंतवणूक का करावी?",

    gold_loan_para1: "गोल्ड लोन हे सुरक्षित वित्तीय पर्याय आहे ज्याद्वारे तुम्ही तुमचे सोन्याचे दागिने विकल्याशिवाय त्यावर कर्ज मिळवू शकता. भारतात सोने गहाण ठेवून पैसे उधार घेण्याची परंपरा शतकानुशतके जुनी आहे — पण आज ही प्रक्रिया पूर्णपणे डिजिटल, रिझर्व बँक ऑफ इंडियाद्वारे नियंत्रित आणि काही तासांत पूर्ण होते.",
    gold_loan_para2: "तुम्ही तुमचे सोन्याचे दागिने (18-22 कॅरेट) लायसन्स प्राप्त NBFC जसे श्री गणेश फायनान्सकडे गहाण ठेवता. कर्ज रक्कम सद्य सोन्याच्या दरावर आणि RBI द्वारे 75% पर्यंत मर्यादित Loan-to-Value (LTV) प्रमाणावर अवलंबून असते. व्याज फक्त तुम्ही निधी वापरत असलेल्या कालावधीसाठी आकारले जाते.",
    gold_loan_para3: "पूर्ण कर्ज रक्कम आणि व्याज परत केल्यानंतर तुमचे सोन्याचे दागिने तात्काळ परत केले जातात. वैयक्तिक कर्जाच्या विपरीत, गोल्ड लोनमध्ये वापराची कोणतीही बंधने नाहीत — तुम्ही निधीचा वापर व्यवसाय, वैद्यकीय, शिक्षण किंवा कोणत्याही वैयक्तिक गरजेसाठी करू शकता.",

    invest_para1: "गोल्ड बॅक्ड लेंडिंग भारतातील सर्वात मजबूत वित्तीय उत्पादांपैकी एक आहे. गुंतवणूकदार किंवा कर्जदार म्हणून, सोन्याची अंतर्निहित मूल्य सुरक्षा दोन्ही पक्षांना अतुलनीय सुरक्षा देते. RBI च्या कडक LTV मार्गदर्शक तत्त्वांमुळे कर्ज कधीही सोन्याच्या बाजार मूल्याच्या 75% पेक्षा जास्त होत नाही.",
    invest_para2: "गुंतवणूकदारांसाठी, गोल्ड लोन NBFC आकर्षक निश्चित-उत्पन्न साधने (NCDs, FDs) देतात जी गोल्ड-सुरक्षित कर्ज पुस्तकावर आधारित आहेत — भारतीय वित्तात सर्वात कमी NPA असलेली मालमत्ता वर्ग. अंदाजे रोख प्रवाह आणि गहाण गुणवत्ता यामुळे हे रूढीवादी गुंतवणूकदारांसाठी प्राधान्य आहे.",
    invest_para3: "श्री गणेश फायनान्सचा गोल्ड लोन पोर्टफोलिओ 1% पेक्षा कमी NPA प्रमाण राखतो, ज्यामुळे गुंतवणूकदार आणि कर्जदार दोघांनाही शतकानुशतकांच्या विश्वासावर आधारित सुरक्षित, पारदर्शक आणि उच्च-परतावा असलेला वित्तीय संबंध मिळतो.",

    interest_rate: "व्याज दर",
    per_annum: "प्रति वर्ष",
    ltv_ratio: "LTV प्रमाण",
    rbi_mandated: "RBI द्वारा अनिवार्य",
    disbursement: "वितरण",
    same_day: "त्या दिवशी",
    post_valuation: "मूल्यांकनानंतर",
    min_amount: "किमान रक्कम",
    no_max_limit: "कोणतीही कमाल मर्यादा नाही",

    features_title: "गोल्ड लोन वैशिष्ट्ये",
    features_subtitle: "प्रत्येक व्यक्तीच्या जीवनात काही अशा टप्पे येतात जेव्हा आर्थिक मदत आवश्यक होते — शिक्षण खर्चापासून व्यवसाय विस्तारापर्यंत. सोने गहाण ठेवणे ही सर्वात जलद आणि सोपी पद्धत आहे जेव्हा तुम्हाला निधीची सर्वात जास्त गरज असते.",
    features_desc: "गोल्ड लोनद्वारे दिली जाणारी प्रमुख वैशिष्ट्ये खालीलप्रमाणे आहेत:",

    lower_interest: "कमी व्याज दर",
    lower_interest_desc: "9.99% p.a. पासून सुरू होणारे स्पर्धात्मक दर — सुरक्षित स्वभावामुळे खर्च कमी राहतो.",
    simplified_app: "सुलभीकरण केलेले अर्ज",
    simplified_app_desc: "किमान कागदपत्रे. KYC + सोन्याचे मूल्यांकन एवढेच सुरू करण्यासाठी पुरेसे आहे.",
    flexible_eligibility: "लवचिक पात्रता",
    flexible_eligibility_desc: "उत्पन्नाचा पुरावा किंवा CIBIL स्कोअर आवश्यक नाही. सोन्याचे मूल्य तुमची पात्रता ठरवते.",
    quick_disbursal: "त्वरित कर्ज वितरण",
    quick_disbursal_desc: "सोन्याच्या मूल्यांकनानंतर काही तासांत निधी क्रेडिट. त्याच दिवशी वितरणाची हमी.",
    no_restriction: "निधी वापरावर कोणतेही निर्बंध नाही",
    no_restriction_desc: "कर्ज रक्कम कोणत्याही हेतूसाठी वापरा — व्यवसाय, वैद्यकीय, शिक्षण किंवा प्रवास.",
    safety: "पूर्ण दागिने सुरक्षा",
    safety_desc: "RBI-अनुपालन असलेल्या विमाकृत व्हॉल्टमध्ये सोने साठवले जाते, पूर्ण जोखीम कव्हरेजसह.",
    minimal_docs: "किमान कागदपत्रे",
    minimal_docs_desc: "फक्त आधार + पॅन + फोटो. पगार स्लिप किंवा बँक स्टेटमेंटची गरज नाही.",
    easy_repayment: "सुलभ परतफेड",
    easy_repayment_desc: "EMI, बुलेट किंवा फ्लेक्सी परतफेड निवडा. कोणत्याही वेळी दंडाशिवाय आंशिक पेमेंट.",

    calculator_title: "गोल्ड लोन कॅल्क्युलेटर",
    calculator_subtitle: "आमच्या ऑनलाइन कॅल्क्युलेटरने तुमची गोल्ड लोन पात्रता आणि अंदाजे EMI काढा. स्लाइडर समायोजित करून तुमच्या गरजेनुसार परिपूर्ण योजना शोधा.",
    shree_ganesh: "श्री गणेश फायनान्स",
    gold_loan_calc: "गोल्ड लोन कॅल्क्युलेटर",

    loan_amount: "कर्ज रक्कम",
    loan_tenure: "कर्ज कालावधी",
    monthly_emi: "मासिक EMI",
    total_interest: "एकूण व्याज",
    total_payable: "एकूण देय रक्कम",
    interest_rate_label: "व्याज दर",
    estimated_values: "हे अंदाजे मूल्य आहेत. अचूक तपशीलांसाठी आमच्याशी संपर्क साधा किंवा जवळच्या शाखेत भेट द्या.",
    repayment_breakdown: "परतफेड ब्रेकडाउन",
    principal: "मूलधन",
    interest: "व्याज",

    apply_for_loan: "गोल्ड लोनसाठी अर्ज करा",
    apply_now: "आता अर्ज करा",
    check_status: "तुमच्या गोल्ड लोनची स्थिती तपासा",
    check_now: "आता तपासा",

    refer_friend: "मित्राला रेफर करा *",
    refer_title: "मित्राला रेफर करा आणि रोमांचक बक्षिसे जिंकण्याची संधी मिळवा",
    refer_desc: "श्री गणेश फायनान्स तुमच्या मित्र-परिवारासोबत शेअर करा. ते गोल्ड लोन घेतल्यास दोघांनाही फायदा होईल.",
    refer_now: "आता रेफर करा",
    tc_apply: "*T&C लागू",

    ask_expert: "तज्ज्ञाला विचारा",
    expert_title: "आमच्या वित्तीय सल्लागारांशी बोल",
    north_east_west: "उत्तर, पूर्व आणि पश्चिम भारत (टोल-फ्री)",
    south_india: "दक्षिण भारत कॉल सेंटर",
    write_to_us: "आम्हाला लिहा",
    branch_timings: "शाखा वेळ",
    mon_sat: "सोम-शनि",
    timing: "9:30 AM – 6 PM",

    standard: "मानक गोल्ड लोन",
    flexi: "गोल्ड फ्लेक्सी क्रेडिट",
    home: "घरात गोल्ड लोन",
    bullet: "बुलेट परतफेड",

    day: "दिवस",
    days: "दिवस",
    month: "महिना",
    months: "महिने",
    for_: "साठी",
  },

  gu: {
    gold_loan_info: "ગોલ્ડ લોન માહિતી",
    invest_in_gold: "ગોલ્ડ લોનમાં રોકાણ કરો",
    what_is_gold_loan: "ગોલ્ડ લોન શું છે?",
    why_invest: "ગોલ્ડ લોન દ્વારા રોકાણ કેમ કરવું?",

    gold_loan_para1: "ગોલ્ડ લોન એક સુરક્ષિત નાણાકીય વિકલ્પ છે જેનાથી તમે તમારા સોનાના આભૂષણો વેચ્યા વિના તેના પર લોન મેળવી શકો છો. ભારતમાં સોનું ગીરવે મૂકીને પૈસા ઉછીના લેવાની પરંપરા સદીઓ જૂની છે — પરંતુ આજે આ પ્રક્રિયા સંપૂર્ણ ડિજિટલ, રિઝર્વ બેંક ઓફ ઈન્ડિયા દ્વારા નિયંત્રિત અને કલાકોમાં પૂર્ણ થાય છે.",
    gold_loan_para2: "તમે તમારા સોનાના આભૂષણો (18-22 કેરેટ) લાયસન્સ પ્રાપ્ત NBFC જેમ કે શ્રી ગણેશ ફાઈનાન્સને ગીરવે મૂકો છો. લોનની રકમ વર્તમાન સોનાના ભાવ અને RBI દ્વારા 75% સુધી મર્યાદિત Loan-to-Value (LTV) રેશિયો પર આધારિત છે. વ્યાજ માત્ર તમે ફંડનો ઉપયોગ કરો તે સમયગાળા માટે જ લેવામાં આવે છે.",
    gold_loan_para3: "સંપૂર્ણ લોન રકમ અને વ્યાજ ચૂકવ્યા પછી તમારા સોનાના આભૂષણો તરત જ પરત કરવામાં આવે છે. વ્યક્તિગત લોનથી વિપરીત, ગોલ્ડ લોનમાં ઉપયોગની કોઈ પ્રતિબંધ નથી — તમે ફંડનો ઉપયોગ વ્યવસાય, તબીબી, શિક્ષણ અથવા કોઈપણ વ્યક્તિગત જરૂરિયાત માટે કરી શકો છો.",

    invest_para1: "ગોલ્ડ બેક્ડ લેન્ડિંગ ભારતમાં સૌથી મજબૂત નાણાકીય ઉત્પાદનોમાંનું એક છે. રોકાણકાર અથવા ઉછીના લેનાર તરીકે, સોનાની આંતરિક કિંમત કોલેટરલ તરીકે બંને પક્ષોને અજોડ સુરક્ષા આપે છે. RBIના સખત LTV માર્ગદર્શિકા સુનિશ્ચિત કરે છે કે લોન ક્યારેય સોનાની માર્કેટ વેલ્યુના 75% થી વધુ ન થાય.",
    invest_para2: "રોકાણકારો માટે, ગોલ્ડ લોન NBFC આકર્ષક ફિક્સ્ડ-ઇન્કમ સાધનો (NCDs, FDs) આપે છે જે ગોલ્ડ-સિક્યોર્ડ લોન બુક પર આધારિત છે — ભારતીય નાણામાં સૌથી ઓછા NPA વાળી એસેટ ક્લાસ. અનુમાનિત કેશ ફ્લો અને કોલેટરલ ક્વોલિટી તેને રૂઢિચુસ્ત રોકાણકારો માટે પ્રિય પસંદગી બનાવે છે.",
    invest_para3: "શ્રી ગણેશ ફાઈનાન્સનું ગોલ્ડ લોન પોર્ટફોલિયો 1% થી ઓછું NPA રેશિયો જાળવી રાખે છે, જે રોકાણકારો અને ઉછીના લેનારાઓ બંનેને સદીઓના વિશ્વાસ પર આધારિત સુરક્ષિત, પારદર્શક અને ઉચ્ચ-રિટર્નવાળા નાણાકીય સંબંધ આપે છે.",

    interest_rate: "વ્યાજ દર",
    per_annum: "પ્રતિ વર્ષ",
    ltv_ratio: "LTV રેશિયો",
    rbi_mandated: "RBI દ્વારા અનિવાર્ય",
    disbursement: "વિતરણ",
    same_day: "તે જ દિવસે",
    post_valuation: "મૂલ્યાંકન પછી",
    min_amount: "ન્યૂનતમ રકમ",
    no_max_limit: "કોઈ મહત્તમ મર્યાદા નથી",

    features_title: "ગોલ્ડ લોનની વિશેષતાઓ",
    features_subtitle: "દરેક વ્યક્તિના જીવનમાં કેટલાક તબક્કા આવે છે જ્યારે નાણાકીય સહાય જરૂરી બને છે — શિક્ષણ ખર્ચથી લઈને વ્યવસાય વિસ્તાર સુધી. સોનું ગીરવે મૂકવું એ સૌથી ઝડપી અને સરળ રીત છે જ્યારે તમને ફંડની સૌથી વધુ જરૂર હોય.",
    features_desc: "ગોલ્ડ લોન દ્વારા આપવામાં આવતી મુખ્ય વિશેષતાઓ આ છે:",

    lower_interest: "ઓછા વ્યાજ દર",
    lower_interest_desc: "9.99% p.a. થી શરૂ થતા સ્પર્ધાત્મક દર — સુરક્ષિત સ્વભાવને કારણે ખર્ચ ઓછો રહે છે.",
    simplified_app: "સરળ અરજી પ્રક્રિયા",
    simplified_app_desc: "ન્યૂનતમ કાગળી કાર્યવાહી. KYC + સોનાનું મૂલ્યાંકન જ પૂરતું છે.",
    flexible_eligibility: "લવચીક પાત્રતા",
    flexible_eligibility_desc: "આવકનો પુરાવો કે CIBIL સ્કોર જરૂરી નથી. સોનાનું મૂલ્ય તમારી પાત્રતા નક્કી કરે છે.",
    quick_disbursal: "ઝડપી લોન વિતરણ",
    quick_disbursal_desc: "સોનાના મૂલ્યાંકન પછી કલાકોમાં ફંડ ક્રેડિટ. તે જ દિવસે વિતરણની ખાતરી.",
    no_restriction: "ફંડ ઉપયોગ પર કોઈ પ્રતિબંધ નથી",
    no_restriction_desc: "લોન રકમ કોઈપણ હેતુ માટે વાપરો — વ્યવસાય, તબીબી, શિક્ષણ કે પ્રવાસ.",
    safety: "સંપૂર્ણ આભૂષણ સુરક્ષા",
    safety_desc: "RBI-अનુસારી વીમાવાળા વોલ્ટમાં સોનું સંગ્રહિત, પૂર્ણ જોખમ કવરેજ સાથે.",
    minimal_docs: "ન્યૂનતમ દસ્તાવેજ",
    minimal_docs_desc: "માત્ર આધાર + પાન + ફોટો. પગાર સ્લિપ કે બેંક સ્ટેટમેન્ટની જરૂર નથી.",
    easy_repayment: "સરળ પરત કરવું",
    easy_repayment_desc: "EMI, બુલેટ કે ફ્લેક્સી પરત કરવાની પસંદગી. કોઈપણ સમયે દંડ વિના આંશિક ચુકવણી.",

    calculator_title: "ગોલ્ડ લોન કેલ્ક્યુલેટર",
    calculator_subtitle: "અમારા ઓનલાઈન કેલ્ક્યુલેટરથી તમારી ગોલ્ડ લોન પાત્રતા અને અંદાજિત EMI જાણો. સ્લાઈડર સમાયોજિત કરીને તમારી જરૂરિયાત મુજબનો પ્લાન શોધો.",
    shree_ganesh: "શ્રી ગણેશ ફાઈનાન્સ",
    gold_loan_calc: "ગોલ્ડ લોન કેલ્ક્યુલેટર",

    loan_amount: "લોન રકમ",
    loan_tenure: "લોન અવધિ",
    monthly_emi: "માસિક EMI",
    total_interest: "કુલ વ્યાજ",
    total_payable: "કુલ ચુકવવાની રકમ",
    interest_rate_label: "વ્યાજ દર",
    estimated_values: "આ અંદાજિત મૂલ્યો છે. ચોક્કસ વિગતો માટે અમારો સંપર્ક કરો અથવા નજીકની બ્રાન્ચમાં મુલાકાત લો.",
    repayment_breakdown: "પરત કરવાનું બ્રેકડાઉન",
    principal: "મૂળ રકમ",
    interest: "વ્યાજ",

    apply_for_loan: "ગોલ્ડ લોન માટે અરજી કરો",
    apply_now: "હવે અરજી કરો",
    check_status: "તમારી ગોલ્ડ લોનની સ્થિતિ તપાસો",
    check_now: "હવે તપાસો",

    refer_friend: "મિત્રને રેફર કરો *",
    refer_title: "મિત્રને રેફર કરો અને ઉત્તેજક ઇનામો જીતવાની તક મેળવો",
    refer_desc: "શ્રી ગણેશ ફાઈનાન્સ તમારા મિત્રો અને પરિવાર સાથે શેર કરો. જ્યારે તેઓ ગોલ્ડ લોન લેશે ત્યારે બંનેને ફાયદો થશે.",
    refer_now: "હવે રેફર કરો",
    tc_apply: "*T&C લાગુ",

    ask_expert: "નિષ્ણાતને પૂછો",
    expert_title: "અમારા નાણાકીય સલાહકારો સાથે વાત કરો",
    north_east_west: "ઉત્તર, પૂર્વ અને પશ્ચિમ ભારત (ટોલ-ફ્રી)",
    south_india: "દક્ષિણ ભારત કોલ સેન્ટર",
    write_to_us: "અમને લખો",
    branch_timings: "બ્રાન્ચ સમય",
    mon_sat: "સોમ-શનિ",
    timing: "9:30 AM – 6 PM",

    standard: "સ્ટાન્ડર્ડ ગોલ્ડ લોન",
    flexi: "ગોલ્ડ ફ્લેક્સી ક્રેડિટ",
    home: "ઘરે ગોલ્ડ લોન",
    bullet: "બુલેટ ચુકવણી",

    day: "દિવસ",
    days: "દિવસ",
    month: "મહિનો",
    months: "મહિના",
    for_: "માટે",
  },

  ur: {
    gold_loan_info: "گولڈ لون کی معلومات",
    invest_in_gold: "گولڈ لون میں سرمایہ کاری کریں",
    what_is_gold_loan: "گولڈ لون کیا ہے؟",
    why_invest: "گولڈ لون کے ذریعے سرمایہ کاری کیوں کریں؟",

    gold_loan_para1: "گولڈ لون ایک محفوظ مالیاتی آپشن ہے جس سے آپ اپنے سونے کے زیورات بیچے بغیر ان کے خلاف فنڈز حاصل کر سکتے ہیں۔ بھارت میں سونا گروی رکھ کر پیسے ادھار لینے کی روایت صدیوں پرانی ہے — لیکن آج یہ عمل مکمل طور پر ڈیجیٹل، ریزرو بینک آف انڈیا کے زیر انتظام اور چند گھنٹوں میں مکمل ہو جاتا ہے۔",
    gold_loan_para2: "آپ اپنے سونے کے زیورات (18-22 کیریٹ) کو لائسنس یافتہ NBFC جیسے شری گنش فنانس کے پاس گروی رکھتے ہیں۔ لون کی رقم موجودہ سونے کی قیمت اور RBI کی طرف سے 75% تک محدود Loan-to-Value (LTV) ریٹیو پر منحصر ہے۔ سود صرف اس مدت کے لیے لیا جاتا ہے جب آپ فنڈز استعمال کرتے ہیں۔",
    gold_loan_para3: "مکمل لون رقم اور سود ادا کرنے کے بعد آپ کے سونے کے زیورات فوراً واپس کر دیے جاتے ہیں۔ پرسنل لون کے برعکس، گولڈ لون میں استعمال کی کوئی پابندی نہیں — آپ فنڈز کو کاروبار، طبی ضروریات، تعلیم یا کسی بھی ذاتی ضرورت کے لیے استعمال کر سکتے ہیں۔",

    invest_para1: "گولڈ بیکڈ لینڈنگ بھارت میں سب سے زیادہ مستحکم مالیاتی پروڈکٹس میں سے ایک ہے۔ سرمایہ کار یا قرض لینے والے کے طور پر، سونے کی موروثی قدر بطور ضمانت دونوں فریقوں کو بے مثال تحفظ فراہم کرتی ہے۔ RBI کی سخت LTV ہدایات اس بات کو یقینی بناتی ہیں کہ لون کبھی بھی سونے کی مارکیٹ ویلیو کا 75% سے زیادہ نہ ہو۔",
    invest_para2: "سرمایہ کاروں کے لیے، گولڈ لون NBFC پرکشش فکسڈ انکم آلات (NCDs, FDs) پیش کرتے ہیں جو گولڈ سیکیورڈ لون بک پر مبنی ہیں — بھارتی فنانس میں سب سے کم NPA والا اثاثہ کلاس۔ متوقع کیش فلو اور کولیٹرل کوالٹی اسے قدامت پسند سرمایہ کاروں کی پسندیدہ پسند بناتی ہے۔",
    invest_para3: "شری گنش فنانس کا گولڈ لون پورٹ فولیو 1% سے کم NPA ریٹیو برقرار رکھتا ہے، جو سرمایہ کاروں اور قرض لینے والوں دونوں کو صدیوں کے اعتماد پر مبنی محفوظ، شفاف اور ہائی ریٹرن والا مالیاتی تعلق فراہم کرتا ہے۔",

    interest_rate: "سود کی شرح",
    per_annum: "فی سال",
    ltv_ratio: "LTV ریٹیو",
    rbi_mandated: "RBI کی طرف سے لازمی",
    disbursement: "ادائیگی",
    same_day: "اسی دن",
    post_valuation: "ویلیویشن کے بعد",
    min_amount: "کم از کم رقم",
    no_max_limit: "کوئی زیادہ سے زیادہ حد نہیں",

    features_title: "گولڈ لون کی خصوصیات",
    features_subtitle: "ہر فرد کی زندگی میں کچھ ایسے مراحل آتے ہیں جب مالی مدد ضروری ہو جاتی ہے — تعلیمی اخراجات سے لے کر کاروباری توسیع تک۔ سونا گروی رکھنا سب سے تیز اور آسان طریقہ ہے جب آپ کو فنڈز کی سب سے زیادہ ضرورت ہو۔",
    features_desc: "گولڈ لون کی طرف سے پیش کی جانے والی اہم خصوصیات یہ ہیں:",

    lower_interest: "کم سود کی شرحیں",
    lower_interest_desc: "9.99% p.a. سے شروع ہونے والی مقابلہ آمیز شرحیں — محفوظ نوعیت لاگت کم رکھتی ہے۔",
    simplified_app: "آسان درخواست کا عمل",
    simplified_app_desc: "کم سے کم کاغذی کارروائی۔ KYC + سونے کی ویلیویشن ہی شروع کرنے کے لیے کافی ہے۔",
    flexible_eligibility: "لچکدار اہلیت",
    flexible_eligibility_desc: "آمدنی کا ثبوت یا CIBIL سکور کی ضرورت نہیں۔ سونے کی قدر آپ کی اہلیت کا فیصلہ کرتی ہے۔",
    quick_disbursal: "تیز لون ادائیگی",
    quick_disbursal_desc: "سونے کی ویلیویشن کے چند گھنٹوں میں فنڈز کریڈٹ۔ اسی دن ادائیگی کی ضمانت۔",
    no_restriction: "فنڈز کے استعمال پر کوئی پابندی نہیں",
    no_restriction_desc: "لون رقم کو کسی بھی مقصد کے لیے استعمال کریں — کاروبار، طبی، تعلیم یا سفر۔",
    safety: "مکمل زیورات کی حفاظت",
    safety_desc: "RBI کے مطابق انشورڈ والٹ میں سونا محفوظ، مکمل رسک کوریج کے ساتھ۔",
    minimal_docs: "کم سے کم دستاویزات",
    minimal_docs_desc: "صرف آدھار + پین + فوٹو۔ تنخواہ کی سلپ یا بینک اسٹیٹمنٹ کی ضرورت نہیں۔",
    easy_repayment: "آسان واپسی",
    easy_repayment_desc: "EMI، بلیٹ یا فلیکسی واپسی کا انتخاب کریں۔ کسی بھی وقت بغیر جرمانے کے جزوی ادائیگی۔",

    calculator_title: "گولڈ لون کیلکولیٹر",
    calculator_subtitle: "ہمارے آن لائن کیلکولیٹر سے اپنی گولڈ لون اہلیت اور متوقع EMI معلوم کریں۔ سلائیڈر ایڈجسٹ کرکے اپنی ضروریات کے مطابق بہترین پلان تلاش کریں۔",
    shree_ganesh: "شری گنش فنانس",
    gold_loan_calc: "گولڈ لون کیلکولیٹر",

    loan_amount: "لون کی رقم",
    loan_tenure: "لون کی مدت",
    monthly_emi: "ماہانہ EMI",
    total_interest: "کل سود",
    total_payable: "کل ادائیگی",
    interest_rate_label: "سود کی شرح",
    estimated_values: "یہ متوقع اقدار ہیں۔ درست تفصیلات کے لیے ہم سے رابطہ کریں یا قریبی برانچ ملاحظہ کریں۔",
    repayment_breakdown: "واپسی کی تفصیل",
    principal: "اصل رقم",
    interest: "سود",

    apply_for_loan: "گولڈ لون کے لیے درخواست دیں",
    apply_now: "ابھی درخواست دیں",
    check_status: "اپنے گولڈ لون کی حیثیت چیک کریں",
    check_now: "ابھی چیک کریں",

    refer_friend: "دوست کو ریفر کریں *",
    refer_title: "دوست کو ریفر کریں اور دلچسپ انعامات جیتنے کا موقع حاصل کریں",
    refer_desc: "شری گنش فنانس کو اپنے دوستوں اور فیملی کے ساتھ شیئر کریں۔ جب وہ گولڈ لون لیں گے تو دونوں کو فائدہ ہوگا۔",
    refer_now: "ابھی ریفر کریں",
    tc_apply: "*T&C लागू",

    ask_expert: "ایکسپرٹ سے پوچھیں",
    expert_title: "ہمارے مالیاتی مشیروں سے بات کریں",
    north_east_west: "شمال، مشرق اور مغرب بھارت (ٹول فری)",
    south_india: "جنوبی بھارت کال سینٹر",
    write_to_us: "ہمیں لکھیں",
    branch_timings: "برانچ اوقات",
    mon_sat: "سوم-شنبه",
    timing: "9:30 AM – 6 PM",

    standard: "اسٹینڈرڈ گولڈ لون",
    flexi: "گولڈ فلیکس کریڈٹ",
    home: "گھر پر گولڈ لون",
    bullet: "بلیٹ واپسی",

    day: "دن",
    days: "دن",
    month: "مہینہ",
    months: "مہینے",
    for_: "کے لیے",
  },

  te: {
    gold_loan_info: "గోల్డ్ లోన్ సమాచారం",
    invest_in_gold: "గోల్డ్ లోన్‌లో పెట్టుబడి పెట్టండి",
    what_is_gold_loan: "గోల్డ్ లోన్ అంటే ఏమిటి?",
    why_invest: "గోల్డ్ లోన్ ద్వారా పెట్టుబడి ఎందుకు?",

    gold_loan_para1: "గోల్డ్ లోన్ అనేది సురక్షిత ఆర్థిక ఎంపిక, ఇది మీ స్వర్ణాభరణాలను అమ్మకుండానే వాటిపై నిధులు పొందేలా చేస్తుంది. భారతదేశంలో బంగారాన్ని తాకట్టు పెట్టి డబ్బు రుణం తీసుకోవడం శతాబ్దాల క్రితం నుంచి ఉంది — కానీ ఈరోజు ఈ ప్రక్రియ పూర్తిగా డిజిటల్, రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియా నియంత్రణలో మరియు కొన్ని గంటల్లో పూర్తవుతుంది.",
    gold_loan_para2: "మీరు మీ స్వర్ణాభరణాలు (18-22 క్యారెట్) లైసెన్స్ పొందిన NBFC వంటి శ్రీ గణేష్ ఫైనాన్స్‌కు తాకట్టు పెడతారు. రుణ మొత్తం ప్రస్తుత బంగారం ధర మరియు RBI చేత 75% వరకు పరిమితం చేయబడిన Loan-to-Value (LTV) నిష్పత్తిపై ఆధారపడి ఉంటుంది. వడ్డీ మీరు నిధులు ఉపయోగించిన కాలానికి మాత్రమే వసూలు చేయబడుతుంది.",
    gold_loan_para3: "పూర్తి రుణ మొత్తం మరియు వడ్డీ చెల్లించిన తర్వాత మీ స్వర్ణాభరణాలు వెంటనే తిరిగి ఇవ్వబడతాయి. వ్యక్తిగత రుణాలకు భిన్నంగా, గోల్డ్ లోన్‌లో ఉపయోగానికి ఎలాంటి నిర్బంధం లేదు — మీరు నిధులను వ్యాపారం, వైద్యం, విద్య లేదా ఏదైనా వ్యక్తిగత అవసరం కోసం ఉపయోగించవచ్చు.",

    invest_para1: "గోల్డ్ బ్యాక్డ్ లెండింగ్ భారతదేశంలో అత్యంత స్థిరమైన ఆర్థిక ఉత్పత్తులలో ఒకటి. పెట్టుబడిదారు లేదా రుణగ్రహీతగా, బంగారం యొక్క సహజ విలువ బ్యాక్‌గా రెండు పక్షాలకు అసమాన భద్రత ఇస్తుంది. RBI యొక్క కఠినమైన LTV మార్గదర్శకాలు రుణం ఎప్పుడూ బంగారం మార్కెట్ విలువలో 75% మించకుండా చూస్తాయి.",
    invest_para2: "పెట్టుబడిదారుల కోసం, గోల్డ్ లోన్ NBFCలు ఆకర్షణీయమైన ఫిక్స్‌డ్-ఇన్‌కమ్ సాధనాలు (NCDs, FDs) అందిస్తాయి — ఇవి గోల్డ్-సిక్యూర్డ్ లోన్ బుక్‌పై ఆధారపడి ఉంటాయి, ఇది భారతీయ ఆర్థిక వ్యవస్థలో అత్యల్ప NPA ఆస్తి తరగతులలో ఒకటి. అంచనా వేయగల నగదు ప్రవాహాలు మరియు కొలటరల్ నాణ్యత దీన్ని సంప్రదాయవాద పెట్టుబడిదారులకు ఇష్టమైన ఎంపిక చేస్తాయి.",
    invest_para3: "శ్రీ గణేష్ ఫైనాన్స్ యొక్క గోల్డ్ లోన్ పోర్ట్‌ఫోలియో 1% కంటే తక్కువ NPA నిష్పత్తిని నిర్వహిస్తుంది, ఇది పెట్టుబడిదారులు మరియు రుణగ్రహీతలకు శతాబ్దాల విశ్వాసంపై నిర్మితమైన సురక్షిత, పారదర్శక మరియు అధిక-రాబడి ఆర్థిక సంబంధాన్ని అందిస్తుంది.",

    interest_rate: "వడ్డీ రేటు",
    per_annum: "ప్రతి సంవత్సరం",
    ltv_ratio: "LTV నిష్పత్తి",
    rbi_mandated: "RBI నిర్దేశిత",
    disbursement: "వితరణ",
    same_day: "అదే రోజు",
    post_valuation: "వాల్యూయేషన్ తర్వాత",
    min_amount: "కనీస మొత్తం",
    no_max_limit: "గరిష్ట పరిమితి లేదు",

    features_title: "గోల్డ్ లోన్ లక్షణాలు",
    features_subtitle: "ప్రతి వ్యక్తి జీవితంలో కొన్ని దశలు వస్తాయి ఎప్పుడైతే ఆర్థిక సహాయం అవసరమవుతుందో — విద్యా ఖర్చుల నుంచి వ్యాపార విస్తరణ వరకు. బంగారం తాకట్టు పెట్టడం అత్యంత వేగవంతమైన, సులభమైన మార్గం మీకు నిధులు అవసరమైనప్పుడు.",
    features_desc: "గోల్డ్ లోన్ ద్వారా అందించబడే ముఖ్య లక్షణాలు ఇవి:",

    lower_interest: "తక్కువ వడ్డీ రేట్లు",
    lower_interest_desc: "9.99% p.a. నుంచి ప్రారంభమయ్యే పోటీ రేట్లు — సురక్షిత స్వభావం ఖర్చులను తక్కువగా ఉంచుతుంది.",
    simplified_app: "సరళమైన అప్లికేషన్",
    simplified_app_desc: "కనీస కాగితపు పనులు. KYC + బంగారం వాల్యూయేషన్ మాత్రమే ప్రారంభించడానికి సరిపోతుంది.",
    flexible_eligibility: "సౌకర్యవంతమైన అర్హత",
    flexible_eligibility_desc: "ఆదాయ రుజువు లేదా CIBIL స్కోర్ అవసరం లేదు. బంగారం విలువ మీ అర్హతను నిర్ణయిస్తుంది.",
    quick_disbursal: "త్వరిత లోన్ వితరణ",
    quick_disbursal_desc: "బంగారం వాల్యూయేషన్ తర్వాత కొన్ని గంటల్లో నిధులు క్రెడిట్. అదే రోజు వితరణకు హామీ.",
    no_restriction: "నిధుల ఉపయోగంపై ఎలాంటి నిర్బంధం లేదు",
    no_restriction_desc: "రుణ మొత్తాన్ని ఏ మొత్తంలోనైనా ఉపయోగించండి — వ్యాపారం, వైద్యం, విద్య లేదా ప్రయాణం.",
    safety: "పూర్తి ఆభరణాల భద్రత",
    safety_desc: "RBI అనుగుణమైన భీమా చేయబడిన వాల్ట్‌లలో బంగారం నిల్వ చేయబడుతుంది, పూర్తి రిస్క్ కవరేజ్‌తో.",
    minimal_docs: "కనీస డాక్యుమెంట్లు",
    minimal_docs_desc: "కేవలం ఆధార్ + పాన్ + ఫోటో. జీతం స్లిప్ లేదా బ్యాంక్ స్టేట్‌మెంట్ అవసరం లేదు.",
    easy_repayment: "సులభమైన చెల్లింపు",
    easy_repayment_desc: "EMI, బులెట్ లేదా ఫ్లెక్సి చెల్లింపు ఎంచుకోండి. ఎప్పుడైనా పెనాల్టీ లేకుండా భాగ భరణం.",

    calculator_title: "గోల్డ్ లోన్ కాలిక్యులేటర్",
    calculator_subtitle: "మా ఆన్‌లైన్ కాలిక్యులేటర్‌తో మీ గోల్డ్ లోన్ అర్హత మరియు అంచనా EMI లెక్కించండి. స్లైడర్‌లను సర్దుబాటు చేసి మీ అవసరాలకు సరైన ప్లాన్ కనుగొనండి.",
    shree_ganesh: "శ్రీ గణేష్ ఫైనాన్స్",
    gold_loan_calc: "గోల్డ్ లోన్ కాలిక్యులేటర్",

    loan_amount: "రుణ మొత్తం",
    loan_tenure: "రుణ కాలవ్యవధి",
    monthly_emi: "నెలవారీ EMI",
    total_interest: "మొత్తం వడ్డీ",
    total_payable: "మొత్తం చెల్లించాల్సినది",
    interest_rate_label: "వడ్డీ రేటు",
    estimated_values: "ఇవి అంచనా విలువలు. ఖచ్చితమైన వివరాల కోసం మమ్మల్ని సంప్రదించండి లేదా సమీప బ్రాంచ్‌ను సందర్శించండి.",
    repayment_breakdown: "చెల్లింపు విభజన",
    principal: "ప్రిన్సిపాల్",
    interest: "వడ్డీ",

    apply_for_loan: "గోల్డ్ లోన్ కోసం అప్లై చేయండి",
    apply_now: "ఇప్పుడే అప్లై చేయండి",
    check_status: "మీ గోల్డ్ లోన్ స్థితిని చెక్ చేయండి",
    check_now: "ఇప్పుడే చెక్ చేయండి",

    refer_friend: "స్నేహితునికి రెఫర్ చేయండి *",
    refer_title: "స్నేహితునికి రెఫర్ చేసి ఉత్తేజక బహుమతులు గెలుచుకోండి",
    refer_desc: "శ్రీ గణేష్ ఫైనాన్స్‌ను మీ స్నేహితులు మరియు కుటుంబంతో పంచుకోండి. వారు గోల్డ్ లోన్ తీసుకుంటే మీరిద్దరూ లాభపడతారు.",
    refer_now: "ఇప్పుడే రెఫర్ చేయండి",
    tc_apply: "*T&C వర్తిస్తాయి",

    ask_expert: "నిపుణుడిని అడగండి",
    expert_title: "మా ఆర్థిక సలహాదారులతో మాట్లాడండి",
    north_east_west: "ఉత్తర, తూర్పు & పశ్చిమ భారతదేశం (టోల్-ఫ్రీ)",
    south_india: "దక్షిణ భారతదేశం కాల్ సెంటర్",
    write_to_us: "మాకు రాయండి",
    branch_timings: "బ్రాంచ్ సమయాలు",
    mon_sat: "సోమ-శని",
    timing: "9:30 AM – 6 PM",

    standard: "స్టాండర్డ్ గోల్డ్ లోన్",
    flexi: "గోల్డ్ ఫ్లెక్సి క్రెడిట్",
    home: "ఇంట్లో గోల్డ్ లోన్",
    bullet: "బులెట్ చెల్లింపు",

    day: "రోజు",
    days: "రోజులు",
    month: "నెల",
    months: "నెలలు",
    for_: "కోసం",
  },
    ta: {  // Tamil
    gold_loan_info: "தங்கக் கடன் தகவல்",
    invest_in_gold: "தங்கக் கடனில் முதலீடு செய்யுங்கள்",
    what_is_gold_loan: "தங்கக் கடன் என்றால் என்ன?",
    why_invest: "தங்கக் கடன் மூலம் முதலீடு ஏன் செய்ய வேண்டும்?",

    gold_loan_para1: "தங்கக் கடன் என்பது உங்கள் தங்க நகைகளை விற்காமல் அவற்றுக்கு எதிராக நிதி பெற அனுமதிக்கும் பாதுகாப்பான நிதி விருப்பமாகும். இந்தியாவில் தங்கத்தை அடகு வைத்து பணம் கடன் வாங்கும் கருத்து நூற்றாண்டுகள் பழமையானது — ஆனால் இன்று இந்த செயல்முறை முழுமையாக டிஜிட்டல், இந்திய ரிசர்வ் வங்கியால் கட்டுப்படுத்தப்பட்டு சில மணி நேரங்களில் முடிக்கப்படுகிறது.",
    gold_loan_para2: "நீங்கள் உங்கள் தங்க நகைகளை (18–22 காரட்) லைசென்ஸ் பெற்ற NBFC போன்ற ஸ்ரீ கணேஷ் ஃபைனான்ஸ் உடன் அடகு வைக்கிறீர்கள். கடன் தொகை தற்போதைய தங்க விகிதம் மற்றும் RBI ஆல் 75% வரை மூடப்பட்ட Loan-to-Value (LTV) விகிதத்தால் தீர்மானிக்கப்படுகிறது. வட்டி நீங்கள் நிதியை பயன்படுத்தும் காலத்திற்கு மட்டுமே வசூலிக்கப்படும்.",
    gold_loan_para3: "முழு கடன் தொகை மற்றும் வட்டி செலுத்தப்பட்டவுடன் உங்கள் தங்க நகைகள் உடனடியாக திருப்பி அளிக்கப்படும். தனிப்பட்ட கடன்களைப் போலல்லாமல், தங்கக் கடன்களில் இறுதி பயன்பாட்டுக்கு எந்த கட்டுப்பாடும் இல்லை — நீங்கள் நிதியை வியாபாரம், மருத்துவ தேவைகள், கல்வி அல்லது எந்த தனிப்பட்ட தேவைக்கும் பயன்படுத்தலாம்.",

    invest_para1: "தங்க ஆதரவு கொண்ட கடன் இந்தியாவில் மிகவும் வலுவான நிதி தயாரிப்புகளில் ஒன்றாகும். முதலீட்டாளர் அல்லது கடன் வாங்குபவராக, தங்கத்தின் உள்ளார்ந்த மதிப்பு இரு தரப்பினருக்கும் அசாதாரண பாதுகாப்பை வழங்குகிறது. RBI இன் கடுமையான LTV வழிகாட்டுதல்கள் கடன் ஒருபோதும் தங்கத்தின் சந்தை மதிப்பின் 75% ஐ மீறாது என்பதை உறுதி செய்கின்றன.",
    invest_para2: "முதலீட்டாளர்களுக்கு, தங்கக் கடன் NBFCகள் கவர்ச்சிகரமான நிலையான வருமான கருவிகளை (NCDs, FDs) வழங்குகின்றன — தங்க பாதுகாப்பு கொண்ட கடன் புத்தகத்தில் — இந்திய நிதியில் மிகக் குறைந்த NPA சொத்து வகுப்புகளில் ஒன்று. முன்கணிக்கக்கூடிய பணப்பாய்வு மற்றும் பிணைய தரம் இதை பழமைவாத முதலீட்டாளர்களுக்கு விருப்பமான தேர்வாக்குகிறது.",
    invest_para3: "ஸ்ரீ கணேஷ் ஃபைனான்ஸின் தங்கக் கடன் போர்ட்ஃபோலியோ 1% க்கும் குறைந்த NPA விகிதத்தை பராமரிக்கிறது, முதலீட்டாளர்கள் மற்றும் கடன் பெறுபவர்களுக்கு சமமாக நூற்றாண்டுகள் நம்பிக்கையின் அடிப்படையில் பாதுகாப்பான, வெளிப்படையான மற்றும் உயர் வருமான நிதி உறவை வழங்குகிறது.",

    interest_rate: "வட்டி விகிதம்",
    per_annum: "ஆண்டுக்கு",
    ltv_ratio: "LTV விகிதம்",
    rbi_mandated: "RBI கட்டாயப்படுத்தப்பட்டது",
    disbursement: "வழங்கல்",
    same_day: "அதே நாள்",
    post_valuation: "மதிப்பீட்டுக்குப் பிறகு",
    min_amount: "குறைந்தபட்ச தொகை",
    no_max_limit: "அதிகபட்ச வரம்பு இல்லை",

    features_title: "தங்கக் கடன் அம்சங்கள்",
    features_subtitle: "ஒவ்வொரு தனிநபரின் வாழ்க்கையிலும் சில கட்டங்கள் உள்ளன அங்கு நிதி உதவி அவசியமாகிறது — கல்வி செலவுகளில் இருந்து வியாபார விரிவாக்கம் வரை. தங்கத்தை அடகு வைப்பது உங்களுக்கு நிதி தேவைப்படும் போது மிக வேகமான, எளிய வழியாகும்.",
    features_desc: "தங்கக் கடன் மூலம் வழங்கப்படும் முக்கிய அம்சங்கள் இவை:",

    lower_interest: "குறைந்த வட்டி விகிதங்கள்",
    lower_interest_desc: "9.99% p.a. இலிருந்து தொடங்கும் போட்டி விகிதங்கள் — பாதுகாப்பான தன்மை செலவுகளை குறைக்கிறது.",
    simplified_app: "எளிமையான விண்ணப்பம்",
    simplified_app_desc: "குறைந்தபட்ச ஆவணங்கள். KYC + தங்க மதிப்பீடு தொடங்க உங்களுக்கு போதும்.",
    flexible_eligibility: "நெகிழ்வான தகுதி",
    flexible_eligibility_desc: "வருமான சான்று அல்லது CIBIL ஸ்கோர் தேவையில்லை. தங்க மதிப்பு உங்கள் தகுதியை தீர்மானிக்கிறது.",
    quick_disbursal: "விரைவான கடன் வழங்கல்",
    quick_disbursal_desc: "தங்க மதிப்பீட்டிற்கு பிறகு மணி நேரங்களில் நிதி கிரெடிட். அதே நாள் வழங்கல் உத்தரவாதம்.",
    no_restriction: "நிதி பயன்பாட்டு கட்டுப்பாடு இல்லை",
    no_restriction_desc: "கடன் தொகையை எந்த நோக்கத்திற்கும் பயன்படுத்துங்கள் — வியாபாரம், மருத்துவம், கல்வி அல்லது பயணம்.",
    safety: "முழு நகை பாதுகாப்பு",
    safety_desc: "RBI இணங்கிய காப்பீடு செய்யப்பட்ட வால்ட்டில் தங்கம் சேமிக்கப்படுகிறது, முழு அபாய கவரேஜுடன்.",
    minimal_docs: "குறைந்தபட்ச ஆவணங்கள்",
    minimal_docs_desc: "வெறும் ஆதார் + பான் + புகைப்படம். சம்பள ஸ்லிப் அல்லது வங்கி அறிக்கை தேவையில்லை.",
    easy_repayment: "எளிதான திருப்பிச் செலுத்தல்",
    easy_repayment_desc: "EMI, புல்லட் அல்லது ஃப்ளெக்ஸி திருப்பிச் செலுத்தல் தேர்வு செய்யுங்கள். எந்த நேரத்திலும் அபராதம் இல்லாமல் பகுதி செலுத்தல்.",

    calculator_title: "தங்கக் கடன் கால்குலேட்டர்",
    calculator_subtitle: "எங்கள் ஆன்லைன் கால்குலேட்டரைப் பயன்படுத்தி உங்கள் தங்கக் கடன் தகுதி மற்றும் மதிப்பிடப்பட்ட EMI ஐ கணக்கிடுங்கள். உங்கள் தேவைகளுக்கு சரியான கடன் திட்டத்தை கண்டுபிடிக்க ச்லைடர்களை சரிசெய்யுங்கள்.",
    shree_ganesh: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ்",
    gold_loan_calc: "தங்கக் கடன் கால்குலேட்டர்",

    loan_amount: "கடன் தொகை",
    loan_tenure: "கடன் காலம்",
    monthly_emi: "மாதாந்திர EMI",
    total_interest: "மொத்த வட்டி",
    total_payable: "மொத்தம் செலுத்த வேண்டியது",
    interest_rate_label: "வட்டி விகிதம்",
    estimated_values: "இவை மதிப்பிடப்பட்ட மதிப்புகள். சரியான விவரங்களுக்கு எங்களை தொடர்பு கொள்ளுங்கள் அல்லது அருகிலுள்ள கிளையைப் பார்வையிடுங்கள்.",
    repayment_breakdown: "திருப்பிச் செலுத்தல் பிரிவு",
    principal: "முதல் தொகை",
    interest: "வட்டி",

    apply_for_loan: "தங்கக் கடனுக்கு விண்ணப்பிக்கவும்",
    apply_now: "இப்போது விண்ணப்பிக்கவும்",
    check_status: "உங்கள் தங்கக் கடனின் நிலையை சரிபார்க்கவும்",
    check_now: "இப்போது சரிபார்க்கவும்",

    refer_friend: "நண்பரை பரிந்துரைக்கவும் *",
    refer_title: "நண்பரை பரிந்துரைக்கவும் மற்றும் உற்சாகமான பரிசுகளை வெல்லும் வாய்ப்பு பெறுங்கள்",
    refer_desc: "ஸ்ரீ கணேஷ் ஃபைனான்ஸை உங்கள் நண்பர்கள் மற்றும் குடும்பத்துடன் பகிர்ந்து கொள்ளுங்கள். அவர்கள் தங்கக் கடன் பெற்றால் இருவரும் பயனடைவீர்கள்.",
    refer_now: "இப்போது பரிந்துரைக்கவும்",
    tc_apply: "*T&C பொருந்தும்",

    ask_expert: "நிபுணரிடம் கேளுங்கள்",
    expert_title: "எங்கள் நிதி ஆலோசகர்களுடன் பேசுங்கள்",
    north_east_west: "வடக்கு, கிழக்கு & மேற்கு இந்தியா (டோல்-ஃப்ரீ)",
    south_india: "தென் இந்தியா அழைப்பு மையம்",
    write_to_us: "எங்களுக்கு எழுதுங்கள்",
    branch_timings: "கிளை நேரங்கள்",
    mon_sat: "திங்கள்-சனி",
    timing: "9:30 AM – 6 PM",

    standard: "தரநிலை தங்கக் கடன்",
    flexi: "தங்க ஃப்ளெக்ஸி கிரெடிட்",
    home: "வீட்டில் தங்கக் கடன்",
    bullet: "புல்லட் திருப்பிச் செலுத்தல்",

    day: "நாள்",
    days: "நாட்கள்",
    month: "மாதம்",
    months: "மாதங்கள்",
    for_: "க்கு",
  },

  kn: {  // Kannada
    gold_loan_info: "ಗೋಲ್ಡ್ ಲೋನ್ ಮಾಹಿತಿ",
    invest_in_gold: "ಗೋಲ್ಡ್ ಲೋನ್‌ನಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಿ",
    what_is_gold_loan: "ಗೋಲ್ಡ್ ಲೋನ್ ಎಂದರೆ ಏನು?",
    why_invest: "ಗೋಲ್ಡ್ ಲೋನ್ ಮೂಲಕ ಹೂಡಿಕೆ ಏಕೆ?",

    gold_loan_para1: "ಗೋಲ್ಡ್ ಲೋನ್ ಎಂದರೆ ನಿಮ್ಮ ಚಿನ್ನದ ಆಭರಣಗಳನ್ನು ಮಾರಾಟ ಮಾಡದೆ ಅವುಗಳ ವಿರುದ್ಧ ಹಣ ಪಡೆಯುವ ಸುರಕ್ಷಿತ ಆರ್ಥಿಕ ಆಯ್ಕೆಯಾಗಿದೆ. ಭಾರತದಲ್ಲಿ ಚಿನ್ನವನ್ನು ಅಡಮಾನವಾಗಿ ಇಟ್ಟು ಹಣ ಸಾಲ ಪಡೆಯುವ ಪರಂಪರೆ ಶತಮಾನಗಳ ಹಳೆಯದು — ಆದರೆ ಇಂದು ಈ ಪ್ರಕ್ರಿಯೆ ಸಂಪೂರ್ಣ ಡಿಜಿಟಲ್, ರಿಸರ್ವ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ ನಿಯಂತ್ರಿತ ಮತ್ತು ಗಂಟೆಗಳಲ್ಲಿ ಪೂರ್ಣಗೊಳ್ಳುತ್ತದೆ.",
    gold_loan_para2: "ನೀವು ನಿಮ್ಮ ಚಿನ್ನದ ಆಭರಣಗಳನ್ನು (18–22 ಕ್ಯಾರಟ್) ಲೈಸೆನ್ಸ್ ಪಡೆದ NBFC ಯಾದ ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ಗೆ ಅಡಮಾನವಾಗಿ ಇಡುತ್ತೀರಿ. ಸಾಲದ ಮೊತ್ತ ಪ್ರಸ್ತುತ ಚಿನ್ನದ ದರ ಮತ್ತು RBI ನಿಂದ 75% ವರೆಗೆ ಮಿತಿಗೊಳಿಸಲಾದ Loan-to-Value (LTV) ಅನುಪಾತದ ಮೇಲೆ ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ. ಬಡ್ಡಿ ನೀವು ನಿಧಿಯನ್ನು ಬಳಸುವ ಅವಧಿಗೆ ಮಾತ್ರ ವಿಧಿಸಲಾಗುತ್ತದೆ.",
    gold_loan_para3: "ಪೂರ್ಣ ಸಾಲದ ಮೊತ್ತ ಮತ್ತು ಬಡ್ಡಿ ತೀರಿಸಿದ ನಂತರ ನಿಮ್ಮ ಚಿನ್ನದ ಆಭರಣಗಳು ತಕ್ಷಣ ಹಿಂತಿರುಗಿಸಲಾಗುತ್ತದೆ. ವೈಯಕ್ತಿಕ ಸಾಲಗಳಿಗಿಂತ ಭಿನ್ನವಾಗಿ, ಗೋಲ್ಡ್ ಲೋನ್‌ನಲ್ಲಿ ಬಳಕೆಗೆ ಯಾವುದೇ ನಿರ್ಬಂಧವಿಲ್ಲ — ನೀವು ನಿಧಿಯನ್ನು ವ್ಯವಹಾರ, ವೈದ್ಯಕೀಯ, ಶಿಕ್ಷಣ ಅಥವಾ ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಅಗತ್ಯಕ್ಕೆ ಬಳಸಬಹುದು.",

    invest_para1: "ಗೋಲ್ಡ್ ಬ್ಯಾಕ್ಡ್ ಲೆಂಡಿಂಗ್ ಭಾರತದಲ್ಲಿ ಅತ್ಯಂತ ಬಲವಾದ ಆರ್ಥಿಕ ಉತ್ಪನ್ನಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಹೂಡಿಕೆದಾರ ಅಥವಾ ಸಾಲಗಾರನಾಗಿ, ಚಿನ್ನದ ಸಹಜ ಮೌಲ್ಯ ಎರಡೂ ಪಕ್ಷಗಳಿಗೆ ಅಸದೃಶ ಭದ್ರತೆ ನೀಡುತ್ತದೆ. RBI ನ ಕಠಿಣ LTV ಮಾರ್ಗಸೂಚಿಗಳು ಸಾಲವು ಎಂದಿಗೂ ಚಿನ್ನದ ಮಾರುಕಟ್ಟೆ ಮೌಲ್ಯದ 75% ಮೀರದಂತೆ ಖಚಿತಪಡಿಸುತ್ತವೆ.",
    invest_para2: "ಹೂಡಿಕೆದಾರರಿಗೆ, ಗೋಲ್ಡ್ ಲೋನ್ NBFCಗಳು ಆಕರ್ಷಕ ಸ್ಥಿರ ಆದಾಯ ಸಾಧನಗಳನ್ನು (NCDs, FDs) ನೀಡುತ್ತವೆ — ಚಿನ್ನದ ಸುರಕ್ಷಿತ ಸಾಲ ಪುಸ್ತಕದ ಮೇಲೆ — ಭಾರತೀಯ ಹಣಕಾಸಿನಲ್ಲಿ ಅತ್ಯಂತ ಕಡಿಮೆ NPA ಸ್ವತ್ತು ವರ್ಗಗಳಲ್ಲಿ ಒಂದು. ಮುನ್ಸೂಚಿತ ನಗದು ಹರಿವು ಮತ್ತು ಜಾಮೀನು ಗುಣಮಟ್ಟವು ಇದನ್ನು ಸಾಂಪ್ರದಾಯಿಕ ಹೂಡಿಕೆದಾರರಿಗೆ ಆದ್ಯತೆಯ ಆಯ್ಕೆಯಾಗಿಸುತ್ತದೆ.",
    invest_para3: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನ ಗೋಲ್ಡ್ ಲೋನ್ ಪೋರ್ಟ್‌ಫೋಲಿಯೋ 1% ಕ್ಕಿಂತ ಕಡಿಮೆ NPA ಅನುಪಾತವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ, ಹೂಡಿಕೆದಾರರು ಮತ್ತು ಸಾಲಗಾರರಿಗೆ ಶತಮಾನಗಳ ವಿಶ್ವಾಸದ ಮೇಲೆ ನಿರ್ಮಿತ ಸುರಕ್ಷಿತ, ಪಾರದರ್ಶಕ ಮತ್ತು ಉನ್ನತ ಆದಾಯದ ಆರ್ಥಿಕ ಸಂಬಂಧವನ್ನು ನೀಡುತ್ತದೆ.",

    interest_rate: "ಬಡ್ಡಿ ದರ",
    per_annum: "ಪ್ರತಿ ವರ್ಷ",
    ltv_ratio: "LTV ಅನುಪಾತ",
    rbi_mandated: "RBI ನಿರ್ದೇಶಿತ",
    disbursement: "ವಿತರಣೆ",
    same_day: "ಅದೇ ದಿನ",
    post_valuation: "ಮೌಲ್ಯಮಾಪನದ ನಂತರ",
    min_amount: "ಕನಿಷ್ಠ ಮೊತ್ತ",
    no_max_limit: "ಗರಿಷ್ಠ ಮಿತಿ ಇಲ್ಲ",

    features_title: "ಗೋಲ್ಡ್ ಲೋನ್ ವೈಶಿಷ್ಟ್ಯಗಳು",
    features_subtitle: "ಪ್ರತಿ ವ್ಯಕ್ತಿಯ ಜೀವನದಲ್ಲಿ ಕೆಲವು ಹಂತಗಳು ಬರುತ್ತವೆ ಅಲ್ಲಿ ಆರ್ಥಿಕ ನೆರವು ಅಗತ್ಯವಾಗುತ್ತದೆ — ಶಿಕ್ಷಣ ವೆಚ್ಚದಿಂದ ವ್ಯವಹಾರ ವಿಸ್ತರಣೆಯವರೆಗೆ. ಚಿನ್ನವನ್ನು ಅಡಮಾನವಾಗಿ ಇಡುವುದು ನಿಮಗೆ ನಿಧಿ ಅಗತ್ಯವಿರುವಾಗ ಅತ್ಯಂತ ವೇಗವಾದ ಮತ್ತು ಸುಲಭ ಮಾರ್ಗವಾಗಿದೆ.",
    features_desc: "ಗೋಲ್ಡ್ ಲೋನ್ ಮೂಲಕ ಒದಗಿಸಲಾಗುವ ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳು ಇವು:",

    lower_interest: "ಕಡಿಮೆ ಬಡ್ಡಿ ದರಗಳು",
    lower_interest_desc: "9.99% p.a. ನಿಂದ ಪ್ರಾರಂಭವಾಗುವ ಸ್ಪರ್ಧಾತ್ಮಕ ದರಗಳು — ಸುರಕ್ಷಿತ ಸ್ವಭಾವ ವೆಚ್ಚವನ್ನು ಕಡಿಮೆಯಾಗಿರಿಸುತ್ತದೆ.",
    simplified_app: "ಸರಳ ಅರ್ಜಿ",
    simplified_app_desc: "ಕನಿಷ್ಠ ಕಾಗದಪತ್ರಗಳು. KYC + ಚಿನ್ನದ ಮೌಲ್ಯಮಾಪನವೇ ಪ್ರಾರಂಭಕ್ಕೆ ಸಾಕು.",
    flexible_eligibility: "ನಮ್ಯ ಅರ್ಹತೆ",
    flexible_eligibility_desc: "ಆದಾಯದ ಪುರಾವೆ ಅಥವಾ CIBIL ಸ್ಕೋರ್ ಅಗತ್ಯವಿಲ್ಲ. ಚಿನ್ನದ ಮೌಲ್ಯವೇ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.",
    quick_disbursal: "ತ್ವರಿತ ಸಾಲ ವಿತರಣೆ",
    quick_disbursal_desc: "ಚಿನ್ನದ ಮೌಲ್ಯಮಾಪನದ ನಂತರ ಗಂಟೆಗಳಲ್ಲಿ ನಿಧಿ ಕ್ರೆಡಿಟ್. ಅದೇ ದಿನ ವಿತರಣೆಯ ಖಾತರಿ.",
    no_restriction: "ನಿಧಿ ಬಳಕೆಗೆ ಯಾವುದೇ ನಿರ್ಬಂಧವಿಲ್ಲ",
    no_restriction_desc: "ಸಾಲದ ಮೊತ್ತವನ್ನು ಯಾವುದೇ ಉದ್ದೇಶಕ್ಕೂ ಬಳಸಿ — ವ್ಯವಹಾರ, ವೈದ್ಯಕೀಯ, ಶಿಕ್ಷಣ ಅಥವಾ ಪ್ರಯಾಣ.",
    safety: "ಪೂರ್ಣ ಆಭರಣ ಸುರಕ್ಷತೆ",
    safety_desc: "RBI ಅನುಸರಣೆಯ ವಿಮಾ ಮಾಡಲಾದ ವಾಲ್ಟ್‌ನಲ್ಲಿ ಚಿನ್ನ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ, ಪೂರ್ಣ ಅಪಾಯ ಕವರೇಜ್‌ನೊಂದಿಗೆ.",
    minimal_docs: "ಕನಿಷ್ಠ ದಾಖಲೆಗಳು",
    minimal_docs_desc: "ಕೇವಲ ಆಧಾರ್ + ಪ್ಯಾನ್ + ಫೋಟೋ. ವೇತನ ಸ್ಲಿಪ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಅಗತ್ಯವಿಲ್ಲ.",
    easy_repayment: "ಸುಲಭ ಮರುಪಾವತಿ",
    easy_repayment_desc: "EMI, ಬುಲೆಟ್ ಅಥವಾ ಫ್ಲೆಕ್ಸಿ ಮರುಪಾವತಿ ಆಯ್ಕೆಮಾಡಿ. ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ದಂಡವಿಲ್ಲದೆ ಭಾಗಶಃ ಪಾವತಿ.",

    calculator_title: "ಗೋಲ್ಡ್ ಲೋನ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    calculator_subtitle: "ನಮ್ಮ ಆನ್‌ಲೈನ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ನಿಂದ ನಿಮ್ಮ ಗೋಲ್ಡ್ ಲೋನ್ ಅರ್ಹತೆ ಮತ್ತು ಅಂದಾಜು EMI ಲೆಕ್ಕ ಹಾಕಿ. ಸ್ಲೈಡರ್‌ಗಳನ್ನು ಸರಿಹೊಂದಿಸಿ ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ಸರಿಹೊಂದುವ ಯೋಜನೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ.",
    shree_ganesh: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್",
    gold_loan_calc: "ಗೋಲ್ಡ್ ಲೋನ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್",

    loan_amount: "ಸಾಲದ ಮೊತ್ತ",
    loan_tenure: "ಸಾಲದ ಅವಧಿ",
    monthly_emi: "ಮಾಸಿಕ EMI",
    total_interest: "ಒಟ್ಟು ಬಡ್ಡಿ",
    total_payable: "ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದದ್ದು",
    interest_rate_label: "ಬಡ್ಡಿ ದರ",
    estimated_values: "ಇವು ಅಂದಾಜು ಮೌಲ್ಯಗಳು. ನಿಖರ ವಿವರಗಳಿಗೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ಹತ್ತಿರದ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ.",
    repayment_breakdown: "ಮರುಪಾವತಿ ವಿಭಜನೆ",
    principal: "ಮೂಲ ಮೊತ್ತ",
    interest: "ಬಡ್ಡಿ",

    apply_for_loan: "ಗೋಲ್ಡ್ ಲೋನ್‌ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    apply_now: "ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    check_status: "ನಿಮ್ಮ ಗೋಲ್ಡ್ ಲೋನ್ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    check_now: "ಈಗ ಪರಿಶೀಲಿಸಿ",

    refer_friend: "ಸ್ನೇಹಿತರನ್ನು ರೆಫರ್ ಮಾಡಿ *",
    refer_title: "ಸ್ನೇಹಿತರನ್ನು ರೆಫರ್ ಮಾಡಿ ಮತ್ತು ರೋಮಾಂಚಕ ಬಹುಮಾನಗಳನ್ನು ಗೆಲ್ಲುವ ಅವಕಾಶ ಪಡೆಯಿರಿ",
    refer_desc: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಅನ್ನು ನಿಮ್ಮ ಸ್ನೇಹಿತರು ಮತ್ತು ಕುಟುಂಬದೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ. ಅವರು ಗೋಲ್ಡ್ ಲೋನ್ ಪಡೆದರೆ ಇಬ್ಬರಿಗೂ ಲಾಭ.",
    refer_now: "ಈಗ ರೆಫರ್ ಮಾಡಿ",
    tc_apply: "*T&C ಅನ್ವಯವಾಗುತ್ತದೆ",

    ask_expert: "ತಜ್ಞರನ್ನು ಕೇಳಿ",
    expert_title: "ನಮ್ಮ ಆರ್ಥಿಕ ಸಲಹೆಗಾರರೊಂದಿಗೆ ಮಾತನಾಡಿ",
    north_east_west: "ಉತ್ತರ, ಪೂರ್ವ & ಪಶ್ಚಿಮ ಭಾರತ (ಟೋಲ್-ಫ್ರೀ)",
    south_india: "ದಕ್ಷಿಣ ಭಾರತ ಕಾಲ್ ಸೆಂಟರ್",
    write_to_us: "ನಮಗೆ ಬರೆಯಿರಿ",
    branch_timings: "ಶಾಖೆ ಸಮಯ",
    mon_sat: "ಸೋಮ-ಶನಿ",
    timing: "9:30 AM – 6 PM",

    standard: "ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಗೋಲ್ಡ್ ಲೋನ್",
    flexi: "ಗೋಲ್ಡ್ ಫ್ಲೆಕ್ಸಿ ಕ್ರೆಡಿಟ್",
    home: "ಮನೆಯಲ್ಲಿ ಗೋಲ್ಡ್ ಲೋನ್",
    bullet: "ಬುಲೆಟ್ ಮರುಪಾವತಿ",

    day: "ದಿನ",
    days: "ದಿನಗಳು",
    month: "ತಿಂಗಳು",
    months: "ತಿಂಗಳುಗಳು",
    for_: "ಗೆ",
  },

  as: {  // Assamese
    gold_loan_info: "সোণৰ ঋণৰ তথ্য",
    invest_in_gold: "সোণৰ ঋণত বিনিয়োগ কৰক",
    what_is_gold_loan: "সোণৰ ঋণ কি?",
    why_invest: "সোণৰ ঋণৰ জৰিয়তে বিনিয়োগ কিয়?",

    gold_loan_para1: "সোণৰ ঋণ এটা সুৰক্ষিত বিত্তীয় বিকল্প যিয়ে আপোনাৰ সোণৰ গহনা বিক্ৰী নকৰাকৈয়ে তাৰ বিৰুদ্ধে ধন লাভ কৰিবলৈ অনুমতি দিয়ে. ভাৰতত সোণ গাঁঠি ৰাখি ধন ঋণ লোৱাৰ ধাৰণা শতিকা পুৰণি — কিন্তু আজি এই প্ৰক্ৰিয়া সম্পূৰ্ণ ডিজিটেল, ৰিজাৰ্ভ বেংক অফ ইণ্ডিয়াৰ দ্বাৰা নিয়ন্ত্ৰিত আৰু কেইঘণ্টাৰ ভিতৰতে সম্পূৰ্ণ হয়.",
    gold_loan_para2: "আপুনি আপোনাৰ সোণৰ গহনা (18–22 কেৰেট) লাইচেন্সপ্ৰাপ্ত NBFC যেনে শ্ৰী গণেশ ফাইনেন্সৰ ওচৰত গাঁঠি ৰাখে. ঋণৰ পৰিমাণ বৰ্তমান সোণৰ হাৰ আৰু RBIৰ দ্বাৰা 75% লৈকে সীমাবদ্ধ Loan-to-Value (LTV) অনুপাতৰ ওপৰত নিৰ্ভৰ কৰে. সুত কেৱল আপুনি ধন ব্যৱহাৰ কৰা সময়ৰ বাবেহে লোৱা হয়.",
    gold_loan_para3: "পূৰ্ণ ঋণৰ পৰিমাণ আৰু সুত পৰিশোধ কৰাৰ পিছত আপোনাৰ সোণৰ গহনা তৎক্ষণাৎ ঘূৰাই দিয়া হয়. ব্যক্তিগত ঋণৰ দৰে নহয়, সোণৰ ঋণত ব্যৱহাৰৰ কোনো নিষেধ নাই — আপুনি ধন ব্যৱহাৰ কৰিব পাৰে ব্যৱসায়, চিকিৎসা, শিক্ষা বা যিকোনো ব্যক্তিগত প্ৰয়োজনৰ বাবে.",

    invest_para1: "সোণৰ সমৰ্থিত ঋণ ভাৰতত আটাইতকৈ শক্তিশালী বিত্তীয় উৎপাদনসমূহৰ এটা. বিনিয়োগকাৰী বা ঋণগ্ৰহীতা হিচাপে, সোণৰ অন্তৰ্নিহিত মূল্য জামিন হিচাপে দুয়োপক্ষক অতুলনীয় সুৰক্ষা প্ৰদান কৰে. RBIৰ কঠোৰ LTV নিৰ্দেশনাই ঋণ কেতিয়াও সোণৰ বজাৰ মূল্যৰ 75% অতিক্ৰম নকৰে বুলি নিশ্চিত কৰে.",
    invest_para2: "বিনিয়োগকাৰীসকলৰ বাবে, সোণৰ ঋণ NBFCসমূহে আকৰ্ষণীয় স্থিৰ আয়ৰ সাৰথি (NCDs, FDs) আগবঢ়ায় — সোণ সুৰক্ষিত ঋণ পুস্তকৰ ওপৰত — ভাৰতীয় বিত্তত আটাইতকৈ কম NPA সম্পত্তি শ্ৰেণীৰ এটা. পূৰ্বানুমানযোগ্য নগদ প্ৰবাহ আৰু জামিনৰ গুণগত মান এইটোক ৰক্ষণশীল বিনিয়োগকাৰীৰ পছন্দৰ বাছনি কৰে.",
    invest_para3: "শ্ৰী গণেশ ফাইনেন্সৰ সোণৰ ঋণ পৰ্টফ’লিঅ’ 1% তকৈ কম NPA অনুপাত বজাই ৰাখে, যিয়ে বিনিয়োগকাৰী আৰু ঋণগ্ৰহীতা দুয়োকে শতিকাৰ বিশ্বাসৰ ওপৰত নিৰ্মিত সুৰক্ষিত, স্বচ্ছ আৰু উচ্চ-ৰিটাৰ্ণ বিত্তীয় সম্পৰ্ক প্ৰদান কৰে.",

    interest_rate: "সুতৰ হাৰ",
    per_annum: "প্ৰতি বছৰ",
    ltv_ratio: "LTV অনুপাত",
    rbi_mandated: "RBIৰ দ্বাৰা বাধ্যতামূলক",
    disbursement: "বিতৰণ",
    same_day: "একে দিনতে",
    post_valuation: "মূল্যায়নৰ পিছত",
    min_amount: "ন্যূনতম পৰিমাণ",
    no_max_limit: "সৰ্বোচ্চ সীমা নাই",

    features_title: "সোণৰ ঋণৰ বৈশিষ্ট্যসমূহ",
    features_subtitle: "প্ৰত্যেক ব্যক্তিৰ জীৱনত কিছুমান পৰ্যায় থাকে য’ত বিত্তীয় সহায় অত্যাৱশ্যক হয় — শিক্ষা খৰচৰ পৰা ব্যৱসায় বিৰ্ত্তনলৈকে. সোণ গাঁঠি ৰখা সৰ্বোত্তম, সহজ উপায় যেতিয়া আপোনাক ধনৰ সৰ্বাধিক প্ৰয়োজন হয়.",
    features_desc: "সোণৰ ঋণে আগবঢ়োৱা মূল বৈশিষ্ট্যসমূহ হ’ল:",

    lower_interest: "কম সুতৰ হাৰ",
    lower_interest_desc: "9.99% p.a. ৰ পৰা আৰম্ভ হোৱা প্ৰতিযোগিতামূলক হাৰ — সুৰক্ষিত প্ৰকৃতিয়ে খৰচ কম ৰাখে.",
    simplified_app: "সৰল আবেদন",
    simplified_app_desc: "ন্যূনতম কাগজ-পত্ৰ. KYC + সোণৰ মূল্যায়নেই আৰম্ভ কৰিবলৈ যথেষ্ট.",
    flexible_eligibility: "নমনীয় যোগ্যতা",
    flexible_eligibility_desc: "আয়ৰ প্ৰমাণ বা CIBIL স্ক’ৰৰ প্ৰয়োজন নাই. সোণৰ মূল্যই আপোনাৰ যোগ্যতা নিৰ্ধাৰণ কৰে.",
    quick_disbursal: "ত্বৰিত ঋণ বিতৰণ",
    quick_disbursal_desc: "সোণৰ মূল্যায়নৰ পিছত কেইঘণ্টাৰ ভিতৰতে ধন ক্ৰেডিট. একে দিনতে বিতৰণৰ নিশ্চয়তা.",
    no_restriction: "ধন ব্যৱহাৰত কোনো নিষেধ নাই",
    no_restriction_desc: "ঋণৰ পৰিমাণ যিকোনো উদ্দেশ্যৰ বাবে ব্যৱহাৰ কৰক — ব্যৱসায়, চিকিৎসা, শিক্ষা বা ভ্ৰমণ.",
    safety: "সম্পূৰ্ণ গহনা সুৰক্ষা",
    safety_desc: "RBI অনুসৰণীয় বীমাকৃত ভল্টত সোণ সংৰক্ষিত, সম্পূৰ্ণ বিপদ কভাৰেজৰ সৈতে.",
    minimal_docs: "ন্যূনতম দস্তাবেজ",
    minimal_docs_desc: "কেৱল আধাৰ + পেন + ফটো. দৰমহাৰ স্লিপ বা বেংক ষ্টেটমেণ্টৰ প্ৰয়োজন নাই.",
    easy_repayment: "সহজ পৰিশোধ",
    easy_repayment_desc: "EMI, বুলেট বা ফ্লেক্সি পৰিশোধ বাছক. যিকোনো সময়ত জৰিমনা অবিহনে অংশ পৰিশোধ.",

    calculator_title: "সোণৰ ঋণ কেলকুলেটৰ",
    calculator_subtitle: "আমাৰ অনলাইন কেলকুলেটৰৰ দ্বাৰা আপোনাৰ সোণৰ ঋণৰ যোগ্যতা আৰু অনুমানিত EMI গণনা কৰক. স্লাইডাৰ সামঞ্জস্য কৰি আপোনাৰ প্ৰয়োজন অনুসৰি সঠিক প্লেন বিচাৰি উলিয়াওক.",
    shree_ganesh: "শ্ৰী গণেশ ফাইনেন্স",
    gold_loan_calc: "সোণৰ ঋণ কেলকুলেটৰ",

    loan_amount: "ঋণৰ পৰিমাণ",
    loan_tenure: "ঋণৰ ম্যাদ",
    monthly_emi: "মাহেকীয়া EMI",
    total_interest: "মুঠ সুত",
    total_payable: "মুঠ পৰিশোধযোগ্য",
    interest_rate_label: "সুতৰ হাৰ",
    estimated_values: "এইবোৰ অনুমানিত মূল্য. সঠিক তথ্যৰ বাবে আমাক যোগাযোগ কৰক বা ওচৰৰ শাখাত ভ্ৰমণ কৰক.",
    repayment_breakdown: "পৰিশোধৰ বিৱৰণ",
    principal: "মূলধন",
    interest: "সুত",

    apply_for_loan: "সোণৰ ঋণৰ বাবে আবেদন কৰক",
    apply_now: "এতিয়া আবেদন কৰক",
    check_status: "আপোনাৰ সোণৰ ঋণৰ স্থিতি পৰীক্ষা কৰক",
    check_now: "এতিয়া পৰীক্ষা কৰক",

    refer_friend: "বন্ধুক ৰেফাৰ কৰক *",
    refer_title: "বন্ধুক ৰেফাৰ কৰক আৰু উত্তেজনাপূৰ্ণ বঁটা জয় কৰাৰ সুযোগ লাভ কৰক",
    refer_desc: "শ্ৰী গণেশ ফাইনেন্স আপোনাৰ বন্ধু আৰু পৰিয়ালৰ সৈতে শ্বেয়াৰ কৰক. তেওঁলোকে সোণৰ ঋণ ল’লে দুয়োপক্ষই লাভবান হ’ব.",
    refer_now: "এতিয়া ৰেফাৰ কৰক",
    tc_apply: "*T&C প্ৰযোজ্য",

    ask_expert: "বিশেষজ্ঞক সোধক",
    expert_title: "আমাৰ বিত্তীয় উপদেষ্টাৰ সৈতে কথা পাতক",
    north_east_west: "উত্তৰ, পূব আৰু পশ্চিম ভাৰত (ট’ল-ফ্ৰী)",
    south_india: "দক্ষিণ ভাৰত কল চেন্টাৰ",
    write_to_us: "আমাক লিখক",
    branch_timings: "শাখাৰ সময়",
    mon_sat: "সোম-শনি",
    timing: "9:30 AM – 6 PM",

    standard: "মানক সোণৰ ঋণ",
    flexi: "সোণ ফ্লেক্সি ক্ৰেডিট",
    home: "ঘৰত সোণৰ ঋণ",
    bullet: "বুলেট পৰিশোধ",

    day: "দিন",
    days: "দিন",
    month: "মাহ",
    months: "মাহ",
    for_: "বাবে",
  }
};
  

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function GoldLoanInfo() {
  const [activeTab, setActiveTab] = useState("what");
  const [scheme, setScheme] = useState("flexi");
  const [loanAmount, setLoanAmount] = useState(300000);
  const [tenureDays, setTenureDays] = useState(365);
  const { t: navT, lang } = useLanguage();
  
  const t = (key) => {
    return GOLD_LOAN_TRANSLATIONS[lang]?.[key] || 
           GOLD_LOAN_TRANSLATIONS.en[key] || 
           key;
  };

  // Update SCHEMES with translations
  const SCHEMES = [
    { id: "standard", label: t("standard"), rate: 10.5 },
    { id: "flexi",    label: t("flexi"),    rate: 9.99 },
    { id: "home",     label: t("home"),     rate: 11.0 },
    { id: "bullet",   label: t("bullet"),   rate: 12.5 },
  ];

  // Update FEATURES with translations
  const FEATURES = [
    { icon: "📉", title: t("lower_interest"), desc: t("lower_interest_desc") },
    { icon: "📋", title: t("simplified_app"), desc: t("simplified_app_desc") },
    { icon: "✅", title: t("flexible_eligibility"), desc: t("flexible_eligibility_desc") },
    { icon: "⚡", title: t("quick_disbursal"), desc: t("quick_disbursal_desc") },
    { icon: "🔓", title: t("no_restriction"), desc: t("no_restriction_desc") },
    { icon: "🔒", title: t("safety"), desc: t("safety_desc") },
    { icon: "📄", title: t("minimal_docs"), desc: t("minimal_docs_desc") },
    { icon: "💳", title: t("easy_repayment"), desc: t("easy_repayment_desc") },
  ];

  // Update INFO_TABS with translations
  const INFO_TABS = [
    {
      id: "what",
      label: t("gold_loan_info"),
      heading: t("what_is_gold_loan"),
      paragraphs: [t("gold_loan_para1"), t("gold_loan_para2"), t("gold_loan_para3")],
    },
    {
      id: "invest",
      label: t("invest_in_gold"),
      heading: t("why_invest"),
      paragraphs: [t("invest_para1"), t("invest_para2"), t("invest_para3")],
    },
  ];

  // Update quick stats with translations
  const QUICK_STATS = [
    { label: t("interest_rate"), value: "9.99%", sub: t("per_annum") },
    { label: t("ltv_ratio"), value: "75%", sub: t("rbi_mandated") },
    { label: t("disbursement"), value: t("same_day"), sub: t("post_valuation") },
    { label: t("min_amount"), value: "₹1,500", sub: t("no_max_limit") },
  ];

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
    <div className="w-full bg-white font-sans" dir={lang === "ur" ? "rtl" : "ltr"}>

      {/* SECTION 1 — INFO TABS */}
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
                {QUICK_STATS.map((s) => (
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

      {/* SECTION 2 — FEATURES */}
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
            {t("features_title")}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-2xl leading-7">
            {t("features_subtitle")}
          </p>
          <p className="text-gray-600 text-sm font-medium mb-6">
            {t("features_desc")}
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

      {/* SECTION 3 — CALCULATOR */}
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
            {t("calculator_title")}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-2xl leading-7">
            {t("calculator_subtitle")}
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
                  {t("shree_ganesh")}
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t("gold_loan_calc")}
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
                  <p className="text-xs font-bold tracking-widest uppercase text-red-400 mb-1">{t("monthly_emi")}</p>
                  <p className="text-3xl sm:text-4xl font-black text-white">
                    ₹ <span className="tabular-nums">{formatINR(monthlyEMI)}</span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">{t("for_")} {months} {months !== 1 ? t("months") : t("month")}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-0.5">{t("total_interest")}</p>
                    <p className="text-sm font-black text-yellow-400">₹ {formatINR(totalInterest)}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-0.5">{t("total_payable")}</p>
                    <p className="text-sm font-black text-emerald-400">₹ {formatINR(totalPayable)}</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-0.5">{t("interest_rate_label")}</p>
                  <p className="text-sm font-black text-white">{annualRate}% p.a.</p>
                </div>

                <p className="text-[11px] text-white/30 leading-5 px-2">
                  {t("estimated_values")}
                </p>
              </div>
            </div>

            {/* Right — Sliders */}
            <div className="px-6 sm:px-10 py-8 space-y-10">

              {/* Loan Amount Slider */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-black tracking-widest uppercase text-white/60">{t("loan_amount")}</p>
                  <div className="bg-red-600 text-white text-sm font-black px-4 py-1.5 rounded-lg shadow-lg shadow-red-900/50">
                    ₹{loanAmount.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="relative h-6 flex items-center">
                  <div className="absolute w-full h-1.5 bg-white/10 rounded-full" />
                  <div
                    className="absolute h-1.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-100"
                    style={{ width: `${loanPct}%` }}
                  />
                  <input
                    type="range"
                    min={1500}
                    max={1000000}
                    step={500}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
                  />
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

              {/* Tenure Slider */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-black tracking-widest uppercase text-white/60">{t("loan_tenure")}</p>
                  <div className="bg-red-600 text-white text-sm font-black px-4 py-1.5 rounded-lg shadow-lg shadow-red-900/50">
                    {tenureDays} {tenureDays !== 1 ? t("days") : t("day")}
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
                  <span className="text-[11px] text-white/30 font-medium">1 {t("day")}</span>
                  <span className="text-[11px] text-white/30 font-medium">365 {t("days")}</span>
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

              {/* Breakdown bar */}
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase text-white/40 mb-3">{t("repayment_breakdown")}</p>
                <div className="flex rounded-lg overflow-hidden h-3">
                  <div
                    className="bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500"
                    style={{ width: `${(loanAmount / parseFloat(totalPayable)) * 100}%` }}
                  />
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 flex-1" />
                </div>
                <div className="flex gap-6 mt-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                    <span className="w-2.5 h-2.5 rounded-sm bg-red-500 flex-shrink-0" />{t("principal")}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                    <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 flex-shrink-0" />{t("interest")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator footer CTA */}
          <div className="px-6 sm:px-10 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02]">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div>
                <p className="text-xs text-white/40 font-medium">{t("apply_for_loan")}</p>
              </div>
              <a
                href="/contact"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-black transition-all active:scale-95 shadow-lg shadow-red-900/40"
              >
                {t("apply_now")}
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div>
                <p className="text-xs text-white/40 font-medium">{t("check_status")}</p>
              </div>
              <a
                href="/contact"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-black transition-all active:scale-95"
              >
                {t("check_now")}
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — REFER + EXPERT */}
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
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <p className="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-2">
                {t("refer_friend")}
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 leading-tight">
                {t("refer_title")}
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-6">
                {t("refer_desc")}
              </p>

              <div className="flex items-center justify-between">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-black transition-all active:scale-95 shadow-md shadow-red-100"
                >
                  {t("refer_now")}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>

                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <div className="absolute inset-0 bg-red-50 rounded-2xl group-hover:rotate-6 transition-transform duration-500" />
                  <div className="relative w-full h-full flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-500">
                    🎁
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 mt-4">{t("tc_apply")}</p>
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
                {t("ask_expert")}
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-5 leading-tight">
                {t("expert_title")}
              </h3>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black tracking-widest uppercase text-red-400 mb-1">
                    {t("north_east_west")}
                  </p>
                  <a href="tel:18003131212" className="text-white font-black text-lg hover:text-red-300 transition-colors">
                    1800 313 1212
                  </a>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black tracking-widest uppercase text-red-400 mb-1">
                    {t("south_india")}
                  </p>
                  <a href="tel:9946901212" className="text-white font-black text-lg hover:text-red-300 transition-colors">
                    99469 01212
                  </a>
                  <p className="text-[11px] text-white/30 mt-0.5">{t("mon_sat")}, 9:30 AM to 6 PM</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-3">
                    <p className="text-[10px] font-black tracking-widest uppercase text-red-400 mb-1">{t("write_to_us")}</p>
                    <a href="mailto:info@shreegf.com" className="text-white text-xs font-semibold hover:text-red-300 transition-colors break-all">
                      info@shreegf.com
                    </a>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-3">
                    <p className="text-[10px] font-black tracking-widest uppercase text-red-400 mb-1">{t("branch_timings")}</p>
                    <p className="text-white text-xs font-semibold">{t("mon_sat")}</p>
                    <p className="text-white/50 text-[11px]">{t("timing")}</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                💬
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; }
        input[type='range']::-moz-range-thumb { appearance: none; width: 0; height: 0; border: none; }
        input[type='range']:focus { outline: none; }
      `}</style>
    </div>
  );
}