import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../Common/Navbaar"; // adjust path as needed

// ═══════════════════════════════════════════════════════════════════════════════
// ─── ACHIEVEMENT DATA — all 9 languages
// Images from: /About/achieve1.png ... achieve4.png  (put in public/About/)
// ═══════════════════════════════════════════════════════════════════════════════
const ACHIEVEMENTS_DATA = {
  en: {
    section_label: "Shree Ganesh Finance",
    section_title: "Key Achievements",
    section_subtitle:
      "A legacy built on trust, service, and national recognition — honoring decades of commitment to financial inclusion and community growth.",
    click_hint: "Click image to read more",
    close_label: "Close",
    items: [
      {
        id: 1,
        img: "/About/achieve1.png",
        img_alt: "Shri Ganesh Yadav receiving Asian Businessman of the Year Award at House of Commons, Mumbai",
        short:
          "Shri Ganesh Yadav honoured with 'Asian Businessman of the Year' Award – 2021 at the House of Commons, Award Ceremony, Mumbai.",
        title: "Asian Businessman of the Year – 2021",
        description:
          "In a landmark moment of pride for Shree Ganesh Finance and the entire Indian financial community, Shri Ganesh Yadav was conferred the prestigious 'Asian Businessman of the Year' Award in 2021. The ceremony was held at the historic House of Commons, Award Ceremony, Mumbai — one of the most esteemed venues in the world. This recognition highlighted his extraordinary contributions to inclusive finance, his vision for rural financial empowerment, and his relentless effort to bring affordable credit solutions to millions of underserved Indians. The award stands as a testament to decades of ethical business leadership and unwavering commitment to nation-building.",
        year: "2021",
        location: "Mumbai, Maharastra",
        award_body: "Award Ceremony, House of Commons",
      },
      {
        id: 2,
        img: "/About/achieve2.png",
        img_alt: "Shri Ganesh Yadav receiving The Award Ceremony in Mumbai, Maharastra",
        short:
          "Shri Ganesh Yadav receiving 'Ceremony Award-2022' for Corporate Social Responsibility at a ceremony held in Mumbai.",
        title: "Award Ceremony – 2022",
        description:
          "Shree Ganesh Finance was honoured with the globally acclaimed ' Award for Corporate Social Responsibility' in 2022, presented at a grand ceremony in Mumbai, Maharastra. This award is internationally recognised as the hallmark of excellence in CSR practices. Under the visionary leadership of Shri Ganesh Yadav, the company has invested significantly in education, healthcare, rural development, women's empowerment, and environmental sustainability. Ceremony Award affirmed Shree Ganesh Finance's position as a responsible corporate citizen committed to building a better, more equitable India — not just through financial services, but through meaningful, ground-level impact.",
        year: "2022",
        location: "Mumbai, Maharastra",
        award_body: "Awards Institute",
      },
      {
        id: 3,
        img: "/About/achieve3.png",
        img_alt: "Shri Ganesh Yadav honoured with SKOCH Financial Inclusion Award 2024",
        short:
          "Shri Ganesh Yadav honoured with the 'SKOCH Financial Inclusion Award-2024' for outstanding contribution to financial access in India.",
        title: "SKOCH Financial Inclusion Award – 2024",
        description:
          "The 'SKOCH Financial Inclusion Award 2024' was conferred upon Shree Ganesh Finance in recognition of its pioneering role in making formal financial services accessible to India's vast unbanked and underbanked population. The SKOCH Awards are among India's most prestigious recognitions for socio-economic development and governance excellence. This achievement reflects Shree Ganesh Finance's core mission: reaching the last mile — the small farmers, daily wage earners, and micro-entrepreneurs who form the backbone of India's economy. Through innovative gold loan products, doorstep services, and transparent lending practices, the company has transformed the financial landscape for millions of families across urban, semi-urban, and rural India.",
        year: "2024",
        location: "India",
        award_body: "SKOCH Group",
      },
      {
        id: 4,
        img: "/About/achieve4.png",
        img_alt: "Shri Ganesh Yadav presented with Emerging Business Leader of the Year at AIMA Managing India Awards 2025",
        short:
          "Shri Ganesh Yadav presented with 'Emerging Business Leader of the Year' title by the Hon. Home Minister at AIMA Managing India Awards 2025.",
        title: "Emerging Business Leader of the Year – 2025",
        description:
          "At the prestigious AIMA Managing India Awards 2025 — one of India's most coveted business leadership honours — Shri Ganesh Yadav was recognised as the 'Emerging Business Leader of the Year.' The award was presented by the Hon. Home Minister of India, underscoring the national significance of this recognition. AIMA (All India Management Association) presents this award to individuals who have demonstrated exceptional managerial acumen, innovative thinking, and transformative impact on their industry. For Shri Ganesh Yadav, this was a celebration of his journey from a grassroots financial services entrepreneur to a nationally recognised leader who has reshaped how India borrows, saves, and grows — with dignity, trust, and purpose.",
        year: "2025",
        location: "New Delhi, India",
        award_body: "All India Management Association (AIMA)",
      },
    ],
  },

  hi: {
    section_label: "श्री गणेश फाइनेंस",
    section_title: "प्रमुख उपलब्धियां",
    section_subtitle:
      "विश्वास, सेवा और राष्ट्रीय पहचान पर आधारित एक विरासत — वित्तीय समावेश और सामुदायिक विकास के प्रति दशकों की प्रतिबद्धता का सम्मान।",
    click_hint: "अधिक जानने के लिए छवि पर क्लिक करें",
    close_label: "बंद करें",
    items: [
      {
        id: 1,
        img: "/About/achieve1.png",
        img_alt: "श्री गणेश यादव को लंदन के हाउस ऑफ कॉमन्स में एशियन बिजनेसमैन ऑफ द ईयर पुरस्कार",
        short: "श्री गणेश यादव को 2021 में ब्रिटिश संसद, हाउस ऑफ कॉमन्स, लंदन में 'एशियन बिजनेसमैन ऑफ द ईयर' पुरस्कार से सम्मानित किया गया।",
        title: "एशियन बिजनेसमैन ऑफ द ईयर – 2021",
        description: "श्री गणेश फाइनेंस और संपूर्ण भारतीय वित्तीय समुदाय के लिए गर्व के एक ऐतिहासिक क्षण में, श्री गणेश यादव को 2021 में प्रतिष्ठित 'एशियन बिजनेसमैन ऑफ द ईयर' पुरस्कार प्रदान किया गया। यह समारोह ऐतिहासिक हाउस ऑफ कॉमन्स, ब्रिटिश संसद, लंदन में आयोजित किया गया था। इस मान्यता ने वित्तीय समावेश में उनके असाधारण योगदान, ग्रामीण वित्तीय सशक्तिकरण के प्रति उनकी दृष्टि और लाखों वंचित भारतीयों को सस्ती ऋण सेवाएं प्रदान करने के उनके अथक प्रयासों को उजागर किया। यह पुरस्कार दशकों के नैतिक व्यावसायिक नेतृत्व और राष्ट्र निर्माण के प्रति अटूट प्रतिबद्धता का प्रमाण है।",
        year: "2021",
        location: "लंदन, यूके",
        award_body: "ब्रिटिश संसद, हाउस ऑफ कॉमन्स",
      },
      {
        id: 2,
        img: "/About/achieve2.png",
        img_alt: "श्री गणेश यादव को दुबई में गोल्डन पीकॉक CSR पुरस्कार",
        short: "श्री गणेश यादव को दुबई में आयोजित एक समारोह में CSR के लिए 'गोल्डन पीकॉक अवार्ड-2022' प्राप्त हुआ।",
        title: "CSR के लिए गोल्डन पीकॉक अवार्ड – 2022",
        description: "श्री गणेश फाइनेंस को 2022 में दुबई, Maharastra में एक भव्य समारोह में विश्व प्रसिद्ध 'गोल्डन पीकॉक अवार्ड फॉर कॉर्पोरेट सोशल रिस्पॉन्सिबिलिटी' से सम्मानित किया गया। यह पुरस्कार CSR प्रथाओं में उत्कृष्टता की अंतर्राष्ट्रीय पहचान है। श्री गणेश यादव के दूरदर्शी नेतृत्व में, कंपनी ने शिक्षा, स्वास्थ्य सेवा, ग्रामीण विकास, महिला सशक्तिकरण और पर्यावरणीय स्थिरता में महत्वपूर्ण निवेश किया है। इस पुरस्कार ने एक जिम्मेदार कॉर्पोरेट नागरिक के रूप में श्री गणेश फाइनेंस की स्थिति की पुष्टि की।",
        year: "2022",
        location: "दुबई, Maharastra",
        award_body: "गोल्डन पीकॉक अवार्ड्स इंस्टीट्यूट",
      },
      {
        id: 3,
        img: "/About/achieve3.png",
        img_alt: "श्री गणेश यादव को SKOCH वित्तीय समावेश पुरस्कार 2024",
        short: "श्री गणेश यादव को भारत में वित्तीय पहुंच में उत्कृष्ट योगदान के लिए 'SKOCH फाइनेंशियल इनक्लूजन अवार्ड-2024' से सम्मानित किया गया।",
        title: "SKOCH वित्तीय समावेश पुरस्कार – 2024",
        description: "SKOCH फाइनेंशियल इनक्लूजन अवार्ड 2024 श्री गणेश फाइनेंस को भारत की विशाल बैंकिंग सुविधाहीन आबादी तक औपचारिक वित्तीय सेवाएं पहुंचाने में अग्रणी भूमिका के लिए प्रदान किया गया। यह उपलब्धि श्री गणेश फाइनेंस के मूल मिशन को दर्शाती है: अंतिम छोर तक पहुंचना — छोटे किसान, दैनिक मजदूर और सूक्ष्म उद्यमी जो भारत की अर्थव्यवस्था की रीढ़ हैं। नवीन गोल्ड लोन उत्पादों और पारदर्शी ऋण प्रथाओं के माध्यम से, कंपनी ने लाखों परिवारों के लिए वित्तीय परिदृश्य को बदल दिया है।",
        year: "2024",
        location: "भारत",
        award_body: "SKOCH ग्रुप",
      },
      {
        id: 4,
        img: "/About/achieve4.png",
        img_alt: "AIMA मैनेजिंग इंडिया अवार्ड्स 2025 में श्री गणेश यादव को इमर्जिंग बिजनेस लीडर ऑफ द ईयर",
        short: "श्री गणेश यादव को AIMA मैनेजिंग इंडिया अवार्ड्स 2025 में माननीय गृह मंत्री द्वारा 'इमर्जिंग बिजनेस लीडर ऑफ द ईयर' से सम्मानित किया गया।",
        title: "इमर्जिंग बिजनेस लीडर ऑफ द ईयर – 2025",
        description: "AIMA मैनेजिंग इंडिया अवार्ड्स 2025 में — भारत के सबसे प्रतिष्ठित व्यावसायिक नेतृत्व सम्मानों में से एक — श्री गणेश यादव को 'इमर्जिंग बिजनेस लीडर ऑफ द ईयर' के रूप में पहचाना गया। यह पुरस्कार भारत के माननीय गृह मंत्री द्वारा प्रदान किया गया। AIMA असाधारण प्रबंधकीय कुशाग्रता, नवाचारी सोच और उद्योग पर परिवर्तनकारी प्रभाव दिखाने वाले व्यक्तियों को यह पुरस्कार देता है। यह श्री गणेश यादव की जमीनी स्तर के वित्तीय उद्यमी से राष्ट्रीय स्तर पर मान्यता प्राप्त नेता तक की यात्रा का उत्सव था।",
        year: "2025",
        location: "नई दिल्ली, भारत",
        award_body: "अखिल भारतीय प्रबंधन संघ (AIMA)",
      },
    ],
  },

  mr: {
    section_label: "श्री गणेश फायनान्स",
    section_title: "प्रमुख उपलब्धी",
    section_subtitle: "विश्वास, सेवा आणि राष्ट्रीय ओळखीवर बांधलेली परंपरा — आर्थिक समावेश आणि सामुदायिक विकासाप्रती दशकांच्या वचनबद्धतेचा सन्मान.",
    click_hint: "अधिक जाणून घेण्यासाठी प्रतिमेवर क्लिक करा",
    close_label: "बंद करा",
    items: [
      { id: 1, img: "/About/achieve1.png", img_alt: "श्री गणेश यादव यांना लंडनमध्ये एशियन बिझनेसमॅन ऑफ द इयर पुरस्कार", short: "श्री गणेश यादव यांना 2021 मध्ये ब्रिटिश संसद, हाऊस ऑफ कॉमन्स, लंडन येथे 'एशियन बिझनेसमॅन ऑफ द इयर' पुरस्काराने सन्मानित करण्यात आले.", title: "एशियन बिझनेसमॅन ऑफ द इयर – 2021", description: "श्री गणेश फायनान्स आणि संपूर्ण भारतीय वित्तीय समुदायासाठी अभिमानाच्या एका ऐतिहासिक क्षणी, श्री गणेश यादव यांना 2021 मध्ये प्रतिष्ठित 'एशियन बिझनेसमॅन ऑफ द इयर' पुरस्कार प्रदान करण्यात आला. हा सोहळा ऐतिहासिक हाऊस ऑफ कॉमन्स, ब्रिटिश पार्लमेंट, लंडन येथे आयोजित करण्यात आला होता. या मान्यतेने वित्तीय समावेशातील त्यांच्या असाधारण योगदानाला, ग्रामीण वित्तीय सक्षमीकरणाच्या दृष्टीला आणि लाखो वंचित भारतीयांसाठी परवडणाऱ्या कर्ज सेवा पुरवण्याच्या त्यांच्या अथक प्रयत्नांना अधोरेखित केले.", year: "2021", location: "लंडन, युके", award_body: "ब्रिटिश पार्लमेंट, हाऊस ऑफ कॉमन्स" },
      { id: 2, img: "/About/achieve2.png", img_alt: "श्री गणेश यादव यांना दुबईत गोल्डन पीकॉक CSR पुरस्कार", short: "श्री गणेश यादव यांना दुबई येथे आयोजित समारंभात CSR साठी 'गोल्डन पीकॉक अवॉर्ड-2022' प्राप्त झाला.", title: "CSR साठी गोल्डन पीकॉक अवॉर्ड – 2022", description: "श्री गणेश फायनान्सला 2022 मध्ये दुबई, Maharastra येथे एका भव्य समारंभात जागतिक स्तरावर मान्यताप्राप्त 'गोल्डन पीकॉक अवॉर्ड फॉर कॉर्पोरेट सोशल रिस्पॉन्सिबिलिटी' ने सन्मानित करण्यात आले. श्री गणेश यादव यांच्या दूरदर्शी नेतृत्वाखाली, कंपनीने शिक्षण, आरोग्यसेवा, ग्रामीण विकास, महिला सक्षमीकरण आणि पर्यावरणीय टिकाऊपणामध्ये लक्षणीय गुंतवणूक केली आहे.", year: "2022", location: "दुबई, Maharastra", award_body: "गोल्डन पीकॉक अवॉर्ड्स इन्स्टिट्यूट" },
      { id: 3, img: "/About/achieve3.png", img_alt: "श्री गणेश यादव यांना SKOCH वित्तीय समावेश पुरस्कार 2024", short: "श्री गणेश यादव यांना भारतात वित्तीय प्रवेशासाठी उत्कृष्ट योगदानाबद्दल 'SKOCH फायनान्शिअल इन्क्लुजन अवॉर्ड-2024' ने सन्मानित करण्यात आले.", title: "SKOCH वित्तीय समावेश पुरस्कार – 2024", description: "SKOCH फायनान्शिअल इन्क्लुजन अवॉर्ड 2024 श्री गणेश फायनान्सला भारतातील बँकिंग सेवा नसलेल्या लोकसंख्येपर्यंत औपचारिक वित्तीय सेवा पोहोचवण्यातील अग्रणी भूमिकेसाठी प्रदान करण्यात आला. नाविन्यपूर्ण गोल्ड लोन उत्पादने आणि पारदर्शक कर्ज पद्धतींद्वारे, कंपनीने लाखो कुटुंबांसाठी वित्तीय परिदृश्य बदलले आहे.", year: "2024", location: "भारत", award_body: "SKOCH ग्रुप" },
      { id: 4, img: "/About/achieve4.png", img_alt: "AIMA मॅनेजिंग इंडिया अवॉर्ड्स 2025 मध्ये श्री गणेश यादव यांना इमर्जिंग बिझनेस लीडर ऑफ द इयर", short: "श्री गणेश यादव यांना AIMA मॅनेजिंग इंडिया अवॉर्ड्स 2025 मध्ये माननीय गृहमंत्र्यांकडून 'इमर्जिंग बिझनेस लीडर ऑफ द इयर' ने सन्मानित करण्यात आले.", title: "इमर्जिंग बिझनेस लीडर ऑफ द इयर – 2025", description: "AIMA मॅनेजिंग इंडिया अवॉर्ड्स 2025 मध्ये — भारतातील सर्वात प्रतिष्ठित व्यावसायिक नेतृत्व सन्मानांपैकी एक — श्री गणेश यादव यांना 'इमर्जिंग बिझनेस लीडर ऑफ द इयर' म्हणून ओळखले गेले. हा पुरस्कार भारताच्या माननीय गृहमंत्र्यांनी प्रदान केला. AIMA असाधारण व्यवस्थापकीय कौशल्य, नाविन्यपूर्ण विचार आणि उद्योगावर परिवर्तनात्मक प्रभाव दाखवणाऱ्या व्यक्तींना हा पुरस्कार देते.", year: "2025", location: "नवी दिल्ली, भारत", award_body: "अखिल भारतीय व्यवस्थापन संघटना (AIMA)" },
    ],
  },

  gu: {
    section_label: "શ્રી ગણેશ ફાઇનાન્સ",
    section_title: "મુખ્ય સિદ્ધિઓ",
    section_subtitle: "વિશ્વાસ, સેવા અને રાષ્ટ્રીય ઓળખ પર નિર્મિત વારસો — નાણાકીય સમાવેશ અને સામુદાયિક વિકાસ પ્રત્યે દાયકાઓની પ્રતિબદ્ધતાનું સન્માન.",
    click_hint: "વધુ જાણવા ઇમેજ પર ક્લિક કરો",
    close_label: "બંધ કરો",
    items: [
      { id: 1, img: "/About/achieve1.png", img_alt: "શ્રી ગણેશ યાદવ લંડનમાં એશિયન બિઝનેસમેન ઓફ ધ યર એવોર્ડ", short: "શ્રી ગણેશ યાદવ 2021માં બ્રિટિશ પાર્લામેન્ટ, હાઉસ ઓફ કોમન્સ, લંડન ખાતે 'એશિયન બિઝનેસમેન ઓફ ધ યર' એવોર્ડથી સન્માનિત.", title: "એશિયન બિઝનેસમેન ઓફ ધ યર – 2021", description: "શ્રી ગણેશ ફાઇનાન્સ અને સમગ્ર ભારતીય નાણાકીય સમુદાય માટે ગૌરવની ઐતિહાસિક ક્ષણે, શ્રી ગણેશ યાદવને 2021માં પ્રતિષ્ઠિત 'એશિયન બિઝનેસમેન ઓફ ધ યર' એવોર્ડ એનાયત કરવામાં આવ્યો. આ સમારોહ ઐતિહાસિક હાઉસ ઓફ કોમન્સ, બ્રિટિશ પાર્લામેન્ટ, લંડન ખાતે યોજાયો હતો. આ સન્માને નાણાકીય સમાવેશમાં તેમના અસાધારણ યોગદાન અને ગ્રામીણ નાણાકીય સશક્તિકરણ માટેની તેમની દ્રષ્ટિ પ્રકાશિત કરી.", year: "2021", location: "લંડન, યુકે", award_body: "બ્રિટિશ પાર્લામેન્ટ, હાઉસ ઓફ કોમન્સ" },
      { id: 2, img: "/About/achieve2.png", img_alt: "શ્રી ગણેશ યાદવ દુબઈમાં ગોલ્ડન પીકોક CSR એવોર્ડ", short: "શ્રી ગણેશ યાદવ દુબઈ ખાતે CSR માટે 'ગોલ્ડન પીકોક એવોર્ડ-2022' પ્રાપ્ત.", title: "CSR માટે ગોલ્ડન પીકોક એવોર્ડ – 2022", description: "શ્રી ગણેશ ફાઇનાન્સને 2022માં દુબઈ, Maharastra ખાતે ભવ્ય સમારોહ દ્વારા વૈશ્વિક સ્તરે માન્ય 'ગોલ્ડન પીકોક એવોર્ડ ફોર કોર્પોરેટ સોશ્યલ રિસ્પોન્સિબિલિટી'થી સન્માનિત કરવામાં આવ્યા. આ ઓળખ CSR ઉત્કૃષ્ટ પ્રથાઓનું આંતરરાષ્ટ્રીય પ્રતીક છે. શ્રી ગણેશ ફાઇનાન્સ શિક્ષણ, આરોગ્ય, ગ્રામ વિકાસ, મહિલા સશક્તિકરણ અને પર્યાવરણ ટકાઉ વિકાસ માટે સતત રોકાણ કરે છે.", year: "2022", location: "દુબઈ, Maharastra", award_body: "ગોલ્ડન પીકોક એવોર્ડ્સ ઇન્સ્ટિટ્યૂટ" },
      { id: 3, img: "/About/achieve3.png", img_alt: "SKOCH ફાઇનાન્શ્યલ ઇન્ક્લુઝન એવોર્ડ 2024", short: "ભારતમાં નાણાકીય પ્રવેશ માટે ઉત્કૃષ્ટ યોગદાન બદલ 'SKOCH ફાઇનાન્શ્યલ ઇન્ક્લુઝન એવોર્ડ-2024' સ્વીકૃત.", title: "SKOCH ફાઇનાન્શ્યલ ઇન્ક્લુઝન એવોર્ડ – 2024", description: "SKOCH ફાઇનાન્શ્યલ ઇન્ક્લુઝન એવોર્ડ 2024 શ્રી ગણેશ ફાઇનાન્સને ભારતની વિશાળ બિન-બેંકિંગ વસ્તી સુધી ઔપચારિક નાણાકીય સેવાઓ પહોંચાડવામાં અગ્રણી ભૂમિકા માટે મળ્યો. નવીન ગોલ્ડ લોન ઉત્પાદનો, ઘરઆંગણે સેવા અને પારદર્શક ઋણ પ્રથાઓ દ્વારા, શ્રી ગણેશ ફાઇનાન્સ ભારતભરના લાખો પરિવારો માટે નાણાકીય ક્ષેત્ર બદલ્યું છે.", year: "2024", location: "ભારત", award_body: "SKOCH ગ્રૂપ" },
      { id: 4, img: "/About/achieve4.png", img_alt: "AIMA મેનેજિંગ ઇન્ડિયા એવોર્ડ્સ 2025 ઇમર્જિંગ બિઝનેસ લીડર", short: "AIMA મેનેજિંગ ઇન્ડિયા એવોર્ડ્સ 2025 માં માન. ગૃહ મંત્રી દ્વારા 'ઇમર્જિંગ બિઝનેસ લીડર ઓફ ધ યર' ખિતાબ.", title: "ઇમર્જિંગ બિઝનેસ લીડર ઓફ ધ યર – 2025", description: "AIMA મેનેજિંગ ઇન્ડિયા એવોર્ડ્સ 2025 — ભારતના સૌથી ઇચ્છિત બિઝનેસ લીડરશીપ સન્માનો — ખાતે, શ્રી ગણેશ યાદવ 'ઇમર્જિંગ બિઝનેસ લીડર ઓફ ધ યર' તરીકે ઓળખાયા. એવોર્ડ ભારતના માન. ગૃહ મંત્રી દ્વારા અર્પણ કરવામાં આવ્યો. AIMA (ઓલ ઇન્ડિયા મેનેજમેન્ટ એસોસિએશન) ઉત્કૃષ્ટ સ્ત્રીની કુશળતા, નવોન્મેષ અને ઉદ્યોગ પર પ્રભાવ ધરાવનારાઓ ને આ એવોર્ડ આપે છે.", year: "2025", location: "નવી દિલ્હી, ભારત", award_body: "ઓલ ઇન્ડિયા મેનેજમેન્ટ એસોસિએશન (AIMA)" },
    ],
  },

  te: {
    section_label: "శ్రీ గణేష్ ఫైనాన్స్",
    section_title: "ముఖ్య విజయాలు",
    section_subtitle: "విశ్వాసం, సేవ మరియు జాతీయ గుర్తింపుపై నిర్మించిన వారసత్వం — ఆర్థిక చేరికకు మరియు సామాజిక అభివృద్ధికి దశాబ్దాల నిబద్ధత.",
    click_hint: "మరింత చదవడానికి చిత్రంపై క్లిక్ చేయండి",
    close_label: "మూసివేయి",
    items: [
      { id: 1, img: "/About/achieve1.png", img_alt: "శ్రీ గణేష్ యాదవ్ లండన్‌లో ఆసియన్ బిజినెస్‌మ్యాన్ అవార్డు", short: "శ్రీ గణేష్ యాదవ్‌కు 2021లో బ్రిటిష్ పార్లమెంట్, హౌస్ ఆఫ్ కామన్స్, లండన్‌లో 'ఆసియన్ బిజినెస్‌మ్యాన్ ఆఫ్ ది యియర్' అవార్డు లభించింది.", title: "ఆసియన్ బిజినెస్‌మ్యాన్ ఆఫ్ ది యియర్ – 2021", description: "శ్రీ గణేష్ ఫైనాన్స్ మరియు మొత్తం భారతీయ ఆర్థిక సమాజానికి గర్వకారణమైన చారిత్రాత్మక సందర్భంలో, శ్రీ గణేష్ యాదవ్‌కు 2021లో ప్రతిష్ఠాత్మక 'ఆసియన్ బిజినెస్‌మ్యాన్ ఆఫ్ ది యియర్' అవార్డు అందుకున్నారు. ఈ వేడుక చారిత్రక హౌస్ ఆఫ్ కామన్స్, బ్రిటిష్ పార్లమెంట్, లండన్‌లో జరిగింది. ఈ గుర్తింపు ఆర్థిక చేరికలో వారి అసాధారణ కృషి, గ్రామీణ ఆర్థిక సాధికారత కోసం వారి దృష్టి మరియు లక్షలాది మంది భారతీయులకు చౌకైన రుణ సేవలు అందించే అలుపెరగని ప్రయత్నాలను ప్రతిబింబించింది.", year: "2021", location: "లండన్, Maharastra", award_body: "బ్రిటిష్ పార్లమెంట్, హౌస్ ఆఫ్ కామన్స్" },
      { id: 2, img: "/About/achieve2.png", img_alt: "దుబాయ్‌లో గోల్డెన్ పీకాక్ CSR అవార్డు", short: "దుబాయ్‌లో జరిగిన వేడుకలో CSR కోసం 'గోల్డెన్ పీకాక్ అవార్డ్-2022' అందుకున్నారు.", title: "CSR కోసం గోల్డెన్ పీకాక్ అవార్డ్ – 2022", description: "శ్రీ గణేష్ ఫైనాన్స్‌కు 2022లో దుబాయ్, Maharastra లో జరిగిన ఘన వేడుకలో ప్రపంచ ప్రసిద్ధ 'గోల్డెన్ పీకాక్ అవార్డ్ ఫర్ కార్పొరేట్ సోషల్ రెస్పాన్సిబిలిటీ' అందించబడింది. శ్రీ గణేష్ యాదవ్ దూరదృష్టి నాయకత్వంలో, కంపెనీ విద్య, ఆరోగ్య సంరక్షణ, గ్రామీణ అభివృద్ధి, మహిళా సాధికారత మరియు పర్యావరణ స్థిరత్వంలో గణనీయంగా పెట్టుబడి పెట్టింది.", year: "2022", location: "దుబాయ్, Maharastra", award_body: "గోల్డెన్ పీకాక్ అవార్డ్స్ ఇన్‌స్టిట్యూట్" },
      { id: 3, img: "/About/achieve3.png", img_alt: "SKOCH ఫైనాన్షియల్ ఇంక్లూజన్ అవార్డ్ 2024", short: "భారతదేశంలో ఆర్థిక ప్రవేశానికి అత్యుత్తమ సహకారం కోసం 'SKOCH ఫైనాన్షియల్ ఇంక్లూజన్ అవార్డ్-2024' అందుకున్నారు.", title: "SKOCH ఫైనాన్షియల్ ఇంక్లూజన్ అవార్డ్ – 2024", description: "SKOCH ఫైనాన్షియల్ ఇంక్లూజన్ అవార్డ్ 2024 శ్రీ గణేష్ ఫైనాన్స్‌కు భారతదేశంలోని విస్తారమైన బ్యాంకింగ్ సదుపాయం లేని జనాభాకు అధికారిక ఆర్థిక సేవలు అందించడంలో మార్గదర్శక పాత్ర కోసం అందించబడింది. నవీన గోల్డ్ లోన్ ఉత్పత్తులు, తలుపు వద్ద సేవలు మరియు పారదర్శకమైన రుణ పద్ధతుల ద్వారా, కంపెనీ లక్షలాది కుటుంబాలకు ఆర్థిక దృశ్యాన్ని మార్చింది.", year: "2024", location: "భారతదేశం", award_body: "SKOCH గ్రూప్" },
      { id: 4, img: "/About/achieve4.png", img_alt: "AIMA మేనేజింగ్ ఇండియా అవార్డ్స్ 2025 ఎమర్జింగ్ బిజినెస్ లీడర్", short: "AIMA మేనేజింగ్ ఇండియా అవార్డ్స్ 2025లో కేంద్ర హోం మంత్రి చేతులమీదుగా 'ఎమర్జింగ్ బిజినెస్ లీడర్ ఆఫ్ ది యియర్' బిరుదు.", title: "ఎమర్జింగ్ బిజినెస్ లీడర్ ఆఫ్ ది యియర్ – 2025", description: "AIMA మేనేజింగ్ ఇండియా అవార్డ్స్ 2025లో — భారతదేశంలో అత్యంత ప్రతిష్ఠాత్మక వ్యాపార నాయకత్వ గౌరవాలలో ఒకటి — శ్రీ గణేష్ యాదవ్ 'ఎమర్జింగ్ బిజినెస్ లీడర్ ఆఫ్ ది యియర్'గా గుర్తించబడ్డారు. అవార్డు భారత కేంద్ర హోం మంత్రి చేతులమీదుగా అందించబడింది. AIMA అసాధారణ నిర్వాహణ నైపుణ్యం, ఆవిష్కరణ ఆలోచన మరియు పరిశ్రమపై పరివర్తన ప్రభావాన్ని చూపిన వ్యక్తులకు ఈ అవార్డు ప్రదానం చేస్తుంది.", year: "2025", location: "న్యూ ఢిల్లీ, భారతదేశం", award_body: "ఆల్ ఇండియా మేనేజ్‌మెంట్ అసోసియేషన్ (AIMA)" },
    ],
  },

  ta: {
    section_label: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ்",
    section_title: "முக்கிய சாதனைகள்",
    section_subtitle: "நம்பிக்கை, சேவை மற்றும் தேசிய அங்கீகாரத்தின் மீது கட்டமைக்கப்பட்ட மரபு — நிதி சேர்க்கை மற்றும் சமூக வளர்ச்சிக்கான தசாப்தகால அர்ப்பணிப்பை கௌரவிக்கிறோம்.",
    click_hint: "மேலும் படிக்க படத்தை கிளிக் செய்யுங்கள்",
    close_label: "மூடு",
    items: [
      { id: 1, img: "/About/achieve1.png", img_alt: "திரு கணேஷ் யாதவ் லண்டனில் ஆசிய வியாபாரி விருது", short: "திரு கணேஷ் யாதவ் 2021ல் ஹவுஸ் ஆஃப் காமன்ஸ், பிரிட்டிஷ் பாராளுமன்றம், லண்டனில் 'ஆசியன் பிசினஸ்மேன் ஆஃப் தி இயர்' விருது பெற்றார்.", title: "ஆசியன் பிசினஸ்மேன் ஆஃப் தி இயர் – 2021", description: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் மற்றும் ஒட்டுமொத்த இந்திய நிதி சமூகத்திற்கும் பெருமைக்குரிய ஒரு வரலாற்று தருணத்தில், திரு கணேஷ் யாதவ் 2021ல் மதிப்பான 'ஆசியன் பிசினஸ்மேன் ஆஃப் தி இயர்' விருது வழங்கப்பட்டது. இந்த நிகழ்ச்சி ஐதிகமான ஹவுஸ் ஆஃப் காமன்ஸ், பிரிட்டிஷ் பார்லிமென்ட், லண்டனில் நடைபெற்றது. இந்த அங்கீகாரம் நிதி சேர்க்கையில் அவரது அசாதாரண பங்களிப்புகள் மற்றும் கிராமப்புற நிதி மேம்பாட்டிற்கான அவரது பார்வையை வெளிப்படுத்தியது.", year: "2021", location: "லண்டன், Maharastra", award_body: "பிரிட்டிஷ் பார்லிமென்ட், ஹவுஸ் ஆஃப் காமன்ஸ்" },
      { id: 2, img: "/About/achieve2.png", img_alt: "திரு கணேஷ் யாதவ் துபாயில் கோல்டன் பீகாக் CSR விருது", short: "திரு கணேஷ் யாதவ் துபாயில் நடைபெற்ற விழாவில் CSR-க்காக 'கோல்டன் பீகாக் அவார்ட்-2022' பெற்றார்.", title: "CSR-க்கான கோல்டன் பீகாக் விருது – 2022", description: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் 2022ல் துபாய், Maharastra-ல் நடைபெற்ற ஒரு அமோகமான விழாவில் உலக அளவில் அங்கீகரிக்கப்பட்ட 'கோல்டன் பீகாக் அவார்ட் ஃபார் கார்பொரேட் சோஷியல் ரெஸ்பான்சிபிலிட்டி' விருது வழங்கப்பட்டது. திரு கணேஷ் யாதவ் தொலைநோக்கு தலைமையில், நிறுவனம் கல்வி, சுகாதாரம், கிராம வளர்ச்சி, பெண் மேம்பாடு மற்றும் சுற்றுச்சூழல் நிலைத்தன்மையில் குறிப்பிடத்தக்க முதலீடு செய்துள்ளது.", year: "2022", location: "துபாய், Maharastra", award_body: "கோல்டன் பீகாக் அவார்ட்ஸ் இன்ஸ்டிட்யூட்" },
      { id: 3, img: "/About/achieve3.png", img_alt: "SKOCH நிதி சேர்க்கை விருது 2024", short: "இந்தியாவில் நிதி அணுகலில் சிறந்த பங்களிப்புக்காக 'SKOCH ஃபைனான்ஷியல் இன்க்லூஷன் அவார்ட்-2024' வழங்கப்பட்டது.", title: "SKOCH நிதி சேர்க்கை விருது – 2024", description: "SKOCH ஃபைனான்ஷியல் இன்க்லூஷன் அவார்ட் 2024 ஸ்ரீ கணேஷ் ஃபைனான்ஸிற்கு இந்தியாவின் வங்கி வசதியற்ற மக்களுக்கு முறையான நிதி சேவைகளை கிட்டத்திட்டமாக செய்வதில் முன்னோடி பாத்திரத்திற்காக வழங்கப்பட்டது. புதுமையான தங்க கடன் தயாரிப்புகள் மற்றும் வெளிப்படையான கடன் நடைமுறைகள் மூலம், நிறுவனம் இந்தியாவெங்கும் லட்சக்கணக்கான குடும்பங்களுக்கு நிதி நிலையை மாற்றியமைத்துள்ளது.", year: "2024", location: "இந்தியா", award_body: "SKOCH குழு" },
      { id: 4, img: "/About/achieve4.png", img_alt: "AIMA மேனேஜிங் இந்தியா அவார்ட்ஸ் 2025 எமர்ஜிங் பிசினஸ் லீடர்", short: "AIMA மேனேஜிங் இந்தியா அவார்ட்ஸ் 2025ல் மத்திய உள்துறை அமைச்சரால் 'எமர்ஜிங் பிசினஸ் லீடர் ஆஃப் தி இயர்' பட்டம்.", title: "எமர்ஜிங் பிசினஸ் லீடர் ஆஃப் தி இயர் – 2025", description: "AIMA மேனேஜிங் இந்தியா அவார்ட்ஸ் 2025ல் — இந்தியாவின் மிகவும் மதிப்பான வணிக தலைமை விருதுகளில் ஒன்று — திரு கணேஷ் யாதவ் 'எமர்ஜிங் பிசினஸ் லீடர் ஆஃப் தி இயர்' என அங்கீகரிக்கப்பட்டார். விருது மத்திய உள்துறை அமைச்சரால் வழங்கப்பட்டது. AIMA விதிவிலக்கான மேலாண்மை திறமை, புதுமை சிந்தனை மற்றும் தொழிலில் மாற்றத்தை ஏற்படுத்தியவர்களை கொண்டாடுகிறது.", year: "2025", location: "புது டெல்லி, இந்தியா", award_body: "அகில இந்திய மேலாண்மை சங்கம் (AIMA)" },
    ],
  },

  kn: {
    section_label: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್",
    section_title: "ಪ್ರಮುಖ ಸಾಧನೆಗಳು",
    section_subtitle: "ವಿಶ್ವಾಸ, ಸೇವೆ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಮಾನ್ಯತೆಯ ಮೇಲೆ ನಿರ್ಮಿಸಿದ ಪರಂಪರೆ — ಆರ್ಥಿಕ ಸೇರ್ಪಡೆ ಮತ್ತು ಸಮುದಾಯ ಅಭಿವೃದ್ಧಿಗೆ ದಶಕಗಳ ಬದ್ಧತೆ.",
    click_hint: "ಹೆಚ್ಚು ಓದಲು ಚಿತ್ರ ಕ್ಲಿಕ್ ಮಾಡಿ",
    close_label: "ಮುಚ್ಚು",
    items: [
      { id: 1, img: "/About/achieve1.png", img_alt: "ಶ್ರೀ ಗಣೇಶ್ ಯಾದವ್ ಲಂಡನ್‌ನಲ್ಲಿ ಏಷ್ಯನ್ ಬಿಸಿನೆಸ್‌ಮ್ಯಾನ್ ಪ್ರಶಸ್ತಿ", short: "ಶ್ರೀ ಗಣೇಶ್ ಯಾದವ್ 2021ರಲ್ಲಿ ಬ್ರಿಟಿಷ್ ಸಂಸತ್ತು, ಹೌಸ್ ಆಫ್ ಕಾಮನ್ಸ್, ಲಂಡನ್‌ನಲ್ಲಿ 'ಏಷ್ಯನ್ ಬಿಸಿನೆಸ್‌ಮ್ಯಾನ್ ಆಫ್ ದಿ ಇಯರ್' ಪ್ರಶಸ್ತಿ ಪಡೆದರು.", title: "ಏಷ್ಯನ್ ಬಿಸಿನೆಸ್‌ಮ್ಯಾನ್ ಆಫ್ ದಿ ಇಯರ್ – 2021", description: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಮತ್ತು ಇಡೀ ಭಾರತೀಯ ಹಣಕಾಸು ಸಮುದಾಯಕ್ಕೆ ಹೆಮ್ಮೆಯ ಐತಿಹಾಸಿಕ ಕ್ಷಣದಲ್ಲಿ, ಶ್ರೀ ಗಣೇಶ್ ಯಾದವ್ ಅವರಿಗೆ 2021ರಲ್ಲಿ ಪ್ರತಿಷ್ಠಿತ 'ಏಷ್ಯನ್ ಬಿಸಿನೆಸ್‌ಮ್ಯಾನ್ ಆಫ್ ದಿ ಇಯರ್' ಪ್ರಶಸ್ತಿ ನೀಡಲಾಯಿತು. ಐತಿಹಾಸಿಕ ಹೌಸ್ ಆಫ್ ಕಾಮನ್ಸ್, ಬ್ರಿಟಿಷ್ ಪಾರ್ಲಿಮೆಂಟ್, ಲಂಡನ್‌ನಲ್ಲಿ ಈ ಸಮಾರಂಭ ನಡೆಯಿತು. ಆರ್ಥಿಕ ಸೇರ್ಪಡೆಗೆ ಅವರ ಅಸಾಮಾನ್ಯ ಕೊಡುಗೆಗಳು ಮತ್ತು ಗ್ರಾಮೀಣ ಸಶಕ್ತೀಕರಣದ ದೃಷ್ಟಿಯನ್ನು ಈ ಗೌರವ ಎತ್ತಿ ತೋರಿಸಿತು.", year: "2021", location: "ಲಂಡನ್, Maharastra", award_body: "ಬ್ರಿಟಿಷ್ ಪಾರ್ಲಿಮೆಂಟ್, ಹೌಸ್ ಆಫ್ ಕಾಮನ್ಸ್" },
      { id: 2, img: "/About/achieve2.png", img_alt: "ಶ್ರೀ ಗಣೇಶ್ ಯಾದವ್ ದುಬೈನಲ್ಲಿ ಗೋಲ್ಡನ್ ಪೀಕಾಕ್ CSR ಪ್ರಶಸ್ತಿ", short: "ದುಬೈನಲ್ಲಿ ನಡೆದ ಸಮಾರಂಭದಲ್ಲಿ CSR ಗಾಗಿ 'ಗೋಲ್ಡನ್ ಪೀಕಾಕ್ ಅವಾರ್ಡ್-2022' ಸ್ವೀಕಾರ.", title: "CSR ಗಾಗಿ ಗೋಲ್ಡನ್ ಪೀಕಾಕ್ ಅವಾರ್ಡ್ – 2022", description: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ಗೆ 2022ರಲ್ಲಿ ದುಬೈ, Maharastra ನಲ್ಲಿ ನಡೆದ ಭವ್ಯ ಸಮಾರಂಭದಲ್ಲಿ ಜಾಗತಿಕ ಮಾನ್ಯತೆ ಪಡೆದ 'ಗೋಲ್ಡನ್ ಪೀಕಾಕ್ ಅವಾರ್ಡ್ ಫಾರ್ ಕಾರ್ಪೊರೇಟ್ ಸೋಶಿಯಲ್ ರೆಸ್ಪಾನ್ಸಿಬಿಲಿಟಿ' ನೀಡಲಾಯಿತು. ಶ್ರೀ ಗಣೇಶ್ ಯಾದವ್ ನೇತೃತ್ವದಲ್ಲಿ, ಕಂಪನಿ ಶಿಕ್ಷಣ, ಆರೋಗ್ಯ, ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ, ಮಹಿಳಾ ಸಶಕ್ತೀಕರಣ ಮತ್ತು ಪರಿಸರ ಸಂರಕ್ಷಣೆಯಲ್ಲಿ ಗಣನೀಯ ಹೂಡಿಕೆ ಮಾಡಿದೆ.", year: "2022", location: "ದುಬೈ, Maharastra", award_body: "ಗೋಲ್ಡನ್ ಪೀಕಾಕ್ ಅವಾರ್ಡ್ಸ್ ಇನ್‌ಸ್ಟಿಟ್ಯೂಟ್" },
      { id: 3, img: "/About/achieve3.png", img_alt: "SKOCH ಹಣಕಾಸು ಸೇರ್ಪಡೆ ಪ್ರಶಸ್ತಿ 2024", short: "ಭಾರತದಲ್ಲಿ ಹಣಕಾಸು ಪ್ರವೇಶಕ್ಕೆ ಅಸಾಮಾನ್ಯ ಕೊಡುಗೆಗಾಗಿ 'SKOCH ಫೈನಾನ್ಶಿಯಲ್ ಇನ್‌ಕ್ಲೂಷನ್ ಅವಾರ್ಡ್-2024' ಪ್ರಶಸ್ತಿ.", title: "SKOCH ಹಣಕಾಸು ಸೇರ್ಪಡೆ ಪ್ರಶಸ್ತಿ – 2024", description: "SKOCH ಫೈನಾನ್ಶಿಯಲ್ ಇನ್‌ಕ್ಲೂಷನ್ ಅವಾರ್ಡ್ 2024 ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ಗೆ ಭಾರತದ ಬ್ಯಾಂಕಿಂಗ್ ಸೌಲಭ್ಯವಿಲ್ಲದ ಜನಸಂಖ್ಯೆಗೆ ಔಪಚಾರಿಕ ಹಣಕಾಸು ಸೇವೆಗಳನ್ನು ತಲುಪಿಸುವ ಮಾರ್ಗದರ್ಶಿ ಪಾತ್ರಕ್ಕಾಗಿ ನೀಡಲಾಯಿತು. ನವೀನ ಚಿನ್ನದ ಸಾಲ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಪಾರದರ್ಶಕ ಸಾಲ ಪದ್ಧತಿಗಳ ಮೂಲಕ, ಕಂಪನಿ ಲಕ್ಷಾಂತರ ಕುಟುಂಬಗಳ ಹಣಕಾಸು ದೃಶ್ಯವನ್ನು ಬದಲಿಸಿದೆ.", year: "2024", location: "ಭಾರತ", award_body: "SKOCH ಗ್ರೂಪ್" },
      { id: 4, img: "/About/achieve4.png", img_alt: "AIMA ಮ್ಯಾನೇಜಿಂಗ್ ಇಂಡಿಯಾ ಅವಾರ್ಡ್ಸ್ 2025 ಎಮರ್ಜಿಂಗ್ ಬಿಸಿನೆಸ್ ಲೀಡರ್", short: "AIMA ಮ್ಯಾನೇಜಿಂಗ್ ಇಂಡಿಯಾ ಅವಾರ್ಡ್ಸ್ 2025ರಲ್ಲಿ ಕೇಂದ್ರ ಗೃಹ ಮಂತ್ರಿಯಿಂದ 'ಎಮರ್ಜಿಂಗ್ ಬಿಸಿನೆಸ್ ಲೀಡರ್ ಆಫ್ ದಿ ಇಯರ್' ಬಿರುದು.", title: "ಎಮರ್ಜಿಂಗ್ ಬಿಸಿನೆಸ್ ಲೀಡರ್ ಆಫ್ ದಿ ಇಯರ್ – 2025", description: "AIMA ಮ್ಯಾನೇಜಿಂಗ್ ಇಂಡಿಯಾ ಅವಾರ್ಡ್ಸ್ 2025ರಲ್ಲಿ — ಭಾರತದ ಅತ್ಯಂತ ಪ್ರತಿಷ್ಠಿತ ವ್ಯವಹಾರ ನಾಯಕತ್ವ ಗೌರವಗಳಲ್ಲಿ ಒಂದಾದ — ಶ್ರೀ ಗಣೇಶ್ ಯಾದವ್ 'ಎಮರ್ಜಿಂಗ್ ಬಿಸಿನೆಸ್ ಲೀಡರ್ ಆಫ್ ದಿ ಇಯರ್' ಎಂದು ಗುರ್ತಿಸಲ್ಪಟ್ಟರು. ಪ್ರಶಸ್ತಿಯನ್ನು ಭಾರತದ ಕೇಂದ್ರ ಗೃಹ ಮಂತ್ರಿ ನೀಡಿದರು. AIMA ಅಸಾಮಾನ್ಯ ನಿರ್ವಹಣಾ ಚಾತುರ್ಯ, ನವೀನ ಚಿಂತನೆ ಮತ್ತು ಉದ್ಯಮದ ಮೇಲೆ ಪರಿವರ್ತನಾ ಪ್ರಭಾವ ತೋರಿದವರಿಗೆ ಈ ಪ್ರಶಸ್ತಿ ನೀಡುತ್ತದೆ.", year: "2025", location: "ನವ ದೆಹಲಿ, ಭಾರತ", award_body: "ಅಖಿಲ ಭಾರತ ನಿರ್ವಹಣಾ ಸಂಘ (AIMA)" },
    ],
  },

  as: {
    section_label: "শ্ৰী গণেশ ফাইনেন্স",
    section_title: "মুখ্য সাফল্যসমূহ",
    section_subtitle: "বিশ্বাস, সেৱা আৰু ৰাষ্ট্ৰীয় স্বীকৃতিৰ ওপৰত নিৰ্মিত পৰম্পৰা — আৰ্থিক অন্তৰ্ভুক্তি আৰু সামাজিক বিকাশৰ প্ৰতি দশকৰ নিবেদন।",
    click_hint: "অধিক পঢ়িবলৈ ছবিত ক্লিক কৰক",
    close_label: "বন্ধ কৰক",
    items: [
      { id: 1, img: "/About/achieve1.png", img_alt: "শ্ৰী গণেশ যাদৱ লণ্ডনত এছিয়ান বিজনেছমেন পুৰস্কাৰ", short: "শ্ৰী গণেশ যাদৱক 2021 চনত ব্ৰিটিছ পাৰ্লামেণ্ট, হাউছ অৱ কমন্স, লণ্ডনত 'এছিয়ান বিজনেছমেন অৱ দ্য ইয়াৰ' বঁটাৰে সন্মানিত কৰা হয়।", title: "এছিয়ান বিজনেছমেন অৱ দ্য ইয়াৰ – 2021", description: "শ্ৰী গণেশ ফাইনেন্স আৰু সমগ্ৰ ভাৰতীয় বিত্তীয় সমাজৰ বাবে গৌৰৱৰ এক ঐতিহাসিক মুহূৰ্তত, শ্ৰী গণেশ যাদৱক 2021 চনত প্ৰতিষ্ঠিত 'এছিয়ান বিজনেছমেন অৱ দ্য ইয়াৰ' বঁটা প্ৰদান কৰা হয়। এই অনুষ্ঠান ঐতিহাসিক হাউছ অৱ কমন্স, ব্ৰিটিছ পাৰ্লামেণ্ট, লণ্ডনত অনুষ্ঠিত হয়। এই স্বীকৃতিয়ে আৰ্থিক অন্তৰ্ভুক্তিত তেওঁৰ অসাধাৰণ অৱদান আৰু গ্ৰামীণ সবলীকৰণৰ প্ৰতি তেওঁৰ দৃষ্টিভংগী উজ্জ্বল কৰি তুলিলে।", year: "2021", location: "লণ্ডন, Maharastra", award_body: "ব্ৰিটিছ পাৰ্লামেণ্ট, হাউছ অৱ কমন্স" },
      { id: 2, img: "/About/achieve2.png", img_alt: "শ্ৰী গণেশ যাদৱ দুবাইত গোল্ডেন পিকক CSR বঁটা", short: "দুবাইত অনুষ্ঠিত এক অনুষ্ঠানত CSR-ৰ বাবে 'গোল্ডেন পিকক এৱাৰ্ড-2022' গ্ৰহণ।", title: "CSR-ৰ বাবে গোল্ডেন পিকক এৱাৰ্ড – 2022", description: "শ্ৰী গণেশ ফাইনেন্সক 2022 চনত দুবাই, Maharastra-ত অনুষ্ঠিত এক ভব্য অনুষ্ঠানত বিশ্বব্যাপী স্বীকৃত 'গোল্ডেন পিকক এৱাৰ্ড ফৰ কৰ্পোৰেট ছ'চিয়েল ৰেছপন্সিবিলিটি' প্ৰদান কৰা হয়। শ্ৰী গণেশ যাদৱৰ দূৰদৰ্শী নেতৃত্বত, কোম্পানীটোৱে শিক্ষা, স্বাস্থ্যসেৱা, গ্ৰামীণ উন্নয়ন, মহিলা সবলীকৰণ আৰু পৰিৱেশগত স্থায়িত্বত উল্লেখযোগ্য বিনিয়োগ কৰিছে।", year: "2022", location: "দুবাই, Maharastra", award_body: "গোল্ডেন পিকক এৱাৰ্ডছ ইন্সটিটিউট" },
      { id: 3, img: "/About/achieve3.png", img_alt: "SKOCH আৰ্থিক অন্তৰ্ভুক্তি বঁটা 2024", short: "ভাৰতত আৰ্থিক প্ৰৱেশৰ বাবে অসাধাৰণ অৱদানৰ বাবে 'SKOCH ফাইনান্সিয়েল ইনক্লুজন এৱাৰ্ড-2024' প্ৰদান।", title: "SKOCH আৰ্থিক অন্তৰ্ভুক্তি বঁটা – 2024", description: "SKOCH ফাইনান্সিয়েল ইনক্লুজন এৱাৰ্ড 2024 শ্ৰী গণেশ ফাইনেন্সক ভাৰতৰ বিশাল অব্যাংকড জনসংখ্যালৈ আনুষ্ঠানিক আৰ্থিক সেৱা প্ৰসাৰিত কৰাত পথপ্ৰদৰ্শক ভূমিকাৰ বাবে প্ৰদান কৰা হয়। উদ্ভাৱনী গোল্ড লোন সামগ্ৰী আৰু স্বচ্ছ ঋণ পদ্ধতিৰ জৰিয়তে, কোম্পানীটোৱে লাখ লাখ পৰিয়ালৰ বাবে আৰ্থিক পৰিদৃশ্য সলনি কৰিছে।", year: "2024", location: "ভাৰত", award_body: "SKOCH গ্ৰুপ" },
      { id: 4, img: "/About/achieve4.png", img_alt: "AIMA মেনেজিং ইণ্ডিয়া এৱাৰ্ডছ 2025 এমাৰ্জিং বিজনেছ লিডাৰ", short: "AIMA মেনেজিং ইণ্ডিয়া এৱাৰ্ডছ 2025-ত কেন্দ্ৰীয় গৃহ মন্ত্ৰীৰ দ্বাৰা 'এমাৰ্জিং বিজনেছ লিডাৰ অৱ দ্য ইয়াৰ' খিতাপ।", title: "এমাৰ্জিং বিজনেছ লিডাৰ অৱ দ্য ইয়াৰ – 2025", description: "AIMA মেনেজিং ইণ্ডিয়া এৱাৰ্ডছ 2025-ত — ভাৰতৰ সৰ্বাধিক সন্মানজনক ব্যৱসায়িক নেতৃত্ব স্বীকৃতিসমূহৰ ভিতৰত এটা — শ্ৰী গণেশ যাদৱক 'এমাৰ্জিং বিজনেছ লিডাৰ অৱ দ্য ইয়াৰ' হিচাপে স্বীকৃতি দিয়া হয়। বঁটা ভাৰতৰ কেন্দ্ৰীয় গৃহ মন্ত্ৰীৰ দ্বাৰা প্ৰদান কৰা হয়। AIMA অসাধাৰণ ব্যৱস্থাপনা দক্ষতা, উদ্ভাৱনী চিন্তা আৰু উদ্যোগত পৰিৱৰ্তনসাধক প্ৰভাৱ প্ৰদৰ্শন কৰাসকলক এই বঁটা প্ৰদান কৰে।", year: "2025", location: "নতুন দিল্লী, ভাৰত", award_body: "অল ইণ্ডিয়া মেনেজমেণ্ট এছোচিয়েচন (AIMA)" },
    ],
  },

  ur: {
    section_label: "شری گنیش فنانس",
    section_title: "اہم کامیابیاں",
    section_subtitle: "اعتماد، خدمت اور قومی اعتراف پر قائم میراث — مالیاتی شمولیت اور سماجی ترقی کے لیے دہائیوں کی لگن کا اعتراف۔",
    click_hint: "مزید پڑھنے کے لیے تصویر پر کلک کریں",
    close_label: "بند کریں",
    items: [
      { id: 1, img: "/About/achieve1.png", img_alt: "جناب گنیش یادو لندن میں ایشین بزنس مین آف دی ایئر ایوارڈ", short: "جناب گنیش یادو کو 2021 میں ہاؤس آف کامنز، برطانوی پارلیمنٹ، لندن میں 'ایشین بزنس مین آف دی ایئر' ایوارڈ سے نوازا گیا۔", title: "ایشین بزنس مین آف دی ایئر – 2021", description: "شری گنیش فنانس اور پوری بھارتی مالیاتی برادری کے لیے فخر کے ایک تاریخی لمحے میں، جناب گنیش یادو کو 2021 میں معزز 'ایشین بزنس مین آف دی ایئر' ایوارڈ عطا کیا گیا۔ یہ تقریب تاریخی ہاؤس آف کامنز، برطانوی پارلیمنٹ، لندن میں منعقد ہوئی۔ اس اعتراف نے مالیاتی شمولیت میں ان کی غیر معمولی خدمات، دیہی مالیاتی ترقی کے لیے ان کے وژن اور لاکھوں محروم بھارتیوں کو سستی قرضہ سہولیات فراہم کرنے کی ان کی انتھک کوششوں کو اجاگر کیا۔", year: "2021", location: "لندن، برطانیہ", award_body: "برطانوی پارلیمنٹ، ہاؤس آف کامنز" },
      { id: 2, img: "/About/achieve2.png", img_alt: "جناب گنیش یادو دبئی میں گولڈن پیکاک CSR ایوارڈ", short: "دبئی میں منعقد تقریب میں CSR کے لیے 'گولڈن پیکاک ایوارڈ-2022' وصول کیا۔", title: "CSR کے لیے گولڈن پیکاک ایوارڈ – 2022", description: "شری گنیش فنانس کو 2022 میں دبئی، Maharastra میں ایک شاندار تقریب میں عالمی سطح پر تسلیم شدہ 'گولڈن پیکاک ایوارڈ فار کارپوریٹ سوشل ریسپانسبلٹی' سے نوازا گیا۔ جناب گنیش یادو کی دور اندیشانہ قیادت میں، کمپنی نے تعلیم، صحت، دیہی ترقی، خواتین کی بہبود اور ماحولیاتی پائیداری میں نمایاں سرمایہ کاری کی ہے۔", year: "2022", location: "دبئی، Maharastra", award_body: "گولڈن پیکاک ایوارڈز انسٹیٹیوٹ" },
      { id: 3, img: "/About/achieve3.png", img_alt: "SKOCH مالیاتی شمولیت ایوارڈ 2024", short: "بھارت میں مالیاتی رسائی میں نمایاں خدمات کے اعتراف میں 'SKOCH فنانشل انکلوژن ایوارڈ-2024' حاصل کیا۔", title: "SKOCH مالیاتی شمولیت ایوارڈ – 2024", description: "SKOCH فنانشل انکلوژن ایوارڈ 2024 شری گنیش فنانس کو بھارت کی وسیع غیر بینکاری آبادی تک رسمی مالیاتی خدمات پہنچانے میں پیشرو کردار کے لیے عطا کیا گیا۔ جدید گولڈ لون مصنوعات اور شفاف قرضہ جات طریقوں کے ذریعے، کمپنی نے پورے بھارت میں لاکھوں خاندانوں کے لیے مالیاتی منظرنامہ بدل دیا ہے۔", year: "2024", location: "بھارت", award_body: "SKOCH گروپ" },
      { id: 4, img: "/About/achieve4.png", img_alt: "AIMA مینیجنگ انڈیا ایوارڈز 2025 ابھرتا بزنس لیڈر", short: "AIMA مینیجنگ انڈیا ایوارڈز 2025 میں وزیر داخلہ کے ہاتھوں 'ابھرتا بزنس لیڈر آف دی ایئر' کا خطاب۔", title: "ابھرتا بزنس لیڈر آف دی ایئر – 2025", description: "AIMA مینیجنگ انڈیا ایوارڈز 2025 — بھارت کے سب سے معزز کاروباری قیادت اعزازات میں سے ایک — میں جناب گنیش یادو کو 'ابھرتا بزنس لیڈر آف دی ایئر' کے طور پر تسلیم کیا گیا۔ یہ ایوارڈ بھارت کے وزیر داخلہ نے عطا کیا۔ AIMA غیر معمولی انتظامی صلاحیت، جدت پسند سوچ اور صنعت پر تبدیلی آفریں اثرات مرتب کرنے والوں کو یہ ایوارڈ دیتا ہے۔", year: "2025", location: "نئی دہلی، بھارت", award_body: "آل انڈیا مینیجمنٹ ایسوسی ایشن (AIMA)" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── ACHIEVEMENT CARD
// ═══════════════════════════════════════════════════════════════════════════════
const AchievementCard = ({ item, isActive, onClick, onClose, animDelay, t_close, isRtl }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    cardRef.current.style.opacity = "0";
    cardRef.current.style.transform = "translateY(40px)";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          cardRef.current.style.transition = "opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)";
          cardRef.current.style.opacity = "1";
          cardRef.current.style.transform = "translateY(0)";
        }, animDelay);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, [animDelay]);

  return (
    <article
      ref={cardRef}
      itemScope
      itemType="https://schema.org/Event"
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer
        ${isActive
          ? "border-red-400 shadow-2xl shadow-red-100/60 ring-2 ring-red-300 scale-[1.02]"
          : "border-gray-100 shadow-md hover:shadow-xl hover:border-red-200 hover:scale-[1.01]"
        }`}
      onClick={() => onClick(item.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(item.id)}
      aria-expanded={isActive}
      aria-label={item.title}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.img}
          alt={item.img_alt}
          itemProp="image"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x300/fee2e2/991b1b?text=Achievement+${item.id}`;
          }}
        />
        {/* Year badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-600/90 backdrop-blur-sm text-white text-[11px] font-black tracking-wider shadow-lg">
          {item.year}
        </div>
        {/* Click hint overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`}>
          <p className="text-white text-xs font-semibold px-4 pb-3 drop-shadow">{t_close}</p>
        </div>
        {/* Active indicator */}
        {isActive && (
          <div className="absolute inset-0 bg-red-900/10 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-red-600/80 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-5 h-5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <div className="w-1 h-full min-h-[36px] rounded-full bg-gradient-to-b from-red-500 to-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-gray-700 leading-snug font-medium line-clamp-3" itemProp="description">
            {item.short}
          </p>
        </div>
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">{item.location}</span>
          <span className="text-[10px] text-gray-400 font-medium">{item.award_body.split(",")[0]}</span>
        </div>
      </div>
    </article>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── EXPANDED DESCRIPTION PANEL
// ═══════════════════════════════════════════════════════════════════════════════
const ExpandedPanel = ({ item, onClose, close_label, isRtl }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [item]);

  return (
    <div
      ref={panelRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="col-span-full w-full bg-gradient-to-br from-red-50 via-white to-yellow-50/40 rounded-2xl border border-red-100 shadow-xl overflow-hidden"
      style={{ animation: "panelSlide 0.4s cubic-bezier(0.22,1,0.36,1) forwards" }}
      role="region"
      aria-label={item.title}
    >
      <div className="flex flex-col md:flex-row gap-0">
        {/* Accent image strip */}
        <div className="md:w-64 lg:w-80 flex-shrink-0">
          <img
            src={item.img}
            alt={item.img_alt}
            className="w-full h-48 md:h-full object-cover"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x300/fee2e2/991b1b?text=Achievement+${item.id}`;
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 sm:p-8">
          {/* Header */}
          <div className={`flex items-start justify-between gap-4 mb-5 ${isRtl ? "flex-row-reverse" : ""}`}>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-black tracking-widest uppercase mb-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {item.year} · {item.location}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1">{item.award_body}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 text-xs font-semibold transition-all"
              aria-label={close_label}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              <span className="hidden sm:inline">{close_label}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-red-200 via-yellow-200 to-transparent mb-5" />

          {/* Description */}
          <p
            className="text-sm sm:text-[15px] leading-relaxed text-gray-700"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic" }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN ACHIEVEMENTS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function Achievements() {
  const { lang } = useLanguage();
  const data = ACHIEVEMENTS_DATA[lang] || ACHIEVEMENTS_DATA["en"];
  const isRtl = lang === "ur";

  const [activeId, setActiveId] = useState(null);
  const titleRef = useRef(null);

  // Reset active card on language change
  useEffect(() => { setActiveId(null); }, [lang]);

  // Title fade-in on scroll
  useEffect(() => {
    if (!titleRef.current) return;
    titleRef.current.style.opacity = "0";
    titleRef.current.style.transform = "translateY(-20px)";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        titleRef.current.style.transition = "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)";
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, [lang]);

  const handleCardClick = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const activeItem = data.items.find((i) => i.id === activeId);

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="achievements-title"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative bg-white py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      {/* BG decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-50/50 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-yellow-50/40 blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Section Title ── */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-black tracking-[0.3em] text-red-500 uppercase mb-3">
            {data.section_label}
          </span>
          <h2
            id="achievements-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            itemProp="name"
          >
            {data.section_title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-500 leading-relaxed">
            {data.section_subtitle}
          </p>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-400" />
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-400" />
          </div>
          {/* Click hint */}
          <p className="mt-3 text-[11px] text-gray-400 italic">{data.click_hint}</p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {data.items.map((item, i) => (
            <AchievementCard
              key={`${lang}-${item.id}`}
              item={item}
              isActive={activeId === item.id}
              onClick={handleCardClick}
              onClose={() => setActiveId(null)}
              animDelay={i * 120}
              t_close={data.close_label}
              isRtl={isRtl}
            />
          ))}

          {/* Expanded panel — spans full row, inserted after grid */}
          {activeItem && (
            <ExpandedPanel
              key={`panel-${lang}-${activeItem.id}`}
              item={activeItem}
              onClose={() => setActiveId(null)}
              close_label={data.close_label}
              isRtl={isRtl}
            />
          )}
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes panelSlide {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── SEO structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Key Achievements – Shree Ganesh Finance",
            description: "Awards and recognitions received by Shri Ganesh Yadav, Founder & Chairman of Shree Ganesh Finance",
            itemListElement: ACHIEVEMENTS_DATA.en.items.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.title,
              description: item.short,
              item: {
                "@type": "Event",
                name: item.title,
                startDate: item.year,
                location: { "@type": "Place", name: item.location },
                organizer: { "@type": "Organization", name: item.award_body },
              },
            })),
          }),
        }}
      />
    </section>
  );
}