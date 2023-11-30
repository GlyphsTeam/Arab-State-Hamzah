import React, { useState } from "react";
import style from "../../assets/style/SubCategory.module.css";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from "react-router-dom";
import Alert from "../../components/common/alert/Alert";
import { useTranslation } from "react-i18next";

function SubCategoryCard({ data }) {
  const [count, setCount] = useState(4);
  const [showAlert, setShowAlert] = useState(false);
  const [t] = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem('arab_user_token');
  const showAlertFunction = () => {
    setShowAlert(true);
    setCount(4);
  }
  const navigateFunction = (navUrl) => {
    if (token){
      navigate(navUrl);
    }
    else{
      showAlertFunction();
    }
  }
  return (
    <>
      <div className={`${style.cardDiv} col-lg-4 col-md-6 col-sm-6`} onClick={()=>navigateFunction(`/Marketprofile/${data.slug}/${data?.id}`)}>
        <div
          className={`${style.subCategoryCardLink} `}
        >
          <LazyLoadImage className={`${style.categoryImage}`} src={data.image} height={215} alt="catergoryImage" />
          <p className={`${style.cardTitle} `}>{data.name}</p>
        </div>
      </div>
      {
      showAlert && (
    <Alert type="warning" message={t("Please login first.")} showAlert = {showAlert} setShowAlert={setShowAlert} time = '5000' count={count}
            setCount={setCount}/>
     )}
    </>
  );
}
export default SubCategoryCard;
