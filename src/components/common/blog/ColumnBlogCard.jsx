import React from "react";
import style from "../../../assets/style/common/blog/columnCard.module.scss";
import { Link } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ColumnBlogCard = ({ columnData }) => {
  return (
    <div className={style.columnMainCard}>
      <div>
        <LazyLoadImage
          src={columnData?.image}
          alt="imageBlog"
          className={style.blogMainCard}
        />
      </div>
      <div className={style.blogTextCard}>
        <h2 className={style.blogMainCardTitle}>{columnData?.title}</h2>
        <div className={style.columnCardParagraphDiv}>
          <p>{columnData?.web_description && ReactHtmlParser(columnData?.web_description)}</p>
        </div>
        <Link to={columnData?.url}>
          <div className={style.columnCardReadMore}>
            <p>Read More</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ColumnBlogCard;
