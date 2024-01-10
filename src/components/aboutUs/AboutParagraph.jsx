import style from "../../assets/style/about/about.module.css";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "html-react-parser";
import Title from "../common/Title";
import { aboutState } from '../../redux/About/about';
import { useSelector } from 'react-redux';
function AboutParagraph() {
    const [t, i18n] = useTranslation();
    const aboutDataRedux = useSelector(aboutState);

    return (
      <div className={`${style.aboutParagraph} col-lg-8`}>
        <div className={`row`}>
          <div className={`container`}>
            {aboutDataRedux?.aboutData?.about?.slice(0, 5).map((item, index) => (
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
                      <p className={i18n.languages === "en" ? style.par : style.paragraphAr}>
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
            <div className={`${i18n.language === "en" ? style.aboutImage : style.aboutImageAr}`}>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default AboutParagraph;
