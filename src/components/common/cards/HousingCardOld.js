import React, { useState } from "react";
import style from "../../../assets/style/house/housingCard.module.scss";
import Alert from "../alert/Alert";
import { Link } from "react-router-dom";
import Share from "../../../Utils/Share";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function HouseCard({ houseData, isMyPost, baseUrl  , urlId}) {
const [t] = useTranslation();

  const [send, setSend] = useState(false);
  const [count, setCount] = useState(4);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [isFav, setIsFav] = useState(houseData.save_job);
  const token = localStorage.getItem("arab_user_token");
  const [showShareModal, setShowShareModal] = useState(false);

  let formData = new FormData();
  formData.append("id", houseData.id);


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


  const deleteHousing = (id) => {
    try {
      fetch(`${baseUrl}/user/rents/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        method: "DELETE",
      }).then(() => {
        deleteDiv(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setShowAlertDelete(true);
      setCount(4);
      // this.deleteElement(id);
    }

  };

  const deleteDiv = (id) => {
    const element = document.getElementById(`${id}`);
    element.parentNode.removeChild(element);
  };

  return (
    <div
      id={houseData.id}
      className={`col-lg-4 col-md-6 col-sm-12 ${style.mainHouseCard}`}
    >
      <div className={`${style.houseCardBody}`}>
        <Link to={`/rent/${houseData.slug}`} state={(urlId = { id: houseData?.id })}>
          <h6 className={style.rentTypeTitle}>{houseData.looking_for_text}</h6>
          <LazyLoadImage className={style.houseImage} src={houseData.image} alt="houseImage" />
        </Link>

        <Link
            to={`/rent/${houseData.slug}`} state={(urlId = { id: houseData?.id })} className={`row ${style.housingMainInfoBox}`}
           
          >
        <div  className={`col-12 ${style.houseInfo}`}>

            <h4 className={style.houseTitle}>{houseData.title}</h4>
        </div>
       

        <div className={`col-12 ${style.houseInfo}`}>
        
            <p className={style.locationParagraph}>
              <i className="fas fa-map-marker-alt"></i> {houseData.place}
            </p>
        </div>

        <div className={`col-12 ${style.houseInfo}`}>
            <div className={style.houseRooms}>
              <p>
                <i className="fas fa-bed"></i> {houseData.bedrooms} {t("Bedrooms")}
              </p>
              <p>
                <i className="fas fa-bath"></i> {houseData.bathrooms} {t("Bathrooms")}
              </p>
              <p>
                <i className="fas fa-expand-arrows-alt"></i> {houseData.area} sq ft
              </p>
            </div>
            </div>
         </Link>
        
        <div  className={`row ${style.housingMainInfoBox}`}>

          <div className="col-8">
          <p className={style.housePrice}>{houseData.price} $</p>
          </div>

          <div className="col-4">
            <div className={style.actionDiv}>
            {!isMyPost && (
                      <>
              <i
                className={`fas fa-share-square ${style.favIconColor}`}
                onClick={() => handleClick()}
              ></i>

              <i
                className={`${favoriteIcon} ${style.favIconColor}`}
                onClick={() => addToFavorite(houseData.id)}
              ></i>
              </>
            )}
            </div>

          </div>
        </div>
        {isMyPost && (
          <div className={`row ${style.housingApprovedBox}`}>
            <div className={style.approvalDiv}>
              {houseData.status ? (
                <p className={style.waitingApproval}>Waiting for approval</p>
              ) : (
                <p className={style.published}>Published</p>
              )}
              <p>
                {" "}
                <i
                  onClick={() => deleteHousing(houseData.id)}
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
        <Share url={`/rent/${houseData.id}`} setShowShareModal={setShowShareModal} />
      )}
    </div>
  );
}

export default HouseCard;
