import React, { useState, useEffect } from "react";
import style from "../../assets/style/showProduct/mainProductInfo.module.css";
import Share from "../../Utils/Share";
import { useTranslation } from "react-i18next";
import Alert from "../common/alert/Alert";
import { useLocation } from 'react-router-dom'
function MainProductInfo({ showProductData }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const token = localStorage.getItem("arab_user_token");
  const [send, setSend] = useState(false);
  const [count, setCount] = useState(4);
  const [isFav, setIsFav] = useState(showProductData?.saved);
  const [showAlert, setShowAlert] = useState(false);
  const [t, i18n] = useTranslation();
  const urlpath = useLocation();
  const pathName = `/${i18n?.language}` + urlpath.pathname;
  useEffect(() => {
    setIsFav(showProductData?.saved);
  }, [showProductData?.saved]);
  let formData = new FormData();
  formData.append("id", showProductData?.id);


  let favoriteIcon = isFav ? "fas fa-bookmark" : "far fa-bookmark";

  const handleClick = () => {
    setShowShareModal(true);
  };

  const addToFavorite = () => {
    if (token) {
      setIsFav(!isFav);
      setSend(true);
      setTimeout(() => {
        setSend(false);
      }, 100);
    } else {
      setShowAlert(true);
      setCount(4);
    }
  };

  return (
    <div className={style.mainProductInfoDivContainer}>
      <p className={`${style.spaceParagraph} ${style.dateStyle} `}>
        {showProductData?.created_at}
      </p>
      <div className={style.mainProductInfoDiv}>
        <div>
          <h1> {showProductData?.title} </h1>
        </div>
        <div className={style.shareSaveContainer}>
          <i
            className="fas fa-share-square"
            aria-hidden="true"
            onClick={() => handleClick()}
          ></i>
          <i
            className={favoriteIcon}
            aria-hidden="true"
            onClick={() => addToFavorite(showProductData?.id)}
          ></i>
        </div>
      </div>
      <h3 className={style.showProductPrice}>${showProductData?.price}</h3>
      <div className={style.contactDiv}>
        {showProductData?.phone_number && (
          <p className={style.contactMobile}>
            <a href={`tel:${showProductData?.phone_number}`}>
              <i className={`fas fa-phone-alt`} aria-hidden="true"></i>
              {showProductData?.phone_number}
            </a>
          </p>
        )}

        {showProductData?.phone_number && (
          <p className={`${style.spaceParagraph} ${style.contactMobile}`}>
            <a href={`mailto:${showProductData?.email}`}>
              <i
                className={`fas fa-envelope-open-text ${style.iconJobMain}`}
              ></i>
              {showProductData?.email}
            </a>
            {/* <i className="fas fa-envelope-open-text " aria-hidden="true"></i>
            {showProductData?.email} */}
          </p>
        )}
      </div>
      <div className={style.generalTipsDiv}>
        <h3>{t("General Tips")}</h3>
        <ul>
          <li>Only meet in public places</li>
          <li>Never pay or transfer money in advance</li>
          <li>Inspect the product before you buy it</li>
        </ul>
      </div>
      <div className={style.locationDateContainer}>
        <p className={style.locationStyle}>
          <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
          {showProductData?.place}
        </p>
      </div>
      {showAlert && (
        <Alert
          type="warning"
          message="Please login first."
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          count={count}
          setCount={setCount}
        />
      )}
      {showShareModal && (
        <Share
          url={pathName}
          setShowShareModal={setShowShareModal}
        />
      )}
    </div>
  );
}

export default MainProductInfo;
