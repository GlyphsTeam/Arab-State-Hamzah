import React, { useState, useEffect } from "react";
import style from "../../assets/style/job_rent/heroNav.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "html-react-parser";
import { LazyLoadImage} from 'react-lazy-load-image-component'
function HeroNav({ index, setIndex  , subData , mainData}) {
  const [t, i18n] = useTranslation();
  const [activeIndex, setActiveIndex] = useState(index);
  useEffect(() => {
    setActiveIndex(index);
  }, [index]);

 
 let mainSection = mainData?.main

  return (
    <>
      <div className={`container ${style.navContainer}`}>
        <div className={`row`}>
          <Link  state={({ type: '' })} to={mainSection?.url} className={`col-lg-8 col-md-7 col-sm-6  p-0 ${style.imageTxtContainer} ${style.largeSideImage}`}>
            <LazyLoadImage
              src={mainSection?.image}
              alt="imageMainSection"
              className={`w-100 ${style.firstImage}`}
            />
            <div className={i18n.language === "en"? style.txtDivLeft:  style.txtDivArabic}>
              <h2 className={style.titleH2}>{mainSection?.title}</h2>
              <p className={style.parH2}>
              {mainSection?.short && ReactHtmlParser(`${mainSection?.short}`)}
              </p>
            </div>
          </Link>

          <div className={`col-lg-4 col-md-5 col-sm-6  ${i18n.language === "en"? style.sideImages : style.sideImagesArabic }`}>
            {
             subData?.map((item, index) => (
            <Link  state={({ type: item?.looking })} to={item?.url} className={i18n.language==="en"?style.imageTxtContainer:style.imageTxtContainerAr} key={index}>
              <LazyLoadImage
                src={item?.image}
                alt="imageMainSection"
                className={`w-100 ${index % 2 === 0? style.sideImageTop:  style.sideImageTopPadding}`}
              />
              <div className={ style.txtDiv}>
                <h2 className={style.titleH2}>{item?.title}</h2>
                <p className={style.parH2}>
                {item?.short && ReactHtmlParser(`${item?.short}`)}

                </p>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default HeroNav;
