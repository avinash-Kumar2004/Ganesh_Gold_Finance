import { useLanguage } from "../Common/Navbaar";
import Slider from "../Common/Slider";
import InvestCard from "../Investor/Investcard";
import FAQ from "../Common/FAQ";
import Footer from "../Common/Footer";
import TrustStrip from "../Investor/Truststrip";
const Investors = () => {
  const { t } = useLanguage();
  return (
   <>
   <Slider/>
   <InvestCard/>
   <TrustStrip/>
   <FAQ/>
   <Footer/>
   </>
  );
};

export default Investors;