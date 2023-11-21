import React from "react";
import style from "../../assets/style/marketProfile.module.css";
import { useTranslation } from "react-i18next";

function SocialMedia({ data }) {
  const [t, i18n] = useTranslation();

  return (
    <>
      {(data?.facebook_link || data?.twitter_link || data?.instagram_link) && (
        <div className={`${style.socialMediaSection} mt-5 pt-4`}>
          <>
            <h2>{t("Follow shop")} </h2>
            <div className={`${style.socialMediaIcon} col-2 mt-3`}>
              {data?.twitter_link && (
                <a target="blank" href={data?.twitter_link}>
                  <i className="fab fa-twitter"></i>
                </a>
              )}

              {data?.facebook_link && (
                <a target="blank" href={data?.facebook_link}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}

              {data?.instagram_link && (
                <a target="blank" href={data?.instagram_link}>
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {data?.youtube_link && (
                <a target="blank" href={data?.youtube_link}>
                  <i className="fab fa-youtube"></i>
                </a>
              )}

              {data?.tiktok_link && (
                <a target="blank" href={data?.tiktok_link}>
                  <i className="fab fa-tiktok"></i>
                </a>
              )}

              {data?.pinterest_link && (
                <a target="blank" href={data?.pinterest_link}>
                  <i className="fab fa-pinterest"></i>
                </a>
              )}
            </div>
          </>
        </div>
      )}
    </>
  );
}
export default SocialMedia;
