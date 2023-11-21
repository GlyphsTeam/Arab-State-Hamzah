import React from "react";
import style from '../../assets/style/ShowJobPage.module.css';
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function LastJob({ jobData }) {
  const [t, i18n] = useTranslation();

  let salaryType = jobData?.salary_type;

  return (
    <>
      <div className={` ${style.lastMainJob} ${style.lastMainJobDivMobile}}`}>
        <div
          className={` ${style.lastMainJobDiv} ${style.lastMainJobDivDesktop}`}
        >
          <div
            className={
              i18n.language === "en" ? style.jobInfoImage : style.jobInfoImageAr
            }
          >
            <LazyLoadImage
              src={require("../../assets/Images/job_rent/jobTypeImage.png")}
              alt="jobType"
            />
            <p className={style.lastJobParagraph}> {t("Job Type")}</p>
          </div>

          <p className={style.lastJobParagraphInfo}>{jobData?.type}</p>
        </div>
        <div
          className={` ${style.lastMainJobDiv} ${style.lastMainJobDivDesktop}`}
        >
          <p className={style.lastJobParagraph}> {t("Post Type")}</p>
          <p className={style.lastJobParagraphInfo}>
            {jobData?.looking_for_text}
          </p>
        </div>
        <div
          className={` ${style.lastMainJobDiv} ${style.lastMainJobDivDesktop}`}
        >
          <div
            className={
              i18n.language === "en" ? style.jobInfoImage : style.jobInfoImageAr
            }
          >
            <LazyLoadImage
              src={require("../../assets/Images/job_rent/locationImage.png")}
              alt="locationImage"
            />

            <p className={style.lastJobParagraph}> {t("Job Location")}</p>
          </div>
          <p className={style.lastJobParagraphInfo}>{jobData?.place}</p>
        </div>
        {jobData?.company_name && (
        <div
          className={` ${style.lastMainJobDiv} ${style.lastMainJobDivDesktop}`}
        >
          <p className={style.lastJobParagraph}> {t("Company")} </p>
          <p className={style.lastJobParagraphInfo}>{jobData?.company_name}</p>
        </div>
        )}

        {jobData?.salary && (
          <div
            className={` ${style.lastMainJobDiv} ${style.lastJobParagraphMargin}`}
          >
            <div
              className={
                i18n.language === "en"
                  ? style.jobInfoImage
                  : style.jobInfoImageAr
              }
            >
              <LazyLoadImage src={require("../../assets/Images/job_rent/salary.png")} alt="sallery"/>

              <p
                className={` ${style.lastJobParagraph} ${style.lastJobParagraphMobile} `}
              >
                {t("Salary")}
              </p>
            </div>
            <p className={`${style.lastJobParagraphInfo}  `}>{`$ ${
              jobData?.salary
            } ${t("per")} ${salaryType}`}</p>
          </div>
        )}

        <div
          className={` ${style.lastMainJobDiv} ${style.lastMainJobDivMobile} `}
        >
          <p
            className={` ${style.lastJobParagraph} ${style.lastJobParagraphMobile} `}
          >
            {t("Job Posted")}
          </p>
          <p className={style.lastJobParagraphInfo}>{jobData?.created_at}</p>
        </div>
      
      </div>
    </>
  );
}
export default LastJob;
