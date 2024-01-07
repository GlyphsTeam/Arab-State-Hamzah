import { useTranslation } from "react-i18next";
import style from '../../assets/style/advertusments.module.css';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Glyphs from '../../assets/Images/logoGlyphs.png'
function Advertusments() {
    const [t] = useTranslation();
    const location = useLocation();
    const [adverShow, setAdverShow] = useState(true);
    console.log("location",location)
    useEffect(()=>{
        if(location.pathname==="/add-bussinse"){
            setAdverShow(false)
        }
        else{
            setAdverShow(true)
        }
    },[location])
    return (
        <>
            {adverShow && <div className={style.containerAdver}>
                <LazyLoadImage  src={Glyphs} alt="logo" className={style.logoGlyphs}/>
                <p className={style.adverPar}>
                    {t("For More Services Visit Our website")} : <a href="https://glyphsmarketing.com" target="_blank" rel="noreferrer">Visit</a>
                </p>
            </div>
            }
        </>
    )
}

export default Advertusments
