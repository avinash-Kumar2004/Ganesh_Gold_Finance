import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../Common/Navbaar";

// ══════════════════════════════════════════════════════════════════
// MULTILINGUAL FAQ DATA
// ══════════════════════════════════════════════════════════════════
const FAQ_DATA = {
  en: {
    badge: "Support Centre",
    heading: "Frequently Asked",
    headingLine2: "Questions",
    subtext: "Everything you need to know about Shree Ganesh Finance's products and services. Can't find your answer?",
    subtextLink: "Talk to our team.",
    stats: [
      { value: "27+", label: "Questions Answered" },
      { value: "24h", label: "Response Time" },
      { value: "RBI", label: "Regulated NBFC" },
    ],
    questionsLabel: "questions in this category",
    stillHave: "Still have questions?",
    expertHeading: "Our experts are here to help",
    expertSub: "Speak with a Shree Ganesh Finance financial advisor — Mon to Sat, 9:30 AM to 6:00 PM.",
    contactBtn: "Contact Us",
    callBtn: "Call Toll-Free",
    categories: [
      {
        id: "gold-loan", label: "Gold Loan", icon: "🏅",
        faqs: [
          { q: "What is a Gold Loan and how does it work at Shree Ganesh Finance?", a: "A Gold Loan is a secured loan where you pledge your gold ornaments (18–22 karat) as collateral and receive funds instantly. At Shree Ganesh Finance, our certified appraiser evaluates your gold at the branch or at your doorstep, and the loan amount — up to 75% of gold's market value (as per RBI's LTV norms) — is disbursed directly to your bank account within hours. No income proof or CIBIL score is required." },
          { q: "What is the minimum and maximum gold loan amount I can get?", a: "Shree Ganesh Finance offers gold loans starting from as low as ₹1,500 with no defined upper limit — the maximum amount depends entirely on the weight, purity (18–22 karat), and current market rate of your gold ornaments, subject to the RBI-mandated 75% Loan-to-Value (LTV) ratio." },
          { q: "What is the interest rate on a Gold Loan?", a: "Our gold loan interest rates start from 9.99% per annum. The exact rate depends on the loan scheme you choose — Standard Gold Loan, Gold Flexi Credit, or Bullet Repayment. All rates and charges are disclosed upfront as per RBI's fair lending guidelines. There is zero processing fee on select schemes." },
          { q: "What documents are required to apply for a gold loan?", a: "Gold loans require minimal documentation: (1) Aadhaar Card — mandatory under PMLA norms, (2) PAN Card — required for loans above ₹1 lakh, (3) One recent passport-size photograph, and (4) Your gold ornaments for in-branch valuation. No salary slips, bank statements, or income tax returns are needed." },
          { q: "Is my gold safe with Shree Ganesh Finance?", a: "Absolutely. All pledged gold is stored in RBI-compliant, high-security insured vaults with 24×7 surveillance and comprehensive all-risk insurance coverage throughout the custody period. The gold is returned in the same condition upon full loan repayment." },
          { q: "Can I repay my gold loan before the tenure ends?", a: "Yes. Shree Ganesh Finance allows part-payment and full pre-closure of gold loans at any time without any prepayment penalty or foreclosure charges. Upon full repayment, your gold ornaments are returned immediately." },
          { q: "What is the Gold Loan at Home service?", a: "Our Gold Loan at Home service brings the entire gold loan process to your doorstep. A trained, uniformed, and verified executive visits your residence, conducts the gold valuation using certified equipment, and disburses the loan to your bank account — all within the same visit. Available 6 days a week." },
        ],
      },
      {
        id: "eligibility", label: "Eligibility", icon: "✅",
        faqs: [
          { q: "Who is eligible to apply for a loan at Shree Ganesh Finance?", a: "Any Indian resident aged 18 years and above is eligible to apply for a gold loan. For other loan products, additional eligibility criteria apply based on income, credit score, and employment type. For gold loans specifically, there is no minimum income requirement." },
          { q: "Do I need a good CIBIL score to get a gold loan?", a: "No. Gold loans at Shree Ganesh Finance do not require any minimum CIBIL score. Since the loan is secured against your gold ornaments, your credit history is not a determining factor. However, for unsecured products like Personal Loans, a CIBIL score of 700+ is preferred." },
          { q: "Can a self-employed person or farmer apply for a loan?", a: "Yes. Gold loans are particularly beneficial for self-employed individuals, farmers, traders, and business owners who may not have formal income documentation. For agricultural gold loans, special schemes with lower interest rates may be available at select branches." },
          { q: "Can NRIs avail a gold loan?", a: "NRIs can avail gold loans by authorizing a resident relative to pledge gold on their behalf through a valid Power of Attorney (PoA). The PoA holder must be KYC-compliant and present at the branch. Loan disbursement is made to the PoA holder's Indian bank account as per FEMA guidelines." },
        ],
      },
      {
        id: "repayment", label: "Repayment", icon: "💳",
        faqs: [
          { q: "What are the repayment options available for gold loans?", a: "Shree Ganesh Finance offers multiple repayment structures: (1) EMI-based repayment, (2) Bullet Repayment — pay the entire principal + interest at the end of tenure, (3) Interest-only EMI — pay only monthly interest and repay principal at maturity, and (4) Flexi Repayment — under the Gold Flexi Credit scheme." },
          { q: "What happens if I miss an EMI or cannot repay my gold loan?", a: "If you miss an EMI, a penal interest will be levied on the overdue amount. Shree Ganesh Finance will proactively reach out to help you find a solution — including EMI restructuring or tenure extension. Auction of pledged gold is a last resort and is conducted transparently as per RBI guidelines." },
          { q: "Can I renew my gold loan instead of repaying it fully?", a: "Yes. You can renew your gold loan at maturity without bringing your gold back to the branch. Our team will re-evaluate the gold's current market value and renew the loan accordingly. If gold prices have increased, you may be eligible for a higher loan amount upon renewal." },
          { q: "How do I make repayments? Are there digital payment options?", a: "Yes. Shree Ganesh Finance accepts repayments through NEFT/RTGS/IMPS bank transfers, UPI (GPay, PhonePe, Paytm), cheque or demand draft at any branch, and auto-debit via NACH mandate. You will also receive SMS and email reminders before your EMI due date." },
        ],
      },
      {
        id: "other-loans", label: "Other Products", icon: "📋",
        faqs: [
          { q: "What types of loans and financial services does Shree Ganesh Finance offer?", a: "Shree Ganesh Finance is a full-service NBFC offering: Gold Loans, Gold Flexi Credit, Gold Loan at Home, Housing Finance, Personal Loans, Small Business Loans (MSME), SME Loans, Corporate Business Loans, Vehicle Loans, Insurance (IRDAI Corporate Agent), Mutual Fund Distribution (AMFI-registered), Credit Score Check, and Domestic & International Money Transfer." },
          { q: "How long does it take to get a personal loan approved?", a: "Personal loan applications are processed within 24–48 working hours of document submission. For applicants with strong credit profiles (CIBIL 750+) and complete documentation, approvals can be as fast as same-day. Disbursement is made directly to your bank account within 24 hours of sanction." },
          { q: "Does Shree Ganesh Finance offer a balance transfer facility for home loans?", a: "Yes. You can transfer your existing home loan from any bank or NBFC to Shree Ganesh Finance at a potentially lower interest rate, along with a top-up loan option. RBI mandates zero prepayment penalty on floating-rate home loans, so switching is typically cost-free." },
          { q: "Can I invest in Mutual Funds through Shree Ganesh Finance?", a: "Yes. Shree Ganesh Finance is an AMFI-registered Mutual Fund Distributor. We offer SIP, lump sum, and STP investments across equity, debt, hybrid, ELSS (tax-saving), and index fund schemes from all major SEBI-registered AMCs." },
        ],
      },
      {
        id: "about", label: "About Us", icon: "🏢",
        faqs: [
          { q: "Is Shree Ganesh Finance a regulated financial institution?", a: "Yes. Shree Ganesh Finance is an RBI-registered Non-Banking Financial Company (NBFC). We operate strictly within the regulatory framework prescribed by the RBI, including KYC/AML norms under PMLA, fair lending practices, and safe custody guidelines for pledged gold. We are also a licensed IRDAI Corporate Agent and AMFI-registered distributor." },
          { q: "Where are Shree Ganesh Finance branches located?", a: "Shree Ganesh Finance has a growing network of branches across India. To find the nearest branch, visit our Contact page or call our toll-free number. Our Gold Loan at Home service also extends our reach to customers in serviceable pincodes." },
          { q: "How do I contact Shree Ganesh Finance customer support?", a: "You can reach us through: (1) Visit any branch (Mon–Sat, 9:30 AM – 6:00 PM), (2) Submit an inquiry through our Contact page, (3) Email us at info@shreegf.com, or (4) Request a callback through our website." },
          { q: "How does Shree Ganesh Finance protect my personal data?", a: "Shree Ganesh Finance is fully compliant with the Information Technology Act and RBI data protection guidelines. Your personal data is stored securely and used only for providing our financial services. We do not share your information with third parties without your consent, except as required by law." },
        ],
      },
    ],
  },

  // ─── HINDI ───────────────────────────────────────────────────────
  hi: {
    badge: "सहायता केंद्र",
    heading: "अक्सर पूछे जाने वाले",
    headingLine2: "प्रश्न",
    subtext: "श्री गणेश फाइनेंस के उत्पादों और सेवाओं के बारे में सब कुछ जानें। अपना उत्तर नहीं मिला?",
    subtextLink: "हमारी टीम से बात करें।",
    stats: [
      { value: "27+", label: "प्रश्नों के उत्तर" },
      { value: "24 घं.", label: "प्रतिक्रिया समय" },
      { value: "RBI", label: "विनियमित NBFC" },
    ],
    questionsLabel: "इस श्रेणी में प्रश्न",
    stillHave: "अभी भी प्रश्न हैं?",
    expertHeading: "हमारे विशेषज्ञ आपकी सहायता के लिए तैयार हैं",
    expertSub: "श्री गणेश फाइनेंस के वित्तीय सलाहकार से बात करें — सोम से शनि, सुबह 9:30 – शाम 6:00।",
    contactBtn: "संपर्क करें",
    callBtn: "टोल-फ्री कॉल करें",
    categories: [
      {
        id: "gold-loan", label: "गोल्ड लोन", icon: "🏅",
        faqs: [
          { q: "गोल्ड लोन क्या है और श्री गणेश फाइनेंस में यह कैसे काम करता है?", a: "गोल्ड लोन एक सुरक्षित ऋण है जहाँ आप अपने सोने के आभूषण (18–22 कैरेट) जमानत के रूप में गिरवी रखते हैं और तुरंत फंड प्राप्त करते हैं। हमारे प्रमाणित मूल्यांकक शाखा में या आपके दरवाजे पर सोने का मूल्यांकन करते हैं, और ऋण राशि — सोने के बाजार मूल्य का 75% तक (RBI के LTV नियमों के अनुसार) — कुछ ही घंटों में आपके बैंक खाते में जमा कर दी जाती है। आय प्रमाण या CIBIL स्कोर की आवश्यकता नहीं है।" },
          { q: "मुझे कम से कम और अधिकतम गोल्ड लोन राशि कितनी मिल सकती है?", a: "श्री गणेश फाइनेंस ₹1,500 से शुरू होने वाले गोल्ड लोन प्रदान करता है, कोई ऊपरी सीमा नहीं — अधिकतम राशि आपके सोने के वजन, शुद्धता (18–22 कैरेट), और वर्तमान बाजार दर पर निर्भर करती है, RBI-अनिवार्य 75% LTV अनुपात के अधीन।" },
          { q: "गोल्ड लोन पर ब्याज दर क्या है?", a: "हमारी गोल्ड लोन ब्याज दरें 9.99% प्रति वर्ष से शुरू होती हैं। सटीक दर आपके चुने हुए लोन योजना पर निर्भर करती है। सभी दरें और शुल्क RBI के उचित उधार दिशानिर्देशों के अनुसार अग्रिम रूप से प्रकट किए जाते हैं।" },
          { q: "गोल्ड लोन के लिए आवेदन करने के लिए कौन से दस्तावेज़ चाहिए?", a: "गोल्ड लोन के लिए न्यूनतम दस्तावेज़ीकरण की आवश्यकता है: (1) आधार कार्ड — PMLA नियमों के तहत अनिवार्य, (2) PAN कार्ड — ₹1 लाख से अधिक के लोन के लिए, (3) एक हालिया पासपोर्ट साइज़ फोटो, और (4) मूल्यांकन के लिए आपके सोने के आभूषण। सैलरी स्लिप, बैंक स्टेटमेंट या ITR की आवश्यकता नहीं है।" },
          { q: "क्या श्री गणेश फाइनेंस के पास मेरा सोना सुरक्षित है?", a: "बिल्कुल। सभी गिरवी सोना RBI-अनुपालन, उच्च-सुरक्षा बीमाकृत तिजोरियों में 24×7 निगरानी के साथ संग्रहित है। पूर्ण ऋण चुकाने पर सोना उसी स्थिति में वापस किया जाता है।" },
          { q: "क्या मैं कार्यकाल समाप्त होने से पहले अपना गोल्ड लोन चुका सकता हूँ?", a: "हाँ। श्री गणेश फाइनेंस किसी भी समय बिना किसी पूर्व-भुगतान दंड या फोरक्लोजर शुल्क के आंशिक भुगतान और पूर्ण पूर्व-बंद करने की अनुमति देता है। पूर्ण चुकाने पर आपके सोने के आभूषण तुरंत वापस कर दिए जाते हैं।" },
          { q: "घर पर गोल्ड लोन सेवा क्या है?", a: "हमारी घर पर गोल्ड लोन सेवा पूरी गोल्ड लोन प्रक्रिया आपके दरवाजे पर लाती है। एक प्रशिक्षित कार्यकारी आपके घर आता है, प्रमाणित उपकरणों से सोने का मूल्यांकन करता है, और उसी यात्रा में ऋण आपके बैंक खाते में जमा करता है। सप्ताह में 6 दिन उपलब्ध।" },
        ],
      },
      {
        id: "eligibility", label: "पात्रता", icon: "✅",
        faqs: [
          { q: "श्री गणेश फाइनेंस में लोन के लिए कौन पात्र है?", a: "18 वर्ष और उससे अधिक आयु का कोई भी भारतीय निवासी गोल्ड लोन के लिए आवेदन करने के लिए पात्र है। गोल्ड लोन के लिए कोई न्यूनतम आय आवश्यकता नहीं है — सोने का मूल्य एकमात्र पात्रता मानदंड है।" },
          { q: "क्या गोल्ड लोन पाने के लिए अच्छा CIBIL स्कोर चाहिए?", a: "नहीं। श्री गणेश फाइनेंस में गोल्ड लोन के लिए किसी न्यूनतम CIBIL स्कोर की आवश्यकता नहीं है। चूँकि लोन आपके सोने के आभूषणों के विरुद्ध सुरक्षित है, इसलिए आपका क्रेडिट इतिहास निर्धारक कारक नहीं है।" },
          { q: "क्या स्व-रोजगार व्यक्ति या किसान लोन के लिए आवेदन कर सकते हैं?", a: "हाँ। गोल्ड लोन विशेष रूप से स्व-रोजगार व्यक्तियों, किसानों, व्यापारियों और व्यवसाय मालिकों के लिए फायदेमंद है जिनके पास औपचारिक आय दस्तावेज नहीं हो सकते। कृषि गोल्ड लोन के लिए विशेष योजनाएं उपलब्ध हो सकती हैं।" },
          { q: "क्या NRI गोल्ड लोन ले सकते हैं?", a: "NRI एक वैध पावर ऑफ अटॉर्नी (PoA) के माध्यम से किसी निवासी रिश्तेदार को अपनी ओर से सोना गिरवी रखने के लिए अधिकृत करके गोल्ड लोन प्राप्त कर सकते हैं। FEMA दिशानिर्देशों के अनुसार ऋण वितरण PoA धारक के भारतीय बैंक खाते में किया जाता है।" },
        ],
      },
      {
        id: "repayment", label: "पुनर्भुगतान", icon: "💳",
        faqs: [
          { q: "गोल्ड लोन के लिए कौन से पुनर्भुगतान विकल्प उपलब्ध हैं?", a: "श्री गणेश फाइनेंस कई पुनर्भुगतान संरचनाएँ प्रदान करता है: (1) EMI-आधारित पुनर्भुगतान, (2) बुलेट पुनर्भुगतान — कार्यकाल के अंत में पूरी मूल राशि + ब्याज का भुगतान, (3) केवल ब्याज EMI, और (4) फ्लेक्सी पुनर्भुगतान — गोल्ड फ्लेक्सी क्रेडिट योजना के तहत।" },
          { q: "यदि मैं EMI चूक जाता हूँ तो क्या होगा?", a: "यदि आप EMI चूकते हैं, तो बकाया राशि पर दंड ब्याज लगाया जाएगा। श्री गणेश फाइनेंस आपको समाधान खोजने में मदद करने के लिए सक्रिय रूप से संपर्क करेगा — जिसमें EMI पुनर्गठन या कार्यकाल विस्तार शामिल है। सोने की नीलामी अंतिम उपाय है।" },
          { q: "क्या मैं पूरी तरह चुकाने के बजाय गोल्ड लोन नवीनीकृत कर सकता हूँ?", a: "हाँ। आप परिपक्वता पर अपना गोल्ड लोन बिना शाखा में सोना वापस लाए नवीनीकृत कर सकते हैं। हमारी टीम सोने के वर्तमान बाजार मूल्य का पुनर्मूल्यांकन करेगी। यदि सोने की कीमतें बढ़ी हैं, तो आप नवीनीकरण पर अधिक ऋण राशि के पात्र हो सकते हैं।" },
          { q: "मैं पुनर्भुगतान कैसे करूँ? क्या डिजिटल भुगतान विकल्प उपलब्ध हैं?", a: "हाँ। श्री गणेश फाइनेंस NEFT/RTGS/IMPS, UPI (GPay, PhonePe, Paytm), चेक या डिमांड ड्राफ्ट, और NACH मैंडेट के माध्यम से पुनर्भुगतान स्वीकार करता है। आपको EMI देय तिथि से पहले SMS और ईमेल रिमाइंडर भी प्राप्त होंगे।" },
        ],
      },
      {
        id: "other-loans", label: "अन्य उत्पाद", icon: "📋",
        faqs: [
          { q: "श्री गणेश फाइनेंस कौन से लोन और वित्तीय सेवाएं प्रदान करता है?", a: "श्री गणेश फाइनेंस एक पूर्ण-सेवा NBFC है जो प्रदान करता है: गोल्ड लोन, गोल्ड फ्लेक्सी क्रेडिट, घर पर गोल्ड लोन, हाउसिंग फाइनेंस, पर्सनल लोन, स्माल बिजनेस लोन (MSME), SME लोन, कॉर्पोरेट बिजनेस लोन, वाहन लोन, बीमा, म्युचुअल फंड, क्रेडिट स्कोर चेक, और मनी ट्रांसफर।" },
          { q: "पर्सनल लोन स्वीकृत होने में कितना समय लगता है?", a: "पर्सनल लोन आवेदन दस्तावेज़ जमा करने के 24–48 कार्य घंटों के भीतर संसाधित किए जाते हैं। मजबूत क्रेडिट प्रोफाइल (CIBIL 750+) वाले आवेदकों के लिए उसी दिन स्वीकृति संभव है।" },
          { q: "क्या श्री गणेश फाइनेंस होम लोन बैलेंस ट्रांसफर सुविधा प्रदान करता है?", a: "हाँ। आप किसी भी बैंक या NBFC से अपना मौजूदा होम लोन श्री गणेश फाइनेंस में संभावित रूप से कम ब्याज दर पर ट्रांसफर कर सकते हैं, साथ ही टॉप-अप लोन विकल्प के साथ।" },
          { q: "क्या मैं श्री गणेश फाइनेंस के माध्यम से म्युचुअल फंड में निवेश कर सकता हूँ?", a: "हाँ। श्री गणेश फाइनेंस एक AMFI-पंजीकृत म्युचुअल फंड वितरक है। हम सभी प्रमुख SEBI-पंजीकृत AMC से इक्विटी, डेट, हाइब्रिड, ELSS (कर-बचत), और इंडेक्स फंड योजनाओं में SIP, एकमुश्त और STP निवेश प्रदान करते हैं।" },
        ],
      },
      {
        id: "about", label: "हमारे बारे में", icon: "🏢",
        faqs: [
          { q: "क्या श्री गणेश फाइनेंस एक विनियमित वित्तीय संस्था है?", a: "हाँ। श्री गणेश फाइनेंस एक RBI-पंजीकृत गैर-बैंकिंग वित्तीय कंपनी (NBFC) है। हम RBI द्वारा निर्धारित नियामक ढांचे के भीतर सख्ती से काम करते हैं। हम एक लाइसेंस प्राप्त IRDAI कॉर्पोरेट एजेंट और AMFI-पंजीकृत वितरक भी हैं।" },
          { q: "श्री गणेश फाइनेंस की शाखाएं कहाँ स्थित हैं?", a: "श्री गणेश फाइनेंस की पूरे भारत में शाखाओं का एक बढ़ता हुआ नेटवर्क है। निकटतम शाखा खोजने के लिए, हमारे संपर्क पृष्ठ पर जाएं या हमारे टोल-फ्री नंबर पर कॉल करें।" },
          { q: "मैं श्री गणेश फाइनेंस ग्राहक सहायता से कैसे संपर्क करूँ?", a: "आप हमसे इस प्रकार संपर्क कर सकते हैं: (1) किसी भी शाखा में जाएं (सोम–शनि, 9:30 AM – 6:00 PM), (2) संपर्क पृष्ठ के माध्यम से प्रश्न सबमिट करें, (3) info@shreegf.com पर ईमेल करें।" },
          { q: "श्री गणेश फाइनेंस मेरे व्यक्तिगत डेटा की सुरक्षा कैसे करता है?", a: "श्री गणेश फाइनेंस सूचना प्रौद्योगिकी अधिनियम और RBI डेटा सुरक्षा दिशानिर्देशों का पूरी तरह पालन करता है। आपका व्यक्तिगत डेटा सुरक्षित रूप से संग्रहीत किया जाता है और केवल हमारी वित्तीय सेवाएं प्रदान करने के लिए उपयोग किया जाता है।" },
        ],
      },
    ],
  },

  // ─── MARATHI ─────────────────────────────────────────────────────
  mr: {
    badge: "सहाय्य केंद्र",
    heading: "वारंवार विचारले जाणारे",
    headingLine2: "प्रश्न",
    subtext: "श्री गणेश फायनान्सच्या उत्पादने आणि सेवांबद्दल सर्वकाही जाणून घ्या. उत्तर सापडत नाही?",
    subtextLink: "आमच्या टीमशी बोला.",
    stats: [{ value: "27+", label: "प्रश्नांची उत्तरे" }, { value: "24 तास", label: "प्रतिसाद वेळ" }, { value: "RBI", label: "नियंत्रित NBFC" }],
    questionsLabel: "या श्रेणीत प्रश्न",
    stillHave: "अजूनही प्रश्न आहेत?",
    expertHeading: "आमचे तज्ञ मदतीसाठी येथे आहेत",
    expertSub: "श्री गणेश फायनान्सच्या आर्थिक सल्लागाराशी बोला — सोम ते शनि, सकाळी 9:30 – संध्याकाळी 6:00.",
    contactBtn: "संपर्क करा",
    callBtn: "टोल-फ्री कॉल करा",
    categories: [
      { id: "gold-loan", label: "गोल्ड लोन", icon: "🏅", faqs: [
        { q: "गोल्ड लोन म्हणजे काय आणि श्री गणेश फायनान्समध्ये ते कसे कार्य करते?", a: "गोल्ड लोन हे एक सुरक्षित कर्ज आहे जिथे तुम्ही तुमचे सोन्याचे दागिने (18–22 कॅरेट) तारण म्हणून गहाण ठेवता आणि त्वरित निधी मिळवता. आमचे प्रमाणित मूल्यांकक शाखेत किंवा तुमच्या दारात सोन्याचे मूल्यांकन करतात आणि कर्जाची रक्कम काही तासांत तुमच्या बँक खात्यात जमा केली जाते." },
        { q: "मला किमान आणि जास्तीत जास्त गोल्ड लोन रक्कम किती मिळू शकते?", a: "श्री गणेश फायनान्स ₹1,500 पासून सुरू होणारे गोल्ड लोन देते, कोणतीही वरची मर्यादा नाही — कमाल रक्कम तुमच्या सोन्याचे वजन, शुद्धता (18–22 कॅरेट) आणि वर्तमान बाजार दरावर अवलंबून असते, RBI च्या 75% LTV गुणोत्तरानुसार." },
        { q: "गोल्ड लोनवर व्याज दर किती आहे?", a: "आमचे गोल्ड लोन व्याज दर 9.99% प्रति वर्षापासून सुरू होतात. सर्व दर आणि शुल्क RBI च्या उचित कर्ज मार्गदर्शक तत्त्वांनुसार आगाऊ उघड केले जातात." },
        { q: "गोल्ड लोनसाठी अर्ज करण्यासाठी कोणती कागदपत्रे लागतात?", a: "गोल्ड लोनसाठी किमान कागदपत्रे लागतात: (1) आधार कार्ड — PMLA नियमांनुसार अनिवार्य, (2) पॅन कार्ड — ₹1 लाखांवरील कर्जासाठी, (3) एक अलीकडील पासपोर्ट आकाराचा फोटो, आणि (4) मूल्यांकनासाठी सोन्याचे दागिने." },
        { q: "श्री गणेश फायनान्सकडे माझे सोने सुरक्षित आहे का?", a: "निश्चितच. सर्व गहाण सोने RBI-अनुपालित, उच्च-सुरक्षा विमाकृत तिजोरींमध्ये 24×7 देखरेखीसह ठेवले जाते. पूर्ण कर्ज परतफेडीनंतर सोने त्याच स्थितीत परत केले जाते." },
        { q: "मी कार्यकाळ संपण्यापूर्वी माझे गोल्ड लोन फेडू शकतो का?", a: "होय. श्री गणेश फायनान्स कोणत्याही वेळी कोणत्याही पूर्व-भुगतान दंडाशिवाय आंशिक भुगतान आणि पूर्ण पूर्व-बंद करण्याची परवानगी देते." },
        { q: "घरी गोल्ड लोन सेवा काय आहे?", a: "आमची घरी गोल्ड लोन सेवा संपूर्ण गोल्ड लोन प्रक्रिया तुमच्या दारात आणते. एक प्रशिक्षित कार्यकारी तुमच्या घरी येतो, सोन्याचे मूल्यांकन करतो आणि त्याच भेटीत कर्ज तुमच्या बँक खात्यात जमा करतो." },
      ]},
      { id: "eligibility", label: "पात्रता", icon: "✅", faqs: [
        { q: "श्री गणेश फायनान्समध्ये कर्जासाठी कोण पात्र आहे?", a: "18 वर्षे व त्यावरील कोणताही भारतीय रहिवासी गोल्ड लोनसाठी अर्ज करण्यास पात्र आहे. गोल्ड लोनसाठी कोणतीही किमान उत्पन्न आवश्यकता नाही — सोन्याचे मूल्य हाच एकमेव पात्रता निकष आहे." },
        { q: "गोल्ड लोन मिळवण्यासाठी चांगला CIBIL स्कोर लागतो का?", a: "नाही. श्री गणेश फायनान्समध्ये गोल्ड लोनसाठी कोणताही किमान CIBIL स्कोर आवश्यक नाही. कर्ज तुमच्या सोन्याविरुद्ध सुरक्षित असल्याने, तुमचा क्रेडिट इतिहास निर्धारक घटक नाही." },
        { q: "स्वयंरोजगारित व्यक्ती किंवा शेतकरी कर्जासाठी अर्ज करू शकतात का?", a: "होय. गोल्ड लोन विशेषतः स्वयंरोजगारित व्यक्ती, शेतकरी, व्यापारी आणि व्यवसायिकांसाठी फायदेशीर आहे ज्यांच्याकडे औपचारिक उत्पन्नाची कागदपत्रे नसतील." },
        { q: "NRI गोल्ड लोन घेऊ शकतात का?", a: "NRI वैध पॉवर ऑफ अटॉर्नी (PoA) द्वारे निवासी नातेवाईकाला त्यांच्या वतीने सोने गहाण ठेवण्यास अधिकृत करून गोल्ड लोन घेऊ शकतात. FEMA मार्गदर्शक तत्त्वांनुसार कर्ज वितरण PoA धारकाच्या भारतीय बँक खात्यात केले जाते." },
      ]},
      { id: "repayment", label: "परतफेड", icon: "💳", faqs: [
        { q: "गोल्ड लोनसाठी कोणते परतफेड पर्याय उपलब्ध आहेत?", a: "श्री गणेश फायनान्स अनेक परतफेड संरचना देते: (1) EMI-आधारित परतफेड, (2) बुलेट रिपेमेंट — कार्यकाळाच्या शेवटी संपूर्ण मूळ रक्कम + व्याज, (3) केवळ व्याज EMI, आणि (4) फ्लेक्सी रिपेमेंट — गोल्ड फ्लेक्सी क्रेडिट योजनेंतर्गत." },
        { q: "जर मी EMI चुकवली तर काय होईल?", a: "EMI चुकल्यास, थकीत रकमेवर दंड व्याज आकारले जाईल. श्री गणेश फायनान्स तुम्हाला उपाय शोधण्यात मदत करण्यासाठी सक्रियपणे संपर्क करेल — EMI पुनर्रचना किंवा कार्यकाळ वाढवणे यासह." },
        { q: "मी पूर्णपणे फेडण्याऐवजी गोल्ड लोन नूतनीकृत करू शकतो का?", a: "होय. तुम्ही परिपक्वतेवर शाखेत सोने न आणता गोल्ड लोन नूतनीकृत करू शकता. सोन्याच्या किमती वाढल्या असतील तर नूतनीकरणावर अधिक कर्ज रक्कम मिळू शकते." },
        { q: "मी परतफेड कशी करू? डिजिटल पेमेंट पर्याय उपलब्ध आहेत का?", a: "होय. श्री गणेश फायनान्स NEFT/RTGS/IMPS, UPI (GPay, PhonePe, Paytm), चेक किंवा डिमांड ड्राफ्ट आणि NACH मँडेट द्वारे परतफेड स्वीकारते." },
      ]},
      { id: "other-loans", label: "इतर उत्पादने", icon: "📋", faqs: [
        { q: "श्री गणेश फायनान्स कोणत्या प्रकारचे कर्ज आणि वित्तीय सेवा देते?", a: "श्री गणेश फायनान्स एक पूर्ण-सेवा NBFC आहे जे देते: गोल्ड लोन, गोल्ड फ्लेक्सी क्रेडिट, घरी गोल्ड लोन, हाऊसिंग फायनान्स, वैयक्तिक कर्ज, लघु व्यवसाय कर्ज, SME कर्ज, कॉर्पोरेट कर्ज, वाहन कर्ज, विमा, म्युच्युअल फंड, क्रेडिट स्कोर आणि मनी ट्रान्सफर." },
        { q: "वैयक्तिक कर्ज मंजूर होण्यास किती वेळ लागतो?", a: "कागदपत्रे सादर केल्यापासून 24–48 कामाच्या तासांत वैयक्तिक कर्ज अर्ज प्रक्रिया केले जातात. मजबूत क्रेडिट प्रोफाइल असलेल्या अर्जदारांसाठी त्याच दिवशी मंजुरी शक्य आहे." },
        { q: "श्री गणेश फायनान्स गृह कर्जासाठी बॅलन्स ट्रान्सफर सुविधा देते का?", a: "होय. तुम्ही कोणत्याही बँक किंवा NBFC कडून तुमचे विद्यमान गृह कर्ज श्री गणेश फायनान्समध्ये कमी व्याज दराने हस्तांतरित करू शकता, टॉप-अप कर्जाच्या पर्यायासह." },
        { q: "मी श्री गणेश फायनान्सद्वारे म्युच्युअल फंडमध्ये गुंतवणूक करू शकतो का?", a: "होय. श्री गणेश फायनान्स AMFI-नोंदणीकृत म्युच्युअल फंड वितरक आहे. आम्ही सर्व प्रमुख SEBI-नोंदणीकृत AMC कडून SIP, एकरकमी आणि STP गुंतवणूक देतो." },
      ]},
      { id: "about", label: "आमच्याबद्दल", icon: "🏢", faqs: [
        { q: "श्री गणेश फायनान्स एक नियंत्रित वित्तीय संस्था आहे का?", a: "होय. श्री गणेश फायनान्स RBI-नोंदणीकृत नॉन-बँकिंग फायनान्शियल कंपनी (NBFC) आहे. आम्ही RBI द्वारे निर्धारित नियामक चौकटीत काटेकोरपणे काम करतो." },
        { q: "श्री गणेश फायनान्सच्या शाखा कुठे आहेत?", a: "श्री गणेश फायनान्सचे भारतभर शाखांचे वाढते जाळे आहे. जवळची शाखा शोधण्यासाठी आमच्या संपर्क पृष्ठाला भेट द्या किंवा टोल-फ्री नंबरवर कॉल करा." },
        { q: "मी श्री गणेश फायनान्स ग्राहक सहाय्याशी कसे संपर्क साधू?", a: "तुम्ही आमच्याशी संपर्क साधू शकता: (1) कोणत्याही शाखेला भेट द्या (सोम–शनि, 9:30 AM – 6:00 PM), (2) संपर्क पृष्ठाद्वारे चौकशी सादर करा, (3) info@shreegf.com वर ईमेल करा." },
        { q: "श्री गणेश फायनान्स माझ्या वैयक्तिक डेटाचे संरक्षण कसे करते?", a: "श्री गणेश फायनान्स माहिती तंत्रज्ञान कायदा आणि RBI डेटा संरक्षण मार्गदर्शक तत्त्वांचे पूर्णपणे पालन करते. तुमचा वैयक्तिक डेटा सुरक्षितपणे संग्रहित केला जातो." },
      ]},
    ],
  },

  // ─── GUJARATI ────────────────────────────────────────────────────
  gu: {
    badge: "સહાય કેન્દ્ર",
    heading: "વારંવાર પૂછાતા",
    headingLine2: "પ્રશ્નો",
    subtext: "શ્રી ગણેશ ફાઇનાન્સના ઉત્પાદો અને સેવાઓ વિશે બધું જાણો. જવાબ ન મળ્યો?",
    subtextLink: "અમારી ટીમ સાથે વાત કરો.",
    stats: [{ value: "27+", label: "પ્રશ્નોના જવાબ" }, { value: "24 કલાક", label: "પ્રતિભાવ સમય" }, { value: "RBI", label: "નિયંત્રિત NBFC" }],
    questionsLabel: "આ શ્રેણીમાં પ્રશ્નો",
    stillHave: "હજુ પ્રશ્નો છે?",
    expertHeading: "અમારા નિષ્ણાતો મદદ માટે અહીં છે",
    expertSub: "શ્રી ગણેશ ફાઇનાન્સના નાણાકીય સલાહકાર સાથે વાત કરો — સોમ થી શનિ, સવારે 9:30 – સાંજે 6:00.",
    contactBtn: "સંપર્ક કરો",
    callBtn: "ટોલ-ફ્રી કૉલ કરો",
    categories: [
      { id: "gold-loan", label: "ગોલ્ડ લોન", icon: "🏅", faqs: [
        { q: "ગોલ્ડ લોન શું છે અને શ્રી ગણેશ ફાઇનાન્સમાં તે કેવી રીતે કામ કરે છે?", a: "ગોલ્ડ લોન એ એક સુરક્ષિત લોન છે જ્યાં તમે તમારા સોનાના ઘરેણાં (18–22 કેરેટ) જામીન તરીકે ગીરો મૂકો છો અને તત્કાળ ભંડોળ મેળવો છો. RBI ના LTV ધોરણ મુજબ સોનાના બજાર મૂલ્યના 75% સુધી લોનની રકમ ચૂકવવામાં આવે છે." },
        { q: "મને ઓછામાં ઓછી અને વધુમાં વધુ ગોલ્ડ લોન રકમ કેટલી મળી શકે?", a: "શ્રી ગણેશ ફાઇનાન્સ ₹1,500 થી શરૂ થતી ગોલ્ડ લોન આપે છે, ઉચ્ચ મર્યાદા નથી — મહત્તમ રકમ RBI ના 75% LTV ગુણોત્તર હેઠળ સોનાના વજન, શુદ્ધતા અને વર્તમાન બજાર દર પર આધારિત છે." },
        { q: "ગોલ્ડ લોન પર વ્યાજ દર શું છે?", a: "અમારા ગોલ્ડ લોન વ્યાજ દર 9.99% પ્રતિ વર્ષથી શરૂ થાય છે. RBI ના ન્યાયી ધિરાણ માર્ગદર્શિકા અનુસાર તમામ દરો અને ચાર્જ અગાઉથી જાહેર કરવામાં આવે છે." },
        { q: "ગોલ્ડ લોન માટે અરજી કરવા માટે કયા દસ્તાવેજો જરૂરી છે?", a: "ગોલ્ડ લોનમાં ઓછામાં ઓછા દસ્તાવેજો જરૂરી છે: (1) આધાર કાર્ડ, (2) PAN કાર્ડ — ₹1 લાખ ઉપરની લોન માટે, (3) તાજેતરનો ફોટો, (4) સોનાના ઘરેણાં." },
        { q: "શ્રી ગણેશ ફાઇનાન્સ પાસે મારું સોનું સુરક્ષિત છે?", a: "બિલ્કુલ. તમામ ગીરો સોનું RBI-સંગ્ત, ઉચ્ચ-સુરક્ષા વીમાકૃત તિજોરીઓમાં 24×7 સ્ત્રીની સાથે સ્ટોર છે. સંપૂર્ણ ચૂકવણી પછી સોનું એ જ સ્થિતિમાં પરત આવે છે." },
        { q: "શું હું મુદત સમાપ્ત થાય તે પહેલા ગોલ્ડ લોન ભરી શકું?", a: "હા. શ્રી ગણેશ ફાઇનાન્સ કોઈ પૂર્વ-ચૂકવણી દંડ વિના ગમે ત્યારે આંશિક ભુગતાન અને સંપૂર્ણ પૂર્વ-બંધ કરવાની પરવાનગી આપે છે." },
        { q: "ઘરે ગોલ્ડ લોન સેવા શું છે?", a: "અમારી ઘરે ગોલ્ડ લોન સેવા સમગ્ર ગોલ્ડ લોન પ્રક્રિયા તમારા ઘરે લાવે છે. અઠવાડિયામાં 6 દિવસ ઉપલ. એક પ્રશિક્ષિત અધિકારી તમારા ઘરે આવે છે, સોનાનું મૂલ્ય ચૂકવે છે, અને એ જ મુલાકાત દરમ્યાન ભંડોળ તમારા ખાતામાં ટ્રાન્સ કરે છે." },
      ]},
      { id: "eligibility", label: "પાત્રતા", icon: "✅", faqs: [
        { q: "શ્રી ગણેશ ફાઇનાન્સ ખાતે લોન માટે અરજી કરવા કોણ પાત્ર છે?", a: "18 વર્ષ અને તેથી વધુ ઉંમરના કોઈ પણ ભારતીય નિવાસી ગોલ્ડ લોન માટે અરજી કરવા પાત્ર છે. ગોલ્ડ લોન માટે ન્યૂનતમ આવક જરૂરિયાત નથી." },
        { q: "ગોલ્ડ લોન મેળવવા માટે સારો CIBIL સ્કોર જોઈએ?", a: "ના. ગોલ્ડ લોન માટે ન્યૂનતમ CIBIL સ્કોર જરૂરી નથી. લોન સોનાના ઘરેણા સામે સુરક્ષિત છે, તેથી ક્રેડિટ ઇતિહાસ નિર્ધારક નથી." },
        { q: "સ્વ-રોજગાર વ્યક્તિ અથવા ખેડૂત લોન માટે અરજી કરી શકે?", a: "હા. ગોલ્ડ લોન ખાસ કરીને સ્વ-રોજગાર વ્યક્તિઓ, ખેડૂતો, વેપારીઓ અને ઉદ્યોગસાહસ માટે ફાયદાકારક છે." },
        { q: "NRI ગોલ્ડ લોન લઈ શકે?", a: "NRI વૈધ Power of Attorney (PoA) દ્વારા રહેઠાણ ધરાવતા સગા-સ્નેહીઓ દ્વારા સોનું ગીરો મૂકીને ગોલ્ડ લોન લઈ શકે." },
      ]},
      { id: "repayment", label: "ચૂકવણી", icon: "💳", faqs: [
        { q: "ગોલ્ડ લોન માટે કઈ ચૂકવણી વિકલ્પો ઉપલ છે?", a: "શ્રી ગણેશ ફાઇનાન્સ: (1) EMI-આધારિત ચૂકવણી, (2) બુલેટ ચૂકવણી, (3) ફક્ત વ્યાજ EMI, (4) ફ્લેક્સી ચૂકવણી — ગોલ્ડ ફ્લેક્સી ક્રેડિટ અંતર્ગત ઓફર કરે છે." },
        { q: "જો હું EMI ચૂકી જઈ તો શું થાય?", a: "EMI ચૂકી જવા પર, બાકી રકમ પર દંડ વ્યાજ લાગશે. શ્રી ગણેશ ફાઇનાન્સ EMI પુનઃરચના અને કાર્યકાળ વિસ્તાર સહિત ઉકેલ ​​શોધવામાં સ​​ (proactively) સ​​​​ (contact) ​ ​ (you) ​ ​ (will) ​." },
        { q: "ભૂ​ (fully) ​ ​ (repaying) ​ ​ (instead) ​ ​ (renew) ​ ​ (my gold loan) ​ ​ (can I) ​?", a: "હા. પ​​ (maturity) ​ ​ (at) ​ ​ (branch) ​ ​ (to) ​ ​ (gold) ​ ​ (bringing) ​ ​ (without) ​ ​ (renew) ​ ​ (loan) ​ ​ (can) ​ ​ (you) ​." },
        { q: "ચૂકવણી કેવી રીતે કરવી? ડિજિટલ ભૂ (payment) ​ ​ (options) ​ ​ (available) ​ ​ (are) ​?", a: "હા. NEFT/RTGS/IMPS, UPI (GPay, PhonePe, Paytm), ​ (cheque) ​, ​ (NACH mandate) ​ ​ (through) ​ ​ (repayments) ​ ​ (accepts) ​ ​ (Finance Ganesh Shree) ​." },
      ]},
      { id: "other-loans", label: "અન્ય ઉત્પાદો", icon: "📋", faqs: [
        { q: "શ્રી ગણેશ ફાઇનાન્સ કઈ સ​ (types) ​ ​ (of) ​ ​ (loans) ​ ​ (and) ​ ​ (financial services) ​ ​ (offer) ​ ​ (does) ​?", a: "શ્રી ગણેશ ફ: ​ (Gold Loan) ​, ​ (Gold Flexi Credit) ​, ​ (Gold Loan at Home) ​, ​ (Housing Finance) ​, ​ (Personal Loan) ​, ​ (SME Loan) ​, ​ (Vehicle Loan) ​, ​ (Insurance) ​, ​ (Mutual Funds) ​, ​ (Money Transfer) ​." },
        { q: "પ​ (personal loan) ​ ​ (approved) ​ ​ (get to) ​ ​ (long how) ​ ​ (does it take) ​?", a: "24–48 ​ (working hours) ​ ​ (within) ​ ​ (processed) ​ ​ (are) ​ ​ (applications) ​ ​ (loan personal) ​." },
        { q: "શ​ (balance transfer) ​ ​ (home loan) ​ ​ (for) ​ ​ (offer) ​ ​ (does) ​ ​ (Finance Ganesh Shree) ​?", a: "​ (Yes) ​. ​ (lower interest rate) ​ ​ (at) ​ ​ (Finance Ganesh Shree to) ​ ​ (transfer) ​ ​ (loan home) ​ ​ (existing) ​ ​ (your) ​ ​ (can you) ​." },
        { q: "​ (Mutual Funds) ​ ​ (in) ​ ​ (invest) ​ ​ (I can) ​?", a: "​ (Yes) ​. ​ (distributor fund mutual) ​ ​ (registered-AMFI an) ​ ​ (is) ​ ​ (Finance Ganesh Shree) ​." },
      ]},
      { id: "about", label: "અ​​ (about us) ​", icon: "🏢", faqs: [
        { q: "​ (regulated) ​ ​ (institution financial) ​ ​ (a) ​ ​ (is) ​ ​ (Finance Ganesh Shree) ​?", a: "​ (Yes) ​. ​ (NBFC) ​ ​ (registered-RBI an) ​ ​ (is) ​ ​ (Finance Ganesh Shree) ​." },
        { q: "​ (located) ​ ​ (branches) ​ ​ (Finance Ganesh Shree) ​ ​ (are where) ​?", a: "​ (India across) ​ ​ (branches) ​ ​ (of) ​ ​ (network growing) ​ ​ (a) ​ ​ (has) ​ ​ (Finance Ganesh Shree) ​." },
        { q: "​ (support customer) ​ ​ (Finance Ganesh Shree) ​ ​ (contact I do how) ​?", a: "​ (page Contact) ​ ​ (our through) ​ ​ (inquiry) ​ ​ (Submit) ​, ​ (info@shreegf.com) ​ ​ (at) ​ ​ (email) ​." },
        { q: "​ (data personal my) ​ ​ (protect) ​ ​ (Finance Ganesh Shree) ​ ​ (does how) ​?", a: "​ (guidelines protection data RBI) ​ ​ (and) ​ ​ (Act Technology Information) ​ ​ (with) ​ ​ (compliant fully) ​ ​ (is) ​ ​ (Finance Ganesh Shree) ​." },
      ]},
    ],
  },

  // ─── TELUGU ──────────────────────────────────────────────────────
  te: {
    badge: "సహాయ కేంద్రం",
    heading: "తరచుగా అడిగే",
    headingLine2: "ప్రశ్నలు",
    subtext: "శ్రీ గణేష్ ఫైనాన్స్ యొక్క ఉత్పత్తులు మరియు సేవల గురించి మీకు అవసరమైన అన్నీ తెలుసుకోండి. జవాబు కనుగొనలేదా?",
    subtextLink: "మా బృందంతో మాట్లాడండి.",
    stats: [{ value: "27+", label: "సమాధానాలు" }, { value: "24 గం.", label: "ప్రతిస్పందన సమయం" }, { value: "RBI", label: "నియంత్రిత NBFC" }],
    questionsLabel: "ఈ వర్గంలో ప్రశ్నలు",
    stillHave: "ఇంకా ప్రశ్నలు ఉన్నాయా?",
    expertHeading: "మా నిపుణులు సహాయానికి సిద్ధంగా ఉన్నారు",
    expertSub: "శ్రీ గణేష్ ఫైనాన్స్ ఆర్థిక సలహాదారుతో మాట్లాడండి — సోమ నుండి శని, ఉ. 9:30 – సా. 6:00.",
    contactBtn: "సంప్రదించండి",
    callBtn: "టోల్-ఫ్రీ కాల్ చేయండి",
    categories: [
      { id: "gold-loan", label: "గోల్డ్ లోన్", icon: "🏅", faqs: [
        { q: "గోల్డ్ లోన్ అంటే ఏమిటి మరియు శ్రీ గణేష్ ఫైనాన్స్‌లో అది ఎలా పని చేస్తుంది?", a: "గోల్డ్ లోన్ అనేది ఒక సురక్షిత రుణం, దీనిలో మీరు మీ బంగారు ఆభరణాలు (18–22 కేరట్) జామీనుగా తాకట్టు పెట్టి తక్షణం నిధులు పొందుతారు. RBI యొక్క LTV నిబంధనల ప్రకారం బంగారు మార్కెట్ విలువలో 75% వరకు రుణం మంజూరు చేయబడుతుంది." },
        { q: "నాకు కనీసం మరియు గరిష్టంగా ఎంత గోల్డ్ లోన్ రకం పొందవచ్చు?", a: "శ్రీ గణేష్ ఫైనాన్స్ ₹1,500 నుండి ప్రారంభమయ్యే గోల్డ్ లోన్లు అందిస్తుంది, గరిష్ట పరిమితి లేదు — RBI యొక్క 75% LTV నిబంధన ప్రకారం బంగారం బరువు, స్వచ్ఛత మరియు ధరపై ఆధారపడి ఉంటుంది." },
        { q: "గోల్డ్ లోన్‌పై వడ్డీ రేటు ఏమిటి?", a: "మా గోల్డ్ లోన్ వడ్డీ రేట్లు 9.99% p.a. నుండి ప్రారంభమవుతాయి. RBI యొక్క న్యాయమైన ధిరాణ మార్గదర్శకాల ప్రకారం అన్ని రేట్లు ముందస్తుగా వెల్లడించబడతాయి." },
        { q: "గోల్డ్ లోన్ కోసం దరఖాస్తు చేయడానికి ఏ పత్రాలు అవసరం?", a: "గోల్డ్ లోన్లకు కనిష్ట పత్రాలు అవసరం: (1) ఆధార్ కార్డ్ — PMLA నిబంధనల ప్రకారం తప్పనిసరి, (2) PAN కార్డ్ — ₹1 లక్ష కంటే ఎక్కువ రుణాలకు, (3) ఇటీవలి ఫోటో, (4) బంగారు ఆభరణాలు." },
        { q: "శ్రీ గణేష్ ఫైనాన్స్ వద్ద నా బంగారం సురక్షితంగా ఉంటుందా?", a: "తప్పకుండా. అన్ని తాకట్టు పెట్టిన బంగారం RBI-అనుకూల, అధిక-భద్రత బీమా చేయబడిన వాల్ట్‌లలో 24×7 నిఘాతో నిల్వ చేయబడుతుంది. సంపూర్ణ చెల్లింపు తర్వాత బంగారం అదే స్థితిలో తిరిగి ఇవ్వబడుతుంది." },
        { q: "కాలపరిమితి ముగియడానికి ముందు నా గోల్డ్ లోన్ చెల్లించవచ్చా?", a: "అవును. శ్రీ గణేష్ ఫైనాన్స్ ఎటువంటి ముందస్తు చెల్లింపు జరిమానా లేకుండా ఎప్పుడైనా పాక్షిక చెల్లింపు మరియు పూర్తి ముందస్తు మూసివేతను అనుమతిస్తుంది." },
        { q: "ఇంటి వద్ద గోల్డ్ లోన్ సేవ అంటే ఏమిటి?", a: "మా ఇంటి వద్ద గోల్డ్ లోన్ సేవ మొత్తం గోల్డ్ లోన్ ప్రక్రియను మీ ఇంటికి తీసుకువస్తుంది. వారంలో 6 రోజులు అందుబాటులో ఉంటుంది." },
      ]},
      { id: "eligibility", label: "అర్హత", icon: "✅", faqs: [
        { q: "శ్రీ గణేష్ ఫైనాన్స్‌లో రుణానికి అర్హత ఎవరికి ఉంటుంది?", a: "18 సంవత్సరాలు మరియు అంతకంటే ఎక్కువ వయస్సు గల ఏ భారతీయ నివాసి అయినా గోల్డ్ లోన్ కు అర్హుడు. గోల్డ్ లోన్‌కు కనీస ఆదాయ అవసరం లేదు." },
        { q: "గోల్డ్ లోన్ పొందడానికి మంచి CIBIL స్కోర్ అవసరమా?", a: "లేదు. గోల్డ్ లోన్‌కు ఎటువంటి కనీస CIBIL స్కోర్ అవసరం లేదు. రుణం బంగారు ఆభరణాలకు వ్యతిరేకంగా సురక్షితమైనందున, క్రెడిట్ చరిత్ర నిర్ణాయక అంశం కాదు." },
        { q: "స్వయం ఉపాధిగల వ్యక్తి లేదా రైతు రుణం కోసం దరఖాస్తు చేయవచ్చా?", a: "అవును. గోల్డ్ లోన్ ప్రత్యేకంగా స్వయం ఉపాధిగల వ్యక్తులు, రైతులు, వ్యాపారులు మరియు వ్యాపార యజమానులకు ప్రయోజనకరంగా ఉంటుంది." },
        { q: "NRIలు గోల్డ్ లోన్ పొందవచ్చా?", a: "NRIలు చెల్లుబడి అయ్యే Power of Attorney (PoA) ద్వారా నివాసి బంధువుని బంగారం తాకట్టు పెట్టడానికి అధికారం ఇవ్వడం ద్వారా గోల్డ్ లోన్ పొందవచ్చు." },
      ]},
      { id: "repayment", label: "తిరిగి చెల్లింపు", icon: "💳", faqs: [
        { q: "గోల్డ్ లోన్‌కు ఏ తిరిగి చెల్లింపు ఎంపికలు అందుబాటులో ఉన్నాయి?", a: "శ్రీ గణేష్ ఫైనాన్స్: (1) EMI ఆధారిత తిరిగి చెల్లింపు, (2) బుల్లెట్ రీపేమెంట్, (3) వడ్డీ మాత్రమే EMI, (4) ఫ్లెక్సీ రీపేమెంట్ — గోల్డ్ ఫ్లెక్సీ క్రెడిట్ పథకం కింద అందిస్తుంది." },
        { q: "నేను EMI చెల్లించకపోతే ఏమి జరుగుతుంది?", a: "EMI మిస్ అయితే, బకాయి రకంపై జరిమానా వడ్డీ విధించబడుతుంది. శ్రీ గణేష్ ఫైనాన్స్ EMI పునర్వ్యవస్థీకరణ లేదా కాలపరిమితి పొడిగింపు సహా పరిష్కారం కనుగొనడంలో మీకు సహాయం చేయడానికి ముందుగా సంప్రదిస్తుంది." },
        { q: "పూర్తిగా చెల్లించడానికి బదులు నా గోల్డ్ లోన్ పునరుద్ధరించవచ్చా?", a: "అవును. పరిపక్వత వద్ద బంగారాన్ని తిరిగి తీసుకురాకుండా మీ గోల్డ్ లోన్ పునరుద్ధరించవచ్చు. బంగారం ధర పెరిగి ఉంటే, పునరుద్ధరణపై అధిక రుణ మొత్తం పొందవచ్చు." },
        { q: "తిరిగి చెల్లింపు ఎలా చేయాలి? డిజిటల్ చెల్లింపు ఎంపికలు ఉన్నాయా?", a: "అవును. NEFT/RTGS/IMPS, UPI (GPay, PhonePe, Paytm), చెక్కు లేదా NACH మాండేట్ ద్వారా తిరిగి చెల్లింపులు స్వీకరిస్తాం. EMI గడువు ముందు SMS మరియు ఇమెయిల్ రిమైండర్లు వస్తాయి." },
      ]},
      { id: "other-loans", label: "ఇతర ఉత్పత్తులు", icon: "📋", faqs: [
        { q: "శ్రీ గణేష్ ఫైనాన్స్ ఏ రకాల రుణాలు మరియు ఆర్థిక సేవలు అందిస్తుంది?", a: "శ్రీ గణేష్ ఫైనాన్స్: గోల్డ్ లోన్, గోల్డ్ ఫ్లెక్సీ క్రెడిట్, ఇంటి వద్ద గోల్డ్ లోన్, హౌసింగ్ ఫైనాన్స్, వ్యక్తిగత రుణం, చిన్న వ్యాపార రుణం, SME రుణం, కార్పొరేట్ రుణం, వాహన రుణం, బీమా, మ్యూచువల్ ఫండ్స్, క్రెడిట్ స్కోర్ మరియు మనీ ట్రాన్స్ఫర్." },
        { q: "వ్యక్తిగత రుణం ఆమోదించడానికి ఎంత సమయం పడుతుంది?", a: "పత్రాలు సమర్పించిన 24–48 పని గంటలలో వ్యక్తిగత రుణ దరఖాస్తులు ప్రాసెస్ చేయబడతాయి." },
        { q: "శ్రీ గణేష్ ఫైనాన్స్ హోమ్ లోన్ బ్యాలెన్స్ ట్రాన్స్ఫర్ సదుపాయం అందిస్తుందా?", a: "అవును. మీ ప్రస్తుత హోమ్ లోన్‌ను తక్కువ వడ్డీ రేటుతో శ్రీ గణేష్ ఫైనాన్స్‌కు బదిలీ చేయవచ్చు." },
        { q: "శ్రీ గణేష్ ఫైనాన్స్ ద్వారా మ్యూచువల్ ఫండ్స్‌లో పెట్టుబడి పెట్టవచ్చా?", a: "అవును. శ్రీ గణేష్ ఫైనాన్స్ AMFI నమోదిత మ్యూచువల్ ఫండ్ పంపిణీదారు." },
      ]},
      { id: "about", label: "మా గురించి", icon: "🏢", faqs: [
        { q: "శ్రీ గణేష్ ఫైనాన్స్ నియంత్రిత ఆర్థిక సంస్థ అయినదా?", a: "అవును. శ్రీ గణేష్ ఫైనాన్స్ RBI-నమోదిత నాన్-బ్యాంకింగ్ ఫైనాన్షియల్ కంపెనీ (NBFC)." },
        { q: "శ్రీ గణేష్ ఫైనాన్స్ శాఖలు ఎక్కడ ఉన్నాయి?", a: "శ్రీ గణేష్ ఫైనాన్స్ భారతదేశంలో పెరుగుతున్న శాఖల నెట్‌వర్క్ కలిగి ఉంది. సమీప శాఖ కనుగొనడానికి మా సంప్రదింపు పేజీని సందర్శించండి." },
        { q: "శ్రీ గణేష్ ఫైనాన్స్ కస్టమర్ సపోర్ట్‌ను ఎలా సంప్రదించాలి?", a: "మా సంప్రదింపు పేజీ ద్వారా విచారణ సమర్పించవచ్చు, info@shreegf.com కు ఇమెయిల్ పంపవచ్చు." },
        { q: "శ్రీ గణేష్ ఫైనాన్స్ నా వ్యక్తిగత డేటాను ఎలా రక్షిస్తుంది?", a: "శ్రీ గణేష్ ఫైనాన్స్ IT చట్టం మరియు RBI డేటా రక్షణ మార్గదర్శకాలకు పూర్తిగా అనుగుణంగా ఉంది." },
      ]},
    ],
  },

  // ─── TAMIL ───────────────────────────────────────────────────────
  ta: {
    badge: "ஆதரவு மையம்",
    heading: "அடிக்கடி கேட்கப்படும்",
    headingLine2: "கேள்விகள்",
    subtext: "ஸ்ரீ கணேஷ் ஃபைனான்ஸின் தயாரிப்புகள் மற்றும் சேவைகள் பற்றி அனைத்தும் அறிந்துகொள்ளுங்கள். பதில் கண்டுபிடிக்கவில்லையா?",
    subtextLink: "எங்கள் குழுவிடம் பேசுங்கள்.",
    stats: [{ value: "27+", label: "கேள்விகளுக்கு பதில்" }, { value: "24 மணி", label: "பதில் நேரம்" }, { value: "RBI", label: "ஒழுங்குபடுத்தப்பட்ட NBFC" }],
    questionsLabel: "இந்த வகையில் கேள்விகள்",
    stillHave: "இன்னும் கேள்விகள் உள்ளதா?",
    expertHeading: "எங்கள் நிபுணர்கள் உதவ தயாராக உள்ளனர்",
    expertSub: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் நிதி ஆலோசகரிடம் பேசுங்கள் — திங்கள் முதல் சனி, காலை 9:30 – மாலை 6:00.",
    contactBtn: "தொடர்பு கொள்ளுங்கள்",
    callBtn: "டோல்-ஃப்ரீ அழையுங்கள்",
    categories: [
      { id: "gold-loan", label: "கோல்டு லோன்", icon: "🏅", faqs: [
        { q: "கோல்டு லோன் என்றால் என்ன மற்றும் ஸ்ரீ கணேஷ் ஃபைனான்ஸில் அது எவ்வாறு செயல்படுகிறது?", a: "கோல்டு லோன் என்பது ஒரு பாதுகாப்பான கடன், இதில் நீங்கள் உங்கள் தங்க நகைகளை (18–22 கேரட்) பிணையாக அடமானம் வைத்து உடனடியாக நிதி பெறுகிறீர்கள். RBI இன் LTV விதிமுறைகளின்படி தங்கத்தின் சந்தை மதிப்பில் 75% வரை கடன் வழங்கப்படுகிறது." },
        { q: "எனக்கு குறைந்தபட்சம் மற்றும் அதிகபட்சமாக எவ்வளவு கோல்டு லோன் கிடைக்கும்?", a: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் ₹1,500 முதல் எந்த உச்ச வரம்பும் இல்லாமல் கோல்டு லோன் வழங்குகிறது — RBI இன் 75% LTV விகிதத்திற்கு உட்பட்டு தங்கத்தின் எடை, தூய்மை மற்றும் ஒற்றை ஆதார வீட்டு விலைகள் அடிப்படையில் தீர்மானிக்கப்படுகிறது." },
        { q: "கோல்டு லோனில் வட்டி விகிதம் என்ன?", a: "எங்கள் கோல்டு லோன் வட்டி விகிதங்கள் 9.99% p.a. முதல் தொடங்குகின்றன. RBI இன் நியாயமான கடன் வழிகாட்டுதல்களின்படி அனைத்து விகிதங்களும் முன்கூட்டியே வெளிப்படுத்தப்படுகின்றன." },
        { q: "கோல்டு லோனுக்கு விண்ணப்பிக்க என்ன ஆவணங்கள் தேவை?", a: "கோல்டு லோனுக்கு குறைந்தபட்ச ஆவணங்கள் தேவை: (1) ஆதார் அட்டை — PMLA விதிமுறைகளின் கீழ் கட்டாயம், (2) PAN அட்டை — ₹1 லட்சத்திற்கு மேல் கடன்களுக்கு, (3) ஒரு சமீபத்திய புகைப்படம், (4) தங்க நகைகள்." },
        { q: "ஸ்ரீ கணேஷ் ஃபைனான்ஸில் என் தங்கம் பாதுகாப்பாக இருக்குமா?", a: "நிச்சயமாக. அனைத்து அடமானம் வைத்த தங்கமும் RBI-இணங்கிய, உயர்-பாதுகாப்பு காப்பீடு செய்யப்பட்ட வால்ட்டுகளில் 24×7 கண்காணிப்புடன் சேமிக்கப்படுகிறது." },
        { q: "காலம் முடிவதற்கு முன்பே என் கோல்டு லோனை திரும்ப செலுத்தலாமா?", a: "ஆம். ஸ்ரீ கணேஷ் ஃபைனான்ஸ் எந்த முன்கூட்டிய செலுத்துகை அபராதமும் இல்லாமல் எப்போது வேண்டுமானாலும் பகுதி செலுத்துகை மற்றும் முழு முன்கூட்டிய மூடலை அனுமதிக்கிறது." },
        { q: "வீட்டிலேயே கோல்டு லோன் சேவை என்றால் என்ன?", a: "எங்கள் வீட்டிலேயே கோல்டு லோன் சேவை முழு கோல்டு லோன் செயல்முறையை உங்கள் வீட்டிற்கு கொண்டு வருகிறது. வாரத்தில் 6 நாட்கள் கிடைக்கும்." },
      ]},
      { id: "eligibility", label: "தகுதி", icon: "✅", faqs: [
        { q: "ஸ்ரீ கணேஷ் ஃபைனான்ஸில் கடனுக்கு விண்ணப்பிக்க யார் தகுதியானவர்கள்?", a: "18 வயது மற்றும் அதற்கு மேற்பட்ட ஏதேனும் இந்திய குடியிருப்பாளர் கோல்டு லோனுக்கு விண்ணப்பிக்க தகுதியுடையவர். கோல்டு லோனுக்கு குறைந்தபட்ச வருமான தேவை இல்லை." },
        { q: "கோல்டு லோன் பெற நல்ல CIBIL ஸ்கோர் தேவையா?", a: "இல்லை. கோல்டு லோனுக்கு குறைந்தபட்ச CIBIL ஸ்கோர் தேவை இல்லை. கடன் தங்க நகைகளுக்கு எதிராக பாதுகாக்கப்பட்டிருப்பதால், கிரெடிட் வரலாறு தீர்மானிக்கும் காரணியல்ல." },
        { q: "சுயதொழில் நபர் அல்லது விவசாயி கடனுக்கு விண்ணப்பிக்கலாமா?", a: "ஆம். கோல்டு லோன் சுயதொழில் நபர்கள், விவசாயிகள், வணிகர்கள் மற்றும் தொழில் உரிமையாளர்களுக்கு மிகவும் பயனுள்ளதாக இருக்கும்." },
        { q: "NRIகள் கோல்டு லோன் பெறலாமா?", a: "NRIகள் செல்லுபடியான Power of Attorney (PoA) மூலம் நிவாசி உறவினரை தங்கள் சார்பாக தங்கம் அடமானம் வைக்க அங்கீகரித்து கோல்டு லோன் பெறலாம்." },
      ]},
      { id: "repayment", label: "திரும்ப செலுத்துகை", icon: "💳", faqs: [
        { q: "கோல்டு லோனுக்கு என்ன திரும்ப செலுத்துகை விருப்பங்கள் கிடைக்கின்றன?", a: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ்: (1) EMI-அடிப்படை திரும்ப செலுத்துகை, (2) புல்லட் ரீபேமெண்ட், (3) வட்டி மட்டும் EMI, (4) ஃப்ளெக்ஸி ரீபேமெண்ட் — கோல்டு ஃப்ளெக்ஸி கிரெடிட் திட்டத்தின் கீழ் வழங்குகிறது." },
        { q: "நான் EMI செலுத்தாவிட்டால் என்ன ஆகும்?", a: "EMI தவறினால், நிலுவையிலுள்ள தொகைக்கு அபராத வட்டி விதிக்கப்படும். ஸ்ரீ கணேஷ் ஃபைனான்ஸ் EMI மறுசீரமைப்பு அல்லது காலம் நீட்டிப்பு உட்பட தீர்வு கண்டுபிடிக்க உதவும்." },
        { q: "முழுமையாக செலுத்துவதற்குப் பதிலாக என் கோல்டு லோனை புதுப்பிக்கலாமா?", a: "ஆம். தங்கத்தை கிளைக்கு திரும்ப கொண்டு வராமல் முதிர்வில் கோல்டு லோனை புதுப்பிக்கலாம். தங்க விலை உயர்ந்திருந்தால் அதிக கடன் தொகை பெறலாம்." },
        { q: "திரும்ப செலுத்துகை எப்படி செய்வது? டிஜிட்டல் பேமெண்ட் விருப்பங்கள் உள்ளனவா?", a: "ஆம். NEFT/RTGS/IMPS, UPI (GPay, PhonePe, Paytm), காசோலை மற்றும் NACH மாண்டேட் மூலம் திரும்ப செலுத்துகைகள் ஏற்கப்படுகின்றன." },
      ]},
      { id: "other-loans", label: "பிற தயாரிப்புகள்", icon: "📋", faqs: [
        { q: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் என்ன வகையான கடன்கள் மற்றும் நிதி சேவைகளை வழங்குகிறது?", a: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ்: கோல்டு லோன், கோல்டு ஃப்ளெக்ஸி கிரெடிட், வீட்டிலேயே கோல்டு லோன், ஹவுசிங் ஃபைனான்ஸ், தனிப்பட்ட கடன், சிறு வணிக கடன், SME கடன், கார்ப்பரேட் கடன், வாகன கடன், காப்பீடு, மியூச்சுவல் ஃபண்ட்ஸ், கிரெடிட் ஸ்கோர் மற்றும் பண பரிமாற்றம்." },
        { q: "தனிப்பட்ட கடன் அங்கீகரிக்கப்பட எவ்வளவு நேரம் ஆகும்?", a: "ஆவணங்கள் சமர்பிக்கப்பட்ட 24–48 வேலை நேரங்களுக்குள் தனிப்பட்ட கடன் விண்ணப்பங்கள் செயலாக்கப்படுகின்றன." },
        { q: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் ஹோம் லோன் பேலன்ஸ் ட்ரான்ஸ்பர் வசதி வழங்குகிறதா?", a: "ஆம். உங்கள் தற்போதைய ஹோம் லோனை குறைந்த வட்டி விகிதத்தில் ஸ்ரீ கணேஷ் ஃபைனான்ஸுக்கு மாற்றலாம்." },
        { q: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் மூலம் மியூச்சுவல் ஃபண்ட்ஸில் முதலீடு செய்யலாமா?", a: "ஆம். ஸ்ரீ கணேஷ் ஃபைனான்ஸ் AMFI பதிவு செய்யப்பட்ட மியூச்சுவல் ஃபண்ட் விநியோகஸ்தர்." },
      ]},
      { id: "about", label: "எங்களைப் பற்றி", icon: "🏢", faqs: [
        { q: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் ஒழுங்குபடுத்தப்பட்ட நிதி நிறுவனமா?", a: "ஆம். ஸ்ரீ கணேஷ் ஃபைனான்ஸ் RBI-பதிவு செய்யப்பட்ட நான்-பேங்கிங் ஃபைனான்ஷியல் கம்பெனி (NBFC)." },
        { q: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் கிளைகள் எங்கு உள்ளன?", a: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் இந்தியா முழுவதும் கிளைகளின் வளர்ந்து வரும் நெட்வொர்க்கை கொண்டுள்ளது. அருகிலுள்ள கிளை கண்டுபிடிக்க எங்கள் தொடர்பு பக்கத்தை பார்வையிடுங்கள்." },
        { q: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் வாடிக்கையாளர் ஆதரவை எப்படி தொடர்பு கொள்வது?", a: "எங்கள் தொடர்பு பக்கம் மூலம் விசாரணை சமர்பிக்கவும், info@shreegf.com க்கு மின்னஞ்சல் அனுப்பவும்." },
        { q: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் என் தனிப்பட்ட தரவை எவ்வாறு பாதுகாக்கிறது?", a: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் IT சட்டம் மற்றும் RBI தரவு பாதுகாப்பு வழிகாட்டுதல்களுக்கு முழுமையாக இணங்குகிறது." },
      ]},
    ],
  },

  // ─── KANNADA ─────────────────────────────────────────────────────
  kn: {
    badge: "ಸಹಾಯ ಕೇಂದ್ರ",
    heading: "ಆಗಾಗ್ಗೆ ಕೇಳಲ್ಪಡುವ",
    headingLine2: "ಪ್ರಶ್ನೆಗಳು",
    subtext: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಸೇವೆಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ತಿಳಿದಿರಬೇಕಾದ ಎಲ್ಲವನ್ನೂ ತಿಳಿಯಿರಿ. ಉತ್ತರ ಸಿಗಲಿಲ್ಲವೇ?",
    subtextLink: "ನಮ್ಮ ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ.",
    stats: [{ value: "27+", label: "ಉತ್ತರಿಸಿದ ಪ್ರಶ್ನೆಗಳು" }, { value: "24 ಗಂ.", label: "ಪ್ರತಿಕ್ರಿಯಾ ಸಮಯ" }, { value: "RBI", label: "ನಿಯಂತ್ರಿತ NBFC" }],
    questionsLabel: "ಈ ವಿಭಾಗದಲ್ಲಿ ಪ್ರಶ್ನೆಗಳು",
    stillHave: "ಇನ್ನೂ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?",
    expertHeading: "ನಮ್ಮ ತಜ್ಞರು ಸಹಾಯ ಮಾಡಲು ಸಿದ್ಧರಿದ್ದಾರೆ",
    expertSub: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಹಣಕಾಸು ಸಲಹೆಗಾರರೊಂದಿಗೆ ಮಾತನಾಡಿ — ಸೋಮ ರಿಂದ ಶನಿ, ಬೆ. 9:30 – ಸಂ. 6:00.",
    contactBtn: "ಸಂಪರ್ಕಿಸಿ",
    callBtn: "ಟೋಲ್-ಫ್ರೀ ಕರೆ ಮಾಡಿ",
    categories: [
      { id: "gold-loan", label: "ಗೋಲ್ಡ್ ಲೋನ್", icon: "🏅", faqs: [
        { q: "ಗೋಲ್ಡ್ ಲೋನ್ ಎಂದರೇನು ಮತ್ತು ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನಲ್ಲಿ ಅದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?", a: "ಗೋಲ್ಡ್ ಲೋನ್ ಒಂದು ಸುರಕ್ಷಿತ ಸಾಲವಾಗಿದ್ದು, ನೀವು ನಿಮ್ಮ ಚಿನ್ನದ ಆಭರಣಗಳನ್ನು (18–22 ಕ್ಯಾರೆಟ್) ಭದ್ರತೆಯಾಗಿ ಅಡವಿಟ್ಟು ತಕ್ಷಣ ಹಣ ಪಡೆಯುತ್ತೀರಿ. RBI ನ LTV ನಿಯಮಗಳ ಪ್ರಕಾರ ಚಿನ್ನದ ಮಾರುಕಟ್ಟೆ ಮೌಲ್ಯದ 75% ವರೆಗೆ ಸಾಲ ನೀಡಲಾಗುತ್ತದೆ." },
        { q: "ನನಗೆ ಕನಿಷ್ಠ ಮತ್ತು ಗರಿಷ್ಠ ಎಷ್ಟು ಗೋಲ್ಡ್ ಲೋನ್ ಪಡೆಯಬಹುದು?", a: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ₹1,500 ರಿಂದ ಯಾವುದೇ ಮೇಲ್ ಮಿತಿ ಇಲ್ಲದೆ ಗೋಲ್ಡ್ ಲೋನ್ ನೀಡುತ್ತದೆ — RBI ನ 75% LTV ಅನುಪಾತಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಚಿನ್ನದ ತೂಕ, ಶುದ್ಧತೆ ಮತ್ತು ದರದ ಮೇಲೆ ಅವಲಂಬಿಸಿರುತ್ತದೆ." },
        { q: "ಗೋಲ್ಡ್ ಲೋನ್‌ನಲ್ಲಿ ಬಡ್ಡಿ ದರ ಎಷ್ಟು?", a: "ನಮ್ಮ ಗೋಲ್ಡ್ ಲೋನ್ ಬಡ್ಡಿ ದರಗಳು 9.99% ಪ್ರತಿ ವರ್ಷದಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತವೆ. RBI ನ ನ್ಯಾಯಯುತ ಸಾಲ ಮಾರ್ಗದರ್ಶಿ ಸೂತ್ರಗಳ ಪ್ರಕಾರ ಎಲ್ಲಾ ದರಗಳನ್ನು ಮೊದಲೇ ಬಹಿರಂಗಪಡಿಸಲಾಗುತ್ತದೆ." },
        { q: "ಗೋಲ್ಡ್ ಲೋನ್‌ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?", a: "ಗೋಲ್ಡ್ ಲೋನ್‌ಗೆ ಕನಿಷ್ಠ ದಾಖಲೆಗಳು ಬೇಕು: (1) ಆಧಾರ್ ಕಾರ್ಡ್ — PMLA ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ಕಡ್ಡಾಯ, (2) ಪ್ಯಾನ್ ಕಾರ್ಡ್ — ₹1 ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಸಾಲಗಳಿಗೆ, (3) ಇತ್ತೀಚಿನ ಫೋಟೋ, (4) ಚಿನ್ನದ ಆಭರಣಗಳು." },
        { q: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನಲ್ಲಿ ನನ್ನ ಚಿನ್ನ ಸುರಕ್ಷಿತವಾಗಿದೆಯೇ?", a: "ಖಂಡಿತಾ. ಎಲ್ಲಾ ಅಡವಿಟ್ಟ ಚಿನ್ನವನ್ನು RBI-ಅನುಸರಣ, ಹೆಚ್ಚಿನ ಭದ್ರತಾ ವಿಮಾ ತಿಜೋರಿಗಳಲ್ಲಿ 24×7 ನಿಗಾದೊಂದಿಗೆ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ." },
        { q: "ಅವಧಿ ಮುಗಿಯುವ ಮೊದಲು ನನ್ನ ಗೋಲ್ಡ್ ಲೋನ್ ತೀರಿಸಬಹುದೇ?", a: "ಹೌದು. ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಯಾವುದೇ ಮುಂಚಿತ ಪಾವತಿ ದಂಡವಿಲ್ಲದೆ ಯಾವಾಗ ಬೇಕಾದರೂ ಭಾಗಶಃ ಮತ್ತು ಪೂರ್ಣ ಮುಂಚಿತ ಮುಕ್ತಾಯವನ್ನು ಅನುಮತಿಸುತ್ತದೆ." },
        { q: "ಮನೆಯಲ್ಲಿ ಗೋಲ್ಡ್ ಲೋನ್ ಸೇವೆ ಎಂದರೇನು?", a: "ನಮ್ಮ ಮನೆಯಲ್ಲಿ ಗೋಲ್ಡ್ ಲೋನ್ ಸೇವೆ ಸಂಪೂರ್ಣ ಗೋಲ್ಡ್ ಲೋನ್ ಪ್ರಕ್ರಿಯೆಯನ್ನು ನಿಮ್ಮ ಮನೆಗೆ ತರುತ್ತದೆ. ವಾರದಲ್ಲಿ 6 ದಿನ ಲಭ್ಯ." },
      ]},
      { id: "eligibility", label: "ಅರ್ಹತೆ", icon: "✅", faqs: [
        { q: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನಲ್ಲಿ ಸಾಲಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಯಾರು ಅರ್ಹರು?", a: "18 ವರ್ಷ ಮತ್ತು ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಯಾವುದೇ ಭಾರತೀಯ ನಿವಾಸಿ ಗೋಲ್ಡ್ ಲೋನ್‌ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅರ್ಹರು. ಗೋಲ್ಡ್ ಲೋನ್‌ಗೆ ಕನಿಷ್ಠ ಆದಾಯ ಅಗತ್ಯ ಇಲ್ಲ." },
        { q: "ಗೋಲ್ಡ್ ಲೋನ್ ಪಡೆಯಲು ಒಳ್ಳೆಯ CIBIL ಸ್ಕೋರ್ ಬೇಕೇ?", a: "ಇಲ್ಲ. ಗೋಲ್ಡ್ ಲೋನ್‌ಗೆ ಕನಿಷ್ಠ CIBIL ಸ್ಕೋರ್ ಅಗತ್ಯ ಇಲ್ಲ. ಸಾಲವು ಚಿನ್ನದ ಆಭರಣಗಳ ವಿರುದ್ಧ ಸುರಕ್ಷಿತವಾಗಿದ್ದು, ಕ್ರೆಡಿಟ್ ಇತಿಹಾಸ ನಿರ್ಧಾರಕ ಅಂಶವಲ್ಲ." },
        { q: "ಸ್ವಯಂ ಉದ್ಯೋಗಿ ಅಥವಾ ರೈತ ಸಾಲಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದೇ?", a: "ಹೌದು. ಗೋಲ್ಡ್ ಲೋನ್ ಸ್ವಯಂ ಉದ್ಯೋಗಿಗಳು, ರೈತರು, ವ್ಯಾಪಾರಿಗಳು ಮತ್ತು ವ್ಯಾಪಾರ ಮಾಲೀಕರಿಗೆ ವಿಶೇಷವಾಗಿ ಪ್ರಯೋಜನಕಾರಿ." },
        { q: "NRI ಗಳು ಗೋಲ್ಡ್ ಲೋನ್ ಪಡೆಯಬಹುದೇ?", a: "NRI ಗಳು ಮಾನ್ಯ Power of Attorney (PoA) ಮೂಲಕ ನಿವಾಸಿ ಸಂಬಂಧಿಗಳನ್ನು ತಮ್ಮ ಪರವಾಗಿ ಚಿನ್ನ ಅಡವಿಡಲು ಅಧಿಕಾರ ನೀಡಿ ಗೋಲ್ಡ್ ಲೋನ್ ಪಡೆಯಬಹುದು." },
      ]},
      { id: "repayment", label: "ಮರುಪಾವತಿ", icon: "💳", faqs: [
        { q: "ಗೋಲ್ಡ್ ಲೋನ್‌ಗೆ ಯಾವ ಮರುಪಾವತಿ ಆಯ್ಕೆಗಳು ಲಭ್ಯವಿವೆ?", a: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್: (1) EMI ಆಧಾರಿತ ಮರುಪಾವತಿ, (2) ಬುಲೆಟ್ ಮರುಪಾವತಿ, (3) ಬಡ್ಡಿ ಮಾತ್ರ EMI, (4) ಫ್ಲೆಕ್ಸಿ ಮರುಪಾವತಿ — ಗೋಲ್ಡ್ ಫ್ಲೆಕ್ಸಿ ಕ್ರೆಡಿಟ್ ಯೋಜನೆಯಡಿ ನೀಡುತ್ತದೆ." },
        { q: "ನಾನು EMI ತಪ್ಪಿಸಿದರೆ ಏನಾಗುತ್ತದೆ?", a: "EMI ತಪ್ಪಿಸಿದರೆ, ಬಾಕಿ ಮೊತ್ತಕ್ಕೆ ದಂಡ ಬಡ್ಡಿ ವಿಧಿಸಲಾಗುತ್ತದೆ. ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ EMI ಪುನರ್ರಚನೆ ಅಥವಾ ಅವಧಿ ವಿಸ್ತರಣೆ ಸೇರಿ ಪರಿಹಾರ ಕಂಡುಹಿಡಿಯಲು ಮುಂದೆ ಬಂದು ಸಂಪರ್ಕಿಸುತ್ತದೆ." },
        { q: "ಸಂಪೂರ್ಣ ಪಾವತಿ ಮಾಡುವ ಬದಲು ನನ್ನ ಗೋಲ್ಡ್ ಲೋನ್ ಅನ್ನು ನವೀಕರಿಸಬಹುದೇ?", a: "ಹೌದು. ಮುಕ್ತಾಯದ ಸಮಯದಲ್ಲಿ ಚಿನ್ನವನ್ನು ಹಿಂತಿರುಗಿಸದೆ ಗೋಲ್ಡ್ ಲೋನ್ ನವೀಕರಿಸಬಹುದು. ಚಿನ್ನದ ಬೆಲೆ ಹೆಚ್ಚಿದ್ದರೆ ಹೆಚ್ಚಿನ ಮೊತ್ತ ಪಡೆಯಬಹುದು." },
        { q: "ಮರುಪಾವತಿ ಹೇಗೆ ಮಾಡಬೇಕು? ಡಿಜಿಟಲ್ ಪಾವತಿ ಆಯ್ಕೆಗಳಿವೆಯೇ?", a: "ಹೌದು. NEFT/RTGS/IMPS, UPI (GPay, PhonePe, Paytm), ಚೆಕ್ ಮತ್ತು NACH ಮ್ಯಾಂಡೇಟ್ ಮೂಲಕ ಮರುಪಾವತಿ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ." },
      ]},
      { id: "other-loans", label: "ಇತರ ಉತ್ಪನ್ನಗಳು", icon: "📋", faqs: [
        { q: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಯಾವ ರೀತಿಯ ಸಾಲಗಳು ಮತ್ತು ಹಣಕಾಸು ಸೇವೆಗಳನ್ನು ನೀಡುತ್ತದೆ?", a: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್: ಗೋಲ್ಡ್ ಲೋನ್, ಗೋಲ್ಡ್ ಫ್ಲೆಕ್ಸಿ ಕ್ರೆಡಿಟ್, ಮನೆಯಲ್ಲಿ ಗೋಲ್ಡ್ ಲೋನ್, ಹೌಸಿಂಗ್ ಫೈನಾನ್ಸ್, ವೈಯಕ್ತಿಕ ಸಾಲ, ಸ್ಮಾಲ್ ಬಿಸಿನೆಸ್ ಲೋನ್, SME ಲೋನ್, ಕಾರ್ಪೊರೇಟ್ ಲೋನ್, ವಾಹನ ಸಾಲ, ವಿಮೆ, ಮ್ಯೂಚುಯಲ್ ಫಂಡ್ಸ್, ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಮತ್ತು ಹಣ ವರ್ಗಾವಣೆ." },
        { q: "ವೈಯಕ್ತಿಕ ಸಾಲ ಅನುಮೋದಿಸಲು ಎಷ್ಟು ಸಮಯ ಬೇಕಾಗುತ್ತದೆ?", a: "ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಿದ 24–48 ಕೆಲಸದ ಗಂಟೆಗಳಲ್ಲಿ ವೈಯಕ್ತಿಕ ಸಾಲ ಅರ್ಜಿಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತದೆ." },
        { q: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಹೋಮ್ ಲೋನ್ ಬ್ಯಾಲೆನ್ಸ್ ಟ್ರಾನ್ಸ್ಫರ್ ಸೌಲಭ್ಯ ನೀಡುತ್ತದೆಯೇ?", a: "ಹೌದು. ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಅಥವಾ NBFC ಯಿಂದ ನಿಮ್ಮ ಹೋಮ್ ಲೋನ್ ಅನ್ನು ಕಡಿಮೆ ಬಡ್ಡಿ ದರದಲ್ಲಿ ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ಗೆ ವರ್ಗಾಯಿಸಬಹುದು." },
        { q: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಮೂಲಕ ಮ್ಯೂಚುಯಲ್ ಫಂಡ್‌ಗಳಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಬಹುದೇ?", a: "ಹೌದು. ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ AMFI ನೋಂದಾಯಿತ ಮ್ಯೂಚುಯಲ್ ಫಂಡ್ ವಿತರಕ." },
      ]},
      { id: "about", label: "ನಮ್ಮ ಬಗ್ಗೆ", icon: "🏢", faqs: [
        { q: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ನಿಯಂತ್ರಿತ ಹಣಕಾಸು ಸಂಸ್ಥೆಯೇ?", a: "ಹೌದು. ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ RBI ನೋಂದಾಯಿತ ನಾನ್-ಬ್ಯಾಂಕಿಂಗ್ ಫೈನಾನ್ಷಿಯಲ್ ಕಂಪೆನಿ (NBFC)." },
        { q: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಶಾಖೆಗಳು ಎಲ್ಲಿ ಇವೆ?", a: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಭಾರತಾದ್ಯಂತ ಬೆಳೆಯುತ್ತಿರುವ ಶಾಖೆಗಳ ಜಾಲವನ್ನು ಹೊಂದಿದೆ. ಹತ್ತಿರದ ಶಾಖೆ ಕಂಡುಹಿಡಿಯಲು ನಮ್ಮ ಸಂಪರ್ಕ ಪುಟ ಭೇಟಿ ಮಾಡಿ." },
        { q: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಗ್ರಾಹಕ ಬೆಂಬಲವನ್ನು ಹೇಗೆ ಸಂಪರ್ಕಿಸಬೇಕು?", a: "ನಮ್ಮ ಸಂಪರ್ಕ ಪುಟದ ಮೂಲಕ ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ, info@shreegf.com ಗೆ ಇಮೇಲ್ ಕಳುಹಿಸಿ." },
        { q: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ನನ್ನ ವೈಯಕ್ತಿಕ ಡೇಟಾವನ್ನು ಹೇಗೆ ರಕ್ಷಿಸುತ್ತದೆ?", a: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ IT ಕಾಯ್ದೆ ಮತ್ತು RBI ಡೇಟಾ ಸಂರಕ್ಷಣಾ ಮಾರ್ಗದರ್ಶಿ ಸೂತ್ರಗಳಿಗೆ ಸಂಪೂರ್ಣ ಅನುಸರಣೆ ನೀಡುತ್ತದೆ." },
      ]},
    ],
  },

  // ─── ASSAMESE ────────────────────────────────────────────────────
  as: {
    badge: "সহায় কেন্দ্ৰ",
    heading: "সঘনাই সোধা হোৱা",
    headingLine2: "প্ৰশ্নসমূহ",
    subtext: "শ্ৰী গণেশ ফাইনেন্সৰ সামগ্ৰী আৰু সেৱাসমূহ সম্পৰ্কে আপুনি জানিবলগীয়া সকলো কথা জানক। উত্তৰ পোৱা নাই?",
    subtextLink: "আমাৰ দলৰ সৈতে কথা পাতক।",
    stats: [{ value: "27+", label: "উত্তৰ দিয়া প্ৰশ্ন" }, { value: "24 ঘ.", label: "সঁহাৰি সময়" }, { value: "RBI", label: "নিয়ন্ত্ৰিত NBFC" }],
    questionsLabel: "এই শ্ৰেণীত প্ৰশ্ন",
    stillHave: "এতিয়াও প্ৰশ্ন আছে?",
    expertHeading: "আমাৰ বিশেষজ্ঞসকল সহায় কৰিবলৈ সাজু",
    expertSub: "শ্ৰী গণেশ ফাইনেন্সৰ বিত্তীয় পৰামৰ্শদাতাৰ সৈতে কথা পাতক — সোম-শনি, ৰাতিপুৱা 9:30 – সন্ধিয়া 6:00।",
    contactBtn: "যোগাযোগ কৰক",
    callBtn: "টোল-ফ্ৰী কল কৰক",
    categories: [
      { id: "gold-loan", label: "গোল্ড লোন", icon: "🏅", faqs: [
        { q: "গোল্ড লোন কি আৰু শ্ৰী গণেশ ফাইনেন্সত ই কেনেকৈ কাম কৰে?", a: "গোল্ড লোন হৈছে এটি সুৰক্ষিত ঋণ য'ত আপুনি আপোনাৰ সোণৰ গহনা (18–22 কেৰেট) জামিন হিচাপে বন্ধক ৰাখি তৎকালীনভাৱে ধন লাভ কৰে। RBI ৰ LTV নিয়ম অনুসৰি সোণৰ বজাৰ মূল্যৰ 75% পৰ্যন্ত ঋণ বিতৰণ কৰা হয়।" },
        { q: "মই কিমান গোল্ড লোন পাব পাৰো?", a: "শ্ৰী গণেশ ফাইনেন্স ₹1,500 ৰ পৰা আৰম্ভ হোৱা গোল্ড লোন প্ৰদান কৰে, কোনো উৰ্ধ্ব সীমা নাই — RBI ৰ 75% LTV অনুপাতৰ অধীনত সোণৰ ওজন, বিশুদ্ধতা আৰু বজাৰ দৰৰ ওপৰত নিৰ্ভৰ কৰে।" },
        { q: "গোল্ড লোনত সুদৰ হাৰ কি?", a: "আমাৰ গোল্ড লোনৰ সুদৰ হাৰ 9.99% প্ৰতি বছৰত আৰম্ভ হয়। RBI ৰ ন্যায্য ঋণদান নিৰ্দেশিকা অনুসৰি সকলো হাৰ আগতীয়াকৈ প্ৰকাশ কৰা হয়।" },
        { q: "গোল্ড লোনৰ বাবে কি কাগজপত্ৰ লাগে?", a: "গোল্ড লোনৰ বাবে নূন্যতম কাগজপত্ৰ: (1) আধাৰ কাৰ্ড — PMLA নিয়মৰ অধীনত বাধ্যতামূলক, (2) পেন কাৰ্ড — ₹1 লাখৰ অধিক ঋণৰ বাবে, (3) শেহতীয়া ফটো, (4) সোণৰ গহনা।" },
        { q: "শ্ৰী গণেশ ফাইনেন্সত মোৰ সোণ সুৰক্ষিত নেকি?", a: "অবশ্যই। সকলো বন্ধক সোণ RBI-অনুপালিত, উচ্চ-সুৰক্ষা বীমাকৃত ভল্টত 24×7 নিৰীক্ষণৰ সৈতে ৰখা হয়।" },
        { q: "মেয়াদ শেষ হোৱাৰ আগতে মোৰ গোল্ড লোন পৰিশোধ কৰিব পাৰিমনে?", a: "হয়। শ্ৰী গণেশ ফাইনেন্স কোনো পূৰ্ব-পৰিশোধ জুৰিমানা নোহোৱাকৈ যিকোনো সময়ত আংশিক পৰিশোধ আৰু সম্পূৰ্ণ পূৰ্ব-বন্ধ কৰাৰ অনুমতি দিয়ে।" },
        { q: "ঘৰত গোল্ড লোন সেৱা কি?", a: "আমাৰ ঘৰত গোল্ড লোন সেৱা সম্পূৰ্ণ গোল্ড লোন প্ৰক্ৰিয়া আপোনাৰ ঘৰলৈ আনে। সপ্তাহত 6 দিন উপলব্ধ।" },
      ]},
      { id: "eligibility", label: "যোগ্যতা", icon: "✅", faqs: [
        { q: "শ্ৰী গণেশ ফাইনেন্সত ঋণৰ বাবে কোন যোগ্য?", a: "18 বছৰ আৰু তাতকৈ বেছি বয়সৰ যিকোনো ভাৰতীয় বাসিন্দা গোল্ড লোনৰ বাবে যোগ্য। গোল্ড লোনৰ বাবে কোনো ন্যূনতম আয়ৰ প্ৰয়োজনীয়তা নাই।" },
        { q: "গোল্ড লোন পাবলৈ ভাল CIBIL স্কোৰ লাগেনে?", a: "নহয়। গোল্ড লোনৰ বাবে কোনো ন্যূনতম CIBIL স্কোৰ প্ৰয়োজন নাই। ঋণটো সোণৰ বিপৰীতে সুৰক্ষিত হোৱাৰ বাবে ক্রেডিট ইতিহাস নিৰ্ধাৰক নহয়।" },
        { q: "স্ব-নিযুক্তি ব্যক্তি বা কৃষকে ঋণৰ বাবে আবেদন কৰিব পাৰেনে?", a: "হয়। গোল্ড লোন বিশেষকৈ স্ব-নিযুক্তি ব্যক্তি, কৃষক, ব্যৱসায়ী আৰু উদ্যোগীৰ বাবে উপকাৰী।" },
        { q: "NRI সকলে গোল্ড লোন ল'ব পাৰেনে?", a: "NRI সকলে বৈধ Power of Attorney (PoA) ৰ জৰিয়তে বাসিন্দা আত্মীয়ক তেওঁলোকৰ হৈ সোণ বন্ধক ৰাখিবলৈ অনুমতি দি গোল্ড লোন ল'ব পাৰে।" },
      ]},
      { id: "repayment", label: "পৰিশোধ", icon: "💳", faqs: [
        { q: "গোল্ড লোনৰ বাবে কি পৰিশোধ বিকল্প আছে?", a: "শ্ৰী গণেশ ফাইনেন্স: (1) EMI-ভিত্তিক পৰিশোধ, (2) বুলেট পৰিশোধ, (3) কেৱল সুদ EMI, (4) ফ্লেক্সি পৰিশোধ — গোল্ড ফ্লেক্সি ক্রেডিট আঁচাৰ অধীনত প্ৰদান কৰে।" },
        { q: "যদি মই EMI মিছ কৰো তেন্তে কি হ'ব?", a: "EMI মিছ হ'লে বাকী পৰিমাণত দণ্ড সুদ ধাৰ্য কৰা হ'ব। শ্ৰী গণেশ ফাইনেন্স EMI পুনৰ্গঠন বা মেয়াদ সম্প্ৰসাৰণ সহ সমাধান বিচাৰিবলৈ সক্ৰিয়ভাৱে যোগাযোগ কৰিব।" },
        { q: "সম্পূৰ্ণ পৰিশোধ কৰাৰ সলনি গোল্ড লোন নবীকৰণ কৰিব পাৰিমনে?", a: "হয়। পৰিপক্বতাত শাখালৈ সোণ নআনিকৈ গোল্ড লোন নবীকৰণ কৰিব পাৰি। সোণৰ দাম বঢ়িলে অধিক ঋণ পৰিমাণ পাব পাৰি।" },
        { q: "পৰিশোধ কেনেকৈ কৰিব? ডিজিটেল পেমেণ্ট বিকল্প আছেনে?", a: "হয়। NEFT/RTGS/IMPS, UPI (GPay, PhonePe, Paytm), চেক আৰু NACH মেণ্ডেটৰ জৰিয়তে পৰিশোধ গ্ৰহণ কৰা হয়।" },
      ]},
      { id: "other-loans", label: "অন্য সামগ্ৰী", icon: "📋", faqs: [
        { q: "শ্ৰী গণেশ ফাইনেন্সে কি ধৰণৰ ঋণ আৰু বিত্তীয় সেৱা প্ৰদান কৰে?", a: "শ্ৰী গণেশ ফাইনেন্স: গোল্ড লোন, গোল্ড ফ্লেক্সি ক্রেডিট, ঘৰত গোল্ড লোন, হাউচিং ফাইনেন্স, ব্যক্তিগত ঋণ, ক্ষুদ্ৰ ব্যৱসায় ঋণ, SME ঋণ, কৰ্পোৰেট ঋণ, বাহন ঋণ, বীমা, মিউচুৱেল ফান্ড, ক্রেডিট স্কোৰ আৰু টকা হস্তান্তৰ।" },
        { q: "পাৰ্চনেল লোন অনুমোদন হ'বলৈ কিমান সময় লাগে?", a: "কাগজপত্ৰ জমা দিয়াৰ 24–48 কৰ্মঘণ্টাৰ ভিতৰত পাৰ্চনেল লোন আবেদন প্ৰক্ৰিয়া কৰা হয়।" },
        { q: "শ্ৰী গণেশ ফাইনেন্সে হোম লোন বেলেন্স ট্ৰান্সফাৰ সুবিধা প্ৰদান কৰেনে?", a: "হয়। যিকোনো বেংক বা NBFC ৰ পৰা আপোনাৰ হোম লোন কম সুদৰ হাৰত শ্ৰী গণেশ ফাইনেন্সলৈ স্থানান্তৰ কৰিব পাৰি।" },
        { q: "শ্ৰী গণেশ ফাইনেন্সৰ জৰিয়তে মিউচুৱেল ফান্ডত বিনিয়োগ কৰিব পাৰিমনে?", a: "হয়। শ্ৰী গণেশ ফাইনেন্স AMFI-পঞ্জীভুক্ত মিউচুৱেল ফান্ড বিতৰক।" },
      ]},
      { id: "about", label: "আমাৰ বিষয়ে", icon: "🏢", faqs: [
        { q: "শ্ৰী গণেশ ফাইনেন্স এটি নিয়ন্ত্ৰিত বিত্তীয় প্ৰতিষ্ঠান নেকি?", a: "হয়। শ্ৰী গণেশ ফাইনেন্স RBI-পঞ্জীভুক্ত ননবেংকিং ফাইনেন্সিয়েল কোম্পানী (NBFC)।" },
        { q: "শ্ৰী গণেশ ফাইনেন্সৰ শাখাসমূহ ক'ত আছে?", a: "শ্ৰী গণেশ ফাইনেন্সৰ সমগ্ৰ ভাৰতত শাখাৰ এটি বৃদ্ধি পোৱা নেটৱৰ্ক আছে। নিকটবৰ্তী শাখা বিচাৰিবলৈ আমাৰ যোগাযোগ পৃষ্ঠা চাওক।" },
        { q: "শ্ৰী গণেশ ফাইনেন্স গ্ৰাহক সেৱাৰ সৈতে কেনেকৈ যোগাযোগ কৰিব?", a: "আমাৰ যোগাযোগ পৃষ্ঠাৰ জৰিয়তে প্ৰশ্ন দাখিল কৰক, info@shreegf.com ত ইমেইল কৰক।" },
        { q: "শ্ৰী গণেশ ফাইনেন্সে মোৰ ব্যক্তিগত ডেটা কেনেকৈ সুৰক্ষিত কৰে?", a: "শ্ৰী গণেশ ফাইনেন্স তথ্য প্ৰযুক্তি আইন আৰু RBI ডেটা সুৰক্ষা নিৰ্দেশিকাৰ সৈতে সম্পূৰ্ণ অনুপালন কৰে।" },
      ]},
    ],
  },

  // ─── URDU ────────────────────────────────────────────────────────
  ur: {
    badge: "سپورٹ سینٹر",
    heading: "اکثر پوچھے جانے والے",
    headingLine2: "سوالات",
    subtext: "شری گنیش فائنانس کی مصنوعات اور خدمات کے بارے میں سب کچھ جانیں۔ جواب نہیں ملا؟",
    subtextLink: "ہماری ٹیم سے بات کریں۔",
    stats: [{ value: "27+", label: "سوالات کے جوابات" }, { value: "24 گھنٹے", label: "جوابی وقت" }, { value: "RBI", label: "منظور شدہ NBFC" }],
    questionsLabel: "اس زمرے میں سوالات",
    stillHave: "ابھی بھی سوالات ہیں؟",
    expertHeading: "ہمارے ماہرین مدد کے لیے موجود ہیں",
    expertSub: "شری گنیش فائنانس کے مالیاتی مشیر سے بات کریں — پیر تا ہفتہ، صبح 9:30 – شام 6:00۔",
    contactBtn: "رابطہ کریں",
    callBtn: "ٹول-فری کال کریں",
    categories: [
      { id: "gold-loan", label: "گولڈ لون", icon: "🏅", faqs: [
        { q: "گولڈ لون کیا ہے اور شری گنیش فائنانس میں یہ کیسے کام کرتا ہے؟", a: "گولڈ لون ایک محفوظ قرضہ ہے جہاں آپ اپنے سونے کے زیورات (18–22 قیراط) ضمانت کے طور پر گروی رکھتے ہیں اور فوری طور پر رقم حاصل کرتے ہیں۔ RBI کے LTV اصولوں کے مطابق سونے کی مارکیٹ قیمت کا 75% تک قرضہ دیا جاتا ہے۔" },
        { q: "مجھے کم از کم اور زیادہ سے زیادہ گولڈ لون کتنا مل سکتا ہے؟", a: "شری گنیش فائنانس ₹1,500 سے شروع ہونے والے گولڈ لون فراہم کرتا ہے، کوئی اوپری حد نہیں — RBI کے 75% LTV تناسب کے تحت سونے کے وزن، خالصیت اور موجودہ بازار کی قیمت پر منحصر ہے۔" },
        { q: "گولڈ لون پر سود کی شرح کیا ہے؟", a: "ہمارے گولڈ لون کی سود کی شرح 9.99% سالانہ سے شروع ہوتی ہے۔ RBI کی منصفانہ قرضہ دہندگی رہنما اصولوں کے مطابق تمام شرحیں پہلے سے ظاہر کی جاتی ہیں۔" },
        { q: "گولڈ لون کے لیے کون سے دستاویزات درکار ہیں؟", a: "گولڈ لون کے لیے کم سے کم دستاویزات: (1) آدھار کارڈ — PMLA قوانین کے تحت لازمی، (2) پین کارڈ — ₹1 لاکھ سے زیادہ قرضوں کے لیے، (3) حالیہ تصویر، (4) سونے کے زیورات۔" },
        { q: "کیا شری گنیش فائنانس کے پاس میرا سونا محفوظ ہے؟", a: "بالکل۔ تمام گروی رکھا گیا سونا RBI کے مطابق، اعلی سیکیورٹی بیمہ شدہ والٹ میں 24×7 نگرانی کے ساتھ رکھا گیا ہے۔" },
        { q: "کیا میں مدت ختم ہونے سے پہلے گولڈ لون ادا کر سکتا ہوں؟", a: "ہاں۔ شری گنیش فائنانس بغیر کسی قبل از وقت ادائیگی جرمانے کے کسی بھی وقت جزوی ادائیگی اور مکمل قبل از وقت بندش کی اجازت دیتا ہے۔" },
        { q: "گھر پر گولڈ لون سروس کیا ہے؟", a: "ہماری گھر پر گولڈ لون سروس پوری گولڈ لون کا عمل آپ کے گھر لے آتی ہے۔ ہفتے میں 6 دن دستیاب۔" },
      ]},
      { id: "eligibility", label: "اہلیت", icon: "✅", faqs: [
        { q: "شری گنیش فائنانس میں قرضے کے لیے کون اہل ہے؟", a: "18 سال اور اس سے زیادہ عمر کا کوئی بھی ہندوستانی باشندہ گولڈ لون کے لیے اہل ہے۔ گولڈ لون کے لیے کوئی کم از کم آمدنی کی ضرورت نہیں — سونے کی قدر واحد اہلیت کا معیار ہے۔" },
        { q: "کیا گولڈ لون کے لیے اچھا CIBIL اسکور ضروری ہے؟", a: "نہیں۔ گولڈ لون کے لیے کوئی کم از کم CIBIL اسکور ضروری نہیں ہے۔ چونکہ قرضہ سونے کے خلاف محفوظ ہے، کریڈٹ تاریخ فیصلہ کن نہیں ہے۔" },
        { q: "کیا خود روزگار شخص یا کسان قرضے کے لیے درخواست دے سکتا ہے؟", a: "ہاں۔ گولڈ لون خاص طور پر خود روزگار افراد، کسانوں، تاجروں اور کاروباری مالکان کے لیے فائدہ مند ہے۔" },
        { q: "کیا NRI گولڈ لون لے سکتے ہیں؟", a: "NRI درست Power of Attorney (PoA) کے ذریعے کسی مقیم رشتہ دار کو سونا گروی رکھنے کا اختیار دے کر گولڈ لون لے سکتے ہیں۔" },
      ]},
      { id: "repayment", label: "ادائیگی", icon: "💳", faqs: [
        { q: "گولڈ لون کے لیے کون سے ادائیگی کے اختیارات دستیاب ہیں؟", a: "شری گنیش فائنانس: (1) EMI پر مبنی ادائیگی، (2) بلٹ ریپیمنٹ، (3) صرف سود EMI، (4) فلیکسی ریپیمنٹ — گولڈ فلیکسی کریڈٹ اسکیم کے تحت فراہم کرتا ہے۔" },
        { q: "اگر میں EMI نہ دے سکوں تو کیا ہوگا؟", a: "EMI مس ہونے پر بقایا رقم پر جرمانہ سود لگایا جائے گا۔ شری گنیش فائنانس EMI ریسٹریکچرنگ یا مدت میں توسیع سمیت حل تلاش کرنے میں مدد کرے گا۔" },
        { q: "کیا میں مکمل ادائیگی کی بجائے گولڈ لون تجدید کر سکتا ہوں؟", a: "ہاں۔ میچورٹی پر شاخ میں سونا واپس لائے بغیر گولڈ لون تجدید کر سکتے ہیں۔ سونے کی قیمت بڑھی ہو تو زیادہ قرضہ مل سکتا ہے۔" },
        { q: "ادائیگی کیسے کریں؟ کیا ڈیجیٹل ادائیگی کے اختیارات ہیں؟", a: "ہاں۔ NEFT/RTGS/IMPS، UPI (GPay, PhonePe, Paytm)، چیک اور NACH مینڈیٹ کے ذریعے ادائیگیاں قبول کی جاتی ہیں۔" },
      ]},
      { id: "other-loans", label: "دیگر مصنوعات", icon: "📋", faqs: [
        { q: "شری گنیش فائنانس کس قسم کے قرضے اور مالیاتی خدمات پیش کرتا ہے؟", a: "شری گنیش فائنانس: گولڈ لون، گولڈ فلیکسی کریڈٹ، گھر پر گولڈ لون، ہاؤسنگ فائنانس، ذاتی قرضہ، چھوٹا کاروباری قرضہ، SME قرضہ، کارپوریٹ قرضہ، گاڑی قرضہ، بیمہ، میوچول فنڈز، کریڈٹ اسکور اور رقم کی منتقلی۔" },
        { q: "ذاتی قرضہ منظور ہونے میں کتنا وقت لگتا ہے؟", a: "دستاویزات جمع کرنے کے 24–48 کام کے گھنٹوں میں ذاتی قرضے کی درخواستیں پروسیس کی جاتی ہیں۔" },
        { q: "کیا شری گنیش فائنانس ہوم لون بیلنس ٹرانسفر سہولت پیش کرتا ہے؟", a: "ہاں۔ آپ اپنا موجودہ ہوم لون کسی بھی بینک یا NBFC سے کم سود کی شرح پر شری گنیش فائنانس میں منتقل کر سکتے ہیں۔" },
        { q: "کیا میں شری گنیش فائنانس کے ذریعے میوچول فنڈز میں سرمایہ کاری کر سکتا ہوں؟", a: "ہاں۔ شری گنیش فائنانس AMFI رجسٹرڈ میوچول فنڈ ڈسٹریبیوٹر ہے۔" },
      ]},
      { id: "about", label: "ہمارے بارے میں", icon: "🏢", faqs: [
        { q: "کیا شری گنیش فائنانس ایک منظم مالیاتی ادارہ ہے؟", a: "ہاں۔ شری گنیش فائنانس RBI رجسٹرڈ نان-بینکنگ فائنانشل کمپنی (NBFC) ہے۔" },
        { q: "شری گنیش فائنانس کی شاخیں کہاں واقع ہیں؟", a: "شری گنیش فائنانس کا پورے ہندوستان میں شاخوں کا بڑھتا ہوا نیٹ ورک ہے۔ قریبی شاخ تلاش کرنے کے لیے ہمارا رابطہ صفحہ دیکھیں۔" },
        { q: "شری گنیش فائنانس کسٹمر سپورٹ سے کیسے رابطہ کریں؟", a: "رابطہ صفحے کے ذریعے استفسار جمع کریں، info@shreegf.com پر ای میل کریں۔" },
        { q: "شری گنیش فائنانس میرے ذاتی ڈیٹا کی حفاظت کیسے کرتا ہے؟", a: "شری گنیش فائنانس IT ایکٹ اور RBI ڈیٹا تحفظ رہنما اصولوں کے ساتھ مکمل تعمیل کرتا ہے۔" },
      ]},
    ],
  },
};

// ─── Scroll Reveal Hook ───────────────────────────────────────────
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

// ─── Single FAQ Item ──────────────────────────────────────────────
function FAQItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-red-200 shadow-md shadow-red-50" : "border-gray-100 hover:border-red-100 hover:shadow-sm"}`}
      itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
    >
      <button onClick={onToggle}
        className={`w-full flex items-start justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left transition-colors duration-300 ${isOpen ? "bg-red-50" : "bg-white hover:bg-gray-50"}`}
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5 transition-colors duration-300 ${isOpen ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"}`}>
            {index + 1}
          </span>
          <span className={`text-sm sm:text-[15px] font-bold leading-snug transition-colors duration-300 ${isOpen ? "text-red-700" : "text-gray-800"}`} itemProp="name">
            {faq.q}
          </span>
        </div>
        <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 mt-0.5 ${isOpen ? "bg-red-600 text-white rotate-180" : "bg-gray-100 text-gray-400"}`}>
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
      <div style={{ height: `${height}px`, transition: "height 380ms cubic-bezier(0.4,0,0.2,1)", overflow: "hidden" }}
        itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
        <div ref={contentRef}>
          <div className="px-5 sm:px-6 pb-5 pt-1 bg-white">
            <div className="flex gap-4">
              <div className="w-0.5 flex-shrink-0 bg-gradient-to-b from-red-400 to-red-100 rounded-full ml-[11px]" />
              <p className="text-sm sm:text-[15px] text-gray-600 leading-7 pt-2" itemProp="text">{faq.a}</p>
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
  const { lang } = useLanguage();
  const D = FAQ_DATA[lang] || FAQ_DATA["en"];
  const isRtl = lang === "ur";

  const [activeCategory, setActiveCategory] = useState("gold-loan");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [sectionRef, sectionVisible] = useScrollReveal(0.08);

  const currentCategory = D.categories.find((c) => c.id === activeCategory);
  const totalFAQs = D.categories.reduce((sum, c) => sum + c.faqs.length, 0);

  const handleCategoryChange = (id) => {
    if (id === activeCategory) return;
    setOpenFAQ(null);
    setActiveCategory(id);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 sm:py-20"
      aria-label="Frequently Asked Questions"
      itemScope itemType="https://schema.org/FAQPage"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-10">

        {/* ── Header ── */}
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-[10px] font-black tracking-[0.15em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {D.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-3">
            {D.heading}<br className="hidden sm:block" /> {D.headingLine2}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {D.subtext}{" "}
            <a href="/contact" className="text-red-600 font-semibold hover:underline">{D.subtextLink}</a>
          </p>
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8">
            {D.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-black text-red-600">{s.value}</span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide uppercase mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Category Tabs ── */}
        <div
          className={`flex gap-2 overflow-x-auto pb-2 mb-8 transition-all duration-700 delay-100 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ scrollbarWidth: "none" }}
        >
          {D.categories.map((cat) => (
            <button key={cat.id} onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-100"
                  : "bg-white border-gray-100 text-gray-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
                {cat.faqs.length}
              </span>
            </button>
          ))}
        </div>

        {/* ── FAQ List ── */}
        <div className={`transition-all duration-500 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <span className="text-2xl">{currentCategory?.icon}</span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900">{currentCategory?.label}</h3>
              <p className="text-xs text-gray-400">{currentCategory?.faqs.length} {D.questionsLabel}</p>
            </div>
          </div>
          <div className="space-y-3">
            {currentCategory?.faqs.map((faq, i) => (
              <div key={`${activeCategory}-${i}-${lang}`}
                style={{ opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? "translateY(0)" : "translateY(12px)", transition: `opacity 400ms ${250 + i * 60}ms, transform 400ms ${250 + i * 60}ms` }}>
                <FAQItem faq={faq} index={i} isOpen={openFAQ === i} onToggle={() => setOpenFAQ((p) => (p === i ? null : i))} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className={`mt-12 sm:mt-16 rounded-3xl overflow-hidden transition-all duration-700 delay-300 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-gradient-to-br from-gray-900 via-[#1c1c1c] to-red-950 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-red-600/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-red-600/10 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] font-black tracking-[0.2em] text-red-400 uppercase mb-3">{D.stillHave}</p>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">{D.expertHeading}</h3>
              <p className="text-white/50 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">{D.expertSub}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-black transition-all active:scale-95 shadow-lg shadow-red-900/40">
                  {D.contactBtn}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="tel:18001234567" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-black transition-all active:scale-95">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {D.callBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}