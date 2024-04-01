import React, { useEffect } from "react";
import style from "../../../assets/style/homePage/tryApp.module.css";
import { useTranslation } from "react-i18next";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactHtmlParser from "html-react-parser";
import { homeState } from '../../../redux/Home/home';
import { useSelector } from 'react-redux';
import { FaGooglePlay } from "react-icons/fa";
import { IoLogoApple } from "react-icons/io";
import ConeAdsens from "../../Adsens/ConeAdsens";

function TryApp() {
  const stateHome = useSelector(homeState);
  const homeStateTry = stateHome?.homeData?.try_app;
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


   <>
    <div style={{ backgroundImage: `url(${homeStateTry?.image})` }} className={style.tryAppMainContainer}>
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
              <h3 className={i18n.language === "ar" ? style.titleArTry : ""}>{homeStateTry?.title}</h3>
            </div>
            <div className={style.tryAppBtnDiv}>
              <p className={style.tryAppParagraph}>{homeStateTry?.web_description && ReactHtmlParser(homeStateTry?.web_description)}</p>
              <div className={style.BtnDiv}>
                <a
                  href={homeStateTry?.android?.link}
                  target="_blank"
                  // className={
                  //   i18n.language === "en"
                  //     ? style.googlePlayBtn
                  //     : style.googlePlayBtnAr
                  // }
                  rel="noreferrer"
                >
                  <div className={style.googlePlayContainer}>
                    <div className={style.googlePlayDiv}>
                      {/* <p>Available on the</p> */}
                      <FaGooglePlay className={style.appIcon}/>

                      <p className={i18n.language === "ar" ? style.googleTryAr : ""}> Available on the Google Play</p>
                    </div>
                  </div>
                </a>
                <a
                  className={style.appleContainer}
                  href={homeStateTry?.ios?.link}
                  target="_blank"
                  rel="noreferrer"
                >

                  <div className={style.playStoreContainer}>
                    <div className={style.playStoreDiv}>
                      {/* <p>Download on the</p> */}
                      <IoLogoApple className={style.appIcon}/>

                      <p className={i18n.language === "ar" ? style.playStoreAr : ""}> Available on the App Store</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <ConeAdsens/>
     </>

  );
}

export default TryApp;
