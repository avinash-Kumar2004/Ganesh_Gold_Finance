import { useLanguage } from "../Common/Navbaar";
import Slider from "../Common/Slider";
import Services from "../pages/Services";
import WhyChooseUs from "../pages/Whychooseus";
import GoldLoanSchemes from "../pages/Card";
import Calculate from "../pages/Calculate";
import OurBlogs from "../Common/Ourblogs";
import FAQ from "../Common/FAQ";
import Footer from "../Common/Footer";
const Home = () => {
  const { t } = useLanguage();

  return (
    <>
      <Slider />
      <Services />
      <WhyChooseUs/>
      <GoldLoanSchemes/>
      <Calculate/>
      <OurBlogs/>
      <FAQ/>
      <Footer/>
    </>
  );
};

export default Home;