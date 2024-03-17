import React, { useEffect, useState } from "react";
import style from "../../../assets/style/SubCategory.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function SubCategoryCard({ storeData }) {
  const [t, i18n] = useTranslation();
  const [isFavorite, setIsFavorite] = useState();

  let urlId;
  useEffect(() => {
    if (storeData?.saved) {
      setIsFavorite(true);
    }
    else {
      setIsFavorite(false)
    }
  }, [storeData?.saved])
  let favoriteIcon = isFavorite ? "fas fa-bookmark" : "far fa-bookmark";

  const handlerDelete = async (id) => {
    let url = 'favorite/store'
    let backend_url = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0/`
    const token = localStorage.getItem('arab_user_token');
    let formData = new FormData();
    formData.append('id', id);
    await axios.post(`${backend_url}${url}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      deleteDiv(id);
    }).catch((err) => console.log(err));
  }
  const deleteDiv = (id) => {
    const element = document.getElementById(`${id}`);
    element.parentNode.removeChild(element);
  };
  return (
    <>
      <div className={`${style.cardDiv} col-lg-4 col-md-6 col-sm-6`} id={storeData?.id} >
        <div>
          <Link
            to={`/Marketprofile/${storeData.slug}/${storeData?.id}`}
            className={`${style.subCategoryCardLink} `}
          >
            <LazyLoadImage className={`${style.categoryImage}`} src={storeData.image} height={215} alt="imag-store" />
            <p className={`${style.cardTitle} `}>{storeData.name}</p>
          </Link>
          {i18n.language === "en" ?
            <FaBookmark onClick={() => handlerDelete(storeData?.id)} className={`${favoriteIcon} ${style.deleteIcon}`}/>
            :
            <FaBookmark onClick={() => handlerDelete(storeData?.id)} className={`${favoriteIcon} ${style.deleteIconAr}`}/>

          }
        </div>
      </div>
    </>
  );
}
export default SubCategoryCard;
