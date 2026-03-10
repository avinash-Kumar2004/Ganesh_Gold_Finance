import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../Common/Navbaar";

// ══════════════════════════════════════════════════════════════════
// MULTILINGUAL BLOG DATA
// ══════════════════════════════════════════════════════════════════
const BLOGS_DATA = {
  en: {
    badge: "Knowledge Centre",
    heading: "Our Blogs",
    subtext: "Expert insights on gold loans, investments & personal finance",
    talkToExpert: "Talk to Expert",
    quickSummary: "Quick Summary",
    blogs: [
      {
        id: 1, slug: "capital-gains-tax", image: "/Blog/img1.png",
        category: "Tax & Investment",
        title: "CAPITAL GAINS TAX: MEANING, TYPES & RATES",
        excerpt: "Capital gains tax is levied on profits earned from the sale of capital assets like shares, property, or gold.",
        readTime: "5 min read", date: "Mar 2026",
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
        id: 2, slug: "best-index-funds-2026", image: "/Blog/img2.png",
        category: "Mutual Funds",
        title: "BEST INDEX FUNDS TO INVEST IN INDIA IN 2026",
        excerpt: "Index funds track market benchmarks like Nifty 50 or Sensex with low expense ratios — ideal for long-term wealth creation.",
        readTime: "6 min read", date: "Mar 2026",
        content: {
          intro: "Index funds passively replicate a market index — like Nifty 50 or BSE Sensex — making them one of the most cost-efficient investment vehicles in India.",
          points: [
            "Nifty 50 Index Funds: Track India's top 50 large-cap companies. Expense ratios as low as 0.05–0.10%. Ideal for core portfolio allocation.",
            "Nifty Next 50 Funds: Exposure to companies ranked 51–100 by market cap. Higher growth potential.",
            "Nifty Midcap 150 Index Funds: For investors with higher risk appetite and 7+ year horizon.",
            "International Index Funds (S&P 500, Nasdaq 100): Geographical diversification under RBI's LRS framework.",
          ],
          cta: "Start your SIP in index funds through Shree Ganesh Finance — AMFI registered distributor.",
        },
      },
      {
        id: 3, slug: "gold-bees", image: "/Blog/img3.png",
        category: "Gold Investment",
        title: "UNDERSTANDING GOLD BEES: HOW IT WORKS, NAV & RETURNS",
        excerpt: "Gold BeES is India's first Gold ETF tracking domestic gold prices — trade it on NSE like a stock, no physical gold needed.",
        readTime: "4 min read", date: "Feb 2026",
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
        id: 4, slug: "multi-cap-vs-flexi-cap", image: "/Blog/img4.png",
        category: "Mutual Funds",
        title: "MULTI CAP AND FLEXI CAP MUTUAL FUNDS: HOW ARE THEY DIFFERENT?",
        excerpt: "Both invest across large, mid, and small caps — but SEBI regulations make them fundamentally different.",
        readTime: "5 min read", date: "Feb 2026",
        content: {
          intro: "SEBI mandates Multi Cap funds to maintain at least 25% each in large, mid, and small-cap stocks. Flexi Cap funds have no such restriction.",
          points: [
            "Multi Cap: Mandated 25-25-25 allocation means forced exposure to mid and small caps even in bear markets.",
            "Flexi Cap: Fund manager can shift 100% to large-caps during downturns or 100% to mid/small-caps in bull markets.",
            "For first-time investors: Flexi Cap is generally preferred. Multi Cap suits investors wanting guaranteed small/mid-cap exposure.",
            "Taxation same for both: LTCG >₹1.25L at 12.5%; STCG at 20%.",
          ],
          cta: "Our advisors can help you choose the right fund category based on your risk profile.",
        },
      },
      {
        id: 5, slug: "online-vs-offline-personal-loan", image: "/Blog/img5.png",
        category: "Personal Loan",
        title: "ONLINE PERSONAL LOAN VS. OFFLINE PERSONAL LOAN — WHICH IS BETTER?",
        excerpt: "Online loans offer instant approval in minutes. Offline loans offer personal guidance and better rate negotiation.",
        readTime: "4 min read", date: "Feb 2026",
        content: {
          intro: "Digital lending has transformed personal loans in India. Online NBFCs can disburse in under 30 minutes — but offline channels still hold advantages for larger amounts.",
          points: [
            "Online: Instant eligibility check, Video KYC, e-NACH for EMI. Faster but sometimes higher rates for new-to-credit borrowers.",
            "Offline: Relationship manager can negotiate better rates. Better for self-employed with complex income documentation.",
            "RBI's Key Fact Statement (KFS) mandate (2024) requires all lenders to disclose Annual Percentage Rate upfront.",
            "Shree Ganesh Finance offers both channels at equivalent interest rates — walk in or apply digitally.",
          ],
          cta: "Apply for a personal loan online or visit your nearest Shree Ganesh Finance branch.",
        },
      },
      {
        id: 6, slug: "digital-wallet", image: "/Blog/img6.png",
        category: "Digital Finance",
        title: "WHAT IS A DIGITAL WALLET: MEANING, TYPES, EXAMPLES & BENEFITS",
        excerpt: "Digital wallets store payment info electronically for cashless transactions via UPI, NFC, or QR codes.",
        readTime: "4 min read", date: "Jan 2026",
        content: {
          intro: "A digital wallet stores payment credentials, bank details, and transaction history, enabling electronic payments without physical cash or cards.",
          points: [
            "Closed Wallets: Amazon Pay, Ola Money — usable only on their own platform.",
            "Semi-Closed Wallets: RBI-regulated (Paytm, PhonePe pre-UPI). Multiple merchants but no bank withdrawal without KYC.",
            "Open Wallets: Bank-issued (HDFC PayZapp). Full functionality — purchase, transfer, ATM withdrawal with full KYC.",
            "India processed 15+ billion UPI transactions/month in 2025 — the world's largest real-time payments ecosystem.",
          ],
          cta: "Use our AePS and UPI-based money transfer services at any Shree Ganesh Finance branch.",
        },
      },
      {
        id: 7, slug: "what-is-refinancing", image: "/Blog/img7.png",
        category: "Home Loan",
        title: "WHAT IS REFINANCING: MEANING, TYPES, BENEFITS & EXAMPLES",
        excerpt: "Refinancing replaces your existing loan with a new one at a lower rate. Balance transfer is the most common form in India.",
        readTime: "5 min read", date: "Jan 2026",
        content: {
          intro: "Loan refinancing means paying off an existing loan by taking a new one — often from a different lender — at a lower interest rate or more favorable terms.",
          points: [
            "Rate-and-Term Refinancing: Replace existing loan at a lower rate. Even 0.5% reduction on ₹50L home loan saves ₹3–5L over tenure.",
            "Cash-Out Refinancing: Borrow more than outstanding balance, receive difference as cash. Useful for renovation or business expansion.",
            "Balance transfer to Shree Ganesh Finance includes a top-up loan option — no re-processing of property documents required.",
            "RBI mandates zero prepayment penalty on floating-rate home loans.",
          ],
          cta: "Calculate your savings with our balance transfer calculator — speak with our home loan team.",
        },
      },
      {
        id: 8, slug: "debt-trap", image: "/Blog/img8.png",
        category: "Financial Wellness",
        title: "WHAT IS A DEBT TRAP? MEANING, CAUSES & HOW TO AVOID IT",
        excerpt: "A debt trap is when you borrow to repay existing loans, creating a vicious cycle. Learn to recognise the warning signs.",
        readTime: "5 min read", date: "Jan 2026",
        content: {
          intro: "A debt trap occurs when a borrower cannot repay principal and interest — and is forced to borrow more just to service existing EMIs.",
          points: [
            "Warning signs: EMIs exceeding 50% of take-home pay; using credit cards for basic necessities; borrowing from multiple lenders.",
            "Common causes: High-interest personal loans or credit cards (24–36% p.a.); income disruption; lifestyle inflation.",
            "Prevention: Maintain 6-month emergency fund. Avoid credit card revolving credit. Never borrow beyond your FOIR limit.",
            "Escape: Debt consolidation — replace multiple high-rate loans with a single lower-rate gold loan at 9.99% p.a.",
          ],
          cta: "Use a gold loan at 9.99% p.a. to consolidate high-cost credit card or personal loan debt.",
        },
      },
      {
        id: 9, slug: "gold-price-forecast-2026", image: "/Blog/img9.png",
        category: "Gold Market",
        title: "GOLD PRICE FORECAST 2026: WILL GOLD PRICES RISE OR FALL?",
        excerpt: "Gold touched ₹85,000+ per 10g in 2025. Geopolitical tensions and central bank buying will determine if the bull run continues.",
        readTime: "6 min read", date: "Mar 2026",
        content: {
          intro: "Gold has been in a structural bull market since 2020, driven by central bank diversification away from USD, geopolitical uncertainty, and record ETF inflows.",
          points: [
            "Bullish factors: Central banks (China, India, Russia) accumulating gold reserves. Fed rate cuts in 2025 weakened USD.",
            "Bearish risks: USD strengthening, geopolitical de-escalation, or sharp rise in real US interest rates could pressure gold.",
            "For gold loan borrowers: Higher gold prices = higher loan eligibility at same LTV — your ornaments unlock more liquidity.",
            "Indian demand remains inelastic — festivals, weddings, and investment buying continue regardless of price level.",
          ],
          cta: "Lock in today's gold valuation — apply for a gold loan now before prices fluctuate.",
        },
      },
    ],
  },

  // ─── HINDI ───────────────────────────────────────────────────────
  hi: {
    badge: "ज्ञान केंद्र",
    heading: "हमारे ब्लॉग",
    subtext: "गोल्ड लोन, निवेश और व्यक्तिगत वित्त पर विशेषज्ञ जानकारी",
    talkToExpert: "विशेषज्ञ से बात करें",
    quickSummary: "संक्षिप्त सारांश",
    blogs: [
      {
        id: 1, slug: "capital-gains-tax", image: "/Blog/img1.png",
        category: "कर और निवेश",
        title: "पूंजी लाभ कर: अर्थ, प्रकार और दरें",
        excerpt: "शेयर, संपत्ति या सोने जैसी पूंजीगत संपत्तियों की बिक्री से अर्जित लाभ पर पूंजी लाभ कर लगाया जाता है।",
        readTime: "5 मिनट पढ़ें", date: "मार्च 2026",
        content: {
          intro: "पूंजी लाभ कर (CGT) वह कर है जो तब लगता है जब आप कोई पूंजीगत संपत्ति — शेयर, म्युचुअल फंड, रियल एस्टेट, सोना या बॉन्ड — खरीद मूल्य से अधिक कीमत पर बेचते हैं।",
          points: [
            "अल्पकालिक पूंजी लाभ (STCG): 12–36 महीने से कम रखी गई संपत्तियां। इक्विटी पर 20% कर।",
            "दीर्घकालिक पूंजी लाभ (LTCG): ₹1.25 लाख से अधिक इक्विटी LTCG पर बिना इंडेक्सेशन के 12.5%।",
            "धारा 54, 54EC, 54F के तहत छूट — निर्धारित संपत्तियों में पुनर्निवेश से कर देयता कम होती है।",
            "म्युचुअल फंड निवेशकों को खरीद NAV सावधानी से ट्रैक करनी चाहिए।",
          ],
          cta: "अपनी पूंजी लाभ कर देयता को अनुकूलित करने के लिए हमारे वित्तीय सलाहकार से परामर्श करें।",
        },
      },
      {
        id: 2, slug: "best-index-funds-2026", image: "/Blog/img2.png",
        category: "म्युचुअल फंड",
        title: "2026 में भारत में निवेश के लिए सर्वश्रेष्ठ इंडेक्स फंड",
        excerpt: "इंडेक्स फंड कम खर्च अनुपात के साथ Nifty 50 या Sensex जैसे बाजार बेंचमार्क को ट्रैक करते हैं।",
        readTime: "6 मिनट पढ़ें", date: "मार्च 2026",
        content: {
          intro: "इंडेक्स फंड Nifty 50 या BSE Sensex जैसे बाजार सूचकांक को निष्क्रिय रूप से दोहराते हैं — ये भारत में सबसे कम लागत वाले निवेश विकल्पों में से एक हैं।",
          points: [
            "Nifty 50 इंडेक्स फंड: भारत की शीर्ष 50 लार्ज-कैप कंपनियों को ट्रैक करते हैं। व्यय अनुपात 0.05–0.10% तक कम।",
            "Nifty Next 50 फंड: बाजार पूंजीकरण के अनुसार 51–100 रैंक की कंपनियों में निवेश।",
            "Nifty Midcap 150 इंडेक्स फंड: उच्च जोखिम क्षमता और 7+ वर्ष के निवेश क्षितिज वाले निवेशकों के लिए।",
            "अंतर्राष्ट्रीय इंडेक्स फंड (S&P 500, Nasdaq 100): RBI के LRS ढांचे के तहत भौगोलिक विविधीकरण।",
          ],
          cta: "श्री गणेश फाइनेंस के माध्यम से इंडेक्स फंड में SIP शुरू करें — AMFI पंजीकृत वितरक।",
        },
      },
      {
        id: 3, slug: "gold-bees", image: "/Blog/img3.png",
        category: "सोना निवेश",
        title: "गोल्ड BeES को समझें: यह कैसे काम करता है, NAV और रिटर्न",
        excerpt: "Gold BeES भारत का पहला गोल्ड ETF है जो घरेलू सोने की कीमतों को ट्रैक करता है — NSE पर शेयर की तरह ट्रेड करें।",
        readTime: "4 मिनट पढ़ें", date: "फरवरी 2026",
        content: {
          intro: "Gold BeES एक ETF है जो 99.5% शुद्धता के 1 ग्राम भौतिक सोने का प्रतिनिधित्व करता है। NSE पर सूचीबद्ध, इसे बाजार समय के दौरान खरीदा/बेचा जा सकता है।",
          points: [
            "1 यूनिट ≈ 1 ग्राम सोना जो कस्टोडियन बैंक के पास सुरक्षित है। NAV वास्तविक समय में घरेलू सोने की कीमतों को ट्रैक करता है।",
            "भौतिक सोने के गहनों के विपरीत कोई मेकिंग चार्ज, भंडारण जोखिम या अशुद्धता की चिंता नहीं।",
            "दीर्घकालिक लाभ (3+ वर्ष) पर इंडेक्सेशन के साथ 20% कर।",
            "ऋण के लिए जमानत के रूप में गिरवी रखा जा सकता है। न्यूनतम 1 यूनिट (लगभग ₹650–700)।",
          ],
          cta: "स्मार्ट तरीके से सोने में निवेश करें — हमारे प्लेटफॉर्म पर Gold ETF विकल्पों के बारे में पूछें।",
        },
      },
      {
        id: 4, slug: "multi-cap-vs-flexi-cap", image: "/Blog/img4.png",
        category: "म्युचुअल फंड",
        title: "मल्टी कैप और फ्लेक्सी कैप म्युचुअल फंड: अंतर क्या है?",
        excerpt: "दोनों लार्ज, मिड और स्मॉल कैप में निवेश करते हैं — लेकिन SEBI नियम उन्हें मौलिक रूप से अलग बनाते हैं।",
        readTime: "5 मिनट पढ़ें", date: "फरवरी 2026",
        content: {
          intro: "SEBI मल्टी कैप फंड को लार्ज, मिड और स्मॉल-कैप शेयरों में कम से कम 25% बनाए रखने का आदेश देता है। फ्लेक्सी कैप में ऐसी कोई बाध्यता नहीं।",
          points: [
            "मल्टी कैप: अनिवार्य 25-25-25 आवंटन का मतलब है मंदी में भी मिड और स्मॉल कैप में अनिवार्य एक्सपोजर।",
            "फ्लेक्सी कैप: फंड मैनेजर मंदी में 100% लार्ज-कैप या तेजी में 100% मिड/स्मॉल-कैप में जा सकता है।",
            "पहली बार निवेशकों के लिए: फ्लेक्सी कैप आमतौर पर बेहतर है। मल्टी कैप उन निवेशकों के लिए जो स्मॉल/मिड-कैप एक्सपोजर चाहते हैं।",
            "दोनों पर समान कराधान: LTCG >₹1.25L पर 12.5%; STCG पर 20%।",
          ],
          cta: "हमारे सलाहकार आपके जोखिम प्रोफाइल के अनुसार सही फंड श्रेणी चुनने में मदद कर सकते हैं।",
        },
      },
      {
        id: 5, slug: "online-vs-offline-personal-loan", image: "/Blog/img5.png",
        category: "पर्सनल लोन",
        title: "ऑनलाइन पर्सनल लोन बनाम ऑफलाइन पर्सनल लोन — कौन सा बेहतर?",
        excerpt: "ऑनलाइन लोन मिनटों में तत्काल स्वीकृति देते हैं। ऑफलाइन लोन व्यक्तिगत मार्गदर्शन और बेहतर दर वार्ता प्रदान करते हैं।",
        readTime: "4 मिनट पढ़ें", date: "फरवरी 2026",
        content: {
          intro: "डिजिटल उधार ने भारत में पर्सनल लोन को बदल दिया है। ऑनलाइन NBFC 30 मिनट से कम में वितरित कर सकते हैं।",
          points: [
            "ऑनलाइन: तत्काल पात्रता जांच, वीडियो KYC, EMI के लिए e-NACH। तेज लेकिन कभी-कभी नए-क्रेडिट उधारकर्ताओं के लिए अधिक दरें।",
            "ऑफलाइन: रिलेशनशिप मैनेजर बेहतर दरों पर बातचीत कर सकता है। जटिल आय दस्तावेज वाले स्व-रोजगार के लिए बेहतर।",
            "RBI के KFS आदेश (2024) में सभी ऋणदाताओं को वार्षिक प्रतिशत दर पहले से बताना अनिवार्य है।",
            "श्री गणेश फाइनेंस दोनों चैनल समान ब्याज दरों पर प्रदान करता है।",
          ],
          cta: "ऑनलाइन पर्सनल लोन के लिए आवेदन करें या निकटतम श्री गणेश फाइनेंस शाखा पर जाएं।",
        },
      },
      {
        id: 6, slug: "digital-wallet", image: "/Blog/img6.png",
        category: "डिजिटल फाइनेंस",
        title: "डिजिटल वॉलेट क्या है: अर्थ, प्रकार, उदाहरण और लाभ",
        excerpt: "डिजिटल वॉलेट UPI, NFC या QR कोड के माध्यम से कैशलेस लेनदेन के लिए भुगतान जानकारी इलेक्ट्रॉनिक रूप से संग्रहीत करते हैं।",
        readTime: "4 मिनट पढ़ें", date: "जनवरी 2026",
        content: {
          intro: "डिजिटल वॉलेट भुगतान क्रेडेंशियल, बैंक विवरण और लेनदेन इतिहास संग्रहीत करता है, जिससे भौतिक नकदी या कार्ड के बिना इलेक्ट्रॉनिक भुगतान संभव होता है।",
          points: [
            "क्लोज्ड वॉलेट: Amazon Pay, Ola Money — केवल अपने प्लेटफॉर्म पर उपयोग योग्य।",
            "सेमी-क्लोज्ड वॉलेट: RBI-विनियमित (Paytm, PhonePe)। कई व्यापारी लेकिन KYC के बिना बैंक निकासी नहीं।",
            "ओपन वॉलेट: बैंक-जारी (HDFC PayZapp)। पूरी कार्यक्षमता — खरीदारी, ट्रांसफर, ATM निकासी।",
            "भारत ने 2025 में 15+ अरब UPI लेनदेन/माह प्रसंस्कृत किए — दुनिया का सबसे बड़ा रियल-टाइम भुगतान इकोसिस्टम।",
          ],
          cta: "किसी भी श्री गणेश फाइनेंस शाखा पर हमारी AePS और UPI-आधारित मनी ट्रांसफर सेवाओं का उपयोग करें।",
        },
      },
      {
        id: 7, slug: "what-is-refinancing", image: "/Blog/img7.png",
        category: "होम लोन",
        title: "रिफाइनेंसिंग क्या है: अर्थ, प्रकार, लाभ और उदाहरण",
        excerpt: "रिफाइनेंसिंग आपके मौजूदा लोन को कम दर पर नए लोन से बदलती है। बैलेंस ट्रांसफर भारत में रिफाइनेंसिंग का सबसे सामान्य रूप है।",
        readTime: "5 मिनट पढ़ें", date: "जनवरी 2026",
        content: {
          intro: "लोन रिफाइनेंसिंग का अर्थ है मौजूदा लोन को नए लोन से चुकाना — अक्सर किसी अन्य ऋणदाता से — कम ब्याज दर या बेहतर पुनर्भुगतान शर्तों पर।",
          points: [
            "रेट-एंड-टर्म रिफाइनेंसिंग: कम दर पर मौजूदा लोन बदलें। ₹50L होम लोन पर 0.5% की कमी से ₹3–5L की बचत।",
            "कैश-आउट रिफाइनेंसिंग: बकाया राशि से अधिक उधार लें, अंतर नकद में पाएं।",
            "श्री गणेश फाइनेंस में बैलेंस ट्रांसफर में टॉप-अप लोन विकल्प शामिल है।",
            "RBI फ्लोटिंग-रेट होम लोन पर शून्य प्रीपेमेंट पेनाल्टी अनिवार्य करता है।",
          ],
          cta: "हमारे बैलेंस ट्रांसफर कैलकुलेटर से बचत की गणना करें — हमारी होम लोन टीम से बात करें।",
        },
      },
      {
        id: 8, slug: "debt-trap", image: "/Blog/img8.png",
        category: "वित्तीय स्वास्थ्य",
        title: "कर्ज का जाल क्या है? अर्थ, कारण और इससे कैसे बचें",
        excerpt: "कर्ज का जाल तब होता है जब आप मौजूदा ऋण चुकाने के लिए उधार लेते हैं, जिससे एक दुष्चक्र बनता है।",
        readTime: "5 मिनट पढ़ें", date: "जनवरी 2026",
        content: {
          intro: "कर्ज का जाल तब होता है जब उधारकर्ता मूल और ब्याज चुकाने में असमर्थ होता है और मौजूदा EMI सर्विस करने के लिए अधिक उधार लेने पर मजबूर होता है।",
          points: [
            "चेतावनी के संकेत: EMI टेक-होम पे का 50% से अधिक; बुनियादी जरूरतों के लिए क्रेडिट कार्ड का उपयोग।",
            "सामान्य कारण: उच्च-ब्याज पर्सनल लोन (24–36% p.a.); आय में व्यवधान; जीवन शैली मुद्रास्फीति।",
            "रोकथाम: 6 महीने का इमरजेंसी फंड रखें। क्रेडिट कार्ड रिवॉल्विंग क्रेडिट से बचें।",
            "बचाव: ऋण समेकन — कई उच्च-दर लोन को 9.99% p.a. पर एकल गोल्ड लोन से बदलें।",
          ],
          cta: "उच्च-लागत क्रेडिट कार्ड ऋण को समेकित करने के लिए 9.99% p.a. पर गोल्ड लोन का उपयोग करें।",
        },
      },
      {
        id: 9, slug: "gold-price-forecast-2026", image: "/Blog/img9.png",
        category: "सोने का बाजार",
        title: "2026 में सोने की कीमत का पूर्वानुमान: क्या सोने की कीमतें बढ़ेंगी या घटेंगी?",
        excerpt: "2025 में सोना ₹85,000+ प्रति 10 ग्राम तक पहुंचा। भू-राजनीतिक तनाव और केंद्रीय बैंक की खरीद निर्धारित करेगी।",
        readTime: "6 मिनट पढ़ें", date: "मार्च 2026",
        content: {
          intro: "सोना 2020 से संरचनात्मक बुल मार्केट में है, जो USD से दूर केंद्रीय बैंक विविधीकरण, भू-राजनीतिक अनिश्चितता और रिकॉर्ड ETF प्रवाह से प्रेरित है।",
          points: [
            "तेजी के कारक: केंद्रीय बैंक (चीन, भारत, रूस) सोने के भंडार जमा कर रहे हैं।",
            "मंदी के जोखिम: USD मजबूती, भू-राजनीतिक डी-एस्केलेशन सोने पर दबाव डाल सकते हैं।",
            "गोल्ड लोन उधारकर्ताओं के लिए: ऊंची सोने की कीमतें = समान LTV पर अधिक लोन पात्रता।",
            "भारतीय मांग बेलोचदार रहती है — त्योहार, शादियां और निवेश खरीद जारी रहती है।",
          ],
          cta: "आज की सोने की वैल्यूएशन लॉक करें — कीमतें उतार-चढ़ाव से पहले गोल्ड लोन के लिए आवेदन करें।",
        },
      },
    ],
  },

  // ─── MARATHI ─────────────────────────────────────────────────────
  mr: {
    badge: "ज्ञान केंद्र",
    heading: "आमचे ब्लॉग",
    subtext: "गोल्ड लोन, गुंतवणूक आणि वैयक्तिक वित्त यावर तज्ञांचे मार्गदर्शन",
    talkToExpert: "तज्ञाशी बोला",
    quickSummary: "थोडक्यात सारांश",
    blogs: [
      { id: 1, slug: "capital-gains-tax", image: "/Blog/img1.png", category: "कर आणि गुंतवणूक", title: "भांडवली नफा कर: अर्थ, प्रकार आणि दर", excerpt: "शेअर्स, मालमत्ता किंवा सोने यांसारख्या भांडवली मालमत्तेच्या विक्रीतून मिळालेल्या नफ्यावर भांडवली नफा कर आकारला जातो.", readTime: "5 मिनिटे", date: "मार्च 2026", content: { intro: "भांडवली नफा कर हा तो कर आहे जो भांडवली मालमत्ता — शेअर्स, म्युच्युअल फंड, रिअल इस्टेट, सोने — खरेदी किमतीपेक्षा जास्त किमतीला विकली जाते तेव्हा नफ्यावर आकारला जातो.", points: ["अल्पकालीन भांडवली नफा (STCG): 12–36 महिन्यांपेक्षा कमी कालावधीसाठी ठेवलेली मालमत्ता. इक्विटीवर 20% कर.", "दीर्घकालीन भांडवली नफा (LTCG): ₹1.25 लाखांवरील इक्विटी LTCG वर 12.5% कर.", "कलम 54, 54EC, 54F अंतर्गत सूट — निर्दिष्ट मालमत्तांमध्ये पुनर्गुंतवणूक करून कर दायित्व कमी करता येते.", "म्युच्युअल फंड गुंतवणूकदारांनी खरेदी NAV काळजीपूर्वक ट्रॅक केले पाहिजे."], cta: "आपल्या भांडवली नफा कर दायित्वासाठी आमच्या आर्थिक सल्लागाराशी संपर्क करा." } },
      { id: 2, slug: "best-index-funds-2026", image: "/Blog/img2.png", category: "म्युच्युअल फंड", title: "2026 मध्ये भारतात गुंतवणुकीसाठी सर्वोत्तम इंडेक्स फंड", excerpt: "इंडेक्स फंड कमी खर्च गुणोत्तरासह Nifty 50 किंवा Sensex सारख्या बाजार बेंचमार्क ट्रॅक करतात.", readTime: "6 मिनिटे", date: "मार्च 2026", content: { intro: "इंडेक्स फंड Nifty 50 किंवा BSE Sensex सारख्या बाजार निर्देशांकाची निष्क्रियपणे प्रतिकृती बनवतात — भारतातील सर्वात किफायतशीर गुंतवणूक साधनांपैकी एक.", points: ["Nifty 50 इंडेक्स फंड: भारतातील शीर्ष 50 लार्ज-कॅप कंपन्यांचे अनुसरण. खर्च गुणोत्तर 0.05–0.10% पर्यंत कमी.", "Nifty Next 50 फंड: बाजार भांडवलीकरणानुसार 51–100 क्रमांकाच्या कंपन्यांमध्ये गुंतवणूक.", "Nifty Midcap 150 इंडेक्स फंड: अधिक जोखीम क्षमता आणि 7+ वर्षांच्या क्षितिजाच्या गुंतवणूकदारांसाठी.", "आंतरराष्ट्रीय इंडेक्स फंड: RBI च्या LRS फ्रेमवर्क अंतर्गत भौगोलिक विविधीकरण."], cta: "श्री गणेश फायनान्सद्वारे इंडेक्स फंडमध्ये SIP सुरू करा — AMFI नोंदणीकृत वितरक." } },
      { id: 3, slug: "gold-bees", image: "/Blog/img3.png", category: "सोने गुंतवणूक", title: "Gold BeES समजून घेणे: हे कसे कार्य करते, NAV आणि परतावा", excerpt: "Gold BeES भारतातील पहिला गोल्ड ETF आहे जो घरगुती सोन्याच्या किमतींचे अनुसरण करतो.", readTime: "4 मिनिटे", date: "फेब्रुवारी 2026", content: { intro: "Gold BeES हे 99.5% शुद्धतेच्या 1 ग्रॅम भौतिक सोन्याचे प्रतिनिधित्व करणारे ETF आहे. NSE वर सूचीबद्ध.", points: ["1 युनिट ≈ 1 ग्रॅम सोने कस्टोडियन बँकेकडे साठवलेले. NAV रिअल-टाइममध्ये घरगुती सोन्याच्या किमती ट्रॅक करते.", "भौतिक सोन्याच्या दागिन्यांप्रमाणे कोणते मेकिंग चार्जेस, साठवणुकीचा धोका किंवा अशुद्धतेची चिंता नाही.", "दीर्घकालीन नफा (3+ वर्षे) इंडेक्सेशनसह 20% कर.", "कर्जासाठी तारण म्हणून गहाण ठेवता येते. किमान 1 युनिट (अंदाजे ₹650–700)."], cta: "स्मार्ट पद्धतीने सोन्यात गुंतवणूक करा — आमच्या प्लॅटफॉर्मवर Gold ETF पर्यायांबद्दल विचारा." } },
      { id: 4, slug: "multi-cap-vs-flexi-cap", image: "/Blog/img4.png", category: "म्युच्युअल फंड", title: "मल्टी कॅप आणि फ्लेक्सी कॅप म्युच्युअल फंड: फरक काय?", excerpt: "दोन्ही लार्ज, मिड आणि स्मॉल कॅपमध्ये गुंतवणूक करतात — परंतु SEBI नियम त्यांना मूलभूतपणे वेगळे बनवतात.", readTime: "5 मिनिटे", date: "फेब्रुवारी 2026", content: { intro: "SEBI मल्टी कॅप फंडांना लार्ज, मिड आणि स्मॉल-कॅप शेअर्समध्ये प्रत्येकी किमान 25% राखण्याचे आदेश देते.", points: ["मल्टी कॅप: अनिवार्य 25-25-25 वाटप म्हणजे अस्वल बाजारातही मिड आणि स्मॉल कॅपमध्ये जबरदस्तीचे एक्सपोजर.", "फ्लेक्सी कॅप: फंड व्यवस्थापक मंदीत 100% लार्ज-कॅपमध्ये किंवा तेजीत 100% मिड/स्मॉल-कॅपमध्ये जाऊ शकतो.", "पहिल्यांदा गुंतवणूक करणाऱ्यांसाठी: फ्लेक्सी कॅप साधारणपणे पसंत केले जाते.", "दोन्हींवर समान कर: LTCG >₹1.25L वर 12.5%; STCG वर 20%."], cta: "आमचे सल्लागार तुमच्या जोखीम प्रोफाइलवर आधारित योग्य फंड श्रेणी निवडण्यास मदत करू शकतात." } },
      { id: 5, slug: "online-vs-offline-personal-loan", image: "/Blog/img5.png", category: "वैयक्तिक कर्ज", title: "ऑनलाइन वैयक्तिक कर्ज वि. ऑफलाइन वैयक्तिक कर्ज — कोणते चांगले?", excerpt: "ऑनलाइन कर्ज मिनिटांत तत्काळ मंजुरी देतात. ऑफलाइन कर्ज वैयक्तिक मार्गदर्शन आणि चांगली दर वाटाघाट देतात.", readTime: "4 मिनिटे", date: "फेब्रुवारी 2026", content: { intro: "डिजिटल उधारणीने भारतात वैयक्तिक कर्जाचे रूपांतरण केले आहे. ऑनलाइन NBFC 30 मिनिटांपेक्षा कमी वेळात वितरित करू शकतात.", points: ["ऑनलाइन: तत्काळ पात्रता तपासणी, व्हिडिओ KYC, EMI साठी e-NACH.", "ऑफलाइन: रिलेशनशिप मॅनेजर चांगल्या दरांवर वाटाघाटी करू शकतो. जटिल उत्पन्न दस्तावेजांसाठी चांगले.", "RBI च्या KFS आदेशानुसार सर्व सावकारांना वार्षिक टक्केवारी दर आधीच सांगणे आवश्यक आहे.", "श्री गणेश फायनान्स दोन्ही चॅनेल समान व्याज दरांवर देते."], cta: "ऑनलाइन वैयक्तिक कर्जासाठी अर्ज करा किंवा जवळच्या श्री गणेश फायनान्स शाखेला भेट द्या." } },
      { id: 6, slug: "digital-wallet", image: "/Blog/img6.png", category: "डिजिटल वित्त", title: "डिजिटल वॉलेट म्हणजे काय: अर्थ, प्रकार, उदाहरणे आणि फायदे", excerpt: "डिजिटल वॉलेट UPI, NFC किंवा QR कोडद्वारे कॅशलेस व्यवहारांसाठी पेमेंट माहिती इलेक्ट्रॉनिक पद्धतीने साठवतात.", readTime: "4 मिनिटे", date: "जानेवारी 2026", content: { intro: "डिजिटल वॉलेट पेमेंट क्रेडेन्शियल्स, बँक तपशील आणि व्यवहार इतिहास साठवते, भौतिक रोख रकमेशिवाय इलेक्ट्रॉनिक पेमेंट सक्षम करते.", points: ["क्लोज्ड वॉलेट: Amazon Pay, Ola Money — केवळ स्वतःच्या प्लॅटफॉर्मवर वापरण्यायोग्य.", "सेमी-क्लोज्ड वॉलेट: RBI-नियंत्रित (Paytm, PhonePe). एकाधिक व्यापारी परंतु KYC शिवाय बँक काढणे नाही.", "ओपन वॉलेट: बँक-जारी (HDFC PayZapp). पूर्ण कार्यक्षमता — खरेदी, हस्तांतरण, ATM काढणे.", "भारताने 2025 मध्ये 15+ अब्ज UPI व्यवहार/महिना प्रक्रिया केले."], cta: "कोणत्याही श्री गणेश फायनान्स शाखेत आमच्या AePS आणि UPI-आधारित मनी ट्रान्सफर सेवा वापरा." } },
      { id: 7, slug: "what-is-refinancing", image: "/Blog/img7.png", category: "गृह कर्ज", title: "रिफायनान्सिंग म्हणजे काय: अर्थ, प्रकार, फायदे आणि उदाहरणे", excerpt: "रिफायनान्सिंग तुमचे विद्यमान कर्ज कमी दरावर नव्या कर्जाने बदलते.", readTime: "5 मिनिटे", date: "जानेवारी 2026", content: { intro: "कर्ज रिफायनान्सिंग म्हणजे विद्यमान कर्ज नव्या कर्जाने फेडणे — बहुधा वेगळ्या सावकाराकडून — कमी व्याज दराने.", points: ["रेट-अँड-टर्म रिफायनान्सिंग: कमी दराने विद्यमान कर्ज बदला. ₹50L होम लोनवर 0.5% कमी झाल्याने ₹3–5L बचत.", "कॅश-आउट रिफायनान्सिंग: थकबाकीपेक्षा अधिक कर्ज घ्या, फरक रोखीने मिळवा.", "श्री गणेश फायनान्समध्ये बॅलन्स ट्रान्सफरमध्ये टॉप-अप कर्ज पर्याय समाविष्ट आहे.", "RBI फ्लोटिंग-रेट होम लोनवर शून्य प्रीपेमेंट दंड अनिवार्य करते."], cta: "आमच्या बॅलन्स ट्रान्सफर कॅल्क्युलेटरने बचत मोजा — आमच्या होम लोन टीमशी बोला." } },
      { id: 8, slug: "debt-trap", image: "/Blog/img8.png", category: "आर्थिक आरोग्य", title: "कर्जाचा सापळा म्हणजे काय? अर्थ, कारणे आणि टाळण्याचे मार्ग", excerpt: "कर्जाचा सापळा म्हणजे जेव्हा तुम्ही विद्यमान कर्ज फेडण्यासाठी कर्ज घेतो, ज्यामुळे दुष्टचक्र निर्माण होते.", readTime: "5 मिनिटे", date: "जानेवारी 2026", content: { intro: "कर्जाचा सापळा तेव्हा होतो जेव्हा कर्जदार मूळ आणि व्याज फेडण्यास असमर्थ असतो आणि विद्यमान EMI सर्व्हिस करण्यासाठी अधिक कर्ज घेण्यास भाग पाडले जाते.", points: ["इशारा चिन्हे: EMI टेक-होम पेच्या 50% पेक्षा जास्त; मूलभूत गरजांसाठी क्रेडिट कार्ड वापर.", "सामान्य कारणे: उच्च-व्याज वैयक्तिक कर्ज (24–36% p.a.); उत्पन्नात व्यत्यय.", "प्रतिबंध: 6 महिन्यांचा आपत्कालीन निधी राखा. क्रेडिट कार्ड रिव्हॉल्व्हिंग क्रेडिट टाळा.", "निसटण्याचा मार्ग: कर्ज एकत्रीकरण — एकाधिक उच्च-दर कर्जांना 9.99% p.a. वर एकाच गोल्ड लोनने बदला."], cta: "उच्च-खर्च क्रेडिट कार्ड कर्ज एकत्र करण्यासाठी 9.99% p.a. वर गोल्ड लोन वापरा." } },
      { id: 9, slug: "gold-price-forecast-2026", image: "/Blog/img9.png", category: "सोने बाजार", title: "2026 मध्ये सोन्याच्या किमतीचा अंदाज: सोन्याच्या किमती वाढतील की घसरतील?", excerpt: "2025 मध्ये सोने ₹85,000+ प्रति 10 ग्रॅमला स्पर्श केले.", readTime: "6 मिनिटे", date: "मार्च 2026", content: { intro: "2020 पासून सोने संरचनात्मक बुल मार्केटमध्ये आहे, USD पासून दूर केंद्रीय बँकेचे विविधीकरण आणि भू-राजनीतिक अनिश्चिततेने चालित.", points: ["तेजीचे घटक: केंद्रीय बँका (चीन, भारत, रशिया) सोन्याचे साठे जमा करत आहेत.", "मंदीचे जोखीम: USD बळकट होणे, भू-राजनीतिक डी-एस्केलेशन सोन्यावर दबाव आणू शकते.", "गोल्ड लोन कर्जदारांसाठी: जास्त सोन्याच्या किमती = समान LTV वर जास्त कर्ज पात्रता.", "भारतीय मागणी अलवचिक राहते — सण, लग्न आणि गुंतवणूक खरेदी सुरूच राहते."], cta: "आजची सोन्याची मूल्यांकन लॉक करा — किमती बदलण्यापूर्वी गोल्ड लोनसाठी अर्ज करा." } },
    ],
  },

  // ─── GUJARATI ────────────────────────────────────────────────────
  gu: {
    badge: "જ્ઞાન કેન્દ્ર", heading: "અમારા બ્લૉગ",
    subtext: "ગોલ્ડ લોન, રોકાણ અને વ્યક્તિગત નાણાં પર નિષ્ણાત સૂઝ",
    talkToExpert: "નિષ્ણાત સાથે વાત કરો", quickSummary: "ટૂંકો સારાંશ",
    blogs: [
      { id: 1, slug: "capital-gains-tax", image: "/Blog/img1.png", category: "કર અને રોકાણ", title: "મૂડી લાભ કર: અર્થ, પ્રકાર અને દર", excerpt: "શેર, મિલકત અથવા સોના જેવી મૂડી સંપત્તિઓના વેચાણથી કમાયેલા નફા પર મૂડી લાભ કર લાદવામાં આવે છે.", readTime: "5 મિ. વાંચો", date: "માર્ચ 2026", content: { intro: "મૂડી લાભ કર (CGT) એ નફા પર લાદવામાં આવેલ કર છે જ્યારે તમે મૂડી સંપત્તિ — શેર, મ્યુચ્યુઅલ ફંડ, રિઅલ એસ્ટેટ, સોનું — ચૂકવેલ ભાવ કરતાં વધુ ભાવે વેચો.", points: ["અલ્પ-ગાળાના મૂડી લાભ (STCG): 12–36 મહિનાથી ઓછા સમય માટે રાખેલ સંપત્તિ. ઇક્વિટી પર 20% કર.", "લાંબા ગાળાના મૂડી લાભ (LTCG): ₹1.25 લાખ ઉપરના ઇક્વિટી LTCG પર 12.5% કર.", "કલમ 54, 54EC, 54F હેઠળ છૂટ — નિર્ધારિત સંપત્તિઓમાં ફરીથી રોકાણ.", "મ્યુચ્યુઅલ ફંડ રોકાણકારોએ ખરીદ NAV કાળજીપૂર્વક ટ્રૅક કરવી જોઈએ."], cta: "તમારી મૂડી લાભ કર જવાબદારીને ઑપ્ટિમાઇઝ કરવા અમારા નાણાકીય સલાહકારની સલાહ લો." } },
      { id: 2, slug: "best-index-funds-2026", image: "/Blog/img2.png", category: "મ્યુચ્યુઅલ ફંડ", title: "2026 માં ભારતમાં રોકાણ માટે શ્રેષ્ઠ ઇન્ડેક્સ ફંડ", excerpt: "ઇન્ડેક્સ ફંડ ઓછા ખર્ચ ગુણોત્તર સાથે Nifty 50 અથવા Sensex ટ્રૅક કરે છે.", readTime: "6 મિ. વાંચો", date: "માર્ચ 2026", content: { intro: "ઇન્ડેક્સ ફંડ Nifty 50 અથવા BSE Sensex જેવા ઇન્ડેક્સ નિષ્ક્રિય રીતે રિ-ક્રિએટ કરે છે — ભારતમાં સૌથી સસ્તી રોકાણ ઇન્સ્ટ્ર્યુ.", points: ["Nifty 50 ઇન્ડેક્સ ફંડ: ભારતની ટોચની 50 લાર્જ-કૅપ કંપનીઓ.", "Nifty Next 50 ફંડ: 51–100 ક્રમની કંપનીઓ.", "Nifty Midcap 150 ઇન્ડેક્સ ફંડ: ઊંચી જોખમ ક્ષ. અને 7+ વર્ષ ક્ષ. ઊ. માટે.", "આંતરરાષ્ટ્રીય ઇન્ડેક્સ ફંડ: RBI LRS ફ્." ], cta: "શ્રી ગણેશ ફ. દ્વારા ઇ. ફ. SIP — AMFI ન. વ." } },
      { id: 3, slug: "gold-bees", image: "/Blog/img3.png", category: "સ્ .  ર.", title: "Gold BeES: તે કેવી રીતે કામ કરે, NAV અને વળ.", excerpt: "Gold BeES ભ. અ. ગ. ETF.", readTime: "4 મિ.", date: "ફ. 2026", content: { intro: "Gold BeES 99.5% S. 1g f. ETF. NSE.", points: ["1 unit ≈ 1g. NAV R-T.", "No making charges.", "LT 20% c. indexation.", "Pledge for loan. Min 1 unit."], cta: "Gold ETF — ask us." } },
      { id: 4, slug: "multi-cap-vs-flexi-cap", image: "/Blog/img4.png", category: "મ. ફ.", title: "Multi Cap અને Flexi Cap: ફ. ક. છ.", excerpt: "SEBI ન. મ. ફ. ભ. ફ. ક.", readTime: "5 મિ.", date: "ફ. 2026", content: { intro: "SEBI M.C. 25-25-25. Flexi — no restriction.", points: ["Multi Cap: mandatory 25-25-25.", "Flexi Cap: full manager discretion.", "First-time: Flexi Cap preferred.", "LTCG 12.5%, STCG 20%."], cta: "Advisor help." } },
      { id: 5, slug: "online-vs-offline-personal-loan", image: "/Blog/img5.png", category: "વ. ક.", title: "Online vs Offline Personal Loan", excerpt: "Online: ઝ. approval. Offline: personal guidance.", readTime: "4 મિ.", date: "ફ. 2026", content: { intro: "Digital lending India. Online NBFC 30 min.", points: ["Online: instant, V-KYC.", "Offline: RM negotiate.", "RBI KFS 2024.", "SGF both channels equal rates."], cta: "Apply online or visit branch." } },
      { id: 6, slug: "digital-wallet", image: "/Blog/img6.png", category: "D. F.", title: "Digital Wallet: અ., પ., ઉ., ફ.", excerpt: "D.W. UPI NFC QR cashless.", readTime: "4 મિ.", date: "જ. 2026", content: { intro: "Digital wallet payment credentials.", points: ["Closed: Amazon Pay.", "Semi-Closed: Paytm.", "Open: HDFC PayZapp.", "15B UPI/month 2025."], cta: "AePS UPI SGF branch." } },
      { id: 7, slug: "what-is-refinancing", image: "/Blog/img7.png", category: "H. L.", title: "Refinancing: અ., પ., ફ., ઉ.", excerpt: "Refinancing replaces loan lower rate.", readTime: "5 મિ.", date: "જ. 2026", content: { intro: "Loan refinancing: pay off existing with new.", points: ["Rate-Term: 0.5% saves ₹3-5L.", "Cash-Out: borrow more.", "SGF top-up included.", "RBI: zero prepay penalty float."], cta: "Balance transfer calculator." } },
      { id: 8, slug: "debt-trap", image: "/Blog/img8.png", category: "F. W.", title: "Debt Trap: અ., ક., ટ.", excerpt: "Borrow to repay = vicious cycle.", readTime: "5 મિ.", date: "જ. 2026", content: { intro: "Debt trap: can't repay, borrow more.", points: ["Warning: EMI >50% take-home.", "Causes: high-interest loans.", "Prevention: 6-month fund.", "Escape: gold loan 9.99%."], cta: "Gold loan 9.99% consolidate." } },
      { id: 9, slug: "gold-price-forecast-2026", image: "/Blog/img9.png", category: "G. M.", title: "Gold Price 2026: Rise or Fall?", excerpt: "Gold ₹85,000+ 2025.", readTime: "6 મિ.", date: "મ. 2026", content: { intro: "Gold bull market 2020.", points: ["Bullish: central banks buying.", "Bearish: USD strength.", "Borrowers: higher price = more loan.", "India demand inelastic."], cta: "Apply gold loan today." } },
    ],
  },

  // ─── TELUGU ──────────────────────────────────────────────────────
  te: {
    badge: "జ్ఞాన కేంద్రం", heading: "మా బ్లాగులు",
    subtext: "గోల్డ్ లోన్లు, పెట్టుబడులు మరియు వ్యక్తిగత ఆర్థిక విషయాలపై నిపుణుల అంతర్దృష్టులు",
    talkToExpert: "నిపుణుడితో మాట్లాడండి", quickSummary: "సంక్షిప్త సారాంశం",
    blogs: [
      { id: 1, slug: "capital-gains-tax", image: "/Blog/img1.png", category: "పన్ను & పెట్టుబడి", title: "మూలధన లాభాల పన్ను: అర్థం, రకాలు & రేట్లు", excerpt: "షేర్లు, ఆస్తి లేదా బంగారం వంటి మూలధన ఆస్తుల అమ్మకం నుండి సంపాదించిన లాభాలపై మూలధన లాభాల పన్ను విధించబడుతుంది.", readTime: "5 నిమిషాలు", date: "మార్చి 2026", content: { intro: "మూలధన లాభాల పన్ను (CGT) అనేది మీరు మూలధన ఆస్తిని — షేర్లు, మ్యూచువల్ ఫండ్లు, రియల్ ఎస్టేట్, బంగారం — చెల్లించిన మొత్తం కంటే ఎక్కువ ధరకు విక్రయించినప్పుడు లాభంపై విధించే పన్ను.", points: ["స్వల్పకాలిక మూలధన లాభాలు (STCG): 12–36 నెలల కంటే తక్కువ కాలం ఉంచిన ఆస్తులు. ఈక్విటీపై 20% పన్ను.", "దీర్ఘకాలిక మూలధన లాభాలు (LTCG): ₹1.25 లక్షలకు మించిన ఈక్విటీ LTCG పై ఇండెక్సేషన్ లేకుండా 12.5%.", "సెక్షన్ 54, 54EC, 54F కింద మినహాయింపులు — నిర్దిష్ట ఆస్తులలో పునఃపెట్టుబడి ద్వారా పన్ను తగ్గించవచ్చు.", "మ్యూచువల్ ఫండ్ పెట్టుబడిదారులు కొనుగోలు NAVలను జాగ్రత్తగా ట్రాక్ చేయాలి."], cta: "మీ మూలధన లాభాల పన్ను బాధ్యతను అనుకూలించేందుకు మా ఆర్థిక సలహాదారుని సంప్రదించండి." } },
      { id: 2, slug: "best-index-funds-2026", image: "/Blog/img2.png", category: "మ్యూచువల్ ఫండ్లు", title: "2026లో భారతదేశంలో పెట్టుబడి పెట్టడానికి ఉత్తమ ఇండెక్స్ ఫండ్లు", excerpt: "ఇండెక్స్ ఫండ్లు తక్కువ వ్యయ నిష్పత్తులతో Nifty 50 లేదా Sensex వంటి మార్కెట్ బెంచ్‌మార్క్‌లను ట్రాక్ చేస్తాయి.", readTime: "6 నిమిషాలు", date: "మార్చి 2026", content: { intro: "ఇండెక్స్ ఫండ్లు Nifty 50 లేదా BSE Sensex వంటి మార్కెట్ ఇండెక్స్‌ను నిష్క్రియంగా రెప్లికేట్ చేస్తాయి — భారతదేశంలో అత్యంత తక్కువ ఖర్చుతో కూడిన పెట్టుబడి సాధనాలలో ఒకటి.", points: ["Nifty 50 ఇండెక్స్ ఫండ్లు: భారతదేశంలో టాప్ 50 లార్జ్-కాప్ కంపెనీలను ట్రాక్ చేస్తాయి. 0.05–0.10% వ్యయ నిష్పత్తి.", "Nifty Next 50 ఫండ్లు: మార్కెట్ క్యాప్ ద్వారా 51–100 స్థానంలో ఉన్న కంపెనీలకు ఎక్సపోజర్.", "Nifty Midcap 150 ఇండెక్స్ ఫండ్లు: అధిక రిస్క్ ఆప్టిట్యూడ్ మరియు 7+ సంవత్సరాల హోరిజాన్ ఉన్న పెట్టుబడిదారులకు.", "అంతర్జాతీయ ఇండెక్స్ ఫండ్లు: RBI LRS ఫ్రేమ్‌వర్క్ కింద భౌగోళిక వైవిధ్యం."], cta: "శ్రీ గణేష్ ఫైనాన్స్ ద్వారా ఇండెక్స్ ఫండ్లలో మీ SIP ప్రారంభించండి — AMFI నమోదిత పంపిణీదారు." } },
      { id: 3, slug: "gold-bees", image: "/Blog/img3.png", category: "బంగారు పెట్టుబడి", title: "Gold BeES అర్థం చేసుకోండి: ఇది ఎలా పని చేస్తుంది, NAV & రిటర్న్లు", excerpt: "Gold BeES భారతదేశంలో మొదటి గోల్డ్ ETF.", readTime: "4 నిమిషాలు", date: "ఫిబ్రవరి 2026", content: { intro: "Gold BeES 99.5% స్వచ్ఛత ఉన్న 1 గ్రాం భౌతిక బంగారాన్ని సూచించే ETF. NSE లో జాబితా చేయబడింది.", points: ["1 యూనిట్ ≈ 1 గ్రాం బంగారం. NAV రియల్-టైమ్‌లో ట్రాక్ చేస్తుంది.", "భౌతిక బంగారు ఆభరణాల వలె మేకింగ్ చార్జీలు లేవు.", "దీర్ఘకాలిక లాభాలు (3+ సంవత్సరాలు) ఇండెక్సేషన్‌తో 20% పన్ను.", "రుణాలకు జామీనుగా తాకట్టు పెట్టవచ్చు. కనిష్ట 1 యూనిట్."], cta: "స్మార్ట్‌గా బంగారంలో పెట్టుబడి పెట్టండి — మా ప్లాట్‌ఫారమ్‌లో Gold ETF గురించి అడగండి." } },
      { id: 4, slug: "multi-cap-vs-flexi-cap", image: "/Blog/img4.png", category: "మ్యూచువల్ ఫండ్లు", title: "Multi Cap మరియు Flexi Cap మ్యూచువల్ ఫండ్లు: తేడా ఏమిటి?", excerpt: "రెండూ లార్జ్, మిడ్ మరియు స్మాల్ కాప్‌లలో పెట్టుబడి పెడతాయి — కానీ SEBI నిబంధనలు వాటిని వేరు చేస్తాయి.", readTime: "5 నిమిషాలు", date: "ఫిబ్రవరి 2026", content: { intro: "SEBI మల్టీ కాప్ ఫండ్లను లార్జ్, మిడ్ మరియు స్మాల్-కాప్ స్టాక్‌లలో ప్రతి ఒక్కటి కనీసం 25% నిర్వహించాలని ఆదేశిస్తుంది.", points: ["Multi Cap: తప్పనిసరి 25-25-25 కేటాయింపు.", "Flexi Cap: ఫండ్ మేనేజర్ సంపూర్ణ వివేచన.", "మొదటిసారి పెట్టుబడిదారులకు: Flexi Cap సాధారణంగా ప్రాధాన్యం.", "రెండింటిపై సమాన పన్ను: LTCG 12.5%, STCG 20%."], cta: "మా సలహాదారులు మీ రిస్క్ ప్రొఫైల్‌కు తగిన ఫండ్ విభాగాన్ని ఎంచుకోవడంలో సహాయం చేస్తారు." } },
      { id: 5, slug: "online-vs-offline-personal-loan", image: "/Blog/img5.png", category: "వ్యక్తిగత రుణం", title: "ఆన్‌లైన్ వ్యక్తిగత రుణం vs ఆఫ్‌లైన్ వ్యక్తిగత రుణం — ఏది మెరుగు?", excerpt: "ఆన్‌లైన్ రుణాలు నిమిషాల్లో తక్షణ ఆమోదం అందిస్తాయి. ఆఫ్‌లైన్ రుణాలు వ్యక్తిగత మార్గదర్శకత్వం అందిస్తాయి.", readTime: "4 నిమిషాలు", date: "ఫిబ్రవరి 2026", content: { intro: "డిజిటల్ లెండింగ్ భారతదేశంలో వ్యక్తిగత రుణాలను మార్చింది. ఆన్‌లైన్ NBFCలు 30 నిమిషాల కంటే తక్కువ సమయంలో వితరించగలవు.", points: ["ఆన్‌లైన్: తక్షణ అర్హత తనిఖీ, వీడియో KYC.", "ఆఫ్‌లైన్: రిలేషన్‌షిప్ మేనేజర్ మెరుగైన రేట్లు చర్చించగలరు.", "RBI KFS ఆదేశం (2024): వార్షిక శాతం రేటు ముందుగా వెల్లడించాలి.", "శ్రీ గణేష్ ఫైనాన్స్ రెండు ఛానెల్‌లు సమాన వడ్డీ రేట్లతో అందిస్తుంది."], cta: "ఆన్‌లైన్‌లో వ్యక్తిగత రుణానికి దరఖాస్తు చేయండి లేదా సమీప శ్రీ గణేష్ ఫైనాన్స్ శాఖను సందర్శించండి." } },
      { id: 6, slug: "digital-wallet", image: "/Blog/img6.png", category: "డిజిటల్ ఫైనాన్స్", title: "డిజిటల్ వాలెట్ అంటే ఏమిటి: అర్థం, రకాలు, ఉదాహరణలు & ప్రయోజనాలు", excerpt: "డిజిటల్ వాలెట్లు UPI, NFC లేదా QR కోడ్‌ల ద్వారా నగదు రహిత లావాదేవీల కోసం చెల్లింపు సమాచారాన్ని నిల్వ చేస్తాయి.", readTime: "4 నిమిషాలు", date: "జనవరి 2026", content: { intro: "డిజిటల్ వాలెట్ చెల్లింపు ఆధారాలు, బ్యాంక్ వివరాలు మరియు లావాదేవీ చరిత్రను నిల్వ చేస్తుంది.", points: ["క్లోజ్డ్ వాలెట్లు: Amazon Pay, Ola Money — వాటి స్వంత ప్లాట్‌ఫారమ్‌లో మాత్రమే.", "సెమీ-క్లోజ్డ్ వాలెట్లు: RBI నియంత్రిత (Paytm, PhonePe).", "ఓపెన్ వాలెట్లు: బ్యాంక్ జారీ చేసిన (HDFC PayZapp). పూర్తి కార్యాచరణ.", "భారతదేశం 2025లో నెలకు 15+ బిలియన్ UPI లావాదేవీలు."], cta: "ఏదైనా శ్రీ గణేష్ ఫైనాన్స్ శాఖలో మా AePS మరియు UPI ఆధారిత మనీ ట్రాన్స్ఫర్ సేవలను ఉపయోగించండి." } },
      { id: 7, slug: "what-is-refinancing", image: "/Blog/img7.png", category: "హోమ్ లోన్", title: "రీఫైనాన్సింగ్ అంటే ఏమిటి: అర్థం, రకాలు, ప్రయోజనాలు & ఉదాహరణలు", excerpt: "రీఫైనాన్సింగ్ మీ ప్రస్తుత రుణాన్ని తక్కువ రేటుతో కొత్త రుణంతో భర్తీ చేస్తుంది.", readTime: "5 నిమిషాలు", date: "జనవరి 2026", content: { intro: "రుణ రీఫైనాన్సింగ్ అంటే ప్రస్తుత రుణాన్ని కొత్త రుణంతో — తరచుగా వేరే రుణదాత నుండి — తక్కువ వడ్డీ రేటుతో చెల్లించడం.", points: ["రేట్-అండ్-టర్మ్ రీఫైనాన్సింగ్: ₹50L హోమ్ లోన్‌పై 0.5% తగ్గింపు ₹3–5L ఆదా.", "క్యాష్-అవుట్ రీఫైనాన్సింగ్: బకాయి కంటే ఎక్కువ రుణం, వ్యత్యాసం నగదులో.", "శ్రీ గణేష్ ఫైనాన్స్ బ్యాలెన్స్ ట్రాన్స్ఫర్ టాప్-అప్ రుణ ఎంపికతో ఉంటుంది.", "RBI ఫ్లోటింగ్-రేట్ హోమ్ లోన్‌లపై జీరో ప్రీపేమెంట్ పెనాల్టీ నిర్బంధిస్తుంది."], cta: "మా బ్యాలెన్స్ ట్రాన్స్ఫర్ కాల్క్యులేటర్‌తో మీ ఆదాను లెక్కించండి." } },
      { id: 8, slug: "debt-trap", image: "/Blog/img8.png", category: "ఆర్థిక ఆరోగ్యం", title: "అప్పుల ఉచ్చు అంటే ఏమిటి? అర్థం, కారణాలు & దాన్ని నివారించడం ఎలా", excerpt: "అప్పుల ఉచ్చు అంటే మీరు ప్రస్తుత రుణాలను చెల్లించడానికి అప్పు తీసుకోవడం, ఒక దుష్టచక్రం సృష్టిస్తుంది.", readTime: "5 నిమిషాలు", date: "జనవరి 2026", content: { intro: "అప్పుల ఉచ్చు అప్పుదారు మూల మరియు వడ్డీ చెల్లించలేకపోయినప్పుడు సంభవిస్తుంది — మరియు ప్రస్తుత EMIలు సర్వీస్ చేయడానికి మరింత అప్పు తీసుకోవలసి వస్తుంది.", points: ["హెచ్చరిక సంకేతాలు: EMIలు టేక్-హోమ్ పే 50% మించడం; మూలభూత అవసరాలకు క్రెడిట్ కార్డులు.", "సాధారణ కారణాలు: అధిక-వడ్డీ వ్యక్తిగత రుణాలు (24–36% p.a.); ఆదాయ అంతరాయం.", "నివారణ: 6 నెలల అత్యవసర నిధి. క్రెడిట్ కార్డ్ రివాల్వింగ్ క్రెడిట్ నివారించండి.", "తప్పించుకోవడం: అప్పు ఏకీకరణ — బహుళ అధిక-రేటు రుణాలను 9.99% p.a. గోల్డ్ లోన్‌తో భర్తీ చేయండి."], cta: "అధిక-వ్యయ క్రెడిట్ కార్డ్ అప్పును ఏకీకరించడానికి 9.99% p.a. వద్ద గోల్డ్ లోన్ ఉపయోగించండి." } },
      { id: 9, slug: "gold-price-forecast-2026", image: "/Blog/img9.png", category: "బంగారు మార్కెట్", title: "2026లో బంగారు ధర అంచనా: బంగారు ధరలు పెరుగుతాయా లేదా పడిపోతాయా?", excerpt: "2025లో బంగారం 10 గ్రాముకు ₹85,000+ తాకింది.", readTime: "6 నిమిషాలు", date: "మార్చి 2026", content: { intro: "2020 నుండి బంగారం USD నుండి దూరంగా కేంద్ర బ్యాంక్ వైవిధ్యం, భూ-రాజకీయ అనిశ్చితి మరియు రికార్డ్ ETF ప్రవాహాల ద్వారా నడపబడిన స్ట్రక్చరల్ బుల్ మార్కెట్‌లో ఉంది.", points: ["తేజీ కారకాలు: కేంద్ర బ్యాంకులు (చైనా, భారతదేశం, రష్యా) బంగారు నిల్వలు సేకరిస్తున్నాయి.", "మందీ ప్రమాదాలు: USD బలపడటం, భూ-రాజకీయ తగ్గింపు బంగారంపై ఒత్తిడి తీసుకొనవచ్చు.", "గోల్డ్ లోన్ రుణగ్రహీతలకు: అధిక బంగారు ధరలు = అదే LTV వద్ద అధిక రుణ అర్హత.", "భారతీయ డిమాండ్ అస్థిరంగా ఉంటుంది — పండుగలు, వివాహాలు మరియు పెట్టుబడి కొనుగోళ్లు కొనసాగుతాయి."], cta: "నేటి బంగారు మదింపు లాక్ చేయండి — ధరలు హెచ్చుతగ్గులకు ముందు గోల్డ్ లోన్‌కు దరఖాస్తు చేయండి." } },
    ],
  },

  // ─── TAMIL ───────────────────────────────────────────────────────
  ta: {
    badge: "அறிவு மையம்", heading: "எங்கள் வலைப்பதிவுகள்",
    subtext: "கோல்டு லோன்கள், முதலீடுகள் மற்றும் தனிப்பட்ட நிதி பற்றிய நிபுணர் நுண்ணறிவுகள்",
    talkToExpert: "நிபுணரிடம் பேசுங்கள்", quickSummary: "சுருக்கமான சுருக்கம்",
    blogs: [
      { id: 1, slug: "capital-gains-tax", image: "/Blog/img1.png", category: "வரி & முதலீடு", title: "மூலதன ஆதாய வரி: அர்த்தம், வகைகள் & விகிதங்கள்", excerpt: "பங்குகள், சொத்து அல்லது தங்கம் போன்ற மூலதன சொத்துக்களின் விற்பனையிலிருந்து ஈட்டிய லாபங்களுக்கு மூலதன ஆதாய வரி விதிக்கப்படுகிறது.", readTime: "5 நிமிடங்கள்", date: "மார்ச் 2026", content: { intro: "மூலதன ஆதாய வரி (CGT) என்பது நீங்கள் மூலதன சொத்தை — பங்குகள், மியூச்சுவல் ஃபண்ட்கள், ரியல் எஸ்டேட், தங்கம் — நீங்கள் செலுத்தியதை விட அதிக விலைக்கு விற்கும்போது லாபத்தின் மீது விதிக்கப்படும் வரி.", points: ["குறுகிய கால மூலதன ஆதாயங்கள் (STCG): 12–36 மாதங்களுக்கும் குறைவாக வைத்திருந்த சொத்துக்கள். ஈக்விட்டிக்கு 20% வரி.", "நீண்ட கால மூலதன ஆதாயங்கள் (LTCG): ₹1.25 லட்சத்திற்கு மேல் ஈக்விட்டி LTCG க்கு இண்டெக்சேஷன் இல்லாமல் 12.5%.", "பிரிவு 54, 54EC, 54F இன் கீழ் விலக்குகள் — குறிப்பிட்ட சொத்துக்களில் மறு முதலீட்டின் மூலம் வரி பொறுப்பை குறைக்கலாம்.", "மியூச்சுவல் ஃபண்ட் முதலீட்டாளர்கள் கொள்முதல் NAVகளை கவனமாக கண்காணிக்க வேண்டும்."], cta: "உங்கள் மூலதன ஆதாய வரி பொறுப்பை உகந்ததாக்க எங்கள் நிதி ஆலோசகரை அணுகவும்." } },
      { id: 2, slug: "best-index-funds-2026", image: "/Blog/img2.png", category: "மியூச்சுவல் ஃபண்ட்கள்", title: "2026ல் இந்தியாவில் முதலீடு செய்வதற்கான சிறந்த இன்டெக்ஸ் ஃபண்ட்கள்", excerpt: "இன்டெக்ஸ் ஃபண்ட்கள் குறைந்த செலவு விகிதங்களுடன் Nifty 50 அல்லது Sensex போன்ற சந்தை மதிப்புமதிப்பீடுகளை கண்காணிக்கின்றன.", readTime: "6 நிமிடங்கள்", date: "மார்ச் 2026", content: { intro: "இன்டெக்ஸ் ஃபண்ட்கள் Nifty 50 அல்லது BSE Sensex போன்ற சந்தை குறியீட்டை செயலற்ற முறையில் பிரதிபலிக்கின்றன — இந்தியாவில் மிகவும் செலவு-திறனான முதலீட்டு கருவிகளில் ஒன்று.", points: ["Nifty 50 இன்டெக்ஸ் ஃபண்ட்கள்: இந்தியாவின் முதல் 50 லார்ஜ்-கேப் நிறுவனங்களை கண்காணிக்கின்றன.", "Nifty Next 50 ஃபண்ட்கள்: 51–100 இடத்தில் இருக்கும் நிறுவனங்களில் முதலீடு.", "Nifty Midcap 150 இன்டெக்ஸ் ஃபண்ட்கள்: அதிக ரிஸ்க் திறன் மற்றும் 7+ ஆண்டு கால அளவை உள்ளவர்களுக்கு.", "சர்வதேச இன்டெக்ஸ் ஃபண்ட்கள்: RBI LRS கட்டமைப்பின் கீழ் புவியியல் பல்வகைமை."], cta: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் மூலம் இன்டெக்ஸ் ஃபண்ட்களில் உங்கள் SIPஐ தொடங்குங்கள்." } },
      { id: 3, slug: "gold-bees", image: "/Blog/img3.png", category: "தங்க முதலீடு", title: "Gold BeES புரிந்துகொள்ளுங்கள்: இது எப்படி வேலை செய்கிறது, NAV & வருமானம்", excerpt: "Gold BeES இந்தியாவின் முதல் கோல்டு ETF.", readTime: "4 நிமிடங்கள்", date: "பிப்ரவரி 2026", content: { intro: "Gold BeES 99.5% தூய்மை கொண்ட 1 கிராம் உடல் தங்கத்தை பிரதிபலிக்கும் ETF. NSE இல் பட்டியலிடப்பட்டது.", points: ["1 யூனிட் ≈ 1 கிராம் தங்கம் பாதுகாவலர் வங்கியில் சேமிக்கப்பட்டது.", "மேக்கிங் சார்ஜ்கள் இல்லை, சேமிப்பு ஆபத்து இல்லை.", "நீண்ட கால ஆதாயங்கள் (3+ ஆண்டுகள்) இண்டெக்சேஷனுடன் 20% வரி.", "கடன்களுக்கு உறுதிமொழியாக அடமானம் வைக்கலாம்."], cta: "ஸ்மார்ட்டாக தங்கத்தில் முதலீடு செய்யுங்கள் — Gold ETF பற்றி எங்களிடம் கேளுங்கள்." } },
      { id: 4, slug: "multi-cap-vs-flexi-cap", image: "/Blog/img4.png", category: "மியூச்சுவல் ஃபண்ட்கள்", title: "Multi Cap மற்றும் Flexi Cap மியூச்சுவல் ஃபண்ட்கள்: எப்படி வேறுபட்டுள்ளன?", excerpt: "இரண்டும் லார்ஜ், மிட் மற்றும் ஸ்மால் கேப்களில் முதலீடு செய்கின்றன — ஆனால் SEBI விதிமுறைகள் அவற்றை வேறுபட்டதாக ஆக்குகின்றன.", readTime: "5 நிமிடங்கள்", date: "பிப்ரவரி 2026", content: { intro: "SEBI மல்டி கேப் ஃபண்ட்களை லார்ஜ், மிட் மற்றும் ஸ்மால்-கேப் பங்குகளில் ஒவ்வொன்றிலும் குறைந்தது 25% பராமரிக்க கட்டாயப்படுத்துகிறது.", points: ["Multi Cap: கட்டாய 25-25-25 ஒதுக்கீடு.", "Flexi Cap: நிதி மேலாளர் முழு விருப்பம்.", "முதல்முறை முதலீட்டாளர்களுக்கு: Flexi Cap பொதுவாக விரும்பப்படுகிறது.", "இரண்டிற்கும் ஒரே வரி: LTCG 12.5%, STCG 20%."], cta: "எங்கள் ஆலோசகர்கள் உங்கள் ரிஸ்க் புரோஃபைலின் படி சரியான ஃபண்ட் வகையை தேர்வு செய்ய உதவுவார்கள்." } },
      { id: 5, slug: "online-vs-offline-personal-loan", image: "/Blog/img5.png", category: "தனிப்பட்ட கடன்", title: "ஆன்லைன் தனிப்பட்ட கடன் vs ஆஃப்லைன் — எது சிறந்தது?", excerpt: "ஆன்லைன் கடன்கள் நிமிடங்களில் உடனடி ஒப்புதல் அளிக்கின்றன.", readTime: "4 நிமிடங்கள்", date: "பிப்ரவரி 2026", content: { intro: "டிஜிட்டல் கடன் கொடுத்தல் இந்தியாவில் தனிப்பட்ட கடன்களை மாற்றியது.", points: ["ஆன்லைன்: உடனடி தகுதி சோதனை, வீடியோ KYC.", "ஆஃப்லைன்: RM சிறந்த விகிதங்களை பேச்சுவார்த்தை செய்யலாம்.", "RBI KFS 2024: வருடாந்திர சதவீத விகிதம் முன்கூட்டியே வெளிப்படுத்தல்.", "SGF இரண்டு சேனல்களும் சம வட்டி விகிதங்களில்."], cta: "ஆன்லைனில் தனிப்பட்ட கடனுக்கு விண்ணப்பிக்கவும் அல்லது கிளையை சந்திக்கவும்." } },
      { id: 6, slug: "digital-wallet", image: "/Blog/img6.png", category: "டிஜிட்டல் நிதி", title: "டிஜிட்டல் வாலட் என்றால் என்ன: அர்த்தம், வகைகள், உதாரணங்கள் & நன்மைகள்", excerpt: "டிஜிட்டல் வாலட்கள் UPI, NFC அல்லது QR குறியீடுகள் மூலம் பணமில்லாத பரிவர்த்தனைகளுக்கு.", readTime: "4 நிமிடங்கள்", date: "ஜனவரி 2026", content: { intro: "டிஜிட்டல் வாலட் கட்டண சான்றுகள், வங்கி விவரங்கள் மற்றும் பரிவர்த்தனை வரலாற்றை சேமிக்கிறது.", points: ["மூடிய வாலட்கள்: Amazon Pay, Ola Money.", "அரை-மூடிய வாலட்கள்: Paytm, PhonePe.", "திறந்த வாலட்கள்: HDFC PayZapp. முழு செயல்பாடு.", "இந்தியா 2025ல் மாதத்திற்கு 15+ பில்லியன் UPI."], cta: "எந்த ஸ்ரீ கணேஷ் ஃபைனான்ஸ் கிளையிலும் AePS மற்றும் UPI மனி ட்ரான்ஸ்ஃபர்." } },
      { id: 7, slug: "what-is-refinancing", image: "/Blog/img7.png", category: "வீட்டு கடன்", title: "ரீஃபைனான்சிங் என்றால் என்ன: அர்த்தம், வகைகள், நன்மைகள்", excerpt: "ரீஃபைனான்சிங் உங்கள் தற்போதைய கடனை குறைந்த விகிதத்தில் புதியதால் மாற்றுகிறது.", readTime: "5 நிமிடங்கள்", date: "ஜனவரி 2026", content: { intro: "கடன் மறுநிதியளிப்பு என்பது ஒரு புதிய கடனை எடுத்து தற்போதைய கடனை அடைப்பது.", points: ["விகித-மற்றும்-கால மறுநிதியளிப்பு: ₹50L கடனில் 0.5% குறைப்பு ₹3–5L சேமிப்பு.", "கேஷ்-அவுட் மறுநிதியளிப்பு: நிலுவை தொகையை விட அதிகமாக கடன் வாங்குங்கள்.", "SGF இலேக்கு பாலன்ஸ் ட்ரான்ஸ்ஃபர் டாப்-அப் விருப்பத்துடன்.", "RBI ஃப்ளோட்டிங்-ரேட் கடன்களில் பூஜ்ய முன்கூட்டிய தண்டனை."], cta: "பாலன்ஸ் ட்ரான்ஸ்ஃபர் கால்குலேட்டர் — வீட்டு கடன் குழுவிடம் பேசுங்கள்." } },
      { id: 8, slug: "debt-trap", image: "/Blog/img8.png", category: "நிதி ஆரோக்கியம்", title: "கடன் பொறி என்றால் என்ன? அர்த்தம், காரணங்கள் & தவிர்ப்பது எப்படி", excerpt: "கடன் பொறி என்பது தற்போதைய கடன்களை அடைக்க கடன் வாங்குவது, ஒரு தீய சுழற்சியை உருவாக்குகிறது.", readTime: "5 நிமிடங்கள்", date: "ஜனவரி 2026", content: { intro: "கடன் பொறி அடிப்படை மற்றும் வட்டியை திரும்ப செலுத்த முடியாத போது ஏற்படுகிறது.", points: ["எச்சரிக்கை அறிகுறிகள்: EMI வருமானத்தில் 50% மேல்.", "பொதுவான காரணங்கள்: அதிக-வட்டி தனிப்பட்ட கடன்கள் (24–36% p.a.).", "தடுப்பு: 6 மாத அவசர நிதி. கிரெடிட் கார்டு ரிவால்விங் தவிர்க்கவும்.", "தப்பிக்கும் வழி: கடன் ஒருங்கிணைப்பு — 9.99% p.a. கோல்டு லோனுடன்."], cta: "அதிக செலவுள்ள கடன்களை 9.99% p.a. கோல்டு லோனுடன் ஒருங்கிணைக்கவும்." } },
      { id: 9, slug: "gold-price-forecast-2026", image: "/Blog/img9.png", category: "தங்க சந்தை", title: "2026 தங்க விலை முன்னறிவிப்பு: தங்க விலைகள் உயருமா அல்லது வீழுமா?", excerpt: "2025ல் தங்கம் 10 கிராமுக்கு ₹85,000+ தொட்டது.", readTime: "6 நிமிடங்கள்", date: "மார்ச் 2026", content: { intro: "2020 முதல் தங்கம் USD இலிருந்து மத்திய வங்கி பல்வகைமை, புவியியல் அரசியல் நிச்சயமற்ற தன்மை மூலம் தூண்டப்பட்ட கட்டமைப்பு புல் மார்க்கெட்டில் உள்ளது.", points: ["தேஜி காரணிகள்: மத்திய வங்கிகள் (சீனா, இந்தியா, ரஷ்யா) தங்க கையிருப்புகளை சேகரிக்கின்றன.", "மந்தை அபாயங்கள்: USD வலுவடைதல் தங்கத்தில் அழுத்தம் கொண்டுவரலாம்.", "கோல்டு லோன் கடன்காரர்களுக்கு: அதிக தங்க விலைகள் = அதே LTV இல் அதிக கடன் தகுதி.", "இந்திய தேவை நெகிழாமல் உள்ளது — திருவிழாக்கள், திருமணங்கள் தொடர்கின்றன."], cta: "இன்றைய தங்க மதிப்பீட்டை லாக் செய்யுங்கள் — விலை ஏற்றத்தாழ்வுக்கு முன்பு கோல்டு லோனுக்கு விண்ணப்பிக்கவும்." } },
    ],
  },

  // ─── KANNADA ─────────────────────────────────────────────────────
  kn: {
    badge: "ಜ್ಞಾನ ಕೇಂದ್ರ", heading: "ನಮ್ಮ ಬ್ಲಾಗ್‌ಗಳು",
    subtext: "ಗೋಲ್ಡ್ ಲೋನ್, ಹೂಡಿಕೆ ಮತ್ತು ವೈಯಕ್ತಿಕ ಹಣಕಾಸಿನ ಕುರಿತು ತಜ್ಞ ಒಳನೋಟಗಳು",
    talkToExpert: "ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ", quickSummary: "ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ",
    blogs: [
      { id: 1, slug: "capital-gains-tax", image: "/Blog/img1.png", category: "ತೆರಿಗೆ & ಹೂಡಿಕೆ", title: "ಬಂಡವಾಳ ಲಾಭ ತೆರಿಗೆ: ಅರ್ಥ, ವಿಧಗಳು & ದರಗಳು", excerpt: "ಷೇರುಗಳು, ಆಸ್ತಿ ಅಥವಾ ಚಿನ್ನದಂತಹ ಬಂಡವಾಳ ಆಸ್ತಿಗಳ ಮಾರಾಟದಿಂದ ಗಳಿಸಿದ ಲಾಭಗಳ ಮೇಲೆ ಬಂಡವಾಳ ಲಾಭ ತೆರಿಗೆ ವಿಧಿಸಲಾಗುತ್ತದೆ.", readTime: "5 ನಿಮಿಷ", date: "ಮಾ. 2026", content: { intro: "ಬಂಡವಾಳ ಲಾಭ ತೆರಿಗೆ (CGT) ಎಂಬುದು ನೀವು ಬಂಡವಾಳ ಆಸ್ತಿಯನ್ನು ಖರೀದಿ ಬೆಲೆಗಿಂತ ಹೆಚ್ಚಿನ ಬೆಲೆಗೆ ಮಾರಾಟ ಮಾಡಿದಾಗ ಲಾಭದ ಮೇಲೆ ವಿಧಿಸಲಾಗುವ ತೆರಿಗೆ.", points: ["ಅಲ್ಪಾವಧಿ ಬಂಡವಾಳ ಲಾಭಗಳು (STCG): 12–36 ತಿಂಗಳಿಗಿಂತ ಕಡಿಮೆ ಕಾಲ ಇರಿಸಿದ ಆಸ್ತಿ. ಇಕ್ವಿಟಿಯ ಮೇಲೆ 20% ತೆರಿಗೆ.", "ದೀರ್ಘಕಾಲೀನ ಬಂಡವಾಳ ಲಾಭಗಳು (LTCG): ₹1.25 ಲಕ್ಷ ಮೀರಿದ ಇಕ್ವಿಟಿ LTCG ಮೇಲೆ ಇಂಡೆಕ್ಸೇಷನ್ ಇಲ್ಲದೇ 12.5%.", "ಸೆಕ್ಷನ್ 54, 54EC, 54F ಅಡಿ ವಿನಾಯಿತಿ.", "ಮ್ಯೂಚುಯಲ್ ಫಂಡ್ ಹೂಡಿಕೆದಾರರು ಖರೀದಿ NAV ಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಟ್ರ್ಯಾಕ್ ಮಾಡಬೇಕು."], cta: "ನಿಮ್ಮ ಬಂಡವಾಳ ಲಾಭ ತೆರಿಗೆ ಹೊಣೆಗಾರಿಕೆಯನ್ನು ಅನುಕೂಲಿಸಲು ನಮ್ಮ ಆರ್ಥಿಕ ಸಲಹೆಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ." } },
      { id: 2, slug: "best-index-funds-2026", image: "/Blog/img2.png", category: "ಮ್ಯೂಚುಯಲ್ ಫಂಡ್ಸ್", title: "2026ರಲ್ಲಿ ಭಾರತದಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಲು ಅತ್ಯುತ್ತಮ ಇಂಡೆಕ್ಸ್ ಫಂಡ್‌ಗಳು", excerpt: "ಇಂಡೆಕ್ಸ್ ಫಂಡ್‌ಗಳು ಕಡಿಮೆ ವೆಚ್ಚ ಅನುಪಾತದೊಂದಿಗೆ Nifty 50 ಅಥವಾ Sensex ಅನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತವೆ.", readTime: "6 ನಿಮಿಷ", date: "ಮಾ. 2026", content: { intro: "ಇಂಡೆಕ್ಸ್ ಫಂಡ್‌ಗಳು Nifty 50 ಅಥವಾ BSE Sensex ನಂತಹ ಮಾರ್ಕೆಟ್ ಸೂಚ್ಯಂಕವನ್ನು ನಿಷ್ಕ್ರಿಯವಾಗಿ ಪ್ರತಿಕೃತಿ ಮಾಡುತ್ತವೆ.", points: ["Nifty 50 ಇಂಡೆಕ್ಸ್ ಫಂಡ್‌ಗಳು: ಭಾರತದ ಅಗ್ರ 50 ಲಾರ್ಜ್-ಕ್ಯಾಪ್ ಕಂಪನಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತವೆ.", "Nifty Next 50 ಫಂಡ್‌ಗಳು: 51–100 ಸ್ಥಾನದ ಕಂಪನಿಗಳಿಗೆ ಎಕ್ಸ್‌ಪೋಷರ್.", "Nifty Midcap 150 ಇಂಡೆಕ್ಸ್ ಫಂಡ್‌ಗಳು: ಹೆಚ್ಚು ಅಪಾಯ ಸಹಿಷ್ಣುತೆ ಹೊಂದಿರುವ ಹೂಡಿಕೆದಾರರಿಗೆ.", "ಅಂತರರಾಷ್ಟ್ರೀಯ ಇಂಡೆಕ್ಸ್ ಫಂಡ್‌ಗಳು: RBI LRS ಅಡಿಯಲ್ಲಿ ಭೌಗೋಳಿಕ ವೈವಿಧ್ಯ."], cta: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಮೂಲಕ ಇಂಡೆಕ್ಸ್ ಫಂಡ್‌ಗಳಲ್ಲಿ SIP ಪ್ರಾರಂಭಿಸಿ — AMFI ನೋಂದಾಯಿತ ವಿತರಕ." } },
      { id: 3, slug: "gold-bees", image: "/Blog/img3.png", category: "ಚಿನ್ನದ ಹೂಡಿಕೆ", title: "Gold BeES ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ: ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, NAV & ರಿಟರ್ನ್ಸ್", excerpt: "Gold BeES ಭಾರತದ ಮೊದಲ ಗೋಲ್ಡ್ ETF.", readTime: "4 ನಿಮಿಷ", date: "ಫೆ. 2026", content: { intro: "Gold BeES 99.5% ಶುದ್ಧತೆಯ 1 ಗ್ರಾಂ ಭೌತಿಕ ಚಿನ್ನವನ್ನು ಪ್ರತಿನಿಧಿಸುವ ETF. NSE ನಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ.", points: ["1 ಯೂನಿಟ್ ≈ 1 ಗ್ರಾಂ ಚಿನ್ನ ಕಸ್ಟೋಡಿಯನ್ ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.", "ಮೇಕಿಂಗ್ ಚಾರ್ಜ್, ಶೇಖರಣಾ ಅಪಾಯ ಅಥವಾ ಅಶುದ್ಧತೆ ಚಿಂತೆ ಇಲ್ಲ.", "ದೀರ್ಘಾವಧಿ ಲಾಭಗಳಿಗೆ (3+ ವರ್ಷ) ಇಂಡೆಕ್ಸೇಷನ್‌ನೊಂದಿಗೆ 20% ತೆರಿಗೆ.", "ಸಾಲಗಳಿಗೆ ಮೇಲಾಣ ಆಗಿ ಅಡವಿಡಬಹುದು."], cta: "ಸ್ಮಾರ್ಟ್ ರೀತಿಯಲ್ಲಿ ಚಿನ್ನದಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಿ — Gold ETF ಆಯ್ಕೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ." } },
      { id: 4, slug: "multi-cap-vs-flexi-cap", image: "/Blog/img4.png", category: "ಮ್ಯೂಚುಯಲ್ ಫಂಡ್ಸ್", title: "Multi Cap ಮತ್ತು Flexi Cap ಮ್ಯೂಚುಯಲ್ ಫಂಡ್‌ಗಳು: ಹೇಗೆ ಭಿನ್ನ?", excerpt: "ಎರಡೂ ಲಾರ್ಜ್, ಮಿಡ್ ಮತ್ತು ಸ್ಮಾಲ್ ಕ್ಯಾಪ್‌ಗಳಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡುತ್ತವೆ — ಆದರೆ SEBI ನಿಯಮಗಳು ಅವುಗಳನ್ನು ಭಿನ್ನವಾಗಿ ಮಾಡುತ್ತವೆ.", readTime: "5 ನಿಮಿಷ", date: "ಫೆ. 2026", content: { intro: "SEBI ಮಲ್ಟಿ ಕ್ಯಾಪ್ ಫಂಡ್‌ಗಳನ್ನು ಲಾರ್ಜ್, ಮಿಡ್ ಮತ್ತು ಸ್ಮಾಲ್-ಕ್ಯಾಪ್ ಷೇರುಗಳಲ್ಲಿ ಪ್ರತಿಯೊಂದರಲ್ಲೂ ಕನಿಷ್ಠ 25% ಇರಿಸಲು ಆದೇಶಿಸುತ್ತದೆ.", points: ["Multi Cap: ಕಡ್ಡಾಯ 25-25-25 ಹಂಚಿಕೆ.", "Flexi Cap: ಫಂಡ್ ಮ್ಯಾನೇಜರ್‌ಗೆ ಪೂರ್ಣ ವಿವೇಚನೆ.", "ಮೊದಲ ಬಾರಿ ಹೂಡಿಕೆದಾರರಿಗೆ: Flexi Cap ಸಾಮಾನ್ಯವಾಗಿ ಆದ್ಯತೆ.", "ಎರಡಕ್ಕೂ ಸಮಾನ ತೆರಿಗೆ: LTCG 12.5%, STCG 20%."], cta: "ನಮ್ಮ ಸಲಹೆಗಾರರು ನಿಮ್ಮ ಅಪಾಯ ಪ್ರೊಫೈಲ್‌ಗೆ ಸರಿಯಾದ ಫಂಡ್ ವರ್ಗ ಆಯ್ಕೆ ಮಾಡಲು ಸಹಾಯ ಮಾಡಬಹುದು." } },
      { id: 5, slug: "online-vs-offline-personal-loan", image: "/Blog/img5.png", category: "ವೈಯಕ್ತಿಕ ಸಾಲ", title: "ಆನ್‌ಲೈನ್ ವ್ಯಕ್ತಿಗತ ಸಾಲ vs ಆಫ್‌ಲೈನ್ — ಯಾವುದು ಉತ್ತಮ?", excerpt: "ಆನ್‌ಲೈನ್ ಸಾಲಗಳು ನಿಮಿಷಗಳಲ್ಲಿ ತ್ವರಿತ ಅನುಮೋದನೆ ನೀಡುತ್ತವೆ.", readTime: "4 ನಿಮಿಷ", date: "ಫೆ. 2026", content: { intro: "ಡಿಜಿಟಲ್ ಸಾಲ ನೀಡಿಕೆ ಭಾರತದಲ್ಲಿ ವ್ಯಕ್ತಿಗತ ಸಾಲಗಳನ್ನು ಬದಲಾಯಿಸಿದೆ.", points: ["ಆನ್‌ಲೈನ್: ತ್ವರಿತ ಅರ್ಹತೆ ಪರಿಶೀಲನೆ, ವೀಡಿಯೋ KYC.", "ಆಫ್‌ಲೈನ್: RM ಉತ್ತಮ ದರಗಳನ್ನು ಚರ್ಚಿಸಬಹುದು.", "RBI KFS 2024: ವಾರ್ಷಿಕ ಶೇಕಡ ದರ ಮೊದಲೇ ಬಹಿರಂಗಪಡಿಸಬೇಕು.", "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಎರಡೂ ಚಾನೆಲ್‌ಗಳನ್ನು ಸಮಾನ ಬಡ್ಡಿ ದರಗಳಲ್ಲಿ ನೀಡುತ್ತದೆ."], cta: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ವ್ಯಕ್ತಿಗತ ಸಾಲಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಅಥವಾ ನಿಮ್ಮ ಹತ್ತಿರದ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ." } },
      { id: 6, slug: "digital-wallet", image: "/Blog/img6.png", category: "ಡಿಜಿಟಲ್ ಹಣಕಾಸು", title: "ಡಿಜಿಟಲ್ ವಾಲೆಟ್ ಎಂದರೇನು: ಅರ್ಥ, ವಿಧಗಳು, ಉದಾಹರಣೆಗಳು & ಪ್ರಯೋಜನಗಳು", excerpt: "ಡಿಜಿಟಲ್ ವಾಲೆಟ್‌ಗಳು UPI, NFC ಅಥವಾ QR ಕೋಡ್‌ಗಳ ಮೂಲಕ ನಗದು ರಹಿತ ವ್ಯವಹಾರಗಳಿಗೆ.", readTime: "4 ನಿಮಿಷ", date: "ಜ. 2026", content: { intro: "ಡಿಜಿಟಲ್ ವಾಲೆಟ್ ಪಾವತಿ ಪ್ರಮಾಣ ಪತ್ರಗಳು, ಬ್ಯಾಂಕ್ ವಿವರಗಳು ಮತ್ತು ವ್ಯವಹಾರ ಇತಿಹಾಸವನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ.", points: ["ಮುಚ್ಚಿದ ವಾಲೆಟ್‌ಗಳು: Amazon Pay, Ola Money.", "ಅರ್ಧ-ಮುಚ್ಚಿದ ವಾಲೆಟ್‌ಗಳು: Paytm, PhonePe.", "ತೆರೆದ ವಾಲೆಟ್‌ಗಳು: HDFC PayZapp. ಪೂರ್ಣ ಕ್ರಿಯಾಶೀಲತೆ.", "ಭಾರತ 2025 ರಲ್ಲಿ ತಿಂಗಳಿಗೆ 15+ ಬಿಲಿಯನ್ UPI."], cta: "ಯಾವುದೇ ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಶಾಖೆಯಲ್ಲಿ AePS ಮತ್ತು UPI ಮನಿ ಟ್ರಾನ್ಸ್ಫರ್ ಬಳಸಿ." } },
      { id: 7, slug: "what-is-refinancing", image: "/Blog/img7.png", category: "ಹೋಮ್ ಲೋನ್", title: "ರಿಫೈನಾನ್ಸಿಂಗ್ ಎಂದರೇನು: ಅರ್ಥ, ವಿಧಗಳು, ಪ್ರಯೋಜನಗಳು & ಉದಾಹರಣೆಗಳು", excerpt: "ರಿಫೈನಾನ್ಸಿಂಗ್ ನಿಮ್ಮ ಅಸ್ತಿತ್ವದ ಸಾಲವನ್ನು ಕಡಿಮೆ ದರದಲ್ಲಿ ಹೊಸದರಿಂದ ಬದಲಾಯಿಸುತ್ತದೆ.", readTime: "5 ನಿಮಿಷ", date: "ಜ. 2026", content: { intro: "ಸಾಲ ರಿಫೈನಾನ್ಸಿಂಗ್ ಎಂದರೆ ಅಸ್ತಿತ್ವದ ಸಾಲವನ್ನು ಹೊಸ ಸಾಲದಿಂದ ತೀರಿಸುವುದು — ಸಾಮಾನ್ಯವಾಗಿ ಬೇರೆ ಸಾಲದಾತರಿಂದ — ಕಡಿಮೆ ಬಡ್ಡಿ ದರದಲ್ಲಿ.", points: ["ದರ-ಮತ್ತು-ಅವಧಿ ರಿಫೈನಾನ್ಸಿಂಗ್: ₹50L ಹೋಮ್ ಲೋನ್‌ನಲ್ಲಿ 0.5% ತಗ್ಗಿಸುವಿಕೆ ₹3–5L ಉಳಿಸುತ್ತದೆ.", "ಕ್ಯಾಷ್-ಔಟ್ ರಿಫೈನಾನ್ಸಿಂಗ್: ಬಾಕಿ ಮೊತ್ತಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಾಲ ಪಡೆಯಿರಿ.", "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ಗೆ ಬ್ಯಾಲೆನ್ಸ್ ಟ್ರಾನ್ಸ್ಫರ್ ಟಾಪ್-ಅಪ್ ಸಾಲ ಸೇರಿದೆ.", "RBI ಫ್ಲೋಟಿಂಗ್-ರೇಟ್ ಹೋಮ್ ಲೋನ್‌ಗಳ ಮೇಲೆ ಶೂನ್ಯ ತ್ವರಿತ ಪಾವತಿ ದಂಡ ಕಡ್ಡಾಯ."], cta: "ನಮ್ಮ ಬ್ಯಾಲೆನ್ಸ್ ಟ್ರಾನ್ಸ್ಫರ್ ಕ್ಯಾಲ್ಕ್ಯುಲೇಟರ್‌ನೊಂದಿಗೆ ಉಳಿತಾಯ ಲೆಕ್ಕ ಹಾಕಿ." } },
      { id: 8, slug: "debt-trap", image: "/Blog/img8.png", category: "ಆರ್ಥಿಕ ಯೋಗಕ್ಷೇಮ", title: "ಸಾಲದ ಬಲೆ ಎಂದರೇನು? ಅರ್ಥ, ಕಾರಣಗಳು & ಅದನ್ನು ತಪ್ಪಿಸುವುದು ಹೇಗೆ", excerpt: "ಸಾಲದ ಬಲೆ ಎಂದರೆ ಅಸ್ತಿತ್ವದ ಸಾಲಗಳನ್ನು ತೀರಿಸಲು ನೀವು ಸಾಲ ತೆಗೆದುಕೊಳ್ಳುವಾಗ, ದುಷ್ಟಚಕ್ರ ಸೃಷ್ಟಿಸುವುದು.", readTime: "5 ನಿಮಿಷ", date: "ಜ. 2026", content: { intro: "ಸಾಲದ ಬಲೆ ಸಾಲಗಾರ ಮೂಲ ಮತ್ತು ಬಡ್ಡಿ ತೀರಿಸಲು ಸಾಧ್ಯವಾಗದಾಗ ಸಂಭವಿಸುತ್ತದೆ.", points: ["ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು: EMI ಟೇಕ್-ಹೋಮ್ ಪೇ ಯ 50% ಮೀರುತ್ತಿದೆ.", "ಸಾಮಾನ್ಯ ಕಾರಣಗಳು: ಉಚ್ಚ-ಬಡ್ಡಿ ವ್ಯಕ್ತಿಗತ ಸಾಲಗಳು (24–36% p.a.).", "ತಡೆಗಟ್ಟುವಿಕೆ: 6-ತಿಂಗಳ ತುರ್ತು ನಿಧಿ ಇರಿಸಿ.", "ತಪ್ಪಿಸಿಕೊಳ್ಳಿ: ಸಾಲ ಒಗ್ಗೂಡಿಸುವಿಕೆ — 9.99% p.a. ಗೋಲ್ಡ್ ಲೋನ್‌ನೊಂದಿಗೆ."], cta: "ಉಚ್ಚ-ವೆಚ್ಚದ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸಾಲ ಒಗ್ಗೂಡಿಸಲು 9.99% p.a. ಗೋಲ್ಡ್ ಲೋನ್ ಬಳಸಿ." } },
      { id: 9, slug: "gold-price-forecast-2026", image: "/Blog/img9.png", category: "ಚಿನ್ನದ ಮಾರ್ಕೆಟ್", title: "2026 ರ ಚಿನ್ನದ ಬೆಲೆ ಮುನ್ಸೂಚನೆ: ಚಿನ್ನದ ಬೆಲೆ ಏರುತ್ತದೆಯೇ ಅಥವಾ ಇಳಿಯುತ್ತದೆಯೇ?", excerpt: "2025 ರಲ್ಲಿ ಚಿನ್ನ ₹85,000+ ಪ್ರತಿ 10 ಗ್ರಾಂಗೆ ಮುಟ್ಟಿತು.", readTime: "6 ನಿಮಿಷ", date: "ಮಾ. 2026", content: { intro: "2020 ರಿಂದ ಚಿನ್ನ USD ನಿಂದ ದೂರ ಕೇಂದ್ರ ಬ್ಯಾಂಕ್ ವೈವಿಧ್ಯ, ಭೂರಾಜಕೀಯ ಅನಿಶ್ಚಿತತೆ ಮತ್ತು ಗರಿಷ್ಠ ETF ಒಳಹರಿವಿನಿಂದ ಚಾಲಿತ ರಚನಾತ್ಮಕ ಬುಲ್ ಮಾರ್ಕೆಟ್‌ನಲ್ಲಿದೆ.", points: ["ತೇಜಿ ಅಂಶಗಳು: ಕೇಂದ್ರ ಬ್ಯಾಂಕ್‌ಗಳು (ಚೀನಾ, ಭಾರತ, ರಷ್ಯಾ) ಚಿನ್ನದ ಮೀಸಲು ಸಂಗ್ರಹಿಸುತ್ತಿವೆ.", "ಮಂದಿ ಅಪಾಯಗಳು: USD ಬಲವಾಗುವಿಕೆ ಚಿನ್ನದ ಮೇಲೆ ಒತ್ತಡ ತರಬಹುದು.", "ಗೋಲ್ಡ್ ಲೋನ್ ಸಾಲಗಾರರಿಗೆ: ಹೆಚ್ಚಿನ ಚಿನ್ನದ ಬೆಲೆ = ಹೆಚ್ಚಿನ ಸಾಲ ಅರ್ಹತೆ.", "ಭಾರತೀಯ ಬೇಡಿಕೆ ಸ್ಥಿತಿಸ್ಥಾಪಕವಾಗಿ ಉಳಿಯುತ್ತದೆ."], cta: "ಇಂದಿನ ಚಿನ್ನದ ಮೌಲ್ಯಮಾಪನ ಲಾಕ್ ಮಾಡಿ — ಬೆಲೆ ಏರಿಳಿತಕ್ಕೆ ಮೊದಲು ಗೋಲ್ಡ್ ಲೋನ್‌ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ." } },
    ],
  },

  // ─── ASSAMESE ────────────────────────────────────────────────────
  as: {
    badge: "জ্ঞান কেন্দ্ৰ", heading: "আমাৰ ব্লগসমূহ",
    subtext: "গোল্ড লোন, বিনিয়োগ আৰু ব্যক্তিগত বিত্তৰ ওপৰত বিশেষজ্ঞ অন্তৰ্দৃষ্টি",
    talkToExpert: "বিশেষজ্ঞৰ সৈতে কথা পাতক", quickSummary: "সংক্ষিপ্ত সাৰাংশ",
    blogs: [
      { id: 1, slug: "capital-gains-tax", image: "/Blog/img1.png", category: "কৰ আৰু বিনিয়োগ", title: "মূলধন লাভ কৰ: অৰ্থ, প্ৰকাৰ আৰু হাৰ", excerpt: "শ্বেয়াৰ, সম্পত্তি বা সোণৰ দৰে মূলধন সম্পদ বিক্ৰয়ৰ পৰা অৰ্জিত লাভত মূলধন লাভ কৰ আৰোপ কৰা হয়।", readTime: "5 মিনিট", date: "মাৰ্চ 2026", content: { intro: "মূলধন লাভ কৰ (CGT) হৈছে সেই কৰ যি আপুনি মূলধন সম্পদ — শ্বেয়াৰ, মিউচুৱেল ফান্ড, ৰিয়েল এষ্টেট, সোণ — ক্ৰয় মূল্যতকৈ অধিক মূল্যত বিক্ৰয় কৰিলে লাভত আৰোপ হয়।", points: ["স্বল্পকালীন মূলধন লাভ (STCG): 12–36 মাহতকৈ কম সময়ৰ বাবে ৰখা সম্পদ। ইক্যুইটিত 20% কৰ।", "দীৰ্ঘকালীন মূলধন লাভ (LTCG): ₹1.25 লাখতকৈ অধিক ইক্যুইটি LTCG ত ইণ্ডেক্সেচন নোহোৱাকৈ 12.5%।", "ধাৰা 54, 54EC, 54F ৰ অধীনত ছাড় — নিৰ্দিষ্ট সম্পদত পুনৰ বিনিয়োগৰ জৰিয়তে কৰ দায়িত্ব কমাব পাৰি।", "মিউচুৱেল ফান্ড বিনিয়োগকাৰীসকলে ক্ৰয় NAV সাৱধানে ট্ৰেক কৰিব লাগে।"], cta: "আপোনাৰ মূলধন লাভ কৰ দায়িত্ব অনুকূল কৰিবলৈ আমাৰ বিত্তীয় পৰামৰ্শদাতাৰ সৈতে যোগাযোগ কৰক।" } },
      { id: 2, slug: "best-index-funds-2026", image: "/Blog/img2.png", category: "মিউচুৱেল ফান্ড", title: "2026 ত ভাৰতত বিনিয়োগৰ বাবে সৰ্বশ্ৰেষ্ঠ ইণ্ডেক্স ফান্ড", excerpt: "ইণ্ডেক্স ফান্ডে কম ব্যয় অনুপাতত Nifty 50 বা Sensex ট্ৰেক কৰে।", readTime: "6 মিনিট", date: "মাৰ্চ 2026", content: { intro: "ইণ্ডেক্স ফান্ডে Nifty 50 বা BSE Sensex ৰ দৰে বজাৰ সূচক নিষ্ক্ৰিয়ভাৱে প্ৰতিলিপি কৰে।", points: ["Nifty 50 ইণ্ডেক্স ফান্ড: ভাৰতৰ শীৰ্ষ 50 লাৰ্জ-কেপ কোম্পানী।", "Nifty Next 50 ফান্ড: বজাৰ পুঁজিকৰণৰ দ্বাৰা 51–100 স্থানৰ কোম্পানী।", "Nifty Midcap 150 ইণ্ডেক্স ফান্ড: অধিক জোখামোকা ক্ষমতা আৰু 7+ বছৰৰ ক্ষিতিজৰ বিনিয়োগকাৰীৰ বাবে।", "আন্তৰ্জাতিক ইণ্ডেক্স ফান্ড: RBI LRS ৰ অধীনত ভৌগোলিক বিভিন্নতা।"], cta: "শ্ৰী গণেশ ফাইনেন্সৰ জৰিয়তে ইণ্ডেক্স ফান্ডত আপোনাৰ SIP আৰম্ভ কৰক — AMFI পঞ্জীভুক্ত বিতৰক।" } },
      { id: 3, slug: "gold-bees", image: "/Blog/img3.png", category: "সোণৰ বিনিয়োগ", title: "Gold BeES বুজক: ই কেনেকৈ কাম কৰে, NAV আৰু ৰিটাৰ্ন", excerpt: "Gold BeES ভাৰতৰ প্ৰথম গোল্ড ETF।", readTime: "4 মিনিট", date: "ফেব্ৰুৱাৰি 2026", content: { intro: "Gold BeES হৈছে 99.5% বিশুদ্ধতাৰ 1 গ্ৰাম ভৌতিক সোণৰ প্ৰতিনিধিত্বকাৰী ETF। NSE ত তালিকাভুক্ত।", points: ["1 ইউনিট ≈ 1 গ্ৰাম সোণ কাষ্টোডিয়ান বেংকত সঞ্চিত। NAV ৰিয়েল-টাইমত ট্ৰেক কৰে।", "কোনো মেকিং চাৰ্জ, সঞ্চয় জোখামোকা বা অশুদ্ধতাৰ চিন্তা নাই।", "দীৰ্ঘকালীন লাভত (3+ বছৰ) ইণ্ডেক্সেচনৰ সৈতে 20% কৰ।", "ঋণৰ বাবে জামিন হিচাপে গিৰৱি ৰাখিব পাৰি।"], cta: "স্মাৰ্ট উপায়ে সোণত বিনিয়োগ কৰক — Gold ETF ৰ বিষয়ে আমাক সোধক।" } },
      { id: 4, slug: "multi-cap-vs-flexi-cap", image: "/Blog/img4.png", category: "মিউচুৱেল ফান্ড", title: "Multi Cap আৰু Flexi Cap মিউচুৱেল ফান্ড: পাৰ্থক্য কি?", excerpt: "দুয়োটাই লাৰ্জ, মিড আৰু স্মল কেপত বিনিয়োগ কৰে — কিন্তু SEBI বিধানে সিহতক মৌলিকভাৱে বেলেগ কৰে।", readTime: "5 মিনিট", date: "ফেব্ৰুৱাৰি 2026", content: { intro: "SEBI মাল্টি কেপ ফান্ডক লাৰ্জ, মিড আৰু স্মল-কেপ শ্বেয়াৰত প্ৰতিটোতে কমেও 25% বৰ্তাই ৰাখিবলৈ নিৰ্দেশ দিয়ে।", points: ["Multi Cap: বাধ্যতামূলক 25-25-25 বিতৰণ।", "Flexi Cap: ফান্ড মেনেজাৰৰ সম্পূৰ্ণ বিবেচনা।", "প্ৰথমবাৰৰ বিনিয়োগকাৰীৰ বাবে: Flexi Cap সাধাৰণতে পছন্দনীয়।", "দুয়োটাত একে কৰ: LTCG 12.5%, STCG 20%."], cta: "আমাৰ পৰামৰ্শদাতাসকলে আপোনাৰ জোখামোকা প্ৰফাইলৰ ভিত্তিত সঠিক ফান্ড বিভাগ বাছনি কৰাত সহায় কৰিব পাৰে।" } },
      { id: 5, slug: "online-vs-offline-personal-loan", image: "/Blog/img5.png", category: "ব্যক্তিগত ঋণ", title: "অনলাইন বনাম অফলাইন ব্যক্তিগত ঋণ — কোনটো ভাল?", excerpt: "অনলাইন ঋণে মিনিটত তাৎক্ষণিক অনুমোদন দিয়ে।", readTime: "4 মিনিট", date: "ফেব্ৰুৱাৰি 2026", content: { intro: "ডিজিটেল ঋণদান ভাৰতত ব্যক্তিগত ঋণ সলনি কৰিছে।", points: ["অনলাইন: তাৎক্ষণিক যোগ্যতা পৰীক্ষা, ভিডিঅ KYC।", "অফলাইন: RM ভাল হাৰ বিতৰ্ক কৰিব পাৰে।", "RBI KFS 2024: বাৰ্ষিক শতাংশ হাৰ আগতীয়াকৈ প্ৰকাশ কৰিব লাগে।", "শ্ৰী গণেশ ফাইনেন্স দুয়োটা চেনেল একে ব্যাজ হাৰত দিয়ে।"], cta: "অনলাইনত ব্যক্তিগত ঋণৰ বাবে আবেদন কৰক বা নিকটবৰ্তী শাখালৈ যাওক।" } },
      { id: 6, slug: "digital-wallet", image: "/Blog/img6.png", category: "ডিজিটেল বিত্ত", title: "ডিজিটেল ৱালেট কি: অৰ্থ, প্ৰকাৰ, উদাহৰণ আৰু সুবিধা", excerpt: "ডিজিটেল ৱালেটে UPI, NFC বা QR কোডৰ জৰিয়তে নগদবিহীন লেনদেনৰ বাবে পেমেণ্ট তথ্য সঞ্চয় কৰে।", readTime: "4 মিনিট", date: "জানুৱাৰি 2026", content: { intro: "ডিজিটেল ৱালেটে পেমেণ্ট প্ৰমাণপত্ৰ, বেংক বিৱৰণ আৰু লেনদেনৰ ইতিহাস সঞ্চয় কৰে।", points: ["বন্ধ ৱালেট: Amazon Pay, Ola Money।", "আধা-বন্ধ ৱালেট: Paytm, PhonePe।", "খোলা ৱালেট: HDFC PayZapp। সম্পূৰ্ণ কাৰ্যকাৰিতা।", "ভাৰতে 2025 ত মাহত 15+ বিলিয়ন UPI লেনদেন প্ৰক্ৰিয়া কৰিলে।"], cta: "যিকোনো শ্ৰী গণেশ ফাইনেন্স শাখাত AePS আৰু UPI মানি ট্ৰান্সফাৰ সেৱা ব্যৱহাৰ কৰক।" } },
      { id: 7, slug: "what-is-refinancing", image: "/Blog/img7.png", category: "হোম লোন", title: "ৰিফাইনান্সিং কি: অৰ্থ, প্ৰকাৰ, সুবিধা আৰু উদাহৰণ", excerpt: "ৰিফাইনান্সিঙে আপোনাৰ বিদ্যমান ঋণক কম হাৰত নতুন ঋণেৰে সলনি কৰে।", readTime: "5 মিনিট", date: "জানুৱাৰি 2026", content: { intro: "ঋণ ৰিফাইনান্সিং মানে বিদ্যমান ঋণ নতুন ঋণেৰে পৰিশোধ কৰা — প্ৰায়ে বেলেগ ঋণদাতাৰ পৰা — কম ব্যাজ হাৰত।", points: ["হাৰ-আৰু-মিয়াদ ৰিফাইনান্সিং: ₹50L ৰ হোম লোনত 0.5% হ্ৰাসে ₹3–5L সঞ্চয় কৰে।", "কেছ-আউট ৰিফাইনান্সিং: বাকী পৰিমাণতকৈ অধিক ঋণ, পাৰ্থক্য নগদে পাওক।", "শ্ৰী গণেশ ফাইনেন্সলৈ বেলেন্স ট্ৰান্সফাৰত টপ-আপ ঋণ বিকল্প অন্তৰ্ভুক্ত।", "RBI ভাসমান-হাৰ হোম লোনত শূন্য প্ৰিপেমেণ্ট দণ্ড বাধ্যতামূলক কৰে।"], cta: "আমাৰ বেলেন্স ট্ৰান্সফাৰ কেলকুলেটৰেৰে সঞ্চয় গণনা কৰক।" } },
      { id: 8, slug: "debt-trap", image: "/Blog/img8.png", category: "বিত্তীয় স্বাস্থ্য", title: "ঋণৰ জাল কি? অৰ্থ, কাৰণ আৰু কেনেকৈ পৰিহাৰ কৰিব", excerpt: "ঋণৰ জাল তেতিয়া হয় যেতিয়া আপুনি বিদ্যমান ঋণ পৰিশোধ কৰিবলৈ ঋণ লয়, এটা দুষ্টচক্ৰ সৃষ্টি কৰে।", readTime: "5 মিনিট", date: "জানুৱাৰি 2026", content: { intro: "ঋণৰ জাল তেতিয়া ঘটে যেতিয়া ঋণগ্ৰহণকাৰী মূল আৰু ব্যাজ পৰিশোধ কৰিব নোৱাৰে।", points: ["সতৰ্কতাৰ চিন: EMI টেক-হোম পেৰ 50% ছাড়িছে।", "সাধাৰণ কাৰণ: উচ্চ-ব্যাজ ব্যক্তিগত ঋণ (24–36% p.a.)।", "প্ৰতিৰোধ: 6-মাহৰ জৰুৰী নিধি বৰ্তাই ৰাখক।", "পলায়ন: ঋণ একত্ৰীকৰণ — 9.99% p.a. ত গোল্ড লোনৰ সৈতে।"], cta: "উচ্চ-খৰচৰ ক্ৰেডিট কাৰ্ড ঋণ একত্ৰিত কৰিবলৈ 9.99% p.a. ত গোল্ড লোন ব্যৱহাৰ কৰক।" } },
      { id: 9, slug: "gold-price-forecast-2026", image: "/Blog/img9.png", category: "সোণৰ বজাৰ", title: "2026 ৰ সোণৰ মূল্যৰ পূৰ্বানুমান: সোণৰ মূল্য বাঢ়িব নে কমিব?", excerpt: "2025 ত সোণ প্ৰতি 10 গ্ৰামত ₹85,000+ চুইছে।", readTime: "6 মিনিট", date: "মাৰ্চ 2026", content: { intro: "2020 ৰ পৰা সোণ USD ৰ পৰা দূৰত কেন্দ্ৰীয় বেংকৰ বৈচিত্ৰ্যকৰণ, ভূ-ৰাজনৈতিক অনিশ্চয়তা আৰু ৰেকৰ্ড ETF প্ৰবাহৰ দ্বাৰা চালিত এটা গঠনমূলক বুল বজাৰত আছে।", points: ["তেজস্বী কাৰক: কেন্দ্ৰীয় বেংক (চীন, ভাৰত, ৰাছিয়া) সোণৰ মজুত জমা কৰি আছে।", "মন্দীৰ আশংকা: USD শক্তিশালী হোৱা সোণত হেঁচা আনিব পাৰে।", "গোল্ড লোন ঋণগ্ৰহণকাৰীৰ বাবে: অধিক সোণৰ মূল্য = একে LTV ত অধিক ঋণ যোগ্যতা।", "ভাৰতীয় চাহিদা অস্থিতিস্থাপক থাকে — উৎসৱ, বিয়া আৰু বিনিয়োগ কিনা অব্যাহত থাকে।"], cta: "আজিৰ সোণৰ মূল্যায়ন লক কৰক — মূল্য বিচলনৰ আগতে গোল্ড লোনৰ বাবে আবেদন কৰক।" } },
    ],
  },

  // ─── URDU ────────────────────────────────────────────────────────
  ur: {
    badge: "علم مرکز", heading: "ہمارے بلاگز",
    subtext: "گولڈ لون، سرمایہ کاری اور ذاتی مالیات پر ماہرانہ بصیرت",
    talkToExpert: "ماہر سے بات کریں", quickSummary: "مختصر خلاصہ",
    blogs: [
      { id: 1, slug: "capital-gains-tax", image: "/Blog/img1.png", category: "ٹیکس اور سرمایہ کاری", title: "سرمائے کا فائدہ ٹیکس: معنی، اقسام اور شرحیں", excerpt: "حصص، جائیداد یا سونے جیسے سرمائے کے اثاثوں کی فروخت سے کمائے گئے منافع پر سرمائے کا فائدہ ٹیکس لگایا جاتا ہے۔", readTime: "5 منٹ", date: "مارچ 2026", content: { intro: "سرمائے کا فائدہ ٹیکس (CGT) وہ ٹیکس ہے جو اس وقت لگتا ہے جب آپ کوئی سرمائے کا اثاثہ — حصص، میوچول فنڈز، رئیل اسٹیٹ، سونا — ادا کی گئی قیمت سے زیادہ قیمت پر فروخت کرتے ہیں۔", points: ["قلیل مدتی سرمائے کے فوائد (STCG): 12–36 ماہ سے کم عرصے تک رکھے گئے اثاثے۔ ایکوئٹی پر 20% ٹیکس۔", "طویل مدتی سرمائے کے فوائد (LTCG): ₹1.25 لاکھ سے زیادہ ایکوئٹی LTCG پر انڈیکسیشن کے بغیر 12.5%۔", "دفعہ 54، 54EC، 54F کے تحت چھوٹ — مخصوص اثاثوں میں دوبارہ سرمایہ کاری سے ٹیکس ذمہ داری کم ہوتی ہے۔", "میوچول فنڈ سرمایہ کاروں کو خریداری NAV کو احتیاط سے ٹریک کرنا چاہیے۔"], cta: "اپنی سرمائے کے فائدے کی ٹیکس ذمہ داری کو بہتر بنانے کے لیے ہمارے مالیاتی مشیر سے مشورہ کریں۔" } },
      { id: 2, slug: "best-index-funds-2026", image: "/Blog/img2.png", category: "میوچول فنڈز", title: "2026 میں ہندوستان میں سرمایہ کاری کے لیے بہترین انڈیکس فنڈز", excerpt: "انڈیکس فنڈز کم اخراجاتی تناسب کے ساتھ Nifty 50 یا Sensex جیسے مارکیٹ بینچ مارک کو ٹریک کرتے ہیں۔", readTime: "6 منٹ", date: "مارچ 2026", content: { intro: "انڈیکس فنڈز Nifty 50 یا BSE Sensex جیسے مارکیٹ انڈیکس کو غیر فعال طریقے سے دوہراتے ہیں — ہندوستان میں سب سے زیادہ لاگت مؤثر سرمایہ کاری کے ذرائع میں سے ایک۔", points: ["Nifty 50 انڈیکس فنڈز: ہندوستان کی سرفہرست 50 لارج-کیپ کمپنیوں کو ٹریک کرتے ہیں۔", "Nifty Next 50 فنڈز: مارکیٹ کیپ کے لحاظ سے 51–100 رینک کی کمپنیاں۔", "Nifty Midcap 150 انڈیکس فنڈز: زیادہ رسک برداشت اور 7+ سال کے افق کے سرمایہ کاروں کے لیے۔", "بین الاقوامی انڈیکس فنڈز: RBI LRS فریم ورک کے تحت جغرافیائی تنوع۔"], cta: "شری گنیش فائنانس کے ذریعے انڈیکس فنڈز میں اپنا SIP شروع کریں — AMFI رجسٹرڈ ڈسٹریبیوٹر۔" } },
      { id: 3, slug: "gold-bees", image: "/Blog/img3.png", category: "سونے کی سرمایہ کاری", title: "Gold BeES سمجھیں: یہ کیسے کام کرتا ہے، NAV اور ریٹرن", excerpt: "Gold BeES ہندوستان کا پہلا گولڈ ETF ہے۔", readTime: "4 منٹ", date: "فروری 2026", content: { intro: "Gold BeES 99.5% خالصیت کے 1 گرام جسمانی سونے کی نمائندگی کرنے والا ETF ہے۔ NSE پر درج۔", points: ["1 یونٹ ≈ 1 گرام سونا کسٹوڈین بینک میں محفوظ۔ NAV ریئل-ٹائم میں ٹریک کرتا ہے۔", "جسمانی سونے کے زیورات کے برعکس کوئی مینگنگ چارجز، اسٹوریج خطرہ نہیں۔", "طویل مدتی فوائد (3+ سال) انڈیکسیشن کے ساتھ 20% ٹیکس۔", "قرضوں کے لیے ضمانت کے طور پر گروی رکھا جا سکتا ہے۔"], cta: "سمارٹ طریقے سے سونے میں سرمایہ کاری کریں — Gold ETF کے بارے میں پوچھیں۔" } },
      { id: 4, slug: "multi-cap-vs-flexi-cap", image: "/Blog/img4.png", category: "میوچول فنڈز", title: "Multi Cap اور Flexi Cap میوچول فنڈز: کیا فرق ہے؟", excerpt: "دونوں لارج، مڈ اور اسمال کیپس میں سرمایہ کاری کرتے ہیں — لیکن SEBI ضوابط انہیں بنیادی طور پر مختلف بناتے ہیں۔", readTime: "5 منٹ", date: "فروری 2026", content: { intro: "SEBI ملٹی کیپ فنڈز کو لارج، مڈ اور اسمال-کیپ اسٹاکس میں ہر ایک میں کم از کم 25% برقرار رکھنے کا حکم دیتا ہے۔", points: ["Multi Cap: لازمی 25-25-25 مختص۔", "Flexi Cap: فنڈ مینیجر کی مکمل صواب دید۔", "پہلی بار سرمایہ کاروں کے لیے: Flexi Cap عموماً ترجیح ہے۔", "دونوں پر یکساں ٹیکس: LTCG 12.5%، STCG 20%."], cta: "ہمارے مشیر آپ کے رسک پروفائل کی بنیاد پر صحیح فنڈ کٹیگری منتخب کرنے میں مدد کر سکتے ہیں۔" } },
      { id: 5, slug: "online-vs-offline-personal-loan", image: "/Blog/img5.png", category: "ذاتی قرضہ", title: "آن لائن ذاتی قرضہ بمقابلہ آف لائن — کونسا بہتر ہے؟", excerpt: "آن لائن قرضے منٹوں میں فوری منظوری دیتے ہیں۔", readTime: "4 منٹ", date: "فروری 2026", content: { intro: "ڈیجیٹل قرضہ دہندگی نے ہندوستان میں ذاتی قرضوں کو تبدیل کر دیا ہے۔", points: ["آن لائن: فوری اہلیت جانچ، ویڈیو KYC۔", "آف لائن: RM بہتر شرحوں پر گفت و شنید کر سکتا ہے۔", "RBI KFS 2024: سالانہ فیصد شرح پہلے سے ظاہر کریں۔", "SGF دونوں چینلز یکساں شرح سود پر۔"], cta: "آن لائن ذاتی قرضے کے لیے درخواست دیں یا قریبی شاخ کا دورہ کریں۔" } },
      { id: 6, slug: "digital-wallet", image: "/Blog/img6.png", category: "ڈیجیٹل فائنانس", title: "ڈیجیٹل والٹ کیا ہے: معنی، اقسام، مثالیں اور فوائد", excerpt: "ڈیجیٹل والٹ UPI، NFC یا QR کوڈز کے ذریعے بے نقد لین دین کے لیے ادائیگی کی معلومات محفوظ کرتے ہیں۔", readTime: "4 منٹ", date: "جنوری 2026", content: { intro: "ڈیجیٹل والٹ ادائیگی کی اسناد، بینک تفصیلات اور لین دین کی تاریخ محفوظ کرتا ہے۔", points: ["بند والٹس: Amazon Pay، Ola Money۔", "نیم بند والٹس: Paytm، PhonePe۔", "کھلے والٹس: HDFC PayZapp۔ مکمل فعالیت۔", "ہندوستان نے 2025 میں ماہانہ 15+ ارب UPI لین دین کیے۔"], cta: "کسی بھی شری گنیش فائنانس شاخ میں AePS اور UPI مبنی منی ٹرانسفر سروسز استعمال کریں۔" } },
      { id: 7, slug: "what-is-refinancing", image: "/Blog/img7.png", category: "ہوم لون", title: "ری فائنانسنگ کیا ہے: معنی، اقسام، فوائد اور مثالیں", excerpt: "ری فائنانسنگ آپ کے موجودہ قرضے کو کم شرح پر نئے سے تبدیل کرتی ہے۔", readTime: "5 منٹ", date: "جنوری 2026", content: { intro: "قرضے کی ری فائنانسنگ کا مطلب ہے موجودہ قرضے کو نئے قرضے سے ادا کرنا — اکثر مختلف قرض دہندہ سے — کم سود کی شرح پر۔", points: ["ریٹ-اینڈ-ٹرم ری فائنانسنگ: ₹50L ہوم لون پر 0.5% کمی ₹3–5L بچاتی ہے۔", "کیش-آؤٹ ری فائنانسنگ: بقیہ سے زیادہ قرض لیں، فرق نقد میں۔", "شری گنیش فائنانس بیلنس ٹرانسفر میں ٹاپ-اپ قرضہ شامل۔", "RBI فلوٹنگ-ریٹ ہوم لونز پر صفر پیشگی ادائیگی جرمانہ لازمی۔"], cta: "بیلنس ٹرانسفر کیلکولیٹر — ہوم لون ٹیم سے بات کریں۔" } },
      { id: 8, slug: "debt-trap", image: "/Blog/img8.png", category: "مالی تندرستی", title: "قرض کا جال کیا ہے؟ معنی، اسباب اور اس سے بچاؤ", excerpt: "قرض کا جال وہ ہے جب آپ موجودہ قرضوں کی ادائیگی کے لیے قرض لیتے ہیں۔", readTime: "5 منٹ", date: "جنوری 2026", content: { intro: "قرض کا جال اس وقت ہوتا ہے جب قرض لینے والا اصل اور سود ادا کرنے سے قاصر ہو۔", points: ["انتباہی علامات: EMI آمدنی کا 50% سے زیادہ۔", "عام اسباب: اعلی-سود ذاتی قرضے (24–36% p.a.)۔", "روک تھام: 6 ماہ کا ہنگامی فنڈ رکھیں۔", "فرار: قرض استحکام — 9.99% p.a. گولڈ لون سے۔"], cta: "اعلی لاگت کریڈٹ کارڈ قرض یکجا کرنے کے لیے 9.99% p.a. گولڈ لون استعمال کریں۔" } },
      { id: 9, slug: "gold-price-forecast-2026", image: "/Blog/img9.png", category: "سونے کی مارکیٹ", title: "2026 سونے کی قیمت کی پیش گوئی: سونے کی قیمتیں بڑھیں گی یا گریں گی؟", excerpt: "2025 میں سونا ₹85,000+ فی 10 گرام تک پہنچا۔", readTime: "6 منٹ", date: "مارچ 2026", content: { intro: "2020 سے سونا USD سے دور مرکزی بینک کے تنوع، جغرافیائی سیاسی غیر یقینی صورتحال اور ریکارڈ ETF آمد سے کارفرما ساختیاتی بل مارکیٹ میں ہے۔", points: ["تیزی کے عوامل: مرکزی بینک (چین، ہندوستان، روس) سونے کے ذخائر جمع کر رہے ہیں۔", "مندی کے خطرات: USD مضبوط ہونا سونے پر دباؤ ڈال سکتا ہے۔", "گولڈ لون قرض لینے والوں کے لیے: زیادہ سونے کی قیمتیں = اسی LTV پر زیادہ قرضہ اہلیت۔", "ہندوستانی طلب لچکدار رہتی ہے — تہوار، شادیاں جاری رہتی ہیں۔"], cta: "آج کی سونے کی قدر لاک کریں — قیمتوں میں اتار چڑھاؤ سے پہلے گولڈ لون کے لیے درخواست دیں۔" } },
    ],
  },
};

// ── Scroll Reveal Hook ────────────────────────────────────────────
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
  const { lang } = useLanguage();
  const D = BLOGS_DATA[lang] || BLOGS_DATA["en"];
  const isRtl = lang === "ur";

  const [activeBlog, setActiveBlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expandedVisible, setExpandedVisible] = useState(false);
  const [sectionRef, sectionVisible] = useScrollReveal(0.1);
  const expandRef = useRef(null);
  const autoRef = useRef(null);

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

  const maxIndex = Math.max(0, D.blogs.length - cardsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;
    autoRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, [isAutoPlaying, maxIndex]);

  // Reset active blog when language changes
  useEffect(() => {
    setActiveBlog(null);
    setExpandedVisible(false);
    setCurrentIndex(0);
  }, [lang]);

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
    <section ref={sectionRef} className="w-full bg-white py-10 sm:py-16" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">

        {/* ── Header ── */}
        <div className={`flex items-end justify-between mb-8 sm:mb-10 transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-[10px] font-black tracking-[0.15em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {D.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-none tracking-tight">{D.heading}</h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 font-medium">{D.subtext}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => slide("prev")} disabled={currentIndex === 0}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-red-300 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
            <button onClick={() => slide("next")} disabled={currentIndex >= maxIndex}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-red-300 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className={`overflow-hidden transition-all duration-700 delay-150 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}>
            {D.blogs.map((blog) => {
              const isActive = activeBlog?.id === blog.id;
              return (
                <div key={blog.id} className="flex-shrink-0 px-1.5 sm:px-2" style={{ width: `${cardWidth}%` }}>
                  <div onClick={() => handleCardClick(blog)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 select-none ${isActive ? "border-red-500 shadow-xl shadow-red-100 scale-[1.02]" : "border-transparent hover:border-red-200 hover:shadow-lg hover:shadow-red-50 hover:-translate-y-1"}`}>
                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                      <img src={blog.image} alt={blog.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                        loading="lazy" onError={(e) => { e.target.style.display = "none"; e.target.parentNode.classList.add("bg-gradient-to-br", "from-red-50", "to-gray-100"); }} />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[9px] font-black tracking-widest uppercase bg-red-600 text-white px-2 py-1 rounded-md shadow">{blog.category}</span>
                      </div>
                      {isActive && (
                        <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-white"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </div>
                      )}
                    </div>
                    <div className="py-3 px-1">
                      <p className={`text-xs font-black leading-tight tracking-wide uppercase line-clamp-2 transition-colors duration-200 ${isActive ? "text-red-600" : "text-gray-800 group-hover:text-red-600"}`}>{blog.title}</p>
                      <p className="text-[10px] text-gray-400 mt-1.5 font-medium">{blog.readTime} · {blog.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Dots ── */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button key={i} onClick={() => { setCurrentIndex(i); setIsAutoPlaying(false); }}
              className={`rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 h-2 bg-red-600" : "w-2 h-2 bg-gray-200 hover:bg-gray-300"}`} />
          ))}
        </div>

        {/* ── Expanded Panel ── */}
        <div ref={expandRef}>
          <div className="overflow-hidden transition-all ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ maxHeight: expandedVisible ? "600px" : "0px", opacity: expandedVisible ? 1 : 0, transform: expandedVisible ? "translateY(0)" : "translateY(12px)", transitionDuration: expandedVisible ? "600ms" : "300ms", transitionProperty: "max-height, opacity, transform", marginTop: expandedVisible ? "24px" : "0px" }}>
            {activeBlog && (
              <div className="rounded-3xl overflow-hidden border border-red-100 shadow-2xl shadow-red-50/60">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Left image */}
                  <div className="lg:col-span-2 relative overflow-hidden min-h-[200px] lg:min-h-0 bg-gray-900">
                    <img src={activeBlog.image} alt={activeBlog.title}
                      className="w-full h-full object-cover absolute inset-0 opacity-75"
                      style={{ transform: expandedVisible ? "scale(1.05)" : "scale(1.12)", transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-transparent" />
                    <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end">
                      <span className="text-[9px] font-black tracking-widest uppercase bg-red-600 text-white px-2.5 py-1 rounded-md w-fit mb-3"
                        style={{ opacity: expandedVisible ? 1 : 0, transform: expandedVisible ? "translateY(0)" : "translateY(8px)", transition: "opacity 400ms 200ms, transform 400ms 200ms" }}>
                        {activeBlog.category}
                      </span>
                      <h3 className="text-white font-black text-lg sm:text-xl leading-snug"
                        style={{ opacity: expandedVisible ? 1 : 0, transform: expandedVisible ? "translateY(0)" : "translateY(10px)", transition: "opacity 400ms 280ms, transform 400ms 280ms" }}>
                        {activeBlog.title}
                      </h3>
                      <p className="text-white/50 text-xs mt-2" style={{ opacity: expandedVisible ? 1 : 0, transition: "opacity 400ms 360ms" }}>
                        {activeBlog.readTime} · {activeBlog.date}
                      </p>
                    </div>
                  </div>

                  {/* Right content */}
                  <div className="lg:col-span-3 bg-white p-6 sm:p-8 lg:p-10">
                    <div className="flex items-start justify-between mb-5"
                      style={{ opacity: expandedVisible ? 1 : 0, transform: expandedVisible ? "translateY(0)" : "translateY(8px)", transition: "opacity 400ms 150ms, transform 400ms 150ms" }}>
                      <div className="flex-1 pr-4">
                        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-red-500 mb-1.5">{D.quickSummary}</p>
                        <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">{activeBlog.content.intro}</p>
                      </div>
                      <button onClick={() => { setExpandedVisible(false); setTimeout(() => { setActiveBlog(null); setIsAutoPlaying(true); }, 300); }}
                        className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all duration-200 text-gray-400 hover:rotate-90 hover:scale-110">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </div>

                    <div className="space-y-2.5 mb-6">
                      {activeBlog.content.points.map((point, i) => (
                        <div key={`${activeBlog.id}-${i}-${lang}`}
                          className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50/60 transition-colors duration-200"
                          style={{ opacity: expandedVisible ? 1 : 0, transform: expandedVisible ? "translateX(0)" : "translateX(-10px)", transition: `opacity 400ms ${200 + i * 80}ms, transform 400ms ${200 + i * 80}ms` }}>
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black mt-0.5">{i + 1}</span>
                          <p className="text-xs sm:text-sm text-gray-700 leading-5 sm:leading-6">{point}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-gray-100"
                      style={{ opacity: expandedVisible ? 1 : 0, transition: `opacity 400ms ${200 + activeBlog.content.points.length * 80 + 60}ms` }}>
                      <p className="text-xs sm:text-sm text-gray-400 italic max-w-sm leading-5">💡 {activeBlog.content.cta}</p>
                      <a href="/contact"
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-all duration-200 active:scale-95 shadow-md shadow-red-100 whitespace-nowrap">
                        {D.talkToExpert}
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
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