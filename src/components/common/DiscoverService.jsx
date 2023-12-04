import style from "../../assets/style/common/discoverService.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "html-react-parser";
import Title from "./Title";

const DiscoverService = ({ data }) => {

  const [t, i18n] = useTranslation();


  return (
    <div className={style.discoverServiceContainer}>
      <div
        className={style.discoverServiceImageContainer}
      ></div>
      <div className={style.discoverServiceText}>
      <Title data={data?.title} />
        <p>{data?.web_description && ReactHtmlParser(data?.web_description)}</p>

        <Link to={"https://allarabusa.com/en/User-Guide"}>
          <div className={i18n.language === "en" ? style.discoverServiceButton: style.discoverServiceButtonAr }>{t("Start Your Journey")}</div>
        </Link>      
                
  
      </div>
    </div>
  );
};

export default DiscoverService;
