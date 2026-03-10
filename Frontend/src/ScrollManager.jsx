import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const positions = {};

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const key = location.pathname;

    if (positions[key]) {
      window.scrollTo({
        top: positions[key],
        behavior: "auto",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    return () => {
      positions[key] = window.scrollY;
    };
  }, [location]);

  return null;
};

export default ScrollManager;