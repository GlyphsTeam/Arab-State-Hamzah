import React, { useState, useEffect } from "react";
import JobImg from "../components/showJob/JobImg";
import LastJob from "../components/showJob/LastJob";
import MiddleJob from "../components/showJob/MiddleJob";
import style from '../assets/style/ShowJobPage.module.css';
import { Link, useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import Alert from "../components/customAlert/Alert";
import HeroBanner from "../components/common/banner/HeroBanner";

function   ShowJobPage() {
  const [jobData, setJobData] = useState();
  const [count, setCount] = useState();
  const [t] = useTranslation();
  const token = localStorage.getItem("arab_user_token");
  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1];
  let url = `jobs/web/show/${id}`;

  const [Data] = useAxios(url);
  useEffect(() => {
    setJobData(Data?.data);
  });
  const [show, setShow] = useState(false);
  return (
    <>
 
      <HeroBanner
        data={jobData?.hero}

      />
      <div className={style.mainJobContainer}>
        <div className={style.subMainJob}>
          <Link to={'/Jobs'}>
            <div className={style.backArrowMobile}>
              <div className={style.backArrowIconDivMobile}>
                <i class="fas fa-chevron-left"></i>
              </div>
            </div>
          </Link>
          {jobData && (
            <>
              <div className={style.imageContact}>
                <LastJob jobData={jobData?.job} className={style.lastJobData} />

              </div>
              <JobImg jobData={jobData?.job} />
              <MiddleJob
                jobData={jobData?.job}
                setShow={setShow}
                token={token}
                setCount={setCount}
                id={id}

              />


            </>

          )}
        </div>
        <div className={style.contactStyle}>

          {jobData?.job?.phone && (
            <p className={style.contactParagraph}>
              <a href={`tel:${jobData?.phone}`}>
                <i
                  className={`fas fa-phone-alt ${style.iconJobMain}`}
                ></i>
                {jobData?.job?.phone}
              </a>
            </p>
          )}

          {jobData?.job?.email && (
            <p className={style.contactParagraph}>
              <a href={`mailto:${jobData?.email}`}>
                <i
                  className={`fas fa-envelope-open-text ${style.iconJobMain}`}
                ></i>
                {jobData?.job?.email}
              </a>
            </p>
          )}
        </div>
        <div className={style.imageContactMobile}>

          <LastJob jobData={jobData?.job} />
        </div>

      </div>
      <Link to="/jobs" className={style.backJobMain}>
        <button className={style.backJob}>{t("Back To Jobs")}</button>
      </Link>
      <Alert
        type="warning"
        message={t("Please login first.")}
        show={show}
        setShow={setShow}
        time="5000"
        count={count}
        setCount={setCount}
      />
    </>
  );
}
export default ShowJobPage;
