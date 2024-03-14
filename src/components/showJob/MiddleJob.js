import React, { useState } from "react";
import style from "../../assets/style/ShowJobPage.module.css";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Share from "../../Utils/Share";
import ReactHtmlParser from "html-react-parser";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from 'react-redux';
import { setSavedJobData } from '../../redux/Rent/rent';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaShareFromSquare } from "react-icons/fa6";

function MiddleJob({ jobData, setShow, token, setCount, id }) {
  const [saveId, setSaveId] = useState();
  const [activeSave, setActiveSave] = useState(jobData?.saved);
  const [t, i18n] = useTranslation();
  const [send, setSend] = useState(false);
  const dispatch = useDispatch();

  const formData = new FormData();
  const [showShareModal, setShowShareModal] = useState(false);
  const urlpath = useLocation();
  const pathName = `/${i18n?.language}` + urlpath.pathname;
  formData.append("id", id);
  const [Res] = useFetch('favorite/job', formData, send);
  let saveIcon = activeSave ? "fas" : "far";
  function handleSaveJob() {
    token ? saveJob() : setShow(true);
    setCount(4);
    setSend(true);
    dispatch(setSavedJobData(null));
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
          <div className={style.contactContainer}>
            <div
              className={
                i18n.language === "en"
                  ? `${style.icon_row} d-flex `
                  : `${style.icon_row_ar} d-flex `
              }
            >
              <FaShareFromSquare className={style.showJobIcon} onClick={() => setShowShareModal(true)}
              />
              {
                activeSave ? <MdFavorite onClick={handleSaveJob} className={style.showJobIcon}/> : <MdFavoriteBorder onClick={handleSaveJob} className={style.showJobIcon} />
              }
            </div>

            <Link to={jobData?.profile_url} target="_blank">
              <button className={style.contactme}>{t("Contact me")}</button>
            </Link>
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
