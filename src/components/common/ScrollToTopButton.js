import React, { useState, useEffect } from "react";
import style from "../../assets/style/common/scrollToTop.module.css";
import { MdKeyboardArrowUp } from "react-icons/md";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div
          className={`${style.scrollToTopDiv} ${isVisible ? style.visible : ""
            }`}
          onClick={scrollToTop}
        >
          <div className={style.arrowDiv}>
            <MdKeyboardArrowUp />
          </div>
        </div>
      )}
    </>
  );
}

export default ScrollToTopButton;
