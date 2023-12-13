import React, { useState } from "react";
import style from "../../assets/style/showRentPage.module.css";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Share from "../../Utils/Share";
import useFetch from "../../hooks/useFetch";
import ReactHtmlParser from 'html-react-parser';

function TopRentCard({ rentData, setShow, token, setCount, id }) {
  const [saveId, setSaveId] = useState();
  const [activeSave, setActiveSave] = useState(rentData?.saved);
  const [t, i18n] = useTranslation();
  const [showShareModal, setShowShareModal] = useState(false);
  const formData = new FormData();
  const urlpath = useLocation();
  const pathName = `/${i18n?.language}` + urlpath.pathname;
  const [send, setSend] = useState(false);
  formData.append("id", id);


  let favoriteIcon = activeSave ? "fas fa-bookmark" : "far fa-bookmark";
  async function handleSaveJob() {
      token ? saveRent() : setShow(true);
      const tokenUser = localStorage.getItem("arab_user_token")
      setCount(4);
      setSend(true)
      await fetch(`https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${process.env.REACT_APP_City_ID}/favorite/rent`,{
        headers: {
          Authorization: `Bearer ${tokenUser}`,
          Accept: "application/json",
        },
        method:"POST",
        body: formData,
      }).then((result)=>console.log(result)).catch((err)=>console.log(err))
  }
  const saveRent = (e) => {
    activeSave ? setActiveSave(false) : setActiveSave(true);
    setSaveId(rentData.id);
    setSend(true)
  };


  return (
    <>
      <div className={style.mainTopRentContainer}>
        <h1 className={style.RentTitle}>{rentData?.title} </h1>
        <p className={style.addressStyle}>
          <i className={`fas fa-home ${style.accommodationIcon}`}></i>{" "}
          {rentData?.looking_for_text}{" "}
        </p>
        <div className={style.firstSection}>
          <div>
          <div className={style.infoSection}>
                <i className={`fas fa-phone-alt ${style.locationIcon}`}></i>
            <h4 className={style.titleInfo}>{t("Phone Number")}</h4>
            </div>
         
            <p className={`${style.infoParagraph} ${i18n.language==='en'?style.phoneClass:style.phoneClassAr}`}>
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

            <p className={`${style.infoParagraph} ${i18n.language==='en'?style.phoneClass:style.phoneClassAr}`}>
              <a href={`mailto:${rentData?.email}`}>{rentData?.email}</a>
            </p>
          </div>
          <div>
            <div className={style.infoSection}>
              <i className={`fas fa-map-marker-alt ${style.locationIcon}`}></i>
              <h4 className={style.titleInfo}>{t("Location")}</h4>
            </div>
            <p className={`${style.infoParagraph} ${i18n.language==='en'?style.phoneClass:style.phoneClassAr}`}>{rentData?.place}</p>
          </div>
        </div>
        {/* <p className={style.addressStyle}>
          <i className={`fas fa-map-marker-alt ${style.locationIcon}`}></i>{" "}
          {rentData?.place}{" "}
        </p> */}

        <p className={style.rentParagraph}>{ReactHtmlParser(rentData?.description)}</p>
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
          className={`${favoriteIcon} ${style.rentIcon}`}
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
