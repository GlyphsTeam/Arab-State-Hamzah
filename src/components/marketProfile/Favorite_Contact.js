import React, { useState, useEffect } from "react";
import style from "../../assets/style/marketProfile.module.css";
import useFetchPost from "../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import Share from "../../Utils/Share";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSavedBussiness } from '../../redux/Business/business';
import { FaShareSquare } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdFavorite, MdAttachEmail,MdOutlineFavoriteBorder } from "react-icons/md";

function Favorite_Contact({ data, setShow, setCount }) {
  const [t] = useTranslation();
  const [isFavorite, setIsFavorite] = useState();
  const [send, setSend] = useState(false);
  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const pathName = location.pathname;
  const dispatch = useDispatch();


  useEffect(() => {
    if (data?.saved) {
      setIsFavorite(true);
    }
    else {
      setIsFavorite(false);
    }
  }, [data?.saved]);

  const formData = new FormData();
  formData.append("id", id);
  const token = localStorage.getItem("arab_user_token");
  const url = `favorite/store`;
  const [Res] = useFetchPost(url, formData, send);

  let favoriteIcon = isFavorite ? "fas fa-bookmark" : "far fa-bookmark";
  const handleAddFavorite = () => {
    if (token) {
      isFavorite ? setIsFavorite(false) : setIsFavorite(true);
      setSend(true);
      dispatch(setSavedBussiness(null));
      setTimeout(() => {
        setSend(false);
      }, 100);
    } else {
      setShow(true);
      setCount(5);
    }
  };
  const [showShareModal, setShowShareModal] = useState(false);



  return (
    <div className={` ${style.FavoriteContactContainer}`}>
      <p className={`px-3 ${style.favoriteIconCursor}`} onClick={handleAddFavorite}>
        <span
          className={`favorite-icon ${isFavorite ? "active" : ""}`}
        // onClick={handleAddFavorite}
        >
          {isFavorite ? <MdFavorite className={style.loveIconAct}/> : <MdOutlineFavoriteBorder className={style.loveIcon} />}
          {/* <i
            className={`${favoriteIcon}  ${style.favoriteIconCursor}`}
          ></i> */}
        </span>
        {'  '} {t("Add to Favorite")}
      </p>

      <p className={`px-3 ${style.favoriteIconCursor}`} onClick={() => setShowShareModal(true)}>
        {/* <i
          className={`fas fa-share-square ${style.shareIconMargin}`}

        ></i> */}
        <FaShareSquare className={style.shareIconMargin} />
        {t("Share Shop")}
      </p>

      {data?.phone && (

        <p className="px-3">
          <a href={`tel:${data?.phone}`}>
            <FaPhone className={style.iconPadding} />
            {/* <i className={`fas fa-phone-alt ${style.iconPadding}`}></i> */}
            {data?.phone}
          </a>
        </p>
      )}

      {data?.email && (

        <p className="px-3">
          <a href={`mailto:${data?.email}`}>
            <MdAttachEmail className={style.shareIconMargin}/>
            {data?.email}
          </a>
        </p>
      )}
      {showShareModal && <Share url={`/en${pathName}`} setShowShareModal={setShowShareModal} />}
    </div>
  );
}
export default Favorite_Contact;
