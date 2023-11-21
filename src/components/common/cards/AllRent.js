import style from "../../../assets/style/common/housingCard.module.scss";
import React, { useEffect, useState } from "react";
import Alert from "../alert/Alert";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Share from "../../../Utils/Share";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useFetch from "../../../hooks/useFetch";
import {useLocation} from 'react-router-dom';
const HouseCard = ({ houseData, isMyPost, baseUrl, urlId }) => {
  const [t, i18n] = useTranslation();
  const [send, setSend] = useState(false);
  const [count, setCount] = useState(4);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [isFav, setIsFav] = useState(houseData?.saved);
  const token = localStorage.getItem("arab_user_token");
  const [showShareModal, setShowShareModal] = useState(false);
  const urlpath = useLocation();
  const pathName = `/${i18n?.language}` + urlpath.pathname;
  let formData = new FormData();
  formData.append("id", houseData.id);
  console.log("houseData>>",houseData)
  const [Res] = useFetch('favorite/rent', formData, send);


  let favoriteIcon = isFav ? "fas fa-bookmark" : "far fa-bookmark";

  useEffect(() => {
    if(houseData?.saved){
      setIsFav(true);
    }
    else{
      setIsFav(false)
    }
  }, [houseData?.saved])
  const handleClick = () => {
    setShowShareModal(true);
  };

  const addToFavorite = (id) => {
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
    <div className={`${style.rentContainer}`} id={houseData?.id}>
      <Link
        to={`/rent/${houseData.slug}/${houseData?.id}`}
        state={(urlId = { id: houseData?.id })}
      >
        <div className={`${style.rentCardImage}`}>
          <LazyLoadImage src={houseData?.image} alt="imageHousing" />
          <p className={style.lookingText}>{houseData.looking_for_text}</p>
        </div>
      </Link>

      <div className={style.mainCardContainer}>
        <div className={style.mainTitleShare}>
          <h4 className={style.houseTitle}>{houseData.title}</h4>
          <div className={style.actionDiv}>
            {!isMyPost && (
              <div className={style.shareIconMobile}>
                <i
                  className={`fas fa-share-square ${style.favIconColor}`}
                  onClick={() => handleClick()}
                ></i>

                <i
                  className={`${favoriteIcon} ${style.favIconColor}`}
                  onClick={() => addToFavorite(houseData?.id)}
                ></i>
              </div>
            )}

            <div>
              <p className={style.housePriceMobile}> ${houseData.price} </p>
            </div>
          </div>
          <div className={`${style.rentCardImageMobile}`}>
            <LazyLoadImage src={houseData?.image} alt="imageDa" />
            <p className={style.lookingText}>{houseData.looking_for_text}</p>
          </div>
        </div>
        <Link
          to={`/rent/${houseData.slug}/${houseData?.id}`}
          state={(urlId = { id: houseData?.id })}
        >
          <div className={style.houseInfoPriceDiv}>
            <h4 className={style.houseTitleMobile}>{houseData.title}</h4>
            <p className={style.locationParagraph}>
              <i className="fas fa-map-marker-alt"></i> {houseData.place}
            </p>
            <div>
              <p className={style.housePrice}> ${houseData.price} </p>
            </div>
          </div>
          <div className={style.houseInfo}>
            <p>
              <i className="fas fa-bed"></i> {houseData.bedrooms}{" "}
              {t("Bedrooms")}
            </p>
            <p>
              <i className="fas fa-bath"></i> {houseData.bathrooms}{" "}
              {t("Bathrooms")}
            </p>
            <p>
              <i className="fas fa-expand-arrows-alt"></i> {houseData.area} sq
              ft
            </p>
            <Link
              to={`/rent/${houseData.slug}/${houseData?.id}`}
              state={(urlId = { id: houseData?.id })}
              className={`row ${style.housingMainInfoBox}`}
            >
              <div>
                <p className={style.moreInfoDiv}>More Info</p>
              </div>
            </Link>
          </div>
        </Link>
        {isMyPost && (
          <div className={`row ${style.housingApprovedBox}`}>
            <div className={style.approvalDiv}>
              {houseData.status ? (
                <p className={style.published}>Published</p>
              ) : (
                <p className={style.waitingApproval}>Waiting for approval</p>
              )}
              <p>
                {" "}
                <i
                  className={`fas fa-trash-alt ${style.deleteIcon}`}
                ></i>
              </p>
            </div>
          </div>
        )}
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
      {showAlertDelete && (
        <Alert
          type="success"
          message="Your post deleted successfully."
          showAlert={showAlertDelete}
          setShowAlert={setShowAlertDelete}
          count={count}
          setCount={setCount}
        />
      )}
      {showShareModal && (
        <Share
          url={`/${i18n?.language}/rent/${houseData.slug}/${houseData?.id}`}
          setShowShareModal={setShowShareModal}
        />
      )}
    </div>
  );
};

export default HouseCard;
