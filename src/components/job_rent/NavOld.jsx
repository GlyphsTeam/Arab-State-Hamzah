import React, { useState, useEffect } from "react";
import style from "../../assets/style/job_rent/jobNav.module.scss";
import ScrollContainer from "react-indiana-drag-scroll";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function RentNav({ index, setIndex }) {
  const [t] = useTranslation();
  const [activeIndex, setActiveIndex] = useState(index);
  useEffect(() => {
    setActiveIndex(index)
  }, [index])
  const handleClick = (index) => {
    setIndex(index);
    setActiveIndex(index);
  };
  return (
    <>
      <div className={style.width_slider}>
        <ScrollContainer className="scroll-container">
          <ul className={`${style.slider_ul}`}>
            <li
              className={`${
                activeIndex === "Job" ? `${style.active}` : `${style.listStyle}`
              }`}
              onClick={() => handleClick("Job")}
            >
              <Link to="/Jobs/Job" className={style.navLink}>
                <div className={style.nav_body}>
                  <p className={style.subTitle}>{t("Jobs")}</p>
                </div>
              </Link>
            </li>
            <li
              className={`${
                activeIndex === "Rent"
                  ? `${style.active}`
                  : `${style.listStyle}`
              }`}
              onClick={() => handleClick("Rent")}
            >
              <Link to="/Jobs/Rent" className={style.navLink}>
                <div className={style.nav_body}>
                  <p className={style.subTitle}>{t("Rent")}</p>
                </div>
              </Link>
            </li>
          </ul>
        </ScrollContainer>
      </div>
    </>
  );
}
export default RentNav;
