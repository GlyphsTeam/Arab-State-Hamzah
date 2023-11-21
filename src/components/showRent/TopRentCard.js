import React, { useState } from "react";
import style from "../../assets/style/showRentPage.module.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Share from "../../Utils/Share";

function TopRentCard({ rentData, setShow, token, setCount }) {
  const [saveId, setSaveId] = useState();
  const [activeSave, setActiveSave] = useState(rentData?.save_job);
  const [t, i18n] = useTranslation();
  const [showShareModal, setShowShareModal] = useState(false);
  const { id } = useParams();
  const formData = new FormData();
  const urlpath = useLocation();
  const pathName = `/${i18n?.language}` + urlpath.pathname;
  formData.append("id", saveId);
  let saveIcon = activeSave ? "fas" : "far";
  function handleSaveJob() {
    
      token ? saveRent() : setShow(true);
      setCount(4);
    
  }
  const saveRent = (e) => {
    activeSave ? setActiveSave(false) : setActiveSave(true);
    setSaveId(rentData.id);
  };

  const handleClick = () => {
    setShowShareModal(true);
  };
   console.log("rentData>>>",rentData)
  return (
    <>
      <div className={style.mainTopRentContainer}>
        <h1 className={style.RentTitle}>{rentData?.title} </h1>
        <p className={style.addressStyle}>
          <i className={`fas fa-home ${style.accommodationIcon}`}></i>{" "}
          {rentData?.looking_for_text}{" "}
        </p>
        {/* <p className={style.addressStyle}>
          <i className={`fas fa-map-marker-alt ${style.locationIcon}`}></i>{" "}
          {rentData?.place}{" "}
        </p> */}

        <p className={style.rentParagraph}>{rentData?.description}</p>
        {rentData?.is_bathroom_shared && (
          <p className={style.houseNumberParagraph}>
            {/* <i className="fas fa-bed"></i> Is bathroom shared: {rentData?.is_bathroom_shared ? 'Yes' : 'No' }{" "} */}

            {/* <img src={require('../../assets/Images/shared.png')}/> */}
            {rentData?.is_bathroom_shared ? t("Bathroom shared") : ""}
          </p>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <div className={style.houseNumber}>
            {rentData?.bedrooms && (
              <p
                className={
                  i18n.language === "en"
                    ? style.houseNumberParagraphLast
                    : style.houseNumberParagraphLastRight
                }
              >
                <i className="fas fa-bed"></i> {rentData?.bedrooms}{" "}
              </p>
            )}
            {rentData?.bathrooms && (
              <p
                className={
                  i18n.language === "en"
                    ? style.houseNumberParagraphLast
                    : style.houseNumberParagraphLastRight
                }
              >
                <i className="fas fa-bath"></i>
                {rentData?.bathrooms}{" "}
              </p>
            )}
            {rentData?.area && (
              <p
                className={
                  i18n.language === "en"
                    ? style.houseNumberParagraphLast
                    : style.houseNumberParagraphLastRight
                }
              >
                <i className="fas fa-expand-arrows-alt"></i> {rentData?.area}
              </p>
            )}
            {rentData?.gender && (
              <p
                className={
                  i18n.language === "en"
                    ? style.houseNumberParagraphLast
                    : style.houseNumberParagraphLastRight
                }
              >
                <i className="fas fa-venus-mars"></i> {rentData?.gender}
              </p>
            )}
          </div>

          {/* <div className={style.addressRentContainer}>
            <div
              className={
                i18n.language === "en"
                  ? style.rentPriceDiv
                  : style.rentPriceDivAr
              }
            >
              <p className={style.rentStyle}> {`${rentData?.price} $`}</p>
            </div>
          </div> */}
        </div>
        <div className={style.backRent}>
          <Link to="/rents">
            <button>{t("Back To Rent")}</button>
          </Link>
          <div className={style.addressRentContainer}>
          <div
            className={
              i18n.language === "en" ? style.rentPriceDiv : style.rentPriceDivAr
            }
          >
            <h4 className={style.titleInfo}>{t("Price")} :</h4>
            <p className={style.rentStyle}> {`$${rentData?.price}`}</p>
          </div>
        </div>
        </div>
      </div>
      <div className={style.shareSaveSection}>
        <i
          className={`fas fa-share-square ${style.rentIcon}`}
          onClick={() => setShowShareModal(true)}
        ></i>
       {!rentData?.is_user_post&&<i
          className={`${saveIcon} fa-bookmark ${style.rentIcon}`}
          onClick={handleSaveJob}
        ></i>
       }
      </div>
      <div
        className={
          i18n.language === "en" ? style.contactStyle : style.contactStyleArabic
        }
      >
        {/* <p className={style.contactTitle}>{t("Contact Us")}</p> */}
        {/* <p className={style.contactParagraph}>
          <i className={`fas fa-envelope-open-text ${style.contactIcon}`}></i>
          {rentData?.email}
        </p> */}
        {/* <p>
          <i className={`fas fa-phone-alt ${style.}`}></i>
          {rentData?.phone_number}
        </p> */}
        <div className={style.firstSection}>
          <div>
          <div className={style.infoSection}>
                <i className={`fas fa-phone-alt ${style.locationIcon}`}></i>
            <h4 className={style.titleInfo}>{t("Phone Number")}</h4>
            </div>
         
            <p className={style.infoParagraph}>
              <a href={`tel:${rentData?.phone_number}`}>
                {rentData?.phone_number}
              </a>
            </p>
          </div>
          <div>
            <div className={style.infoSection}>
              <i
                className={`fas fa-envelope-open-text ${style.locationIcon}`}
              ></i>

              <h4 className={style.titleInfo}>{t("Email")}</h4>
            </div>

            <p className={style.infoParagraph}>
              <a href={`mailto:${rentData?.email}`}>{rentData?.email}</a>
            </p>
          </div>

          <div>
            <div className={style.infoSection}>
              <i className={`fas fa-map-marker-alt ${style.locationIcon}`}></i>
              <h4 className={style.titleInfo}>{t("Location")}</h4>
            </div>

            <p className={style.infoParagraph}>{rentData?.place}</p>
          </div>
        </div>

      </div>
      {showShareModal && (
        <Share
          url={pathName}
          setShowShareModal={setShowShareModal}
        />
      )}
    </>
  );
}
export default TopRentCard;
