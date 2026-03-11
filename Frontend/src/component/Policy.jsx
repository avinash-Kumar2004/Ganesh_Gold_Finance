import { useLanguage } from "../Common/Navbaar";
import Slider from "../Common/Slider";
import PolicySection from "../Policy/PolicySection";
const Policy = () => {
  const { t } = useLanguage();
  return (
   <>
   <Slider/>
   <PolicySection/>
   </>
  );
};

export default Policy;