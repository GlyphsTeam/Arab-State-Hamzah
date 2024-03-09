import style from "../../assets/style/marketProfile.module.css";
import { useTranslation } from "react-i18next";
import { IoLogoYoutube } from "react-icons/io";
import { CgInstagram } from "react-icons/cg";
import { FaFacebook, FaTiktok, FaTwitter, FaPinterest } from "react-icons/fa";


function SocialMedia({ data }) {
  const [t] = useTranslation();

  return (
    <>
      {(data?.facebook_link || data?.twitter_link || data?.instagram_link) && (
        <div className={`${style.socialMediaSection} mt-5 pt-4`}>
          <>
            <h2>{t("Follow shop")} </h2>

            <div className={`${style.socialMediaIcon} col-2 mt-3`}>
              {data?.twitter_link && (
                <a target="blank" href={data?.twitter_link}>
                  <FaTwitter />
                </a>
              )}

              {data?.facebook_link && (
                <a target="blank" href={data?.facebook_link}>
                  <FaFacebook />
                </a>
              )}

              {data?.instagram_link && (
                <a target="blank" href={data?.instagram_link}>
                  <CgInstagram />
                </a>
              )}
              {data?.youtube_link && (
                <a target="blank" href={data?.youtube_link}>
                  <IoLogoYoutube />
                </a>
              )}

              {data?.tiktok_link && (
                <a target="blank" href={data?.tiktok_link}>
                  <FaTiktok />
                </a>
              )}

              {data?.pinterest_link && (
                <a target="blank" href={data?.pinterest_link}>
                  <FaPinterest />
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
