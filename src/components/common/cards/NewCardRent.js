import style from '../../../assets/style/newCardRent.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Share from "../../../Utils/Share";
import Alert from "../alert/Alert";
import { useDispatch } from 'react-redux';
import { setSavedDataProfile } from '../../../redux/Rent/rent';
function NewCardRent({ houseData }) {
    const [t, i18n] = useTranslation();
    const [send, setSend] = useState(false);
    const [count, setCount] = useState(4);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [isFav, setIsFav] = useState(houseData?.saved);
    const token = localStorage.getItem("arab_user_token");
    const [showShareModal, setShowShareModal] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const addToFavorite = (id) => {
        if (token) {
            setIsFav(!isFav);
            setSend(true);
            dispatch(setSavedDataProfile(null))
            setTimeout(() => {
                setSend(false);
            }, 100);
            if (location.pathname === "/saved-accomodation") {
                deleteDiv(id)
            }
        } else {
            setShowAlert(true);
            setCount(4);
        }
    };
    const handleClick = () => {
        setShowShareModal(true);
    };
    const deleteDiv = (id) => {
        const element = document.getElementById(`${id}`);
        element.parentNode.removeChild(element);
    };
    let formData = new FormData();
    formData.append("id", houseData.id);
    // console.log("houseData.id>>>>>>>",houseData);
    const [Res] = useFetch('favorite/rent', formData, send);

    let favoriteIcon = isFav ? "fas fa-bookmark" : "far fa-bookmark";

    return (

        <div className={style.newCardRent} id={houseData?.id}>
            <Link
                to={`/rent/${houseData.slug}/${houseData?.id}`}
                className={`row ${style.housingMainInfoBox}`}
            >
                <div className={style.newCardImage}>
                    <LazyLoadImage src={houseData?.image} />
                </div>
            </Link>
            <div className={style.card_rent_content}>
                <div className={style.contentRentContain}>
                    <span className={style.newRentTitle}>{houseData?.title}</span>
                    <div className={style.shareNewRent}>
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
                    </div>
                </div>
                <p className={style.rentPar}>
                    <i className="fas fa-map-marker-alt"></i> {houseData.place}
                </p>
                <Link
                    to={`/rent/${houseData.slug}/${houseData?.id}`}
                    className={`row ${style.housingMainInfoBox}`}
                >
                    <div className={style.newhouseInfo}>
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
                    </div>
                </Link>

            </div>
            <div className={style.priceCardRent}>
                {houseData?.price}$
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

    )
}

export default NewCardRent
