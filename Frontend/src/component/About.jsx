import { useLanguage } from "../Common/Navbaar";
import Slider from "../Common/Slider";
import ChairmanMessage from "../About/ChairmanPage";
import Achievements from "../About/Achievements";
import FAQ from "../Common/FAQ";
import Footer from "../Common/Footer";
import OurBlogs from "../Common/Ourblogs";
const About = () => {
  const { t } = useLanguage();
  return (
   <>
   <Slider/>
   <ChairmanMessage/>
   <Achievements/>
<OurBlogs/>
<FAQ/>
<Footer/>
   </>
  );
};

export default About;