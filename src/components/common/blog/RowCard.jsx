import React from "react";
import style from "../../../assets/style/common/blog/rowCard.module.scss";
import ReactHtmlParser from "html-react-parser";
import { LazyLoadImage } from "react-lazy-load-image-component";

const RowCard = ({rowData}) => {
  return (
    <div className={style.rowCardContainer}>
      <div>
        <LazyLoadImage
          src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
          alt="imageBlog"
          className={style.rowImage}
        />
      </div>
      <div className={style.blogRowText}>
        <h2>{rowData?.title}</h2>
        <div className={style.rowBlogReadTitle}>
          <p >
          {rowData?.web_description && ReactHtmlParser(rowData?.web_description)}
          </p>
        <div className={style.readMoreDiv}>
          <p>Read More</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RowCard;
