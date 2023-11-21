import React from "react";
import style from "../../assets/style/searchResult/searchResultCard.module.css";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function SearchCard({ item }) {

  return (
    <div className={`${style.cardDiv}`}>
        <LazyLoadImage
          className={`${style.categoryImage}`}
          src={item?.image || item?.user_image}
          height={215}
          alt="imageCat"
        />
        <p className={`${style.cardTitle} `}>{item?.title || item?.name}</p>
    </div>
  );
}
export default SearchCard;
