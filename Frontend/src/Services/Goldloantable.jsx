import { useState, useRef } from "react";
import { useLanguage } from '../Common/Navbaar'; // imports LanguageContext from your Navbar file

// ═══════════════════════════════════════════════════════════════════════════════
// ─── SEO META (inject into <head> via Helmet or directly in page)
// ═══════════════════════════════════════════════════════════════════════════════
// <title>Gold Loan Service Charges | Shree Ganesh Finance</title>
// <meta name="description" content="Complete list of Gold Loan service charges at Shree Ganesh Finance including processing fees, security charges, SMS charges and more." />
// <meta name="keywords" content="gold loan charges, gold loan fees, Shree Ganesh Finance, gold loan interest, service charges" />

// ═══════════════════════════════════════════════════════════════════════════════
// ─── TRANSLATIONS — ALL 9 LANGUAGES
// ═══════════════════════════════════════════════════════════════════════════════
const T = {
  en: {
    pageTitle: "Service Charges Relating To Gold Loan",
    pageSubtitle: "Transparent fee structure for all Gold Loan products at Shree Ganesh Finance",
    slNo: "SL No.",
    typeOfCharges: "Type of Charges",
    corporate: "Corporate",
    rateOfCharges: "Rate of Charges Applicable",
    downloadPdf: "Download PDF",
    ifLoanAmount: "If Loan Amount",
    amount: "Amount",
    note: "* All charges are subject to applicable GST. For latest rates, please visit your nearest Shree Ganesh Finance branch.",
    southernBranches: "Southern Branches",
    restOfIndia: "Rest of India",
    all: "ALL",
    rows: [
      {
        id: 1,
        type: "Service charges – Fresh loan – Rate applicable on loan amount (IPL)",
        corporate: "Southern Branches",
        rate: "IPL (1%) (For 12 months period only)",
      },
      {
        id: 2,
        type: "Service charges – Fresh loan – Rate applicable per account (ZIL/ZIP)",
        corporate: "ALL",
        rate: "ZIL/ZIP – Rs.50/loan",
      },
      {
        id: 3,
        type: "Service charges on fresh loan under MEI scheme",
        corporate: "ALL",
        rate: "0.60% of loan amount",
      },
      {
        id: 4,
        type: "Top-up services charges – Rate applicable on enhanced amount",
        corporate: "All",
        rate: "2% of enhanced amount (For GL schemes having 1st slab ROI <15% with rebate facility)",
      },
      {
        id: 5,
        type: "Security charges – Fresh loan",
        corporate: "Rest of India",
        rate: "0.15% of loan amount – Minimum Rs.100/- and Maximum Rs.1,000/-",
      },
      {
        id: 6,
        type: "Token charges (For schemes except given in Sl no.1, 2, 10 & 11)",
        corporate: "Southern Branches",
        rate: "Loan up to Rs.1,00,000/- → Rs.20/-; Above Rs.1,00,000/- → Rs.100/-; Where 1st slab interest rate is <13% after rebate, other cases Rs.50/-",
      },
      {
        id: 7,
        type: "SMS charges",
        corporate: "ALL",
        rate: "Rs.5/per quarter at the time of closure or renewal",
      },
      {
        id: 8,
        type: "Notice Charges (Applicable for loans under all schemes)",
        corporate: "Southern Branches / Rest of India",
        rate: "3 ordinary notice Rs.30/each and 4th notice – Registered Rs.100/-; Auction Notice charges Rs.120/- (Rest of India only)",
      },
      {
        id: 9,
        type: "Token lost charges (Applicable for loans under all schemes)",
        corporate: "ALL",
        rate: "Rs.25/- (in addition to cost of stamp paper applicable)",
      },
      {
        id: 10,
        type: "Safe Custody Charges",
        corporate: "ALL",
        rate: "Rs.5/per gram per month, payable at the time of closure or renewal",
      },
      {
        id: 11,
        type: "Stamp duty levied by State Governments",
        corporate: "Karnataka, Andhra and Rajasthan",
        rate: "Actuals wherever applicable",
      },
      {
        id: 12,
        type: "GCS",
        corporate: "Southern Branches",
        rate: "1. Rs.999/- per 6 months (in case the limit is not used over a period of 6 months)\n2. If the transaction is through branches then Rs.99/- per transaction",
      },
      {
        id: 13,
        type: "GCL",
        corporate: "Rest of India",
        rate: "1. Rs.999/- per 6 months (in case the limit is not used over a period of 6 months)\n2. Part release charges of Rs.499/- per transaction\n3. If the transaction is through branches then Rs.99/- per transaction",
      },
      {
        id: 14,
        type: "Loan @ Home charges",
        corporate: "ALL",
        rate: "Upto Rs.500/- for loan @ home services",
      },
      {
        id: 15,
        type: "CAC (Credit Appraisal Charges) – If total exposure > Rs.3 L",
        corporate: "Southern Branches",
        rateTable: [
          { range: ">Rs.3 L to Rs.5 L", amount: "Rs.25/-" },
          { range: ">Rs.5 L to Rs.15 L", amount: "Rs.40/-" },
          { range: ">Rs.15 L to Rs.50 L", amount: "Rs.50/-" },
          { range: ">Rs.50 L", amount: "Rs.75/-" },
        ],
      },
      {
        id: 16,
        type: "Door to Door collection charges (Follow up for interest / loan recovery)",
        corporate: "Southern Branches",
        rate: "Rs.150/- plus GST per customer for recovery made through customer follow up visit",
      },
    ],
  },
  hi: {
    pageTitle: "गोल्ड लोन से संबंधित सेवा शुल्क",
    pageSubtitle: "श्री गणेश फाइनेंस में सभी गोल्ड लोन उत्पादों के लिए पारदर्शी शुल्क संरचना",
    slNo: "क्र.सं.",
    typeOfCharges: "शुल्क का प्रकार",
    corporate: "कॉर्पोरेट",
    rateOfCharges: "लागू शुल्क दर",
    downloadPdf: "PDF डाउनलोड करें",
    ifLoanAmount: "यदि ऋण राशि",
    amount: "राशि",
    note: "* सभी शुल्क पर लागू GST अतिरिक्त है। नवीनतम दरों के लिए अपनी नजदीकी श्री गणेश फाइनेंस शाखा से संपर्क करें।",
    southernBranches: "दक्षिणी शाखाएं",
    restOfIndia: "शेष भारत",
    all: "सभी",
    rows: [
      { id: 1, type: "सेवा शुल्क – नया ऋण – ऋण राशि पर लागू दर (IPL)", corporate: "दक्षिणी शाखाएं", rate: "IPL (1%) (केवल 12 माह की अवधि के लिए)" },
      { id: 2, type: "सेवा शुल्क – नया ऋण – प्रति खाता लागू दर (ZIL/ZIP)", corporate: "सभी", rate: "ZIL/ZIP – Rs.50/ऋण" },
      { id: 3, type: "MEI योजना के तहत नए ऋण पर सेवा शुल्क", corporate: "सभी", rate: "ऋण राशि का 0.60%" },
      { id: 4, type: "टॉप-अप सेवा शुल्क – बढ़ी हुई राशि पर लागू दर", corporate: "सभी", rate: "बढ़ी हुई राशि का 2% (GL योजनाओं के लिए जहां 1st स्लैब ROI <15% रिबेट सुविधा के साथ)" },
      { id: 5, type: "सुरक्षा शुल्क – नया ऋण", corporate: "शेष भारत", rate: "ऋण राशि का 0.15% – न्यूनतम Rs.100/- और अधिकतम Rs.1,000/-" },
      { id: 6, type: "टोकन शुल्क (क्र.सं. 1, 2, 10 और 11 को छोड़कर अन्य योजनाओं के लिए)", corporate: "दक्षिणी शाखाएं", rate: "Rs.1,00,000/- तक के ऋण → Rs.20/-; Rs.1,00,000/- से अधिक → Rs.100/-; जहां 1st स्लैब ब्याज दर रिबेट के बाद <13%, अन्य मामलों में Rs.50/-" },
      { id: 7, type: "SMS शुल्क", corporate: "सभी", rate: "बंद या नवीनीकरण के समय Rs.5/प्रति तिमाही" },
      { id: 8, type: "नोटिस शुल्क (सभी योजनाओं के तहत ऋण पर लागू)", corporate: "दक्षिणी शाखाएं / शेष भारत", rate: "3 साधारण नोटिस Rs.30/प्रत्येक और 4था नोटिस – रजिस्टर्ड Rs.100/-; नीलामी नोटिस शुल्क Rs.120/- (केवल शेष भारत)" },
      { id: 9, type: "टोकन खो जाने का शुल्क (सभी योजनाओं के तहत ऋण पर लागू)", corporate: "सभी", rate: "Rs.25/- (लागू स्टांप पेपर की लागत के अतिरिक्त)" },
      { id: 10, type: "सुरक्षित अभिरक्षा शुल्क", corporate: "सभी", rate: "Rs.5/प्रति ग्राम प्रति माह, बंद या नवीनीकरण के समय देय" },
      { id: 11, type: "राज्य सरकारों द्वारा लगाया गया स्टांप शुल्क", corporate: "कर्नाटक, आंध्र और राजस्थान", rate: "जहां भी लागू हो, वास्तविक" },
      { id: 12, type: "GCS", corporate: "दक्षिणी शाखाएं", rate: "1. Rs.999/- प्रति 6 माह (यदि 6 माह में सीमा का उपयोग न हो)\n2. शाखा के माध्यम से लेनदेन पर Rs.99/- प्रति लेनदेन" },
      { id: 13, type: "GCL", corporate: "शेष भारत", rate: "1. Rs.999/- प्रति 6 माह (यदि 6 माह में सीमा का उपयोग न हो)\n2. आंशिक रिलीज शुल्क Rs.499/- प्रति लेनदेन\n3. शाखा के माध्यम से लेनदेन पर Rs.99/- प्रति लेनदेन" },
      { id: 14, type: "घर पर ऋण शुल्क", corporate: "सभी", rate: "घर पर ऋण सेवाओं के लिए Rs.500/- तक" },
      { id: 15, type: "CAC (क्रेडिट मूल्यांकन शुल्क) – यदि कुल एक्सपोजर > Rs.3 L", corporate: "दक्षिणी शाखाएं", rateTable: [{ range: ">Rs.3 L से Rs.5 L", amount: "Rs.25/-" }, { range: ">Rs.5 L से Rs.15 L", amount: "Rs.40/-" }, { range: ">Rs.15 L से Rs.50 L", amount: "Rs.50/-" }, { range: ">Rs.50 L", amount: "Rs.75/-" }] },
      { id: 16, type: "डोर टू डोर संग्रह शुल्क (ब्याज/ऋण वसूली के लिए फॉलो-अप)", corporate: "दक्षिणी शाखाएं", rate: "ग्राहक फॉलो-अप विजिट के माध्यम से वसूली के लिए Rs.150/- + GST प्रति ग्राहक" },
    ],
  },
  mr: {
    pageTitle: "गोल्ड लोनशी संबंधित सेवा शुल्क",
    pageSubtitle: "श्री गणेश फायनान्सच्या सर्व गोल्ड लोन उत्पादांसाठी पारदर्शी शुल्क रचना",
    slNo: "अ.क्र.",
    typeOfCharges: "शुल्काचा प्रकार",
    corporate: "कॉर्पोरेट",
    rateOfCharges: "लागू शुल्क दर",
    downloadPdf: "PDF डाउनलोड करा",
    ifLoanAmount: "कर्ज रक्कम असल्यास",
    amount: "रक्कम",
    note: "* सर्व शुल्कांवर लागू GST अतिरिक्त आहे. अद्ययावत दरांसाठी जवळच्या श्री गणेश फायनान्स शाखेला भेट द्या.",
    southernBranches: "दक्षिण शाखा",
    restOfIndia: "उर्वरित भारत",
    all: "सर्व",
    rows: [
      { id: 1, type: "सेवा शुल्क – नवीन कर्ज – कर्ज रकमेवर लागू दर (IPL)", corporate: "दक्षिण शाखा", rate: "IPL (1%) (केवळ 12 महिन्यांच्या कालावधीसाठी)" },
      { id: 2, type: "सेवा शुल्क – नवीन कर्ज – प्रति खाते लागू दर (ZIL/ZIP)", corporate: "सर्व", rate: "ZIL/ZIP – Rs.50/कर्ज" },
      { id: 3, type: "MEI योजनेअंतर्गत नवीन कर्जावर सेवा शुल्क", corporate: "सर्व", rate: "कर्ज रकमेच्या 0.60%" },
      { id: 4, type: "टॉप-अप सेवा शुल्क – वाढीव रकमेवर लागू दर", corporate: "सर्व", rate: "वाढीव रकमेच्या 2% (GL योजनांसाठी जेथे 1st स्लॅब ROI <15% सवलत सुविधेसह)" },
      { id: 5, type: "सुरक्षा शुल्क – नवीन कर्ज", corporate: "उर्वरित भारत", rate: "कर्ज रकमेचे 0.15% – किमान Rs.100/- आणि कमाल Rs.1,000/-" },
      { id: 6, type: "टोकन शुल्क (अ.क्र. 1, 2, 10 आणि 11 वगळता इतर योजनांसाठी)", corporate: "दक्षिण शाखा", rate: "Rs.1,00,000/- पर्यंत कर्ज → Rs.20/-; Rs.1,00,000/- पेक्षा जास्त → Rs.100/-; जेथे 1st स्लॅब व्याज दर सवलतीनंतर <13%, इतर प्रकरणांत Rs.50/-" },
      { id: 7, type: "SMS शुल्क", corporate: "सर्व", rate: "बंद किंवा नूतनीकरणाच्या वेळी Rs.5/प्रति तिमाही" },
      { id: 8, type: "नोटीस शुल्क (सर्व योजनांतर्गत कर्जांना लागू)", corporate: "दक्षिण शाखा / उर्वरित भारत", rate: "3 सामान्य नोटीस Rs.30/प्रत्येक आणि 4थी नोटीस – नोंदणीकृत Rs.100/-; लिलाव नोटीस शुल्क Rs.120/- (फक्त उर्वरित भारत)" },
      { id: 9, type: "टोकन हरवणे शुल्क (सर्व योजनांतर्गत कर्जांना लागू)", corporate: "सर्व", rate: "Rs.25/- (लागू स्टँप पेपरच्या खर्चाव्यतिरिक्त)" },
      { id: 10, type: "सुरक्षित ताबा शुल्क", corporate: "सर्व", rate: "Rs.5/प्रति ग्रॅम प्रति महिना, बंद किंवा नूतनीकरणाच्या वेळी देय" },
      { id: 11, type: "राज्य सरकारांनी आकारलेले मुद्रांक शुल्क", corporate: "कर्नाटक, आंध्र आणि राजस्थान", rate: "जेथे लागू असेल तेथे प्रत्यक्ष" },
      { id: 12, type: "GCS", corporate: "दक्षिण शाखा", rate: "1. Rs.999/- प्रति 6 महिने (6 महिन्यांत मर्यादा न वापरल्यास)\n2. शाखेद्वारे व्यवहार असल्यास Rs.99/- प्रति व्यवहार" },
      { id: 13, type: "GCL", corporate: "उर्वरित भारत", rate: "1. Rs.999/- प्रति 6 महिने (6 महिन्यांत मर्यादा न वापरल्यास)\n2. आंशिक सुटका शुल्क Rs.499/- प्रति व्यवहार\n3. शाखेद्वारे व्यवहार असल्यास Rs.99/- प्रति व्यवहार" },
      { id: 14, type: "घरी कर्ज शुल्क", corporate: "सर्व", rate: "घरी कर्ज सेवांसाठी Rs.500/- पर्यंत" },
      { id: 15, type: "CAC (क्रेडिट मूल्यांकन शुल्क) – एकूण एक्सपोजर > Rs.3 L असल्यास", corporate: "दक्षिण शाखा", rateTable: [{ range: ">Rs.3 L ते Rs.5 L", amount: "Rs.25/-" }, { range: ">Rs.5 L ते Rs.15 L", amount: "Rs.40/-" }, { range: ">Rs.15 L ते Rs.50 L", amount: "Rs.50/-" }, { range: ">Rs.50 L", amount: "Rs.75/-" }] },
      { id: 16, type: "डोअर टू डोअर संकलन शुल्क (व्याज/कर्ज वसुलीसाठी पाठपुरावा)", corporate: "दक्षिण शाखा", rate: "ग्राहक फॉलो-अप भेटीद्वारे वसुलीसाठी Rs.150/- + GST प्रति ग्राहक" },
    ],
  },
  gu: {
    pageTitle: "ગોલ્ડ લોન સંબંધિત સેવા શુલ્ક",
    pageSubtitle: "શ્રી ગણેશ ફાઇનાન્સ ખાતે તમામ ગોલ્ડ લોન ઉત્પાદો માટે પારદર્શક શુલ્ક માળખું",
    slNo: "ક્ર.નં.",
    typeOfCharges: "શુલ્કનો પ્રકાર",
    corporate: "કોર્પોરેટ",
    rateOfCharges: "લાગુ શુલ્ક દર",
    downloadPdf: "PDF ડાઉનલોડ કરો",
    ifLoanAmount: "જો લોન રકમ",
    amount: "રકમ",
    note: "* તમામ શુલ્ક પર લાગુ GST વધારાનો છે. નવીનતમ દરો માટે નજીકની શ્રી ગણેશ ફાઇનાન્સ શાખાની મુલાકાત લો.",
    southernBranches: "દક્ષિણ શાખાઓ",
    restOfIndia: "ભારતના બાકી ભાગ",
    all: "બધા",
    rows: [
      { id: 1, type: "સેવા શુલ્ક – નવી લોન – લોન રકમ પર લાગુ દર (IPL)", corporate: "દક્ષિણ શાખાઓ", rate: "IPL (1%) (માત્ર 12 મહિનાના સમયગાળા માટે)" },
      { id: 2, type: "સેવા શુલ્ક – નવી લોન – પ્રતિ ખાતા લાગુ દર (ZIL/ZIP)", corporate: "બધા", rate: "ZIL/ZIP – Rs.50/લોન" },
      { id: 3, type: "MEI યોજના હેઠળ નવી લોન પર સેવા શુલ્ક", corporate: "બધા", rate: "લોન રકમના 0.60%" },
      { id: 4, type: "ટોપ-અપ સેવા શુલ્ક – વધેલી રકમ પર લાગુ દર", corporate: "બધા", rate: "વધેલી રકમના 2% (GL યોજનાઓ માટે જ્યાં 1st સ્લેબ ROI <15% રિબેટ સુવિધા સાથે)" },
      { id: 5, type: "સુરક્ષા શુલ્ક – નવી લોન", corporate: "ભારતના બાકી ભાગ", rate: "લોન રકમના 0.15% – લઘુત્તમ Rs.100/- અને મહત્તમ Rs.1,000/-" },
      { id: 6, type: "ટોકન શુલ્ક (ક્ર.નં. 1, 2, 10 અને 11 સિવાયની યોજનાઓ માટે)", corporate: "દક્ષિણ શાખાઓ", rate: "Rs.1,00,000/- સુધીની લોન → Rs.20/-; Rs.1,00,000/- થી વધુ → Rs.100/-; જ્યાં 1st સ્લેબ વ્યાજ દર રિબેટ પછી <13%, અન્ય કિસ્સામાં Rs.50/-" },
      { id: 7, type: "SMS શુલ્ક", corporate: "બધા", rate: "બંધ અથવા નવીકરણ સમયે Rs.5/પ્રતિ ત્રિમાસિક" },
      { id: 8, type: "નોટિસ શુલ્ક (તમામ યોજનાઓ હેઠળ લોન માટે લાગુ)", corporate: "દક્ષિણ શાખાઓ / ભારતના બાકી ભાગ", rate: "3 સામાન્ય નોટિસ Rs.30/પ્રત્યેક અને 4થી નોટિસ – રજિ. Rs.100/-; હરાજી નોટિસ શુલ્ક Rs.120/- (ફક્ત ભારતના બાકી ભાગ)" },
      { id: 9, type: "ટોકન ખોવા શુલ્ક (તમામ યોજનાઓ હેઠળ લોન માટે લાગુ)", corporate: "બધા", rate: "Rs.25/- (લાગુ સ્ટેમ્પ પેપરની કિંમત ઉપરાંત)" },
      { id: 10, type: "સુરક્ષિત કસ્ટડી શુલ્ક", corporate: "બધા", rate: "Rs.5/પ્રતિ ગ્રામ પ્રતિ માસ, બંધ અથવા નવીકરણ સમયે ચૂકવવાપાત્ર" },
      { id: 11, type: "રાજ્ય સરકારો દ્વારા લેવામાં આવતો સ્ટેમ્પ ડ્યૂટી", corporate: "કર્ણાટક, આંધ્ર અને રાજસ્થાન", rate: "જ્યાં પણ લાગુ હોય ત્યાં વાસ્તવિક" },
      { id: 12, type: "GCS", corporate: "દક્ષિણ શાખાઓ", rate: "1. Rs.999/- પ્રતિ 6 મહિના (6 મહિનામાં મર્યાદા ન વપરાય તો)\n2. શાખા દ્વારા વ્યવહાર હોય તો Rs.99/- પ્રતિ વ્યવહાર" },
      { id: 13, type: "GCL", corporate: "ભારતના બાકી ભાગ", rate: "1. Rs.999/- પ્રતિ 6 મહિના (6 મહિનામાં મર્યાદા ન વપરાય તો)\n2. આંશિક રિલીઝ શુલ્ક Rs.499/- પ્રતિ વ્યવહાર\n3. શાખા દ્વારા વ્યવહાર હોય તો Rs.99/- પ્રતિ વ્યવહાર" },
      { id: 14, type: "ઘરે લોન શુલ્ક", corporate: "બધા", rate: "ઘરે લોન સેવાઓ માટે Rs.500/- સુધી" },
      { id: 15, type: "CAC (ક્રેડિટ મૂલ્યાંકન શુલ્ક) – કુલ એક્સ્પોઝર > Rs.3 L હોય તો", corporate: "દક્ષિણ શાખાઓ", rateTable: [{ range: ">Rs.3 L થી Rs.5 L", amount: "Rs.25/-" }, { range: ">Rs.5 L થી Rs.15 L", amount: "Rs.40/-" }, { range: ">Rs.15 L થી Rs.50 L", amount: "Rs.50/-" }, { range: ">Rs.50 L", amount: "Rs.75/-" }] },
      { id: 16, type: "ડોર ટુ ડોર કલેક્શન શુલ્ક (વ્યાજ/લોન વસૂલાત માટે ફૉલો-અપ)", corporate: "દક્ષિણ શાખાઓ", rate: "ગ્રાહક ફૉલો-અપ મુલાકાત દ્વારા વસૂલાત માટે Rs.150/- + GST પ્રતિ ગ્રાહક" },
    ],
  },
  te: {
    pageTitle: "గోల్డ్ లోన్‌కు సంబంధించిన సేవా చార్జీలు",
    pageSubtitle: "శ్రీ గణేశ్ ఫైనాన్స్‌లో అన్ని గోల్డ్ లోన్ ఉత్పత్తులకు పారదర్శక రుసుము నిర్మాణం",
    slNo: "వ.సం.",
    typeOfCharges: "చార్జీ రకం",
    corporate: "కార్పొరేట్",
    rateOfCharges: "వర్తించే చార్జీ రేటు",
    downloadPdf: "PDF డౌన్‌లోడ్ చేయండి",
    ifLoanAmount: "రుణ మొత్తం అయితే",
    amount: "మొత్తం",
    note: "* అన్ని చార్జీలపై వర్తించే GST అదనంగా ఉంటుంది. తాజా రేట్ల కోసం సమీప శ్రీ గణేశ్ ఫైనాన్స్ శాఖను సందర్శించండి.",
    southernBranches: "దక్షిణ శాఖలు",
    restOfIndia: "మిగతా భారతదేశం",
    all: "అన్నీ",
    rows: [
      { id: 1, type: "సేవా చార్జీ – కొత్త రుణం – రుణ మొత్తంపై వర్తించే రేటు (IPL)", corporate: "దక్షిణ శాఖలు", rate: "IPL (1%) (కేవలం 12 నెలల వ్యవధికి మాత్రమే)" },
      { id: 2, type: "సేవా చార్జీ – కొత్త రుణం – ఖాతాకు వర్తించే రేటు (ZIL/ZIP)", corporate: "అన్నీ", rate: "ZIL/ZIP – Rs.50/రుణం" },
      { id: 3, type: "MEI పథకం కింద కొత్త రుణంపై సేవా చార్జీ", corporate: "అన్నీ", rate: "రుణ మొత్తంలో 0.60%" },
      { id: 4, type: "టాప్-అప్ సేవా చార్జీ – పెంచిన మొత్తంపై వర్తించే రేటు", corporate: "అన్నీ", rate: "పెంచిన మొత్తంలో 2% (GL పథకాలకు 1వ స్లాబ్ ROI <15% రిబేట్ సదుపాయంతో)" },
      { id: 5, type: "భద్రతా చార్జీ – కొత్త రుణం", corporate: "మిగతా భారతదేశం", rate: "రుణ మొత్తంలో 0.15% – కనిష్ఠం Rs.100/- మరియు గరిష్ఠం Rs.1,000/-" },
      { id: 6, type: "టోకెన్ చార్జీ (వ.సం. 1, 2, 10 మరియు 11 మినహా ఇతర పథకాలకు)", corporate: "దక్షిణ శాఖలు", rate: "Rs.1,00,000/- వరకు రుణం → Rs.20/-; Rs.1,00,000/- పైన → Rs.100/-; రిబేట్ తర్వాత 1వ స్లాబ్ వడ్డీ రేటు <13% అయితే, ఇతర సందర్భాల్లో Rs.50/-" },
      { id: 7, type: "SMS చార్జీ", corporate: "అన్నీ", rate: "మూసివేత లేదా నూతనీకరణ సమయంలో Rs.5/త్రైమాసికానికి" },
      { id: 8, type: "నోటీసు చార్జీ (అన్ని పథకాల కింద రుణాలకు వర్తించు)", corporate: "దక్షిణ శాఖలు / మిగతా భారతదేశం", rate: "3 సాధారణ నోటీసులు Rs.30/చొప్పున మరియు 4వ నోటీసు – నమోదు Rs.100/-; వేలం నోటీసు చార్జీ Rs.120/- (మిగతా భారతదేశం మాత్రమే)" },
      { id: 9, type: "టోకెన్ పోగొట్టుకున్న చార్జీ (అన్ని పథకాల కింద రుణాలకు వర్తించు)", corporate: "అన్నీ", rate: "Rs.25/- (వర్తించే స్టాంప్ పేపర్ ఖర్చుకు అదనంగా)" },
      { id: 10, type: "సురక్షిత నిల్వ చార్జీ", corporate: "అన్నీ", rate: "Rs.5/గ్రాము/నెల, మూసివేత లేదా నూతనీకరణ సమయంలో చెల్లించాలి" },
      { id: 11, type: "రాష్ట్ర ప్రభుత్వాలు విధించే స్టాంప్ డ్యూటీ", corporate: "కర్ణాటక, ఆంధ్ర మరియు రాజస్థాన్", rate: "వర్తించిన చోట వాస్తవ మొత్తాలు" },
      { id: 12, type: "GCS", corporate: "దక్షిణ శాఖలు", rate: "1. Rs.999/- 6 నెలలకు (6 నెలల్లో హద్దు వాడకపోతే)\n2. శాఖ ద్వారా లావాదేవీ అయితే Rs.99/- లావాదేవీకి" },
      { id: 13, type: "GCL", corporate: "మిగతా భారతదేశం", rate: "1. Rs.999/- 6 నెలలకు (6 నెలల్లో హద్దు వాడకపోతే)\n2. పాక్షిక విడుదల చార్జీ Rs.499/- లావాదేవీకి\n3. శాఖ ద్వారా లావాదేవీ అయితే Rs.99/- లావాదేవీకి" },
      { id: 14, type: "ఇంట్లో రుణం చార్జీ", corporate: "అన్నీ", rate: "ఇంట్లో రుణ సేవలకు Rs.500/- వరకు" },
      { id: 15, type: "CAC (క్రెడిట్ అంచనా చార్జీ) – మొత్తం ఎక్స్‌పోజర్ > Rs.3 L అయితే", corporate: "దక్షిణ శాఖలు", rateTable: [{ range: ">Rs.3 L నుండి Rs.5 L", amount: "Rs.25/-" }, { range: ">Rs.5 L నుండి Rs.15 L", amount: "Rs.40/-" }, { range: ">Rs.15 L నుండి Rs.50 L", amount: "Rs.50/-" }, { range: ">Rs.50 L", amount: "Rs.75/-" }] },
      { id: 16, type: "డోర్ టు డోర్ వసూలు చార్జీ (వడ్డీ/రుణ వసూలు కోసం ఫాలో-అప్)", corporate: "దక్షిణ శాఖలు", rate: "కస్టమర్ ఫాలో-అప్ సందర్శన ద్వారా వసూలుకు Rs.150/- + GST కస్టమర్‌కు" },
    ],
  },
  ta: {
    pageTitle: "தங்கக் கடனுக்கு தொடர்பான சேவைக் கட்டணங்கள்",
    pageSubtitle: "ஸ்ரீ கணேஷ் ஃபைனான்ஸில் அனைத்து தங்கக் கடன் தயாரிப்புகளுக்கான வெளிப்படையான கட்டண அமைப்பு",
    slNo: "வ.எண்.",
    typeOfCharges: "கட்டண வகை",
    corporate: "கார்ப்பரேட்",
    rateOfCharges: "பொருந்தும் கட்டண விகிதம்",
    downloadPdf: "PDF பதிவிறக்கம்",
    ifLoanAmount: "கடன் தொகை இருந்தால்",
    amount: "தொகை",
    note: "* அனைத்து கட்டணங்களுக்கும் பொருந்தும் GST கூடுதல். சமீபத்திய விகிதங்களுக்கு அருகிலுள்ள ஸ்ரீ கணேஷ் ஃபைனான்ஸ் கிளையை அணுகவும்.",
    southernBranches: "தெற்கு கிளைகள்",
    restOfIndia: "இந்தியாவின் மற்ற பகுதிகள்",
    all: "அனைத்தும்",
    rows: [
      { id: 1, type: "சேவைக் கட்டணம் – புதிய கடன் – கடன் தொகையில் பொருந்தும் விகிதம் (IPL)", corporate: "தெற்கு கிளைகள்", rate: "IPL (1%) (12 மாத காலத்திற்கு மட்டும்)" },
      { id: 2, type: "சேவைக் கட்டணம் – புதிய கடன் – கணக்கிற்கு பொருந்தும் விகிதம் (ZIL/ZIP)", corporate: "அனைத்தும்", rate: "ZIL/ZIP – Rs.50/கடன்" },
      { id: 3, type: "MEI திட்டத்தின் கீழ் புதிய கடனில் சேவைக் கட்டணம்", corporate: "அனைத்தும்", rate: "கடன் தொகையில் 0.60%" },
      { id: 4, type: "டாப்-அப் சேவைக் கட்டணம் – அதிகரித்த தொகையில் பொருந்தும் விகிதம்", corporate: "அனைத்தும்", rate: "அதிகரித்த தொகையில் 2% (GL திட்டங்களுக்கு 1வது ஸ்லாப் ROI <15% தள்ளுபடி வசதியுடன்)" },
      { id: 5, type: "பாதுகாப்புக் கட்டணம் – புதிய கடன்", corporate: "இந்தியாவின் மற்ற பகுதிகள்", rate: "கடன் தொகையில் 0.15% – குறைந்தது Rs.100/- மற்றும் அதிகபட்சம் Rs.1,000/-" },
      { id: 6, type: "டோக்கன் கட்டணம் (வ.எண். 1, 2, 10 மற்றும் 11 தவிர மற்ற திட்டங்களுக்கு)", corporate: "தெற்கு கிளைகள்", rate: "Rs.1,00,000/- வரை கடன் → Rs.20/-; Rs.1,00,000/-க்கு மேல் → Rs.100/-; தள்ளுபடிக்குப் பிறகு 1வது ஸ்லாப் வட்டி <13% எனில், மற்ற நிகழ்வுகளில் Rs.50/-" },
      { id: 7, type: "SMS கட்டணம்", corporate: "அனைத்தும்", rate: "மூடல் அல்லது புதுப்பிப்பு நேரத்தில் Rs.5/காலாண்டுக்கு" },
      { id: 8, type: "நோட்டீஸ் கட்டணம் (அனைத்து திட்டங்களின் கீழ் கடன்களுக்கு பொருந்தும்)", corporate: "தெற்கு கிளைகள் / இந்தியாவின் மற்ற பகுதிகள்", rate: "3 சாதாரண நோட்டீஸ் Rs.30/ஒவ்வொன்றும் மற்றும் 4வது நோட்டீஸ் – பதிவு Rs.100/-; ஏல நோட்டீஸ் கட்டணம் Rs.120/- (மற்ற பகுதிகளில் மட்டும்)" },
      { id: 9, type: "டோக்கன் தொலைத்த கட்டணம் (அனைத்து திட்டங்களின் கீழ் கடன்களுக்கு பொருந்தும்)", corporate: "அனைத்தும்", rate: "Rs.25/- (பொருந்தும் ஸ்டாம்ப் பேப்பர் செலவுக்கு கூடுதலாக)" },
      { id: 10, type: "பாதுகாப்பு காவல் கட்டணம்", corporate: "அனைத்தும்", rate: "Rs.5/கிராம்/மாதம், மூடல் அல்லது புதுப்பிப்பு நேரத்தில் செலுத்த வேண்டும்" },
      { id: 11, type: "மாநில அரசுகளால் விதிக்கப்படும் ஸ்டாம்ப் கடன்", corporate: "கர்நாடகா, ஆந்திரா மற்றும் ராஜஸ்தான்", rate: "எங்கும் பொருந்தும் இடங்களில் உண்மையான தொகை" },
      { id: 12, type: "GCS", corporate: "தெற்கு கிளைகள்", rate: "1. Rs.999/- 6 மாதங்களுக்கு (6 மாதங்களில் வரம்பு பயன்படுத்தப்படாவிட்டால்)\n2. கிளை வழியாக பரிவர்த்தனை எனில் Rs.99/- பரிவர்த்தனைக்கு" },
      { id: 13, type: "GCL", corporate: "இந்தியாவின் மற்ற பகுதிகள்", rate: "1. Rs.999/- 6 மாதங்களுக்கு (6 மாதங்களில் வரம்பு பயன்படுத்தப்படாவிட்டால்)\n2. பகுதி வெளியீட்டு கட்டணம் Rs.499/- பரிவர்த்தனைக்கு\n3. கிளை வழியாக பரிவர்த்தனை எனில் Rs.99/- பரிவர்த்தனைக்கு" },
      { id: 14, type: "வீட்டிலேயே கடன் கட்டணம்", corporate: "அனைத்தும்", rate: "வீட்டிலேயே கடன் சேவைகளுக்கு Rs.500/- வரை" },
      { id: 15, type: "CAC (கடன் மதிப்பீட்டு கட்டணம்) – மொத்த வெளிப்பாடு > Rs.3 L எனில்", corporate: "தெற்கு கிளைகள்", rateTable: [{ range: ">Rs.3 L முதல் Rs.5 L", amount: "Rs.25/-" }, { range: ">Rs.5 L முதல் Rs.15 L", amount: "Rs.40/-" }, { range: ">Rs.15 L முதல் Rs.50 L", amount: "Rs.50/-" }, { range: ">Rs.50 L", amount: "Rs.75/-" }] },
      { id: 16, type: "வீட்டுக்கு வீடு வசூல் கட்டணம் (வட்டி/கடன் வசூலுக்கான பின்தொடர்தல்)", corporate: "தெற்கு கிளைகள்", rate: "வாடிக்கையாளர் பின்தொடர்தல் வருகை மூலம் வசூலுக்கு Rs.150/- + GST வாடிக்கையாளருக்கு" },
    ],
  },
  kn: {
    pageTitle: "ಗೋಲ್ಡ್ ಲೋನ್‌ಗೆ ಸಂಬಂಧಿಸಿದ ಸೇವಾ ಶುಲ್ಕಗಳು",
    pageSubtitle: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನಲ್ಲಿ ಎಲ್ಲಾ ಗೋಲ್ಡ್ ಲೋನ್ ಉತ್ಪನ್ನಗಳಿಗೆ ಪಾರದರ್ಶಕ ಶುಲ್ಕ ರಚನೆ",
    slNo: "ಕ್ರ.ಸಂ.",
    typeOfCharges: "ಶುಲ್ಕದ ಪ್ರಕಾರ",
    corporate: "ಕಾರ್ಪೊರೇಟ್",
    rateOfCharges: "ಅನ್ವಯಿಸುವ ಶುಲ್ಕ ದರ",
    downloadPdf: "PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    ifLoanAmount: "ಸಾಲದ ಮೊತ್ತ ಇದ್ದರೆ",
    amount: "ಮೊತ್ತ",
    note: "* ಎಲ್ಲಾ ಶುಲ್ಕಗಳ ಮೇಲೆ ಅನ್ವಯಿಸುವ GST ಹೆಚ್ಚುವರಿಯಾಗಿದೆ. ಇತ್ತೀಚಿನ ದರಗಳಿಗಾಗಿ ಹತ್ತಿರದ ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಶಾಖೆಯನ್ನು ಸಂದರ್ಶಿಸಿ.",
    southernBranches: "ದಕ್ಷಿಣ ಶಾಖೆಗಳು",
    restOfIndia: "ಉಳಿದ ಭಾರತ",
    all: "ಎಲ್ಲಾ",
    rows: [
      { id: 1, type: "ಸೇವಾ ಶುಲ್ಕ – ಹೊಸ ಸಾಲ – ಸಾಲದ ಮೊತ್ತದ ಮೇಲೆ ಅನ್ವಯಿಸುವ ದರ (IPL)", corporate: "ದಕ್ಷಿಣ ಶಾಖೆಗಳು", rate: "IPL (1%) (ಕೇವಲ 12 ತಿಂಗಳ ಅವಧಿಗೆ ಮಾತ್ರ)" },
      { id: 2, type: "ಸೇವಾ ಶುಲ್ಕ – ಹೊಸ ಸಾಲ – ಪ್ರತಿ ಖಾತೆಗೆ ಅನ್ವಯಿಸುವ ದರ (ZIL/ZIP)", corporate: "ಎಲ್ಲಾ", rate: "ZIL/ZIP – Rs.50/ಸಾಲ" },
      { id: 3, type: "MEI ಯೋಜನೆಯಡಿ ಹೊಸ ಸಾಲದ ಮೇಲೆ ಸೇವಾ ಶುಲ್ಕ", corporate: "ಎಲ್ಲಾ", rate: "ಸಾಲದ ಮೊತ್ತದ 0.60%" },
      { id: 4, type: "ಟಾಪ್-ಅಪ್ ಸೇವಾ ಶುಲ್ಕ – ಹೆಚ್ಚಿಸಿದ ಮೊತ್ತದ ಮೇಲೆ ಅನ್ವಯಿಸುವ ದರ", corporate: "ಎಲ್ಲಾ", rate: "ಹೆಚ್ಚಿಸಿದ ಮೊತ್ತದ 2% (GL ಯೋಜನೆಗಳಿಗೆ 1ನೇ ಸ್ಲ್ಯಾಬ್ ROI <15% ರಿಬೇಟ್ ಸೌಲಭ್ಯದೊಂದಿಗೆ)" },
      { id: 5, type: "ಭದ್ರತಾ ಶುಲ್ಕ – ಹೊಸ ಸಾಲ", corporate: "ಉಳಿದ ಭಾರತ", rate: "ಸಾಲದ ಮೊತ್ತದ 0.15% – ಕನಿಷ್ಠ Rs.100/- ಮತ್ತು ಗರಿಷ್ಠ Rs.1,000/-" },
      { id: 6, type: "ಟೋಕನ್ ಶುಲ್ಕ (ಕ್ರ.ಸಂ. 1, 2, 10 ಮತ್ತು 11 ಹೊರತುಪಡಿಸಿ ಇತರ ಯೋಜನೆಗಳಿಗೆ)", corporate: "ದಕ್ಷಿಣ ಶಾಖೆಗಳು", rate: "Rs.1,00,000/- ವರೆಗೆ ಸಾಲ → Rs.20/-; Rs.1,00,000/-ಗಿಂತ ಹೆಚ್ಚು → Rs.100/-; ರಿಬೇಟ್ ನಂತರ 1ನೇ ಸ್ಲ್ಯಾಬ್ ಬಡ್ಡಿ ದರ <13% ಆದರೆ, ಇತರ ಸಂದರ್ಭಗಳಲ್ಲಿ Rs.50/-" },
      { id: 7, type: "SMS ಶುಲ್ಕ", corporate: "ಎಲ್ಲಾ", rate: "ಮುಕ್ತಾಯ ಅಥವಾ ನವೀಕರಣ ಸಮಯದಲ್ಲಿ Rs.5/ತ್ರೈಮಾಸಿಕಕ್ಕೆ" },
      { id: 8, type: "ನೋಟೀಸ್ ಶುಲ್ಕ (ಎಲ್ಲಾ ಯೋಜನೆಗಳ ಅಡಿಯಲ್ಲಿ ಸಾಲಗಳಿಗೆ ಅನ್ವಯ)", corporate: "ದಕ್ಷಿಣ ಶಾಖೆಗಳು / ಉಳಿದ ಭಾರತ", rate: "3 ಸಾಮಾನ್ಯ ನೋಟೀಸ್ Rs.30/ಒಂದಕ್ಕೆ ಮತ್ತು 4ನೇ ನೋಟೀಸ್ – ನೋಂದಣಿ Rs.100/-; ಹರಾಜು ನೋಟೀಸ್ ಶುಲ್ಕ Rs.120/- (ಉಳಿದ ಭಾರತ ಮಾತ್ರ)" },
      { id: 9, type: "ಟೋಕನ್ ಕಳೆದುಕೊಂಡ ಶುಲ್ಕ (ಎಲ್ಲಾ ಯೋಜನೆಗಳ ಅಡಿಯಲ್ಲಿ ಸಾಲಗಳಿಗೆ ಅನ್ವಯ)", corporate: "ಎಲ್ಲಾ", rate: "Rs.25/- (ಅನ್ವಯಿಸುವ ಸ್ಟ್ಯಾಂಪ್ ಪೇಪರ್ ವೆಚ್ಚಕ್ಕೆ ಹೆಚ್ಚುವರಿಯಾಗಿ)" },
      { id: 10, type: "ಸುರಕ್ಷಿತ ಕಸ್ಟಡಿ ಶುಲ್ಕ", corporate: "ಎಲ್ಲಾ", rate: "Rs.5/ಗ್ರಾಂ/ತಿಂಗಳು, ಮುಕ್ತಾಯ ಅಥವಾ ನವೀಕರಣ ಸಮಯದಲ್ಲಿ ಪಾವತಿಸಬೇಕು" },
      { id: 11, type: "ರಾಜ್ಯ ಸರ್ಕಾರಗಳು ವಿಧಿಸುವ ಸ್ಟ್ಯಾಂಪ್ ಡ್ಯೂಟಿ", corporate: "ಕರ್ನಾಟಕ, ಆಂಧ್ರ ಮತ್ತು ರಾಜಸ್ಥಾನ", rate: "ಅನ್ವಯಿಸುವ ಎಲ್ಲಾ ಕಡೆ ವಾಸ್ತವ ಮೊತ್ತ" },
      { id: 12, type: "GCS", corporate: "ದಕ್ಷಿಣ ಶಾಖೆಗಳು", rate: "1. Rs.999/- 6 ತಿಂಗಳಿಗೆ (6 ತಿಂಗಳಲ್ಲಿ ಮಿತಿ ಬಳಸದಿದ್ದರೆ)\n2. ಶಾಖೆ ಮೂಲಕ ವ್ಯವಹಾರ ಆದರೆ Rs.99/- ವ್ಯವಹಾರಕ್ಕೆ" },
      { id: 13, type: "GCL", corporate: "ಉಳಿದ ಭಾರತ", rate: "1. Rs.999/- 6 ತಿಂಗಳಿಗೆ (6 ತಿಂಗಳಲ್ಲಿ ಮಿತಿ ಬಳಸದಿದ್ದರೆ)\n2. ಭಾಗಶಃ ಬಿಡುಗಡೆ ಶುಲ್ಕ Rs.499/- ವ್ಯವಹಾರಕ್ಕೆ\n3. ಶಾಖೆ ಮೂಲಕ ವ್ಯವಹಾರ ಆದರೆ Rs.99/- ವ್ಯವಹಾರಕ್ಕೆ" },
      { id: 14, type: "ಮನೆಯಲ್ಲಿ ಸಾಲ ಶುಲ್ಕ", corporate: "ಎಲ್ಲಾ", rate: "ಮನೆಯಲ್ಲಿ ಸಾಲ ಸೇವೆಗಳಿಗೆ Rs.500/- ವರೆಗೆ" },
      { id: 15, type: "CAC (ಕ್ರೆಡಿಟ್ ಮೌಲ್ಯಮಾಪನ ಶುಲ್ಕ) – ಒಟ್ಟು ಎಕ್ಸ್‌ಪೋಷರ್ > Rs.3 L ಆದರೆ", corporate: "ದಕ್ಷಿಣ ಶಾಖೆಗಳು", rateTable: [{ range: ">Rs.3 L ರಿಂದ Rs.5 L", amount: "Rs.25/-" }, { range: ">Rs.5 L ರಿಂದ Rs.15 L", amount: "Rs.40/-" }, { range: ">Rs.15 L ರಿಂದ Rs.50 L", amount: "Rs.50/-" }, { range: ">Rs.50 L", amount: "Rs.75/-" }] },
      { id: 16, type: "ಡೋರ್ ಟು ಡೋರ್ ಸಂಗ್ರಹ ಶುಲ್ಕ (ಬಡ್ಡಿ/ಸಾಲ ವಸೂಲಿಗಾಗಿ ಫಾಲೋ-ಅಪ್)", corporate: "ದಕ್ಷಿಣ ಶಾಖೆಗಳು", rate: "ಗ್ರಾಹಕ ಫಾಲೋ-ಅಪ್ ಭೇಟಿ ಮೂಲಕ ವಸೂಲಿಗೆ Rs.150/- + GST ಪ್ರತಿ ಗ್ರಾಹಕ" },
    ],
  },
  ur: {
    pageTitle: "گولڈ لون سے متعلق سروس چارجز",
    pageSubtitle: "شری گنیش فائنانس میں تمام گولڈ لون مصنوعات کے لیے شفاف فیس کا ڈھانچہ",
    slNo: "نمبر شمار",
    typeOfCharges: "چارج کی قسم",
    corporate: "کارپوریٹ",
    rateOfCharges: "قابل اطلاق چارج ریٹ",
    downloadPdf: "PDF ڈاؤن لوڈ کریں",
    ifLoanAmount: "اگر قرض کی رقم",
    amount: "رقم",
    note: "* تمام چارجز پر قابل اطلاق GST اضافی ہے۔ تازہ ترین شرحوں کے لیے قریبی شری گنیش فائنانس شاخ سے رابطہ کریں۔",
    southernBranches: "جنوبی شاخیں",
    restOfIndia: "باقی ہندوستان",
    all: "سب",
    rows: [
      { id: 1, type: "سروس چارج – نیا قرض – قرض کی رقم پر قابل اطلاق شرح (IPL)", corporate: "جنوبی شاخیں", rate: "IPL (1%) (صرف 12 مہینے کی مدت کے لیے)" },
      { id: 2, type: "سروس چارج – نیا قرض – فی اکاؤنٹ قابل اطلاق شرح (ZIL/ZIP)", corporate: "سب", rate: "ZIL/ZIP – Rs.50/قرض" },
      { id: 3, type: "MEI اسکیم کے تحت نئے قرض پر سروس چارج", corporate: "سب", rate: "قرض کی رقم کا 0.60%" },
      { id: 4, type: "ٹاپ-اپ سروس چارج – بڑھی ہوئی رقم پر قابل اطلاق شرح", corporate: "سب", rate: "بڑھی ہوئی رقم کا 2% (GL اسکیمز کے لیے جہاں 1st سلیب ROI <15% ریبیٹ سہولت کے ساتھ)" },
      { id: 5, type: "سیکیورٹی چارج – نیا قرض", corporate: "باقی ہندوستان", rate: "قرض کی رقم کا 0.15% – کم از کم Rs.100/- اور زیادہ سے زیادہ Rs.1,000/-" },
      { id: 6, type: "ٹوکن چارج (نمبر شمار 1، 2، 10 اور 11 کے علاوہ دیگر اسکیمز کے لیے)", corporate: "جنوبی شاخیں", rate: "Rs.1,00,000/- تک قرض → Rs.20/-; Rs.1,00,000/- سے زیادہ → Rs.100/-; جہاں ریبیٹ کے بعد 1st سلیب سود <13%، دیگر صورتوں میں Rs.50/-" },
      { id: 7, type: "SMS چارج", corporate: "سب", rate: "بند یا تجدید کے وقت Rs.5/فی سہ ماہی" },
      { id: 8, type: "نوٹس چارج (تمام اسکیموں کے تحت قرضوں پر قابل اطلاق)", corporate: "جنوبی شاخیں / باقی ہندوستان", rate: "3 عام نوٹس Rs.30/فی ایک اور 4تھا نوٹس – رجسٹرڈ Rs.100/-; نیلامی نوٹس چارج Rs.120/- (صرف باقی ہندوستان)" },
      { id: 9, type: "ٹوکن گم شدہ چارج (تمام اسکیموں کے تحت قرضوں پر قابل اطلاق)", corporate: "سب", rate: "Rs.25/- (قابل اطلاق اسٹامپ پیپر کی لاگت کے علاوہ)" },
      { id: 10, type: "محفوظ تحویل چارج", corporate: "سب", rate: "Rs.5/فی گرام فی ماہ، بند یا تجدید کے وقت ادا کیا جائے" },
      { id: 11, type: "ریاستی حکومتوں کی طرف سے عائد اسٹامپ ڈیوٹی", corporate: "کرناٹکا، آندھرا اور راجستھان", rate: "جہاں بھی قابل اطلاق ہو، اصل رقم" },
      { id: 12, type: "GCS", corporate: "جنوبی شاخیں", rate: "1. Rs.999/- فی 6 ماہ (اگر 6 ماہ میں حد استعمال نہ ہو)\n2. اگر لین دین شاخ کے ذریعے ہو تو Rs.99/- فی لین دین" },
      { id: 13, type: "GCL", corporate: "باقی ہندوستان", rate: "1. Rs.999/- فی 6 ماہ (اگر 6 ماہ میں حد استعمال نہ ہو)\n2. جزوی ریلیز چارج Rs.499/- فی لین دین\n3. اگر لین دین شاخ کے ذریعے ہو تو Rs.99/- فی لین دین" },
      { id: 14, type: "گھر پر قرض چارج", corporate: "سب", rate: "گھر پر قرض سروسز کے لیے Rs.500/- تک" },
      { id: 15, type: "CAC (کریڈٹ تشخیص چارج) – اگر کل ایکسپوژر > Rs.3 L", corporate: "جنوبی شاخیں", rateTable: [{ range: ">Rs.3 L سے Rs.5 L", amount: "Rs.25/-" }, { range: ">Rs.5 L سے Rs.15 L", amount: "Rs.40/-" }, { range: ">Rs.15 L سے Rs.50 L", amount: "Rs.50/-" }, { range: ">Rs.50 L", amount: "Rs.75/-" }] },
      { id: 16, type: "ڈور ٹو ڈور کلیکشن چارج (سود/قرض وصولی کے لیے فالو اپ)", corporate: "جنوبی شاخیں", rate: "کسٹمر فالو-اپ وزٹ کے ذریعے وصولی کے لیے Rs.150/- + GST فی کسٹمر" },
    ],
  },
  as: {
    pageTitle: "গোল্ড লোন সম্পর্কিত সেৱা মাচুল",
    pageSubtitle: "শ্ৰী গণেশ ফাইনেন্সৰ সকলো গোল্ড লোন পণ্যৰ বাবে স্বচ্ছ মাচুলৰ কাঠামো",
    slNo: "ক্ৰ.নং.",
    typeOfCharges: "মাচুলৰ প্ৰকাৰ",
    corporate: "কৰ্পোৰেট",
    rateOfCharges: "প্ৰযোজ্য মাচুলৰ হাৰ",
    downloadPdf: "PDF ডাউনলোড কৰক",
    ifLoanAmount: "যদি ঋণৰ পৰিমাণ",
    amount: "পৰিমাণ",
    note: "* সকলো মাচুলত প্ৰযোজ্য GST অতিৰিক্ত। শেহতীয়া হাৰৰ বাবে আপোনাৰ ওচৰৰ শ্ৰী গণেশ ফাইনেন্স শাখা পৰিদৰ্শন কৰক।",
    southernBranches: "দক্ষিণীয় শাখাসমূহ",
    restOfIndia: "ভাৰতৰ বাকী অংশ",
    all: "সকলো",
    rows: [
      { id: 1, type: "সেৱা মাচুল – নতুন ঋণ – ঋণৰ পৰিমাণত প্ৰযোজ্য হাৰ (IPL)", corporate: "দক্ষিণীয় শাখাসমূহ", rate: "IPL (1%) (কেৱল ১২ মাহৰ বাবে)" },
      { id: 2, type: "সেৱা মাচুল – নতুন ঋণ – প্ৰতি একাউণ্টত প্ৰযোজ্য হাৰ (ZIL/ZIP)", corporate: "সকলো", rate: "ZIL/ZIP – Rs.50/ঋণ" },
      { id: 3, type: "MEI আঁচনিৰ অধীনত নতুন ঋণত সেৱা মাচুল", corporate: "সকলো", rate: "ঋণৰ পৰিমাণৰ 0.60%" },
      { id: 4, type: "টপ-আপ সেৱা মাচুল – বৃদ্ধি পোৱা পৰিমাণত প্ৰযোজ্য হাৰ", corporate: "সকলো", rate: "বৃদ্ধি পোৱা পৰিমাণৰ 2% (GL আঁচনিৰ বাবে য'ত 1st স্লেব ROI <15% ৰিবেট সুবিধাৰে)" },
      { id: 5, type: "সুৰক্ষা মাচুল – নতুন ঋণ", corporate: "ভাৰতৰ বাকী অংশ", rate: "ঋণৰ পৰিমাণৰ 0.15% – নিম্নতম Rs.100/- আৰু সৰ্বোচ্চ Rs.1,000/-" },
      { id: 6, type: "টোকেন মাচুল (ক্ৰ.নং. 1, 2, 10 আৰু 11 বাদে অন্য আঁচনিৰ বাবে)", corporate: "দক্ষিণীয় শাখাসমূহ", rate: "Rs.1,00,000/- লৈকে ঋণ → Rs.20/-; Rs.1,00,000/-তকৈ বেছি → Rs.100/-; ৰিবেটৰ পিছত 1st স্লেব সুদৰ হাৰ <13% হলে, অন্য ক্ষেত্ৰত Rs.50/-" },
      { id: 7, type: "SMS মাচুল", corporate: "সকলো", rate: "বন্ধ বা নবীকৰণৰ সময়ত Rs.5/প্ৰতি ত্ৰৈমাসিক" },
      { id: 8, type: "নোটিচ মাচুল (সকলো আঁচনিৰ অধীনত ঋণত প্ৰযোজ্য)", corporate: "দক্ষিণীয় শাখাসমূহ / ভাৰতৰ বাকী অংশ", rate: "৩টা সাধাৰণ নোটিচ Rs.30/প্ৰতিটো আৰু ৪র্থ নোটিচ – ৰেজিষ্টাৰড Rs.100/-; নিলাম নোটিচ মাচুল Rs.120/- (কেৱল ভাৰতৰ বাকী অংশ)" },
      { id: 9, type: "টোকেন হেৰোৱা মাচুল (সকলো আঁচনিৰ অধীনত ঋণত প্ৰযোজ্য)", corporate: "সকলো", rate: "Rs.25/- (প্ৰযোজ্য ষ্টাম্প পেপাৰৰ খৰচৰ অতিৰিক্ত)" },
      { id: 10, type: "সুৰক্ষিত জমা মাচুল", corporate: "সকলো", rate: "Rs.5/প্ৰতি গ্ৰাম/মাহ, বন্ধ বা নবীকৰণৰ সময়ত পৰিশোধযোগ্য" },
      { id: 11, type: "ৰাজ্য চৰকাৰসমূহৰ দ্বাৰা আৰোপিত ষ্টাম্প শুল্ক", corporate: "কৰ্ণাটক, আন্ধ্ৰ আৰু ৰাজস্থান", rate: "য'ত প্ৰযোজ্য হয় তাত প্ৰকৃত পৰিমাণ" },
      { id: 12, type: "GCS", corporate: "দক্ষিণীয় শাখাসমূহ", rate: "1. Rs.999/- প্ৰতি ৬ মাহ (৬ মাহত সীমা ব্যৱহাৰ নকৰিলে)\n2. শাখাৰ জৰিয়তে লেনদেন হলে Rs.99/- প্ৰতি লেনদেন" },
      { id: 13, type: "GCL", corporate: "ভাৰতৰ বাকী অংশ", rate: "1. Rs.999/- প্ৰতি ৬ মাহ (৬ মাহত সীমা ব্যৱহাৰ নকৰিলে)\n2. আংশিক মুক্তি মাচুল Rs.499/- প্ৰতি লেনদেন\n3. শাখাৰ জৰিয়তে লেনদেন হলে Rs.99/- প্ৰতি লেনদেন" },
      { id: 14, type: "ঘৰত ঋণ মাচুল", corporate: "সকলো", rate: "ঘৰত ঋণ সেৱাৰ বাবে Rs.500/- লৈকে" },
      { id: 15, type: "CAC (ক্ৰেডিট মূল্যায়ন মাচুল) – মুঠ এক্সপোজাৰ > Rs.3 L হলে", corporate: "দক্ষিণীয় শাখাসমূহ", rateTable: [{ range: ">Rs.3 L ৰ পৰা Rs.5 L", amount: "Rs.25/-" }, { range: ">Rs.5 L ৰ পৰা Rs.15 L", amount: "Rs.40/-" }, { range: ">Rs.15 L ৰ পৰা Rs.50 L", amount: "Rs.50/-" }, { range: ">Rs.50 L", amount: "Rs.75/-" }] },
      { id: 16, type: "ডোৰ টু ডোৰ সংগ্ৰহ মাচুল (সুদ/ঋণ সংগ্ৰহৰ বাবে অনুসৰণ)", corporate: "দক্ষিণীয় শাখাসমূহ", rate: "গ্ৰাহক অনুসৰণ ভ্ৰমণৰ জৰিয়তে সংগ্ৰহৰ বাবে Rs.150/- + GST প্ৰতিজন গ্ৰাহকৰ বাবে" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── ICONS
// ═══════════════════════════════════════════════════════════════════════════════
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const GoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ─── PDF GENERATOR  (client-side, no extra lib needed)
// ═══════════════════════════════════════════════════════════════════════════════
function generatePDF(data, lang) {
  const isRtl = lang === "ur";

  // Build HTML content
  const rowsHTML = data.rows.map((row) => {
    let rateCell = "";
    if (row.rateTable) {
      rateCell = `
        <table style="width:100%;border-collapse:collapse;font-size:11px;">
          <tr style="background:#fee2e2;">
            <th style="padding:4px 8px;border:1px solid #fca5a5;text-align:${isRtl ? "right" : "left"};">${data.ifLoanAmount}</th>
            <th style="padding:4px 8px;border:1px solid #fca5a5;text-align:${isRtl ? "right" : "left"};">${data.amount}</th>
          </tr>
          ${row.rateTable.map((r) => `
            <tr>
              <td style="padding:4px 8px;border:1px solid #e5e7eb;">${r.range}</td>
              <td style="padding:4px 8px;border:1px solid #e5e7eb;font-weight:600;">${r.amount}</td>
            </tr>
          `).join("")}
        </table>`;
    } else {
      rateCell = (row.rate || "").split("\n").map((l) => `<p style="margin:2px 0">${l}</p>`).join("");
    }
    return `
      <tr>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;text-align:center;font-weight:700;color:#b91c1c;vertical-align:top;">${row.id}</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;vertical-align:top;">${row.type}</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;vertical-align:top;text-align:center;">${row.corporate}</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;vertical-align:top;">${rateCell}</td>
      </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="${lang}" dir="${isRtl ? "rtl" : "ltr"}">
<head>
  <meta charset="UTF-8"/>
  <title>${data.pageTitle}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
    * { box-sizing: border-box; }
    body { font-family: 'Noto Sans', 'Noto Sans Devanagari', 'Noto Nastaliq Urdu', Arial, sans-serif; margin: 0; padding: 24px 32px; color: #111; font-size: 12px; direction: ${isRtl ? "rtl" : "ltr"}; }
    .header { text-align: center; margin-bottom: 24px; }
    .brand { font-size: 22px; font-weight: 900; color: #b91c1c; letter-spacing: -0.5px; margin-bottom: 2px; }
    .brand span { color: #d97706; }
    h1 { font-size: 16px; font-weight: 800; color: #1c1917; margin: 8px 0 4px; }
    .sub { font-size: 11px; color: #6b7280; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    thead tr { background: linear-gradient(135deg, #b91c1c, #991b1b); color: white; }
    thead th { padding: 12px 14px; text-align: ${isRtl ? "right" : "left"}; font-size: 12px; font-weight: 700; }
    tbody tr:nth-child(even) { background: #fef2f2; }
    tbody tr:nth-child(odd) { background: #ffffff; }
    .note { margin-top: 16px; padding: 10px 14px; background: #fef3c7; border-left: 3px solid #d97706; font-size: 10px; color: #78350f; border-radius: 4px; }
    .footer { text-align: center; margin-top: 20px; font-size: 10px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">Shree <span>Ganesh</span> Finance</div>
    <h1>${data.pageTitle}</h1>
    <p class="sub">${data.pageSubtitle}</p>
  </div>
  <table>
    <thead>
      <tr>
        <th style="width:48px;">${data.slNo}</th>
        <th style="width:28%">${data.typeOfCharges}</th>
        <th style="width:18%">${data.corporate}</th>
        <th>${data.rateOfCharges}</th>
      </tr>
    </thead>
    <tbody>${rowsHTML}</tbody>
  </table>
  <div class="note">${data.note}</div>
  <div class="footer">© ${new Date().getFullYear()} Shree Ganesh Finance. All rights reserved.</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Shree_Ganesh_Finance_Gold_Loan_Charges_${lang.toUpperCase()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function GoldLoanTable() {
  const { lang } = useLanguage();
  const data = T[lang] || T["en"];
  const isRtl = lang === "ur";

  const tableRef = useRef(null);

  const handleDownload = () => generatePDF(data, lang);

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-amber-50/30 py-12 px-4 sm:px-6 lg:px-8"
      aria-label={data.pageTitle}
    >
      {/* ── Page Header ── */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest mb-4 border border-red-200">
          <GoldIcon />
          <span>Shree Ganesh Finance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-3">
          {data.pageTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {data.pageSubtitle}
        </p>
        {/* Accent line */}
        <div className="mt-5 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-red-600 to-amber-500" />
      </div>

      {/* ── Card Container ── */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl shadow-red-100/40 border border-gray-100 overflow-hidden">

          {/* Card Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 sm:px-8 py-4 bg-gradient-to-r from-red-700 via-red-800 to-red-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white">
                <GoldIcon />
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base leading-tight">{data.pageTitle}</p>
                <p className="text-red-200 text-xs">Shree Ganesh Finance — Official Rate Card</p>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-[0.97] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-amber-900/30 whitespace-nowrap"
              aria-label={data.downloadPdf}
            >
              <DownloadIcon />
              {data.downloadPdf}
            </button>
          </div>

          {/* ── TABLE ── */}
          <div className="overflow-x-auto" ref={tableRef}>
            <table className="w-full text-sm" role="table" aria-label={data.pageTitle}>
              {/* Thead */}
              <thead>
                <tr className="bg-red-50 border-b-2 border-red-200">
                  <th scope="col" className={`px-4 sm:px-5 py-3.5 text-center text-[11px] font-black uppercase tracking-widest text-red-800 w-14`}>
                    {data.slNo}
                  </th>
                  <th scope="col" className={`px-4 sm:px-6 py-3.5 text-[11px] font-black uppercase tracking-widest text-red-800 ${isRtl ? "text-right" : "text-left"} min-w-[200px]`}>
                    {data.typeOfCharges}
                  </th>
                  <th scope="col" className={`px-4 sm:px-5 py-3.5 text-[11px] font-black uppercase tracking-widest text-red-800 text-center min-w-[130px]`}>
                    {data.corporate}
                  </th>
                  <th scope="col" className={`px-4 sm:px-6 py-3.5 text-[11px] font-black uppercase tracking-widest text-red-800 ${isRtl ? "text-right" : "text-left"} min-w-[260px]`}>
                    {data.rateOfCharges}
                  </th>
                </tr>
              </thead>

              {/* Tbody */}
              <tbody className="divide-y divide-gray-100">
                {data.rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`transition-colors duration-150 hover:bg-red-50/50 group ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                  >
                    {/* SL No */}
                    <td className="px-4 sm:px-5 py-4 text-center align-top">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 font-black text-xs group-hover:bg-red-200 transition-colors">
                        {row.id}
                      </span>
                    </td>

                    {/* Type */}
                    <td className={`px-4 sm:px-6 py-4 align-top ${isRtl ? "text-right" : "text-left"}`}>
                      <p className="text-gray-800 font-semibold text-[13px] leading-snug">{row.type}</p>
                    </td>

                    {/* Corporate */}
                    <td className="px-4 sm:px-5 py-4 align-top text-center">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 leading-tight">
                        {row.corporate}
                      </span>
                    </td>

                    {/* Rate */}
                    <td className={`px-4 sm:px-6 py-4 align-top ${isRtl ? "text-right" : "text-left"}`}>
                      {row.rateTable ? (
                        <div className="overflow-x-auto">
                          <table className="text-[12px] border-collapse rounded-lg overflow-hidden w-full min-w-[220px]">
                            <thead>
                              <tr className="bg-red-100">
                                <th className={`px-3 py-2 text-red-800 font-bold border border-red-200 ${isRtl ? "text-right" : "text-left"}`}>{data.ifLoanAmount}</th>
                                <th className={`px-3 py-2 text-red-800 font-bold border border-red-200 ${isRtl ? "text-right" : "text-left"}`}>{data.amount}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.rateTable.map((r, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-red-50/40"}>
                                  <td className="px-3 py-2 text-gray-700 border border-gray-200">{r.range}</td>
                                  <td className="px-3 py-2 font-bold text-gray-900 border border-gray-200">{r.amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {(row.rate || "").split("\n").map((line, li) => (
                            <p key={li} className="text-gray-700 text-[13px] leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note Footer */}
          <div className="px-5 sm:px-8 py-4 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
            <span className="text-amber-600 mt-0.5 flex-shrink-0">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd"/>
              </svg>
            </span>
            <p className="text-xs text-amber-800 leading-relaxed font-medium" dir={isRtl ? "rtl" : "ltr"}>
              {data.note}
            </p>
          </div>

          {/* Bottom Download Strip */}
          <div className="px-5 sm:px-8 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/80">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Shree Ganesh Finance — All rights reserved.
            </p>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 text-red-700 hover:text-red-900 font-bold text-xs border border-red-200 hover:border-red-400 rounded-xl px-4 py-2 hover:bg-red-50 transition-all duration-200"
              aria-label={data.downloadPdf}
            >
              <DownloadIcon />
              {data.downloadPdf}
            </button>
          </div>
        </div>

        {/* SEO structured data hint (for developers to add JSON-LD) */}
        {/* 
          Add to <head> via Helmet:
          <script type="application/ld+json">{JSON.stringify({
            "@context":"https://schema.org","@type":"Table",
            "name":"Gold Loan Service Charges – Shree Ganesh Finance",
            "about":{"@type":"FinancialProduct","name":"Gold Loan"},
            "publisher":{"@type":"Organization","name":"Shree Ganesh Finance"}
          })}</script>
        */}
      </div>
    </section>
  );
}