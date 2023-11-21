import React from "react";
import style from "../../assets/style/about/about.module.scss";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "html-react-parser";
import Title from "../common/Title";

function AboutParagraph({ aboutData }) {
  const [t, i18n] = useTranslation();

  return (
    <div className={`${style.aboutParagraph} col-lg-8`}>
      <div className={`row`}>
        <div className={`container`}>
          {aboutData?.about?.slice(0,5).map((item, index) => (
            <div
              className={`${style.aboutImageParagraphsContainer}`}
              key={index}
            >
              <div
                className={
                  style.aboutImageParagraphs
                
                }
              >
                <div className={style.aboutParagraphText}>
                  <Title data={item?.title} />
                  <div className={index % 2 === 1 ? style.paragraphWidth : style.paragraphWidthEven}>
                  <p className={i18n.languages === "en" ? style.par: style.paragraphAr}>
                    {item?.web_description &&
                      ReactHtmlParser(`${item?.web_description}`)}
                  </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`col-md-8 ${style.aboutDivImage}`}>
          <div className={`${i18n.language === "en" ?  style.aboutImage : style.aboutImageAr }`}>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutParagraph;
