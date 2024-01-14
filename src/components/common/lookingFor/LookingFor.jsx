import React, { useState } from "react";
import style from "../../../assets/style/common/lookingFor.module.css";
import ReactHtmlParser from "html-react-parser";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from '../../customAlert/Alert'
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from 'react-redux';
import { rentState } from '../../../redux/Rent/rent';
function LookingFor({ pageType }) {
  const rentData = useSelector(rentState);
  let lookingData;
  if (pageType === "rent") {
    lookingData = rentData.rentData;
  }
  else {
    lookingData = rentData.jobData
  }
  const [t, i18n] = useTranslation();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const showAlert = () => {
    setShow(true);
    setCount(4);
  }
  const showPostModal = (url) => {
    navigate(url)
  }
  console.log("lookingData?.sections>>>",lookingData?.sections)
  return (
    <>
      <div className={`container ${style.container}`}>
        {lookingData?.sections?.map((item, index) => (
          <div key={index} className={`row ${i18n.language === "en" ? style.mainDiv : style.mainDivAr}`}>
            <div className={`col-8 ${style.infoDiv}`}>
              <h2 className={i18n.language === "en" ? style.lookingForTitle : style.lookingForTitleAr}>{item?.title}</h2>

              {item?.web_description && ReactHtmlParser(`${item.web_description}`)}
              <div className={style.divBtns}>
                {item.type === "jobs" ? (
                  <>
                    <button className={style.postLink} onClick={() => localStorage.getItem('arab_user_token') ? showPostModal(item.create_url) : showAlert()}>
                      {t("+ Add Post")}
                    </button>
                    <Link state={({ type: item?.looking })} className={style.postLink} to={item.url}>
                      {t("Posted Jobs")}
                    </Link>
                  </>
                ) : item.type === "employees" ? (
                  <>
                    <button className={style.postLink} onClick={() => localStorage.getItem('arab_user_token') ? showPostModal('/jobforcompany') : showAlert()}>
                      {t("+ Add Post")}
                    </button>
                    <Link state={({ type: item?.looking })} className={style.postLink} to={item.url}>
                      {t("Posted Employees")}

                    </Link>
                  </>
                ) : item.type === "rent" ? (
                  <>
                    <button className={style.postLink} onClick={() => localStorage.getItem('arab_user_token') ? showPostModal("/rentForm") : showAlert()}>
                      {t("+ Add Post")}
                    </button>
                    <Link state={({ type: item?.looking })} className={style.postLink} to={item.url}>
                      {t("Posted Appartment")}

                    </Link>
                  </>
                ) : (
                  <>
                    <button className={style.postLink} onClick={() => localStorage.getItem('arab_user_token') ? showPostModal('/post-rent') : showAlert()}>
                      {t("+ Add Post")}
                    </button>
                    <Link state={({ type: item?.looking })} className={style.postLink} to={item.url}>
                      {t("Posted Accomodation")}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className={`col-4 imgCon`}>
              <LazyLoadImage
                className={`${style.img}`}
                src={item?.image}
                alt="Looking For"
              />
            </div>
          </div>
        ))}
      </div>
      <Alert type="warning" message={t("Please login first.")} show={show} setShow={setShow} time='5000' count={count}
        setCount={setCount} />
    </>
  );
}

export default LookingFor;
