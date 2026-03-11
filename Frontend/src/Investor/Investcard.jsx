import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../Common/Navbaar"; // useLanguage from your Navbar context

// ═══════════════════════════════════════════════════════════════════════════════
// ─── TRANSLATIONS — all 9 languages (UI labels + card content)
// ═══════════════════════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    // Section
    section_badge: "Investment Plans",
    section_title: "Grow Your Wealth",
    section_subtitle: "with Ganesh Finance",
    section_desc: "Choose an investment plan tailored to your financial goals. Trusted by thousands of investors across India with guaranteed returns and complete transparency.",
    // Labels
    most_popular: "Most Popular",
    per_annum: "per annum",
    min_investment: "Min. Investment",
    tenure: "Tenure",
    returns: "Returns",
    invest_now: "Invest Now",
    know_more: "Know More",
    months: "months",
    years: "years",
    guaranteed: "Guaranteed",
    rbi_compliant: "RBI Compliant",
    trusted_investors: "Trusted Investors",
    assets_managed: "Assets Managed",
    years_experience: "Years Experience",
    stat_investors: "50,000+",
    stat_assets: "₹500 Cr+",
    stat_years: "15+",
    interest_paid: "Interest Paid",
    quarterly: "Quarterly",
    monthly: "Monthly",
    on_maturity: "On Maturity",
    // Trust footer
    trust_rbi: "RBI Registered NBFC",
    trust_dicgc: "DICGC Insured Deposits",
    trust_iso: "ISO 9001:2015 Certified",
    trust_disclaimer: "*Interest rates are subject to change. Please contact our branch for the latest rates. Investment is subject to market risks. Read all offer documents carefully.",
    // Silver card
    silver_tagline: "Start Smart",
    silver_cta: "Start with Silver",
    silver_f1: "Minimum ₹10,000 investment",
    silver_f2: "Quarterly interest payouts",
    silver_f3: "Flexible withdrawal on maturity",
    silver_f4: "RBI compliant & secure",
    silver_f5: "Free account management",
    silver_f6: "Nominee facility available",
    // Gold card
    gold_tagline: "Most Rewarding",
    gold_cta: "Invest in Gold",
    gold_f1: "Minimum ₹50,000 investment",
    gold_f2: "Monthly interest payouts",
    gold_f3: "Priority customer support",
    gold_f4: "RBI compliant & DICGC insured",
    gold_f5: "Free financial advisory session",
    gold_f6: "Loan against FD facility",
    gold_f7: "Automatic renewal option",
    // Platinum card
    platinum_tagline: "Elite Returns",
    platinum_cta: "Go Platinum",
    platinum_f1: "Minimum ₹2,00,000 investment",
    platinum_f2: "Monthly interest payouts",
    platinum_f3: "Dedicated relationship manager",
    platinum_f4: "RBI compliant & DICGC insured",
    platinum_f5: "Exclusive wealth planning",
    platinum_f6: "Loan against FD facility",
    platinum_f7: "Tax planning assistance",
    platinum_f8: "Preferential renewal rates",
  },

  hi: {
    section_badge: "निवेश योजनाएँ",
    section_title: "अपनी संपत्ति बढ़ाएँ",
    section_subtitle: "Ganesh Finance के साथ",
    section_desc: "अपने वित्तीय लक्ष्यों के अनुरूप निवेश योजना चुनें। पूरे भारत में हजारों निवेशकों द्वारा विश्वसनीय, गारंटीड रिटर्न और पूर्ण पारदर्शिता के साथ।",
    most_popular: "सबसे लोकप्रिय",
    per_annum: "प्रति वर्ष",
    min_investment: "न्यूनतम निवेश",
    tenure: "अवधि",
    returns: "रिटर्न",
    invest_now: "अभी निवेश करें",
    know_more: "अधिक जानें",
    months: "महीने",
    years: "वर्ष",
    guaranteed: "गारंटीड",
    rbi_compliant: "RBI अनुपालन",
    trusted_investors: "विश्वसनीय निवेशक",
    assets_managed: "प्रबंधित संपत्तियाँ",
    years_experience: "वर्षों का अनुभव",
    stat_investors: "50,000+",
    stat_assets: "₹500 Cr+",
    stat_years: "15+",
    interest_paid: "ब्याज भुगतान",
    quarterly: "त्रैमासिक",
    monthly: "मासिक",
    on_maturity: "परिपक्वता पर",
    trust_rbi: "RBI पंजीकृत NBFC",
    trust_dicgc: "DICGC बीमित जमाएँ",
    trust_iso: "ISO 9001:2015 प्रमाणित",
    trust_disclaimer: "*ब्याज दरें परिवर्तन के अधीन हैं। नवीनतम दरों के लिए हमारी शाखा से संपर्क करें। निवेश बाज़ार जोखिमों के अधीन है।",
    silver_tagline: "स्मार्ट शुरुआत",
    silver_cta: "सिल्वर से शुरू करें",
    silver_f1: "न्यूनतम ₹10,000 निवेश",
    silver_f2: "त्रैमासिक ब्याज भुगतान",
    silver_f3: "परिपक्वता पर लचीली निकासी",
    silver_f4: "RBI अनुपालित और सुरक्षित",
    silver_f5: "मुफ्त खाता प्रबंधन",
    silver_f6: "नामांकन सुविधा उपलब्ध",
    gold_tagline: "सबसे अधिक लाभदायक",
    gold_cta: "गोल्ड में निवेश करें",
    gold_f1: "न्यूनतम ₹50,000 निवेश",
    gold_f2: "मासिक ब्याज भुगतान",
    gold_f3: "प्राथमिकता ग्राहक सहायता",
    gold_f4: "RBI अनुपालित & DICGC बीमित",
    gold_f5: "मुफ्त वित्तीय सलाह सत्र",
    gold_f6: "FD पर ऋण सुविधा",
    gold_f7: "स्वचालित नवीनीकरण विकल्प",
    platinum_tagline: "एलीट रिटर्न",
    platinum_cta: "प्लेटिनम चुनें",
    platinum_f1: "न्यूनतम ₹2,00,000 निवेश",
    platinum_f2: "मासिक ब्याज भुगतान",
    platinum_f3: "समर्पित रिलेशनशिप मैनेजर",
    platinum_f4: "RBI अनुपालित & DICGC बीमित",
    platinum_f5: "विशेष वेल्थ प्लानिंग",
    platinum_f6: "FD पर ऋण सुविधा",
    platinum_f7: "कर नियोजन सहायता",
    platinum_f8: "अधिमान्य नवीनीकरण दरें",
  },

  mr: {
    section_badge: "गुंतवणूक योजना",
    section_title: "तुमची संपत्ती वाढवा",
    section_subtitle: "Ganesh Finance सोबत",
    section_desc: "तुमच्या आर्थिक ध्येयानुसार तयार केलेली गुंतवणूक योजना निवडा. संपूर्ण भारतात हजारो गुंतवणूकदारांना विश्वासार्ह, हमी रिटर्न आणि पूर्ण पारदर्शकता.",
    most_popular: "सर्वाधिक लोकप्रिय",
    per_annum: "प्रति वर्ष",
    min_investment: "किमान गुंतवणूक",
    tenure: "कालावधी",
    returns: "रिटर्न",
    invest_now: "आता गुंतवा",
    know_more: "अधिक जाणून घ्या",
    months: "महिने",
    years: "वर्षे",
    guaranteed: "हमीदार",
    rbi_compliant: "RBI अनुपालन",
    trusted_investors: "विश्वासार्ह गुंतवणूकदार",
    assets_managed: "व्यवस्थापित मालमत्ता",
    years_experience: "वर्षांचा अनुभव",
    stat_investors: "50,000+",
    stat_assets: "₹500 Cr+",
    stat_years: "15+",
    interest_paid: "व्याज दिले",
    quarterly: "तिमाही",
    monthly: "मासिक",
    on_maturity: "परिपक्वतेवर",
    trust_rbi: "RBI नोंदणीकृत NBFC",
    trust_dicgc: "DICGC विमाधारित ठेवी",
    trust_iso: "ISO 9001:2015 प्रमाणित",
    trust_disclaimer: "*व्याजदर बदलू शकतात. नवीनतम दरांसाठी शाखेशी संपर्क करा.",
    silver_tagline: "स्मार्ट सुरुवात",
    silver_cta: "सिल्व्हरने सुरू करा",
    silver_f1: "किमान ₹10,000 गुंतवणूक",
    silver_f2: "तिमाही व्याज भुगतान",
    silver_f3: "परिपक्वतेवर लवचिक पैसे काढणे",
    silver_f4: "RBI अनुपालित आणि सुरक्षित",
    silver_f5: "मोफत खाते व्यवस्थापन",
    silver_f6: "नामांकन सुविधा उपलब्ध",
    gold_tagline: "सर्वात फायदेशीर",
    gold_cta: "गोल्डमध्ये गुंतवा",
    gold_f1: "किमान ₹50,000 गुंतवणूक",
    gold_f2: "मासिक व्याज भुगतान",
    gold_f3: "प्राधान्य ग्राहक सहाय्य",
    gold_f4: "RBI अनुपालित & DICGC विमाधारित",
    gold_f5: "मोफत आर्थिक सल्ला सत्र",
    gold_f6: "FD वर कर्ज सुविधा",
    gold_f7: "स्वयंचलित नूतनीकरण पर्याय",
    platinum_tagline: "एलिट रिटर्न",
    platinum_cta: "प्लॅटिनम निवडा",
    platinum_f1: "किमान ₹2,00,000 गुंतवणूक",
    platinum_f2: "मासिक व्याज भुगतान",
    platinum_f3: "समर्पित रिलेशनशिप मॅनेजर",
    platinum_f4: "RBI अनुपालित & DICGC विमाधारित",
    platinum_f5: "विशेष वेल्थ प्लानिंग",
    platinum_f6: "FD वर कर्ज सुविधा",
    platinum_f7: "कर नियोजन सहाय्य",
    platinum_f8: "अग्राधिकार नूतनीकरण दर",
  },

  gu: {
    section_badge: "રોકાણ યોજનાઓ",
    section_title: "તમારી સંપત્તિ વધારો",
    section_subtitle: "Ganesh Finance સાથે",
    section_desc: "તમારા નાણાકીય લક્ષ્યો અનુસાર રોકાણ યોજના પસંદ કરો. સમગ્ર ભારતમાં હજારો રોકાણકારો દ્વારા વિશ્વાસુ, ગેરંટીવાળા રિટર્ન અને સંપૂર્ણ પારદર્શકતા સાથે.",
    most_popular: "સૌથી લોકપ્રિય",
    per_annum: "પ્રતિ વર્ષ",
    min_investment: "ન્યૂનતમ રોકાણ",
    tenure: "મુદત",
    returns: "રિટર્ન્સ",
    invest_now: "હમણાં રોકાણ કરો",
    know_more: "વધુ જાણો",
    months: "મહિના",
    years: "વર્ષો",
    guaranteed: "ગેરંટીડ",
    rbi_compliant: "RBI અનુસાર",
    trusted_investors: "વિશ્વાસુ રોકાણકારો",
    assets_managed: "વ્યવસ્થાપિત સંપત્તિઓ",
    years_experience: "વર્ષોનો અનુભવ",
    stat_investors: "50,000+",
    stat_assets: "₹500 Cr+",
    stat_years: "15+",
    interest_paid: "વ્યાજ ચૂકવણી",
    quarterly: "ત્રણમાસિક",
    monthly: "માસિક",
    on_maturity: "પરિપક્વતા પર",
    trust_rbi: "RBI નોંધાયેલ NBFC",
    trust_dicgc: "DICGC વીમો ધરાવતી થાપણો",
    trust_iso: "ISO 9001:2015 પ્રમાણિત",
    trust_disclaimer: "*વ્યાજ દર બદલાઈ શકે છે. નવીનતમ દરો માટે શાખાનો સંપર્ક કરો.",
    silver_tagline: "સ્માર્ટ શરૂઆત",
    silver_cta: "સિલ્વરથી શરૂ કરો",
    silver_f1: "ન્યૂનતમ ₹10,000 રોકાણ",
    silver_f2: "ત્રણ માસિક વ્યાજ ચૂકવણી",
    silver_f3: "પાકતી મુદ્દત પર લવચીક ઉપાડ",
    silver_f4: "RBI અનુસાર અને સુરક્ષિત",
    silver_f5: "મફત એકાઉન્ટ વ્યવસ્થાપન",
    silver_f6: "નોમિની સુવિધા ઉપલબ્ધ",
    gold_tagline: "સૌથી વધુ ફાયદાકારક",
    gold_cta: "ગોલ્ડમાં રોકાણ કરો",
    gold_f1: "ન્યૂનતમ ₹50,000 રોકાણ",
    gold_f2: "માસિક વ્યાજ ચૂકવણી",
    gold_f3: "પ્રાથમિક ગ્રાહક સહાય",
    gold_f4: "RBI અનુસાર & DICGC વીમો",
    gold_f5: "મફત નાણાકીય સલાહ સત્ર",
    gold_f6: "FD પર લોન સુવિધા",
    gold_f7: "સ્વચાલિત નવીકરણ વિકલ્પ",
    platinum_tagline: "એલિટ રિટર્ન",
    platinum_cta: "પ્લેટિનમ પસંદ કરો",
    platinum_f1: "ન્યૂનતમ ₹2,00,000 રોકાણ",
    platinum_f2: "માસિક વ્યાજ ચૂકવણી",
    platinum_f3: "સમર્પિત રિલેશનશિપ મેનેજર",
    platinum_f4: "RBI અનુસાર & DICGC વીમો",
    platinum_f5: "વિશેષ વેલ્થ પ્લાનિંગ",
    platinum_f6: "FD પર લોન સુવિધા",
    platinum_f7: "ટેક્સ પ્લાનિંગ સહાય",
    platinum_f8: "પ્રેફરન્શિયલ નવીકરણ દર",
  },

  te: {
    section_badge: "పెట్టుబడి ప్రణాళికలు",
    section_title: "మీ సంపదను పెంచుకోండి",
    section_subtitle: "Ganesh Finance తో",
    section_desc: "మీ ఆర్థిక లక్ష్యాలకు అనుగుణంగా ఒక పెట్టుబడి ప్రణాళికను ఎంచుకోండి. భారతదేశం అంతటా వేలాది పెట్టుబడిదారులు విశ్వసించిన, హామీ రాబడులు మరియు పూర్తి పారదర్శకతతో.",
    most_popular: "అత్యంత ప్రజాదరణ",
    per_annum: "సంవత్సరానికి",
    min_investment: "కనీస పెట్టుబడి",
    tenure: "కాలవ్యవధి",
    returns: "రాబడులు",
    invest_now: "ఇప్పుడు పెట్టుబడి పెట్టండి",
    know_more: "మరిన్ని తెలుసుకోండి",
    months: "నెలలు",
    years: "సంవత్సరాలు",
    guaranteed: "హామీ",
    rbi_compliant: "RBI అనుకూలం",
    trusted_investors: "నమ్మకమైన పెట్టుబడిదారులు",
    assets_managed: "నిర్వహించబడిన ఆస్తులు",
    years_experience: "సంవత్సరాల అనుభవం",
    stat_investors: "50,000+",
    stat_assets: "₹500 Cr+",
    stat_years: "15+",
    interest_paid: "వడ్డీ చెల్లింపు",
    quarterly: "త్రైమాసిక",
    monthly: "నెలవారీ",
    on_maturity: "మ్యాచ్యూరిటీపై",
    trust_rbi: "RBI నమోదైన NBFC",
    trust_dicgc: "DICGC భీమా డిపాజిట్లు",
    trust_iso: "ISO 9001:2015 సర్టిఫైడ్",
    trust_disclaimer: "*వడ్డీ రేట్లు మారవచ్చు. తాజా రేట్లకు మా శాఖను సంప్రదించండి.",
    silver_tagline: "స్మార్ట్ స్టార్ట్",
    silver_cta: "సిల్వర్‌తో ప్రారంభించండి",
    silver_f1: "కనీసం ₹10,000 పెట్టుబడి",
    silver_f2: "త్రైమాసిక వడ్డీ చెల్లింపులు",
    silver_f3: "మ్యాచ్యూరిటీపై సౌకర్యవంతమైన ఉపసంహరణ",
    silver_f4: "RBI అనుకూలం మరియు సురక్షితం",
    silver_f5: "ఉచిత ఖాతా నిర్వహణ",
    silver_f6: "నామినీ సదుపాయం అందుబాటులో",
    gold_tagline: "అత్యంత ఫలవంతమైన",
    gold_cta: "గోల్డ్‌లో పెట్టుబడి పెట్టండి",
    gold_f1: "కనీసం ₹50,000 పెట్టుబడి",
    gold_f2: "నెలవారీ వడ్డీ చెల్లింపులు",
    gold_f3: "ప్రాధాన్య కస్టమర్ సపోర్ట్",
    gold_f4: "RBI అనుకూలం & DICGC భీమా",
    gold_f5: "ఉచిత ఆర్థిక సలహా సెషన్",
    gold_f6: "FD పై రుణ సదుపాయం",
    gold_f7: "స్వయంచాలక పునరుద్ధరణ ఎంపిక",
    platinum_tagline: "ఎలైట్ రిటర్న్స్",
    platinum_cta: "ప్లాటినం ఎంచుకోండి",
    platinum_f1: "కనీసం ₹2,00,000 పెట్టుబడి",
    platinum_f2: "నెలవారీ వడ్డీ చెల్లింపులు",
    platinum_f3: "అంకితమైన రిలేషన్‌షిప్ మేనేజర్",
    platinum_f4: "RBI అనుకూలం & DICGC భీమా",
    platinum_f5: "ప్రత్యేక వెల్త్ ప్లానింగ్",
    platinum_f6: "FD పై రుణ సదుపాయం",
    platinum_f7: "పన్ను ప్రణాళిక సహాయం",
    platinum_f8: "ప్రాధాన్య పునరుద్ధరణ రేట్లు",
  },

  ta: {
    section_badge: "முதலீட்டு திட்டங்கள்",
    section_title: "உங்கள் செல்வத்தை வளர்த்தெடுங்கள்",
    section_subtitle: "Ganesh Finance உடன்",
    section_desc: "உங்கள் நிதி இலக்குகளுக்கு ஏற்ற முதலீட்டு திட்டத்தைத் தேர்வு செய்யுங்கள். இந்தியா முழுவதும் ஆயிரக்கணக்கான முதலீட்டாளர்களால் நம்பப்படும், உத்தரவாத வருமானம் மற்றும் முழு வெளிப்படைத்தன்மையுடன்.",
    most_popular: "மிகவும் பிரபலமான",
    per_annum: "ஆண்டுக்கு",
    min_investment: "குறைந்தபட்ச முதலீடு",
    tenure: "காலம்",
    returns: "வருமானங்கள்",
    invest_now: "இப்போது முதலீடு செய்யுங்கள்",
    know_more: "மேலும் அறிய",
    months: "மாதங்கள்",
    years: "ஆண்டுகள்",
    guaranteed: "உத்தரவாதம்",
    rbi_compliant: "RBI இணக்கமான",
    trusted_investors: "நம்பகமான முதலீட்டாளர்கள்",
    assets_managed: "நிர்வகிக்கப்படும் சொத்துக்கள்",
    years_experience: "ஆண்டுகள் அனுபவம்",
    stat_investors: "50,000+",
    stat_assets: "₹500 Cr+",
    stat_years: "15+",
    interest_paid: "வட்டி செலுத்தல்",
    quarterly: "மூன்று மாதாந்திர",
    monthly: "மாதாந்திர",
    on_maturity: "முதிர்வில்",
    trust_rbi: "RBI பதிவு பெற்ற NBFC",
    trust_dicgc: "DICGC காப்பீட்டு வைப்புகள்",
    trust_iso: "ISO 9001:2015 சான்றிதழ் பெற்றது",
    trust_disclaimer: "*வட்டி விகிதங்கள் மாறலாம். சமீபத்திய விகிதங்களுக்கு கிளையை தொடர்பு கொள்ளவும்.",
    silver_tagline: "ஸ்மார்ட் தொடக்கம்",
    silver_cta: "சில்வரில் தொடங்குங்கள்",
    silver_f1: "குறைந்தபட்சம் ₹10,000 முதலீடு",
    silver_f2: "காலாண்டு வட்டி செலுத்துதல்",
    silver_f3: "முதிர்வில் நெகிழ்வான திரும்பப் பெறுதல்",
    silver_f4: "RBI இணக்கமான மற்றும் பாதுகாப்பான",
    silver_f5: "இலவச கணக்கு மேலாண்மை",
    silver_f6: "நாமினி வசதி கிடைக்கும்",
    gold_tagline: "மிகவும் பலனளிக்கும்",
    gold_cta: "கோல்டில் முதலீடு செய்யுங்கள்",
    gold_f1: "குறைந்தபட்சம் ₹50,000 முதலீடு",
    gold_f2: "மாதாந்திர வட்டி செலுத்துதல்",
    gold_f3: "முன்னுரிமை வாடிக்கையாளர் ஆதரவு",
    gold_f4: "RBI இணக்கமான & DICGC காப்பீடு",
    gold_f5: "இலவச நிதி ஆலோசனை அமர்வு",
    gold_f6: "FD மீது கடன் வசதி",
    gold_f7: "தானியங்கி புதுப்பிப்பு விருப்பம்",
    platinum_tagline: "எலைட் வருமானங்கள்",
    platinum_cta: "பிளாட்டினம் தேர்வு செய்யுங்கள்",
    platinum_f1: "குறைந்தபட்சம் ₹2,00,000 முதலீடு",
    platinum_f2: "மாதாந்திர வட்டி செலுத்துதல்",
    platinum_f3: "அர்ப்பணிப்பான உறவு மேலாளர்",
    platinum_f4: "RBI இணக்கமான & DICGC காப்பீடு",
    platinum_f5: "பிரத்யேக செல்வ திட்டமிடல்",
    platinum_f6: "FD மீது கடன் வசதி",
    platinum_f7: "வரி திட்டமிடல் உதவி",
    platinum_f8: "விருப்பமான புதுப்பிப்பு விகிதங்கள்",
  },

  kn: {
    section_badge: "ಹೂಡಿಕೆ ಯೋಜನೆಗಳು",
    section_title: "ನಿಮ್ಮ ಸಂಪತ್ತನ್ನು ಬೆಳೆಸಿ",
    section_subtitle: "Ganesh Finance ಜೊತೆಗೆ",
    section_desc: "ನಿಮ್ಮ ಆರ್ಥಿಕ ಗುರಿಗಳಿಗೆ ಸರಿಹೊಂದುವ ಹೂಡಿಕೆ ಯೋಜನೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ. ಭಾರತದಾದ್ಯಂತ ಸಾವಿರಾರು ಹೂಡಿಕೆದಾರರಿಂದ ವಿಶ್ವಾಸಾರ್ಹ, ಖಚಿತ ರಿಟರ್ನ್‌ಗಳು ಮತ್ತು ಸಂಪೂರ್ಣ ಪಾರದರ್ಶಕತೆಯೊಂದಿಗೆ.",
    most_popular: "ಅತ್ಯಂತ ಜನಪ್ರಿಯ",
    per_annum: "ಪ್ರತಿ ವರ್ಷ",
    min_investment: "ಕನಿಷ್ಠ ಹೂಡಿಕೆ",
    tenure: "ಕಾಲಾವಧಿ",
    returns: "ರಿಟರ್ನ್‌ಗಳು",
    invest_now: "ಈಗ ಹೂಡಿಕೆ ಮಾಡಿ",
    know_more: "ಹೆಚ್ಚು ತಿಳಿಯಿರಿ",
    months: "ತಿಂಗಳುಗಳು",
    years: "ವರ್ಷಗಳು",
    guaranteed: "ಖಚಿತ",
    rbi_compliant: "RBI ಅನುಸರಣೆ",
    trusted_investors: "ವಿಶ್ವಾಸಾರ್ಹ ಹೂಡಿಕೆದಾರರು",
    assets_managed: "ನಿರ್ವಹಿಸಲಾದ ಆಸ್ತಿಗಳು",
    years_experience: "ವರ್ಷಗಳ ಅನುಭವ",
    stat_investors: "50,000+",
    stat_assets: "₹500 Cr+",
    stat_years: "15+",
    interest_paid: "ಬಡ್ಡಿ ಪಾವತಿ",
    quarterly: "ತ್ರೈಮಾಸಿಕ",
    monthly: "ಮಾಸಿಕ",
    on_maturity: "ಪರಿಪಕ್ವತೆಯಲ್ಲಿ",
    trust_rbi: "RBI ನೋಂದಾಯಿತ NBFC",
    trust_dicgc: "DICGC ವಿಮೆ ಠೇವಣಿಗಳು",
    trust_iso: "ISO 9001:2015 ಪ್ರಮಾಣಿತ",
    trust_disclaimer: "*ಬಡ್ಡಿ ದರಗಳು ಬದಲಾಗಬಹುದು. ಇತ್ತೀಚಿನ ದರಗಳಿಗೆ ಶಾಖೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    silver_tagline: "ಸ್ಮಾರ್ಟ್ ಆರಂಭ",
    silver_cta: "ಸಿಲ್ವರ್‌ನಿಂದ ಪ್ರಾರಂಭಿಸಿ",
    silver_f1: "ಕನಿಷ್ಠ ₹10,000 ಹೂಡಿಕೆ",
    silver_f2: "ತ್ರೈಮಾಸಿಕ ಬಡ್ಡಿ ಪಾವತಿಗಳು",
    silver_f3: "ಮುಕ್ತಾಯದ ಮೇಲೆ ನಮ್ಯ ಹಿಂಪಡೆಯುವಿಕೆ",
    silver_f4: "RBI ಅನುಸರಣೆ ಮತ್ತು ಸುರಕ್ಷಿತ",
    silver_f5: "ಉಚಿತ ಖಾತೆ ನಿರ್ವಹಣೆ",
    silver_f6: "ನಾಮಿನಿ ಸೌಲಭ್ಯ ಲಭ್ಯ",
    gold_tagline: "ಅತ್ಯಂತ ಲಾಭದಾಯಕ",
    gold_cta: "ಗೋಲ್ಡ್‌ನಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಿ",
    gold_f1: "ಕನಿಷ್ಠ ₹50,000 ಹೂಡಿಕೆ",
    gold_f2: "ಮಾಸಿಕ ಬಡ್ಡಿ ಪಾವತಿಗಳು",
    gold_f3: "ಆದ್ಯತೆಯ ಗ್ರಾಹಕ ಬೆಂಬಲ",
    gold_f4: "RBI ಅನುಸರಣೆ & DICGC ವಿಮೆ",
    gold_f5: "ಉಚಿತ ಹಣಕಾಸು ಸಲಹೆ ಅಧಿವೇಶನ",
    gold_f6: "FD ವಿರುದ್ಧ ಸಾಲ ಸೌಲಭ್ಯ",
    gold_f7: "ಸ್ವಯಂಚಾಲಿತ ನವೀಕರಣ ಆಯ್ಕೆ",
    platinum_tagline: "ಎಲೈಟ್ ರಿಟರ್ನ್ಸ್",
    platinum_cta: "ಪ್ಲಾಟಿನಂ ಆರಿಸಿ",
    platinum_f1: "ಕನಿಷ್ಠ ₹2,00,000 ಹೂಡಿಕೆ",
    platinum_f2: "ಮಾಸಿಕ ಬಡ್ಡಿ ಪಾವತಿಗಳು",
    platinum_f3: "ಮೀಸಲಾದ ರಿಲೇಶನ್‌ಶಿಪ್ ಮ್ಯಾನೇಜರ್",
    platinum_f4: "RBI ಅನುಸರಣೆ & DICGC ವಿಮೆ",
    platinum_f5: "ವಿಶೇಷ ಸಂಪತ್ತು ಯೋಜನೆ",
    platinum_f6: "FD ವಿರುದ್ಧ ಸಾಲ ಸೌಲಭ್ಯ",
    platinum_f7: "ತೆರಿಗೆ ಯೋಜನೆ ಸಹಾಯ",
    platinum_f8: "ಆದ್ಯತೆಯ ನವೀಕರಣ ದರಗಳು",
  },

  as: {
    section_badge: "বিনিয়োগ পৰিকল্পনা",
    section_title: "আপোনাৰ সম্পদ বৃদ্ধি কৰক",
    section_subtitle: "Ganesh Finance ৰ সৈতে",
    section_desc: "আপোনাৰ আৰ্থিক লক্ষ্যৰ অনুসাৰে এটা বিনিয়োগ পৰিকল্পনা বাছক। সমগ্ৰ ভাৰতত হাজাৰ হাজাৰ বিনিয়োগকাৰীৰ দ্বাৰা বিশ্বাসী, গেৰেণ্টিড ৰিটাৰ্ন আৰু সম্পূৰ্ণ স্বচ্ছতাৰ সৈতে।",
    most_popular: "আটাইতকৈ জনপ্ৰিয়",
    per_annum: "প্ৰতি বছৰ",
    min_investment: "ন্যূনতম বিনিয়োগ",
    tenure: "ম্যাদ",
    returns: "ৰিটাৰ্ন",
    invest_now: "এতিয়া বিনিয়োগ কৰক",
    know_more: "অধিক জানক",
    months: "মাহ",
    years: "বছৰ",
    guaranteed: "গেৰেণ্টিড",
    rbi_compliant: "RBI অনুসৰি",
    trusted_investors: "বিশ্বাসযোগ্য বিনিয়োগকাৰী",
    assets_managed: "পৰিচালিত সম্পত্তি",
    years_experience: "বছৰৰ অভিজ্ঞতা",
    stat_investors: "50,000+",
    stat_assets: "₹500 Cr+",
    stat_years: "15+",
    interest_paid: "সুত চৰা",
    quarterly: "ত্ৰৈমাসিক",
    monthly: "মাহেকীয়া",
    on_maturity: "পৰিপক্কতাৰ সময়ত",
    trust_rbi: "RBI পঞ্জীয়নভুক্ত NBFC",
    trust_dicgc: "DICGC বীমা আমানত",
    trust_iso: "ISO 9001:2015 প্ৰমাণিত",
    trust_disclaimer: "*সুদৰ হাৰ সলনি হ'ব পাৰে। সৰ্বশেষ হাৰৰ বাবে শাখাৰ সৈতে যোগাযোগ কৰক।",
    silver_tagline: "স্মাৰ্ট আৰম্ভণি",
    silver_cta: "চিলভাৰেৰে আৰম্ভ কৰক",
    silver_f1: "ন্যূনতম ₹10,000 বিনিয়োগ",
    silver_f2: "ত্ৰৈমাসিক সুত পৰিশোধ",
    silver_f3: "পৰিপক্কতাত নমনীয় উত্তোলন",
    silver_f4: "RBI অনুসৰি আৰু সুৰক্ষিত",
    silver_f5: "বিনামূলীয়া একাউণ্ট পৰিচালনা",
    silver_f6: "নমিনী সুবিধা উপলব্ধ",
    gold_tagline: "সৰ্বাধিক লাভজনক",
    gold_cta: "গোল্ডত বিনিয়োগ কৰক",
    gold_f1: "ন্যূনতম ₹50,000 বিনিয়োগ",
    gold_f2: "মাহেকীয়া সুত পৰিশোধ",
    gold_f3: "অগ্ৰাধিকাৰ গ্ৰাহক সহায়তা",
    gold_f4: "RBI অনুসৰি & DICGC বীমা",
    gold_f5: "বিনামূলীয়া বিত্তীয় পৰামৰ্শ সত্ৰ",
    gold_f6: "FD ৰ বিপৰীতে ঋণ সুবিধা",
    gold_f7: "স্বয়ংক্ৰিয় নবীকৰণ বিকল্প",
    platinum_tagline: "এলিট ৰিটাৰ্ন",
    platinum_cta: "প্লেটিনাম বাছক",
    platinum_f1: "ন্যূনতম ₹2,00,000 বিনিয়োগ",
    platinum_f2: "মাহেকীয়া সুত পৰিশোধ",
    platinum_f3: "নিবেদিত ৰিলেচনশ্বিপ মেনেজাৰ",
    platinum_f4: "RBI অনুসৰি & DICGC বীমা",
    platinum_f5: "বিশেষ ৱেলথ প্লানিং",
    platinum_f6: "FD ৰ বিপৰীতে ঋণ সুবিধা",
    platinum_f7: "কৰ পৰিকল্পনা সহায়তা",
    platinum_f8: "অগ্ৰাধিকাৰ নবীকৰণ হাৰ",
  },

  ur: {
    section_badge: "سرمایہ کاری کے منصوبے",
    section_title: "اپنی دولت بڑھائیں",
    section_subtitle: "Ganesh Finance کے ساتھ",
    section_desc: "اپنے مالیاتی اہداف کے مطابق ایک سرمایہ کاری کا منصوبہ منتخب کریں۔ بھارت بھر میں ہزاروں سرمایہ کاروں کے اعتماد، ضمانت شدہ واپسی اور مکمل شفافیت کے ساتھ۔",
    most_popular: "سب سے مشہور",
    per_annum: "فی سال",
    min_investment: "کم از کم سرمایہ کاری",
    tenure: "مدت",
    returns: "واپسی",
    invest_now: "ابھی سرمایہ کاری کریں",
    know_more: "مزید جانیں",
    months: "ماہ",
    years: "سال",
    guaranteed: "ضمانت شدہ",
    rbi_compliant: "RBI کے مطابق",
    trusted_investors: "قابل اعتماد سرمایہ کار",
    assets_managed: "منظم اثاثے",
    years_experience: "سالوں کا تجربہ",
    stat_investors: "50,000+",
    stat_assets: "₹500 Cr+",
    stat_years: "15+",
    interest_paid: "سود ادائیگی",
    quarterly: "سہ ماہی",
    monthly: "ماہانہ",
    on_maturity: "میچورٹی پر",
    trust_rbi: "RBI رجسٹرڈ NBFC",
    trust_dicgc: "DICGC بیمہ شدہ ڈپازٹ",
    trust_iso: "ISO 9001:2015 سرٹیفائیڈ",
    trust_disclaimer: "*شرح سود تبدیل ہو سکتی ہے۔ تازہ ترین شرحوں کے لیے شاخ سے رابطہ کریں۔",
    silver_tagline: "سمارٹ آغاز",
    silver_cta: "سلور سے شروع کریں",
    silver_f1: "کم از کم ₹10,000 سرمایہ کاری",
    silver_f2: "سہ ماہی سود ادائیگی",
    silver_f3: "میچورٹی پر لچکدار واپسی",
    silver_f4: "RBI کے مطابق اور محفوظ",
    silver_f5: "مفت اکاؤنٹ مینجمنٹ",
    silver_f6: "نامزد سہولت دستیاب",
    gold_tagline: "سب سے زیادہ منافع بخش",
    gold_cta: "گولڈ میں سرمایہ کاری کریں",
    gold_f1: "کم از کم ₹50,000 سرمایہ کاری",
    gold_f2: "ماہانہ سود ادائیگی",
    gold_f3: "ترجیحی کسٹمر سپورٹ",
    gold_f4: "RBI کے مطابق & DICGC بیمہ",
    gold_f5: "مفت مالیاتی مشاورت سیشن",
    gold_f6: "FD پر قرض کی سہولت",
    gold_f7: "خودکار تجدید کا آپشن",
    platinum_tagline: "اعلیٰ منافع",
    platinum_cta: "پلاٹینم چنیں",
    platinum_f1: "کم از کم ₹2,00,000 سرمایہ کاری",
    platinum_f2: "ماہانہ سود ادائیگی",
    platinum_f3: "مخصوص ریلیشن شپ منیجر",
    platinum_f4: "RBI کے مطابق & DICGC بیمہ",
    platinum_f5: "خصوصی ویلتھ پلاننگ",
    platinum_f6: "FD پر قرض کی سہولت",
    platinum_f7: "ٹیکس پلاننگ مدد",
    platinum_f8: "ترجیحی تجدید شرحیں",
  },
};

// ─── Icons
const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const TrendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

// ─── Plan base config (no translatable text here)
const PLAN_CONFIG = [
  {
    id: "silver", tier: "silver",
    rate: "8.5", minInvestment: "₹10,000", tenure: "12 months", interestPaid: "quarterly",
    popular: false, stars: 4,
    featureKeys: ["silver_f1","silver_f2","silver_f3","silver_f4","silver_f5","silver_f6"],
    taglineKey: "silver_tagline", ctaKey: "silver_cta",
    gradient: "from-slate-400 via-gray-300 to-slate-200",
    shimmer: "from-white/0 via-white/60 to-white/0",
    accentBg: "bg-slate-50", borderColor: "border-slate-200",
    badgeBg: "bg-slate-100 text-slate-700",
    ctaBg: "bg-slate-800 hover:bg-slate-700",
    ringColor: "ring-slate-300", iconColor: "text-slate-500",
    checkColor: "text-slate-600", glowColor: "shadow-slate-200/60",
    particleColor: "#94a3b8",
  },
  {
    id: "gold", tier: "gold",
    rate: "11.0", minInvestment: "₹50,000", tenure: "24 months", interestPaid: "monthly",
    popular: true, stars: 5,
    featureKeys: ["gold_f1","gold_f2","gold_f3","gold_f4","gold_f5","gold_f6","gold_f7"],
    taglineKey: "gold_tagline", ctaKey: "gold_cta",
    gradient: "from-yellow-500 via-amber-400 to-yellow-300",
    shimmer: "from-white/0 via-white/70 to-white/0",
    accentBg: "bg-amber-50", borderColor: "border-amber-300",
    badgeBg: "bg-amber-100 text-amber-800",
    ctaBg: "bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600",
    ringColor: "ring-amber-400", iconColor: "text-amber-500",
    checkColor: "text-amber-600", glowColor: "shadow-amber-200/80",
    particleColor: "#f59e0b",
  },
  {
    id: "platinum", tier: "platinum",
    rate: "13.5", minInvestment: "₹2,00,000", tenure: "36 months", interestPaid: "monthly",
    popular: false, stars: 5,
    featureKeys: ["platinum_f1","platinum_f2","platinum_f3","platinum_f4","platinum_f5","platinum_f6","platinum_f7","platinum_f8"],
    taglineKey: "platinum_tagline", ctaKey: "platinum_cta",
    gradient: "from-violet-400 via-purple-300 to-indigo-300",
    shimmer: "from-white/0 via-white/60 to-white/0",
    accentBg: "bg-violet-50", borderColor: "border-violet-200",
    badgeBg: "bg-violet-100 text-violet-800",
    ctaBg: "bg-gradient-to-r from-violet-700 to-purple-600 hover:from-violet-800 hover:to-purple-700",
    ringColor: "ring-violet-300", iconColor: "text-violet-500",
    checkColor: "text-violet-600", glowColor: "shadow-violet-200/60",
    particleColor: "#8b5cf6",
  },
];

const STATS = [
  { icon: UsersIcon, key: "stat_investors", label: "trusted_investors" },
  { icon: BriefcaseIcon, key: "stat_assets", label: "assets_managed" },
  { icon: AwardIcon, key: "stat_years", label: "years_experience" },
];

// ─── Hooks
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Metallic shimmer bar
const MetallicBadge = ({ plan }) => (
  <div className={`relative h-1.5 w-full rounded-full overflow-hidden bg-gradient-to-r ${plan.gradient}`} aria-hidden="true">
    <span className={`absolute inset-0 bg-gradient-to-r ${plan.shimmer} animate-shimmer`} style={{ backgroundSize: "200% 100%" }} />
  </div>
);

// ─── Floating particles (gold only)
const Particles = ({ color }) => (
  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden="true">
    {[...Array(6)].map((_, i) => (
      <span key={i} className="absolute rounded-full opacity-30 animate-float"
        style={{ width:`${6+(i%3)*4}px`, height:`${6+(i%3)*4}px`, background:color,
          left:`${10+i*15}%`, top:`${15+(i%2)*40}%`,
          animationDelay:`${i*0.7}s`, animationDuration:`${3+i*0.5}s` }} />
    ))}
  </div>
);

// ─── Plan Card
const PlanCard = ({ plan, index, inView }) => {
  const { lang } = useLanguage();
  const t = (k) => TRANSLATIONS[lang]?.[k] ?? TRANSLATIONS.en[k] ?? k;
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={`relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-500 cursor-pointer select-none bg-white
        ${plan.popular ? `ring-2 ${plan.ringColor} shadow-2xl ${plan.glowColor} scale-[1.02] md:scale-105 z-10` : `shadow-lg hover:shadow-xl ${plan.borderColor}`}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${hovered && !plan.popular ? `ring-1 ${plan.ringColor}` : ""}`}
      style={{ transitionDelay: inView ? `${index * 120}ms` : "0ms" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${plan.tier} - ${plan.rate}% ${t("per_annum")}`}
    >
      {plan.tier === "gold" && <Particles color={plan.particleColor} />}

      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-b-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-[11px] font-black tracking-widest uppercase shadow-lg">
            <StarIcon filled /> {t("most_popular")} <StarIcon filled />
          </span>
        </div>
      )}

      <MetallicBadge plan={plan} />

      {/* Header */}
      <div className={`px-6 pt-7 pb-5 ${plan.accentBg} border-b ${plan.borderColor}`}>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-md`}>
            <TrendIcon />
          </div>
          <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${plan.badgeBg}`}>
            {plan.tier}
          </span>
        </div>

        <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight capitalize">{plan.tier} Plan</h3>
        <p className={`text-xs font-semibold mt-0.5 ${plan.iconColor}`}>{t(plan.taglineKey)}</p>

        <div className={`flex items-center gap-0.5 mt-2.5 ${plan.iconColor}`}>
          {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < plan.stars} />)}
        </div>

        <div className="mt-5 flex items-end gap-1">
          <span className="text-5xl font-black text-gray-900 leading-none tracking-tight">{plan.rate}%</span>
          <span className="text-sm text-gray-500 font-semibold mb-1 leading-tight">{t("per_annum")}</span>
        </div>
        <p className={`text-[11px] font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1 ${plan.iconColor}`}>
          <ShieldIcon /> {t("guaranteed")} · {t("rbi_compliant")}
        </p>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {[
          { label: t("min_investment"), value: plan.minInvestment },
          { label: t("tenure"), value: plan.tenure },
          { label: t("interest_paid"), value: t(plan.interestPaid) },
        ].map(({ label, value }) => (
          <div key={label} className="px-3 py-3.5 text-center">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide leading-none mb-1">{label}</p>
            <p className="text-[12px] font-black text-gray-800 leading-tight">{value}</p>
          </div>
        ))}
      </div>

      {/* Features — fully translated */}
      <ul className="px-6 py-5 space-y-2.5 flex-1" role="list">
        {plan.featureKeys.map((key) => (
          <li key={key} className="flex items-start gap-2.5 text-[13px] text-gray-700 font-medium">
            <span className={`mt-0.5 ${plan.checkColor}`}><CheckIcon /></span>
            {t(key)}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="px-6 pb-6 pt-2 space-y-2.5">
        <Link to={`/investors/${plan.tier}-plan`}
          className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.97] shadow-md hover:shadow-lg ${plan.ctaBg}`}>
          {t(plan.ctaKey)} <ArrowIcon />
        </Link>
        <Link to={`/investors/${plan.tier}-plan`}
          className={`flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${plan.borderColor} ${plan.iconColor}`}>
          {t("know_more")}
        </Link>
      </div>
    </article>
  );
};

// ─── Stat Card
const StatCard = ({ icon: Icon, statKey, label, inView, delay }) => {
  const { lang } = useLanguage();
  const t = (k) => TRANSLATIONS[lang]?.[k] ?? TRANSLATIONS.en[k] ?? k;
  return (
    <div className={`flex flex-col items-center gap-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: delay }}>
      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shadow-sm">
        <Icon />
      </div>
      <p className="text-3xl font-black text-gray-900 tracking-tight">{t(statKey)}</p>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">{t(label)}</p>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function InvestCard() {
  const { lang } = useLanguage();
  const t = (k) => TRANSLATIONS[lang]?.[k] ?? TRANSLATIONS.en[k] ?? k;
  const [sectionRef, sectionInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);

  return (
    <section ref={sectionRef}
      className="relative py-20 sm:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
      aria-labelledby="invest-section-heading">

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-50/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <header className={`text-center mb-16 transition-all duration-700 ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-bold tracking-widest uppercase mb-5">
            <TrendIcon /> {t("section_badge")}
          </span>
          <h2 id="invest-section-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight">
            {t("section_title")}{" "}
            <span className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              {t("section_subtitle")}
            </span>
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-base text-gray-500 leading-relaxed font-medium">{t("section_desc")}</p>
        </header>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-6 sm:gap-10 mb-16 max-w-lg mx-auto">
          {STATS.map((s, i) => (
            <StatCard key={s.key} icon={s.icon} statKey={s.key} label={s.label}
              inView={statsInView} delay={`${i * 120}ms`} />
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start" role="list">
          {PLAN_CONFIG.map((plan, i) => (
            <div key={plan.id} role="listitem">
              <PlanCard plan={plan} index={i} inView={sectionInView} />
            </div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className={`mt-14 text-center transition-all duration-700 delay-500 ${sectionInView ? "opacity-100" : "opacity-0"}`}>
          <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              { icon: ShieldIcon, key: "trust_rbi" },
              { icon: CheckIcon,  key: "trust_dicgc" },
              { icon: AwardIcon,  key: "trust_iso" },
            ].map(({ icon: Icon, key }) => (
              <span key={key} className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                <span className="text-green-500"><Icon /></span>
                {t(key)}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-gray-400 max-w-md mx-auto">{t("trust_disclaimer")}</p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes float { 0%,100% { transform:translateY(0) scale(1); opacity:.25; } 50% { transform:translateY(-12px) scale(1.1); opacity:.45; } }
        .animate-shimmer { animation: shimmer 2.8s linear infinite; background-size: 200% 100%; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
}