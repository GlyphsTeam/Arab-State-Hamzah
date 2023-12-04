import style from "../../assets/style/about/about.module.scss";
import { useTranslation } from "react-i18next";

function SocialMedia({ aboutData }) {
  const [t] = useTranslation();

  return (
    <div className={style.socialMediaDiv}>
      <h3><span>{t("Follow us")}</span> </h3>
      <div className={style.socialMediaSubDiv}>
        {aboutData?.social_media?.facebook_url && (
        <div className={style.socialMediaIcon}>
          <a href={aboutData?.social_media?.facebook_url} target="blank">
            <i className="fab fa-facebook-square"></i>
          </a>
        </div>
        )}

      {aboutData?.social_media?.instagram_url && (
        <div className={style.socialMediaIcon}>
          <a href={aboutData?.social_media?.instagram_url} target="blank">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        )}

      {aboutData?.social_media?.twitter_url && (
        <div className={style.socialMediaIcon}>
          <a href={aboutData?.social_media?.twitter_url} target="blank">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      )}

      {aboutData?.social_media?.youtube_url && (

        <div className={style.socialMediaIcon}>
          <a href={aboutData?.social_media?.youtube_url} target="blank">
          <i className="fab fa-youtube"></i>
          </a>
        </div>
        )} 
      </div>
    </div>
  );
}

export default SocialMedia;
