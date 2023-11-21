import React from "react";
import style from "../../../assets/style/homePage/blog.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function BlogCard(props,urlId) {
  const [t, i18n] = useTranslation();

  return (
    <>
      <div className={` ${style.card}`}>
        <Link
          to={`/show-blog/${props.slug}/${props?.id}`}
          state={(urlId = { id: props?.id })} >
          <div className={style.cardBody}>
            <div className={`row ${style.imgDiv}`}>
              <LazyLoadImage
                className={style.img}
                src={props.image}
                alt={`about ${props.title}`}
              />
            </div>
            <div className={`row ${style.aboutArticle}`}>
              <h1 className={style.aboutDisc}>{props.title}</h1>
              <p className={style.blogParagraph}>
                    {props.description}
                  </p>
            </div>
            <div className={style.readMoreContainer}>
                    <small className={style.readMoreText}>
                      {t("Read More")}
                    </small>
                  </div>
          </div>
        </Link>
      </div>
    </>
  );
}
export default BlogCard;
