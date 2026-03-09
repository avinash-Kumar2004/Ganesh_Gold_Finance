import { useLanguage } from "../Common/Navbaar";
import Slider from "../Common/Slider";
import Services from "../pages/Services";
import WhyChooseUs from "../pages/Whychooseus";
import GoldLoanSchemes from "../pages/Card";
import Calculate from "../pages/Calculate";
const Home = () => {
  const { t } = useLanguage();

  return (
    <>
      <Slider />
      <Services />
      <WhyChooseUs/>
      <GoldLoanSchemes/>
      <Calculate/>
    </>
  );
};

export default Home;