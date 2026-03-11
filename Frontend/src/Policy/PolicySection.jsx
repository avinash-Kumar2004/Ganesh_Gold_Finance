import { useState, useEffect, useRef, useContext } from "react";
import { LanguageContext } from "../Common/Navbaar"; // adjust path as needed

const useLanguage = () => useContext(LanguageContext);

// ═══════════════════════════════════════════════════════════════════════
// ── TRANSLATION TEMPLATE (Base structure for all languages)
// ═══════════════════════════════════════════════════════════════════════
const TRANSLATION_TEMPLATE = {
  section_tag: "Compliance & Governance",
  section_title: "Policy",
  section_desc: "Ganesh Finance operates under a comprehensive framework of policies that ensure fairness, transparency, and regulatory compliance in every aspect of our business. Click any policy to learn more.",
  commitment_tag: "Our Commitment",
  commitment_title_1: "Fair Practice at the",
  commitment_title_hl: "Core",
  commitment_sub: "Since our founding in 2020, fair practice has been the bedrock of every decision at Ganesh Finance.",
  stat_assets: "Assets Under Management",
  stat_customers: "Happy Customers",
  stat_founded: "Founded",
  card_tagline: "Transparency. Trust. Integrity.",
  card_body: "Every loan, every transaction, every interaction at Ganesh Finance is governed by principles that put our customers first.",
  fp1_title: "Transparent by Default",
  fp1_body: "At Ganesh Finance, we disclose every fee, every rate, and every condition before you sign. Our loan documents are written in plain language — no fine print designed to confuse.",
  fp2_title: "Customer-Centric Decisions",
  fp2_body: "Every policy we draft starts with a simple question: Is this fair for our customer? From flexible repayment to zero-penalty prepayment for long-term borrowers, our policies are built around your needs.",
  fp3_title: "Regulatory Compliance as a Strength",
  fp3_body: "Registered and regulated by the Reserve Bank of India, Ganesh Finance treats compliance not as a burden but as a competitive advantage — proof that we operate at the highest standard of integrity.",
  fp4_title: "Growing With Our Community",
  fp4_body: "Since 2020, we've grown from a single branch to serving 1,000+ customers. Our ₹1.5 crore asset base reflects the trust our community has placed in us — a trust we protect with every policy on this page.",
  modal_company: "Ganesh Finance",
  modal_overview: "Overview",
  modal_key: "Key Provisions",
  modal_cta: "Query about this policy",
  modal_close: "Close",
  view_details: "View details",
  policies: [
    { 
      id:"fair-practices",       
      title:"Fair Practices Code",                               
      short:"Transparent, ethical lending standards for all customers.",             
      overview:"Ganesh Finance's Fair Practices Code establishes comprehensive guidelines ensuring all loan products are offered with complete transparency, fairness, and without any discriminatory practices.", 
      points:[
        "Clear disclosure of all loan terms, interest rates, and charges before sanction",
        "No hidden fees — complete breakdown provided in writing",
        "Equal treatment regardless of caste, religion, gender, or region",
        "Grievance redressal within 30 working days",
        "Annual review and update of the code by the Board of Directors",
        "Customer acknowledgment required before loan disbursement"
      ], 
      highlight:"Our Fair Practices Code is reviewed annually and approved by our Board of Directors to ensure alignment with RBI guidelines." 
    },
    { 
      id:"code-of-conduct",      
      title:"Code of Conduct",                                   
      short:"Professional conduct standards binding all staff and agents.",           
      overview:"Our Code of Conduct defines the ethical framework within which every Ganesh Finance employee, agent, and partner operates — building trust from the ground up.", 
      points:[
        "Zero tolerance for bribery, corruption, or unethical solicitation",
        "Mandatory annual ethics training for all staff members",
        "Confidentiality obligations for all customer information",
        "Conflict of interest disclosure protocols",
        "Disciplinary action matrix for violations at every level",
        "Whistleblower protection guaranteed for good-faith reporters"
      ], 
      highlight:"Employees are required to sign and acknowledge the Code of Conduct annually, and violations are addressed through a structured, impartial disciplinary process." 
    },
    { 
      id:"interest-rate",        
      title:"Interest Rate Policy",                              
      short:"RBI-compliant, transparent interest rate framework.",                   
      overview:"Ganesh Finance follows a Board-approved Interest Rate Policy that ensures competitive, transparent, and RBI-compliant pricing for all credit products offered.", 
      points:[
        "Interest rates set by the Asset Liability Management Committee (ALCO)",
        "Rates based on cost of funds, risk premium, and market benchmarks",
        "No discriminatory rates — same product, same terms for all customers",
        "Interest rate changes communicated at least 30 days in advance",
        "Gold Loan rates competitive with leading NBFCs and banks",
        "Processing fees and prepayment charges disclosed upfront"
      ], 
      highlight:"All rate revisions are reported to the RBI as per NBFC regulations and published on our website for complete public transparency." 
    },
    { 
      id:"privacy",              
      title:"Privacy Policy",                                    
      short:"Your data protected under IT Act and RBI data guidelines.",             
      overview:"Ganesh Finance treats customer privacy as a fundamental right. Our Privacy Policy governs how we collect, use, store, and protect personal and financial information.", 
      points:[
        "Data collected only for stated, specific lending purposes",
        "No sale or sharing of customer data to third parties without consent",
        "End-to-end encryption for all digital transactions",
        "Customers can request data correction or deletion at any time",
        "Data retention policy aligned with RBI and IT Act requirements",
        "Regular security audits by independent cybersecurity firms"
      ], 
      highlight:"We are fully compliant with the Information Technology Act, 2000 and RBI guidelines on data privacy for NBFCs." 
    },
    { 
      id:"vigil-mechanism",      
      title:"Vigil Mechanism",                                   
      short:"Safe whistleblower channel for reporting concerns.",                    
      overview:"Our Vigil Mechanism provides a structured, confidential channel for employees, customers, and stakeholders to report genuine concerns about unethical behavior, fraud, or policy violations.", 
      points:[
        "Anonymous reporting available via dedicated email and hotline",
        "All complaints investigated by an independent committee",
        "Whistleblower identity kept strictly confidential",
        "No retaliation, demotion, or adverse action against good-faith reporters",
        "Resolution timeline: 45 working days for standard cases",
        "Escalation to Board Audit Committee if unresolved"
      ], 
      highlight:"The Vigil Mechanism is overseen directly by our Board's Audit Committee, ensuring independence from management influence." 
    },
    { 
      id:"investor-policy",      
      title:"Policy for Investors",                              
      short:"Fair, timely, and transparent investor communication.",                  
      overview:"Ganesh Finance is committed to building long-term investor trust through regular disclosures, fair treatment, and adherence to all applicable corporate governance standards.", 
      points:[
        "Quarterly financial updates shared with all registered investors",
        "Annual General Meeting held within 6 months of financial year close",
        "Material developments disclosed within 24 hours on company website",
        "Investor grievance resolution within 15 working days",
        "SEBI and RBI reporting standards followed strictly",
        "Dedicated Investor Relations contact for queries"
      ], 
      highlight:"Ganesh Finance maintains a robust governance structure that protects investor rights while ensuring sustainable business growth for all stakeholders." 
    },
    { 
      id:"securities-trading",   
      title:"Securities Trading Rules",                          
      short:"Insider trading prevention and compliance framework.",                  
      overview:"Our Securities Trading Rules prevent insider trading and ensure all market activities by connected persons comply with SEBI regulations.", 
      points:[
        "Designated persons list maintained and updated quarterly",
        "Mandatory pre-clearance for trades above specified thresholds",
        "Trading window blackout periods before financial result announcements",
        "Penalties for violation: immediate suspension and legal action",
        "Annual compliance certification required from all designated persons",
        "Regular awareness programs on SEBI PIT Regulations"
      ], 
      highlight:"Our compliance officer monitors all trades by designated persons and reports to the Audit Committee on a quarterly basis." 
    },
    { 
      id:"app-disclaimer",       
      title:"App Disclaimer",                                    
      short:"Mobile app usage terms, data and liability clauses.",                   
      overview:"The Ganesh Finance mobile application is provided as a convenience tool. This disclaimer outlines the terms of use, limitations of liability, and user responsibilities.", 
      points:[
        "App is for informational and application purposes only",
        "Loan approval subject to physical verification and credit assessment",
        "Screenshots or app outputs not legally binding documents",
        "App performance subject to network and device conditions",
        "Ganesh Finance not liable for losses from unauthorized access",
        "Updates may change features; continued use implies acceptance"
      ], 
      highlight:"For official loan sanction letters and binding agreements, only documents issued through our registered office hold legal validity." 
    },
    { 
      id:"auction-policy",       
      title:"Auction Policy",                                    
      short:"Transparent, RBI-compliant gold auction procedures.",                   
      overview:"In cases of loan default, Ganesh Finance follows a strict, RBI-mandated Auction Policy ensuring fair treatment of customers and transparent auction of pledged gold.", 
      points:[
        "Minimum 14 days written notice before initiating auction proceedings",
        "Auction conducted by certified licensed auctioneers only",
        "Customer notified of auction date, venue, and reserve price",
        "Surplus proceeds (if any) returned to customer within 7 working days",
        "Auction records maintained and available for customer inspection",
        "Customers may redeem pledged gold until auction commencement"
      ], 
      highlight:"Our Auction Policy strictly follows RBI Master Circular on Gold Loans and ensures maximum recovery of customer dues before resorting to auction." 
    },
    { 
      id:"loan-policy",          
      title:"Loan Policy",                                       
      short:"Eligibility, sanction, disbursement and recovery norms.",               
      overview:"The Ganesh Finance Loan Policy governs the entire credit lifecycle — from eligibility assessment and sanction to disbursement, monitoring, and recovery.", 
      points:[
        "KYC and income verification mandatory for all loan applications",
        "Gold Loan LTV ratio maintained at maximum 75% as per RBI norms",
        "Credit assessment using proprietary scoring and bureau data",
        "Disbursement within 24 hours of document verification",
        "EMI holiday available for agriculture and seasonal borrowers",
        "NPA classification as per RBI NBFC prudential norms"
      ], 
      highlight:"Our Loan Policy is reviewed semi-annually by the Risk Management Committee to reflect current market conditions and regulatory requirements." 
    },
    { 
      id:"code-fair-practices",  
      title:"Code of Fair Practices",                            
      short:"Ethical dealings with borrowers, collection agents and staff.",         
      overview:"An extension of our core ethics framework, this Code specifically addresses fair dealing practices in collections, field operations, and customer-facing activities.", 
      points:[
        "No coercive or aggressive recovery tactics permitted",
        "Collection calls only between 8 AM and 7 PM local time",
        "Agents must carry identity cards and company authorization letters",
        "No contact with customer's employer without prior consent",
        "Repayment schedules renegotiated on genuine hardship grounds",
        "All customer communications recorded and stored for 3 years"
      ], 
      highlight:"We train all collection staff quarterly on ethical practices and customer rights, with performance reviews penalizing any violation." 
    },
    { 
      id:"terms",                
      title:"Terms & Conditions",                                
      short:"General legal terms governing all Ganesh Finance products.",            
      overview:"The Terms & Conditions form the legal foundation of every product and service offered by Ganesh Finance, ensuring clarity and protection for all parties.", 
      points:[
        "Governed by the laws of India; jurisdiction: registered state courts",
        "Service terms may be updated with 30-day advance notice",
        "Digital consent has same legal validity as physical signature",
        "Force majeure clause covers natural disasters, pandemics, and regulatory actions",
        "Dispute resolution via arbitration under Arbitration Act, 1996",
        "All amounts in Indian Rupees; GST/taxes borne by the customer"
      ], 
      highlight:"We recommend all customers read the Terms & Conditions carefully. Our Customer Care team is available to explain any clause in simple language." 
    },
    { 
      id:"csr",                  
      title:"CSR Policy",                                        
      short:"Community investment and social responsibility commitments.",            
      overview:"Ganesh Finance's CSR Policy reflects our commitment to giving back to the communities we serve. Since 2020, we have channeled resources into education, financial literacy, and local development.", 
      points:[
        "CSR spending in line with Companies Act 2013 guidelines (when applicable)",
        "Priority areas: financial literacy, rural education, women's empowerment",
        "Annual CSR report published on company website",
        "Employee volunteer programs — minimum 8 hours/year per staff",
        "Partnerships with local NGOs for last-mile community impact",
        "Focus on districts where Ganesh Finance has highest customer base"
      ], 
      highlight:"Ganesh Finance has conducted 50+ financial literacy workshops, reaching 5,000+ rural households since our founding in 2020." 
    },
    { 
      id:"statutory-auditors",   
      title:"Policy on Appointment of Statutory Auditors",       
      short:"Independence and rotation standards for statutory auditors.",           
      overview:"This policy ensures the selection of qualified, independent statutory auditors in compliance with the Companies Act, 2013 and RBI guidelines for NBFCs.", 
      points:[
        "Auditor selected by Audit Committee recommendation to Board",
        "Mandatory rotation every 5 years (or as per Companies Act provisions)",
        "No concurrent non-audit services that impair independence",
        "Auditor must hold valid ICAI Certificate of Practice",
        "Conflict of interest checks conducted before each appointment",
        "Audit fees approved by shareholders at AGM"
      ], 
      highlight:"Our Audit Committee independently evaluates all auditor candidates without management influence, ensuring complete objectivity." 
    },
    { 
      id:"human-rights",         
      title:"Human Rights Policy",                               
      short:"Zero tolerance for discrimination, exploitation, or forced labour.",    
      overview:"Ganesh Finance upholds universal human rights standards in all business operations, treating every employee, customer, and stakeholder with dignity and respect.", 
      points:[
        "Zero tolerance for child labour, forced labour, or trafficking",
        "Equal opportunity employer — no discrimination of any kind",
        "Safe workplace — POSH Act compliance with trained ICC",
        "Living wage standards applied across all contract staff",
        "Human rights due diligence in vendor and partner selection",
        "Annual human rights risk assessment conducted internally"
      ], 
      highlight:"We align our Human Rights Policy with the UN Guiding Principles on Business and Human Rights, setting a high standard for NBFCs in our sector." 
    },
    { 
      id:"responsible-advocacy", 
      title:"Policy on Responsible Advocacy",                    
      short:"Ethical engagement with regulators, industry bodies and media.",        
      overview:"Ganesh Finance engages with regulators, industry associations, and public forums responsibly — always ensuring our advocacy is transparent, evidence-based, and aligned with public interest.", 
      points:[
        "All regulatory submissions reviewed by Compliance Officer",
        "No undisclosed political contributions or lobbying expenditures",
        "Media communications through designated spokespeople only",
        "Industry association memberships disclosed in annual report",
        "Advocacy positions aligned with customer and societal benefit",
        "Annual review of advocacy activities by the Board"
      ], 
      highlight:"We believe responsible advocacy contributes to a healthier financial ecosystem and more inclusive regulatory environment for NBFCs." 
    },
    { 
      id:"diversity",            
      title:"Diversity, Inclusion & Equal Opportunity Policy",   
      short:"Building an inclusive, equitable workplace for all.",                   
      overview:"Ganesh Finance is committed to building a diverse and inclusive organization where every individual — regardless of background — can thrive and contribute to their fullest potential.", 
      points:[
        "Diversity targets for women in senior management roles",
        "Inclusive recruitment practices with blind screening where possible",
        "Accommodation for employees with disabilities",
        "Multicultural festivals and awareness programs throughout the year",
        "Anti-harassment training mandatory for all staff annually",
        "Diversity metrics reported to Board quarterly"
      ], 
      highlight:"We are proud that over 40% of our customer-facing staff are women, and we are actively working to increase representation at leadership levels." 
    },
    { 
      id:"stakeholders",         
      title:"Stakeholders Engagement Policy",                    
      short:"Structured engagement with all stakeholder groups.",                    
      overview:"Our Stakeholders Engagement Policy defines how Ganesh Finance identifies, communicates with, and incorporates feedback from all stakeholder groups in our decision-making process.", 
      points:[
        "Stakeholder mapping exercise conducted annually",
        "Dedicated engagement calendar for investors, customers, regulators",
        "Customer satisfaction surveys conducted bi-annually",
        "Employee engagement surveys with action-planning follow-up",
        "Community consultations before entering new geographies",
        "Annual Stakeholders Report published on company website"
      ], 
      highlight:"We view stakeholder engagement not as a compliance activity but as a strategic tool for building long-term organizational resilience." 
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ── ALL TRANSLATIONS (Copy template and translate)
// ═══════════════════════════════════════════════════════════════════════
const PT = {
  // English (Base language)
  en: TRANSLATION_TEMPLATE,

  // Hindi (पूरी तरह से अनुवादित)
  hi: {
    // UI Labels (jo aapke paas already hain)
    section_tag: "अनुपालन एवं शासन",
    section_title: "नीति",
    section_desc: "गणेश फाइनेंस हमारे व्यवसाय के हर पहलू में निष्पक्षता, पारदर्शिता और नियामक अनुपालन सुनिश्चित करने वाली नीतियों के एक व्यापक ढांचे के तहत संचालित होता है। किसी भी नीति के बारे में अधिक जानने के लिए उस पर क्लिक करें।",
    commitment_tag: "हमारी प्रतिबद्धता",
    commitment_title_1: "निष्पक्ष प्रथा",
    commitment_title_hl: "मूल में",
    commitment_sub: "2020 में अपनी स्थापना के बाद से, निष्पक्ष प्रथा गणेश फाइनेंस में हर निर्णय की आधारशिला रही है।",
    stat_assets: "प्रबंधन अधीन आस्तियां",
    stat_customers: "खुश ग्राहक",
    stat_founded: "स्थापित",
    card_tagline: "पारदर्शिता। विश्वास। अखंडता।",
    card_body: "गणेश फाइनेंस में हर ऋण, हर लेन-देन, हर इंटरैक्शन ऐसे सिद्धांतों द्वारा संचालित होता है जो हमारे ग्राहकों को सर्वोच्च प्राथमिकता देते हैं।",
    fp1_title: "डिफ़ॉल्ट रूप से पारदर्शी",
    fp1_body: "गणेश फाइनेंस में, हम हस्ताक्षर करने से पहले हर शुल्क, हर दर और हर शर्त का पूरा खुलासा करते हैं। हमारे ऋण दस्तावेज़ सरल भाषा में लिखे गए हैं — कोई भ्रमित करने वाला छोटा प्रिंट नहीं।",
    fp2_title: "ग्राहक-केंद्रित निर्णय",
    fp2_body: "हम जो भी नीति बनाते हैं, वह एक सरल प्रश्न से शुरू होती है: क्या यह हमारे ग्राहक के लिए निष्पक्ष है? लचीली पुनर्भुगतान से लेकर दीर्घकालिक उधारकर्ताओं के लिए शून्य-दंड पूर्व भुगतान तक, हमारी नीतियां आपकी जरूरतों के आसपास बनाई गई हैं।",
    fp3_title: "नियामक अनुपालन एक ताकत के रूप में",
    fp3_body: "भारतीय रिज़र्व बैंक द्वारा पंजीकृत और विनियमित, गणेश फाइनेंस अनुपालन को बोझ नहीं बल्कि प्रतिस्पर्धात्मक लाभ मानता है — यह प्रमाण है कि हम अखंडता के उच्चतम मानक पर संचालित होते हैं।",
    fp4_title: "हमारे समुदाय के साथ बढ़ते हुए",
    fp4_body: "2020 से, हम एक शाखा से बढ़कर 1,000+ ग्राहकों को सेवा दे रहे हैं। हमारा ₹1.5 करोड़ आस्ति आधार हमारे समुदाय द्वारा रखे गए विश्वास को दर्शाता है — वह विश्वास जिसकी हम इस पृष्ठ पर हर नीति के साथ रक्षा करते हैं।",
    modal_company: "गणेश फाइनेंस",
    modal_overview: "अवलोकन",
    modal_key: "मुख्य प्रावधान",
    modal_cta: "इस नीति के बारे में पूछताछ करें",
    modal_close: "बंद करें",
    view_details: "विवरण देखें",
    policies: [
      { 
        id:"fair-practices",       
        title:"निष्पक्ष प्रथाओं का कोड",                               
        short:"सभी ग्राहकों के लिए पारदर्शी, नैतिक ऋण मानक।",             
        overview:"गणेश फाइनेंस का निष्पक्ष प्रथाओं का कोड व्यापक दिशानिर्देश स्थापित करता है जो सुनिश्चित करता है कि सभी ऋण उत्पाद पूर्ण पारदर्शिता, निष्पक्षता और बिना किसी भेदभाव के पेश किए जाएं।", 
        points:[
          "स्वीकृति से पहले सभी ऋण शर्तों, ब्याज दरों और शुल्कों का स्पष्ट खुलासा",
          "कोई छिपे शुल्क नहीं — लिखित रूप में पूर्ण ब्रेकडाउन प्रदान किया गया",
          "जाति, धर्म, लिंग या क्षेत्र की परवाह किए बिना समान व्यवहार",
          "30 कार्य दिवसों के भीतर शिकायत निवारण",
          "बोर्ड ऑफ डायरेक्टर्स द्वारा कोड का वार्षिक समीक्षण और अपडेट",
          "ऋण वितरण से पहले ग्राहक की स्वीकृति अनिवार्य"
        ], 
        highlight:"हमारा निष्पक्ष प्रथाओं का कोड आरबीआई दिशानिर्देशों के अनुरूप सुनिश्चित करने के लिए वार्षिक रूप से समीक्षित किया जाता है और हमारे बोर्ड ऑफ डायरेक्टर्स द्वारा अनुमोदित किया जाता है।" 
      },
      { 
        id:"code-of-conduct",      
        title:"आचार संहिता",                                   
        short:"सभी स्टाफ और एजेंट्स के लिए बाध्यकारी व्यावसायिक आचरण मानक।",           
        overview:"हमारी आचार संहिता वह नैतिक ढांचा परिभाषित करती है जिसके भीतर गणेश फाइनेंस का हर कर्मचारी, एजेंट और पार्टनर संचालित होता है — नीचे से विश्वास का निर्माण करता है।", 
        points:[
          "रिश्वतखोरी, भ्रष्टाचार या अनैतिक आग्रह के लिए शून्य सहनशीलता",
          "सभी स्टाफ सदस्यों के लिए अनिवार्य वार्षिक नैतिक प्रशिक्षण",
          "सभी ग्राहक जानकारी के लिए गोपनीयता दायित्व",
          "हितों के टकराव का खुलासा प्रोटोकॉल",
          "हर स्तर पर उल्लंघनों के लिए अनुशासनात्मक कार्रवाई मैट्रिक्स",
          "सच्ची रिपोर्ट करने वालों के लिए व्हिसलब्लोअर सुरक्षा गारंटीड"
        ], 
        highlight:"कर्मचारियों को वार्षिक रूप से आचार संहिता पर हस्ताक्षर और स्वीकार करना आवश्यक है, और उल्लंघनों को संरचित, निष्पक्ष अनुशासनात्मक प्रक्रिया के माध्यम से संबोधित किया जाता है।" 
      },
      { 
        id:"interest-rate",        
        title:"ब्याज दर नीति",                              
        short:"आरबीआई-अनुपालन, पारदर्शी ब्याज दर ढांचा।",                   
        overview:"गणेश फाइनेंस बोर्ड-अनुमोदित ब्याज दर नीति का पालन करता है जो सभी क्रेडिट उत्पादों के लिए प्रतिस्पर्धी, पारदर्शी और आरबीआई-अनुपालन मूल्य निर्धारण सुनिश्चित करता है।", 
        points:[
          "ब्याज दरें एसेट लायबिलिटी मैनेजमेंट कमिटी (ALCO) द्वारा निर्धारित",
          "फंड की लागत, जोखिम प्रीमियम और बाजार बेंचमार्क के आधार पर दरें",
          "कोई भेदभावपूर्ण दरें नहीं — एक ही उत्पाद, सभी ग्राहकों के लिए समान शर्तें",
          "ब्याज दर परिवर्तन कम से कम 30 दिन पहले सूचित किए जाते हैं",
          "गोल्ड लोन दरें प्रमुख एनबीएफसी और बैंकों के साथ प्रतिस्पर्धी",
          "प्रोसेसिंग फीस और पूर्व भुगतान शुल्क पहले से खुलासा किया गया"
        ], 
        highlight:"सभी दर संशोधन आरबीआई एनबीएफसी नियमों के अनुसार रिपोर्ट किए जाते हैं और पूरी सार्वजनिक पारदर्शिता के लिए हमारी वेबसाइट पर प्रकाशित किए जाते हैं।" 
      },
      { 
        id:"privacy",              
        title:"गोपनीयता नीति",                                    
        short:"आपका डेटा आईटी एक्ट और आरबीआई डेटा दिशानिर्देशों के तहत सुरक्षित।",             
        overview:"गणेश फाइनेंस ग्राहक गोपनीयता को मौलिक अधिकार मानता है। हमारी गोपनीयता नीति यह नियंत्रित करती है कि हम व्यक्तिगत और वित्तीय जानकारी कैसे एकत्र, उपयोग, संग्रहीत और सुरक्षित करते हैं।", 
        points:[
          "डेटा केवल बताए गए, विशिष्ट ऋण उद्देश्यों के लिए एकत्र किया जाता है",
          "ग्राहक डेटा की बिना सहमति के तीसरे पक्ष को बिक्री या साझा नहीं",
          "सभी डिजिटल लेन-देन के लिए एंड-टू-एंड एन्क्रिप्शन",
          "ग्राहक किसी भी समय डेटा सुधार या हटाने का अनुरोध कर सकते हैं",
          "डेटा प्रतिधारण नीति आरबीआई और आईटी एक्ट आवश्यकताओं के अनुरूप",
          "स्वतंत्र साइबर सुरक्षा फर्मों द्वारा नियमित सुरक्षा ऑडिट"
        ], 
        highlight:"हम सूचना प्रौद्योगिकी अधिनियम, 2000 और एनबीएफसी के लिए आरबीआई डेटा गोपनीयता दिशानिर्देशों का पूर्ण अनुपालन करते हैं।" 
      },
      { 
        id:"vigil-mechanism",      
        title:"सतर्कता तंत्र",                                   
        short:"चिंताओं की रिपोर्टिंग के लिए सुरक्षित व्हिसलब्लोअर चैनल।",                    
        overview:"हमारा सतर्कता तंत्र कर्मचारियों, ग्राहकों और हितधारकों के लिए अनैतिक व्यवहार, धोखाधड़ी या नीति उल्लंघनों की रिपोर्ट करने के लिए संरचित, गोपनीय चैनल प्रदान करता है।", 
        points:[
          "समर्पित ईमेल और हॉटलाइन के माध्यम से गुमनाम रिपोर्टिंग उपलब्ध",
          "सभी शिकायतों की स्वतंत्र समिति द्वारा जांच",
          "व्हिसलब्लोअर की पहचान सख्ती से गोपनीय रखी जाती है",
          "सच्ची रिपोर्ट करने वालों के खिलाफ कोई प्रतिशोध, डिमोशन या प्रतिकूल कार्रवाई नहीं",
          "मानक मामलों के लिए समाधान समयसीमा: 45 कार्य दिवस",
          "अनसुलझे मामलों में बोर्ड ऑडिट कमिटी को एस्केलेशन"
        ], 
        highlight:"सतर्कता तंत्र सीधे हमारे बोर्ड की ऑडिट कमिटी द्वारा देखरेख किया जाता है, जो प्रबंधन प्रभाव से स्वतंत्रता सुनिश्चित करता है।" 
      },
      { 
        id:"investor-policy",      
        title:"निवेशकों के लिए नीति",                              
        short:"निष्पक्ष, समयबद्ध और पारदर्शी निवेशक संचार।",                  
        overview:"गणेश फाइनेंस नियमित खुलासे, निष्पक्ष व्यवहार और सभी लागू कॉर्पोरेट गवर्नेंस मानकों का पालन करके दीर्घकालिक निवेशक विश्वास बनाने के लिए प्रतिबद्ध है।", 
        points:[
          "सभी पंजीकृत निवेशकों के साथ त्रैमासिक वित्तीय अपडेट साझा",
          "वित्तीय वर्ष समाप्ति के 6 महीने के भीतर वार्षिक सामान्य बैठक",
          "महत्वपूर्ण विकास 24 घंटे के भीतर कंपनी वेबसाइट पर खुलासा",
          "निवेशक शिकायत निवारण 15 कार्य दिवसों के भीतर",
          "सेबी और आरबीआई रिपोर्टिंग मानकों का सख्त पालन",
          "पूछताछ के लिए समर्पित निवेशक संबंध संपर्क"
        ], 
        highlight:"गणेश फाइनेंस एक मजबूत गवर्नेंस संरचना बनाए रखता है जो निवेशक अधिकारों की रक्षा करता है साथ ही सभी हितधारकों के लिए सतत व्यवसाय विकास सुनिश्चित करता है।" 
      },
      { 
        id:"securities-trading",   
        title:"सिक्योरिटी ट्रेडिंग नियम",                          
        short:"इनसाइडर ट्रेडिंग रोकथाम और अनुपालन ढांचा।",                  
        overview:"हमारे सिक्योरिटी ट्रेडिंग नियम इनसाइडर ट्रेडिंग को रोकते हैं और सुनिश्चित करते हैं कि कनेक्टेड व्यक्तियों द्वारा सभी बाजार गतिविधियां सेबी नियमों का अनुपालन करें।", 
        points:[
          "निर्धारित व्यक्तियों की सूची बनाई और त्रैमासिक अपडेट की जाती है",
          "निर्धारित सीमाओं से ऊपर ट्रेड के लिए अनिवार्य पूर्व मंजूरी",
          "वित्तीय परिणाम घोषणा से पहले ट्रेडिंग विंडो ब्लैकआउट अवधि",
          "उल्लंघन के लिए दंड: तत्काल निलंबन और कानूनी कार्रवाई",
          "सभी निर्धारित व्यक्तियों से वार्षिक अनुपालन प्रमाणन अनिवार्य",
          "सेबी पीआईटी नियमों पर नियमित जागरूकता कार्यक्रम"
        ], 
        highlight:"हमारा अनुपालन अधिकारी सभी निर्धारित व्यक्तियों के ट्रेड की निगरानी करता है और त्रैमासिक आधार पर ऑडिट कमिटी को रिपोर्ट करता है।" 
      },
      { 
        id:"app-disclaimer",       
        title:"ऐप अस्वीकरण",                                    
        short:"मोबाइल ऐप उपयोग शर्तें, डेटा और दायित्व खंड।",                   
        overview:"गणेश फाइनेंस मोबाइल एप्लिकेशन सुविधा उपकरण के रूप में प्रदान किया गया है। यह अस्वीकरण उपयोग की शर्तें, दायित्व की सीमाएं और उपयोगकर्ता जिम्मेदारियां बताता है।", 
        points:[
          "ऐप केवल सूचनात्मक और आवेदन उद्देश्यों के लिए है",
          "ऋण स्वीकृति भौतिक सत्यापन और क्रेडिट मूल्यांकन के अधीन",
          "स्क्रीनशॉट या ऐप आउटपुट कानूनी रूप से बाध्यकारी दस्तावेज नहीं",
          "ऐप प्रदर्शन नेटवर्क और डिवाइस स्थितियों के अधीन",
          "अनधिकृत पहुंच से होने वाले नुकसान के लिए गणेश फाइनेंस उत्तरदायी नहीं",
          "अपडेट सुविधाएं बदल सकते हैं; निरंतर उपयोग स्वीकृति का अर्थ है"
        ], 
        highlight:"आधिकारिक ऋण स्वीकृति पत्र और बाध्यकारी समझौतों के लिए केवल हमारे पंजीकृत कार्यालय द्वारा जारी दस्तावेज ही कानूनी वैधता रखते हैं।" 
      },
      { 
        id:"auction-policy",       
        title:"नीलामी नीति",                                    
        short:"पारदर्शी, आरबीआई-अनुपालन गोल्ड नीलामी प्रक्रिया।",                   
        overview:"ऋण चूक के मामलों में, गणेश फाइनेंस सख्त, आरबीआई-निर्देशित नीलामी नीति का पालन करता है जो ग्राहकों के साथ निष्पक्ष व्यवहार और गिरवी सोने की पारदर्शी नीलामी सुनिश्चित करता है।", 
        points:[
          "नीलामी प्रक्रिया शुरू करने से पहले न्यूनतम 14 दिन का लिखित नोटिस",
          "केवल प्रमाणित लाइसेंस्ड नीलामीकर्ताओं द्वारा नीलामी आयोजित",
          "ग्राहक को नीलामी तिथि, स्थान और रिजर्व प्राइस की सूचना",
          "अधिशेष आय (यदि कोई) 7 कार्य दिवसों के भीतर ग्राहक को लौटाई जाती है",
          "नीलामी रिकॉर्ड बनाए रखे और ग्राहक निरीक्षण के लिए उपलब्ध",
          "ग्राहक नीलामी शुरू होने तक गिरवी सोना रिडीम कर सकते हैं"
        ], 
        highlight:"हमारी नीलामी नीति आरबीआई गोल्ड लोन मास्टर सर्कुलर का सख्त पालन करती है और नीलामी का सहारा लेने से पहले ग्राहक बकाया की अधिकतम वसूली सुनिश्चित करती है।" 
      },
      { 
        id:"loan-policy",          
        title:"ऋण नीति",                                       
        short:"पात्रता, स्वीकृति, वितरण और वसूली मानदंड।",               
        overview:"गणेश फाइनेंस ऋण नीति पूरे क्रेडिट जीवनचक्र को नियंत्रित करती है — पात्रता मूल्यांकन और स्वीकृति से लेकर वितरण, निगरानी और वसूली तक।", 
        points:[
          "सभी ऋण आवेदनों के लिए केवाईसी और आय सत्यापन अनिवार्य",
          "आरबीआई मानदंडों के अनुसार गोल्ड लोन एलटीवी अनुपात अधिकतम 75%",
          "स्वामित्व स्कोरिंग और ब्यूरो डेटा का उपयोग करके क्रेडिट मूल्यांकन",
          "दस्तावेज सत्यापन के 24 घंटे के भीतर वितरण",
          "कृषि और मौसमी उधारकर्ताओं के लिए ईएमआई छुट्टी उपलब्ध",
          "आरबीआई एनबीएफसी प्रूडेंशियल मानदंडों के अनुसार एनपीए वर्गीकरण"
        ], 
        highlight:"हमारी ऋण नीति जोखिम प्रबंधन समिति द्वारा अर्धवार्षिक समीक्षा की जाती है ताकि वर्तमान बाजार स्थितियों और नियामक आवश्यकताओं को प्रतिबिंबित किया जा सके।" 
      },
      { 
        id:"code-fair-practices",  
        title:"निष्पक्ष प्रथाओं का कोड",                            
        short:"उधारकर्ताओं, संग्रह एजेंटों और स्टाफ के साथ नैतिक व्यवहार।",         
        overview:"हमारे मुख्य नैतिक ढांचे का विस्तार, यह कोड संग्रह, फील्ड ऑपरेशनों और ग्राहक-सामना गतिविधियों में निष्पक्ष व्यवहार प्रथाओं को विशेष रूप से संबोधित करता है।", 
        points:[
          "कोई जबरदस्ती या आक्रामक वसूली रणनीति अनुमत नहीं",
          "संग्रह कॉल केवल स्थानीय समय सुबह 8 बजे से शाम 7 बजे तक",
          "एजेंटों को पहचान पत्र और कंपनी प्राधिकरण पत्र ले जाना अनिवार्य",
          "ग्राहक के नियोक्ता से पूर्व सहमति के बिना संपर्क नहीं",
          "वास्तविक कठिनाई के आधार पर पुनर्भुगतान अनुसूची पर पुनर्विचार",
          "सभी ग्राहक संचार 3 वर्ष तक रिकॉर्ड और संग्रहीत"
        ], 
        highlight:"हम सभी संग्रह स्टाफ को नैतिक प्रथाओं और ग्राहक अधिकारों पर त्रैमासिक प्रशिक्षण देते हैं, और प्रदर्शन समीक्षा में किसी भी उल्लंघन पर दंड लगाया जाता है।" 
      },
      { 
        id:"terms",                
        title:"शर्तें एवं नियम",                                
        short:"गणेश फाइनेंस के सभी उत्पादों को नियंत्रित करने वाले सामान्य कानूनी नियम।",            
        overview:"शर्तें एवं नियम गणेश फाइनेंस द्वारा पेश किए गए हर उत्पाद और सेवा की कानूनी नींव बनाते हैं, जो सभी पक्षों के लिए स्पष्टता और सुरक्षा सुनिश्चित करते हैं।", 
        points:[
          "भारत के कानूनों द्वारा शासित; क्षेत्राधिकार: पंजीकृत राज्य अदालतें",
          "सेवा शर्तें 30 दिन पहले सूचना के साथ अपडेट की जा सकती हैं",
          "डिजिटल सहमति का कानूनी वैधता भौतिक हस्ताक्षर के समान",
          "फोर्स मेज्योर खंड में प्राकृतिक आपदाएं, महामारी और नियामक कार्रवाई शामिल",
          "आर्बिट्रेशन एक्ट, 1996 के तहत मध्यस्थता द्वारा विवाद समाधान",
          "सभी राशियां भारतीय रुपये में; जीएसटी/कर ग्राहक द्वारा वहन"
        ], 
        highlight:"हम सभी ग्राहकों को शर्तें एवं नियम सावधानीपूर्वक पढ़ने की सलाह देते हैं। हमारी कस्टमर केयर टीम किसी भी खंड को सरल भाषा में समझाने के लिए उपलब्ध है।" 
      },
      { 
        id:"csr",                  
        title:"सीएसआर नीति",                                        
        short:"समुदाय निवेश और सामाजिक जिम्मेदारी प्रतिबद्धताएं।",            
        overview:"गणेश फाइनेंस की सीएसआर नीति उन समुदायों को लौटाने की हमारी प्रतिबद्धता को दर्शाती है जिनकी हम सेवा करते हैं। 2020 से, हमने शिक्षा, वित्तीय साक्षरता और स्थानीय विकास में संसाधन लगाए हैं।", 
        points:[
          "कंपनियों अधिनियम 2013 दिशानिर्देशों के अनुसार सीएसआर व्यय (जब लागू)",
          "प्राथमिक क्षेत्र: वित्तीय साक्षरता, ग्रामीण शिक्षा, महिला सशक्तिकरण",
          "वार्षिक सीएसआर रिपोर्ट कंपनी वेबसाइट पर प्रकाशित",
          "कर्मचारी स्वयंसेवी कार्यक्रम — प्रति स्टाफ न्यूनतम 8 घंटे/वर्ष",
          "लास्ट-माइल समुदाय प्रभाव के लिए स्थानीय एनजीओ के साथ साझेदारी",
          "उन जिलों पर फोकस जहां गणेश फाइनेंस का सबसे बड़ा ग्राहक आधार है"
        ], 
        highlight:"गणेश फाइनेंस ने 2020 में स्थापना के बाद से 50+ वित्तीय साक्षरता कार्यशालाएं आयोजित की हैं, जिनसे 5,000+ ग्रामीण परिवारों तक पहुंच हुई है।" 
      },
      { 
        id:"statutory-auditors",   
        title:"स्टेट्यूटरी ऑडिटर्स की नियुक्ति पर नीति",       
        short:"स्टेट्यूटरी ऑडिटर्स के लिए स्वतंत्रता और रोटेशन मानक।",           
        overview:"यह नीति कंपनियों अधिनियम, 2013 और एनबीएफसी के लिए आरबीआई दिशानिर्देशों का अनुपालन करते हुए योग्य, स्वतंत्र स्टेट्यूटरी ऑडिटर्स का चयन सुनिश्चित करती है।", 
        points:[
          "ऑडिट कमिटी की सिफारिश पर बोर्ड द्वारा ऑडिटर चुना जाता है",
          "हर 5 वर्ष में अनिवार्य रोटेशन (या कंपनियों अधिनियम प्रावधानों के अनुसार)",
          "स्वतंत्रता प्रभावित करने वाली कोई समवर्ती नॉन-ऑडिट सेवाएं नहीं",
          "ऑडिटर के पास वैध आईसीएआई प्रैक्टिस सर्टिफिकेट होना चाहिए",
          "हर नियुक्ति से पहले हितों के टकराव की जांच",
          "एजीएम में शेयरधारकों द्वारा ऑडिट फीस अनुमोदित"
        ], 
        highlight:"हमारी ऑडिट कमिटी प्रबंधन प्रभाव के बिना सभी ऑडिटर उम्मीदवारों का स्वतंत्र मूल्यांकन करती है, जो पूर्ण निष्पक्षता सुनिश्चित करती है।" 
      },
      { 
        id:"human-rights",         
        title:"मानव अधिकार नीति",                               
        short:"भेदभाव, शोषण या जबरन श्रम के लिए शून्य सहनशीलता।",    
        overview:"गणेश फाइनेंस सभी व्यवसाय संचालन में सार्वभौमिक मानव अधिकार मानकों का पालन करता है और हर कर्मचारी, ग्राहक और हितधारक के साथ सम्मान और गरिमा का व्यवहार करता है।", 
        points:[
          "बाल श्रम, जबरन श्रम या तस्करी के लिए शून्य सहनशीलता",
          "समान अवसर नियोक्ता — किसी भी प्रकार का भेदभाव नहीं",
          "सुरक्षित कार्यस्थल — प्रशिक्षित आईसीसी के साथ POSH एक्ट अनुपालन",
          "सभी ठेका स्टाफ पर लिविंग वेज मानक लागू",
          "विक्रेता और पार्टनर चयन में मानव अधिकार ड्यू डिलिजेंस",
          "वार्षिक मानव अधिकार जोखिम मूल्यांकन आंतरिक रूप से किया जाता है"
        ], 
        highlight:"हम अपनी मानव अधिकार नीति को संयुक्त राष्ट्र व्यापार और मानव अधिकारों पर निर्देशक सिद्धांतों के साथ संरेखित करते हैं, जो हमारे क्षेत्र में एनबीएफसी के लिए उच्च मानक स्थापित करता है।" 
      },
      { 
        id:"responsible-advocacy", 
        title:"जिम्मेदार पैरवी पर नीति",                    
        short:"नियामकों, उद्योग निकायों और मीडिया के साथ नैतिक जुड़ाव।",        
        overview:"गणेश फाइनेंस नियामकों, उद्योग संघों और सार्वजनिक मंचों के साथ जिम्मेदारी से जुड़ाव करता है — हमेशा सुनिश्चित करता है कि हमारी पैरवी पारदर्शी, प्रमाण-आधारित और सार्वजनिक हित के अनुरूप हो।", 
        points:[
          "सभी नियामक सबमिशन अनुपालन अधिकारी द्वारा समीक्षित",
          "कोई गैर-खुलासा राजनीतिक योगदान या लॉबिंग व्यय नहीं",
          "मीडिया संचार केवल नामित प्रवक्ताओं के माध्यम से",
          "उद्योग संघ सदस्यताएं वार्षिक रिपोर्ट में खुलासा",
          "पैरवी स्थितियां ग्राहक और सामाजिक लाभ के अनुरूप",
          "बोर्ड द्वारा पैरवी गतिविधियों का वार्षिक समीक्षण"
        ], 
        highlight:"हम मानते हैं कि जिम्मेदार पैरवी स्वस्थ वित्तीय पारिस्थितिकी तंत्र और एनबीएफसी के लिए अधिक समावेशी नियामक वातावरण में योगदान देती है।" 
      },
      { 
        id:"diversity",            
        title:"विविधता, समावेशन एवं समान अवसर नीति",   
        short:"सभी के लिए समावेशी, समान कार्यस्थल का निर्माण।",                   
        overview:"गणेश फाइनेंस एक विविध और समावेशी संगठन बनाने के लिए प्रतिबद्ध है जहां हर व्यक्ति — पृष्ठभूमि की परवाह किए बिना — अपनी पूरी क्षमता से फल-फूल सके और योगदान दे सके।", 
        points:[
          "सीनियर मैनेजमेंट भूमिकाओं में महिलाओं के लिए विविधता लक्ष्य",
          "ब्लाइंड स्क्रीनिंग जहां संभव हो समावेशी भर्ती प्रथाएं",
          "दिव्यांग कर्मचारियों के लिए आवास",
          "पूरे वर्ष बहुसांस्कृतिक त्योहार और जागरूकता कार्यक्रम",
          "सभी स्टाफ के लिए अनिवार्य वार्षिक एंटी-हरासमेंट प्रशिक्षण",
          "विविधता मीट्रिक्स बोर्ड को त्रैमासिक रिपोर्ट"
        ], 
        highlight:"हम गर्व से कहते हैं कि हमारे कस्टमर-फेसिंग स्टाफ में 40% से अधिक महिलाएं हैं, और हम नेतृत्व स्तर पर प्रतिनिधित्व बढ़ाने के लिए सक्रिय रूप से काम कर रहे हैं।" 
      },
      { 
        id:"stakeholders",         
        title:"हितधारकों की सहभागिता नीति",                    
        short:"सभी हितधारक समूहों के साथ संरचित सहभागिता।",                    
        overview:"हमारी हितधारकों की सहभागिता नीति परिभाषित करती है कि गणेश फाइनेंस कैसे सभी हितधारक समूहों की पहचान करता है, उनके साथ संचार करता है और निर्णय लेने की प्रक्रिया में उनकी प्रतिक्रिया को शामिल करता है।", 
        points:[
          "वार्षिक हितधारक मैपिंग व्यायाम",
          "निवेशकों, ग्राहकों, नियामकों के लिए समर्पित सहभागिता कैलेंडर",
          "द्विवार्षिक ग्राहक संतुष्टि सर्वेक्षण",
          "कर्मचारी सहभागिता सर्वेक्षण और एक्शन-प्लानिंग फॉलो-अप",
          "नए भौगोलिक क्षेत्रों में प्रवेश से पहले समुदाय परामर्श",
          "कंपनी वेबसाइट पर वार्षिक हितधारक रिपोर्ट प्रकाशित"
        ], 
        highlight:"हम हितधारक सहभागिता को अनुपालन गतिविधि नहीं बल्कि दीर्घकालिक संगठनात्मक लचीलापन बनाने का रणनीतिक उपकरण मानते हैं।" 
      },
    ],
  },
mr:{
  section_tag: "अनुपालन आणि शासन",
  section_title: "धोरण",
  section_desc: "गणेश फायनान्स आमच्या व्यवसायाच्या प्रत्येक पैलूमध्ये निष्पक्षता, पारदर्शकता आणि नियामक अनुपालन सुनिश्चित करणाऱ्या धोरणांच्या सर्वसमावेशक चौकटी अंतर्गत कार्य करते. अधिक जाणून घेण्यासाठी कोणत्याही धोरणावर क्लिक करा.",
  commitment_tag: "आमची बांधिलकी",
  commitment_title_1: "निष्पक्ष प्रथा ",
  commitment_title_hl: "मुख्य",
  commitment_sub: "२०२० मध्ये आमच्या स्थापनेपासून, निष्पक्ष प्रथा गणेश फायनान्समधील प्रत्येक निर्णयाची पायाभूत राहिली आहे.",
  stat_assets: "व्यवस्थापनाखालील मालमत्ता",
  stat_customers: "खुश ग्राहक",
  stat_founded: "स्थापना",
  card_tagline: "पारदर्शकता. विश्वास. अखंडता.",
  card_body: "गणेश फायनान्समधील प्रत्येक कर्ज, प्रत्येक व्यवहार, प्रत्येक संवाद अशा तत्त्वांद्वारे नियंत्रित केला जातो जे आमच्या ग्राहकांना प्रथम स्थान देतात.",
  fp1_title: "पूर्वनिर्धारितपणे पारदर्शक",
  fp1_body: "गणेश फायनान्समध्ये, आम्ही तुम्ही सही करण्यापूर्वी प्रत्येक शुल्क, प्रत्येक दर आणि प्रत्येक अट उघड करतो. आमचे कर्ज दस्तऐवज साध्या भाषेत लिहिलेले आहेत — गोंधळ घालण्यासाठी डिझाइन केलेले बारीक मुद्रण नाही.",
  fp2_title: "ग्राहक-केंद्रित निर्णय",
  fp2_body: "आम्ही तयार करत असलेले प्रत्येक धोरण एका साध्या प्रश्नाने सुरू होते: हे आमच्या ग्राहकांसाठी निष्पक्ष आहे का? लवचिक परतफेडपासून दीर्घकालीन कर्जदारांसाठी शून्य दंड पूर्वभरणा पर्यंत, आमची धोरणे तुमच्या गरजांभोवती तयार केली आहेत.",
  fp3_title: "नियामक अनुपालन एक शक्ती म्हणून",
  fp3_body: "भारतीय रिझर्व बँकेने नोंदणीकृत आणि नियंत्रित, गणेश फायनान्स अनुपालनाला बोझ म्हणून नव्हे तर स्पर्धात्मक फायद्य म्हणून मानते — आम्ही सर्वोच्च अखंडतेच्या मानकावर कार्य करत असल्याचे पुरावा.",
  fp4_title: "आमच्या समुदायासोबत वाढ",
  fp4_body: "२०२० पासून, आम्ही एका शाखेपासून १,०००+ ग्राहकांना सेवा देण्यापर्यंत वाढलो आहोत. आमची ₹१.५ कोटी मालमत्ता आधार आमच्या समुदायाने आमच्यावर ठेवलेल्या विश्वासाचे प्रतिबिंब आहे — आम्ही या पृष्ठावरील प्रत्येक धोरणाने जे संरक्षण करतो.",
  modal_company: "गणेश फायनान्स",
  modal_overview: "आढावा",
  modal_key: "मुख्य तरतुदी",
  modal_cta: "या धोरणाबद्दल चौकशी करा",
  modal_close: "बंद करा",
  view_details: "तपशील पहा",
  policies: [
    {
      id:"fair-practices",
      title:"निष्पक्ष प्रथा संहिता",
      short:"सर्व ग्राहकांसाठी पारदर्शक, नैतिक कर्ज मानके.",
      overview:"गणेश फायनान्सची निष्पक्ष प्रथा संहिता सर्व कर्ज उत्पादने पूर्ण पारदर्शकता, निष्पक्षता आणि कोणत्याही भेदभावपूर्ण प्रथांशिवाय ऑफर करण्यासाठी सर्वसमावेशक मार्गदर्शक तत्त्वे स्थापित करते.",
      points:[
        "कर्ज अटी, व्याज दर आणि शुल्कांची स्पष्ट उघड करणे मंजुरीपूर्वी",
        "कोणतेही लपलेले शुल्क नाही — लेखी पूर्ण ब्रेकडाउन प्रदान",
        "जात, धर्म, लिंग किंवा प्रदेश याकडे दुर्लक्ष न करता समान व्यवहार",
        "३० कार्य दिवसांत तक्रार निवारण",
        "बोर्ड ऑफ डायरेक्टर्स द्वारे वार्षिक पुनरावलोकन आणि संहितेचा अद्यतन",
        "कर्ज वितरणापूर्वी ग्राहकाची पावती आवश्यक"
      ],
      highlight:"आमची निष्पक्ष प्रथा संहिता आरबीआय मार्गदर्शक तत्त्वांशी संरेखित सुनिश्चित करण्यासाठी वार्षिक पुनरावलोकन केली जाते आणि आमच्या बोर्ड ऑफ डायरेक्टर्स द्वारे मंजूर केली जाते."
    },
    {
      id:"code-of-conduct",
      title:"आचार संहिता",
      short:"सर्व कर्मचारी आणि एजंट्ससाठी बंधनकारक व्यावसायिक आचार मानके.",
      overview:"आमची आचार संहिता प्रत्येक गणेश फायनान्स कर्मचारी, एजंट आणि भागीदार ज्या नैतिक चौकटीत कार्य करतो ती व्याख्या करते — पायापासून विश्वास निर्माण करते.",
      points:[
        "लाच, भ्रष्टाचार किंवा अनैतिक याचनेसाठी शून्य सहनशीलता",
        "सर्व कर्मचाऱ्यांसाठी अनिवार्य वार्षिक नैतिकता प्रशिक्षण",
        "सर्व ग्राहक माहितीसाठी गोपनीयता बंधने",
        "हितसंबंध संघर्ष प्रकटीकरण प्रोटोकॉल",
        "प्रत्येक स्तरावरील उल्लंघनांसाठी अनुशासनिक कारवाई मॅट्रिक्स",
        "चांगल्या विश्वासाने रिपोर्ट करणाऱ्यांसाठी व्हिसलब्लोअर संरक्षण हमी"
      ],
      highlight:"कर्मचाऱ्यांना वार्षिक आचार संहिता सही करून कबूल करावी लागते, आणि उल्लंघनांना संरचित, निष्पक्ष अनुशासनिक प्रक्रियेद्वारे हाताळले जाते."
    },
    {
      id:"interest-rate",
      title:"व्याज दर धोरण",
      short:"आरबीआय-अनुपालन, पारदर्शक व्याज दर चौकट.",
      overview:"गणेश फायनान्स बोर्ड-मंजूर व्याज दर धोरणाचे पालन करते जे सर्व क्रेडिट उत्पादनांसाठी स्पर्धात्मक, पारदर्शक आणि आरबीआय-अनुपालन किंमत सुनिश्चित करते.",
      points:[
        "एसेट लायबिलिटी मॅनेजमेंट कमिटी (ALCO) द्वारे व्याज दर निश्चित",
        "निधी खर्च, जोखीम प्रीमियम आणि बाजार बेंचमार्क्सवर आधारित दर",
        "भेदभावपूर्ण दर नाही — समान उत्पादन, सर्व ग्राहकांसाठी समान अटी",
        "व्याज दर बदल किमान ३० दिवस आधी कळवले जातात",
        "गोल्ड लोन दर अग्रगण्य एनबीएफसी आणि बँकांसोबत स्पर्धात्मक",
        "प्रोसेसिंग फी आणि पूर्वभरणा शुल्क आगाऊ उघड"
      ],
      highlight:"सर्व दर सुधारणा आरबीआय एनबीएफसी नियमांनुसार रिपोर्ट केल्या जातात आणि पूर्ण सार्वजनिक पारदर्शकतेसाठी आमच्या वेबसाइटवर प्रकाशित केल्या जातात."
    },
    {
      id:"privacy",
      title:"गोपनीयता धोरण",
      short:"तुमचे डेटा आयटी कायद्य आणि आरबीआय डेटा मार्गदर्शक तत्त्वांखाली संरक्षित.",
      overview:"गणेश फायनान्स ग्राहक गोपनीयता मूलभूत हक्क म्हणून मानते. आमचे गोपनीयता धोरण आम्ही वैयक्तिक आणि आर्थिक माहिती कशी गोळा करतो, वापरतो, साठवतो आणि संरक्षित करतो हे नियंत्रित करते.",
      points:[
        "डेटा केवळ नमूद, विशिष्ट कर्ज उद्देशांसाठी गोळा केला जातो",
        "ग्राहक डेटा तृतीय पक्षांसोबत विक्री किंवा शेअरिंग संमतीशिवाय नाही",
        "सर्व डिजिटल व्यवहारांसाठी एंड-टू-एंड एन्क्रिप्शन",
        "ग्राहक कोणत्याही वेळी डेटा सुधारणा किंवा हटवणे विनंती करू शकतात",
        "डेटा धारणा धोरण आरबीआय आणि आयटी कायद्याच्या आवश्यकतांशी संरेखित",
        "स्वतंत्र सायबरसुरक्षा कंपन्यांद्वारे नियमित सुरक्षा ऑडिट"
      ],
      highlight:"आम्ही माहिती तंत्रज्ञान कायदा, २००० आणि एनबीएफसी साठी आरबीआय गोपनीयता मार्गदर्शक तत्त्वांशी पूर्ण अनुपालन करतो."
    },
    {
      id:"vigil-mechanism",
      title:"सतर्कता यंत्रणा",
      short:"चिंता रिपोर्ट करण्यासाठी सुरक्षित व्हिसलब्लोअर चॅनेल.",
      overview:"आमची सतर्कता यंत्रणा कर्मचारी, ग्राहक आणि स्टेकहोल्डर्सना अनैतिक वर्तन, फसवणूक किंवा धोरण उल्लंघनाबद्दल खऱ्या चिंता रिपोर्ट करण्यासाठी संरचित, गोपनीय चॅनेल प्रदान करते.",
      points:[
        "समर्पित ईमेल आणि हॉटलाइनद्वारे अनामिक रिपोर्टिंग उपलब्ध",
        "सर्व तक्रारी स्वतंत्र समितीद्वारे तपासल्या जातात",
        "व्हिसलब्लोअर ओळख कडक गोपनीय ठेवली जाते",
        "चांगल्या विश्वासाने रिपोर्ट करणाऱ्यांविरुद्ध कोणतेही प्रतिशोध, पदावनती किंवा प्रतिकूल कारवाई नाही",
        "रिझोल्यूशन टाइमलाइन: मानक प्रकरणांसाठी ४५ कार्य दिवस",
        "निराकरण न झाल्यास बोर्ड ऑडिट कमिटीकडे एस्कलेशन"
      ],
      highlight:"सतर्कता यंत्रणा थेट आमच्या बोर्डच्या ऑडिट कमिटी द्वारे देखरेख केली जाते, ज्यामुळे व्यवस्थापन प्रभावापासून स्वातंत्र्य सुनिश्चित होते."
    },
    {
      id:"investor-policy",
      title:"गुंतवणूकदारांसाठी धोरण",
      short:"निष्पक्ष, वेळेवर आणि पारदर्शक गुंतवणूकदार संवाद.",
      overview:"गणेश फायनान्स नियमित प्रकटीकरण, निष्पक्ष व्यवहार आणि सर्व लागू कॉर्पोरेट गव्हर्नन्स मानकांचे पालन करून दीर्घकालीन गुंतवणूकदार विश्वास निर्माण करण्यासाठी वचनबद्ध आहे.",
      points:[
        "सर्व नोंदणीकृत गुंतवणूकदारांसोबत त्रैमासिक आर्थिक अद्यतने शेअर केली",
        "आर्थिक वर्ष बंद होण्यानंतर ६ महिन्यांत वार्षिक सामान्य सभा आयोजित",
        "मटेरियल विकास २४ तासांच्या आत कंपनी वेबसाइटवर प्रकट",
        "गुंतवणूकदार तक्रार निराकरण १५ कार्य दिवसांत",
        "सेबी आणि आरबीआय रिपोर्टिंग मानके कडक पालन",
        "क्वेरींसाठी समर्पित गुंतवणूकदार संबंध संपर्क"
      ],
      highlight:"गणेश फायनान्स सर्व स्टेकहोल्डर्ससाठी टिकाऊ व्यवसाय वाढ सुनिश्चित करताना गुंतवणूकदार हक्कांचे संरक्षण करणारी मजबूत गव्हर्नन्स रचना राखते."
    },
    {
      id:"securities-trading",
      title:"सिक्युरिटीज ट्रेडिंग नियम",
      short:"इनसाइडर ट्रेडिंग प्रतिबंध आणि अनुपालन चौकट.",
      overview:"आमचे सिक्युरिटीज ट्रेडिंग नियम इनसाइडर ट्रेडिंग प्रतिबंधित करतात आणि कनेक्टेड व्यक्तींच्या सर्व बाजार क्रियाकलाप सेबी नियमांचे पालन करतात याची खात्री करतात.",
      points:[
        "नामनिर्देशित व्यक्तींची यादी राखली आणि त्रैमासिक अद्यतनित",
        "निर्दिष्ट सीमांपेक्षा जास्त ट्रेडसाठी अनिवार्य पूर्व मंजुरी",
        "आर्थिक परिणाम जाहीर करण्यापूर्वी ट्रेडिंग विंडो ब्लॅकआउट कालावधी",
        "उल्लंघनासाठी दंड: तात्काळ निलंबन आणि कायदेशीर कारवाई",
        "सर्व नामनिर्देशित व्यक्तींकडून वार्षिक अनुपालन प्रमाणपत्र आवश्यक",
        "सेबी पीआयटी नियमांवर नियमित जागरूकता कार्यक्रम"
      ],
      highlight:"आमचा अनुपालन अधिकारी सर्व नामनिर्देशित व्यक्तींच्या ट्रेड्सची देखरेख करतो आणि त्रैमासिक आधारावर ऑडिट कमिटीला रिपोर्ट करतो."
    },
    {
      id:"app-disclaimer",
      title:"अॅप अस्वीकरण",
      short:"मोबाइल अॅप वापर अटी, डेटा आणि दायित्व खंड.",
      overview:"गणेश फायनान्स मोबाइल अॅप्लिकेशन सोयीचे साधन म्हणून प्रदान केले आहे. हे अस्वीकरण वापर अटी, दायित्व मर्यादा आणि वापरकर्ता जबाबदाऱ्या रेखाटते.",
      points:[
        "अॅप केवळ माहिती आणि अर्ज उद्देशांसाठी",
        "कर्ज मंजुरी भौतिक सत्यापन आणि क्रेडिट मूल्यांकनाला अधीन",
        "स्क्रीनशॉट्स किंवा अॅप आउटपुट कायदेशीर बंधनकारक दस्तऐवज नाहीत",
        "अॅप कार्यप्रदर्शन नेटवर्क आणि डिव्हाइस स्थितींना अधीन",
        "अनधिकृत प्रवेशामुळे होणाऱ्या नुकसानीसाठी गणेश फायनान्स जबाबदार नाही",
        "अद्यतने वैशिष्ट्ये बदलू शकतात; सतत वापर स्वीकृती सूचित करतो"
      ],
      highlight:"अधिकृत कर्ज मंजुरी पत्रे आणि बंधनकारक करारांसाठी, फक्त आमच्या नोंदणीकृत कार्यालयाद्वारे जारी केलेले दस्तऐवज कायदेशीर वैधता धारण करतात."
    },
    {
      id:"auction-policy",
      title:"लिलाव धोरण",
      short:"पारदर्शक, आरबीआय-अनुपालन गोल्ड लिलाव प्रक्रिया.",
      overview:"कर्ज डिफॉल्टच्या बाबतीत, गणेश फायनान्स कडक, आरबीआय-मांडेटेड लिलाव धोरणाचे पालन करते जे ग्राहकांसाठी निष्पक्ष व्यवहार आणि प्रतिज्ञागत सोन्याच्या पारदर्शक लिलावाची खात्री करते.",
      points:[
        "लिलाव प्रक्रिया सुरू करण्यापूर्वी किमान १४ दिवस लेखी सूचना",
        "केवळ प्रमाणित परवानाधारक लिलावकर्त्यांद्वारे लिलाव आयोजित",
        "ग्राहकाला लिलाव तारीख, स्थान आणि रिझर्व किंमत कळवली जाते",
        "अधिक प्रमाण (जर असेल तर) ७ कार्य दिवसांत ग्राहकाला परत",
        "लिलाव रेकॉर्ड राखले आणि ग्राहक तपासणीसाठी उपलब्ध",
        "लिलाव सुरू होईपर्यंत ग्राहक प्रतिज्ञागत सोने रिडीम करू शकतात"
      ],
      highlight:"आमचे लिलाव धोरण आरबीआय गोल्ड लोन्स वर मास्टर सर्क्युलरचे कडक पालन करते आणि लिलावाचा अवलंब करण्यापूर्वी ग्राहक देयकांची कमाल वसुली सुनिश्चित करते."
    },
    {
      id:"loan-policy",
      title:"कर्ज धोरण",
      short:"पात्रता, मंजुरी, वितरण आणि वसुली मानके.",
      overview:"गणेश फायनान्स कर्ज धोरण संपूर्ण क्रेडिट लाइफसायकल नियंत्रित करते — पात्रता मूल्यांकन आणि मंजुरी पासून वितरण, निरीक्षण आणि वसुली पर्यंत.",
      points:[
        "सर्व कर्ज अर्जांसाठी KYC आणि उत्पन्न सत्यापन अनिवार्य",
        "आरबीआय मानकांनुसार गोल्ड लोन LTV गुणोत्तर कमाल ७५% राखले",
        "स्वामित्व स्कोअरिंग आणि ब्युरो डेटा वापरून क्रेडिट मूल्यांकन",
        "दस्तऐवज सत्यापनानंतर २४ तासांत वितरण",
        "कृषी आणि हंगामी कर्जदारांसाठी EMI सुट उपलब्ध",
        "आरबीआय एनबीएफसी प्रुडेंशियल मानकांनुसार NPA वर्गीकरण"
      ],
      highlight:"आमचे कर्ज धोरण वर्तमान बाजार स्थिती आणि नियामक आवश्यकतांचे प्रतिबिंब करण्यासाठी रिस्क मॅनेजमेंट कमिटी द्वारे सहामासिक पुनरावलोकन केले जाते."
    },
    {
      id:"code-fair-practices",
      title:"निष्पक्ष व्यवहार संहिता",
      short:"कर्जदार, संग्रह एजंट आणि कर्मचाऱ्यांसोबत नैतिक व्यवहार.",
      overview:"आमच्या मुख्य नैतिक चौकटीचा विस्तार, ही संहिता विशेषतः संग्रह, फील्ड ऑपरेशन्स आणि ग्राहक-समोरच्या क्रियाकलापांमध्ये निष्पक्ष व्यवहार प्रथा संबोधित करते.",
      points:[
        "कोणतेही जबरदस्ती किंवा आक्रमक वसुली रणनीती परवानगी नाही",
        "संग्रह कॉल्स फक्त सकाळी ८ ते संध्याकाळी ७ पर्यंत स्थानिक वेळेत",
        "एजंट्सना ओळख कार्ड आणि कंपनी अधिकृत पत्रे घेऊन जावे लागतात",
        "ग्राहकाच्या नियोक्त्याशी पूर्व संमतीशिवाय संपर्क नाही",
        "खऱ्या कठीण परिस्थितीवर आधारित परतफेड वेळापत्रक पुन्हा वाटप",
        "सर्व ग्राहक संवाद ३ वर्षांसाठी रेकॉर्ड केले आणि साठवले"
      ],
      highlight:"आम्ही सर्व संग्रह कर्मचाऱ्यांना नैतिक प्रथा आणि ग्राहक हक्कांवर त्रैमासिक प्रशिक्षण देतो, आणि कोणत्याही उल्लंघनासाठी कामगिरी पुनरावलोकन दंडित करते."
    },
    {
      id:"terms",
      title:"अटी आणि शर्ती",
      short:"सर्व गणेश फायनान्स उत्पादनांसाठी सामान्य कायदेशीर अटी.",
      overview:"अटी आणि शर्ती गणेश फायनान्स द्वारे ऑफर केलेल्या प्रत्येक उत्पादन आणि सेवेचा कायदेशीर पाया तयार करतात, ज्यामुळे सर्व पक्षांसाठी स्पष्टता आणि संरक्षण सुनिश्चित होते.",
      points:[
        "भारताच्या कायद्यांद्वारे नियंत्रित; अधिकार क्षेत्र: नोंदणीकृत राज्य न्यायालये",
        "सेवा अटी ३० दिवस आगाऊ सूचनेसह अद्यतनित केल्या जाऊ शकतात",
        "डिजिटल संमतीचा शारीरिक सही सारखाच कायदेशीर वैधता",
        "फोर्स मॅज्योर खंड नैसर्गिक आपत्ती, महामारी आणि नियामक कारवाईंना समाविष्ट",
        "१९९६ च्या आर्बिट्रेशन अॅक्ट अंतर्गत आर्बिट्रेशन द्वारे विवाद निराकरण",
        "सर्व रकमा भारतीय रुपयांमध्ये; जीएसटी/कर ग्राहकाद्वारे"
      ],
      highlight:"आम्ही सर्व ग्राहकांना अटी आणि शर्ती काळजीपूर्वक वाचण्याची शिफारस करतो. आमची ग्राहक सेवा टीम कोणत्याही खंडाची साध्या भाषेत स्पष्टीकरणासाठी उपलब्ध आहे."
    },
    {
      id:"csr",
      title:"सीएसआर धोरण",
      short:"समुदाय गुंतवणूक आणि सामाजिक जबाबदारी बांधिलकी.",
      overview:"गणेश फायनान्सचे सीएसआर धोरण आम्ही सेवा देत असलेल्या समुदायांना परत देण्याच्या बांधिलकीचे प्रतिबिंब आहे. २०२० पासून, आम्ही शिक्षण, आर्थिक साक्षरता आणि स्थानिक विकासात संसाधने वाहिली आहेत.",
      points:[
        "कंपनी कायदा २०१३ मार्गदर्शक तत्त्वांनुसार सीएसआर खर्च (जेव्हा लागू)",
        "प्राधान्य क्षेत्रे: आर्थिक साक्षरता, ग्रामीण शिक्षण, महिलांचे सक्षमीकरण",
        "वार्षिक सीएसआर अहवाल कंपनी वेबसाइटवर प्रकाशित",
        "कर्मचारी स्वयंसेवक कार्यक्रम — प्रति कर्मचारी किमान ८ तास/वर्ष",
        "अंतिम मैल समुदाय प्रभावासाठी स्थानिक एनजीओ सोबत भागीदारी",
        "गणेश फायनान्सचा सर्वाधिक ग्राहक आधार असलेल्या जिल्ह्यांवर फोकस"
      ],
      highlight:"गणेश फायनान्सने २०२० मध्ये स्थापनेपासून ५०+ आर्थिक साक्षरता कार्यशाळा आयोजित केल्या, ज्याने ५,०००+ ग्रामीण कुटुंबांपर्यंत पोहोचले आहे."
    },
    {
      id:"statutory-auditors",
      title:"वैधानिक लेखापरीक्षक नियुक्ती धोरण",
      short:"वैधानिक लेखापरीक्षकांसाठी स्वातंत्र्य आणि रोटेशन मानके.",
      overview:"हे धोरण कंपन्या कायदा, २०१३ आणि एनबीएफसी साठी आरबीआय मार्गदर्शक तत्त्वांनुसार योग्य, स्वतंत्र वैधानिक लेखापरीक्षकांची निवड सुनिश्चित करते.",
      points:[
        "ऑडिट कमिटी शिफारस बोर्डला लेखापरीक्षक निवड",
        "प्रत्येक ५ वर्षांनी अनिवार्य रोटेशन (किंवा कंपन्या कायद्याच्या तरतुदींनुसार)",
        "स्वातंत्र्य बाधित करणारी समवर्ती नॉन-ऑडिट सेवा नाही",
        "लेखापरीक्षकाकडे वैध आयसीएआय प्रॅक्टिस प्रमाणपत्र असणे आवश्यक",
        "प्रत्येक नियुक्तीपूर्वी हितसंबंध संघर्ष तपासणी",
        "एजीएम मध्ये शेअरहोल्डर्स द्वारे ऑडिट फी मंजूर"
      ],
      highlight:"आमची ऑडिट कमिटी व्यवस्थापन प्रभावाशिवाय सर्व लेखापरीक्षक उमेदवारांची स्वतंत्रपणे मूल्यांकन करते, पूर्ण वस्तुनिष्ठता सुनिश्चित करते."
    },
    {
      id:"human-rights",
      title:"मानवी हक्क धोरण",
      short:"भेदभाव, शोषण किंवा सक्तीच्या श्रमांसाठी शून्य सहनशीलता.",
      overview:"गणेश फायनान्स सर्व व्यवसाय ऑपरेशन्समध्ये सार्वत्रिक मानवी हक्क मानके कायम ठेवते, प्रत्येक कर्मचारी, ग्राहक आणि स्टेकहोल्डरला गरिमा आणि आदराने वागवते.",
      points:[
        "बालश्रम, सक्तीच्या श्रम किंवा तस्करीसाठी शून्य सहनशीलता",
        "समान संधी नियोक्ता — कोणत्याही प्रकारचा भेदभाव नाही",
        "सुरक्षित कार्यस्थळ — POSH कायद्याचे अनुपालन प्रशिक्षित ICC सह",
        "सर्व कॉन्ट्रॅक्ट कर्मचाऱ्यांसाठी लिव्हिंग वेज मानके लागू",
        "वेंडर आणि भागीदार निवडीमध्ये मानवी हक्क ड्यू डिलिजन्स",
        "वार्षिक मानवी हक्क जोखीम मूल्यांकन आंतरिकरित्या केले"
      ],
      highlight:"आम्ही आमचे मानवी हक्क धोरण युनायटेड नेशन्स बिझनेस अँड ह्यूमन राइट्स वर गाइडिंग प्रिन्सिपल्सशी संरेखित करतो, आमच्या क्षेत्रातील एनबीएफसीसाठी उच्च मानक सेट करतो."
    },
    {
      id:"responsible-advocacy",
      title:"जबाबदार वकिली धोरण",
      short:"नियामक, उद्योग संस्था आणि मीडिया सोबत नैतिक सहभाग.",
      overview:"गणेश फायनान्स नियामक, उद्योग संघ आणि सार्वजनिक मंचांसोबत जबाबदारीने सहभागी होते — नेहमी आमची वकिली पारदर्शक, पुरावा-आधारित आणि सार्वजनिक हिताशी संरेखित असल्याची खात्री.",
      points:[
        "सर्व नियामक सबमिशन्स अनुपालन अधिकारी द्वारे पुनरावलोकन",
        "अघोषित राजकीय योगदान किंवा लॉबिंग खर्च नाही",
        "मीडिया संवाद फक्त नामनिर्देशित प्रवक्त्याद्वारे",
        "उद्योग संघ सदस्यत्व वार्षिक अहवालात प्रकट",
        "वकिली स्थान ग्राहक आणि सामाजिक फायद्याशी संरेखित",
        "बोर्ड द्वारे वकिली क्रियाकलापांचे वार्षिक पुनरावलोकन"
      ],
      highlight:"आम्हाला विश्वास आहे की जबाबदार वकिली आरोग्यपूर्ण आर्थिक इकोसिस्टम आणि एनबीएफसी साठी अधिक समावेशक नियामक वातावरणात योगदान देते."
    },
    {
      id:"diversity",
      title:"विविधता, समावेश आणि समान संधी धोरण",
      short:"सर्वांसाठी समावेशक, समान कार्यस्थळ निर्माण.",
      overview:"गणेश फायनान्स विविध आणि समावेशक संघटना निर्माण करण्यासाठी वचनबद्ध आहे जिथे प्रत्येक व्यक्ती — पार्श्वभूमी कितीही असली तरी — त्यांच्या पूर्ण क्षमतेने भरभराट करू आणि योगदान देऊ शकेल.",
      points:[
        "वरिष्ठ व्यवस्थापन भूमिकांमध्ये महिलांसाठी विविधता लक्ष्य",
        "शक्य तेथे ब्लाइंड स्क्रीनिंगसह समावेशक भरती प्रथा",
        "अपंग कर्मचाऱ्यांसाठी निवास",
        "संवत्सरभर बहुसांस्कृतिक सण आणि जागरूकता कार्यक्रम",
        "सर्व कर्मचाऱ्यांसाठी अनिवार्य वार्षिक अँटी-हॅरासमेंट प्रशिक्षण",
        "बोर्डला त्रैमासिक विविधता मेट्रिक्स रिपोर्ट"
      ],
      highlight:"आम्हाला अभिमान आहे की आमच्या ग्राहक-समोरच्या कर्मचाऱ्यांपैकी ४०%+ महिला आहेत, आणि आम्ही नेतृत्व स्तरांवर प्रतिनिधित्व वाढवण्यासाठी सक्रियपणे कार्य करत आहोत."
    },
    {
      id:"stakeholders",
      title:"स्टेकहोल्डर्स सहभाग धोरण",
      short:"सर्व स्टेकहोल्डर गटांसोबत संरचित सहभाग.",
      overview:"आमचे स्टेकहोल्डर्स सहभाग धोरण गणेश फायनान्स कसे सर्व स्टेकहोल्डर गटांची ओळख करते, त्यांच्याशी संवाद साधते आणि आमच्या निर्णय प्रक्रियेत फीडबॅक समाविष्ट करते हे व्याख्या करते.",
      points:[
        "वार्षिक स्टेकहोल्डर मॅपिंग व्यायाम",
        "गुंतवणूकदार, ग्राहक, नियामकांसाठी समर्पित सहभाग कॅलेंडर",
        "द्विवार्षिक ग्राहक समाधान सर्वेक्षण",
        "कृती-नियोजन फॉलो-अपसह कर्मचारी सहभाग सर्वेक्षण",
        "नवीन भूगोलमध्ये प्रवेश करण्यापूर्वी समुदाय सल्लामसलत",
        "कंपनी वेबसाइटवर वार्षिक स्टेकहोल्डर्स अहवाल प्रकाशित"
      ],
      highlight:"आम्ही स्टेकहोल्डर सहभागाला अनुपालन क्रियाकलाप म्हणून नव्हे तर दीर्घकालीन संस्थात्मक लवचिकता निर्माण करण्यासाठी धोरणात्मक साधन म्हणून पाहतो."
    },
  ],
},
gu:{
  section_tag: "અનુપાલન અને શાસન",
  section_title: "નીતિ",
  section_desc: "ગણેશ ફાઇનાન્સ અમારા વ્યવસાયના દરેક પાસામાં ન્યાયી વર્તન, પારદર્શિતા અને નિયમનકારી અનુપાલન સુનિશ્ચિત કરતા નીતિઓના વ્યાપક માળખા હેઠળ કાર્ય કરે છે. વધુ જાણવા માટે કોઈપણ નીતિ પર ક્લિક કરો.",
  commitment_tag: "અમારી પ્રતિબદ્ધતા",
  commitment_title_1: "ન્યાયી પ્રેક્ટિસ ",
  commitment_title_hl: "મૂળ",
  commitment_sub: "૨૦૨૦માં અમારી સ્થાપના પછી, ન્યાયી પ્રેક્ટિસ ગણેશ ફાઇનાન્સમાં દરેક નિર્ણયનો આધારસ્તંભ બની છે.",
  stat_assets: "વ્યવસ્થાપન હેઠળની સંપત્તિ",
  stat_customers: "ખુશ ગ્રાહકો",
  stat_founded: "સ્થાપના",
  card_tagline: "પારદર્શિતા. વિશ્વાસ. અખંડિતતા.",
  card_body: "ગણેશ ફાઇનાન્સમાં દરેક લોન, દરેક વ્યવહાર, દરેક વાતચીત અમારા ગ્રાહકોને પ્રથમ સ્થાન આપતા સિદ્ધાંતો દ્વારા સંચાલિત થાય છે.",
  fp1_title: "પહેલેથી જ પારદર્શક",
  fp1_body: "ગણેશ ફાઇનાન્સમાં, અમે તમે સહી કરો તે પહેલાં દરેક ફી, દર અને દરેક શરત જાહેર કરીએ છીએ. અમારા લોન દસ્તાવેજો સાદી ભાષામાં લખાયેલા છે — ગુમરાહ કરવા માટે કોઈ નાના અક્ષરો નથી.",
  fp2_title: "ગ્રાહક-કેન્દ્રિત નિર્ણયો",
  fp2_body: "અમે તૈયાર કરતા દરેક નીતિ એક સરળ પ્રશ્નથી શરૂ થાય છે: શું આ અમારા ગ્રાહક માટે ન્યાયી છે? લવચીક ચુકવણીથી લાંબા ગાળાના કર્જદારો માટે શૂન્ય દંડ પૂર્વચુકવણી સુધી, અમારી નીતિઓ તમારી જરૂરિયાતોની આસપાસ બનાવવામાં આવી છે.",
  fp3_title: "નિયમનકારી અનુપાલન એક શક્તિ તરીકે",
  fp3_body: "રિઝર્વ બેંક ઓફ ઈન્ડિયા દ્વારા નોંધાયેલ અને નિયંત્રિત, ગણેશ ફાઇનાન્સ અનુપાલનને બોજ તરીકે નહીં પરંતુ સ્પર્ધાત્મક લાભ તરીકે માને છે — અમે સર્વોચ્ચ અખંડિતતાના ધોરણે કાર્ય કરીએ છીએ તેનો પુરાવો.",
  fp4_title: "અમારા સમુદાય સાથે વિકાસ",
  fp4_body: "૨૦૨૦થી, અમે એક શાખાથી ૧,૦૦૦+ ગ્રાહકોને સેવા આપવા સુધી વિકસ્યા છીએ. અમારો ₹૧.૫ કરોડ સંપત્તિ આધાર અમારા સમુદાયે અમારા પર મૂકેલા વિશ્વાસનું પ્રતિબિંબ છે — અમે આ પૃષ્ઠ પરની દરેક નીતિ દ્વારા તે વિશ્વાસનું રક્ષણ કરીએ છીએ.",
  modal_company: "ગણેશ ફાઇનાન્સ",
  modal_overview: "ઝલક",
  modal_key: "મુખ્ય જોગવાઈઓ",
  modal_cta: "આ નીતિ વિશે પૂછપરછ",
  modal_close: "બંધ કરો",
  view_details: "વિગતો જુઓ",
  policies: [
    {
      id:"fair-practices",
      title:"ન્યાયી વ્યવહાર સંહિતા",
      short:"તમામ ગ્રાહકો માટે પારદર્શક, નૈતિક લોન ધોરણો.",
      overview:"ગણેશ ફાઇનાન્સની ન્યાયી વ્યવહાર સંહિતા તમામ લોન ઉત્પાદનોને સંપૂર્ણ પારદર્શિતા, ન્યાય અને કોઈપણ ભેદભાવ વગર ઓફર કરવા માટે વ્યાપક માર્ગદર્શિકા સ્થાપિત કરે છે.",
      points:[
        "લોનની તમામ શરતો, વ્યાજ દર અને શુલ્કનું મંજૂરી પહેલાં સ્પષ્ટ જાહેરાત",
        "કોઈ છુપા શુલ્ક નથી — લેખિતમાં સંપૂર્ણ વિગત આપવામાં આવે છે",
        "જાતિ, ધર્મ, લિંગ અથવા વિસ્તારના આધારે સમાન વ્યવહાર",
        "૩૦ કાર્યકારી દિવસમાં ફરિયાદ નિવારણ",
        "બોર્ડ ઓફ ડિરેક્ટર્સ દ્વારા વાર્ષિક સમીક્ષા અને સંહિતાનું અપડેટ",
        "લોન વિતરણ પહેલાં ગ્રાહકની સ્વીકૃતિ જરૂરી"
      ],
      highlight:"અમારી ન્યાયી વ્યવહાર સંહિતા RBI માર્ગદર્શિકા સાથે સંરેખિત રહે તે માટે વાર્ષિક સમીક્ષા કરવામાં આવે છે અને અમારા બોર્ડ ઓફ ડિરેક્ટર્સ દ્વારા મંજૂર કરવામાં આવે છે."
    },
    {
      id:"code-of-conduct",
      title:"આચાર સંહિતા",
      short:"તમામ સ્ટાફ અને એજન્ટ્સ માટે વ્યાવસાયિક આચાર ધોરણો.",
      overview:"અમારી આચાર સંહિતા દરેક ગણેશ ફાઇનાન્સ કર્મચારી, એજન્ટ અને ભાગીદાર જે નૈતિક માળખામાં કાર્ય કરે છે તેની વ્યાખ્યા કરે છે — પાયાથી વિશ્વાસ બાંધે છે.",
      points:[
        "રિશ્વત, ભ્રષ્ટાચાર અથવા અનૈતિક માંગણી માટે શૂન્ય સહનશીલતા",
        "તમામ સ્ટાફ માટે વાર્ષિક અનિવાર્ય નૈતિકતા તાલીમ",
        "તમામ ગ્રાહક માહિતી માટે ગોપનીયતા જવાબદારી",
        "હિતસંઘર્ષનું જાહેરાત પ્રોટોકોલ",
        "દરેક સ્તરે ઉલ્લંઘન માટે અનુશાસનિક કાર્યવાહી મેટ્રિક્સ",
        "સારા વિશ્વાસમાં રિપોર્ટ કરનારાઓ માટે વ્હિસલબ્લોઅર સુરક્ષા"
      ],
      highlight:"કર્મચારીઓને વાર્ષિક આચાર સંહિતા પર સહી કરીને સ્વીકારવું પડે છે અને ઉલ્લંઘનને સંરચિત, નિષ્પક્ષ અનુશાસનિક પ્રક્રિયા દ્વારા હલ કરવામાં આવે છે."
    },
    {
      id:"interest-rate",
      title:"વ્યાજ દર નીતિ",
      short:"RBI-अનુપાલન, પારદર્શક વ્યાજ દર માળખું.",
      overview:"ગણેશ ફાઇનાન્સ બોર્ડ-મંજૂર વ્યાજ દર નીતિનું પાલન કરે છે જે તમામ ક્રેડિટ ઉત્પાદનો માટે સ્પર્ધાત્મક, પારદર્શક અને RBI-अનુપાલન કિંમત સુનિશ્ચિત કરે છે.",
      points:[
        "એસેટ લાયેબિલિટી મેનેજમેન્ટ કમિટી (ALCO) દ્વારા વ્યાજ દર નક્કી",
        "નાણાંના ખર્ચ, જોખમ પ્રીમિયમ અને બજાર બેન્ચમાર્ક પર આધારિત દર",
        "ભેદભાવ વગરના દર — એક જ ઉત્પાદન, તમામ ગ્રાહકો માટે એક જ શરતો",
        "વ્યાજ દરમાં ફેરફાર કમાણી ૩૦ દિવસ પહેલાં જાહેર",
        "ગોલ્ડ લોન દર અગ્રણી NBFC અને બેંકો સાથે સ્પર્ધાત્મક",
        "પ્રોસેસિંગ ફી અને પૂર્વચુકવણી શુલ્ક આગળથી જાહેર"
      ],
      highlight:"તમામ દર સુધારા RBI NBFC નિયમો અનુસાર રિપોર્ટ કરવામાં આવે છે અને સંપૂર્ણ સાર્વજનિક પારદર્શિતા માટે અમારી વેબસાઇટ પર પ્રકાશિત કરવામાં આવે છે."
    },
    {
      id:"privacy",
      title:"ગોપનીયતા નીતિ",
      short:"તમારો ડેટા IT કાયદા અને RBI ડેટા માર્ગદર્શિકા હેઠળ સુરક્ષિત.",
      overview:"ગણેશ ફાઇનાન્સ ગ્રાહક ગોપનીયતાને મૂળભૂત અધિકાર માને છે. અમારી ગોપનીયતા નીતિ અમે વ્યક્તિગત અને આર્થિક માહિતી કેવી રીતે એકત્રિત કરીએ, વાપરીએ, સંગ્રહીએ અને સુરક્ષિત કરીએ તે નિયંત્રિત કરે છે.",
      points:[
        "ડેટા માત્ર જણાવેલ, ચોક્કસ લોન હેતુ માટે એકત્રિત",
        "ગ્રાહક ડેટાની ત્રીજી પાર્ટીને વેચાણ અથવા શેરિંગ સંમતિ વગર નહીં",
        "તમામ ડિજિટલ વ્યવહાર માટે એન્ડ-ટુ-એન્ડ એન્ક્રિપ્શન",
        "ગ્રાહક કોઈપણ સમયે ડેટા સુધારણા અથવા કાઢી નાખવાની વિનંતી કરી શકે",
        "ડેટા સંગ્રહ નીતિ RBI અને IT કાયદા અનુસાર",
        "સ્વતંત્ર સાયબર સુરક્ષા કંપનીઓ દ્વારા નિયમિત સુરક્ષા ઓડિટ"
      ],
      highlight:"અમે માહિતી ટેક્નોલોજી અધિનિયમ, ૨૦૦૦ અને NBFC માટે RBI ગોપનીયતા માર્ગદર્શિકા સાથે સંપૂર્ણ અનુપાલન કરીએ છીએ."
    },
    {
      id:"vigil-mechanism",
      title:"સતર્કતા યંત્ર",
      short:"ચિંતા રિપોર્ટ કરવા માટે સુરક્ષિત વ્હિસલબ્લોઅર ચેનલ.",
      overview:"અમારું સતર્કતા યંત્ર કર્મચારીઓ, ગ્રાહકો અને સ્ટેકહોલ્ડર્સને અનૈતિક વર્તન, છેતરપિંડી અથવા નીતિ ઉલ્લંઘન વિશે ખરી ચિંતા રિપોર્ટ કરવા માટે સંરચિત, ગોપનીય ચેનલ આપે છે.",
      points:[
        "સમર્પિત ઈમેઇલ અને હોટલાઇન દ્વારા અનામિક રિપોર્ટિંગ ઉપલબ્ધ",
        "તમામ ફરિયાદો સ્વતંત્ર સમિતિ દ્વારા તપાસવામાં આવે છે",
        "વ્હિસલબ્લોઅરની ઓળખ કડક ગોપનીય રાખવામાં આવે છે",
        "સારા વિશ્વાસમાં રિપોર્ટ કરનાર વિરુદ્ધ કોઈ પ્રતિકાર, ડિમોશન કે પ્રતિકૂળ કાર્યવાહી નહીં",
        "નિરાકરણ સમયમર્યાદા: માનક કેસ માટે ૪૫ કાર્યકારી દિવસ",
        "નિરાકરણ ન થાય તો બોર્ડ ઓડિટ કમિટીને એસ્કલેશન"
      ],
      highlight:"સતર્કતા યંત્ર સીધું અમારા બોર્ડની ઓડિટ કમિટી દ્વારા નિરીક્ષણમાં રાખવામાં આવે છે, જે વ્યવસ્થાપનના પ્રભાવથી સ્વતંત્રતા સુનિશ્ચિત કરે છે."
    },
    {
      id:"investor-policy",
      title:"રોકાણકારો માટે નીતિ",
      short:"ન્યાયી, સમયસર અને પારદર્શક રોકાણકાર વાતચીત.",
      overview:"ગણેશ ફાઇનાન્સ નિયમિત જાહેરાતો, ન્યાયી વર્તન અને તમામ લાગુ પડતા કોર્પોરેટ ગવર્નન્સ ધોરણોના પાલન દ્વારા લાંબા ગાળાના રોકાણકાર વિશ્વાસ બાંધવા માટે પ્રતિબદ્ધ છે.",
      points:[
        "તમામ નોંધાયેલા રોકાણકારો સાથે ત્રિમાસિક આર્થિક અપડેટ શેર કરવામાં આવે છે",
        "વાર્ષિક સામાન્ય સભા નાણાકીય વર્ષ પૂર્ણ થયા પછી ૬ મહિનામાં યોજવામાં આવે છે",
        "મહત્વના વિકાસ ૨૪ કલાકમાં કંપની વેબસાઇટ પર જાહેર",
        "રોકાણકાર ફરિયાદ નિવારણ ૧૫ કાર્યકારી દિવસમાં",
        "SEBI અને RBI રિપોર્ટિંગ ધોરણોનું કડક પાલન",
        "પૂછપરછ માટે સમર્પિત ઇન્વેસ્ટર રિલેશન્સ સંપર્ક"
      ],
      highlight:"ગણેશ ફાઇનાન્સ તમામ સ્ટેકહોલ્ડર્સ માટે ટકાઉ વ્યવસાય વૃદ્ધિ સુનિશ્ચિત કરતી વખતે રોકાણકાર અધિકારોનું રક્ષણ કરતી મજબૂત ગવર્નન્સ રચના જાળવે છે."
    },
    {
      id:"securities-trading",
      title:"સિક્યોરિટીઝ ટ્રેડિંગ નિયમો",
      short:"ઇનસાઇડર ટ્રેડિંગ નિવારણ અને અનુપાલન માળખું.",
      overview:"અમારા સિક્યોરિટીઝ ટ્રેડિંગ નિયમો ઇનસાઇડર ટ્રેડિંગ અટકાવે છે અને કનેક્ટેડ વ્યક્તિઓની તમામ બજાર પ્રવૃત્તિઓ SEBI નિયમોનું પાલન કરે છે તેની ખાતરી કરે છે.",
      points:[
        "નામાંકિત વ્યક્તિઓની યાદી જાળવવામાં અને ત્રિમાસિક અપડેટ",
        "નિર્દિષ્ટ મર્યાદા કરતાં વધુ ટ્રેડ માટે અનિવાર્ય પૂર્વ મંજૂરી",
        "નાણાકીય પરિણામો જાહેર કરતા પહેલાં ટ્રેડિંગ વિન્ડો બ્લેકઆઉટ સમયગાળો",
        "ઉલ્લંઘન માટે દંડ: તાત્કાલિક સસ્પેન્ડ અને કાનૂની કાર્યવાહી",
        "તમામ નામાંકિત વ્યક્તિઓ પાસેથી વાર્ષિક અનુપાલન પ્રમાણપત્ર જરૂરી",
        "SEBI PIT નિયમો પર નિયમિત જાગૃતિ કાર્યક્રમો"
      ],
      highlight:"અમારા અનુપાલન અધિકારી તમામ નામાંકિત વ્યક્તિઓના ટ્રેડ્સનું નિરીક્ષણ કરે છે અને ત્રિમાસિક ધોરણે ઓડિટ કમિટીને રિપોર્ટ આપે છે."
    },
    {
      id:"app-disclaimer",
      title:"એપ્લિકેશન અસ્વીકરણ",
      short:"મોબાઇલ એપ વપરાશની શરતો, ડેટા અને જવાબદારી ખંડ.",
      overview:"ગણેશ ફાઇનાન્સ મોબાઇલ એપ્લિકેશન સુવિધા તરીકે આપવામાં આવી છે. આ અસ્વીકરણ વપરાશની શરતો, જવાબદારીની મર્યાદા અને વપરાશકર્તા જવાબદારીઓ દર્શાવે છે.",
      points:[
        "એપ માત્ર માહિતી અને અરજી હેતુ માટે",
        "લોન મંજૂરી ભૌતિક ચકાસણી અને ક્રેડિટ મૂલ્યાંકનને આધીન",
        "સ્ક્રીનશોટ અથવા એપ આઉટપુટ કાનૂની બંધનકર્તા દસ્તાવેજ નથી",
        "એપ પ્રદર્શન નેટવર્ક અને ડિવાઇસ સ્થિતિને આધીન",
        "અનધિકૃત પ્રવેશથી થતા નુકસાન માટે ગણેશ ફાઇનાન્સ જવાબદાર નથી",
        "અપડેટ્સ વિશેષતાઓ બદલી શકે છે; સતત વપરાશ સ્વીકૃતિ દર્શાવે છે"
      ],
      highlight:"અધિકૃત લોન મંજૂરી પત્ર અને બંધનકર્તા કરારો માટે માત્ર અમારા નોંધાયેલા કાર્યાલય દ્વારા જારી કરેલા દસ્તાવેજો જ કાનૂની માન્યતા ધરાવે છે."
    },
    {
      id:"auction-policy",
      title:"લિલામ નીતિ",
      short:"પારદર્શક, RBI-अનુપાલન ગોલ્ડ લિલામ પ્રક્રિયા.",
      overview:"લોન ડિફોલ્ટના કિસ્સામાં, ગણેશ ફાઇનાન્સ કડક, RBI-માન્ય લિલામ નીતિનું પાલન કરે છે જે ગ્રાહકોને ન્યાયી વર્તન અને પ્લેજ્ડ ગોલ્ડના પારદર્શક લિલામની ખાતરી કરે છે.",
      points:[
        "લિલામ પ્રક્રિયા શરૂ કરતા પહેલાં ઓછામાં ઓછા ૧૪ દિવસની લેખિત સૂચના",
        "માત્ર પ્રમાણિત લાઇસન્સ્ડ લિલામકારો દ્વારા લિલામ આયોજિત",
        "ગ્રાહકને લિલામ તારીખ, સ્થળ અને રિઝર્વ કિંમત જણાવવામાં આવે છે",
        "વધારાની રકમ (જો હોય તો) ૭ કાર્યકારી દિવસમાં ગ્રાહકને પરત",
        "લિલામ રેકોર્ડ જાળવવામાં આવે છે અને ગ્રાહક તપાસ માટે ઉપલબ્ધ",
        "લિલામ શરૂ થાય ત્યાં સુધી ગ્રાહક પ્લેજ્ડ ગોલ્ડ રિડીમ કરી શકે છે"
      ],
      highlight:"અમારી લિલામ નીતિ RBI ગોલ્ડ લોન માસ્ટર સર્ક્યુલરનું કડક પાલન કરે છે અને લિલામ પહેલાં ગ્રાહકની બાકી રકમની મહત્તમ વસૂલાત સુનિશ્ચિત કરે છે."
    },
    {
      id:"loan-policy",
      title:"લોન નીતિ",
      short:"પાત્રતા, મંજૂરી, વિતરણ અને વસૂલાત ધોરણો.",
      overview:"ગણેશ ફાઇનાન્સ લોન નીતિ આખા ક્રેડિટ લાઇફસાયકલને નિયંત્રિત કરે છે — પાત્રતા મૂલ્યાંકન અને મંજૂરીથી વિતરણ, નિરીક્ષણ અને વસૂલાત સુધી.",
      points:[
        "તમામ લોન અરજીઓ માટે KYC અને આવક ચકાસણી અનિવાર્ય",
        "RBI ધોરણ અનુસાર ગોલ્ડ લોન LTV રેશિયો મહત્તમ ૭૫%",
        "માલિકી સ્કોરિંગ અને બ્યુરો ડેટા વાપરીને ક્રેડિટ મૂલ્યાંકન",
        "દસ્તાવેજ ચકાસણી પછી ૨૪ કલાકમાં વિતરણ",
        "કૃષિ અને મોસમી કર્જદારો માટે EMI રજા ઉપલબ્ધ",
        "RBI NBFC પ્રુડેન્શિયલ નોર્મ અનુસાર NPA વર્ગીકરણ"
      ],
      highlight:"અમારી લોન નીતિ વર્તમાન બજાર પરિસ્થિતિ અને નિયમનકારી જરૂરિયાતોને પ્રતિબિંબિત કરવા માટે રિસ્ક મેનેજમેન્ટ કમિટી દ્વારા અર્ધવાર્ષિક સમીક્ષા કરવામાં આવે છે."
    },
    {
      id:"code-fair-practices",
      title:"ન્યાયી વ્યવહાર સંહિતા",
      short:"કર્જદાર, વસૂલાત એજન્ટ અને સ્ટાફ સાથે નૈતિક વ્યવહાર.",
      overview:"અમારા મુખ્ય નૈતિક માળખાનો વિસ્તાર, આ સંહિતા વસૂલાત, ફિલ્ડ કાર્યો અને ગ્રાહક-સામના પ્રવૃત્તિઓમાં ન્યાયી વ્યવહારને સંબોધિત કરે છે.",
      points:[
        "કોઈ જબરદસ્તી અથવા આક્રમક વસૂલાત રણનીતિને પરવાનગી નથી",
        "વસૂલાત કોલ્સ માત્ર સવારે ૮ થી સાંજે ૭ વચ્ચે સ્થાનિક સમયે",
        "એજન્ટ્સે ઓળખ કાર્ડ અને કંપની અધિકૃત પત્ર સાથે રાખવું પડે",
        "ગ્રાહકના નોકરીદાતા સાથે પૂર્વ સંમતિ વગર સંપર્ક નહીં",
        "ખરી મુશ્કેલીના આધારે ચુકવણી અનુસૂચિ ફરી વ્યવસ્થિત",
        "તમામ ગ્રાહક વાતચીત ૩ વર્ષ સુધી રેકોર્ડ અને સંગ્રહિત"
      ],
      highlight:"અમે તમામ વસૂલાત સ્ટાફને નૈતિક પ્રેક્ટિસ અને ગ્રાહક અધિકારો પર ત્રિમાસિક તાલીમ આપીએ છીએ અને કોઈપણ ઉલ્લંઘન માટે પર્ફોર્મન્સ રિવ્યૂમાં દંડિત કરીએ છીએ."
    },
    {
      id:"terms",
      title:"શરતો અને નિયમો",
      short:"તમામ ગણેશ ફાઇનાન્સ ઉત્પાદનો માટે સામાન્ય કાનૂની શરતો.",
      overview:"શરતો અને નિયમો ગણેશ ફાઇનાન્સ દ્વારા આપવામાં આવતા તમામ ઉત્પાદન અને સેવાનો કાનૂની પાયો બનાવે છે, જે તમામ પક્ષો માટે સ્પષ્ટતા અને સુરક્ષા સુનિશ્ચિત કરે છે.",
      points:[
        "ભારતના કાયદા હેઠળ નિયંત્રિત; અધિકારક્ષેત્ર: નોંધાયેલ રાજ્ય અદાલતો",
        "સેવા શરતો ૩૦ દિવસની અગાઉની સૂચના સાથે અપડેટ કરી શકાય",
        "ડિજિટલ સંમતિને ભૌતિક સહી જેવી જ કાનૂની માન્યતા",
        "ફોર્સ મેજ્યોર ખંડમાં કુદરતી આફત, મહામારી અને નિયમનકારી કાર્યવાહી સામેલ",
        "૧૯૯૬ના આર્બિટ્રેશન અધિનિયમ હેઠળ આર્બિટ્રેશન દ્વારા વિવાદ નિવારણ",
        "તમામ રકમ ભારતીય રૂપિયામાં; GST/કર ગ્રાહક દ્વારા"
      ],
      highlight:"અમે તમામ ગ્રાહકોને શરતો અને નિયમો કાળજીપૂર્વક વાંચવાની ભલામણ કરીએ છીએ. અમારી કસ્ટમર કેર ટીમ કોઈપણ ખંડને સાદી ભાષામાં સમજાવવા માટે ઉપલબ્ધ છે."
    },
    {
      id:"csr",
      title:"CSR નીતિ",
      short:"સમુદાય રોકાણ અને સામાજિક જવાબદારીની પ્રતિબદ્ધતા.",
      overview:"ગણેશ ફાઇનાન્સની CSR નીતિ અમે સેવા આપતા સમુદાયોને પરત આપવાની અમારી પ્રતિબદ્ધતાનું પ્રતિબિંબ છે. ૨૦૨૦થી અમે શિક્ષણ, આર્થિક સાક્ષરતા અને સ્થાનિક વિકાસમાં સંસાધનો વાપર્યા છે.",
      points:[
        "કંપની અધિનિયમ ૨૦૧૩ માર્ગદર્શિકા અનુસાર CSR ખર્ચ (જ્યારે લાગુ પડે)",
        "પ્રાથમિકતા ક્ષેત્રો: આર્થિક સાક્ષરતા, ગ્રામીણ શિક્ષણ, મહિલા સશક્તિકરણ",
        "વાર્ષિક CSR અહેવાલ કંપની વેબસાઇટ પર પ્રકાશિત",
        "કર્મચારી સ્વયંસેવક કાર્યક્રમ — પ્રતિ કર્મચારી વાર્ષિક ઓછામાં ઓછા ૮ કલાક",
        "છેલ્લા માઇલ સમુદાય અસર માટે સ્થાનિક NGO સાથે ભાગીદારી",
        "ગણેશ ફાઇનાન્સના સૌથી વધુ ગ્રાહક આધારવાળા જિલ્લાઓ પર ફોકસ"
      ],
      highlight:"ગણેશ ફાઇનાન્સે ૨૦૨૦માં સ્થાપના પછી ૫૦+ આર્થિક સાક્ષરતા વર્કશોપ કરી છે, જે ૫,૦૦૦+ ગ્રામીણ કુટુંબો સુધી પહોંચી છે."
    },
    {
      id:"statutory-auditors",
      title:"વૈધાનિક ઓડિટર્સની નિમણૂક નીતિ",
      short:"વૈધાનિક ઓડિટર્સ માટે સ્વતંત્રતા અને રોટેશન ધોરણો.",
      overview:"આ નીતિ કંપની અધિનિયમ, ૨૦૧૩ અને NBFC માટે RBI માર્ગદર્શિકા અનુસાર યોગ્ય, સ્વતંત્ર વૈધાનિક ઓડિટર્સની પસંદગી સુનિશ્ચિત કરે છે.",
      points:[
        "ઓડિટ કમિટીની ભલામણથી બોર્ડને ઓડિટર પસંદગી",
        "દર ૫ વર્ષે અનિવાર્ય રોટેશન (અથવા કંપની અધિનિયમ પ્રમાણે)",
        "સ્વતંત્રતા બાધિત કરતી સમવર્તી નોન-ઓડિટ સેવા નહીં",
        "ઓડિટર પાસે વૈધ ICAI પ્રેક્ટિસ સર્ટિફિકેટ હોવું જરૂરી",
        "દરેક નિમણૂક પહેલાં હિતસંઘર્ષ તપાસ",
        "AGMમાં શેરહોલ્ડર્સ દ્વારા ઓડિટ ફી મંજૂર"
      ],
      highlight:"અમારી ઓડિટ કમિટી વ્યવસ્થાપનના પ્રભાવ વગર તમામ ઓડિટર ઉમેદવારોનું સ્વતંત્ર મૂલ્યાંકન કરે છે, સંપૂર્ણ વસ્તુનિષ્ઠતા સુનિશ્ચિત કરે છે."
    },
    {
      id:"human-rights",
      title:"માનવ અધિકાર નીતિ",
      short:"ભેદભાવ, શોષણ અથવા જબરદસ્તીના કામ માટે શૂન્ય સહનશીલતા.",
      overview:"ગણેશ ફાઇનાન્સ તમામ વ્યવસાય કાર્યોમાં સાર્વત્રિક માનવ અધિકાર ધોરણો જાળવે છે અને દરેક કર્મચારી, ગ્રાહક તેમજ સ્ટેકહોલ્ડરને ગૌરવ અને આદર સાથે વર્તે છે.",
      points:[
        "બાળ મજૂરી, જબરદસ્તીના કામ અથવા તસ્કરી માટે શૂન્ય સહનશીલતા",
        "સમાન તક નોકરીદાતા — કોઈપણ પ્રકારનો ભેદભાવ નહીં",
        "સુરક્ષિત કાર્યસ્થળ — POSH અધિનિયમ અનુપાલન તાલીમિત ICC સાથે",
        "તમામ કોન્ટ્રાક્ટ સ્ટાફ માટે લિવિંગ વેજ ધોરણો લાગુ",
        "વેન્ડર અને ભાગીદાર પસંદગીમાં માનવ અધિકાર ડ્યુ ડિલિજન્સ",
        "વાર્ષિક માનવ અધિકાર જોખમ મૂલ્યાંકન આંતરિક રીતે કરવામાં આવે છે"
      ],
      highlight:"અમે અમારી માનવ અધિકાર નીતિને UN Guiding Principles on Business and Human Rights સાથે સંરેખિત કરીએ છીએ અને અમારા ક્ષેત્રના NBFC માટે ઉચ્ચ ધોરણ સ્થાપિત કરીએ છીએ."
    },
    {
      id:"responsible-advocacy",
      title:"જવાબદાર વકીલાત નીતિ",
      short:"નિયમનકાર, ઉદ્યોગ સંસ્થાઓ અને મીડિયા સાથે નૈતિક સંલગ્નતા.",
      overview:"ગણેશ ફાઇનાન્સ નિયમનકારો, ઉદ્યોગ સંઘો અને જાહેર મંચો સાથે જવાબદારીપૂર્વક વ્યવહાર કરે છે — હંમેશા અમારી વકીલાત પારદર્શક, પુરાવા-આધારિત અને જાહેર હિત સાથે સંરેખિત હોય તેની ખાતરી કરે છે.",
      points:[
        "તમામ નિયમનકારી સબમિશન અનુપાલન અધિકારી દ્વારા સમીક્ષા",
        "અઘોષિત રાજકીય યોગદાન અથવા લોબિંગ ખર્ચ નહીં",
        "મીડિયા વાતચીત માત્ર નામાંકિત પ્રવક્તા દ્વારા",
        "ઉદ્યોગ સંઘ સભ્યપદ વાર્ષિક અહેવાલમાં જાહેર",
        "વકીલાત સ્થિતિ ગ્રાહક અને સામાજિક લાભ સાથે સંરેખિત",
        "બોર્ડ દ્વારા વાર્ષિક વકીલાત પ્રવૃત્તિઓની સમીક્ષા"
      ],
      highlight:"અમને વિશ્વાસ છે કે જવાબદાર વકીલાત સ્વસ્થ નાણાકીય ઇકોસિસ્ટમ અને NBFC માટે વધુ સમાવેશક નિયમનકારી વાતાવરણમાં યોગદાન આપે છે."
    },
    {
      id:"diversity",
      title:"વિવિધતા, સમાવેશ અને સમાન તક નીતિ",
      short:"તમામ માટે સમાવેશી અને સમાન કાર્યસ્થળ બનાવવું.",
      overview:"ગણેશ ફાઇનાન્સ વિવિધ અને સમાવેશી સંસ્થા બનાવવા માટે પ્રતિબદ્ધ છે જ્યાં દરેક વ્યક્તિ — પૃષ્ઠભૂમિ ગમે તે હોય — પોતાની પૂર્ણ ક્ષમતાથી વિકસી શકે અને યોગદાન આપી શકે.",
      points:[
        "વરિષ્ઠ વ્યવસ્થાપન પદોમાં મહિલાઓ માટે વિવિધતા લક્ષ્ય",
        "જ્યાં શક્ય હોય ત્યાં બ્લાઇન્ડ સ્ક્રીનિંગ સાથે સમાવેશી ભરતી પ્રક્રિયા",
        "વિકલાંગ કર્મચારીઓ માટે આવાસ વ્યવસ્થા",
        "વર્ષભર બહુસાંસ્કૃતિક તહેવારો અને જાગૃતિ કાર્યક્રમો",
        "તમામ સ્ટાફ માટે વાર્ષિક અનિવાર્ય એન્ટી-હેરેસમેન્ટ તાલીમ",
        "બોર્ડને ત્રિમાસિક વિવિધતા મેટ્રિક્સ રિપોર્ટ"
      ],
      highlight:"અમને ગર્વ છે કે અમારા ગ્રાહક-સામના સ્ટાફમાં ૪૦%+ મહિલાઓ છે અને અમે લીડરશિપ સ્તરે પ્રતિનિધિત્વ વધારવા માટે સક્રિયપણે કામ કરી રહ્યા છીએ."
    },
    {
      id:"stakeholders",
      title:"સ્ટેકહોલ્ડર્સ સંલગ્નતા નીતિ",
      short:"તમામ સ્ટેકહોલ્ડર જૂથો સાથે સંરચિત સંલગ્નતા.",
      overview:"અમારી સ્ટેકહોલ્ડર્સ સંલગ્નતા નીતિ ગણેશ ફાઇનાન્સ કેવી રીતે તમામ સ્ટેકહોલ્ડર જૂથોની ઓળખ કરે છે, તેમની સાથે વાતચીત કરે છે અને અમારી નિર્ણય પ્રક્રિયામાં ફીડબેક સમાવેશ કરે છે તે વ્યાખ્યાયિત કરે છે.",
      points:[
        "વાર્ષિક સ્ટેકહોલ્ડર મેપિંગ કવાયત",
        "રોકાણકારો, ગ્રાહકો, નિયમનકારો માટે સમર્પિત સંલગ્નતા કેલેન્ડર",
        "દ્વિવાર્ષિક ગ્રાહક સંતોષ સર્વે",
        "કાર્ય-યોજના ફોલો-અપ સાથે કર્મચારી સંલગ્નતા સર્વે",
        "નવા વિસ્તારમાં પ્રવેશતા પહેલાં સમુદાય સલાહ",
        "કંપની વેબસાઇટ પર વાર્ષિક સ્ટેકહોલ્ડર્સ અહેવાલ પ્રકાશિત"
      ],
      highlight:"અમે સ્ટેકહોલ્ડર સંલગ્નતાને અનુપાલન કાર્ય તરીકે નહીં પરંતુ લાંબા ગાળાની સંસ્થાકીય સ્થિરતા બાંધવાના વ્યૂહાત્મક સાધન તરીકે જોઈએ છીએ."
    },
  ],
},
ta: {
  section_tag: "இணக்கம் மற்றும் நிர்வாகம்",
  section_title: "கொள்கை",
  section_desc: "கணேஷ் ஃபைனான்ஸ் எங்கள் வணிகத்தின் ஒவ்வொரு அம்சத்திலும் நியாயம், வெளிப்படைத்தன்மை மற்றும் ஒழுங்குமுறை இணக்கத்தை உறுதி செய்யும் கொள்கைகளின் விரிவான கட்டமைப்பின் கீழ் இயங்குகிறது. மேலும் அறிய எந்த கொள்கையையும் கிளிக் செய்யவும்.",
  commitment_tag: "எங்கள் உறுதிப்பாடு",
  commitment_title_1: "நியாயமான நடைமுறை",
  commitment_title_hl: "மையத்தில்",
  commitment_sub: "2020 இல் எங்கள் நிறுவப்பட்டதிலிருந்து, நியாயமான நடைமுறை கணேஷ் ஃபைனான்ஸில் ஒவ்வொரு முடிவுக்கும் அடித்தளமாக இருந்து வருகிறது.",
  stat_assets: "நிர்வாகத்தின் கீழ் உள்ள சொத்துக்கள்",
  stat_customers: "மகிழ்ச்சியான வாடிக்கையாளர்கள்",
  stat_founded: "நிறுவப்பட்ட ஆண்டு",
  card_tagline: "வெளிப்படைத்தன்மை. நம்பிக்கை. நேர்மை.",
  card_body: "கணேஷ் ஃபைனான்ஸில் ஒவ்வொரு கடன், ஒவ்வொரு பரிவர்த்தனை, ஒவ்வொரு தொடர்பும் எங்கள் வாடிக்கையாளர்களை முதலில் வைக்கும் கொள்கைகளால் நிர்வகிக்கப்படுகிறது.",
  fp1_title: "இயல்பாகவே வெளிப்படையானது",
  fp1_body: "கணேஷ் ஃபைனான்ஸில், நீங்கள் கையெழுத்திடுவதற்கு முன் ஒவ்வொரு கட்டணம், ஒவ்வொரு விகிதம் மற்றும் ஒவ்வொரு நிபந்தனையையும் நாங்கள் வெளிப்படுத்துகிறோம். எங்கள் கடன் ஆவணங்கள் எளிய மொழியில் எழுதப்பட்டுள்ளன — குழப்புவதற்கான சிறிய அச்சு இல்லை.",
  fp2_title: "வாடிக்கையாளர்-மைய முடிவுகள்",
  fp2_body: "நாங்கள் வடிவமைக்கும் ஒவ்வொரு கொள்கையும் ஒரு எளிய கேள்வியுடன் தொடங்குகிறது: இது எங்கள் வாடிக்கையாளருக்கு நியாயமானதா? நெகிழ்வான திருப்பிச் செலுத்துதல் முதல் நீண்டகால கடன் வாங்குபவர்களுக்கு அபராதமில்லா முன்பணம் செலுத்துதல் வரை, எங்கள் கொள்கைகள் உங்கள் தேவைகளைச் சுற்றி கட்டமைக்கப்பட்டுள்ளன.",
  fp3_title: "ஒழுங்குமுறை இணக்கம் ஒரு பலமாக",
  fp3_body: "இந்திய ரிசர்வ் வங்கியால் பதிவுசெய்யப்பட்டு ஒழுங்குபடுத்தப்பட்டு, கணேஷ் ஃபைனான்ஸ் இணக்கத்தை ஒரு சுமையாக அல்ல, ஆனால் ஒரு போட்டி நன்மையாக கருதுகிறது — நாங்கள் மிக உயர்ந்த நேர்மையான தரத்தில் இயங்குகிறோம் என்பதற்கான சான்று.",
  fp4_title: "எங்கள் சமூகத்துடன் வளர்ச்சி",
  fp4_body: "2020 முதல், நாங்கள் ஒரு கிளையிலிருந்து 1,000+ வாடிக்கையாளர்களுக்கு சேவை செய்ய வளர்ந்துள்ளோம். எங்கள் ₹1.5 கோடி சொத்து அடிப்படை எங்கள் சமூகம் எங்கள் மீது வைத்துள்ள நம்பிக்கையை பிரதிபலிக்கிறது — இந்தப் பக்கத்தில் உள்ள ஒவ்வொரு கொள்கையாலும் நாங்கள் பாதுகாக்கும் நம்பிக்கை.",
  modal_company: "கணேஷ் ஃபைனான்ஸ்",
  modal_overview: "கண்ணோட்டம்",
  modal_key: "முக்கிய விதிகள்",
  modal_cta: "இந்த கொள்கை பற்றி கேளுங்கள்",
  modal_close: "மூடு",
  view_details: "விவரங்கள் காண",
  policies: [
    {
      id:"fair-practices",
      title:"நியாயமான நடைமுறைகளின் குறியீடு",
      short:"அனைத்து வாடிக்கையாளர்களுக்கும் வெளிப்படையான, நெறிமுறை கடன் தரநிலைகள்.",
      overview:"கணேஷ் ஃபைனான்ஸின் நியாயமான நடைமுறைகளின் குறியீடு அனைத்து கடன் தயாரிப்புகளும் முழுமையான வெளிப்படைத்தன்மை, நியாயம் மற்றும் எந்தவித பாகுபாடும் இல்லாமல் வழங்கப்படுவதை உறுதி செய்யும் விரிவான வழிகாட்டுதல்களை நிறுவுகிறது.",
      points:[
        "அனுமதிக்கு முன் அனைத்து கடன் விதிமுறைகள், வட்டி விகிதங்கள் மற்றும் கட்டணங்களின் தெளிவான வெளிப்பாடு",
        "மறைக்கப்பட்ட கட்டணங்கள் இல்லை — முழு விவரங்களும் எழுத்துப்பூர்வமாக வழங்கப்படுகின்றன",
        "சாதி, மதம், பாலினம் அல்லது பிராந்தியத்தைப் பொருட்படுத்தாமல் சமமான நடத்தை",
        "30 வேலை நாட்களுக்குள் புகார் தீர்வு",
        "இயக்குநர்கள் குழுவால் குறியீட்டின் வருடாந்திர மதிப்பாய்வு மற்றும் புதுப்பித்தல்",
        "கடன் வழங்கப்படுவதற்கு முன் வாடிக்கையாளர் ஒப்புதல் தேவை"
      ],
      highlight:"எங்கள் நியாயமான நடைமுறைகளின் குறியீடு RBI வழிகாட்டுதல்களுடன் சீரமைக்கப்படுவதை உறுதி செய்ய வருடாந்திர மதிப்பாய்வு செய்யப்பட்டு எங்கள் இயக்குநர்கள் குழுவால் அங்கீகரிக்கப்படுகிறது."
    },
    {
      id:"code-of-conduct",
      title:"நடத்தை விதிமுறை",
      short:"அனைத்து ஊழியர்கள் மற்றும் முகவர்களுக்கு கட்டுப்படும் தொழில்முறை நடத்தை தரநிலைகள்.",
      overview:"எங்கள் நடத்தை விதிமுறை ஒவ்வொரு கணேஷ் ஃபைனான்ஸ் ஊழியர், முகவர் மற்றும் கூட்டாளர் இயங்கும் நெறிமுறை கட்டமைப்பை வரையறுக்கிறது — அடித்தளத்திலிருந்து நம்பிக்கையை கட்டமைக்கிறது.",
      points:[
        "லஞ்சம், ஊழல் அல்லது நெறிமுறையற்ற கோரிக்கைகளுக்கு பூஜ்ஜிய சகிப்புத்தன்மை",
        "அனைத்து ஊழியர்களுக்கும் கட்டாய வருடாந்திர நெறிமுறை பயிற்சி",
        "அனைத்து வாடிக்கையாளர் தகவல்களுக்கும் ரகசியத்தன்மை கடமைகள்",
        "நலன் முரண்பாடு வெளிப்படுத்தல் நெறிமுறைகள்",
        "ஒவ்வொரு மட்டத்திலும் மீறல்களுக்கான ஒழுங்கு நடவடிக்கை அணி",
        "நல்லெண்ணத்துடன் புகாரளிப்பவர்களுக்கு விசில் ப்ளோவர் பாதுகாப்பு உத்தரவாதம்"
      ],
      highlight:"ஊழியர்கள் வருடாந்திர நடத்தை விதிமுறையில் கையெழுத்திட்டு ஒப்புக்கொள்ள வேண்டும், மேலும் மீறல்கள் ஒரு கட்டமைக்கப்பட்ட, நடுநிலையான ஒழுங்கு முறை மூலம் தீர்க்கப்படுகின்றன."
    },
    {
      id:"interest-rate",
      title:"வட்டி விகிதக் கொள்கை",
      short:"RBI-இணக்கம், வெளிப்படையான வட்டி விகித கட்டமைப்பு.",
      overview:"கணேஷ் ஃபைனான்ஸ் ஒரு வாரியம்-அங்கீகரிக்கப்பட்ட வட்டி விகிதக் கொள்கையைப் பின்பற்றுகிறது, இது வழங்கப்படும் அனைத்து கடன் தயாரிப்புகளுக்கும் போட்டி, வெளிப்படையான மற்றும் RBI-இணக்க விலையை உறுதி செய்கிறது.",
      points:[
        "சொத்து பொறுப்பு மேலாண்மை குழு (ALCO) மூலம் வட்டி விகிதங்கள் நிர்ணயம்",
        "நிதி செலவு, இடர் பிரீமியம் மற்றும் சந்தை அளவுகோல்களின் அடிப்படையில் விகிதங்கள்",
        "பாகுபாடற்ற விகிதங்கள் — ஒரே தயாரிப்பு, அனைத்து வாடிக்கையாளர்களுக்கும் ஒரே விதிமுறைகள்",
        "வட்டி விகித மாற்றங்கள் குறைந்தது 30 நாட்கள் முன்னதாக தெரிவிக்கப்படுகின்றன",
        "தங்கக் கடன் விகிதங்கள் முன்னணி NBFCகள் மற்றும் வங்கிகளுடன் போட்டித்தன்மை கொண்டவை",
        "செயலாக்க கட்டணங்கள் மற்றும் முன்பணம் செலுத்துதல் கட்டணங்கள் முன்கூட்டியே வெளிப்படுத்தப்படுகின்றன"
      ],
      highlight:"அனைத்து விகித திருத்தங்களும் NBFC விதிமுறைகளின்படி RBI க்கு புகாரளிக்கப்பட்டு, முழுமையான பொது வெளிப்படைத்தன்மைக்காக எங்கள் வலைத்தளத்தில் வெளியிடப்படுகின்றன."
    },
    {
      id:"privacy",
      title:"தனியுரிமைக் கொள்கை",
      short:"உங்கள் தரவு IT சட்டம் மற்றும் RBI தரவு வழிகாட்டுதல்களின் கீழ் பாதுகாக்கப்படுகிறது.",
      overview:"கணேஷ் ஃபைனான்ஸ் வாடிக்கையாளர் தனியுரிமையை ஒரு அடிப்படை உரிமையாக கருதுகிறது. எங்கள் தனியுரிமைக் கொள்கை தனிப்பட்ட மற்றும் நிதி தகவல்களை நாங்கள் எவ்வாறு சேகரிக்கிறோம், பயன்படுத்துகிறோம், சேமிக்கிறோம் மற்றும் பாதுகாக்கிறோம் என்பதை நிர்வகிக்கிறது.",
      points:[
        "தரவு குறிப்பிட்ட, தெளிவான கடன் நோக்கங்களுக்காக மட்டுமே சேகரிக்கப்படுகிறது",
        "ஒப்புதல் இல்லாமல் மூன்றாம் தரப்பினருக்கு வாடிக்கையாளர் தரவு விற்பனை அல்லது பகிர்வு இல்லை",
        "அனைத்து டிஜிட்டல் பரிவர்த்தனைகளுக்கும் முழுமையான குறியாக்கம்",
        "வாடிக்கையாளர்கள் எந்த நேரத்திலும் தரவு திருத்தம் அல்லது நீக்கம் கோரலாம்",
        "RBI மற்றும் IT சட்ட தேவைகளுடன் சீரமைக்கப்பட்ட தரவு பாதுகாப்புக் கொள்கை",
        "சுயாதீன சைபர் பாதுகாப்பு நிறுவனங்களால் வழக்கமான பாதுகாப்பு தணிக்கைகள்"
      ],
      highlight:"நாங்கள் தகவல் தொழில்நுட்பச் சட்டம், 2000 மற்றும் NBFCகளுக்கான தரவு தனியுரிமை RBI வழிகாட்டுதல்களுடன் முழுமையாக இணங்குகிறோம்."
    },
    {
      id:"vigil-mechanism",
      title:"விழிப்புணர்வு வழிமுறை",
      short:"கவலைகளைப் புகாரளிப்பதற்கான பாதுகாப்பான விசில் ப்ளோவர் சேனல்.",
      overview:"எங்கள் விழிப்புணர்வு வழிமுறை ஊழியர்கள், வாடிக்கையாளர்கள் மற்றும் பங்குதாரர்களுக்கு நெறிமுறையற்ற நடத்தை, மோசடி அல்லது கொள்கை மீறல்கள் பற்றிய உண்மையான கவலைகளைப் புகாரளிக்க ஒரு கட்டமைக்கப்பட்ட, ரகசிய சேனலை வழங்குகிறது.",
      points:[
        "அர்ப்பணிக்கப்பட்ட மின்னஞ்சல் மற்றும் ஹாட்லைன் வழியாக அநாமதேய புகாரளிப்பு கிடைக்கும்",
        "அனைத்து புகார்களும் ஒரு சுயாதீன குழுவால் விசாரிக்கப்படுகின்றன",
        "விசில் ப்ளோவரின் அடையாளம் கண்டிப்பாக ரகசியமாக வைக்கப்படுகிறது",
        "நல்லெண்ணத்துடன் புகாரளிப்பவர்களுக்கு எதிராக பழிவாங்குதல், பதவி இறக்கம் அல்லது பாதகமான நடவடிக்கை இல்லை",
        "தீர்வு காலவரிசை: நிலையான வழக்குகளுக்கு 45 வேலை நாட்கள்",
        "தீர்க்கப்படாவிட்டால் வாரிய தணிக்கைக் குழுவுக்கு உயர்த்துதல்"
      ],
      highlight:"விழிப்புணர்வு வழிமுறை நேரடியாக எங்கள் வாரியத்தின் தணிக்கைக் குழுவால் மேற்பார்வையிடப்படுகிறது, இது நிர்வாக செல்வாக்கிலிருந்து சுதந்திரத்தை உறுதி செய்கிறது."
    },
    {
      id:"investor-policy",
      title:"முதலீட்டாளர்களுக்கான கொள்கை",
      short:"நியாயமான, சரியான நேரத்தில் மற்றும் வெளிப்படையான முதலீட்டாளர் தொடர்பு.",
      overview:"கணேஷ் ஃபைனான்ஸ் வழக்கமான வெளிப்பாடுகள், நியாயமான நடத்தை மற்றும் அனைத்து பொருந்தும் கார்ப்பரேட் ஆளுகை தரநிலைகளைப் பின்பற்றுவதன் மூலம் நீண்டகால முதலீட்டாளர் நம்பிக்கையை கட்டமைக்க உறுதிபூண்டுள்ளது.",
      points:[
        "அனைத்து பதிவுசெய்யப்பட்ட முதலீட்டாளர்களுடன் காலாண்டு நிதி புதுப்பிப்புகள் பகிரப்படுகின்றன",
        "நிதியாண்டு முடிந்த 6 மாதங்களுக்குள் வருடாந்திர பொதுக் கூட்டம் நடத்தப்படுகிறது",
        "முக்கியமான முன்னேற்றங்கள் 24 மணி நேரத்திற்குள் நிறுவன வலைத்தளத்தில் வெளியிடப்படுகின்றன",
        "15 வேலை நாட்களுக்குள் முதலீட்டாளர் புகார் தீர்வு",
        "SEBI மற்றும் RBI அறிக்கை தரநிலைகள் கண்டிப்பாக பின்பற்றப்படுகின்றன",
        "கேள்விகளுக்கு அர்ப்பணிக்கப்பட்ட முதலீட்டாளர் உறவுகள் தொடர்பு"
      ],
      highlight:"கணேஷ் ஃபைனான்ஸ் அனைத்து பங்குதாரர்களுக்கும் நீடித்த வணிக வளர்ச்சியை உறுதி செய்யும் அதே வேளையில் முதலீட்டாளர் உரிமைகளைப் பாதுகாக்கும் ஒரு வலுவான ஆளுகை கட்டமைப்பை பராமரிக்கிறது."
    },
    {
      id:"securities-trading",
      title:"பத்திர வர்த்தக விதிகள்",
      short:"உள் வர்த்தக தடுப்பு மற்றும் இணக்க கட்டமைப்பு.",
      overview:"எங்கள் பத்திர வர்த்தக விதிகள் உள் வர்த்தகத்தைத் தடுக்கின்றன மற்றும் இணைக்கப்பட்ட நபர்களின் அனைத்து சந்தை நடவடிக்கைகளும் SEBI விதிமுறைகளுக்கு இணங்குவதை உறுதி செய்கின்றன.",
      points:[
        "நியமிக்கப்பட்ட நபர்கள் பட்டியல் பராமரிக்கப்பட்டு காலாண்டு புதுப்பிக்கப்படுகிறது",
        "குறிப்பிட்ட வரம்புகளுக்கு மேலான வர்த்தகங்களுக்கு கட்டாய முன் அனுமதி",
        "நிதி முடிவு அறிவிப்புகளுக்கு முன் வர்த்தக சாளரம் முடக்கப்பட்ட காலங்கள்",
        "மீறலுக்கான தண்டனைகள்: உடனடி இடைநீக்கம் மற்றும் சட்ட நடவடிக்கை",
        "அனைத்து நியமிக்கப்பட்ட நபர்களிடமிருந்தும் வருடாந்திர இணக்க சான்றிதழ் தேவை",
        "SEBI PIT விதிமுறைகள் குறித்த வழக்கமான விழிப்புணர்வு திட்டங்கள்"
      ],
      highlight:"எங்கள் இணக்க அதிகாரி நியமிக்கப்பட்ட நபர்களின் அனைத்து வர்த்தகங்களையும் கண்காணித்து, காலாண்டு அடிப்படையில் தணிக்கைக் குழுவுக்கு அறிக்கை செய்கிறார்."
    },
    {
      id:"app-disclaimer",
      title:"பயன்பாட்டு மறுப்பு",
      short:"மொபைல் பயன்பாட்டு பயன்பாட்டு விதிமுறைகள், தரவு மற்றும் பொறுப்பு உட்பிரிவுகள்.",
      overview:"கணேஷ் ஃபைனான்ஸ் மொபைல் பயன்பாடு ஒரு வசதிக் கருவியாக வழங்கப்படுகிறது. இந்த மறுப்பு பயன்பாட்டு விதிமுறைகள், பொறுப்பின் வரம்புகள் மற்றும் பயனர் பொறுப்புகளை விவரிக்கிறது.",
      points:[
        "பயன்பாடு தகவல் மற்றும் விண்ணப்ப நோக்கங்களுக்காக மட்டுமே",
        "கடன் அனுமதி உடல் சரிபார்ப்பு மற்றும் கடன் மதிப்பீட்டிற்கு உட்பட்டது",
        "ஸ்கிரீன்ஷாட்கள் அல்லது பயன்பாட்டு வெளியீடுகள் சட்டப்பூர்வமாக பிணைக்கும் ஆவணங்கள் அல்ல",
        "பயன்பாட்டு செயல்திறன் நெட்வொர்க் மற்றும் சாதன நிலைமைகளுக்கு உட்பட்டது",
        "அங்கீகரிக்கப்படாத அணுகலால் ஏற்படும் இழப்புகளுக்கு கணேஷ் ஃபைனான்ஸ் பொறுப்பல்ல",
        "புதுப்பிப்புகள் அம்சங்களை மாற்றக்கூடும்; தொடர்ந்து பயன்படுத்துவது ஏற்றுக்கொள்வதைக் குறிக்கிறது"
      ],
      highlight:"அதிகாரப்பூர்வ கடன் அனுமதி கடிதங்கள் மற்றும் பிணைக்கும் ஒப்பந்தங்களுக்கு, எங்கள் பதிவுசெய்யப்பட்ட அலுவலகம் வழியாக வெளியிடப்பட்ட ஆவணங்கள் மட்டுமே சட்டப்பூர்வ செல்லுபடியைக் கொண்டுள்ளன."
    },
    {
      id:"auction-policy",
      title:"ஏலக் கொள்கை",
      short:"வெளிப்படையான, RBI-இணக்க தங்க ஏல நடைமுறைகள்.",
      overview:"கடன் தவறிய வழக்குகளில், கணேஷ் ஃபைனான்ஸ் ஒரு கடுமையான, RBI-கட்டாய ஏலக் கொள்கையைப் பின்பற்றுகிறது, இது வாடிக்கையாளர்களின் நியாயமான நடத்தை மற்றும் அடகு வைக்கப்பட்ட தங்கத்தின் வெளிப்படையான ஏலத்தை உறுதி செய்கிறது.",
      points:[
        "ஏல நடவடிக்கைகளைத் தொடங்குவதற்கு முன் குறைந்தது 14 நாட்கள் எழுத்துப்பூர்வ அறிவிப்பு",
        "சான்றளிக்கப்பட்ட உரிமம் பெற்ற ஏலதாரர்களால் மட்டுமே ஏலம் நடத்தப்படுகிறது",
        "வாடிக்கையாளருக்கு ஏல தேதி, இடம் மற்றும் குறைந்தபட்ச விலை தெரிவிக்கப்படுகிறது",
        "உபரி வருமானம் (ஏதேனும் இருந்தால்) 7 வேலை நாட்களுக்குள் வாடிக்கையாளருக்குத் திரும்ப",
        "ஏலப் பதிவுகள் பராமரிக்கப்பட்டு வாடிக்கையாளர் ஆய்வுக்குக் கிடைக்கும்",
        "ஏலம் தொடங்கும் வரை வாடிக்கையாளர்கள் அடகு வைத்த தங்கத்தை மீட்டுக்கொள்ளலாம்"
      ],
      highlight:"எங்கள் ஏலக் கொள்கை RBI தங்கக் கடன் முதன்மை சுற்றறிக்கையை கண்டிப்பாகப் பின்பற்றுகிறது மற்றும் ஏலத்தை நாடுவதற்கு முன் வாடிக்கையாளர் நிலுவைகளின் அதிகபட்ச மீட்பை உறுதி செய்கிறது."
    },
    {
      id:"loan-policy",
      title:"கடன் கொள்கை",
      short:"தகுதி, அனுமதி, வழங்கல் மற்றும் மீட்பு நெறிமுறைகள்.",
      overview:"கணேஷ் ஃபைனான்ஸ் கடன் கொள்கை முழு கடன் வாழ்க்கைச் சுழற்சியையும் நிர்வகிக்கிறது — தகுதி மதிப்பீடு மற்றும் அனுமதி முதல் வழங்கல், கண்காணிப்பு மற்றும் மீட்பு வரை.",
      points:[
        "அனைத்து கடன் விண்ணப்பங்களுக்கும் KYC மற்றும் வருமான சரிபார்ப்பு கட்டாயம்",
        "RBI நெறிமுறைகளின்படி தங்கக் கடன் LTV விகிதம் அதிகபட்சம் 75% ஆக பராமரிக்கப்படுகிறது",
        "தனியுரிம மதிப்பெண் மற்றும் பணியக தரவைப் பயன்படுத்தி கடன் மதிப்பீடு",
        "ஆவண சரிபார்ப்புக்கு 24 மணி நேரத்திற்குள் வழங்கல்",
        "விவசாயம் மற்றும் பருவகால கடன் வாங்குபவர்களுக்கு EMI விடுமுறை கிடைக்கும்",
        "RBI NBFC எச்சரிக்கை நெறிமுறைகளின்படி NPA வகைப்பாடு"
      ],
      highlight:"எங்கள் கடன் கொள்கை தற்போதைய சந்தை நிலைமைகள் மற்றும் ஒழுங்குமுறை தேவைகளைப் பிரதிபலிக்கும் வகையில் இடர் மேலாண்மைக் குழுவால் அரையாண்டு மதிப்பாய்வு செய்யப்படுகிறது."
    },
    {
      id:"code-fair-practices",
      title:"நியாயமான நடைமுறைகளின் குறியீடு",
      short:"கடன் வாங்குபவர்கள், வசூல் முகவர்கள் மற்றும் ஊழியர்களுடன் நெறிமுறை நடத்தை.",
      overview:"எங்கள் முக்கிய நெறிமுறை கட்டமைப்பின் விரிவாக்கம், இந்த குறியீடு வசூல், கள செயல்பாடுகள் மற்றும் வாடிக்கையாளர்-முகம் கொண்ட செயல்பாடுகளில் நியாயமான நடைமுறைகளை குறிப்பாகக் கையாள்கிறது.",
      points:[
        "வற்புறுத்தும் அல்லது ஆக்கிரமிப்பு மீட்பு உத்திகள் அனுமதிக்கப்படாது",
        "வசூல் அழைப்புகள் உள்ளூர் நேரம் காலை 8 மணி முதல் மாலை 7 மணி வரை மட்டுமே",
        "முகவர்கள் அடையாள அட்டைகள் மற்றும் நிறுவன அதிகாரக் கடிதங்களை எடுத்துச் செல்ல வேண்டும்",
        "முன் ஒப்புதல் இல்லாமல் வாடிக்கையாளரின் முதலாளியுடன் தொடர்பு கொள்ளக்கூடாது",
        "உண்மையான கஷ்டத்தின் அடிப்படையில் திருப்பிச் செலுத்தும் அட்டவணைகள் மறுபேச்சு செய்யப்படுகின்றன",
        "அனைத்து வாடிக்கையாளர் தகவல்தொடர்புகளும் 3 ஆண்டுகளுக்கு பதிவு செய்யப்பட்டு சேமிக்கப்படும்"
      ],
      highlight:"நாங்கள் அனைத்து வசூல் ஊழியர்களுக்கும் நெறிமுறை நடைமுறைகள் மற்றும் வாடிக்கையாளர் உரிமைகள் குறித்து காலாண்டு பயிற்சி அளிக்கிறோம், செயல்திறன் மதிப்பீடுகள் எந்த மீறலையும் தண்டிக்கின்றன."
    },
    {
      id:"terms",
      title:"விதிமுறைகள் மற்றும் நிபந்தனைகள்",
      short:"அனைத்து கணேஷ் ஃபைனான்ஸ் தயாரிப்புகளையும் நிர்வகிக்கும் பொது சட்ட விதிமுறைகள்.",
      overview:"விதிமுறைகள் மற்றும் நிபந்தனைகள் கணேஷ் ஃபைனான்ஸ் வழங்கும் ஒவ்வொரு தயாரிப்பு மற்றும் சேவைக்கும் சட்டப்பூர்வ அடித்தளத்தை உருவாக்குகின்றன, அனைத்து தரப்பினருக்கும் தெளிவு மற்றும் பாதுகாப்பை உறுதி செய்கின்றன.",
      points:[
        "இந்திய சட்டங்களால் நிர்வகிக்கப்படுகிறது; அதிகார வரம்பு: பதிவுசெய்யப்பட்ட மாநில நீதிமன்றங்கள்",
        "சேவை விதிமுறைகள் 30 நாள் முன் அறிவிப்புடன் புதுப்பிக்கப்படலாம்",
        "டிஜிட்டல் ஒப்புதல் உடல் கையொப்பத்தின் அதே சட்டப்பூர்வ செல்லுபடியைக் கொண்டுள்ளது",
        "படை மஜூர் உட்பிரிவு இயற்கை பேரழிவுகள், தொற்றுநோய்கள் மற்றும் ஒழுங்குமுறை நடவடிக்கைகளை உள்ளடக்கியது",
        "நடுவர் சட்டம், 1996 இன் கீழ் நடுவர் மூலம் தகராறு தீர்வு",
        "அனைத்து தொகைகளும் இந்திய ரூபாயில்; GST/வரிகள் வாடிக்கையாளரால் ஏற்கப்படும்"
      ],
      highlight:"அனைத்து வாடிக்கையாளர்களும் விதிமுறைகள் மற்றும் நிபந்தனைகளை கவனமாகப் படிக்குமாறு பரிந்துரைக்கிறோம். எங்கள் வாடிக்கையாளர் பராமரிப்பு குழு எந்தவொரு உட்பிரிவையும் எளிய மொழியில் விளக்குவதற்குக் கிடைக்கிறது."
    },
    {
      id:"csr",
      title:"CSR கொள்கை",
      short:"சமூக முதலீடு மற்றும் சமூகப் பொறுப்பு உறுதிப்பாடுகள்.",
      overview:"கணேஷ் ஃபைனான்ஸின் CSR கொள்கை நாங்கள் சேவை செய்யும் சமூகங்களுக்குத் திருப்பியளிப்பதற்கான எங்கள் உறுதிப்பாட்டைப் பிரதிபலிக்கிறது. 2020 முதல், நாங்கள் கல்வி, நிதி கல்வியறிவு மற்றும் உள்ளூர் மேம்பாட்டில் வளங்களை செலுத்தியுள்ளோம்.",
      points:[
        "நிறுவனச் சட்டம் 2013 வழிகாட்டுதல்களுடன் (பொருந்தும் போது) CSR செலவு",
        "முன்னுரிமைப் பகுதிகள்: நிதி கல்வியறிவு, கிராமப்புற கல்வி, பெண்கள் அதிகாரமளித்தல்",
        "வருடாந்திர CSR அறிக்கை நிறுவன வலைத்தளத்தில் வெளியிடப்படுகிறது",
        "பணியாளர் தன்னார்வத் திட்டங்கள் — ஒரு பணியாளருக்கு ஆண்டுக்கு குறைந்தது 8 மணி நேரம்",
        "கடைசி மைல் சமூக தாக்கத்திற்காக உள்ளூர் NGO களுடன் கூட்டாண்மை",
        "கணேஷ் ஃபைனான்ஸ் அதிக வாடிக்கையாளர் தளத்தைக் கொண்ட மாவட்டங்களில் கவனம்"
      ],
      highlight:"கணேஷ் ஃபைனான்ஸ் 2020 இல் நிறுவப்பட்டதிலிருந்து 50+ நிதி கல்வியறிவு பட்டறைகளை நடத்தியுள்ளது, 5,000+ கிராமப்புற குடும்பங்களைச் சென்றடைந்துள்ளது."
    },
    {
      id:"statutory-auditors",
      title:"சட்டப்பூர்வ தணிக்கையாளர்கள் நியமனக் கொள்கை",
      short:"சட்டப்பூர்வ தணிக்கையாளர்களுக்கான சுதந்திரம் மற்றும் சுழற்சி தரநிலைகள்.",
      overview:"இந்த கொள்கை நிறுவனச் சட்டம், 2013 மற்றும் NBFCகளுக்கான RBI வழிகாட்டுதல்களுக்கு இணங்க தகுதிவாய்ந்த, சுயாதீன சட்டப்பூர்வ தணிக்கையாளர்களின் தேர்வை உறுதி செய்கிறது.",
      points:[
        "தணிக்கைக் குழு பரிந்துரையின் பேரில் வாரியத்தால் தணிக்கையாளர் தேர்வு",
        "ஒவ்வொரு 5 ஆண்டுகளுக்கும் கட்டாய சுழற்சி (அல்லது நிறுவனச் சட்ட விதிகளின்படி)",
        "சுதந்திரத்தை பாதிக்கும் ஒரே நேரத்தில் தணிக்கை அல்லாத சேவைகள் இல்லை",
        "தணிக்கையாளர் செல்லுபடியாகும் ICAI பயிற்சிச் சான்றிதழை வைத்திருக்க வேண்டும்",
        "ஒவ்வொரு நியமனத்திற்கும் முன் நலன் முரண்பாடு சோதனைகள் நடத்தப்படுகின்றன",
        "AGM இல் பங்குதாரர்களால் தணிக்கைக் கட்டணங்கள் அங்கீகரிக்கப்படுகின்றன"
      ],
      highlight:"எங்கள் தணிக்கைக் குழு நிர்வாக செல்வாக்கு இல்லாமல் அனைத்து தணிக்கையாளர் வேட்பாளர்களையும் சுயாதீனமாக மதிப்பீடு செய்கிறது, முழுமையான புறநிலைத்தன்மையை உறுதி செய்கிறது."
    },
    {
      id:"human-rights",
      title:"மனித உரிமைகள் கொள்கை",
      short:"பாகுபாடு, சுரண்டல் அல்லது கட்டாய உழைப்புக்கு பூஜ்ஜிய சகிப்புத்தன்மை.",
      overview:"கணேஷ் ஃபைனான்ஸ் அனைத்து வணிக நடவடிக்கைகளிலும் உலகளாவிய மனித உரிமைகள் தரநிலைகளை நிலைநிறுத்துகிறது, ஒவ்வொரு ஊழியர், வாடிக்கையாளர் மற்றும் பங்குதாரரையும் கண்ணியத்துடனும் மரியாதையுடனும் நடத்துகிறது.",
      points:[
        "குழந்தைத் தொழிலாளர், கட்டாய உழைப்பு அல்லது கடத்தலுக்கு பூஜ்ஜிய சகிப்புத்தன்மை",
        "சம வாய்ப்பு முதலாளி — எந்தவித பாகுபாடும் இல்லை",
        "பாதுகாப்பான பணியிடம் — பயிற்சி பெற்ற ICC உடன் POSH சட்ட இணக்கம்",
        "அனைத்து ஒப்பந்த ஊழியர்களுக்கும் வாழ்க்கை ஊதிய தரநிலைகள் பயன்படுத்தப்படுகின்றன",
        "விற்பனையாளர் மற்றும் கூட்டாளர் தேர்வில் மனித உரிமைகள் உரிய விடாமுயற்சி",
        "உள்நாட்டில் நடத்தப்படும் வருடாந்திர மனித உரிமைகள் இடர் மதிப்பீடு"
      ],
      highlight:"நாங்கள் எங்கள் மனித உரிமைகள் கொள்கையை UN வணிகம் மற்றும் மனித உரிமைகள் வழிகாட்டும் கொள்கைகளுடன் சீரமைக்கிறோம், எங்கள் துறையில் NBFCகளுக்கு உயர் தரத்தை அமைக்கிறோம்."
    },
    {
      id:"responsible-advocacy",
      title:"பொறுப்பான வாதிடல் கொள்கை",
      short:"ஒழுங்குமுறையாளர்கள், தொழில்துறை அமைப்புகள் மற்றும் ஊடகங்களுடன் நெறிமுறை ஈடுபாடு.",
      overview:"கணேஷ் ஃபைனான்ஸ் ஒழுங்குமுறையாளர்கள், தொழில்துறை சங்கங்கள் மற்றும் பொது மன்றங்களுடன் பொறுப்புடன் ஈடுபடுகிறது — எங்கள் வாதிடல் வெளிப்படையான, சான்றுகள்-அடிப்படையிலான மற்றும் பொது நலனுடன் சீரமைக்கப்பட்டதை எப்போதும் உறுதி செய்கிறது.",
      points:[
        "அனைத்து ஒழுங்குமுறை சமர்ப்பிப்புகளும் இணக்க அதிகாரியால் மதிப்பாய்வு செய்யப்படுகின்றன",
        "வெளிப்படுத்தப்படாத அரசியல் பங்களிப்புகள் அல்லது வாதிடல் செலவுகள் இல்லை",
        "நியமிக்கப்பட்ட செய்தித் தொடர்பாளர்கள் மூலம் மட்டுமே ஊடக தகவல்தொடர்புகள்",
        "தொழில்துறை சங்க உறுப்பினர்கள் வருடாந்திர அறிக்கையில் வெளியிடப்படுகின்றனர்",
        "வாடிக்கையாளர் மற்றும் சமூக நலனுடன் சீரமைக்கப்பட்ட வாதிடல் நிலைகள்",
        "வாரியத்தால் வருடாந்திர வாதிடல் நடவடிக்கைகள் மதிப்பாய்வு"
      ],
      highlight:"பொறுப்பான வாதிடல் ஆரோக்கியமான நிதி சுற்றுச்சூழல் அமைப்பு மற்றும் NBFCகளுக்கான உள்ளடக்கிய ஒழுங்குமுறை சூழலுக்கு பங்களிக்கிறது என்று நாங்கள் நம்புகிறோம்."
    },
    {
      id:"diversity",
      title:"பன்முகத்தன்மை, உள்ளடக்கம் மற்றும் சம வாய்ப்புக் கொள்கை",
      short:"அனைவருக்கும் உள்ளடக்கிய, சமமான பணியிடத்தை உருவாக்குதல்.",
      overview:"கணேஷ் ஃபைனான்ஸ் ஒரு பன்முகத்தன்மை மற்றும் உள்ளடக்கிய நிறுவனத்தை உருவாக்க உறுதிபூண்டுள்ளது, அங்கு ஒவ்வொரு தனிநபரும் — பின்னணியைப் பொருட்படுத்தாமல் — செழித்து, தங்கள் முழு திறனுக்கும் பங்களிக்க முடியும்.",
      points:[
        "மூத்த நிர்வாக பதவிகளில் பெண்களுக்கான பன்முகத்தன்மை இலக்குகள்",
        "முடிந்தவரை குருட்டு திரையிடலுடன் உள்ளடக்கிய ஆட்சேர்ப்பு நடைமுறைகள்",
        "மாற்றுத்திறனாளி ஊழியர்களுக்கான வசதிகள்",
        "ஆண்டு முழுவதும் பன்முக கலாச்சார திருவிழாக்கள் மற்றும் விழிப்புணர்வு திட்டங்கள்",
        "அனைத்து ஊழியர்களுக்கும் வருடாந்திர கட்டாய துன்புறுத்தல் எதிர்ப்பு பயிற்சி",
        "பன்முகத்தன்மை அளவீடுகள் காலாண்டு வாரியத்திற்கு அறிவிக்கப்படும்"
      ],
      highlight:"எங்கள் வாடிக்கையாளர்-முகம் கொண்ட ஊழியர்களில் 40%+ பெண்கள் என்று நாங்கள் பெருமைப்படுகிறோம், மேலும் தலைமைத்துவ மட்டங்களில் பிரதிநிதித்துவத்தை அதிகரிக்க நாங்கள் தீவிரமாக செயல்பட்டு வருகிறோம்."
    },
    {
      id:"stakeholders",
      title:"பங்குதாரர்கள் ஈடுபாடு கொள்கை",
      short:"அனைத்து பங்குதாரர் குழுக்களுடன் கட்டமைக்கப்பட்ட ஈடுபாடு.",
      overview:"எங்கள் பங்குதாரர்கள் ஈடுபாடு கொள்கை கணேஷ் ஃபைனான்ஸ் எவ்வாறு அனைத்து பங்குதாரர் குழுக்களை அடையாளம் காண்கிறது, அவர்களுடன் தொடர்பு கொள்கிறது மற்றும் எங்கள் முடிவெடுக்கும் செயல்பாட்டில் கருத்துக்களை இணைக்கிறது என்பதை வரையறுக்கிறது.",
      points:[
        "வருடாந்திர பங்குதாரர் மேப்பிங் பயிற்சி நடத்தப்படுகிறது",
        "முதலீட்டாளர்கள், வாடிக்கையாளர்கள், ஒழுங்குமுறையாளர்களுக்கான அர்ப்பணிக்கப்பட்ட ஈடுபாடு நாட்காட்டி",
        "இரண்டு ஆண்டுகளுக்கு ஒருமுறை வாடிக்கையாளர் திருப்தி கணக்கெடுப்புகள் நடத்தப்படுகின்றன",
        "செயல்-திட்டமிடல் பின்தொடர்தலுடன் பணியாளர் ஈடுபாடு கணக்கெடுப்புகள்",
        "புதிய புவியியல் பகுதிகளில் நுழைவதற்கு முன் சமூக ஆலோசனைகள்",
        "வருடாந்திர பங்குதாரர்கள் அறிக்கை நிறுவன வலைத்தளத்தில் வெளியிடப்படுகிறது"
      ],
      highlight:"நாங்கள் பங்குதாரர் ஈடுபாட்டை ஒரு இணக்க நடவடிக்கையாக அல்ல, மாறாக நீண்டகால நிறுவன பின்னடைவைக் கட்டியெழுப்புவதற்கான ஒரு மூலோபாய கருவியாகக் கருதுகிறோம்."
    },
  ],
},
te:{
  section_tag: "అనుపాలన మరియు గవర్నెన్స్",
  section_title: "విధానం",
  section_desc: "గణేష్ ఫైనాన్స్ మా వ్యాపారం యొక్క ప్రతి అంశంలో న్యాయమైన ప్రవర్తన, పారదర్శకత మరియు నియంత్రణాత్మక అనుపాలనను నిర్ధారించే విధానాల యొక్క విస్తృత ఆకృతి కింద పని చేస్తుంది. మరిన్ని తెలుసుకోవడానికి ఏ విధానంపైనా క్లిక్ చేయండి.",
  commitment_tag: "మా ప్రతిబద్ధత",
  commitment_title_1: "న్యాయమైన ప్రాక్టీస్ ",
  commitment_title_hl: "మూలాలు",
  commitment_sub: "2020లో మా స్థాపన తర్వాత, న్యాయమైన ప్రాక్టీస్ గణేష్ ఫైనాన్స్‌లో ప్రతి నిర్ణయం యొక్క ఆధారస్తంభం అయింది.",
  stat_assets: "నిర్వహణ క్రింది ఆస్తులు",
  stat_customers: "సంతృప్తి చెందిన గ్రాహకులు",
  stat_founded: "స్థాపన",
  card_tagline: "పారదర్శకత. విశ్వాసం. అఖండత.",
  card_body: "గణేష్ ఫైనాన్స్‌లో ప్రతి లోన్, ప్రతి లావాదేవీ, ప్రతి సంభాషణ మా గ్రాహకులను మొదటి స్థానంలో ఉంచే సూత్రాల ద్వారా నిర్వహించబడుతుంది.",
  fp1_title: "ముందుగానే పారదర్శకం",
  fp1_body: "గణేష్ ఫైనాన్స్‌లో, మీరు సంతకం చేసే ముందే ప్రతి రుసుము, వడ్డీ రేటు మరియు ప్రతి షరతును స్పష్టంగా వెల్లడిస్తాము. మా లోన్ డాక్యుమెంట్లు సాదా భాషలో రాయబడ్డాయి — మోసం చేయడానికి ఎలాంటి చిన్న అక్షరాలు లేవు.",
  fp2_title: "గ్రాహక-కేంద్రిత నిర్ణయాలు",
  fp2_body: "మేము తయారు చేసే ప్రతి విధానం ఒక సాదా ప్రశ్నతో మొదలవుతుంది: ఇది మా గ్రాహకుడికి న్యాయమైనదా? లవచీక ఎమిఐల నుంచి దీర్ఘకాలిక రుణగ్రహీతలకు శూన్య దండాల వరకు, మా విధానాలు మీ అవసరాల చుట్టూ తయారు చేయబడ్డాయి.",
  fp3_title: "నియంత్రణాత్మక అనుపాలన ఒక శక్తిగా",
  fp3_body: "రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియా ద్వారా నమోదు చేయబడి నియంత్రించబడుతున్న గణేష్ ఫైనాన్స్ అనుపాలనను భారంగా కాకుండా పోటీ ప్రయోజనంగా భావిస్తుంది — మేము అత్యున్నత అఖండత ప్రమాణాలతో పని చేస్తామని ఇది నిరూపిస్తుంది.",
  fp4_title: "మా సమాజంతో వృద్ధి",
  fp4_body: "2020 నుంచి, మేము ఒక బ్రాంచ్ నుంచి 1,000+ గ్రాహకులకు సేవలు అందించడం వరకు విస్తరించాము. మా ₹1.5 కోట్ల ఆస్తి ఆధారం మా సమాజం మా మీద ఉంచిన విశ్వాసానికి ప్రతిబింబం — ఈ పేజీలోని ప్రతి విధానం ద్వారా ఆ విశ్వాసాన్ని రక్షిస్తాము.",
  modal_company: "గణేష్ ఫైనాన్స్",
  modal_overview: "సంగ్రహం",
  modal_key: "ప్రధాన నిబంధనలు",
  modal_cta: "ఈ విధానం గురించి అడగండి",
  modal_close: "మూసివేయి",
  view_details: "వివరాలు చూడండి",
  policies: [
    {
      id:"fair-practices",
      title:"న్యాయమైన వ్యవహారాల కోడ్",
      short:"అన్ని గ్రాహకులకు పారదర్శక, నైతిక లోన్ ప్రమాణాలు.",
      overview:"గణేష్ ఫైనాన్స్ యొక్క న్యాయమైన వ్యవహారాల కోడ్ అన్ని లోన్ ఉత్పత్తులను పూర్తి పారదర్శకత, న్యాయం మరియు ఎలాంటి తక్కువచేయకుండా అందించడానికి విస్తృత మార్గదర్శకాలను స్థాపిస్తుంది.",
      points:[
        "లోన్ అన్ని షరతులు, వడ్డీ రేటు మరియు రుసుములను అనుమతి ముందు స్పష్టంగా వెల్లడించడం",
        "ఎలాంటి దాచిన రుసుములు లేవు — లిఖితపూర్వకంగా పూర్తి వివరాలు ఇవ్వబడతాయి",
        "జాతి, మతం, లింగం లేదా ప్రాంతం ఆధారంగా సమాన వ్యవహారం",
        "30 పని దినాల్లో ఫిర్యాదు పరిష్కారం",
        "డైరెక్టర్ల బోర్డు ద్వారా వార్షిక సమీక్ష మరియు కోడ్ అప్‌డేట్",
        "లోన్ వితరణ ముందు గ్రాహకుడి అంగీకారం తప్పనిసరి"
      ],
      highlight:"మా న్యాయమైన వ్యవహారాల కోడ్ RBI మార్గదర్శకాలతో సమన్వయంగా ఉండేలా వార్షిక సమీక్ష చేయబడుతుంది మరియు మా డైరెక్టర్ల బోర్డు ద్వారా ఆమోదించబడుతుంది."
    },
    {
      id:"code-of-conduct",
      title:"ఆచార సంహిత",
      short:"అన్ని సిబ్బంది మరియు ఏజెంట్లకు వృత్తిపరమైన ఆచార ప్రమాణాలు.",
      overview:"మా ఆచార సంహిత ప్రతి గణేష్ ఫైనాన్స్ ఉద్యోగి, ఏజెంట్ మరియు భాగస్వామి నైతిక ఆకృతిలో పని చేయడాన్ని నిర్వచిస్తుంది — నమ్మకాన్ని పునాది నుంచి బలోపేతం చేస్తుంది.",
      points:[
        "లంచం, అవినీతి లేదా అనైతిక డిమాండ్‌లకు శూన్య సహనం",
        "అన్ని సిబ్బందికి వార్షిక తప్పనిసరి నైతికత శిక్షణ",
        "అన్ని గ్రాహక సమాచారానికి గోప్యత బాధ్యత",
        "వ్యతిరేక హితాల ప్రకటన ప్రోటోకాల్",
        "ప్రతి స్థాయిలో ఉల్లంఘనకు క్రమశిక్షణ చర్యల మెట్రిక్స్",
        "మంచి విశ్వాసంతో రిపోర్ట్ చేసే వారికి విజిల్‌బ్లోయర్ రక్షణ"
      ],
      highlight:"ఉద్యోగులు వార్షిక ఆచార సంహితపై సంతకం చేసి అంగీకరించాలి మరియు ఉల్లంఘనలు నిర్మాణాత్మక, నిష్పక్షపాత క్రమశిక్షణ ప్రక్రియ ద్వారా పరిష్కరించబడతాయి."
    },
    {
      id:"interest-rate",
      title:"వడ్డీ రేటు విధానం",
      short:"RBI అనుపాలన, పారదర్శక వడ్డీ రేటు నిర్మాణం.",
      overview:"గణేష్ ఫైనాన్స్ బోర్డు ఆమోదిత వడ్డీ రేటు విధానాన్ని పాటిస్తుంది, ఇది అన్ని క్రెడిట్ ఉత్పత్తులకు పోటీ, పారదర్శక మరియు RBI అనుపాలన ధరను నిర్ధారిస్తుంది.",
      points:[
        "అసెట్ లయబిలిటీ మేనేజ్‌మెంట్ కమిటీ (ALCO) ద్వారా వడ్డీ రేటు నిర్ణయం",
        "నాణ్యత ఖర్చు, రిస్క్ ప్రీమియం మరియు మార్కెట్ బెంచ్‌మార్క్‌లపై ఆధారపడిన రేటు",
        "తక్కువచేయకుండా రేటు — ఒకే ఉత్పత్తి, అన్ని గ్రాహకులకు ఒకే షరతులు",
        "వడ్డీ రేటు మార్పు కమాణీ 30 రోజుల ముందు ప్రకటన",
        "గోల్డ్ లోన్ రేటు ప్రముఖ NBFCలు మరియు బ్యాంకులతో పోటీ",
        "ప్రాసెసింగ్ ఫీ మరియు ప్రీ-పేమెంట్ ఛార్జీలు ముందుగానే వెల్లడి"
      ],
      highlight:"అన్ని రేటు మార్పులు RBI NBFC నియమాల ప్రకారం రిపోర్ట్ చేయబడతాయి మరియు పూర్తి పబ్లిక్ పారదర్శకత కోసం మా వెబ్‌సైట్‌లో ప్రచురించబడతాయి."
    },
    {
      id:"privacy",
      title:"గోప్యతా విధానం",
      short:"మీ డేటా IT చట్టం మరియు RBI డేటా మార్గదర్శకాల కింద రక్షితం.",
      overview:"గణేష్ ఫైనాన్స్ గ్రాహక గోప్యతను ప్రాథమిక హక్కుగా భావిస్తుంది. మా గోప్యతా విధానం వ్యక్తిగత మరియు ఆర్థిక సమాచారాన్ని ఎలా సేకరించాలి, ఉపయోగించాలి, నిల్వ చేయాలి మరియు రక్షించాలో నియంత్రిస్తుంది.",
      points:[
        "డేటా కేవలం పేర్కొన్న, నిర్దిష్ట లోన్ ప్రయోజనం కోసం సేకరించబడుతుంది",
        "గ్రాహక డేటా మూడవ పక్షాలకు అమ్మకం లేదా షేరింగ్ అంగీకారం లేకుండా జరగదు",
        "అన్ని డిజిటల్ లావాదేవీలకు ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్షన్",
        "గ్రాహకుడు ఎప్పుడైనా డేటా సవరణ లేదా తొలగింపు అభ్యర్థన చేయవచ్చు",
        "డేటా నిల్వ విధానం RBI మరియు IT చట్టం ప్రకారం",
        "స్వతంత్ర సైబర్ సెక్యూరిటీ కంపెనీల ద్వారా నియమిత సెక్యూరిటీ ఆడిట్"
      ],
      highlight:"మేము సమాచార సాంకేతిక చట్టం, 2000 మరియు NBFCల కోసం RBI గోప్యతా మార్గదర్శకాలతో పూర్తి అనుపాలన చేస్తాము."
    },
    {
      id:"vigil-mechanism",
      title:"జాగృత వ్యవస్థ",
      short:"ఆందోళనలు రిపోర్ట్ చేయడానికి సురక్షిత విజిల్‌బ్లోయర్ ఛానల్.",
      overview:"మా జాగృత వ్యవస్థ ఉద్యోగులు, గ్రాహకులు మరియు స్టేక్‌హోల్డర్లకు అనైతిక ప్రవర్తన, మోసం లేదా విధాన ఉల్లంఘన గురించి నిజమైన ఆందోళనలను రిపోర్ట్ చేయడానికి నిర్మాణాత్మక, గోప్య ఛానల్ అందిస్తుంది.",
      points:[
        "ప్రత్యేక ఇమెయిల్ మరియు హాట్‌లైన్ ద్వారా అనామక రిపోర్టింగ్ అందుబాటులో ఉంది",
        "అన్ని ఫిర్యాదులు స్వతంత్ర కమిటీ ద్వారా పరిశీలించబడతాయి",
        "విజిల్‌బ్లోయర్ గుర్తింపు కఠినంగా గోప్యంగా ఉంచబడుతుంది",
        "మంచి విశ్వాసంతో రిపోర్ట్ చేసేవారికి ఎలాంటి ప్రతికూలత, డిమోషన్ లేదా ప్రతికూల చర్య ఉండదు",
        "పరిష్కార సమయపరిమితి: సాధారణ కేసులకు 45 పని దినాలు",
        "పరిష్కారం కాకపోతే బోర్డు ఆడిట్ కమిటీకి ఎస్కలేషన్"
      ],
      highlight:"జాగృత వ్యవస్థ నేరుగా మా బోర్డు ఆడిట్ కమిటీ పర్యవేక్షణలో ఉంచబడుతుంది, ఇది మేనేజ్‌మెంట్ ప్రభావం నుంచి స్వతంత్రతను నిర్ధారిస్తుంది."
    },
    {
      id:"investor-policy",
      title:"పెట్టుబడిదారులకు విధానం",
      short:"న్యాయమైన, సమయానుకూల మరియు పారదర్శక పెట్టుబడిదారుల సంభాషణ.",
      overview:"గణేష్ ఫైనాన్స్ నియమిత ప్రకటనలు, న్యాయమైన ప్రవర్తన మరియు అన్ని వర్తించే కార్పొరేట్ గవర్నెన్స్ ప్రమాణాల అనుపాలన ద్వారా దీర్ఘకాలిక పెట్టుబడిదారుల విశ్వాసాన్ని నిర్మించడానికి కట్టుబడి ఉంది.",
      points:[
        "అన్ని నమోదిత పెట్టుబడిదారులతో త్రైమాసిక ఆర్థిక అప్‌డేట్‌లు షేర్ చేయబడతాయి",
        "వార్షిక సాధారణ సభ ఆర్థిక సంవత్సరం ముగిసిన తర్వాత 6 నెలల్లో నిర్వహించబడుతుంది",
        "ముఖ్యమైన అభివృద్ధి 24 గంటల్లో కంపెనీ వెబ్‌సైట్‌లో ప్రకటించబడుతుంది",
        "పెట్టుబడిదారుల ఫిర్యాదు పరిష్కారం 15 పని దినాల్లో",
        "SEBI మరియు RBI రిపోర్టింగ్ ప్రమాణాల కఠినమైన అనుపాలన",
        "ప్రశ్నల కోసం ప్రత్యేక ఇన్వెస్టర్ రిలేషన్స్ సంప్రదింపు"
      ],
      highlight:"గణేష్ ఫైనాన్స్ అన్ని స్టేక్‌హోల్డర్లకు స్థిరమైన వ్యాపార వృద్ధిని నిర్ధారిస్తూ పెట్టుబడిదారుల హక్కులను రక్షించే బలమైన గవర్నెన్స్ నిర్మాణాన్ని కాపాడుతుంది."
    },
    {
      id:"securities-trading",
      title:"సెక్యూరిటీల ట్రేడింగ్ నియమాలు",
      short:"ఇన్సైడర్ ట్రేడింగ్ నివారణ మరియు అనుపాలన నిర్మాణం.",
      overview:"మా సెక్యూరిటీల ట్రేడింగ్ నియమాలు ఇన్సైడర్ ట్రేడింగ్‌ను అడ్డుకుంటాయి మరియు సంబంధిత వ్యక్తుల అన్ని మార్కెట్ కార్యకలాపాలు SEBI నియమాలను పాటించేలా చూస్తాయి.",
      points:[
        "నామినేటెడ్ వ్యక్తుల జాబితాను నిర్వహించడం మరియు త్రైమాసిక అప్‌డేట్",
        "నిర్దేశిత పరిమితి కంటే ఎక్కువ ట్రేడ్‌లకు తప్పనిసరి ముందు అనుమతి",
        "ఆర్థిక ఫలితాలు ప్రకటించే ముందు ట్రేడింగ్ విండో బ్లాక్‌అవుట్ కాలం",
        "ఉల్లంఘనకు దండ: తక్షణ సస్పెన్షన్ మరియు చట్టపరమైన చర్య",
        "అన్ని నామినేటెడ్ వ్యక్తుల నుంచి వార్షిక అనుపాలన సర్టిఫికేట్ తప్పనిసరి",
        "SEBI PIT నియమాలపై నియమిత జాగృతి కార్యక్రమాలు"
      ],
      highlight:"మా అనుపాలన అధికారి అన్ని నామినేటెడ్ వ్యక్తుల ట్రేడ్‌లను పర్యవేక్షిస్తాడు మరియు త్రైమాసికంగా ఆడిట్ కమిటీకి రిపోర్ట్ చేస్తాడు."
    },
    {
      id:"app-disclaimer",
      title:"అప్లికేషన్ అస్వీకారం",
      short:"మొబైల్ యాప్ వినియోగ షరతులు, డేటా మరియు బాధ్యత ఖండన.",
      overview:"గణేష్ ఫైనాన్స్ మొబైల్ అప్లికేషన్ సౌకర్యంగా అందించబడింది. ఈ అస్వీకారం వినియోగ షరతులు, బాధ్యత పరిమితి మరియు వినియోగదారు బాధ్యతలను చూపిస్తుంది.",
      points:[
        "యాప్ కేవలం సమాచారం మరియు అప్లికేషన్ ప్రయోజనం కోసం",
        "లోన్ అనుమతి భౌతిక ధృవీకరణ మరియు క్రెడిట్ మూల్యాంకనానికి లోబడి ఉంటుంది",
        "స్క్రీన్‌షాట్ లేదా యాప్ అవుట్‌పుట్ చట్టపరమైన బంధన డాక్యుమెంట్ కాదు",
        "యాప్ పనితీరు నెట్‌వర్క్ మరియు డివైస్ స్థితికి లోబడి ఉంటుంది",
        "అనధికార ప్రవేశం నుంచి వచ్చే నష్టాలకు గణేష్ ఫైనాన్స్ బాధ్యత వహించదు",
        "అప్‌డేట్‌లు ఫీచర్లను మార్చవచ్చు; నిరంతర వినియోగం అంగీకారాన్ని సూచిస్తుంది"
      ],
      highlight:"అధికారిక లోన్ అనుమతి లేఖ మరియు బంధన ఒప్పందాలకు మా నమోదిత కార్యాలయాల ద్వారా జారీ చేయబడిన డాక్యుమెంట్లు మాత్రమే చట్టపరమైన చెల్లుబాటు కలిగి ఉంటాయి."
    },
    {
      id:"auction-policy",
      title:"లిలామ్ విధానం",
      short:"పారదర్శక, RBI అనుపాలన గోల్డ్ లిలామ్ ప్రక్రియ.",
      overview:"లోన్ డిఫాల్ట్ సందర్భంలో, గణేష్ ఫైనాన్స్ కఠినమైన, RBI-ఆమోదిత లిలామ్ విధానాన్ని పాటిస్తుంది, ఇది గ్రాహకులకు న్యాయమైన వ్యవహారం మరియు ప్లెడ్జ్ చేసిన గోల్డ్ యొక్క పారదర్శక లిలామ్‌ను నిర్ధారిస్తుంది.",
      points:[
        "లిలామ్ ప్రక్రియ ప్రారంభించే ముందు కనీసం 14 రోజుల లిఖిత సూచన",
        "కేవలం ప్రమాణీకరించబడిన లైసెన్స్ లిలామ్ కారుల ద్వారా లిలామ్ నిర్వహణ",
        "గ్రాహకుడికి లిలామ్ తేదీ, స్థలం మరియు రిజర్వ్ ధర తెలియజేయబడుతుంది",
        "అదనపు మొత్తం (ఉంటే) 7 పని దినాల్లో గ్రాహకుడికి తిరిగి ఇవ్వబడుతుంది",
        "లిలామ్ రికార్డులు నిర్వహించబడతాయి మరియు గ్రాహకుడి తనిఖీకి అందుబాటులో ఉంటాయి",
        "లిలామ్ ప్రారంభం వరకు గ్రాహకుడు ప్లెడ్జ్ చేసిన గోల్డ్‌ను రిడీమ్ చేయవచ్చు"
      ],
      highlight:"మా లిలామ్ విధానం RBI గోల్డ్ లోన్ మాస్టర్ సర్క్యులర్‌ను కఠినంగా పాటిస్తుంది మరియు లిలామ్ ముందు గ్రాహకుడి బకాయి మొత్తం యొక్క గరిష్ట వసూలును నిర్ధారిస్తుంది."
    },
    {
      id:"loan-policy",
      title:"లోన్ విధానం",
      short:"అర్హత, అనుమతి, వితరణ మరియు వసూలు ప్రమాణాలు.",
      overview:"గణేష్ ఫైనాన్స్ లోన్ విధానం మొత్తం క్రెడిట్ లైఫ్ సైకిల్‌ను నియంత్రిస్తుంది — అర్హత మూల్యాంకనం మరియు అనుమతి నుంచి వితరణ, పర్యవేక్షణ మరియు వసూలు వరకు.",
      points:[
        "అన్ని లోన్ అప్లికేషన్లకు KYC మరియు ఆదాయ ధృవీకరణ తప్పనిసరి",
        "RBI ప్రమాణాల ప్రకారం గోల్డ్ లోన్ LTV రేషియో గరిష్టం 75%",
        "ఓనర్‌షిప్ స్కోరింగ్ మరియు బ్యూరో డేటా ఉపయోగించి క్రెడిట్ మూల్యాంకనం",
        "డాక్యుమెంట్ ధృవీకరణ తర్వాత 24 గంటల్లో వితరణ",
        "వ్యవసాయ మరియు సీజనల్ రుణగ్రహీతలకు EMI సెలవు అందుబాటులో ఉంది",
        "RBI NBFC ప్రూడెన్షియల్ నార్మ్ ప్రకారం NPA వర్గీకరణ"
      ],
      highlight:"మా లోన్ విధానం ప్రస్తుత మార్కెట్ పరిస్థితులు మరియు నియంత్రణాత్మక అవసరాలను ప్రతిబింబించడానికి రిస్క్ మేనేజ్‌మెంట్ కమిటీ ద్వారా అర్ధవార్షిక సమీక్ష చేయబడుతుంది."
    },
    {
      id:"code-fair-practices",
      title:"న్యాయమైన వ్యవహారాల కోడ్",
      short:"రుణగ్రహీత, వసూలు ఏజెంట్ మరియు సిబ్బందితో నైతిక వ్యవహారం.",
      overview:"మా ప్రధాన నైతిక ఆకృతి విస్తరణ, ఈ కోడ్ వసూలు, ఫీల్డ్ కార్యాలు మరియు గ్రాహక-ముఖాముఖి కార్యకలాపాలలో న్యాయమైన వ్యవహారాన్ని సంబోధిస్తుంది.",
      points:[
        "ఎలాంటి బలవంతం లేదా దూకుడు వసూలు వ్యూహాలకు అనుమతి లేదు",
        "వసూలు కాల్స్ స్థానిక సమయం ప్రకారం ఉదయం 8 నుంచి సాయంత్రం 7 వరకు మాత్రమే",
        "ఏజెంట్లు గుర్తింపు కార్డు మరియు కంపెనీ అధికారిక లేఖతో ఉంచాలి",
        "గ్రాహకుడి యజమానితో ముందు అంగీకారం లేకుండా సంప్రదింపు లేదు",
        "నిజమైన ఇబ్బందుల ఆధారంగా చెల్లింపు షెడ్యూల్ మళ్లీ అమర్చడం",
        "అన్ని గ్రాహక సంభాషణలు 3 సంవత్సరాల వరకు రికార్డు చేయబడి నిల్వ చేయబడతాయి"
      ],
      highlight:"మేము అన్ని వసూలు సిబ్బందికి నైతిక ప్రాక్టీస్ మరియు గ్రాహక హక్కులపై త్రైమాసిక శిక్షణ ఇస్తాము మరియు ఏ ఉల్లంఘనకైనా పనితీరు సమీక్షలో దండించాము."
    },
    {
      id:"terms",
      title:"షరతులు & నియమాలు",
      short:"అన్ని గణేష్ ఫైనాన్స్ ఉత్పత్తులకు సాధారణ చట్టపరమైన షరతులు.",
      overview:"షరతులు & నియమాలు గణేష్ ఫైనాన్స్ ద్వారా అందించబడే అన్ని ఉత్పత్తులు మరియు సేవల చట్టపరమైన పునాదిని ఏర్పరుస్తాయి, అన్ని పక్షాలకు స్పష్టత మరియు భద్రతను నిర్ధారిస్తాయి.",
      points:[
        "భారత చట్టాల కింద నియంత్రించబడుతుంది; అధికార పరిధి: నమోదిత రాష్ట్ర కోర్టులు",
        "సేవా షరతులు 30 రోజుల ముందు సూచనతో అప్‌డేట్ చేయవచ్చు",
        "డిజిటల్ అంగీకారానికి భౌతిక సంతకం వలెనే చట్టపరమైన చెల్లుబాటు",
        "ఫోర్స్ మేజ్యూర్ ఖండంలో సహజ విపత్తులు, మహమ్మారి మరియు నియంత్రణ చర్యలు చేర్చబడ్డాయి",
        "1996 ఆర్బిట్రేషన్ చట్టం కింద ఆర్బిట్రేషన్ ద్వారా వివాద పరిష్కారం",
        "అన్ని మొత్తాలు భారతీయ రూపాయల్లో; GST/పన్ను గ్రాహకుడి ద్వారా"
      ],
      highlight:"మేము అన్ని గ్రాహకులను షరతులు & నియమాలను జాగ్రత్తగా చదవమని సూచిస్తాము. మా కస్టమర్ కేర్ టీమ్ ఏ ఖండాన్నైనా సాదా భాషలో వివరించడానికి అందుబాటులో ఉంది."
    },
    {
      id:"csr",
      title:"CSR విధానం",
      short:"సమాజ పెట్టుబడి మరియు సామాజిక బాధ్యతకు కట్టుబడి.",
      overview:"గణేష్ ఫైనాన్స్ CSR విధానం మేము సేవలు అందించే సమాజాలకు తిరిగి ఇవ్వడం పట్ల మా కట్టుబడిని ప్రతిబింబిస్తుంది. 2020 నుంచి మేము విద్య, ఆర్థిక అక్షరాస్యత మరియు స్థానిక అభివృద్ధిలో వనరులను ఉపయోగించాము.",
      points:[
        "కంపెనీ చట్టం 2013 మార్గదర్శకాల ప్రకారం CSR వ్యయం (వర్తించినప్పుడు)",
        "ప్రాధాన్యతా రంగాలు: ఆర్థిక అక్షరాస్యత, గ్రామీణ విద్య, మహిళా సాధికారత",
        "వార్షిక CSR నివేదిక కంపెనీ వెబ్‌సైట్‌లో ప్రచురించబడుతుంది",
        "ఉద్యోగి స్వచ్ఛంద కార్యక్రమం — ప్రతి ఉద్యోగికి వార్షికంగా కనీసం 8 గంటలు",
        "చివరి మైలు సమాజ ప్రభావం కోసం స్థానిక NGOలతో భాగస్వామ్యం",
        "గణేష్ ఫైనాన్స్ యొక్క అత్యధిక గ్రాహక ఆధారం ఉన్న జిల్లాలపై దృష్టి"
      ],
      highlight:"గణేష్ ఫైనాన్స్ 2020లో స్థాపన తర్వాత 50+ ఆర్థిక అక్షరాస్యత వర్క్‌షాప్‌లు నిర్వహించింది, ఇవి 5,000+ గ్రామీణ కుటుంబాలను చేరుకున్నాయి."
    },
    {
      id:"statutory-auditors",
      title:"స్టాట్యుటరీ ఆడిటర్ల నియామక విధానం",
      short:"స్టాట్యుటరీ ఆడిటర్లకు స్వతంత్రత మరియు రొటేషన్ ప్రమాణాలు.",
      overview:"ఈ విధానం కంపెనీ చట్టం, 2013 మరియు NBFCల కోసం RBI మార్గదర్శకాల ప్రకారం తగిన, స్వతంత్ర స్టాట్యుటరీ ఆడిటర్ల ఎంపికను నిర్ధారిస్తుంది.",
      points:[
        "ఆడిట్ కమిటీ సిఫార్సుతో బోర్డుకు ఆడిటర్ ఎంపిక",
        "ప్రతి 5 సంవత్సరాలకు తప్పనిసరి రొటేషన్ (లేదా కంపెనీ చట్టం ప్రకారం)",
        "స్వతంత్రతను బాధించే సమకాలిక నాన్-ఆడిట్ సేవలు లేవు",
        "ఆడిటర్ వద్ద చెల్లుబాటు అయ్యే ICAI ప్రాక్టీస్ సర్టిఫికేట్ తప్పనిసరి",
        "ప్రతి నియామకం ముందు వ్యతిరేక హితాల తనిఖీ",
        "AGMలో షేర్‌హోల్డర్ల ద్వారా ఆడిట్ ఫీ ఆమోదం"
      ],
      highlight:"మా ఆడిట్ కమిటీ మేనేజ్‌మెంట్ ప్రభావం లేకుండా అన్ని ఆడిటర్ అభ్యర్థుల స్వతంత్ర మూల్యాంకనం చేస్తుంది, పూర్తి నిష్పక్షపాతతను నిర్ధారిస్తుంది."
    },
    {
      id:"human-rights",
      title:"మానవ హక్కుల విధానం",
      short:"తక్కువచేయడం, దోపిడీ లేదా బలవంతపు పనికి శూన్య సహనం.",
      overview:"గణేష్ ఫైనాన్స్ అన్ని వ్యాపార కార్యకలాపాలలో సార్వత్రిక మానవ హక్కుల ప్రమాణాలను కాపాడుతుంది మరియు ప్రతి ఉద్యోగి, గ్రాహకుడు మరియు స్టేక్‌హోల్డర్‌ను గౌరవం మరియు గౌరవంతో వ్యవహరిస్తుంది.",
      points:[
        "బాల కార్మికత, బలవంతపు పని లేదా దోపిడీకి శూన్య సహనం",
        "సమాన అవకాశాల యజమాని — ఏ రకమైన తక్కువచేయడం లేదు",
        "సురక్షిత వర్క్‌ప్లేస్ — POSH చట్టం అనుపాలన శిక్షణ పొందిన ICCతో",
        "అన్ని కాంట్రాక్ట్ సిబ్బందికి లివింగ్ వేజ్ ప్రమాణాలు వర్తింపజేయబడతాయి",
        "వెండర్ మరియు భాగస్వామి ఎంపికలో మానవ హక్కుల డ్యూ డైలిజెన్స్",
        "వార్షిక మానవ హక్కుల రిస్క్ మూల్యాంకనం అంతర్గతంగా చేయబడుతుంది"
      ],
      highlight:"మేము మా మానవ హక్కుల విధానాన్ని UN Guiding Principles on Business and Human Rightsతో సమన్వయం చేస్తాము మరియు మా ప్రాంత NBFCలకు ఉన్నత ప్రమాణాలను స్థాపిస్తాము."
    },
    {
      id:"responsible-advocacy",
      title:"జవాబుదారీ వకాలత్ విధానం",
      short:"నియంత్రకులు, పరిశ్రమ సంస్థలు మరియు మీడియాతో నైతిక సంబంధం.",
      overview:"గణేష్ ఫైనాన్స్ నియంత్రకులు, పరిశ్రమ సంఘాలు మరియు పబ్లిక్ ఫోరమ్‌లతో జవాబుదారీగా వ్యవహరిస్తుంది — ఎప్పుడూ మా వకాలత్ పారదర్శకం, ఆధారాలు ఆధారితం మరియు పబ్లిక్ హితంతో సమన్వయంగా ఉండేలా చూస్తుంది.",
      points:[
        "అన్ని నియంత్రణాత్మక సమర్పణలు అనుపాలన అధికారి ద్వారా సమీక్షించబడతాయి",
        "అప్రకటిత రాజకీయ సహాయం లేదా లాబింగ్ ఖర్చులు లేవు",
        "మీడియా సంభాషణలు కేవలం నామినేటెడ్ వక్తల ద్వారా",
        "పరిశ్రమ సంఘ సభ్యత్వం వార్షిక నివేదికలో ప్రకటించబడుతుంది",
        "వకాలత్ స్థితి గ్రాహకులు మరియు సామాజిక లాభాలతో సమన్వయంగా ఉంటుంది",
        "బోర్డు ద్వారా వార్షిక వకాలత్ కార్యకలాపాల సమీక్ష"
      ],
      highlight:"మాకు విశ్వాసం ఉంది జవాబుదారీ వకాలత్ ఆరోగ్యకరమైన ఆర్థిక ఇకోసిస్టమ్ మరియు NBFCల కోసం మరింత సమావేశక నియంత్రణాత్మక వాతావరణానికి దోహదపడుతుంది."
    },
    {
      id:"diversity",
      title:"వైవిధ్యం, సమావేశం & సమాన అవకాశాల విధానం",
      short:"అందరికీ సమావేశకమైన మరియు సమాన వర్క్‌ప్లేస్‌ను సృష్టించడం.",
      overview:"గణేష్ ఫైనాన్స్ వైవిధ్యమైన మరియు సమావేశక సంస్థను సృష్టించడానికి కట్టుబడి ఉంది, ఇక్కడ ప్రతి వ్యక్తి — నేపథ్యం ఏమైనా — తన పూర్తి సామర్థ్యంతో వృద్ధి చెంది సహకరించవచ్చు.",
      points:[
        "సీనియర్ మేనేజ్‌మెంట్ పదవుల్లో మహిళలకు వైవిధ్య లక్ష్యం",
        "సాధ్యమైన చోట బ్లైండ్ స్క్రీనింగ్‌తో సమావేశక రిక్రూట్‌మెంట్ ప్రక్రియ",
        "వికలాంగ ఉద్యోగులకు వసతి వ్యవస్థలు",
        "సంవత్సరం పొడవునా బహుసాంస్కృతిక పండుగలు మరియు జాగృతి కార్యక్రమాలు",
        "అన్ని సిబ్బందికి వార్షిక తప్పనిసరి యాంటీ-హరాస్‌మెంట్ శిక్షణ",
        "బోర్డుకు త్రైమాసిక వైవిధ్య మెట్రిక్స్ రిపోర్ట్"
      ],
      highlight:"మాకు గర్వం ఉంది మా గ్రాహక-ముఖాముఖి సిబ్బందిలో 40%+ మహిళలు ఉన్నారు మరియు మేము లీడర్‌షిప్ స్థాయిలో ప్రాతినిధ్యాన్ని పెంచడానికి చురుకుగా పని చేస్తున్నాము."
    },
    {
      id:"stakeholders",
      title:"స్టేక్‌హోల్డర్ల సంబంధం విధానం",
      short:"అన్ని స్టేక్‌హోల్డర్ సమూహాలతో నిర్మాణాత్మక సంబంధం.",
      overview:"మా స్టేక్‌హోల్డర్ల సంబంధం విధానం గణేష్ ఫైనాన్స్ అన్ని స్టేక్‌హోల్డర్ సమూహాలను ఎలా గుర్తిస్తుంది, వాటితో సంభాషిస్తుంది మరియు మా నిర్ణయ ప్రక్రియలో ఫీడ్‌బ్యాక్‌ను చేర్చుతుందో నిర్వచిస్తుంది.",
      points:[
        "వార్షిక స్టేక్‌హోల్డర్ మ్యాపింగ్ వ్యాయామం",
        "పెట్టుబడిదారులు, గ్రాహకులు, నియంత్రకుల కోసం ప్రత్యేక సంబంధం క్యాలెండర్",
        "ద్వైవార్షిక గ్రాహక సంతృప్తి సర్వే",
        "యాక్షన్ ప్లాన్ ఫాలో-అప్‌తో ఉద్యోగి సంబంధం సర్వే",
        "కొత్త ప్రాంతంలో ప్రవేశించే ముందు సమాజ సలహా",
        "కంపెనీ వెబ్‌సైట్‌లో వార్షిక స్టేక్‌హోల్డర్ల నివేదిక ప్రచురణ"
      ],
      highlight:"మేము స్టేక్‌హోల్డర్ సంబంధాన్ని అనుపాలన కార్యంగా కాకుండా దీర్ఘకాలిక సంస్థాగత స్థిరత్వాన్ని నిర్మించే వ్యూహాత్మక సాధనంగా చూస్తాము."
    },
  ],
},
as:{
  section_tag: "অনুপালন আৰু শাসন",
  section_title: "নীতি",
  section_desc: "গণেশ ফাইনেন্সে আমাৰ ব্যৱসায়ৰ প্ৰতিটো দিশত ন্যায়সঙ্গত আচৰণ, স্বচ্ছতা আৰু নিয়ন্ত্ৰণাত্মক অনুপালন নিশ্চিত কৰা নীতিৰ বিস্তৃত কাঠামোৰ অধীনত কাম কৰে। অধিক জানিবলৈ যিকোনো নীতিত ক্লিক কৰক।",
  commitment_tag: "আমাৰ প্ৰতিশ্ৰুতি",
  commitment_title_1: "ন্যায়সঙ্গত অনুশীলন ",
  commitment_title_hl: "মূল",
  commitment_sub: "২০২০ত আমাৰ প্ৰতিষ্ঠাৰ পিছত, ন্যায়সঙ্গত অনুশীলন গণেশ ফাইনেন্সত প্ৰতিটো সিদ্ধান্তৰ ভিত্তিস্তম্ভ হৈ পৰিছে।",
  stat_assets: "পৰিচালনাৰ অধীনত সম্পত্তি",
  stat_customers: "সুখী গ্ৰাহক",
  stat_founded: "প্ৰতিষ্ঠা",
  card_tagline: "স্বচ্ছতা। বিশ্বাস। অখণ্ডতা।",
  card_body: "গণেশ ফাইনেন্সত প্ৰতিটো ঋণ, প্ৰতিটো লেনদেন, প্ৰতিটো কথোপকথন আমাৰ গ্ৰাহকক প্ৰথম স্থান দিয়া নীতিৰ দ্বাৰা পৰিচালিত হয়।",
  fp1_title: "পূৰ্বৰে স্বচ্ছ",
  fp1_body: "গণেশ ফাইনেন্সত, আপুনি চহী কৰাৰ আগতে প্ৰতিটো ফী, হাৰ আৰু প্ৰতিটো চৰ্ত স্পষ্টভাৱে ঘোষণা কৰোঁ। আমাৰ ঋণ দস্তাবেজ সাধাৰণ ভাষাত লিখা হৈছে — প্ৰতাৰণা কৰিবলৈ কোনো সৰু আখৰ নাই।",
  fp2_title: "গ্ৰাহক-কেন্দ্ৰিক সিদ্ধান্ত",
  fp2_body: "আমি তৈয়াৰ কৰা প্ৰতিটো নীতি এটা সাধাৰণ প্ৰশ্নৰে আৰম্ভ হয়: ই আমাৰ গ্ৰাহকৰ বাবে ন্যায়সঙ্গত নেকি? লচকীয়া চুক্তিৰ পৰা দীৰ্ঘম্যাদী ঋণগ্ৰহীতাৰ বাবে শূন্য দণ্ডলৈকে, আমাৰ নীতিসমূহ আপোনাৰ প্ৰয়োজনীয়তাৰ চাৰিওফালে তৈয়াৰ কৰা হৈছে।",
  fp3_title: "নিয়ন্ত্ৰণাত্মক অনুপালন এটা শক্তি হিচাপে",
  fp3_body: "ৰিজাৰ্ভ বেংক অফ ইণ্ডিয়াৰ দ্বাৰা নিবন্ধিত আৰু নিয়ন্ত্ৰিত গণেশ ফাইনেন্সে অনুপালনক বোজা হিচাপে নহয়, প্ৰতিযোগিতামূলক সুবিধা হিচাপে গণ্য কৰে — আমি সৰ্বোচ্চ অখণ্ডতাৰ মানদণ্ডৰে কাম কৰোঁ তাৰ প্ৰমাণ।",
  fp4_title: "আমাৰ সমাজৰ সৈতে বৃদ্ধি",
  fp4_body: "২০২০ৰ পৰা, আমি এটা শাখাৰ পৰা ১,০০০+ গ্ৰাহকক সেৱা আগবঢ়োৱালৈকে বিস্তাৰ লাভ কৰিছোঁ। আমাৰ ₹১.৫ কোটি সম্পত্তি ভিত্তি আমাৰ সমাজে আমাৰ ওপৰত ৰখা বিশ্বাসৰ প্ৰতিফলন — এই পৃষ্ঠাত থকা প্ৰতিটো নীতিৰ দ্বাৰা সেই বিশ্বাসৰ সুৰক্ষা কৰোঁ।",
  modal_company: "গণেশ ফাইনেন্স",
  modal_overview: "সাৰাংশ",
  modal_key: "মূল নিয়মাৱলী",
  modal_cta: "এই নীতি সম্পৰ্কে প্ৰশ্ন কৰক",
  modal_close: "বন্ধ কৰক",
  view_details: "বিস্তাৰিত চাওক",
  policies: [
    {
      id:"fair-practices",
      title:"ন্যায়সঙ্গত আচৰণ সংহিতা",
      short:"সকলো গ্ৰাহকৰ বাবে স্বচ্ছ, নৈতিক ঋণ মানদণ্ড।",
      overview:"গণেশ ফাইনেন্সৰ ন্যায়সঙ্গত আচৰণ সংহিতাই সকলো ঋণ উৎপাদনক পূৰ্ণ স্বচ্ছতা, ন্যায় আৰু কোনো বৈষম্য নোহোৱাকৈ আগবঢ়োৱাৰ বাবে বিস্তৃত দিশনিৰ্দেশ স্থাপন কৰে।",
      points:[
        "ঋণৰ সকলো চৰ্ত, সুতৰ হাৰ আৰু ফী অনুমোদনৰ আগতে স্পষ্ট ঘোষণা",
        "কোনো লুকাই থকা ফী নাই — লিখিতভাৱে পূৰ্ণ বিৱৰণ দিয়া হয়",
        "জাতি, ধৰ্ম, লিংগ বা অঞ্চলৰ ভিত্তিত সমান আচৰণ",
        "৩০ কৰ্মদিনৰ ভিতৰত অভিযোগ নিষ্পত্তি",
        "পৰিচালক মণ্ডলীৰ দ্বাৰা বাৰ্ষিক পৰ্যালোচনা আৰু সংহিতা আপডেট",
        "ঋণ বিতৰণৰ আগতে গ্ৰাহকৰ সম্মতি বাধ্যতামূলক"
      ],
      highlight:"আমাৰ ন্যায়সঙ্গত আচৰণ সংহিতা RBI নিৰ্দেশনাৰ সৈতে সংগতি ৰাখিবলৈ বাৰ্ষিক পৰ্যালোচনা কৰা হয় আৰু আমাৰ পৰিচালক মণ্ডলীৰ দ্বাৰা অনুমোদিত হয়।"
    },
    {
      id:"code-of-conduct",
      title:"আচাৰ সংহিতা",
      short:"সকলো কৰ্মী আৰু এজেণ্টৰ বাবে বৃত্তিগত আচাৰ মানদণ্ড।",
      overview:"আমাৰ আচাৰ সংহিতাই প্ৰতিটো গণেশ ফাইনেন্স কৰ্মচাৰী, এজেণ্ট আৰু অংশীদাৰক নৈতিক কাঠামোত কাম কৰাৰ সংজ্ঞা দিয়ে — বিশ্বাসৰ ভিত্তি সুদৃঢ় কৰে।",
      points:[
        "ঘুষ, দুৰ্নীতি বা অনৈতিক দাবীৰ বাবে শূন্য সহনশীলতা",
        "সকলো কৰ্মীৰ বাবে বাৰ্ষিক বাধ্যতামূলক নৈতিকতা প্ৰশিক্ষণ",
        "সকলো গ্ৰাহক তথ্যৰ বাবে গোপনীয়তাৰ দায়িত্ব",
        "স্বাৰ্থৰ সংঘাত প্ৰকাশ প্ৰটোকল",
        "প্ৰতিটো স্তৰত উলংঘনৰ বাবে শাস্তিমূলক কাৰ্য্যৰ মেট্ৰিক্স",
        "সৎ বিশ্বাসে ৰিপ’ৰ্ট কৰা লোকৰ বাবে হুইচলব্ল’ৱাৰ সুৰক্ষা"
      ],
      highlight:"কৰ্মচাৰীসকলে বাৰ্ষিক আচাৰ সংহিতাত চহী কৰি স্বীকাৰ কৰিব লাগে আৰু উলংঘনসমূহ গঠনমূলক, নিৰপেক্ষ শাস্তিমূলক প্ৰক্ৰিয়াৰ দ্বাৰা সমাধান কৰা হয়।"
    },
    {
      id:"interest-rate",
      title:"সুতৰ হাৰ নীতি",
      short:"RBI-অনুপালন, স্বচ্ছ সুতৰ হাৰ গঠন।",
      overview:"গণেশ ফাইনেন্সে ব’ৰ্ড-অনুমোদিত সুতৰ হাৰ নীতি মানি চলে যিয়ে সকলো ক্ৰেডিট উৎপাদনৰ বাবে প্ৰতিযোগিতামূলক, স্বচ্ছ আৰু RBI-অনুপালন মূল্য নিশ্চিত কৰে।",
      points:[
        "এছেট লায়েবিলিটি মেনেজমেণ্ট কমিটী (ALCO)ৰ দ্বাৰা সুতৰ হাৰ নিৰ্ধাৰণ",
        "ধনৰ খৰচ, ৰিস্ক প্ৰিমিয়াম আৰু বজাৰ বেঞ্চমাৰ্কৰ ওপৰত ভিত্তি কৰি হাৰ",
        "বৈষম্য নোহোৱা হাৰ — একে উৎপাদন, সকলো গ্ৰাহকৰ বাবে একে চৰ্ত",
        "সুতৰ হাৰৰ পৰিৱৰ্তন ৩০ দিন আগতে ঘোষণা",
        "গ’ল্ড ঋণৰ হাৰ প্ৰখ্যাত NBFC আৰু বেংকৰ সৈতে প্ৰতিযোগিতামূলক",
        "প্ৰচেছিং ফী আৰু পূৰ্ব চুক্তি ফী আগতীয়াকৈ ঘোষণা"
      ],
      highlight:"সকলো হাৰ সংশোধন RBI NBFC নিয়ম অনুসৰি ৰিপ’ৰ্ট কৰা হয় আৰু পূৰ্ণ ৰাজহুৱা স্বচ্ছতাৰ বাবে আমাৰ ৱেবচাইটত প্ৰকাশ কৰা হয়।"
    },
    {
      id:"privacy",
      title:"গোপনীয়তা নীতি",
      short:"আপোনাৰ ডাটা IT আইন আৰু RBI ডাটা নিৰ্দেশনাৰ অধীনত সুৰক্ষিত।",
      overview:"গণেশ ফাইনেন্সে গ্ৰাহক গোপনীয়তাক মৌলিক অধিকাৰ হিচাপে গণ্য কৰে। আমাৰ গোপনীয়তা নীতিয়ে আমি ব্যক্তিগত আৰু আৰ্থিক তথ্য কেনেকৈ সংগ্ৰহ, ব্যৱহাৰ, সংৰক্ষণ আৰু সুৰক্ষা কৰোঁ তাক নিয়ন্ত্ৰণ কৰে।",
      points:[
        "ডাটা কেৱল উল্লেখিত, নিৰ্দিষ্ট ঋণৰ উদ্দেশ্যৰ বাবে সংগ্ৰহ কৰা হয়",
        "গ্ৰাহক ডাটা তৃতীয় পক্ষক বিক্ৰী বা শ্বেয়াৰিং সম্মতি অবিহনে নহ’ব",
        "সকলো ডিজিটেল লেনদেনৰ বাবে এণ্ড-টু-এণ্ড এনক্ৰিপচন",
        "গ্ৰাহকে যিকোনো সময়ত ডাটা সংশোধন বা মচি পেলোৱাৰ অনুৰোধ কৰিব পাৰে",
        "ডাটা সংৰক্ষণ নীতি RBI আৰু IT আইন অনুসৰি",
        "স্বতন্ত্ৰ চাইবাৰ সুৰক্ষা কোম্পানীৰ দ্বাৰা নিয়মিত সুৰক্ষা অডিট"
      ],
      highlight:"আমি তথ্য প্ৰযুক্তি আইন, ২০০০ আৰু NBFCৰ বাবে RBI গোপনীয়তা নিৰ্দেশনাৰ সৈতে পূৰ্ণ অনুপালন কৰোঁ।"
    },
    {
      id:"vigil-mechanism",
      title:"সতৰ্কতা ব্যৱস্থা",
      short:"চিন্তা ৰিপ’ৰ্ট কৰিবলৈ সুৰক্ষিত হুইচলব্ল’ৱাৰ চেনেল।",
      overview:"আমাৰ সতৰ্কতা ব্যৱস্থাই কৰ্মচাৰী, গ্ৰাহক আৰু ষ্টেকহ’ল্ডাৰক অনৈতিক আচৰণ, প্ৰতাৰণা বা নীতি উলংঘন সম্পৰ্কে প্ৰকৃত চিন্তা ৰিপ’ৰ্ট কৰিবলৈ গঠনমূলক, গোপন চেনেল প্ৰদান কৰে।",
      points:[
        "নিবেদিত ইমেইল আৰু হ’টলাইনৰ দ্বাৰা বেনামী ৰিপ’ৰ্টিং উপলব্ধ",
        "সকলো অভিযোগ স্বতন্ত্ৰ কমিটীৰ দ্বাৰা তদন্ত কৰা হয়",
        "হুইচলব্ল’ৱাৰৰ পৰিচয় কঠোৰভাৱে গোপন ৰখা হয়",
        "সৎ বিশ্বাসে ৰিপ’ৰ্ট কৰা লোকৰ বিৰুদ্ধে কোনো প্ৰতিশোধ, ডিম’চন বা প্ৰতিকূল কাৰ্য্য নহ’ব",
        "সমাধানৰ সময়সীমা: সাধাৰণ ক্ষেত্ৰৰ বাবে ৪৫ কৰ্মদিন",
        "সমাধান নহ’লে ব’ৰ্ড অডিট কমিটীলৈ এস্কেলেচন"
      ],
      highlight:"সতৰ্কতা ব্যৱস্থা প্ৰত্যক্ষভাৱে আমাৰ ব’ৰ্ডৰ অডিট কমিটীৰ তত্ত্বাৱধানত ৰখা হয়, যিয়ে ব্যৱস্থাপনাৰ প্ৰভাৱৰ পৰা স্বতন্ত্ৰতা নিশ্চিত কৰে।"
    },
    {
      id:"investor-policy",
      title:"বিনিয়োগকাৰীৰ বাবে নীতি",
      short:"ন্যায়সঙ্গত, সময়োচিত আৰু স্বচ্ছ বিনিয়োগকাৰী যোগাযোগ।",
      overview:"গণেশ ফাইনেন্সে নিয়মিত ঘোষণা, ন্যায়সঙ্গত আচৰণ আৰু সকলো প্ৰযোজ্য কৰ্প’ৰেট গভৰ্ণেন্স মানদণ্ডৰ অনুপালনৰ দ্বাৰা দীৰ্ঘম্যাদী বিনিয়োগকাৰী বিশ্বাস গঢ়ি তোলাৰ বাবে প্ৰতিশ্ৰুতিবদ্ধ।",
      points:[
        "সকলো নিবন্ধিত বিনিয়োগকাৰীৰ সৈতে ত্ৰৈমাসিক আৰ্থিক আপডেট শ্বেয়াৰ কৰা হয়",
        "বাৰ্ষিক সাধাৰণ সভা আৰ্থিক বৰ্ষ সমাপ্তিৰ ৬ মাহৰ ভিতৰত অনুষ্ঠিত হয়",
        "গুৰুত্বপূৰ্ণ উন্নয়ন ২৪ ঘণ্টাৰ ভিতৰত কোম্পানী ৱেবচাইটত ঘোষণা",
        "বিনিয়োগকাৰী অভিযোগ নিষ্পত্তি ১৫ কৰ্মদিনৰ ভিতৰত",
        "SEBI আৰু RBI ৰিপ’ৰ্টিং মানদণ্ডৰ কঠোৰ অনুপালন",
        "প্ৰশ্নৰ বাবে নিবেদিত ইনভেষ্টৰ ৰিলেচন যোগাযোগ"
      ],
      highlight:"গণেশ ফাইনেন্সে সকলো ষ্টেকহ’ল্ডাৰৰ বাবে স্থিৰ ব্যৱসায়িক বৃদ্ধি নিশ্চিত কৰি বিনিয়োগকাৰী অধিকাৰৰ সুৰক্ষা কৰা শক্তিশালী গভৰ্ণেন্স কাঠামো বজাই ৰাখে।"
    },
    {
      id:"securities-trading",
      title:"ছিকিউৰিটিজ ট্ৰেডিং নিয়মাৱলী",
      short:"ইনচাইডাৰ ট্ৰেডিং প্ৰতিৰোধ আৰু অনুপালন কাঠামো।",
      overview:"আমাৰ ছিকিউৰিটিজ ট্ৰেডিং নিয়মাৱলীয়ে ইনচাইডাৰ ট্ৰেডিং প্ৰতিৰোধ কৰে আৰু সম্পৰ্কিত ব্যক্তিৰ সকলো বজাৰ কাৰ্য্যকলাপ SEBI নিয়ম মানি চলা নিশ্চিত কৰে।",
      points:[
        "নামিত ব্যক্তিৰ তালিকা বজাই ৰখা আৰু ত্ৰৈমাসিক আপডেট",
        "নিৰ্দিষ্ট সীমাৰ অধিক ট্ৰেডৰ বাবে বাধ্যতামূলক পূৰ্ব অনুমতি",
        "আৰ্থিক ফলাফল ঘোষণাৰ আগতে ট্ৰেডিং উইণ্ড’ ব্লকআউট সময়সীমা",
        "উলংঘনৰ বাবে দণ্ড: তাৎক্ষণিক স্থগিত আৰু আইনী কাৰ্য্য",
        "সকলো নামিত ব্যক্তিৰ পৰা বাৰ্ষিক অনুপালন প্ৰমাণপত্ৰ বাধ্যতামূলক",
        "SEBI PIT নিয়মৰ ওপৰত নিয়মিত সচেতনতা কাৰ্যসূচী"
      ],
      highlight:"আমাৰ অনুপালন বিষয়াই সকলো নামিত ব্যক্তিৰ ট্ৰেড নিৰীক্ষণ কৰে আৰু ত্ৰৈমাসিকভাৱে অডিট কমিটীলৈ ৰিপ’ৰ্ট দিয়ে।"
    },
    {
      id:"app-disclaimer",
      title:"এপ্লিকেচন অস্বীকাৰ",
      short:"ম’বাইল এপ ব্যৱহাৰৰ চৰ্ত, ডাটা আৰু দায়িত্বৰ খণ্ডন।",
      overview:"গণেশ ফাইনেন্স ম’বাইল এপ্লিকেচন সুবিধা হিচাপে প্ৰদান কৰা হৈছে। এই অস্বীকাৰে ব্যৱহাৰৰ চৰ্ত, দায়িত্বৰ সীমা আৰু ব্যৱহাৰকাৰী দায়িত্ব দেখুৱায়।",
      points:[
        "এপ কেৱল তথ্য আৰু আবেদনৰ উদ্দেশ্যৰ বাবে",
        "ঋণ অনুমোদন ভৌতিক পৰীক্ষা আৰু ক্ৰেডিট মূল্যায়নৰ অধীনত",
        "স্ক্ৰীনশ্বট বা এপ আউটপুট আইনী বান্ধনী দস্তাবেজ নহয়",
        "এপ প্ৰদৰ্শন নেটৱৰ্ক আৰু ডিভাইচ অৱস্থাৰ অধীনত",
        "অনধিকৃত প্ৰৱেশৰ পৰা হোৱা ক্ষতিৰ বাবে গণেশ ফাইনেন্স দায়ী নহয়",
        "আপডেটে বৈশিষ্ট্য সলনি কৰিব পাৰে; অবিৰত ব্যৱহাৰে সম্মতি দেখুৱায়"
      ],
      highlight:"অধিকৃত ঋণ অনুমোদন পত্ৰ আৰু বান্ধনী চুক্তিৰ বাবে কেৱল আমাৰ নিবন্ধিত কাৰ্যালয়ৰ দ্বাৰা জাৰি কৰা দস্তাবেজেই আইনী বৈধতা ধাৰণ কৰে।"
    },
    {
      id:"auction-policy",
      title:"নিলাম নীতি",
      short:"স্বচ্ছ, RBI-অনুপালন গ’ল্ড নিলাম প্ৰক্ৰিয়া।",
      overview:"ঋণ ডিফ’ল্টৰ ক্ষেত্ৰত, গণেশ ফাইনেন্সে কঠোৰ, RBI-অনুমোদিত নিলাম নীতি মানি চলে যিয়ে গ্ৰাহকক ন্যায়সঙ্গত আচৰণ আৰু প্লেজ কৰা সোণৰ স্বচ্ছ নিলাম নিশ্চিত কৰে।",
      points:[
        "নিলাম প্ৰক্ৰিয়া আৰম্ভ কৰাৰ আগতে কমেও ১৪ দিনৰ লিখিত জাননী",
        "কেৱল প্ৰমাণিত লাইচেন্সপ্ৰাপ্ত নিলামকাৰীৰ দ্বাৰা নিলাম আয়োজন",
        "গ্ৰাহকক নিলামৰ তাৰিখ, স্থান আৰু ৰিজাৰ্ভ মূল্য জনোৱা হয়",
        "অতিৰিক্ত পৰিমাণ (যদি থাকে) ৭ কৰ্মদিনৰ ভিতৰত গ্ৰাহকক ঘূৰাই দিয়া হয়",
        "নিলাম ৰেকৰ্ড বজাই ৰখা হয় আৰু গ্ৰাহকৰ পৰীক্ষাৰ বাবে উপলব্ধ",
        "নিলাম আৰম্ভ হোৱালৈকে গ্ৰাহকে প্লেজ কৰা সোণ ৰিডিম কৰিব পাৰে"
      ],
      highlight:"আমাৰ নিলাম নীতিয়ে RBI গ’ল্ড ঋণ মাষ্টাৰ চাৰ্কুলাৰৰ কঠোৰ অনুপালন কৰে আৰু নিলামৰ আগতে গ্ৰাহকৰ বকেয়া পৰিমাণৰ সৰ্বাধিক আদায় নিশ্চিত কৰে।"
    },
    {
      id:"loan-policy",
      title:"ঋণ নীতি",
      short:"যোগ্যতা, অনুমোদন, বিতৰণ আৰু আদায়ৰ মানদণ্ড।",
      overview:"গণেশ ফাইনেন্স ঋণ নীতিয়ে সম্পূৰ্ণ ক্ৰেডিট লাইফচাইকল নিয়ন্ত্ৰণ কৰে — যোগ্যতা মূল্যায়ন আৰু অনুমোদনৰ পৰা বিতৰণ, পৰ্যবেক্ষণ আৰু আদায়লৈকে।",
      points:[
        "সকলো ঋণ আবেদনৰ বাবে KYC আৰু আয় পৰীক্ষা বাধ্যতামূলক",
        "RBI মানদণ্ড অনুসৰি গ’ল্ড ঋণ LTV অনুপাত সৰ্বাধিক ৭৫%",
        "মালিকানা স্ক’ৰিং আৰু ব্যুৰো ডাটা ব্যৱহাৰ কৰি ক্ৰেডিট মূল্যায়ন",
        "দস্তাবেজ পৰীক্ষাৰ পিছত ২৪ ঘণ্টাৰ ভিতৰত বিতৰণ",
        "কৃষি আৰু ঋতুনিৰ্ভৰ ঋণগ্ৰহীতাৰ বাবে EMI ছুটি উপলব্ধ",
        "RBI NBFC প্ৰুডেন্সিয়েল নৰ্ম অনুসৰি NPA শ্ৰেণীবিভাগ"
      ],
      highlight:"আমাৰ ঋণ নীতি বৰ্তমান বজাৰ পৰিস্থিতি আৰু নিয়ন্ত্ৰণাত্মক প্ৰয়োজনীয়তা প্ৰতিফলিত কৰিবলৈ ৰিস্ক মেনেজমেণ্ট কমিটীৰ দ্বাৰা অৰ্ধবাৰ্ষিক পৰ্যালোচনা কৰা হয়।"
    },
    {
      id:"code-fair-practices",
      title:"ন্যায়সঙ্গত আচৰণ সংহিতা",
      short:"ঋণগ্ৰহীতা, আদায় এজেণ্ট আৰু কৰ্মীৰ সৈতে নৈতিক আচৰণ।",
      overview:"আমাৰ মূল নৈতিক কাঠামোৰ সম্প্ৰসাৰণ, এই সংহিতাই আদায়, ফিল্ড কাৰ্য্য আৰু গ্ৰাহক-সম্মুখীন কাৰ্য্যকলাপত ন্যায়সঙ্গত আচৰণক সম্বোধন কৰে।",
      points:[
        "কোনো বলপ্ৰয়োগ বা আক্ৰমণাত্মক আদায় কৌশলৰ অনুমতি নাই",
        "আদায় কল কেৱল স্থানীয় সময়ত পুৱা ৮ ৰ পৰা সন্ধিয়া ৭ লৈকে",
        "এজেণ্টসকলে পৰিচয় কাৰ্ড আৰু কোম্পানী অনুমোদিত পত্ৰ সৈতে ৰাখিব লাগিব",
        "গ্ৰাহকৰ নিয়োগকৰ্তাৰ সৈতে পূৰ্ব সম্মতি অবিহনে যোগাযোগ নহ’ব",
        "প্ৰকৃত অসুবিধাৰ ভিত্তিত চুক্তি তফচিল পুনৰ সজোৱা",
        "সকলো গ্ৰাহক কথোপকথন ৩ বছৰলৈকে ৰেকৰ্ড আৰু সংৰক্ষিত"
      ],
      highlight:"আমি সকলো আদায় কৰ্মচাৰীক নৈতিক অনুশীলন আৰু গ্ৰাহক অধিকাৰৰ ওপৰত ত্ৰৈমাসিক প্ৰশিক্ষণ দিওঁ আৰু যিকোনো উলংঘনৰ বাবে পৰিবেশন পৰ্যালোচনাত দণ্ড দিওঁ।"
    },
    {
      id:"terms",
      title:"চৰ্ত আৰু নিয়মাৱলী",
      short:"সকলো গণেশ ফাইনেন্স উৎপাদনৰ বাবে সাধাৰণ আইনী চৰ্ত।",
      overview:"চৰ্ত আৰু নিয়মাৱলীয়ে গণেশ ফাইনেন্সে প্ৰদান কৰা সকলো উৎপাদন আৰু সেৱাৰ আইনী ভিত্তি গঠন কৰে, যিয়ে সকলো পক্ষৰ বাবে স্পষ্টতা আৰু সুৰক্ষা নিশ্চিত কৰে।",
      points:[
        "ভাৰতৰ আইনৰ অধীনত নিয়ন্ত্ৰিত; অধিকাৰক্ষেত্ৰ: নিবন্ধিত ৰাজ্যিক আদালত",
        "সেৱা চৰ্ত ৩০ দিনৰ আগজাননীৰে আপডেট কৰিব পৰা যায়",
        "ডিজিটেল সম্মতিৰ আইনী বৈধতা ভৌতিক চহীৰ সমান",
        "ফ’ৰ্চ মেজ’ৰ খণ্ডত প্ৰাকৃতিক দুৰ্যোগ, মহামাৰী আৰু নিয়ন্ত্ৰণাত্মক কাৰ্য্য অন্তৰ্ভুক্ত",
        "১৯৯৬ চনৰ আৰ্বিট্ৰেচন আইনৰ অধীনত আৰ্বিট্ৰেচনৰ দ্বাৰা বিবাদ নিষ্পত্তি",
        "সকলো পৰিমাণ ভাৰতীয় ৰূপীত; GST/কৰ গ্ৰাহকৰ দ্বাৰা"
      ],
      highlight:"আমি সকলো গ্ৰাহকক চৰ্ত আৰু নিয়মাৱলী সাৱধানে পঢ়িবলৈ পৰামৰ্শ দিওঁ। আমাৰ কাষ্টমাৰ কেয়াৰ টীম যিকোনো খণ্ড সাধাৰণ ভাষাত ব্যাখ্যা কৰিবলৈ উপলব্ধ।"
    },
    {
      id:"csr",
      title:"CSR নীতি",
      short:"সমাজ বিনিয়োগ আৰু সামাজিক দায়িত্বৰ প্ৰতিশ্ৰুতি।",
      overview:"গণেশ ফাইনেন্সৰ CSR নীতিয়ে আমি সেৱা আগবঢ়োৱা সমাজলৈ ঘূৰাই দিয়াৰ আমাৰ প্ৰতিশ্ৰুতিৰ প্ৰতিফলন। ২০২০ৰ পৰা আমি শিক্ষা, আৰ্থিক সাক্ষৰতা আৰু স্থানীয় উন্নয়নত সম্পদ ব্যৱহাৰ কৰিছোঁ।",
      points:[
        "কোম্পানী আইন ২০১৩ নিৰ্দেশনা অনুসৰি CSR খৰচ (প্ৰযোজ্য হ’লে)",
        "অগ্ৰাধিকাৰ ক্ষেত্ৰ: আৰ্থিক সাক্ষৰতা, গ্ৰাম্য শিক্ষা, মহিলা সশক্তিকৰণ",
        "বাৰ্ষিক CSR প্ৰতিবেদন কোম্পানী ৱেবচাইটত প্ৰকাশ",
        "কৰ্মচাৰী স্বেচ্ছাসেৱক কাৰ্যসূচী — প্ৰতি কৰ্মচাৰীৰ বাবে বাৰ্ষিক কমেও ৮ ঘণ্টা",
        "শেষ মাইল সমাজ প্ৰভাৱৰ বাবে স্থানীয় NGOৰ সৈতে অংশীদাৰিত্ব",
        "গণেশ ফাইনেন্সৰ সৰ্বাধিক গ্ৰাহক ভিত্তি থকা জিলাত মনোনিৱেশ"
      ],
      highlight:"গণেশ ফাইনেন্সে ২০২০ত প্ৰতিষ্ঠাৰ পিছত ৫০+ আৰ্থিক সাক্ষৰতা ৱৰ্কশ্বপ অনুষ্ঠিত কৰিছে, যিয়ে ৫,০০০+ গ্ৰাম্য পৰিয়াললৈকে প্ৰৱেশ কৰিছে।"
    },
    {
      id:"statutory-auditors",
      title:"বৈধ অডিটৰ নিয়োগ নীতি",
      short:"বৈধ অডিটৰ বাবে স্বতন্ত্ৰতা আৰু ঘূৰণীয়া মানদণ্ড।",
      overview:"এই নীতিয়ে কোম্পানী আইন, ২০১৩ আৰু NBFCৰ বাবে RBI নিৰ্দেশনা অনুসৰি উপযুক্ত, স্বতন্ত্ৰ বৈধ অডিটৰ নিৰ্বাচন নিশ্চিত কৰে।",
      points:[
        "অডিট কমিটীৰ পৰামৰ্শৰে ব’ৰ্ডক অডিটৰ নিৰ্বাচন",
        "প্ৰতি ৫ বছৰত বাধ্যতামূলক ঘূৰণীয়া (বা কোম্পানী আইন অনুসৰি)",
        "স্বতন্ত্ৰতা বাধাগ্ৰস্ত কৰা সমসাময়িক নন-অডিট সেৱা নাই",
        "অডিটৰ ওচৰত বৈধ ICAI প্ৰেকটিচ চাৰ্টিফিকেট থাকিব লাগিব",
        "প্ৰতিটো নিয়োগৰ আগতে স্বাৰ্থৰ সংঘাত পৰীক্ষা",
        "AGMত শ্বেয়াৰহ’ল্ডাৰৰ দ্বাৰা অডিট ফী অনুমোদন"
      ],
      highlight:"আমাৰ অডিট কমিটীয়ে ব্যৱস্থাপনাৰ প্ৰভাৱ অবিহনে সকলো অডিটৰ প্ৰাৰ্থীৰ স্বতন্ত্ৰ মূল্যায়ন কৰে, পূৰ্ণ নিৰপেক্ষতা নিশ্চিত কৰে।"
    },
    {
      id:"human-rights",
      title:"মানৱ অধিকাৰ নীতি",
      short:"বৈষম্য, শোষণ বা বলপ্ৰয়োগ কামৰ বাবে শূন্য সহনশীলতা।",
      overview:"গণেশ ফাইনেন্সে সকলো ব্যৱসায়িক কাৰ্য্যত সাৰ্বজনীন মানৱ অধিকাৰ মানদণ্ড বজাই ৰাখে আৰু প্ৰতিটো কৰ্মচাৰী, গ্ৰাহক আৰু ষ্টেকহ’ল্ডাৰক সন্মান আৰু আদৰৰ সৈতে ব্যৱহাৰ কৰে।",
      points:[
        "শিশু শ্ৰম, বলপ্ৰয়োগ কাম বা পাচাৰৰ বাবে শূন্য সহনশীলতা",
        "সমান সুযোগ নিয়োগকৰ্তা — যিকোনো ধৰণৰ বৈষম্য নাই",
        "সুৰক্ষিত কৰ্মস্থল — POSH আইন অনুপালন প্ৰশিক্ষিত ICCৰ সৈতে",
        "সকলো চুক্তি কৰ্মচাৰীৰ বাবে জীৱিকা মজুৰী মানদণ্ড প্ৰযোজ্য",
        "বিক্ৰেতা আৰু অংশীদাৰ নিৰ্বাচনত মানৱ অধিকাৰ ডিউ ডিলিজেন্স",
        "বাৰ্ষিক মানৱ অধিকাৰ ৰিস্ক মূল্যায়ন অভ্যন্তৰীণভাৱে কৰা হয়"
      ],
      highlight:"আমি আমাৰ মানৱ অধিকাৰ নীতিক UN Guiding Principles on Business and Human Rightsৰ সৈতে সংগতি ৰাখোঁ আৰু আমাৰ অঞ্চলৰ NBFCৰ বাবে উচ্চ মানদণ্ড স্থাপন কৰোঁ।"
    },
    {
      id:"responsible-advocacy",
      title:"দায়িত্বশীল উকীলতা নীতি",
      short:"নিয়ন্ত্ৰক, উদ্যোগ সংস্থা আৰু মিডিয়াৰ সৈতে নৈতিক যোগাযোগ।",
      overview:"গণেশ ফাইনেন্সে নিয়ন্ত্ৰক, উদ্যোগ সংঘ আৰু ৰাজহুৱা মঞ্চৰ সৈতে দায়িত্বশীলভাৱে যোগাযোগ কৰে — সদায় আমাৰ উকীলতা স্বচ্ছ, প্ৰমাণ-ভিত্তিক আৰু ৰাজহুৱা স্বাৰ্থৰ সৈতে সংগতি ৰাখে তাক নিশ্চিত কৰে।",
      points:[
        "সকলো নিয়ন্ত্ৰণাত্মক দাখিল অনুপালন বিষয়াই পৰ্যালোচনা কৰে",
        "অঘোষিত ৰাজনৈতিক দান বা ল’বিং খৰচ নাই",
        "মিডিয়া যোগাযোগ কেৱল নামিত মুখপাত্ৰৰ দ্বাৰা",
        "উদ্যোগ সংঘ সদস্যত্ব বাৰ্ষিক প্ৰতিবেদনত ঘোষণা",
        "উকীলতা অৱস্থা গ্ৰাহক আৰু সামাজিক লাভৰ সৈতে সংগতি ৰাখে",
        "ব’ৰ্ডৰ দ্বাৰা বাৰ্ষিক উকীলতা কাৰ্য্যকলাপ পৰ্যালোচনা"
      ],
      highlight:"আমাৰ বিশ্বাস যে দায়িত্বশীল উকীলতাই সুস্থ আৰ্থিক পৰিৱেশ আৰু NBFCৰ বাবে অধিক অন্তৰ্ভুক্তিমূলক নিয়ন্ত্ৰণাত্মক পৰিৱেশত অৱদান যোগায়।"
    },
    {
      id:"diversity",
      title:"বৈচিত্ৰ্য, অন্তৰ্ভুক্তি আৰু সমান সুযোগ নীতি",
      short:"সকলোৰে বাবে অন্তৰ্ভুক্তিমূলক আৰু সমান কৰ্মস্থল গঢ়ি তোলা।",
      overview:"গণেশ ফাইনেন্সে বৈচিত্ৰ্যপূৰ্ণ আৰু অন্তৰ্ভুক্তিমূলক সংস্থা গঢ়ি তোলাৰ বাবে প্ৰতিশ্ৰুতিবদ্ধ য’ত প্ৰতিটো ব্যক্তি — পটভূমি যিয়েই নহওক — নিজৰ পূৰ্ণ সম্ভাৱনাৰে বিকশিত হ’ব পাৰে আৰু অৱদান দিব পাৰে।",
      points:[
        "জ্যেষ্ঠ ব্যৱস্থাপনা পদত মহিলাৰ বাবে বৈচিত্ৰ্য লক্ষ্য",
        "সম্ভৱ হ’লে ব্লাইণ্ড স্ক্ৰীনিংৰ সৈতে অন্তৰ্ভুক্তিমূলক নিয়োগ প্ৰক্ৰিয়া",
        "প্ৰতিবন্ধী কৰ্মচাৰীৰ বাবে থকা ব্যৱস্থা",
        "বছৰজুৰি বহুসাংস্কৃতিক উৎসৱ আৰু সচেতনতা কাৰ্যসূচী",
        "সকলো কৰ্মচাৰীৰ বাবে বাৰ্ষিক বাধ্যতামূলক এণ্টি-হেৰাছমেণ্ট প্ৰশিক্ষণ",
        "ব’ৰ্ডলৈ ত্ৰৈমাসিক বৈচিত্ৰ্য মেট্ৰিক্স ৰিপ’ৰ্ট"
      ],
      highlight:"আমাৰ গৌৰৱ যে আমাৰ গ্ৰাহক-সম্মুখীন কৰ্মচাৰীৰ মাজত ৪০%+ মহিলা আছে আৰু আমি নেতৃত্ব স্তৰত প্ৰতিনিধিত্ব বৃদ্ধি কৰিবলৈ সক্ৰিয়ভাৱে কাম কৰি আছোঁ।"
    },
    {
      id:"stakeholders",
      title:"ষ্টেকহ’ল্ডাৰ সংযোগ নীতি",
      short:"সকলো ষ্টেকহ’ল্ডাৰ গোটৰ সৈতে গঠনমূলক সংযোগ।",
      overview:"আমাৰ ষ্টেকহ’ল্ডাৰ সংযোগ নীতিয়ে গণেশ ফাইনেন্সে সকলো ষ্টেকহ’ল্ডাৰ গোট চিনাক্ত কৰা, তেওঁলোকৰ সৈতে যোগাযোগ কৰা আৰু আমাৰ সিদ্ধান্ত প্ৰক্ৰিয়াত ফিডবেক অন্তৰ্ভুক্ত কৰাৰ সংজ্ঞা দিয়ে।",
      points:[
        "বাৰ্ষিক ষ্টেকহ’ল্ডাৰ মেপিং অনুশীলন",
        "বিনিয়োগকাৰী, গ্ৰাহক, নিয়ন্ত্ৰকৰ বাবে নিবেদিত সংযোগ কেলেণ্ডাৰ",
        "দ্বি-বাৰ্ষিক গ্ৰাহক সন্তুষ্টি জৰীপ",
        "কাৰ্য্য-পৰিকল্পনা ফ’ল’-আপৰ সৈতে কৰ্মচাৰী সংযোগ জৰীপ",
        "নতুন অঞ্চলত প্ৰৱেশৰ আগতে সমাজ পৰামৰ্শ",
        "কোম্পানী ৱেবচাইটত বাৰ্ষিক ষ্টেকহ’ল্ডাৰ প্ৰতিবেদন প্ৰকাশ"
      ],
      highlight:"আমি ষ্টেকহ’ল্ডাৰ সংযোগক অনুপালন কাৰ্য্য হিচাপে নহয়, দীৰ্ঘম্যাদী সাংগঠনিক স্থিৰতা গঢ়ি তোলাৰ কৌশলগত সাৰথি হিচাপে চাওঁ।"
    },
  ],
},
kn: {
  section_tag: "ಅನುಸರಣೆ ಮತ್ತು ಆಡಳಿತ",
  section_title: "ನೀತಿ",
  section_desc: "ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ನಮ್ಮ ವ್ಯವಹಾರದ ಪ್ರತಿಯೊಂದು ಅಂಶದಲ್ಲೂ ನ್ಯಾಯಸಮ್ಮತತೆ, ಪಾರದರ್ಶಕತೆ ಮತ್ತು ನಿಯಂತ್ರಕ ಅನುಸರಣೆಯನ್ನು ಖಚಿತಪಡಿಸುವ ನೀತಿಗಳ ಸಮಗ್ರ ಚೌಕಟ್ಟಿನ ಅಡಿಯಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ಯಾವುದೇ ನೀತಿಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.",
  commitment_tag: "ನಮ್ಮ ಬದ್ಧತೆ",
  commitment_title_1: "ನ್ಯಾಯಯುತ ಅಭ್ಯಾಸ",
  commitment_title_hl: "ಮೂಲದಲ್ಲಿ",
  commitment_sub: "2020 ರಲ್ಲಿ ನಮ್ಮ ಸ್ಥಾಪನೆಯಾದಾಗಿನಿಂದ, ನ್ಯಾಯಯುತ ಅಭ್ಯಾಸವು ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನ ಪ್ರತಿ ನಿರ್ಧಾರಕ್ಕೂ ಅಡಿಗಲ್ಲಾಗಿದೆ.",
  stat_assets: "ನಿರ್ವಹಣೆಯಲ್ಲಿರುವ ಸ್ವತ್ತುಗಳು",
  stat_customers: "ಸಂತಸದ ಗ್ರಾಹಕರು",
  stat_founded: "ಸ್ಥಾಪಿತ",
  card_tagline: "ಪಾರದರ್ಶಕತೆ. ನಂಬಿಕೆ. ಸಮಗ್ರತೆ.",
  card_body: "ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನ ಪ್ರತಿಯೊಂದು ಸಾಲ, ಪ್ರತಿ ವಹಿವಾಟು, ಪ್ರತಿ ಸಂವಹನವೂ ನಮ್ಮ ಗ್ರಾಹಕರಿಗೆ ಮೊದಲ ಸ್ಥಾನ ನೀಡುವ ತತ್ವಗಳಿಂದ ನಿಯಂತ್ರಿಸಲ್ಪಡುತ್ತದೆ.",
  fp1_title: "ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಪಾರದರ್ಶಕ",
  fp1_body: "ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನಲ್ಲಿ, ನೀವು ಸಹಿ ಮಾಡುವ ಮೊದಲೇ ನಾವು ಪ್ರತಿ ಶುಲ್ಕ, ಪ್ರತಿ ದರ ಮತ್ತು ಪ್ರತಿ ಷರತ್ತನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತೇವೆ. ನಮ್ಮ ಸಾಲದ ದಾಖಲೆಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಬರೆಯಲಾಗಿದೆ — ಗೊಂದಲಗೊಳಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಯಾವುದೇ ಸಣ್ಣ ಮುದ್ರಣವಿಲ್ಲ.",
  fp2_title: "ಗ್ರಾಹಕ-ಕೇಂದ್ರಿತ ನಿರ್ಧಾರಗಳು",
  fp2_body: "ನಾವು ರೂಪಿಸುವ ಪ್ರತಿಯೊಂದು ನೀತಿಯು ಒಂದು ಸರಳ ಪ್ರಶ್ನೆಯೊಂದಿಗೆ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ: ಇದು ನಮ್ಮ ಗ್ರಾಹಕರಿಗೆ ನ್ಯಾಯಯುತವಾಗಿದೆಯೇ? ಹೊಂದಿಕೊಳ್ಳುವ ಮರುಪಾವತಿಯಿಂದ ದೀರ್ಘಾವಧಿ ಸಾಲಗಾರರಿಗೆ ಶೂನ್ಯ ದಂಡದ ಪೂರ್ವಪಾವತಿಯವರೆಗೆ, ನಮ್ಮ ನೀತಿಗಳು ನಿಮ್ಮ ಅಗತ್ಯಗಳ ಸುತ್ತ ನಿರ್ಮಿಸಲ್ಪಟ್ಟಿವೆ.",
  fp3_title: "ನಿಯಂತ್ರಕ ಅನುಸರಣೆ ಒಂದು ಸಾಮರ್ಥ್ಯವಾಗಿ",
  fp3_body: "ಭಾರತೀಯ ರಿಸರ್ವ್ ಬ್ಯಾಂಕ್‌ನಿಂದ ನೋಂದಾಯಿತ ಮತ್ತು ನಿಯಂತ್ರಿತವಾಗಿರುವ ಗಣೇಶ್ ಫೈನಾನ್ಸ್, ಅನುಸರಣೆಯನ್ನು ಹೊರೆಯಾಗಿ ಅಲ್ಲ, ಬದಲಿಗೆ ಸ್ಪರ್ಧಾತ್ಮಕ ಪ್ರಯೋಜನವಾಗಿ ಪರಿಗಣಿಸುತ್ತದೆ — ನಾವು ಅತ್ಯುನ್ನತ ಸಮಗ್ರತೆಯ ಮಾನದಂಡದಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತೇವೆ ಎಂಬುದಕ್ಕೆ ಪುರಾವೆ.",
  fp4_title: "ನಮ್ಮ ಸಮುದಾಯದೊಂದಿಗೆ ಬೆಳೆಯುತ್ತಿದೆ",
  fp4_body: "2020 ರಿಂದ, ನಾವು ಒಂದೇ ಶಾಖೆಯಿಂದ 1,000+ ಗ್ರಾಹಕರಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುವವರೆಗೆ ಬೆಳೆದಿದ್ದೇವೆ. ನಮ್ಮ ₹1.5 ಕೋಟಿ ಸ್ವತ್ತುಗಳ ಆಧಾರವು ನಮ್ಮ ಸಮುದಾಯವು ನಮ್ಮಲ್ಲಿ ಇಟ್ಟಿರುವ ನಂಬಿಕೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ — ಈ ಪುಟದಲ್ಲಿನ ಪ್ರತಿಯೊಂದು ನೀತಿಯೊಂದಿಗೆ ನಾವು ರಕ್ಷಿಸುವ ನಂಬಿಕೆ.",
  modal_company: "ಗಣೇಶ್ ಫೈನಾನ್ಸ್",
  modal_overview: "ಅವಲೋಕನ",
  modal_key: "ಪ್ರಮುಖ ನಿಬಂಧನೆಗಳು",
  modal_cta: "ಈ ನೀತಿಯ ಬಗ್ಗೆ ಪ್ರಶ್ನಿಸಿ",
  modal_close: "ಮುಚ್ಚಿ",
  view_details: "ವಿವರಗಳನ್ನು ನೋಡಿ",
  policies: [
    {
      id:"fair-practices",
      title:"ನ್ಯಾಯಯುತ ಅಭ್ಯಾಸಗಳ ಸಂಹಿತೆ",
      short:"ಎಲ್ಲಾ ಗ್ರಾಹಕರಿಗೆ ಪಾರದರ್ಶಕ, ನೈತಿಕ ಸಾಲ ಮಾನದಂಡಗಳು.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನ ನ್ಯಾಯಯುತ ಅಭ್ಯಾಸಗಳ ಸಂಹಿತೆಯು ಎಲ್ಲಾ ಸಾಲ ಉತ್ಪನ್ನಗಳನ್ನು ಸಂಪೂರ್ಣ ಪಾರದರ್ಶಕತೆ, ನ್ಯಾಯಸಮ್ಮತತೆ ಮತ್ತು ಯಾವುದೇ ತಾರತಮ್ಯದ ಅಭ್ಯಾಸಗಳಿಲ್ಲದೆ ನೀಡಲಾಗುವುದನ್ನು ಖಚಿತಪಡಿಸುವ ಸಮಗ್ರ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಸ್ಥಾಪಿಸುತ್ತದೆ.",
      points:[
        "ಅನುಮತಿಗೆ ಮೊದಲು ಎಲ್ಲಾ ಸಾಲ ನಿಯಮಗಳು, ಬಡ್ಡಿ ದರಗಳು ಮತ್ತು ಶುಲ್ಕಗಳ ಸ್ಪಷ್ಟ ಬಹಿರಂಗಪಡಿಸುವಿಕೆ",
        "ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕಗಳಿಲ್ಲ — ಸಂಪೂರ್ಣ ವಿವರಗಳನ್ನು ಲಿಖಿತವಾಗಿ ಒದಗಿಸಲಾಗುತ್ತದೆ",
        "ಜಾತಿ, ಧರ್ಮ, ಲಿಂಗ ಅಥವಾ ಪ್ರದೇಶವನ್ನು ಲೆಕ್ಕಿಸದೆ ಸಮಾನ ವ್ಯವಹಾರ",
        "30 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ದೂರು ಪರಿಹಾರ",
        "ನಿರ್ದೇಶಕರ ಮಂಡಳಿಯಿಂದ ಸಂಹಿತೆಯ ವಾರ್ಷಿಕ ಪರಿಶೀಲನೆ ಮತ್ತು ನವೀಕರಣ",
        "ಸಾಲ ವಿತರಣೆಗೆ ಮೊದಲು ಗ್ರಾಹಕರ ಒಪ್ಪಿಗೆ ಅಗತ್ಯ"
      ],
      highlight:"ನಮ್ಮ ನ್ಯಾಯಯುತ ಅಭ್ಯಾಸಗಳ ಸಂಹಿತೆಯನ್ನು RBI ಮಾರ್ಗಸೂಚಿಗಳೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ವಾರ್ಷಿಕವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ನಮ್ಮ ನಿರ್ದೇಶಕರ ಮಂಡಳಿಯಿಂದ ಅನುಮೋದಿಸಲಾಗುತ್ತದೆ."
    },
    {
      id:"code-of-conduct",
      title:"ನಡವಳಿಕೆ ಸಂಹಿತೆ",
      short:"ಎಲ್ಲಾ ಸಿಬ್ಬಂದಿ ಮತ್ತು ಏಜೆಂಟ್‌ಗಳಿಗೆ ಬಂಧಕವಾಗಿರುವ ವೃತ್ತಿಪರ ನಡವಳಿಕೆ ಮಾನದಂಡಗಳು.",
      overview:"ನಮ್ಮ ನಡವಳಿಕೆ ಸಂಹಿತೆಯು ಪ್ರತಿಯೊಬ್ಬ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಉದ್ಯೋಗಿ, ಏಜೆಂಟ್ ಮತ್ತು ಪಾಲುದಾರರು ಕಾರ್ಯನಿರ್ವಹಿಸುವ ನೈತಿಕ ಚೌಕಟ್ಟನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುತ್ತದೆ — ಅಡಿಪಾಯದಿಂದ ನಂಬಿಕೆಯನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ.",
      points:[
        "ಲಂಚ, ಭ್ರಷ್ಟಾಚಾರ ಅಥವಾ ಅನೈತಿಕ ಕೋರಿಕೆಗೆ ಶೂನ್ಯ ಸಹಿಷ್ಣುತೆ",
        "ಎಲ್ಲಾ ಸಿಬ್ಬಂದಿಗೆ ಕಡ್ಡಾಯ ವಾರ್ಷಿಕ ನೈತಿಕತೆ ತರಬೇತಿ",
        "ಎಲ್ಲಾ ಗ್ರಾಹಕ ಮಾಹಿತಿಗಾಗಿ ಗೌಪ್ಯತೆ ಜವಾಬ್ದಾರಿಗಳು",
        "ಹಿತಾಸಕ್ತಿ ಸಂಘರ್ಷ ಬಹಿರಂಗಪಡಿಸುವಿಕೆ ಪ್ರೋಟೋಕಾಲ್‌ಗಳು",
        "ಪ್ರತಿ ಹಂತದಲ್ಲೂ ಉಲ್ಲಂಘನೆಗಳಿಗೆ ಶಿಸ್ತು ಕ್ರಮ ಮ್ಯಾಟ್ರಿಕ್ಸ್",
        "ಸದ್ಭಾವನೆಯಿಂದ ವರದಿ ಮಾಡುವವರಿಗೆ ವಿಸಲ್‌ಬ್ಲೋವರ್ ರಕ್ಷಣೆ ಖಾತರಿ"
      ],
      highlight:"ಉದ್ಯೋಗಿಗಳು ವಾರ್ಷಿಕವಾಗಿ ನಡವಳಿಕೆ ಸಂಹಿತೆಗೆ ಸಹಿ ಮಾಡಿ ಒಪ್ಪಿಕೊಳ್ಳಬೇಕಾಗುತ್ತದೆ, ಮತ್ತು ಉಲ್ಲಂಘನೆಗಳನ್ನು ರಚನಾತ್ಮಕ, ನಿಷ್ಪಕ್ಷಪಾತ ಶಿಸ್ತು ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ ಪರಿಹರಿಸಲಾಗುತ್ತದೆ."
    },
    {
      id:"interest-rate",
      title:"ಬಡ್ಡಿ ದರ ನೀತಿ",
      short:"RBI-ಅನುಸಾರ, ಪಾರದರ್ಶಕ ಬಡ್ಡಿ ದರ ಚೌಕಟ್ಟು.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಮಂಡಳಿ-ಅನುಮೋದಿತ ಬಡ್ಡಿ ದರ ನೀತಿಯನ್ನು ಅನುಸರಿಸುತ್ತದೆ, ಇದು ನೀಡಲಾಗುವ ಎಲ್ಲಾ ಸಾಲ ಉತ್ಪನ್ನಗಳಿಗೆ ಸ್ಪರ್ಧಾತ್ಮಕ, ಪಾರದರ್ಶಕ ಮತ್ತು RBI-ಅನುಸಾರ ಬೆಲೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.",
      points:[
        "ಆಸ್ತಿ ಹೊಣೆಗಾರಿಕೆ ನಿರ್ವಹಣಾ ಸಮಿತಿ (ALCO) ಯಿಂದ ಬಡ್ಡಿ ದರಗಳು ನಿಗದಿಪಡಿಸಲ್ಪಡುತ್ತವೆ",
        "ನಿಧಿಯ ವೆಚ್ಚ, ಅಪಾಯ ಪ್ರೀಮಿಯಂ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಮಾನದಂಡಗಳ ಆಧಾರದ ಮೇಲೆ ದರಗಳು",
        "ಯಾವುದೇ ತಾರತಮ್ಯದ ದರಗಳಿಲ್ಲ — ಒಂದೇ ಉತ್ಪನ್ನ, ಎಲ್ಲಾ ಗ್ರಾಹಕರಿಗೆ ಒಂದೇ ನಿಯಮಗಳು",
        "ಬಡ್ಡಿ ದರ ಬದಲಾವಣೆಗಳನ್ನು ಕನಿಷ್ಠ 30 ದಿನಗಳ ಮುಂಚಿತವಾಗಿ ಸೂಚಿಸಲಾಗುತ್ತದೆ",
        "ಗೋಲ್ಡ್ ಲೋನ್ ದರಗಳು ಪ್ರಮುಖ NBFCಗಳು ಮತ್ತು ಬ್ಯಾಂಕ್‌ಗಳೊಂದಿಗೆ ಸ್ಪರ್ಧಾತ್ಮಕವಾಗಿವೆ",
        "ಸಂಸ್ಕರಣ ಶುಲ್ಕಗಳು ಮತ್ತು ಮುಂಗಡ ಪಾವತಿ ಶುಲ್ಕಗಳನ್ನು ಮೊದಲೇ ಬಹಿರಂಗಪಡಿಸಲಾಗುತ್ತದೆ"
      ],
      highlight:"ಎಲ್ಲಾ ದರ ಪರಿಷ್ಕರಣೆಗಳನ್ನು NBFC ನಿಯಮಗಳ ಪ್ರಕಾರ RBI ಗೆ ವರದಿ ಮಾಡಲಾಗುತ್ತದೆ ಮತ್ತು ಸಂಪೂರ್ಣ ಸಾರ್ವಜನಿಕ ಪಾರದರ್ಶಕತೆಗಾಗಿ ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ."
    },
    {
      id:"privacy",
      title:"ಗೌಪ್ಯತೆ ನೀತಿ",
      short:"ನಿಮ್ಮ ಡೇಟಾ IT ಕಾಯಿದೆ ಮತ್ತು RBI ಡೇಟಾ ಮಾರ್ಗಸೂಚಿಗಳ ಅಡಿಯಲ್ಲಿ ಸಂರಕ್ಷಿಸಲ್ಪಟ್ಟಿದೆ.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಗ್ರಾಹಕ ಗೌಪ್ಯತೆಯನ್ನು ಮೂಲಭೂತ ಹಕ್ಕಾಗಿ ಪರಿಗಣಿಸುತ್ತದೆ. ನಮ್ಮ ಗೌಪ್ಯತೆ ನೀತಿಯು ನಾವು ವೈಯಕ್ತಿಕ ಮತ್ತು ಹಣಕಾಸಿನ ಮಾಹಿತಿಯನ್ನು ಹೇಗೆ ಸಂಗ್ರಹಿಸುತ್ತೇವೆ, ಬಳಸುತ್ತೇವೆ, ಸಂಗ್ರಹಿಸುತ್ತೇವೆ ಮತ್ತು ರಕ್ಷಿಸುತ್ತೇವೆ ಎಂಬುದನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ.",
      points:[
        "ಡೇಟಾವನ್ನು ನಿರ್ದಿಷ್ಟ, ಸ್ಪಷ್ಟ ಸಾಲ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಮಾತ್ರ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ",
        "ಒಪ್ಪಿಗೆ ಇಲ್ಲದೆ ಮೂರನೇ ವ್ಯಕ್ತಿಗಳಿಗೆ ಗ್ರಾಹಕ ಡೇಟಾದ ಮಾರಾಟ ಅಥವಾ ಹಂಚಿಕೆ ಇಲ್ಲ",
        "ಎಲ್ಲಾ ಡಿಜಿಟಲ್ ವಹಿವಾಟುಗಳಿಗೆ ಎಂಡ್-ಟು-ಎಂಡ್ ಎನ್‌ಕ್ರಿಪ್ಷನ್",
        "ಗ್ರಾಹಕರು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಡೇಟಾ ತಿದ್ದುಪಡಿ ಅಥವಾ ಅಳಿಸುವಿಕೆಯನ್ನು ವಿನಂತಿಸಬಹುದು",
        "RBI ಮತ್ತು IT ಕಾಯಿದೆ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಡೇಟಾ ಧಾರಣ ನೀತಿ",
        "ಸ್ವತಂತ್ರ ಸೈಬರ್ ಭದ್ರತಾ ಸಂಸ್ಥೆಗಳಿಂದ ನಿಯಮಿತ ಭದ್ರತಾ ಲೆಕ್ಕಪರಿಶೋಧನೆಗಳು"
      ],
      highlight:"ನಾವು ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಕಾಯಿದೆ, 2000 ಮತ್ತು NBFCಗಳಿಗೆ ಡೇಟಾ ಗೌಪ್ಯತೆಯ ಮೇಲಿನ RBI ಮಾರ್ಗಸೂಚಿಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಅನುಸರಿಸುತ್ತೇವೆ."
    },
    {
      id:"vigil-mechanism",
      title:"ಜಾಗರೂಕತಾ ಕಾರ್ಯವಿಧಾನ",
      short:"ಕಾಳಜಿಗಳನ್ನು ವರದಿ ಮಾಡಲು ಸುರಕ್ಷಿತ ವಿಸಲ್‌ಬ್ಲೋವರ್ ಚಾನೆಲ್.",
      overview:"ನಮ್ಮ ಜಾಗರೂಕತಾ ಕಾರ್ಯವಿಧಾನವು ಉದ್ಯೋಗಿಗಳು, ಗ್ರಾಹಕರು ಮತ್ತು ಪಾಲುದಾರರಿಗೆ ಅನೈತಿಕ ನಡವಳಿಕೆ, ವಂಚನೆ ಅಥವಾ ನೀತಿ ಉಲ್ಲಂಘನೆಗಳ ಬಗ್ಗೆ ನಿಜವಾದ ಕಾಳಜಿಗಳನ್ನು ವರದಿ ಮಾಡಲು ರಚನಾತ್ಮಕ, ಗೌಪ್ಯ ಚಾನೆಲ್ ಅನ್ನು ಒದಗಿಸುತ್ತದೆ.",
      points:[
        "ಮೀಸಲಾದ ಇಮೇಲ್ ಮತ್ತು ಹಾಟ್‌ಲೈನ್ ಮೂಲಕ ಅನಾಮಧೇಯ ವರದಿ ಲಭ್ಯವಿದೆ",
        "ಎಲ್ಲಾ ದೂರುಗಳನ್ನು ಸ್ವತಂತ್ರ ಸಮಿತಿಯು ತನಿಖೆ ಮಾಡುತ್ತದೆ",
        "ವಿಸಲ್‌ಬ್ಲೋವರ್‌ನ ಗುರುತನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಗೌಪ್ಯವಾಗಿಡಲಾಗುತ್ತದೆ",
        "ಸದ್ಭಾವನೆಯಿಂದ ವರದಿ ಮಾಡುವವರ ವಿರುದ್ಧ ಯಾವುದೇ ಪ್ರತೀಕಾರ, ಅವನತಿ ಅಥವಾ ಪ್ರತಿಕೂಲ ಕ್ರಮವಿಲ್ಲ",
        "ಪರಿಹಾರ ಸಮಯಮಿತಿ: ಪ್ರಮಾಣಿತ ಪ್ರಕರಣಗಳಿಗೆ 45 ಕೆಲಸದ ದಿನಗಳು",
        "ಪರಿಹಾರವಾಗದಿದ್ದರೆ ಮಂಡಳಿ ಲೆಕ್ಕಪರಿಶೋಧನಾ ಸಮಿತಿಗೆ ಎಸ್ಕಲೇಷನ್"
      ],
      highlight:"ಜಾಗರೂಕತಾ ಕಾರ್ಯವಿಧಾನವನ್ನು ನಮ್ಮ ಮಂಡಳಿಯ ಲೆಕ್ಕಪರಿಶೋಧನಾ ಸಮಿತಿಯು ನೇರವಾಗಿ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುತ್ತದೆ, ಇದು ನಿರ್ವಹಣೆಯ ಪ್ರಭಾವದಿಂದ ಸ್ವಾತಂತ್ರ್ಯವನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ."
    },
    {
      id:"investor-policy",
      title:"ಹೂಡಿಕೆದಾರರಿಗೆ ನೀತಿ",
      short:"ನ್ಯಾಯಯುತ, ಸಮಯೋಚಿತ ಮತ್ತು ಪಾರದರ್ಶಕ ಹೂಡಿಕೆದಾರ ಸಂವಹನ.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ನಿಯಮಿತ ಬಹಿರಂಗಪಡಿಸುವಿಕೆಗಳು, ನ್ಯಾಯಯುತ ವ್ಯವಹಾರ ಮತ್ತು ಎಲ್ಲಾ ಅನ್ವಯವಾಗುವ ಕಾರ್ಪೊರೇಟ್ ಆಡಳಿತ ಮಾನದಂಡಗಳ ಅನುಸರಣೆಯ ಮೂಲಕ ದೀರ್ಘಕಾಲೀನ ಹೂಡಿಕೆದಾರರ ನಂಬಿಕೆಯನ್ನು ನಿರ್ಮಿಸಲು ಬದ್ಧವಾಗಿದೆ.",
      points:[
        "ಎಲ್ಲಾ ನೋಂದಾಯಿತ ಹೂಡಿಕೆದಾರರೊಂದಿಗೆ ತ್ರೈಮಾಸಿಕ ಹಣಕಾಸು ನವೀಕರಣಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ",
        "ಹಣಕಾಸು ವರ್ಷ ಮುಕ್ತಾಯವಾದ 6 ತಿಂಗಳೊಳಗೆ ವಾರ್ಷಿಕ ಸಾಮಾನ್ಯ ಸಭೆ ನಡೆಸಲಾಗುತ್ತದೆ",
        "ಪ್ರಮುಖ ಬೆಳವಣಿಗೆಗಳನ್ನು 24 ಗಂಟೆಗಳ ಒಳಗೆ ಕಂಪನಿ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಬಹಿರಂಗಪಡಿಸಲಾಗುತ್ತದೆ",
        "15 ಕೆಲಸದ ದಿನಗಳೊಳಗೆ ಹೂಡಿಕೆದಾರರ ದೂರು ಪರಿಹಾರ",
        "SEBI ಮತ್ತು RBI ವರದಿ ಮಾನದಂಡಗಳನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಅನುಸರಿಸಲಾಗುತ್ತದೆ",
        "ಪ್ರಶ್ನೆಗಳಿಗೆ ಮೀಸಲಾದ ಹೂಡಿಕೆದಾರ ಸಂಬಂಧಗಳ ಸಂಪರ್ಕ"
      ],
      highlight:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಎಲ್ಲಾ ಪಾಲುದಾರರಿಗೆ ಸುಸ್ಥಿರ ವ್ಯವಹಾರ ಬೆಳವಣಿಗೆಯನ್ನು ಖಚಿತಪಡಿಸುವಾಗ ಹೂಡಿಕೆದಾರರ ಹಕ್ಕುಗಳನ್ನು ರಕ್ಷಿಸುವ ಬಲವಾದ ಆಡಳಿತ ರಚನೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ."
    },
    {
      id:"securities-trading",
      title:"ಸೆಕ್ಯೂರಿಟೀಸ್ ಟ್ರೇಡಿಂಗ್ ನಿಯಮಗಳು",
      short:"ಒಳಗಿನ ವ್ಯಾಪಾರ ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ಅನುಸರಣೆ ಚೌಕಟ್ಟು.",
      overview:"ನಮ್ಮ ಸೆಕ್ಯೂರಿಟೀಸ್ ಟ್ರೇಡಿಂಗ್ ನಿಯಮಗಳು ಒಳಗಿನ ವ್ಯಾಪಾರವನ್ನು ತಡೆಗಟ್ಟುತ್ತವೆ ಮತ್ತು ಸಂಪರ್ಕಿತ ವ್ಯಕ್ತಿಗಳ ಎಲ್ಲಾ ಮಾರುಕಟ್ಟೆ ಚಟುವಟಿಕೆಗಳು SEBI ನಿಯಮಗಳಿಗೆ ಅನುಸಾರವಾಗಿರುವುದನ್ನು ಖಚಿತಪಡಿಸುತ್ತವೆ.",
      points:[
        "ನಾಮನಿರ್ದೇಶಿತ ವ್ಯಕ್ತಿಗಳ ಪಟ್ಟಿಯನ್ನು ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ತ್ರೈಮಾಸಿಕ ನವೀಕರಿಸಲಾಗುತ್ತದೆ",
        "ನಿರ್ದಿಷ್ಟ ಮಿತಿಗಿಂತ ಮೇಲಿನ ವ್ಯಾಪಾರಗಳಿಗೆ ಕಡ್ಡಾಯ ಪೂರ್ವ-ಅನುಮತಿ",
        "ಹಣಕಾಸು ಫಲಿತಾಂಶಗಳ ಪ್ರಕಟಣೆಗೆ ಮೊದಲು ವ್ಯಾಪಾರ ವಿಂಡೋ ಬ್ಲಾಕ್‌ಔಟ್ ಅವಧಿಗಳು",
        "ಉಲ್ಲಂಘನೆಗೆ ದಂಡಗಳು: ತಕ್ಷಣದ ಅಮಾನತು ಮತ್ತು ಕಾನೂನು ಕ್ರಮ",
        "ಎಲ್ಲಾ ನಾಮನಿರ್ದೇಶಿತ ವ್ಯಕ್ತಿಗಳಿಂದ ವಾರ್ಷಿಕ ಅನುಸರಣೆ ಪ್ರಮಾಣೀಕರಣ ಅಗತ್ಯ",
        "SEBI PIT ನಿಯಮಗಳ ಕುರಿತು ನಿಯಮಿತ ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳು"
      ],
      highlight:"ನಮ್ಮ ಅನುಸರಣೆ ಅಧಿಕಾರಿಯು ನಾಮನಿರ್ದೇಶಿತ ವ್ಯಕ್ತಿಗಳ ಎಲ್ಲಾ ವ್ಯಾಪಾರಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುತ್ತಾರೆ ಮತ್ತು ತ್ರೈಮಾಸಿಕ ಆಧಾರದ ಮೇಲೆ ಲೆಕ್ಕಪರಿಶೋಧನಾ ಸಮಿತಿಗೆ ವರದಿ ಮಾಡುತ್ತಾರೆ."
    },
    {
      id:"app-disclaimer",
      title:"ಅಪ್ಲಿಕೇಶನ್ ನಿರಾಕರಣೆ",
      short:"ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್ ಬಳಕೆಯ ನಿಯಮಗಳು, ಡೇಟಾ ಮತ್ತು ಹೊಣೆಗಾರಿಕೆ ಷರತ್ತುಗಳು.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಅನುಕೂಲಕರ ಸಾಧನವಾಗಿ ಒದಗಿಸಲಾಗಿದೆ. ಈ ನಿರಾಕರಣೆಯು ಬಳಕೆಯ ನಿಯಮಗಳು, ಹೊಣೆಗಾರಿಕೆಯ ಮಿತಿಗಳು ಮತ್ತು ಬಳಕೆದಾರರ ಜವಾಬ್ದಾರಿಗಳನ್ನು ವಿವರಿಸುತ್ತದೆ.",
      points:[
        "ಅಪ್ಲಿಕೇಶನ್ ಮಾಹಿತಿ ಮತ್ತು ಅರ್ಜಿ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಮಾತ್ರ",
        "ಸಾಲ ಅನುಮೋದನೆಯು ಭೌತಿಕ ಪರಿಶೀಲನೆ ಮತ್ತು ಸಾಲ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ",
        "ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು ಅಥವಾ ಅಪ್ಲಿಕೇಶನ್ ಔಟ್‌ಪುಟ್‌ಗಳು ಕಾನೂನು ಬದ್ಧ ದಾಖಲೆಗಳಲ್ಲ",
        "ಅಪ್ಲಿಕೇಶನ್ ಕಾರ್ಯಕ್ಷಮತೆಯು ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು ಸಾಧನದ ಸ್ಥಿತಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ",
        "ಅನಧಿಕೃತ ಪ್ರವೇಶದಿಂದ ಉಂಟಾಗುವ ನಷ್ಟಗಳಿಗೆ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಹೊಣೆಯಲ್ಲ",
        "ನವೀಕರಣಗಳು ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಬದಲಾಯಿಸಬಹುದು; ಮುಂದುವರಿದ ಬಳಕೆಯು ಒಪ್ಪಿಗೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ"
      ],
      highlight:"ಅಧಿಕೃತ ಸಾಲ ಅನುಮತಿ ಪತ್ರಗಳು ಮತ್ತು ಬದ್ಧ ಒಪ್ಪಂದಗಳಿಗಾಗಿ, ನಮ್ಮ ನೋಂದಾಯಿತ ಕಚೇರಿಯ ಮೂಲಕ ನೀಡಲಾದ ದಾಖಲೆಗಳು ಮಾತ್ರ ಕಾನೂನು ಸಿಂಧುತ್ವವನ್ನು ಹೊಂದಿರುತ್ತವೆ."
    },
    {
      id:"auction-policy",
      title:"ಹರಾಜು ನೀತಿ",
      short:"ಪಾರದರ್ಶಕ, RBI-ಅನುಸಾರ ಚಿನ್ನದ ಹರಾಜು ಪ್ರಕ್ರಿಯೆಗಳು.",
      overview:"ಸಾಲದ ಡೀಫಾಲ್ಟ್ ಪ್ರಕರಣಗಳಲ್ಲಿ, ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಕಟ್ಟುನಿಟ್ಟಾದ, RBI-ಆದೇಶಿತ ಹರಾಜು ನೀತಿಯನ್ನು ಅನುಸರಿಸುತ್ತದೆ, ಇದು ಗ್ರಾಹಕರ ನ್ಯಾಯಯುತ ವ್ಯವಹಾರ ಮತ್ತು ಆಧಾರಿತ ಚಿನ್ನದ ಪಾರದರ್ಶಕ ಹರಾಜನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.",
      points:[
        "ಹರಾಜು ಕಾರ್ಯವಿಧಾನಗಳನ್ನು ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಕನಿಷ್ಠ 14 ದಿನಗಳ ಲಿಖಿತ ಸೂಚನೆ",
        "ಪ್ರಮಾಣೀಕೃತ ಪರವಾನಗಿ ಪಡೆದ ಹರಾಜುದಾರರಿಂದ ಮಾತ್ರ ಹರಾಜು ನಡೆಸಲಾಗುತ್ತದೆ",
        "ಗ್ರಾಹಕರಿಗೆ ಹರಾಜು ದಿನಾಂಕ, ಸ್ಥಳ ಮತ್ತು ಮೀಸಲು ಬೆಲೆಯನ್ನು ಸೂಚಿಸಲಾಗುತ್ತದೆ",
        "ಹೆಚ್ಚುವರಿ ಆದಾಯವನ್ನು (ಯಾವುದಾದರೂ ಇದ್ದರೆ) 7 ಕೆಲಸದ ದಿನಗಳೊಳಗೆ ಗ್ರಾಹಕರಿಗೆ ಹಿಂದಿರುಗಿಸಲಾಗುತ್ತದೆ",
        "ಹರಾಜು ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಗ್ರಾಹಕರ ಪರಿಶೀಲನೆಗೆ ಲಭ್ಯವಿರುತ್ತದೆ",
        "ಹರಾಜು ಪ್ರಾರಂಭವಾಗುವವರೆಗೆ ಗ್ರಾಹಕರು ಆಧಾರಿತ ಚಿನ್ನವನ್ನು ವಿಮೋಚಿಸಬಹುದು"
      ],
      highlight:"ನಮ್ಮ ಹರಾಜು ನೀತಿಯು ಚಿನ್ನದ ಸಾಲಗಳ ಮೇಲಿನ RBI ಮಾಸ್ಟರ್ ಸರ್ಕ್ಯುಲರ್ ಅನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಅನುಸರಿಸುತ್ತದೆ ಮತ್ತು ಹರಾಜಿಗೆ ಮೊರೆ ಹೋಗುವ ಮೊದಲು ಗ್ರಾಹಕರ ಬಾಕಿಗಳ ಗರಿಷ್ಠ ವಸೂಲಾತಿಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ."
    },
    {
      id:"loan-policy",
      title:"ಸಾಲ ನೀತಿ",
      short:"ಅರ್ಹತೆ, ಅನುಮತಿ, ವಿತರಣೆ ಮತ್ತು ವಸೂಲಾತಿ ಮಾನದಂಡಗಳು.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಸಾಲ ನೀತಿಯು ಸಂಪೂರ್ಣ ಸಾಲ ಜೀವನಚಕ್ರವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ — ಅರ್ಹತೆ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಅನುಮತಿಯಿಂದ ವಿತರಣೆ, ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ವಸೂಲಾತಿಯವರೆಗೆ.",
      points:[
        "ಎಲ್ಲಾ ಸಾಲ ಅರ್ಜಿಗಳಿಗೆ KYC ಮತ್ತು ಆದಾಯ ಪರಿಶೀಲನೆ ಕಡ್ಡಾಯ",
        "RBI ಮಾನದಂಡಗಳ ಪ್ರಕಾರ ಚಿನ್ನದ ಸಾಲ LTV ಅನುಪಾತವನ್ನು ಗರಿಷ್ಠ 75% ರಷ್ಟು ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ",
        "ಸ್ವಾಮ್ಯದ ಸ್ಕೋರಿಂಗ್ ಮತ್ತು ಬ್ಯೂರೋ ಡೇಟಾವನ್ನು ಬಳಸಿಕೊಂಡು ಸಾಲ ಮೌಲ್ಯಮಾಪನ",
        "ದಾಖಲೆ ಪರಿಶೀಲನೆಯ 24 ಗಂಟೆಗಳ ಒಳಗೆ ವಿತರಣೆ",
        "ಕೃಷಿ ಮತ್ತು ಋತುಮಾನದ ಸಾಲಗಾರರಿಗೆ EMI ರಜೆ ಲಭ್ಯವಿದೆ",
        "RBI NBFC ಎಚ್ಚರಿಕೆಯ ಮಾನದಂಡಗಳ ಪ್ರಕಾರ NPA ವರ್ಗೀಕರಣ"
      ],
      highlight:"ನಮ್ಮ ಸಾಲ ನೀತಿಯನ್ನು ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ನಿಯಂತ್ರಕ ಅಗತ್ಯಗಳನ್ನು ಪ್ರತಿಬಿಂಬಿಸಲು ಅಪಾಯ ನಿರ್ವಹಣಾ ಸಮಿತಿಯಿಂದ ಅರೆ-ವಾರ್ಷಿಕವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ."
    },
    {
      id:"code-fair-practices",
      title:"ನ್ಯಾಯಯುತ ಅಭ್ಯಾಸಗಳ ಸಂಹಿತೆ",
      short:"ಸಾಲಗಾರರು, ಸಂಗ್ರಹ ಏಜೆಂಟ್‌ಗಳು ಮತ್ತು ಸಿಬ್ಬಂದಿಯೊಂದಿಗೆ ನೈತಿಕ ವ್ಯವಹಾರ.",
      overview:"ನಮ್ಮ ಮೂಲ ನೈತಿಕತೆಯ ಚೌಕಟ್ಟಿನ ವಿಸ್ತರಣೆ, ಈ ಸಂಹಿತೆಯು ಸಂಗ್ರಹ, ಕ್ಷೇತ್ರ ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಗ್ರಾಹಕ-ಮುಖದ ಚಟುವಟಿಕೆಗಳಲ್ಲಿ ನ್ಯಾಯಯುತ ವ್ಯವಹಾರ ಅಭ್ಯಾಸಗಳನ್ನು ನಿರ್ದಿಷ್ಟವಾಗಿ ತಿಳಿಸುತ್ತದೆ.",
      points:[
        "ಯಾವುದೇ ಬಲವಂತದ ಅಥವಾ ಆಕ್ರಮಣಕಾರಿ ವಸೂಲಾತಿ ತಂತ್ರಗಳಿಗೆ ಅವಕಾಶವಿಲ್ಲ",
        "ಸಂಗ್ರಹ ಕರೆಗಳು ಸ್ಥಳೀಯ ಸಮಯ ಬೆಳಿಗ್ಗೆ 8 ರಿಂದ ಸಂಜೆ 7 ರ ನಡುವೆ ಮಾತ್ರ",
        "ಏಜೆಂಟ್‌ಗಳು ಗುರುತಿನ ಚೀಟಿಗಳು ಮತ್ತು ಕಂಪನಿ ಅಧಿಕಾರ ಪತ್ರಗಳನ್ನು ಹೊಂದಿರಬೇಕು",
        "ಪೂರ್ವ ಒಪ್ಪಿಗೆ ಇಲ್ಲದೆ ಗ್ರಾಹಕರ ಉದ್ಯೋಗದಾತರನ್ನು ಸಂಪರ್ಕಿಸಬಾರದು",
        "ನಿಜವಾದ ಕಷ್ಟದ ಆಧಾರದ ಮೇಲೆ ಮರುಪಾವತಿ ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ಮರುಸಂಧಾನ ಮಾಡಲಾಗುತ್ತದೆ",
        "ಎಲ್ಲಾ ಗ್ರಾಹಕ ಸಂವಹನಗಳನ್ನು 3 ವರ್ಷಗಳವರೆಗೆ ದಾಖಲಿಸಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ"
      ],
      highlight:"ನಾವು ಎಲ್ಲಾ ಸಂಗ್ರಹ ಸಿಬ್ಬಂದಿಗೆ ನೈತಿಕ ಅಭ್ಯಾಸಗಳು ಮತ್ತು ಗ್ರಾಹಕ ಹಕ್ಕುಗಳ ಕುರಿತು ತ್ರೈಮಾಸಿಕ ತರಬೇತಿ ನೀಡುತ್ತೇವೆ, ಕಾರ್ಯಕ್ಷಮತೆ ವಿಮರ್ಶೆಗಳು ಯಾವುದೇ ಉಲ್ಲಂಘನೆಯನ್ನು ದಂಡಿಸುತ್ತವೆ."
    },
    {
      id:"terms",
      title:"ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",
      short:"ಎಲ್ಲಾ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಉತ್ಪನ್ನಗಳನ್ನು ನಿಯಂತ್ರಿಸುವ ಸಾಮಾನ್ಯ ಕಾನೂನು ನಿಯಮಗಳು.",
      overview:"ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ನೀಡುವ ಪ್ರತಿಯೊಂದು ಉತ್ಪನ್ನ ಮತ್ತು ಸೇವೆಗೆ ಕಾನೂನು ಅಡಿಪಾಯವನ್ನು ರೂಪಿಸುತ್ತವೆ, ಎಲ್ಲಾ ಪಕ್ಷಗಳಿಗೆ ಸ್ಪಷ್ಟತೆ ಮತ್ತು ರಕ್ಷಣೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತವೆ.",
      points:[
        "ಭಾರತದ ಕಾನೂನುಗಳಿಂದ ನಿಯಂತ್ರಿಸಲ್ಪಡುತ್ತದೆ; ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿ: ನೋಂದಾಯಿತ ರಾಜ್ಯ ನ್ಯಾಯಾಲಯಗಳು",
        "ಸೇವಾ ನಿಯಮಗಳನ್ನು 30 ದಿನಗಳ ಮುಂಚಿತ ಸೂಚನೆಯೊಂದಿಗೆ ನವೀಕರಿಸಬಹುದು",
        "ಡಿಜಿಟಲ್ ಒಪ್ಪಿಗೆಯು ಭೌತಿಕ ಸಹಿಯಂತೆಯೇ ಅದೇ ಕಾನೂನು ಸಿಂಧುತ್ವವನ್ನು ಹೊಂದಿದೆ",
        "ಫೋರ್ಸ್ ಮಜೇರ್ ಷರತ್ತು ನೈಸರ್ಗಿಕ ವಿಕೋಪಗಳು, ಸಾಂಕ್ರಾಮಿಕಗಳು ಮತ್ತು ನಿಯಂತ್ರಕ ಕ್ರಮಗಳನ್ನು ಒಳಗೊಂಡಿದೆ",
        "ಮಧ್ಯಸ್ಥಿಕೆ ಕಾಯಿದೆ, 1996 ರ ಅಡಿಯಲ್ಲಿ ಮಧ್ಯಸ್ಥಿಕೆಯ ಮೂಲಕ ವಿವಾದ ಪರಿಹಾರ",
        "ಎಲ್ಲಾ ಮೊತ್ತಗಳು ಭಾರತೀಯ ರೂಪಾಯಿಗಳಲ್ಲಿ; GST/ತೆರಿಗೆಗಳನ್ನು ಗ್ರಾಹಕರು ಭರಿಸುತ್ತಾರೆ"
      ],
      highlight:"ಎಲ್ಲಾ ಗ್ರಾಹಕರು ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಓದಬೇಕೆಂದು ನಾವು ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ. ಯಾವುದೇ ಷರತ್ತನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಲು ನಮ್ಮ ಗ್ರಾಹಕ ಆರೈಕೆ ತಂಡ ಲಭ್ಯವಿದೆ."
    },
    {
      id:"csr",
      title:"CSR ನೀತಿ",
      short:"ಸಮುದಾಯ ಹೂಡಿಕೆ ಮತ್ತು ಸಾಮಾಜಿಕ ಜವಾಬ್ದಾರಿ ಬದ್ಧತೆಗಳು.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನ CSR ನೀತಿಯು ನಾವು ಸೇವೆ ಸಲ್ಲಿಸುವ ಸಮುದಾಯಗಳಿಗೆ ಮರಳಿ ನೀಡುವ ನಮ್ಮ ಬದ್ಧತೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ. 2020 ರಿಂದ, ನಾವು ಶಿಕ್ಷಣ, ಹಣಕಾಸು ಸಾಕ್ಷರತೆ ಮತ್ತು ಸ್ಥಳೀಯ ಅಭಿವೃದ್ಧಿಗೆ ಸಂಪನ್ಮೂಲಗಳನ್ನು ನಿಯೋಜಿಸಿದ್ದೇವೆ.",
      points:[
        "ಕಂಪನಿಗಳ ಕಾಯಿದೆ 2013 ಮಾರ್ಗಸೂಚಿಗಳಿಗೆ (ಅನ್ವಯಿಸುವಾಗ) ಅನುಗುಣವಾಗಿ CSR ವೆಚ್ಚ",
        "ಆದ್ಯತೆಯ ಕ್ಷೇತ್ರಗಳು: ಹಣಕಾಸು ಸಾಕ್ಷರತೆ, ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣ, ಮಹಿಳಾ ಸಬಲೀಕರಣ",
        "ವಾರ್ಷಿಕ CSR ವರದಿಯನ್ನು ಕಂಪನಿ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ",
        "ಉದ್ಯೋಗಿ ಸ್ವಯಂಸೇವಕ ಕಾರ್ಯಕ್ರಮಗಳು — ಪ್ರತಿ ಸಿಬ್ಬಂದಿಗೆ ವರ್ಷಕ್ಕೆ ಕನಿಷ್ಠ 8 ಗಂಟೆಗಳು",
        "ಅಂತಿಮ-ಮೈಲಿ ಸಮುದಾಯ ಪರಿಣಾಮಕ್ಕಾಗಿ ಸ್ಥಳೀಯ NGO ಗಳೊಂದಿಗೆ ಪಾಲುದಾರಿಕೆ",
        "ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಅತಿ ಹೆಚ್ಚು ಗ್ರಾಹಕ ನೆಲೆಯನ್ನು ಹೊಂದಿರುವ ಜಿಲ್ಲೆಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿ"
      ],
      highlight:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ 2020 ರಲ್ಲಿ ಸ್ಥಾಪನೆಯಾದಾಗಿನಿಂದ 50+ ಹಣಕಾಸು ಸಾಕ್ಷರತಾ ಕಾರ್ಯಾಗಾರಗಳನ್ನು ನಡೆಸಿದೆ, 5,000+ ಗ್ರಾಮೀಣ ಮನೆಗಳನ್ನು ತಲುಪಿದೆ."
    },
    {
      id:"statutory-auditors",
      title:"ವಿಧಿಬದ್ಧ ಲೆಕ್ಕಪರಿಶೋಧಕರ ನೇಮಕಾತಿ ನೀತಿ",
      short:"ವಿಧಿಬದ್ಧ ಲೆಕ್ಕಪರಿಶೋಧಕರಿಗೆ ಸ್ವಾತಂತ್ರ್ಯ ಮತ್ತು ಆವರ್ತನ ಮಾನದಂಡಗಳು.",
      overview:"ಈ ನೀತಿಯು ಕಂಪನಿಗಳ ಕಾಯಿದೆ, 2013 ಮತ್ತು NBFCಗಳಿಗೆ RBI ಮಾರ್ಗಸೂಚಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಅರ್ಹ, ಸ್ವತಂತ್ರ ವಿಧಿಬದ್ಧ ಲೆಕ್ಕಪರಿಶೋಧಕರ ಆಯ್ಕೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.",
      points:[
        "ಲೆಕ್ಕಪರಿಶೋಧನಾ ಸಮಿತಿಯ ಶಿಫಾರಸಿನ ಮೇರೆಗೆ ಮಂಡಳಿಯಿಂದ ಲೆಕ್ಕಪರಿಶೋಧಕರ ಆಯ್ಕೆ",
        "ಪ್ರತಿ 5 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಕಡ್ಡಾಯ ಆವರ್ತನ (ಅಥವಾ ಕಂಪನಿಗಳ ಕಾಯಿದೆಯ ನಿಬಂಧನೆಗಳ ಪ್ರಕಾರ)",
        "ಸ್ವಾತಂತ್ರ್ಯವನ್ನು ದುರ್ಬಲಗೊಳಿಸುವ ಯಾವುದೇ ಏಕಕಾಲಿಕ ಲೆಕ್ಕಪರಿಶೋಧಕೇತರ ಸೇವೆಗಳಿಲ್ಲ",
        "ಲೆಕ್ಕಪರಿಶೋಧಕರು ಮಾನ್ಯವಾದ ICAI ಅಭ್ಯಾಸ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಹೊಂದಿರಬೇಕು",
        "ಪ್ರತಿ ನೇಮಕಾತಿಗೆ ಮೊದಲು ಹಿತಾಸಕ್ತಿ ಸಂಘರ್ಷ ತಪಾಸಣೆ ನಡೆಸಲಾಗುತ್ತದೆ",
        "AGM ನಲ್ಲಿ ಷೇರುದಾರರಿಂದ ಲೆಕ್ಕಪರಿಶೋಧನಾ ಶುಲ್ಕಗಳನ್ನು ಅನುಮೋದಿಸಲಾಗುತ್ತದೆ"
      ],
      highlight:"ನಮ್ಮ ಲೆಕ್ಕಪರಿಶೋಧನಾ ಸಮಿತಿಯು ನಿರ್ವಹಣೆಯ ಪ್ರಭಾವವಿಲ್ಲದೆ ಎಲ್ಲಾ ಲೆಕ್ಕಪರಿಶೋಧಕ ಅಭ್ಯರ್ಥಿಗಳನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ, ಸಂಪೂರ್ಣ ವಸ್ತುನಿಷ್ಠತೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ."
    },
    {
      id:"human-rights",
      title:"ಮಾನವ ಹಕ್ಕುಗಳ ನೀತಿ",
      short:"ತಾರತಮ್ಯ, ಶೋಷಣೆ ಅಥವಾ ಬಲವಂತದ ಕಾರ್ಮಿಕರಿಗೆ ಶೂನ್ಯ ಸಹಿಷ್ಣುತೆ.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಎಲ್ಲಾ ವ್ಯವಹಾರ ಕಾರ್ಯಾಚರಣೆಗಳಲ್ಲಿ ಸಾರ್ವತ್ರಿಕ ಮಾನವ ಹಕ್ಕುಗಳ ಮಾನದಂಡಗಳನ್ನು ಎತ್ತಿಹಿಡಿಯುತ್ತದೆ, ಪ್ರತಿ ಉದ್ಯೋಗಿ, ಗ್ರಾಹಕ ಮತ್ತು ಪಾಲುದಾರರನ್ನು ಘನತೆ ಮತ್ತು ಗೌರವದಿಂದ ನಡೆಸಿಕೊಳ್ಳುತ್ತದೆ.",
      points:[
        "ಬಾಲ ಕಾರ್ಮಿಕ, ಬಲವಂತದ ಕಾರ್ಮಿಕ ಅಥವಾ ಮಾನವ ಕಳ್ಳಸಾಗಣೆಗೆ ಶೂನ್ಯ ಸಹಿಷ್ಣುತೆ",
        "ಸಮಾನ ಅವಕಾಶ ಉದ್ಯೋಗದಾತ — ಯಾವುದೇ ರೀತಿಯ ತಾರತಮ್ಯವಿಲ್ಲ",
        "ಸುರಕ್ಷಿತ ಕಾರ್ಯಸ್ಥಳ — ತರಬೇತಿ ಪಡೆದ ICC ಯೊಂದಿಗೆ POSH ಕಾಯಿದೆ ಅನುಸರಣೆ",
        "ಎಲ್ಲಾ ಗುತ್ತಿಗೆ ಸಿಬ್ಬಂದಿಗೆ ಜೀವನ ವೇತನ ಮಾನದಂಡಗಳನ್ನು ಅನ್ವಯಿಸಲಾಗುತ್ತದೆ",
        "ಮಾರಾಟಗಾರ ಮತ್ತು ಪಾಲುದಾರರ ಆಯ್ಕೆಯಲ್ಲಿ ಮಾನವ ಹಕ್ಕುಗಳ ಸೂಕ್ತ ಶ್ರದ್ಧೆ",
        "ಆಂತರಿಕವಾಗಿ ನಡೆಸಿದ ವಾರ್ಷಿಕ ಮಾನವ ಹಕ್ಕುಗಳ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ"
      ],
      highlight:"ನಾವು ನಮ್ಮ ಮಾನವ ಹಕ್ಕುಗಳ ನೀತಿಯನ್ನು ವ್ಯವಹಾರ ಮತ್ತು ಮಾನವ ಹಕ್ಕುಗಳ ಕುರಿತಾದ UN ಮಾರ್ಗದರ್ಶಿ ತತ್ವಗಳೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆ ಮಾಡಿಕೊಳ್ಳುತ್ತೇವೆ, ನಮ್ಮ ಕ್ಷೇತ್ರದಲ್ಲಿ NBFCಗಳಿಗೆ ಉನ್ನತ ಮಾನದಂಡವನ್ನು ಸ್ಥಾಪಿಸುತ್ತೇವೆ."
    },
    {
      id:"responsible-advocacy",
      title:"ಜವಾಬ್ದಾರಿಯುತ ವಕಾಲತ್ತು ನೀತಿ",
      short:"ನಿಯಂತ್ರಕರು, ಉದ್ಯಮ ಸಂಸ್ಥೆಗಳು ಮತ್ತು ಮಾಧ್ಯಮಗಳೊಂದಿಗೆ ನೈತಿಕ ನಿಶ್ಚಿತಾರ್ಥ.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ನಿಯಂತ್ರಕರು, ಉದ್ಯಮ ಸಂಘಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ವೇದಿಕೆಗಳೊಂದಿಗೆ ಜವಾಬ್ದಾರಿಯುತವಾಗಿ ತೊಡಗಿಸಿಕೊಳ್ಳುತ್ತದೆ — ನಮ್ಮ ವಕಾಲತ್ತು ಪಾರದರ್ಶಕ, ಸಾಕ್ಷ್ಯ-ಆಧಾರಿತ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಹಿತಾಸಕ್ತಿಯೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆಯಾಗಿದೆ ಎಂದು ಯಾವಾಗಲೂ ಖಚಿತಪಡಿಸುತ್ತದೆ.",
      points:[
        "ಎಲ್ಲಾ ನಿಯಂತ್ರಕ ಸಲ್ಲಿಕೆಗಳನ್ನು ಅನುಸರಣೆ ಅಧಿಕಾರಿಯಿಂದ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ",
        "ಯಾವುದೇ ಬಹಿರಂಗಪಡಿಸದ ರಾಜಕೀಯ ಕೊಡುಗೆಗಳು ಅಥವಾ ಲಾಬಿ ವೆಚ್ಚಗಳಿಲ್ಲ",
        "ನಾಮನಿರ್ದೇಶಿತ ವಕ್ತಾರರ ಮೂಲಕ ಮಾತ್ರ ಮಾಧ್ಯಮ ಸಂವಹನಗಳು",
        "ಉದ್ಯಮ ಸಂಘದ ಸದಸ್ಯತ್ವಗಳನ್ನು ವಾರ್ಷಿಕ ವರದಿಯಲ್ಲಿ ಬಹಿರಂಗಪಡಿಸಲಾಗುತ್ತದೆ",
        "ಗ್ರಾಹಕ ಮತ್ತು ಸಾಮಾಜಿಕ ಲಾಭದೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆಯಾದ ವಕಾಲತ್ತು ಸ್ಥಾನಗಳು",
        "ಮಂಡಳಿಯಿಂದ ವಾರ್ಷಿಕ ವಕಾಲತ್ತು ಚಟುವಟಿಕೆಗಳ ಪರಿಶೀಲನೆ"
      ],
      highlight:"ಜವಾಬ್ದಾರಿಯುತ ವಕಾಲತ್ತು ಆರೋಗ್ಯಕರ ಹಣಕಾಸು ಪರಿಸರ ವ್ಯವಸ್ಥೆ ಮತ್ತು NBFCಗಳಿಗೆ ಹೆಚ್ಚು ಒಳಗೊಳ್ಳುವ ನಿಯಂತ್ರಕ ಪರಿಸರಕ್ಕೆ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ."
    },
    {
      id:"diversity",
      title:"ವೈವಿಧ್ಯತೆ, ಸೇರ್ಪಡೆ ಮತ್ತು ಸಮಾನ ಅವಕಾಶ ನೀತಿ",
      short:"ಎಲ್ಲರಿಗೂ ಒಳಗೊಳ್ಳುವ, ಸಮಾನ ಕಾರ್ಯಸ್ಥಳವನ್ನು ನಿರ್ಮಿಸುವುದು.",
      overview:"ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ವೈವಿಧ್ಯಮಯ ಮತ್ತು ಒಳಗೊಳ್ಳುವ ಸಂಸ್ಥೆಯನ್ನು ನಿರ್ಮಿಸಲು ಬದ್ಧವಾಗಿದೆ, ಅಲ್ಲಿ ಪ್ರತಿಯೊಬ್ಬ ವ್ಯಕ್ತಿಯು — ಹಿನ್ನೆಲೆಯನ್ನು ಲೆಕ್ಕಿಸದೆ — ಅಭಿವೃದ್ಧಿ ಹೊಂದಬಹುದು ಮತ್ತು ತಮ್ಮ ಪೂರ್ಣ ಸಾಮರ್ಥ್ಯಕ್ಕೆ ಕೊಡುಗೆ ನೀಡಬಹುದು.",
      points:[
        "ಹಿರಿಯ ನಿರ್ವಹಣಾ ಹುದ್ದೆಗಳಲ್ಲಿ ಮಹಿಳೆಯರಿಗೆ ವೈವಿಧ್ಯತೆ ಗುರಿಗಳು",
        "ಸಾಧ್ಯವಿರುವಲ್ಲಿ ಬ್ಲೈಂಡ್ ಸ್ಕ್ರೀನಿಂಗ್‌ನೊಂದಿಗೆ ಒಳಗೊಳ್ಳುವ ನೇಮಕಾತಿ ಅಭ್ಯಾಸಗಳು",
        "ಅಂಗವಿಕಲ ಉದ್ಯೋಗಿಗಳಿಗೆ ಅವಕಾಶ ಕಲ್ಪನೆ",
        "ವರ್ಷವಿಡೀ ಬಹುಸಾಂಸ್ಕೃತಿಕ ಹಬ್ಬಗಳು ಮತ್ತು ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳು",
        "ಎಲ್ಲಾ ಸಿಬ್ಬಂದಿಗೆ ವಾರ್ಷಿಕ ಕಡ್ಡಾಯ ಕಿರುಕುಳ ವಿರೋಧಿ ತರಬೇತಿ",
        "ವೈವಿಧ್ಯತೆ ಮೆಟ್ರಿಕ್‌ಗಳನ್ನು ತ್ರೈಮಾಸಿಕ ಮಂಡಳಿಗೆ ವರದಿ ಮಾಡಲಾಗುತ್ತದೆ"
      ],
      highlight:"ನಮ್ಮ ಗ್ರಾಹಕ-ಮುಖದ ಸಿಬ್ಬಂದಿಯಲ್ಲಿ 40% ಕ್ಕಿಂತ ಹೆಚ್ಚು ಮಹಿಳೆಯರು ಎಂದು ನಾವು ಹೆಮ್ಮೆಪಡುತ್ತೇವೆ ಮತ್ತು ನಾಯಕತ್ವ ಮಟ್ಟದಲ್ಲಿ ಪ್ರಾತಿನಿಧ್ಯವನ್ನು ಹೆಚ್ಚಿಸಲು ನಾವು ಸಕ್ರಿಯವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದ್ದೇವೆ."
    },
    {
      id:"stakeholders",
      title:"ಪಾಲುದಾರರ ನಿಶ್ಚಿತಾರ್ಥ ನೀತಿ",
      short:"ಎಲ್ಲಾ ಪಾಲುದಾರ ಗುಂಪುಗಳೊಂದಿಗೆ ರಚನಾತ್ಮಕ ನಿಶ್ಚಿತಾರ್ಥ.",
      overview:"ನಮ್ಮ ಪಾಲುದಾರರ ನಿಶ್ಚಿತಾರ್ಥ ನೀತಿಯು ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಎಲ್ಲಾ ಪಾಲುದಾರ ಗುಂಪುಗಳನ್ನು ಹೇಗೆ ಗುರುತಿಸುತ್ತದೆ, ಸಂವಹನ ನಡೆಸುತ್ತದೆ ಮತ್ತು ನಮ್ಮ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಹೇಗೆ ಅಳವಡಿಸಿಕೊಳ್ಳುತ್ತದೆ ಎಂಬುದನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುತ್ತದೆ.",
      points:[
        "ವಾರ್ಷಿಕ ಪಾಲುದಾರ ಮ್ಯಾಪಿಂಗ್ ಅಭ್ಯಾಸ ನಡೆಸಲಾಗುತ್ತದೆ",
        "ಹೂಡಿಕೆದಾರರು, ಗ್ರಾಹಕರು, ನಿಯಂತ್ರಕರಿಗೆ ಮೀಸಲಾದ ನಿಶ್ಚಿತಾರ್ಥ ಕ್ಯಾಲೆಂಡರ್",
        "ದ್ವೈ-ವಾರ್ಷಿಕ ಗ್ರಾಹಕ ತೃಪ್ತಿ ಸಮೀಕ್ಷೆಗಳು",
        "ಕ್ರಿಯಾ-ಯೋಜನೆ ಅನುಸರಣೆಯೊಂದಿಗೆ ಉದ್ಯೋಗಿ ನಿಶ್ಚಿತಾರ್ಥ ಸಮೀಕ್ಷೆಗಳು",
        "ಹೊಗೆ ಭೌಗೋಳಿಕ ಪ್ರದೇಶಗಳನ್ನು ಪ್ರವೇಶಿಸುವ ಮೊದಲು ಸಮುದಾಯ ಸಮಾಲೋಚನೆಗಳು",
        "ಕಂಪನಿ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ವಾರ್ಷಿಕ ಪಾಲುದಾರರ ವರದಿಯನ್ನು ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ"
      ],
      highlight:"ನಾವು ಪಾಲುದಾರರ ನಿಶ್ಚಿತಾರ್ಥವನ್ನು ಅನುಸರಣೆ ಚಟುವಟಿಕೆಯಾಗಿ ಅಲ್ಲ, ಬದಲಿಗೆ ದೀರ್ಘಕಾಲೀನ ಸಾಂಸ್ಥಿಕ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವವನ್ನು ನಿರ್ಮಿಸುವ ಕಾರ್ಯತಂತ್ರದ ಸಾಧನವಾಗಿ ನೋಡುತ್ತೇವೆ."
    },
  ],
},
ur:{
  section_tag: "تعمیل اور حکمرانی",
  section_title: "پالیسی",
  section_desc: "گنیش فائنانس ہمارے کاروبار کے ہر پہلو میں منصفانہ رویہ، شفافیت اور ریگولیٹری تعمیل کو یقینی بنانے والی پالیسیوں کے جامع فریم ورک کے تحت کام کرتا ہے۔ مزید جاننے کے لیے کسی بھی پالیسی پر کلک کریں۔",
  commitment_tag: "ہمارا عزم",
  commitment_title_1: "منصفانہ طریقہ کار ",
  commitment_title_hl: "اہم",
  commitment_sub: "2020 میں ہماری بنیاد کے بعد، منصفانہ طریقہ کار گنیش فائنانس میں ہر فیصلے کا بنیادی ستون بن گیا ہے۔",
  stat_assets: "انتظام کے تحت اثاثے",
  stat_customers: "خوش گاہک",
  stat_founded: "بنیاد",
  card_tagline: "شفافیت۔ اعتماد۔ سالمیت۔",
  card_body: "گنیش فائنانس میں ہر قرض، ہر لین دین، ہر گفتگو ہمارے گاہک کو پہلی جگہ دینے والی پالیسی کے ذریعے چلائی جاتی ہے۔",
  fp1_title: "پہلے سے شفاف",
  fp1_body: "گنیش فائنانس میں، آپ کے دستخط کرنے سے پہلے ہر فیس، شرح اور ہر شرط واضح طور پر بیان کرتے ہیں۔ ہمارے قرض کے دستاویزات عام زبان میں لکھے گئے ہیں — دھوکہ دینے کے لیے کوئی چھوٹا فونٹ نہیں۔",
  fp2_title: "گاہک مرکوز فیصلے",
  fp2_body: "ہم ہر پالیسی بناتے ہوئے ایک عام سوال سے شروع کرتے ہیں: کیا یہ ہمارے گاہک کے لیے منصفانہ ہے؟ لچکدار معاہدوں سے لے کر طویل مدتی قرض لینے والوں کے لیے صفر جرمانے تک، ہماری پالیسیاں آپ کی ضروریات کے گرد بنائی گئی ہیں۔",
  fp3_title: "ریگولیٹری تعمیل ایک طاقت کے طور پر",
  fp3_body: "ریزروی بینک آف انڈیا کے ذریعے رجسٹرڈ اور ریگولیٹڈ گنیش فائنانس تعمیل کو بوجھ کے طور پر نہیں بلکہ مقابلاتی فائدے کے طور پر دیکھتا ہے — ہم سب سے زیادہ سالمیت کے معیار کے ساتھ کام کرتے ہیں، اس کا ثبوت۔",
  fp4_title: "ہماری کمیونٹی کے ساتھ ترقی",
  fp4_body: "2020 سے، ہم ایک برانچ سے 1,000+ گاہکوں کو سروس دینے تک پھیل گئے ہیں۔ ہمارا ₹1.5 کروڑ اثاثہ بنیاد ہماری کمیونٹی کی ہم پر رکھے گئے اعتماد کی عکاسی ہے — اس صفحے پر موجود ہر پالیسی کے ذریعے اس اعتماد کی حفاظت کرتے ہیں۔",
  modal_company: "گنیش فائنانس",
  modal_overview: "خلاصہ",
  modal_key: "اہم اصول",
  modal_cta: "اس پالیسی کے بارے میں سوال کریں",
  modal_close: "بند کریں",
  view_details: "تفصیلات دیکھیں",
  policies: [
    {
      id:"fair-practices",
      title:"منصفانہ رویہ کا ضابطہ",
      short:"تمام گاہکوں کے لیے شفاف، اخلاقی قرض کے معیار۔",
      overview:"گنیش فائنانس کا منصفانہ رویہ کا ضابطہ تمام قرض کی پیداوار کو مکمل شفافیت، انصاف اور بغیر کسی امتیاز کے آگے بڑھانے کے لیے وسیع ہدایات قائم کرتا ہے۔",
      points:[
        "قرض کی تمام شرائط، سود کی شرح اور فیس کی منظوری سے پہلے واضح اعلان",
        "کوئی چھپا ہوا فیس نہیں — تحریری طور پر مکمل تفصیل دی جاتی ہے",
        "ذات، مذہب، جنس یا علاقے کی بنیاد پر برابر سلوک",
        "30 کام کے دنوں کے اندر شکایت کا تصفیہ",
        "ڈائریکٹرز بورڈ کے ذریعے سالانہ جائزہ اور ضابطہ کی تازہ کاری",
        "قرض کی تقسیم سے پہلے گاہک کی رضامندی لازمی"
      ],
      highlight:"ہمارا منصفانہ رویہ کا ضابطہ RBI کی ہدایات کے ساتھ مطابقت رکھنے کے لیے سالانہ جائزہ کیا جاتا ہے اور ہمارے ڈائریکٹرز بورڈ کے ذریعے منظور کیا جاتا ہے۔"
    },
    {
      id:"code-of-conduct",
      title:"ضابطہ اخلاق",
      short:"تمام ملازمین اور ایجنٹس کے لیے پیشہ ورانہ رویہ کے معیار۔",
      overview:"ہمارا ضابطہ اخلاق ہر گنیش فائنانس ملازم، ایجنٹ اور پارٹنر کو اخلاقی فریم ورک میں کام کرنے کی تعریف دیتا ہے — اعتماد کی بنیاد کو مضبوط کرتا ہے۔",
      points:[
        "رشوت، کرپشن یا غیر اخلاقی مطالبات کے لیے صفر برداشت",
        "تمام ملازمین کے لیے سالانہ لازمی اخلاقی تربیت",
        "تمام گاہک ڈیٹا کی رازداری کی ذمہ داری",
        "مصلحت کے ٹکراؤ کا اعلان پروٹوکول",
        "ہر سطح پر خلاف ورزی کے لیے سزا کے میٹرکس",
        "ایمانداری سے رپورٹ کرنے والوں کے لیے وسل بلور تحفظ"
      ],
      highlight:"ملازمین کو سالانہ ضابطہ اخلاق پر دستخط کر کے تسلیم کرنا پڑتا ہے اور خلاف ورزیاں تعمیری، غیر جانبدار سزا کے عمل سے حل کی جاتی ہیں۔"
    },
    {
      id:"interest-rate",
      title:"سود کی شرح پالیسی",
      short:"RBI تعمیل، شفاف سود کی شرح کی تشکیل۔",
      overview:"گنیش فائنانس بورڈ منظور شدہ سود کی شرح پالیسی کی پابندی کرتا ہے جو تمام کریڈٹ پیداوار کے لیے مقابلاتی، شفاف اور RBI تعمیل قیمت یقینی بناتی ہے۔",
      points:[
        "ایسٹ لائبلٹی مینجمنٹ کمیٹی (ALCO) کے ذریعے سود کی شرح کا تعین",
        "پیسے کی لاگت، رسک پریمیم اور مارکیٹ بینچ مارک کی بنیاد پر شرح",
        "امتیاز کے بغیر شرح — ایک ہی پیداوار، تمام گاہکوں کے لیے ایک ہی شرط",
        "سود کی شرح کی تبدیلی 30 دن پہلے اعلان",
        "گولڈ قرض کی شرح مشہور NBFC اور بینکوں کے ساتھ مقابلاتی",
        "پروسیسنگ فیس اور پیشگی معاہدہ فیس پہلے سے اعلان"
      ],
      highlight:"تمام شرحیں RBI NBFC قوانین کے مطابق رپورٹ کی جاتی ہیں اور مکمل عوامی شفافیت کے لیے ہماری ویب سائٹ پر شائع کی جاتی ہیں۔"
    },
    {
      id:"privacy",
      title:"رازداری پالیسی",
      short:"آپ کا ڈیٹا IT ایکٹ اور RBI ڈیٹا ہدایات کے تحت محفوظ۔",
      overview:"گنیش فائنانس گاہک رازداری کو بنیادی حق سمجھتا ہے۔ ہماری رازداری پالیسی یہ کنٹرول کرتی ہے کہ ہم ذاتی اور مالی معلومات کو کیسے جمع، استعمال، محفوظ اور حفاظت کرتے ہیں۔",
      points:[
        "ڈیٹا صرف مخصوص، بیان کردہ قرض کے مقصد کے لیے جمع کیا جاتا ہے",
        "گاہک ڈیٹا تیسرے فریق کو فروخت یا شیئرنگ رضامندی کے بغیر نہیں",
        "تمام ڈیجیٹل لین دین کے لیے اینڈ ٹو اینڈ انکرپشن",
        "گاہک کسی بھی وقت ڈیٹا میں ترمیم یا حذف کی درخواست کر سکتا ہے",
        "ڈیٹا ذخیرہ پالیسی RBI اور IT ایکٹ کے مطابق",
        "آزاد سائبر سیکیورٹی کمپنی کے ذریعے باقاعدہ سیکیورٹی آڈٹ"
      ],
      highlight:"ہم انفارمیشن ٹیکنالوجی ایکٹ، 2000 اور NBFC کے لیے RBI رازداری ہدایات کی مکمل تعمیل کرتے ہیں۔"
    },
    {
      id:"vigil-mechanism",
      title:"سہولت کار میکانزم",
      short:"فکر کی رپورٹنگ کے لیے محفوظ وسل بلور چینل۔",
      overview:"ہمارا سہولت کار میکانزم ملازمین، گاہکوں اور اسٹیک ہولڈرز کو غیر اخلاقی رویہ، دھوکہ یا پالیسی خلاف ورزی کے بارے میں حقیقی فکر کی رپورٹ کرنے کے لیے تعمیری، خفیہ چینل فراہم کرتا ہے۔",
      points:[
        "وقف شدہ ای میل اور ہاٹ لائن کے ذریعے گمنام رپورٹنگ دستیاب",
        "تمام شکایات آزاد کمیٹی کے ذریعے تفتیش کی جاتی ہیں",
        "وسل بلور کی شناخت سختی سے خفیہ رکھی جاتی ہے",
        "ایمانداری سے رپورٹ کرنے والوں کے خلاف کوئی انتقام، ڈیموشن یا نامناسب کارروائی نہیں",
        "حل کی وقت حد: عام کیسز کے لیے 45 کام کے دن",
        "حل نہ ہونے پر بورڈ آڈٹ کمیٹی کو ایسکلیشن"
      ],
      highlight:"سہولت کار میکانزم براہ راست ہمارے بورڈ کے آڈٹ کمیٹی کی نگرانی میں رکھا جاتا ہے، جو مینجمنٹ کے اثر سے آزادی یقینی بناتا ہے۔"
    },
    {
      id:"investor-policy",
      title:"سرمایہ کاروں کے لیے پالیسی",
      short:"منصفانہ، بروقت اور شفاف سرمایہ کار مواصلات۔",
      overview:"گنیش فائنانس باقاعدہ اعلانات، منصفانہ رویہ اور تمام लागو کارپوریٹ گورننس معیار کی تعمیل کے ذریعے طویل مدتی سرمایہ کار اعتماد بنانے کے لیے پرعزم ہے۔",
      points:[
        "تمام رجسٹرڈ سرمایہ کاروں کے ساتھ سہ ماہی مالی اپ ڈیٹ شیئر کیے جاتے ہیں",
        "سالانہ جنرل میٹنگ مالی سال کے اختتام کے 6 مہینوں کے اندر منعقد ہوتی ہے",
        "اہم پیش رفت 24 گھنٹوں کے اندر کمپنی ویب سائٹ پر اعلان",
        "سرمایہ کار شکایت کا تصفیہ 15 کام کے دنوں کے اندر",
        "SEBI اور RBI رپورٹنگ معیار کی سخت تعمیل",
        "سوالات کے لیے وقف شدہ انویسٹر ریلیشن رابطہ"
      ],
      highlight:"گنیش فائنانس تمام اسٹیک ہولڈرز کے لیے مستحکم کاروباری ترقی یقینی بناتے ہوئے سرمایہ کار حقوق کی حفاظت کرنے والا مضبوط گورننس فریم ورک برقرار رکھتا ہے۔"
    },
    {
      id:"securities-trading",
      title:"سیکیورٹیز ٹریڈنگ کے ضوابط",
      short:"اندرونی ٹریڈنگ کی روک تھام اور تعمیل کا فریم ورک۔",
      overview:"ہمارے سیکیورٹیز ٹریڈنگ ضوابط اندرونی ٹریڈنگ کی روک تھام کرتے ہیں اور متعلقہ افراد کی تمام مارکیٹ سرگرمیاں SEBI قوانین کے مطابق یقینی بناتے ہیں۔",
      points:[
        "نامزد افراد کی فہرست برقرار رکھنا اور سہ ماہی اپ ڈیٹ",
        "متعین حد سے زیادہ ٹریڈ کے لیے لازمی پیشگی اجازت",
        "مالی نتائج کے اعلان سے پہلے ٹریڈنگ ونڈو بلاک آؤٹ ٹائم",
        "خلاف ورزی کی سزا: فوری معطلی اور قانونی کارروائی",
        "تمام نامزد افراد سے سالانہ تعمیل سرٹیفکیٹ لازمی",
        "SEBI PIT قوانین پر باقاعدہ آگاہی پروگرام"
      ],
      highlight:"ہمارا تعمیل افسر تمام نامزد افراد کی ٹریڈ کی نگرانی کرتا ہے اور سہ ماہی طور پر آڈٹ کمیٹی کو رپورٹ دیتا ہے۔"
    },
    {
      id:"app-disclaimer",
      title:"ایپلیکیشن ڈس کلیمر",
      short:"موبائل ایپ کے استعمال کی شرائط، ڈیٹا اور ذمہ داری کا انکار۔",
      overview:"گنیش فائنانس موبائل ایپلیکیشن سہولت کے طور پر فراہم کی جاتی ہے۔ یہ ڈس کلیمر استعمال کی شرائط، ذمہ داری کی حدود اور صارف ذمہ داری ظاہر کرتا ہے۔",
      points:[
        "ایپ صرف معلومات اور درخواست کے مقصد کے لیے",
        "قرض کی منظوری جسمانی جانچ اور کریڈٹ تشخیص کے تابع",
        "اسکرین شاٹ یا ایپ آؤٹ پٹ قانونی دستاویز نہیں",
        "ایپ کی کارکردگی نیٹ ورک اور ڈیوائس کی حالت کے تابع",
        "غیر مجاز رسائی سے ہونے والے نقصان کے لیے گنیش فائنانس ذمہ دار نہیں",
        "اپ ڈیٹس خصوصیات تبدیل کر سکتے ہیں؛ مسلسل استعمال سے رضامندی ظاہر ہوتی ہے"
      ],
      highlight:"منظور شدہ قرض کی منظوری نامہ اور پابند معاہدے کے لیے صرف ہمارے رجسٹرڈ آفس کے ذریعے جاری کردہ دستاویزات ہی قانونی حیثیت رکھتی ہیں۔"
    },
    {
      id:"auction-policy",
      title:"نیلامی پالیسی",
      short:"شفاف، RBI تعمیل گولڈ نیلامی کا عمل۔",
      overview:"قرض ڈیفالٹ کی صورت میں، گنیش فائنانس سخت، RBI منظور شدہ نیلامی پالیسی کی پابندی کرتا ہے جو گاہک کو منصفانہ رویہ اور گروی سونے کی شفاف نیلامی یقینی بناتا ہے۔",
      points:[
        "نیلامی کا عمل شروع کرنے سے پہلے کم از کم 14 دن کا تحریری نوٹس",
        "صرف مصدقہ لائسنس یافتہ نیلام کار کے ذریعے نیلامی کا اہتمام",
        "گاہک کو نیلامی کی تاریخ، جگہ اور ریزرو قیمت بتائی جاتی ہے",
        "اضافی رقم (اگر ہو) 7 کام کے دنوں کے اندر گاہک کو واپس کی جاتی ہے",
        "نیلامی کے ریکارڈ محفوظ رکھے جاتے ہیں اور گاہک کے معائنے کے لیے دستیاب",
        "نیلامی شروع ہونے تک گاہک گروی سونا ریڈیم کر سکتا ہے"
      ],
      highlight:"ہماری نیلامی پالیسی RBI گولڈ لون ماسٹر سرکلر کی سخت تعمیل کرتی ہے اور نیلامی سے پہلے گاہک کی واجب رقم کی زیادہ سے زیادہ وصولی یقینی بناتی ہے۔"
    },
    {
      id:"loan-policy",
      title:"قرض پالیسی",
      short:"اہلیت، منظوری، تقسیم اور وصولی کے معیار۔",
      overview:"گنیش فائنانس قرض پالیسی مکمل کریڈٹ لائف سائیکل کو کنٹرول کرتی ہے — اہلیت تشخیص اور منظوری سے لے کر تقسیم، نگرانی اور وصولی تک۔",
      points:[
        "تمام قرض درخواستوں کے لیے KYC اور آمدنی کی جانچ لازمی",
        "RBI معیار کے مطابق گولڈ لون LTV تناسب زیادہ سے زیادہ 75%",
        "ملکیت سکورنگ اور بیورو ڈیٹا کا استعمال کر کے کریڈٹ تشخیص",
        "دستاویزات کی جانچ کے بعد 24 گھنٹوں کے اندر تقسیم",
        "زرعی اور موسمی قرض لینے والوں کے لیے EMI چھٹی دستیاب",
        "RBI NBFC پریوڈینشل نارمز کے مطابق NPA درجہ بندی"
      ],
      highlight:"ہماری قرض پالیسی موجودہ مارکیٹ حالات اور ریگولیٹری ضروریات کی عکاسی کرنے کے لیے رسک مینجمنٹ کمیٹی کے ذریعے ششماہی جائزہ کی جاتی ہے۔"
    },
    {
      id:"code-fair-practices",
      title:"منصفانہ رویہ کا ضابطہ",
      short:"قرض لینے والے، وصولی ایجنٹ اور ملازمین کے ساتھ اخلاقی رویہ۔",
      overview:"ہمارے بنیادی اخلاقی فریم ورک کی توسیع، یہ ضابطہ وصولی، فیلڈ سرگرمیاں اور گاہک سے سامنے کی سرگرمیوں میں منصفانہ رویہ کو حل کرتا ہے۔",
      points:[
        "کوئی زبردستی یا جارحانہ وصولی کی حکمت عملی کی اجازت نہیں",
        "وصولی کال صرف مقامی وقت کے مطابق صبح 8 سے شام 7 تک",
        "ایجنٹس کو شناخت کارڈ اور کمپنی منظور شدہ خط کے ساتھ رکھنا لازمی",
        "گاہک کے آجر سے پیشگی رضامندی کے بغیر رابطہ نہیں",
        "حقیقی مشکلات کی بنیاد پر معاہدہ شیڈول دوبارہ ترتیب دینا",
        "تمام گاہک گفتگو 3 سال تک ریکارڈ اور محفوظ"
      ],
      highlight:"ہم تمام وصولی ملازمین کو اخلاقی طریقوں اور گاہک حقوق پر سہ ماہی تربیت دیتے ہیں اور کسی بھی خلاف ورزی کے لیے کارکردگی جائزے میں سزا دیتے ہیں۔"
    },
    {
      id:"terms",
      title:"شرائط و ضوابط",
      short:"تمام گنیش فائنانس پیداوار کے لیے عام قانونی شرائط۔",
      overview:"شرائط و ضوابط گنیش فائنانس کے ذریعے فراہم کی جانے والی تمام پیداوار اور خدمات کی قانونی بنیاد بناتے ہیں، جو تمام فریقوں کے لیے وضاحت اور تحفظ یقینی بناتے ہیں۔",
      points:[
        "بھارت کے قوانین کے تحت کنٹرول؛ دائرہ اختیار: رجسٹرڈ ریاستی عدالت",
        "خدمات کی شرائط 30 دن کی پیشگی اطلاع پر اپ ڈیٹ کی جا سکتی ہیں",
        "ڈیجیٹل رضامندی کی قانونی حیثیت جسمانی دستخط کے برابر",
        "فورس مجیور میں قدرتی آفت، وباء اور ریگولیٹری کارروائیاں شامل",
        "1996 کے آربٹریشن ایکٹ کے تحت آربٹریشن کے ذریعے تنازعات کا تصفیہ",
        "تمام رقم بھارتی روپے میں؛ GST/ٹیکس گاہک کے ذمہ"
      ],
      highlight:"ہم تمام گاہکوں کو شرائط و ضوابط احتیاط سے پڑھنے کا مشورہ دیتے ہیں۔ ہماری کسٹمر کیئر ٹیم کسی بھی حصے کی عام زبان میں وضاحت کے لیے دستیاب ہے۔"
    },
    {
      id:"csr",
      title:"CSR پالیسی",
      short:"سماجی سرمایہ کاری اور سماجی ذمہ داری کا عزم۔",
      overview:"گنیش فائنانس کی CSR پالیسی ہماری خدمت کرنے والی کمیونٹی کو واپس دینے کے عزم کی عکاسی ہے۔ 2020 سے ہم نے تعلیم، مالی خواندگی اور مقامی ترقی میں وسائل استعمال کیے ہیں۔",
      points:[
        "کمپنی ایکٹ 2013 کی ہدایات کے مطابق CSR اخراجات (اگر लागو ہو)",
        "ترجیحی شعبے: مالی خواندگی، دیہی تعلیم، خواتین کو بااختیار بنانا",
        "سالانہ CSR رپورٹ کمپنی ویب سائٹ پر شائع",
        "ملازم رضاکارانہ پروگرام — ہر ملازم کے لیے سالانہ کم از کم 8 گھنٹے",
        "آخری میل کمیونٹی اثر کے لیے مقامی NGO کے ساتھ شراکت",
        "گنیش فائنانس کے زیادہ تر گاہک بنیاد والے اضلاع پر توجہ"
      ],
      highlight:"گنیش فائنانس نے 2020 میں بنیاد کے بعد 50+ مالی خواندگی ورکشاپس منعقد کی ہیں، جن تک 5,000+ دیہی خاندانوں تک رسائی ہوئی ہے۔"
    },
    {
      id:"statutory-auditors",
      title:"سٹیٹیوٹری آڈیٹرز کی تقرری پالیسی",
      short:"سٹیٹیوٹری آڈیٹرز کے لیے آزادی اور گردش کا معیار۔",
      overview:"یہ پالیسی کمپنی ایکٹ، 2013 اور NBFC کے لیے RBI ہدایات کے مطابق مناسب، آزاد سٹیٹیوٹری آڈیٹر کا انتخاب یقینی بناتی ہے۔",
      points:[
        "آڈٹ کمیٹی کی سفارش پر بورڈ کو آڈیٹر کا انتخاب",
        "ہر 5 سال بعد لازمی گردش (یا کمپنی ایکٹ کے مطابق)",
        "آزادی میں رکاوٹ ڈالنے والی ہم عصر غیر آڈٹ خدمات نہیں",
        "آڈیٹر کے پاس درست ICAI پریکٹس سرٹیفکیٹ ہونا چاہیے",
        "ہر تقرری سے پہلے مصلحت کے ٹکراؤ کی جانچ",
        "AGM میں شیئر ہولڈرز کے ذریعے آڈٹ فیس کی منظوری"
      ],
      highlight:"ہماری آڈٹ کمیٹی مینجمنٹ کے اثر کے بغیر تمام آڈیٹر امیدواروں کا آزاد جائزہ لیتی ہے، مکمل غیر جانبداری یقینی بناتی ہے۔"
    },
    {
      id:"human-rights",
      title:"انسانی حقوق پالیسی",
      short:"امتیاز، استحصال یا جبری مزدوری کے لیے صفر برداشت۔",
      overview:"گنیش فائنانس تمام کاروباری سرگرمیوں میں عالمی انسانی حقوق کے معیار برقرار رکھتا ہے اور ہر ملازم، گاہک اور اسٹیک ہولڈر کے ساتھ احترام اور عزت کے ساتھ پیش آتا ہے۔",
      points:[
        "بچوں کی مزدوری، جبری مزدوری یا انسانی سمگلنگ کے لیے صفر برداشت",
        "مساوی موقع آجر — کسی بھی قسم کا امتیاز نہیں",
        "محفوظ کام کی جگہ — POSH ایکٹ تعمیل تربیت یافتہ ICC کے ساتھ",
        "تمام کنٹریکٹ ملازمین کے لیے زندہ اجرت کا معیار लागو",
        "فروش اور پارٹنر منتخب کرنے میں انسانی حقوق کی ڈیو ڈیلیجنس",
        "سالانہ انسانی حقوق رسک تشخیص اندرونی طور پر کی جاتی ہے"
      ],
      highlight:"ہم اپنی انسانی حقوق پالیسی کو UN Guiding Principles on Business and Human Rights کے ساتھ مطابقت رکھتے ہیں اور اپنے علاقے کے NBFC کے لیے اعلیٰ معیار قائم کرتے ہیں۔"
    },
    {
      id:"responsible-advocacy",
      title:"ذمہ دارانہ وکالت پالیسی",
      short:"ریگولیٹر، انڈسٹری اداروں اور میڈیا کے ساتھ اخلاقی مواصلات۔",
      overview:"گنیش فائنانس ریگولیٹر، انڈسٹری ایسوسی ایشن اور عوامی پلیٹ فارم کے ساتھ ذمہ دارانہ طور پر مواصلات کرتا ہے — ہمیشہ ہماری وکالت شفاف، ثبوت پر مبنی اور عوامی مفاد کے ساتھ مطابقت رکھنے کو یقینی بناتا ہے۔",
      points:[
        "تمام ریگولیٹری فائلنگز تعمیل افسر کے ذریعے جائزہ",
        "غیر اعلانیہ سیاسی عطیات یا لابنگ اخراجات نہیں",
        "میڈیا مواصلات صرف نامزد ترجمان کے ذریعے",
        "انڈسٹری ایسوسی ایشن رکنیت سالانہ رپورٹ میں اعلان",
        "وکالت کی پوزیشن گاہک اور سماجی فائدے کے ساتھ مطابقت رکھتی ہے",
        "بورڈ کے ذریعے سالانہ وکالت سرگرمیوں کا جائزہ"
      ],
      highlight:"ہمارا یقین ہے کہ ذمہ دارانہ وکالت صحت مند مالی ماحول اور NBFC کے لیے زیادہ جامع ریگولیٹری ماحول میں حصہ ڈالتی ہے۔"
    },
    {
      id:"diversity",
      title:"تنوع، شمولیت اور مساوی موقع پالیسی",
      short:"سب کے لیے شمولیتی اور مساوی کام کی جگہ بنانا۔",
      overview:"گنیش فائنانس متنوع اور شمولیتی تنظیم بنانے کے لیے پرعزم ہے جہاں ہر فرد — پس منظر کچھ بھی ہو — اپنی مکمل صلاحیت کے ساتھ ترقی کر سکے اور حصہ ڈال سکے۔",
      points:[
        "سینئر مینجمنٹ عہدوں پر خواتین کے لیے تنوع ہدف",
        "ممکن ہو تو بلائنڈ اسکریننگ کے ساتھ شمولیتی بھرتی کا عمل",
        "معذور ملازمین کے لیے سہولیات",
        "سال بھر کثیر ثقافتی تہوار اور آگاہی پروگرام",
        "تمام ملازمین کے لیے سالانہ لازمی اینٹی ہراسمنٹ تربیت",
        "بورڈ کو سہ ماہی تنوع میٹرکس رپورٹ"
      ],
      highlight:"ہمارے فخر کی بات ہے کہ ہمارے گاہک سے سامنے آنے والے ملازمین میں 40%+ خواتین ہیں اور ہم قیادت کی سطح پر نمائندگی بڑھانے کے لیے فعال طور پر کام کر رہے ہیں۔"
    },
    {
      id:"stakeholders",
      title:"اسٹیک ہولڈرز سے رابطہ پالیسی",
      short:"تمام اسٹیک ہولڈر گروپس کے ساتھ تعمیری رابطہ۔",
      overview:"ہماری اسٹیک ہولڈرز سے رابطہ پالیسی گنیش فائنانس کو تمام اسٹیک ہولڈر گروپس کی شناخت، ان سے مواصلات اور ہمارے فیصلہ سازی کے عمل میں فیڈ بیک شامل کرنے کی تعریف دیتی ہے۔",
      points:[
        "سالانہ اسٹیک ہولڈر میپنگ مشق",
        "سرمایہ کار، گاہک، ریگولیٹر کے لیے وقف شدہ رابطہ کیلنڈر",
        "دو سالانہ گاہک اطمینان سروے",
        "ایکشن پلان فالو اپ کے ساتھ ملازم رابطہ سروے",
        "نئے علاقے میں داخلے سے پہلے کمیونٹی مشاورت",
        "کمپنی ویب سائٹ پر سالانہ اسٹیک ہولڈر رپورٹ شائع"
      ],
      highlight:"ہم اسٹیک ہولڈر رابطہ کو تعمیل کی سرگرمی کے طور پر نہیں بلکہ طویل مدتی تنظیمی استحکام کی حکمت عملی کے طور پر دیکھتے ہیں۔"
    },
  ],
}
};




// ── Policy icon/color metadata (Same as before) ───────────────────────────────
const META = [
  { id:"fair-practices",       icon:"checkmark", color:"red"     },
  { id:"code-of-conduct",      icon:"shield",    color:"blue"    },
  { id:"interest-rate",        icon:"percent",   color:"green"   },
  { id:"privacy",              icon:"lock",      color:"purple"  },
  { id:"vigil-mechanism",      icon:"bell",      color:"orange"  },
  { id:"investor-policy",      icon:"trending",  color:"teal"    },
  { id:"securities-trading",   icon:"filetext",  color:"slate"   },
  { id:"app-disclaimer",       icon:"phone",     color:"indigo"  },
  { id:"auction-policy",       icon:"gavel",     color:"amber"   },
  { id:"loan-policy",          icon:"clipboard", color:"rose"    },
  { id:"code-fair-practices",  icon:"handshake", color:"cyan"    },
  { id:"terms",                icon:"filetext",  color:"gray"    },
  { id:"csr",                  icon:"leaf",      color:"emerald" },
  { id:"statutory-auditors",   icon:"building",  color:"stone"   },
  { id:"human-rights",         icon:"users",     color:"violet"  },
  { id:"responsible-advocacy", icon:"megaphone", color:"pink"    },
  { id:"diversity",            icon:"globe",     color:"sky"     },
  { id:"stakeholders",         icon:"network",   color:"lime"    },
];

// ── SVG Icons (Same as before) ────────────────────────────────────────────────
const I = {
  shield:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  percent:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
  lock:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  bell:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
  users:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  trending:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  phone:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  gavel:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M14 14l6.5 6.5a1 1 0 001.5-1.5L15.5 13"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  filetext:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  clipboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
  checkmark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>,
  handshake: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>,
  globe:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  leaf:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 8C8 10 5.9 16.17 3.82 19.34c-.85 1.27.23 2.88 1.61 2.43C7.17 21 9.5 20 12 20c5 0 9-4 9-9 0-3-2-5-4-5z"/></svg>,
  megaphone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  network:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/></svg>,
  building:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h1v1H9zM14 9h1v1h-1zM9 14h1v1H9zM14 14h1v1h-1z" strokeWidth={2.5}/></svg>,
  arrow:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  x:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  star:      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  tick:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>,
};

// ── Color map (Same as before) ────────────────────────────────────────────────
const C = {
  red:     {bg:"bg-red-50",     icon:"bg-red-100 text-red-600",       border:"border-red-200",    hover:"hover:border-red-400 hover:bg-red-50",    badge:"bg-red-600",    title:"text-red-700"    },
  blue:    {bg:"bg-blue-50",    icon:"bg-blue-100 text-blue-600",      border:"border-blue-200",   hover:"hover:border-blue-400 hover:bg-blue-50",   badge:"bg-blue-600",   title:"text-blue-700"   },
  green:   {bg:"bg-green-50",   icon:"bg-green-100 text-green-600",    border:"border-green-200",  hover:"hover:border-green-400 hover:bg-green-50", badge:"bg-green-600",  title:"text-green-700"  },
  purple:  {bg:"bg-purple-50",  icon:"bg-purple-100 text-purple-600",  border:"border-purple-200", hover:"hover:border-purple-400 hover:bg-purple-50",badge:"bg-purple-600", title:"text-purple-700" },
  orange:  {bg:"bg-orange-50",  icon:"bg-orange-100 text-orange-600",  border:"border-orange-200", hover:"hover:border-orange-400 hover:bg-orange-50",badge:"bg-orange-600", title:"text-orange-700" },
  teal:    {bg:"bg-teal-50",    icon:"bg-teal-100 text-teal-600",      border:"border-teal-200",   hover:"hover:border-teal-400 hover:bg-teal-50",   badge:"bg-teal-600",   title:"text-teal-700"   },
  slate:   {bg:"bg-slate-50",   icon:"bg-slate-100 text-slate-600",    border:"border-slate-200",  hover:"hover:border-slate-400 hover:bg-slate-50", badge:"bg-slate-600",  title:"text-slate-700"  },
  indigo:  {bg:"bg-indigo-50",  icon:"bg-indigo-100 text-indigo-600",  border:"border-indigo-200", hover:"hover:border-indigo-400 hover:bg-indigo-50",badge:"bg-indigo-600", title:"text-indigo-700" },
  amber:   {bg:"bg-amber-50",   icon:"bg-amber-100 text-amber-600",    border:"border-amber-200",  hover:"hover:border-amber-400 hover:bg-amber-50", badge:"bg-amber-600",  title:"text-amber-700"  },
  rose:    {bg:"bg-rose-50",    icon:"bg-rose-100 text-rose-600",      border:"border-rose-200",   hover:"hover:border-rose-400 hover:bg-rose-50",   badge:"bg-rose-600",   title:"text-rose-700"   },
  cyan:    {bg:"bg-cyan-50",    icon:"bg-cyan-100 text-cyan-600",      border:"border-cyan-200",   hover:"hover:border-cyan-400 hover:bg-cyan-50",   badge:"bg-cyan-600",   title:"text-cyan-700"   },
  gray:    {bg:"bg-gray-50",    icon:"bg-gray-100 text-gray-600",      border:"border-gray-200",   hover:"hover:border-gray-400 hover:bg-gray-50",   badge:"bg-gray-600",   title:"text-gray-700"   },
  emerald: {bg:"bg-emerald-50", icon:"bg-emerald-100 text-emerald-600",border:"border-emerald-200",hover:"hover:border-emerald-400 hover:bg-emerald-50",badge:"bg-emerald-600",title:"text-emerald-700"},
  stone:   {bg:"bg-stone-50",   icon:"bg-stone-100 text-stone-600",    border:"border-stone-200",  hover:"hover:border-stone-400 hover:bg-stone-50", badge:"bg-stone-600",  title:"text-stone-700"  },
  violet:  {bg:"bg-violet-50",  icon:"bg-violet-100 text-violet-600",  border:"border-violet-200", hover:"hover:border-violet-400 hover:bg-violet-50",badge:"bg-violet-600", title:"text-violet-700" },
  pink:    {bg:"bg-pink-50",    icon:"bg-pink-100 text-pink-600",      border:"border-pink-200",   hover:"hover:border-pink-400 hover:bg-pink-50",   badge:"bg-pink-600",   title:"text-pink-700"   },
  sky:     {bg:"bg-sky-50",     icon:"bg-sky-100 text-sky-600",        border:"border-sky-200",    hover:"hover:border-sky-400 hover:bg-sky-50",     badge:"bg-sky-600",    title:"text-sky-700"    },
  lime:    {bg:"bg-lime-50",    icon:"bg-lime-100 text-lime-600",      border:"border-lime-200",   hover:"hover:border-lime-400 hover:bg-lime-50",   badge:"bg-lime-600",   title:"text-lime-700"   },
};

// ── useInView hook (Same as before) ───────────────────────────────────────────
function useInView(th = 0.06) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: th });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [th]);
  return [ref, vis];
}

// ── PolicyCard (Same as before) ───────────────────────────────────────────────
function PolicyCard({ policy, meta, index, onOpen, strings }) {
  const [ref, vis] = useInView(0.05);
  const col = index % 3;
  const delay = col * 100 + Math.floor(index / 3) * 40;
  const c = C[meta.color] || C.red;

  return (
    <div
      ref={ref}
      onClick={() => onOpen({ policy, meta })}
      role="button" tabIndex={0} aria-label={`View ${policy.title}`}
      onKeyDown={(e) => e.key === "Enter" && onOpen({ policy, meta })}
      className={`group relative cursor-pointer rounded-2xl border ${c.border} bg-white p-5 transition-all duration-300 ${c.hover} hover:shadow-xl hover:-translate-y-1.5 active:scale-[0.98] select-none`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(36px) scale(0.96)",
        transition: `opacity 0.55s cubic-bezier(.25,.8,.25,1) ${delay}ms, transform 0.55s cubic-bezier(.25,.8,.25,1) ${delay}ms, box-shadow 0.2s, border-color 0.2s`,
      }}
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${c.icon} mb-3 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3`}>
        {I[meta.icon] || I.filetext}
      </div>
      <h3 className={`font-bold text-[13.5px] leading-snug ${c.title} mb-1.5`}>{policy.title}</h3>
      <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">{policy.short}</p>
      <div className={`flex items-center gap-1.5 mt-3 text-[11px] font-bold ${c.title} opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1`}>
        <span>{strings.view_details}</span>{I.arrow}
      </div>
    </div>
  );
}

// ── PolicyModal (Same as before) ──────────────────────────────────────────────
function PolicyModal({ policy, meta, onClose, strings }) {
  const [vis, setVis] = useState(false);
  const c = C[meta.color] || C.red;

  useEffect(() => { const t = setTimeout(() => setVis(true), 10); document.body.style.overflow = "hidden"; return () => { clearTimeout(t); document.body.style.overflow = ""; }; }, []);
  useEffect(() => { const h = (e) => { if (e.key === "Escape") close(); }; document.addEventListener("keydown", h); return () => document.removeEventListener("keydown", h); }, []);

  const close = () => { setVis(false); setTimeout(onClose, 280); };

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-[3px] transition-opacity duration-280 ${vis?"opacity-100":"opacity-0"}`} onClick={close}/>
      <div className={`relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto transition-all duration-280 ${vis?"opacity-100 translate-y-0 sm:scale-100":"opacity-0 translate-y-8 sm:scale-95"}`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 ${c.bg} border-b ${c.border} px-6 pt-6 pb-4 rounded-t-3xl`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${c.icon} flex items-center justify-center`}>{I[meta.icon]||I.filetext}</div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">{strings.modal_company}</p>
                <h2 className={`text-lg sm:text-xl font-black ${c.title} leading-tight`}>{policy.title}</h2>
              </div>
            </div>
            <button onClick={close} className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-white/80 hover:bg-white border border-gray-200 text-gray-500 hover:text-gray-800 transition-all">{I.x}</button>
          </div>
        </div>
        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          <div>
            <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">{strings.modal_overview}</h3>
            <p className="text-gray-700 text-[14.5px] leading-relaxed">{policy.overview}</p>
          </div>
          <div>
            <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">{strings.modal_key}</h3>
            <ul className="space-y-2.5">
              {policy.points.map((pt,i)=>(
                <li key={i} className="flex items-start gap-3 text-[13.5px] text-gray-700 leading-relaxed"
                  style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(14px)", transition:`opacity 0.4s ease ${120+i*60}ms, transform 0.4s ease ${120+i*60}ms` }}>
                  <span className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full ${c.icon} flex items-center justify-center`}>{I.tick}</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className={`rounded-2xl ${c.bg} border ${c.border} p-4`}>
            <div className="flex items-start gap-3">
              <span className={`flex-shrink-0 mt-0.5 ${c.title}`}>{I.star}</span>
              <p className={`text-[13px] font-semibold ${c.title} leading-relaxed`}>{policy.highlight}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a href="/contact" className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold ${c.badge} hover:opacity-90 active:scale-[0.98] transition-all shadow-md`}>
              {strings.modal_cta}{I.arrow}
            </a>
            <button onClick={close} className="flex items-center justify-center px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all">
              {strings.modal_close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FairPracticeBanner (Same as before) ───────────────────────────────────────
function FairPracticeBanner({ s }) {
  const [ref, vis] = useInView(0.07);
  const fps = [
    { icon:"checkmark", color:"red",   title:s.fp1_title, body:s.fp1_body },
    { icon:"users",     color:"blue",  title:s.fp2_title, body:s.fp2_body },
    { icon:"shield",    color:"green", title:s.fp3_title, body:s.fp3_body },
    { icon:"trending",  color:"amber", title:s.fp4_title, body:s.fp4_body },
  ];
  return (
    <div ref={ref} className="mt-20" style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)", transition:"opacity 0.7s ease, transform 0.7s ease" }}>
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-[11px] font-bold tracking-[0.22em] text-red-500 uppercase mb-2">{s.commitment_tag}</p>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
          {s.commitment_title_1}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{s.commitment_title_hl}</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-red-100 -z-0 rounded"/>
          </span>
        </h2>
        <p className="mt-3 text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">{s.commitment_sub}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left gradient card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-yellow-600 p-8 text-white shadow-2xl min-h-[300px] flex flex-col justify-between"
          style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(-36px)", transition:"opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none"/>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none"/>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">{I.shield}</div>
              <div><p className="font-black text-lg leading-none">Ganesh Finance</p><p className="text-white/70 text-xs mt-0.5">Fair Practices Code</p></div>
            </div>
            <h3 className="text-2xl font-black leading-snug mb-3">{s.card_tagline}</h3>
            <p className="text-white/80 text-[13.5px] leading-relaxed">{s.card_body}</p>
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-3 mt-6">
            {[["₹1.5Cr+", s.stat_assets],["1000+", s.stat_customers],["2020", s.stat_founded]].map(([v,l])=>(
              <div key={l} className="text-center bg-white/15 rounded-xl py-3 px-2">
                <p className="font-black text-lg leading-none">{v}</p>
                <p className="text-white/65 text-[10px] mt-1 leading-tight">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right detail rows */}
        <div className="space-y-5">
          {fps.map((fp,i)=>{
            const cc = C[fp.color]||C.red;
            return (
              <div key={i} className="flex gap-4 items-start"
                style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(32px)", transition:`opacity 0.6s ease ${200+i*110}ms, transform 0.6s ease ${200+i*110}ms` }}>
                <div className={`flex-shrink-0 w-9 h-9 rounded-xl ${cc.icon} flex items-center justify-center mt-0.5`}>{I[fp.icon]}</div>
                <div>
                  <h4 className={`font-bold text-[13.5px] ${cc.title} mb-1`}>{fp.title}</h4>
                  <p className="text-gray-600 text-[13px] leading-relaxed">{fp.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function PolicySection() {
  const { lang } = useLanguage();
  const s = PT[lang] || PT.en;
  const [selected, setSelected] = useState(null);
  const [hRef, hVis] = useInView(0.1);

  const merged = s.policies.map(p => ({
    policy: p,
    meta: META.find(m => m.id === p.id) || { icon:"filetext", color:"gray" },
  }));

  return (
    <section id="policy" aria-label="Ganesh Finance Policies" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div ref={hRef} className="mb-12"
          style={{ opacity:hVis?1:0, transform:hVis?"translateY(0)":"translateY(28px)", transition:"opacity 0.6s ease, transform 0.6s ease" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-red-500 rounded-full"/>
            <p className="text-[11px] font-bold tracking-[0.22em] text-red-500 uppercase">{s.section_tag}</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900">{s.section_title}</h1>
          <p className="mt-3 text-gray-500 text-[15px] max-w-2xl leading-relaxed">{s.section_desc}</p>
        </div>

        {/* Policy cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {merged.map(({ policy, meta }, i) => (
            <PolicyCard key={`${policy.id}-${lang}`} policy={policy} meta={meta} index={i} onOpen={setSelected} strings={s}/>
          ))}
        </div>

        {/* Fair practice banner */}
        <FairPracticeBanner s={s}/>
      </div>

      {/* Modal */}
      {selected && <PolicyModal policy={selected.policy} meta={selected.meta} onClose={() => setSelected(null)} strings={s}/>}

      <style>{`.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`}</style>
    </section>
  );
}