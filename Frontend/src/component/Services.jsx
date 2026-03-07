import { useLanguage } from "../Common/Navbaar";

const Services = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-red-700">{t("services")}</h1>
    </div>
  );
};

export default Services;