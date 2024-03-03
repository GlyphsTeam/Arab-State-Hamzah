import style from "../../assets/style/common/discoverService.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "html-react-parser";
import Title from "./Title";
import { aboutState } from '../../redux/About/about';
import { useSelector } from 'react-redux';

const DiscoverService = () => {
   const aboutRedux = useSelector(aboutState);
   const aboutData = aboutRedux?.aboutData?.our_services
  const [t, i18n] = useTranslation();


  return (
    <div className={style.discoverServiceContainer}>
      <div
        className={style.discoverServiceImageContainer}
      ></div>
      <div className={style.discoverServiceText}>
        <Title data={aboutData?.title} />
        <p>{aboutData?.web_description && ReactHtmlParser(aboutData?.web_description)}</p>

        <Link to="/User-Guide">
          <div className={i18n.language === "en" ? style.discoverServiceButton : style.discoverServiceButtonAr}>{t("Start Your Journey")}</div>
        </Link>


      </div>
    </div>
  );
};

export default DiscoverService;
