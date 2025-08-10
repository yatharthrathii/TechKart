import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = ({ smooth = true, scrollContainerId = null }) => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "PUSH") return;

    const scrollTarget = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : window;

    if (scrollTarget) {
      if (scrollTarget === window) {
        scrollTarget.scrollTo({
          top: 0,
          left: 0,
          behavior: smooth ? "smooth" : "auto",
        });
      } else {
        scrollTarget.scrollTo({
          top: 0,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    }
  }, [pathname, navigationType, smooth, scrollContainerId]);

  return null;
};

export default ScrollToTop;
