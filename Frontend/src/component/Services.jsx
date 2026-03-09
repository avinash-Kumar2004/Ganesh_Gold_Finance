import { useLanguage } from "../Common/Navbaar";
import Slider from "../Common/Slider";
import Calculate from "../pages/Calculate";
import GoldLoanSchemes from "../pages/Card";
import GoldServices from "../Services/GoldServices";
import GoldLoanTable from "../Services/Goldloantable";
import GoldLoanInfo from "../Services/Info";
import OurBlogs from "../Common/Ourblogs";
import FAQ from "../Common/FAQ";
import Footer from "../Common/Footer";
const Services = () => {
  const { t } = useLanguage();
  return (
   <>
   <Slider/>
   <GoldServices/>
   <Calculate/>
   <GoldLoanSchemes/>
   <GoldLoanTable/>
   <GoldLoanInfo/>
<OurBlogs/>
<FAQ/>
<Footer/>
   </>
  );
};

export default Services;