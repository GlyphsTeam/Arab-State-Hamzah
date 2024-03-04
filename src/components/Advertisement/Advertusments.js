import { useTranslation } from "react-i18next";
import style from '../../assets/style/advertusments.module.css';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Glyphs from '../../assets/Images/logoGlyphs.png';
import { useSelector } from 'react-redux';
import { homeState } from '../../redux/Home/home';
function Advertusments() {
    const stateHome = useSelector(homeState);
    const homeStateTry = stateHome?.homeData?.try_app;

    const [t] = useTranslation();
    const location = useLocation();
    const [adverShow, setAdverShow] = useState(true);
    useEffect(() => {
        if (location.pathname === "/add-business" ||
            location.pathname === "/profile" ||
            location.pathname === "/User-Guide" ||
            location.pathname === "/saved-blogs" ||
            location.pathname === "/saved-store" ||
            location.pathname === "/saved-accomodation" ||
            location.pathname === "/saved-job" ||
            location.pathname === "/saved-product" ||
            location.pathname === "/my-business" ||
            location.pathname === "/my-housing" ||
            location.pathname === "/my-job" ||
            location.pathname === "/my-product" ||
            location.pathname === "/changePassword" ||
            location.pathname === "/delete-account" ||
            location.pathname === "/login" ||
            location.pathname === "/Register" ||
            location.pathname === "/Profile" ||
            location.pathname === "/Forget-password" ||
            location.pathname.includes("Show-Product")) {
            setAdverShow(false)
        }
        else {
            setAdverShow(true)
        }
    }, [location])
    return (
        <>
            {adverShow && <div className={style.containerAdver}>
                <div className={style.glyphsContainer}>
                <p className={style.adverPar}>
                <LazyLoadImage src={Glyphs} alt="logo" className={style.logoGlyphs} />
                    {t("For More Services Visit Our website")} : <a href="https://glyphsmarketing.com" target="_blank" rel="noreferrer">{t("Visit")}</a>
                </p>
                <p className={style.adverPar}>
                    {t("Download Our App in")}<a href={homeStateTry?.ios?.link} target="_blank" rel="noreferrer"> IOS</a> {t("or")} <a rel="noreferrer" target="_blank" href={homeStateTry?.android?.link}>Android </a>
                </p>
                </div>
            </div>
            }
        </>
    )
}

export default Advertusments
