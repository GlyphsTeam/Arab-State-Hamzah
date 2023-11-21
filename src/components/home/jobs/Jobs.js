import { Link } from 'react-router-dom';
import style from "../../../assets/style/homePage/job.module.css";
import { useTranslation } from "react-i18next";

import { LazyLoadImage } from 'react-lazy-load-image-component'


function Jobs({job_data, rent_data , market_data}) {
    const [t] = useTranslation();

 

    return(
        <> 
        <div className={style.jobContainer}>

            <div className={`row justify-content-evenly ${style.mainJobDiv}`}>
         
                <div className={`col-sm-4 col-md-4 ${style.colCenter}`} >
                    <Link to={job_data?.link}  className={style.navLink}>
                        <div className={style.jobCard} >
                        <div className={style.jobDivTitle}>
                                <h2 className={style.cardTitle}>{job_data?.title}</h2>
                            </div>
                            <LazyLoadImage className={style.jobSectionImg} src={job_data?.image} alt="Card cap"/>
                            <div className={style.descriptionParagraphDiv}>
                                <p className={style.cardParagraph}>{job_data?.description}</p>
                                <h2 className={style.cardText}>{t("find more")}</h2>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={`col-sm-4 col-md-4 ${style.colCenter}`} >
                    <Link to={rent_data?.link}className={style.navLink}>
                       <div className={style.jobCard}>
                       <div className={style.jobDivTitle}>
                            <h2 className={style.cardTitle}>{rent_data?.title}</h2>
                         </div>
                         <LazyLoadImage className={style.jobSectionImg}  src={rent_data?.image} alt="Card cap"/>
                         <div className={style.descriptionParagraphDiv}>
                         <p className={style.cardParagraph}>{rent_data?.description}</p>
                            <h2 className={style.cardText}>{t("find more")}</h2>
                         </div>
                       </div>
                    </Link>
                </div>
                <div className={`col-sm-4 col-md-4 ${style.colCenter}`} >
                    <Link to={market_data?.link} className={style.navLink}>
                       <div className={style.jobCard}>
                       <div className={style.jobDivTitle}>
                            <h2 className={style.cardTitle}>{market_data?.title}</h2>
                         </div>
                         <LazyLoadImage className={style.jobSectionImg}  src={market_data?.image} alt="Card cap"/>
                         <div className={style.descriptionParagraphDiv}>
                         <p className={style.cardParagraph}>{market_data?.description}</p>
                            <h2 className={style.cardText}>{t("find more")}</h2>
                         </div>
                       </div>
                    </Link>
                </div>

            </div>
        </div>
        </>
    );
}

export default Jobs;