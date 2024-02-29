import style from "../../../assets/style/layout/footer.module.css";
import useAxios from "../../../hooks/useAxiosGet";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SubscribeFooter from "./SubscribeFooter";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Footer({logoImage}) {
  const location = useLocation();
  const [t] = useTranslation();

  
  const [footer] = useAxios('general-setting');
  const footerData = footer?.data?.footer;
  const hideFooter =
    location.pathname === "/Login" ||
    location.pathname === "/Register" ||
    location.pathname === "/Forget-password" ||
    location.pathname.toLocaleLowerCase() === "/privacy-policy" ||
    location.pathname.toLocaleLowerCase()=== "/terms-conditions" ||
    location.pathname.toLocaleLowerCase() === "/eula";
  return (
    !hideFooter && (
    <div className={`${style.footer}`}>
      <div className={`container`}>
        <div className={`row `}>
          <div className={`col-lg-6 col-md-12 col-sm-12 ${style.firstSection}`}>
            <div>
              <LazyLoadImage
                src={logoImage}
                className={style.logoImage}
                alt="logoImage"
              />
            </div>
            <div className={style.linksDivMobile}>
              <div className={style.firstLinksDiv}>
                <Link to="/">{t("Home")}</Link> |
                <Link to="/Our-Service">{t("Our Services")}</Link> |
                <Link to="/Blog">{t("Blog")}</Link>|<Link to="/User-Guide">{t("User Guide")}</Link>{" "}
                
              </div>
              <div className={style.secondLinksDiv}>
                <Link to="/Contact">{t("Contact")}</Link> |
                <Link to="/About">{t("About")}</Link>|
                <Link to="/Terms-conditions">{t("Terms & Condition")}</Link> |
                <Link to="/Privacy-Policy">{t("Privacy & Policy")}</Link>
              </div>
            </div>
            <div className={style.footerIcon}>
              {footerData?.social_media?.map((item, index) => (
              <Link to={item?.url} target="_blank" key={index}>
                <i className={item?.icon}></i>
              </Link>
              ))}
              {/* <a href={footerData?.instagram_url} target="_blank">
                {" "}
                <i className="fab fa-instagram"></i>
              </a>

              <a href={footerData?.youtube_url} target="_blank">
                {" "}
                <i className="fab fa-youtube"></i>
              </a> */}
            </div>
            <div className={style.subscribeParagraph}>
              <p>
                {footerData?.subscribe}
              {/* {t("joiningMessage")} */}
              </p>
            </div>
            <SubscribeFooter/>
          </div>

          <div className={`col-lg-6 col-md-12 col-sm-12`}>
            <div className={style.linksDiv}>
              <div className={style.firstLinksDiv}>
                <Link to="/">{t("Home")}</Link> |
                <Link to="/Our-Service">{t("Our Services")}</Link> |
                <Link to="/Blog">{t("Blog")}</Link>|<Link to="/User-Guide">{t("User Guide")}</Link>{" "}
                
              </div>
              <div className={style.secondLinksDiv}>
                <Link to="/Contact">{t("Contact")}</Link> |
                <Link to="/About">{t("About")}</Link>|
                <Link to="/Terms-conditions">{t("Terms & Condition")}</Link> |
                <Link to="/Privacy-Policy">{t("Privacy & Policy")}</Link>
              </div>
            </div>
            <div className={style.copyRightDiv}>
              <p>{t("Email")}: {footerData?.email} <br/> {t("Phone")}: {footerData?.phone} </p>
              <p className={style.copyRightParagraph}>{footerData?.Copyright}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  );
}

export default Footer;
