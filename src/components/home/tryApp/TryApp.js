import React, {  useEffect } from "react";
// import style from "../../assets/style/HomePage/tryApp.module.scss";
import style from "../../../assets/style/homePage/tryApp.module.css";
import { useTranslation } from "react-i18next";
import {  useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactHtmlParser from "html-react-parser";

function TryApp({ data }) {
  const { t, i18n } = useTranslation();
  

  const control = useAnimation();
const [ref, inView] = useInView();

useEffect(() => {
  if (inView) {
    control.start("visible");
  } else {
  
          control.start("hidden");
      
  }
}, [control, inView]);

  return (


      <div style={{backgroundImage: `url(${data?.image})`}} className={style.tryAppMainContainer}>
      <div
        className={
          i18n.language === "en"
            ? style.tryAppContainer
            : style.tryAppContainerAr
        }
      >
        <div
          className={
            i18n.language === "en" ? style.tryAppSubDiv : style.tryAppSubDivAr
          }
        >
          <div className={style.tryAppInfo}>
            <div className={style.tryAppInfoTitle}>
              <h3 className={i18n.language==="ar"?style.titleArTry:""}>{data?.title}</h3>
            </div>
            <div className={style.tryAppBtnDiv}>
              <p className={style.tryAppParagraph}>{data?.web_description && ReactHtmlParser(data?.web_description)}</p>
              <div className={style.BtnDiv}>
              <a
                href={data?.android?.link}
                target="_blank"
                // className={
                //   i18n.language === "en"
                //     ? style.googlePlayBtn
                //     : style.googlePlayBtnAr
                // }
              >
                <div className={style.googlePlayContainer}>
                  <i className="fab fa-google-play"></i>
                  <div className={style.googlePlayDiv}>
                    {/* <p>Available on the</p> */}
                    <p className={i18n.language==="ar"?style.googleTryAr:""}> Available on the Google Play</p>
                  </div>
                </div>
              </a>
              <a
                className={style.appleContainer}
                href={data?.ios?.link}
                target="_blank"
              >

                <div className={style.playStoreContainer}>
                <i className="fab fa-apple"></i>
                  <div className={style.playStoreDiv}>
                    {/* <p>Download on the</p> */}
                    <p className={i18n.language==="ar"?style.playStoreAr:""}> Available on the App Store</p>
                  </div>
                </div>
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default TryApp;
