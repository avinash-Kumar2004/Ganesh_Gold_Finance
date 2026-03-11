import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./Common/Navbaar";
import Navbar from "./Common/Navbaar";
import ServiceDetail from "./pages/Servicedetail"; 
import ScrollToTop from "./ScrollToTop"; // ✅ pehle se hai
import InvestmentPlanDetail from "./Investor/Investmentplandetail";

// import ScrollManager from "./ScrollManager";

import Home               from "./component/Home";
import About              from "./component/About";
import Services           from "./component/Services";
import Investors          from "./component/Investors";
import Policy             from "./component/Policy";
import Careers            from "./component/Careers";
import DigitalInitiatives from "./component/DigitalInitiatives";
import Contact            from "./component/Contact";

const App = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
      <ScrollToTop /> 
      {/* <ScrollManager/> */}
        <Navbar />
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/about"               element={<About />} />
          <Route path="/services"            element={<Services />} />
          <Route path="/investors"           element={<Investors />} />
          <Route path="/policy"              element={<Policy />} />
          <Route path="/careers"             element={<Careers />} />
          <Route path="/digital-initiatives" element={<DigitalInitiatives />} />
          <Route path="/contact"             element={<Contact />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />  {/* ✅ YE ADD KARO */}
          <Route path="/investors/:planId" element={<InvestmentPlanDetail />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;