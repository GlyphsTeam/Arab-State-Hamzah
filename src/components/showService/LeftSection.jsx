import React from "react";
import style from "../../assets/style/showService/showService.module.scss"
import { LazyLoadImage } from "react-lazy-load-image-component";

const LeftSection = ({data}) => {
  return (
    <div>
      <h1>{data?.title}</h1>
  
      <LazyLoadImage
        src={data?.image}
        alt={data?.title}
        className={style.serviceImage}
      />
    </div>
  );
};

export default LeftSection;
