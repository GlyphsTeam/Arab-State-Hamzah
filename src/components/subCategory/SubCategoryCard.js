import React from "react";
import style from "../../assets/style/SubCategory.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function SubCategoryCard({ data,  }) {
  let urlId;
  console.log("data>>>>>bussib",data)
  return (
    <>
      <div className={`${style.cardDiv} col-lg-4 col-md-6 col-sm-6`} >
        <Link
          to={`/Marketprofile/${data.slug}/${data?.id}`}
          state={(urlId = { id: data?.id })}

          className={`${style.subCategoryCardLink} `}
        >
          <LazyLoadImage className={`${style.categoryImage}`} src={data.image} height={215} alt="catergoryImage" />
          <p className={`${style.cardTitle} `}>{data.name}</p>
        </Link>
      </div>
    </>
  );
}
export default SubCategoryCard;
