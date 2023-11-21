import React from "react";
import style from "../../assets/style/ourService.module.css";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ServiceImage({serviceImageData,pathName}) {


  return (
    <div className={style.serviceImageStyle}>
     <LazyLoadImage src={serviceImageData} alt="imageserver"/>
    </div>
  );
}
export default ServiceImage;