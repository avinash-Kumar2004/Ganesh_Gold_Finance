import { useLanguage } from "../Common/Navbaar";
import Slider from "../Common/Slider";
import Services from "../pages/Services";
import WhyChooseUs from "../pages/Whychooseus";

const Home = () => {
  const { t } = useLanguage();

  return (
    <>
      <Slider />
      <Services />
      <WhyChooseUs/>
    </>
  );
};

export default Home;