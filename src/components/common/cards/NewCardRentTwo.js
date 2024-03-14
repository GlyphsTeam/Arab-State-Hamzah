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
import { IoLocationSharp } from "react-icons/io5";
import { FaShareFromSquare, FaBath } from "react-icons/fa6";
import { MdFavorite, MdFavoriteBorder, MdBedroomParent, MdOutlineWorkspaces } from "react-icons/md";
import axios from 'axios';

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
    const deleteRent = async (id) => {
        let url = `user/rents/delete/${id}`;
        let city_ID = process.env.REACT_APP_City_ID;

        let backend_url = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}/${url}`

        await axios.delete(`${backend_url}`, {
            headers: { "Authorization": `Bearer ${token}` }

        }).then((res) => {
            deleteDiv(id);

        }).catch((err) => console.log(err))
    }


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
                            <FaShareFromSquare className={style.favIconColor} onClick={() => handleClick()}
                            />
                            {
                                isFav ? <MdFavorite className={style.favIconColor} onClick={() => addToFavorite(houseData?.id)} /> : <MdFavoriteBorder className={style.favIconColor} onClick={() => addToFavorite(houseData?.id)} />
                            }

                        </div>

                    </div>
                </div>
                <div className={style.deleteContainer}>
                    <p className={style.rentPar}>
                        <IoLocationSharp /> {houseData.place}
                    </p>
                    {location.pathname === "/my-housing" && <button className={style.deleteRent} onClick={() => deleteRent(houseData?.id)}>{t("Delete")}</button>}

                </div>


                <Link
                    to={`/rent/${houseData.slug}/${houseData?.id}`}
                    className={`row ${style.housingMainInfoBox}`}
                >
                    <div className={style.newhouseInfo}>
                        <p>
                            <MdBedroomParent /> {houseData.bedrooms}{" "}
                            {t("Bedrooms")}
                        </p>
                        <p>
                            <FaBath /> {houseData.bathrooms}{" "}
                            {t("Bathrooms")}
                        </p>
                        <p>
                            <MdOutlineWorkspaces /> {houseData.area} sq
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