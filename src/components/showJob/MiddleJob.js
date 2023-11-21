import React, { useState } from "react";
import style from "../../assets/style/ShowJobPage.module.css";
import { useParams,useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Share from "../../Utils/Share";
import ReactHtmlParser from "html-react-parser";

function MiddleJob({ jobData, setShow, token, setCount }) {
  const [saveId, setSaveId] = useState();
  const [activeSave, setActiveSave] = useState(jobData?.save_job);
  const [t, i18n] = useTranslation();
  const formData = new FormData();
  const [showShareModal, setShowShareModal] = useState(false);
  const urlpath = useLocation();
  const pathName = `/${i18n?.language}` + urlpath.pathname;
  const { id } = useParams();
  formData.append("id", saveId);

  let saveIcon = activeSave ? "fas" : "far";
  function handleSaveJob() {
    
      token ? saveJob() : setShow(true);
      setCount(4);
    
  }
  const saveJob = (e) => {
    activeSave ? setActiveSave(false) : setActiveSave(true);
    setSaveId(jobData.id);
  };
 
  return (
    <div className={style.jobTxtContainer}>
      <div className={`d-flex ${style.mainContainer}`}>
        <h2 className={style.showJobTitle}>{jobData?.title}</h2>
        {/* <div className={style.lastMainJobDiv}> */}
        <p className={style.lastJobParagraphInfoCompany}>{jobData?.company}</p>
        {/* </div> */}
        <div className={style.mobileFirstSection}>
          <div className={style.firstSectionHide}>
            <div className={style.lastMainJobDiv}>
              <p className={style.lastJobParagraph}>{t("Job Type")}</p>
              <p className={style.lastJobParagraphInfo}>{jobData?.type}</p>
            </div>

            <div className={style.lastMainJobDiv}>
              <p className={style.lastJobParagraph}>{t("Post Type")}</p>
              <p className={style.lastJobParagraphInfo}>
                {jobData?.looking_for_text}
              </p>
            </div>

            <div className={style.lastMainJobDiv}>
              <p className={style.lastJobParagraph}> {t("Job Location")}</p>
              <p className={style.lastJobParagraphInfo}>{jobData?.place}</p>
            </div>
            <div className={style.lastMainJobDivDescription}>
              <h2 className={style.descriptionTitleMobile}>
                {t("Description")}
              </h2>
              <p className={style.middleJobParagraph}>
                {/* {jobData?.description} */}
                {jobData?.web_description && ReactHtmlParser(`${jobData.web_description}`)}
                </p>
              <div className={style.contactStyleMobile}>
                {jobData?.email && (
                  <p className={style.contactParagraph}>
                    <a href={`mailto:${jobData?.email}`}>
                      <i
                        className={`fas fa-envelope-open-text ${style.iconJobMain}`}
                      ></i>
                      {jobData?.email}
                    </a>
                  </p>
                )}
                {jobData?.phone && (
                  <p className={style.contactParagraph}>
                    <a href={`tel:${jobData?.phone}`}>
                      <i
                        className={`fas fa-phone-alt ${style.iconJobMain}`}
                      ></i>
                      {jobData?.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div
            className={
              i18n.language === "en"
                ? `${style.icon_row} d-flex `
                : `${style.icon_row_ar} d-flex `
            }
          >
            <i
              className={`fas fa-share-square ${style.showJobIcon}`}
              onClick={() => setShowShareModal(true)}
            ></i>
            <i
              onClick={handleSaveJob}
              className={`${saveIcon} fa-bookmark ${style.showJobIcon}`}
            ></i>
          </div>
        </div>
      </div>
      <div className={style.middleJobParagraphDiv}>
        <h2 className={style.descriptionTitle}>{t("Description")}</h2>
        <p className={style.middleJobParagraph}>
          {jobData?.web_description && ReactHtmlParser(`${jobData.web_description}`)}
          </p>
      </div>
      {showShareModal && (
        <Share
          url={pathName}
          setShowShareModal={setShowShareModal}
        />
      )}
    </div>
  );
}
export default MiddleJob;
