import { React, useState, useRef } from "react";
import style from "../../assets/style/Blog.module.css";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ResponiveSlider from "../Slider/ResponiveSlider";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function PlacesToVisitSection({ urlId, data }) {
  const [t, i18n] = useTranslation();
  const latest_post = data?.model;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = latest_post?.slice(firstPostIndex, lastPostIndex);
  const placesToVisitId = useRef(null);


  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };



  return (
    <>
      <h2 ref={placesToVisitId} className={style.placesTitle}>
        {data?.title}
      </h2>
      <div className={`${style.lastSectionContainer}`}>
        <div className={`${style.lastCardContainer}`}>
          <div
            className={
              i18n.language === "en"
                ? style.blogCardContainer
                : style.blogCardContainerAr
            }
          >
            {currentPosts && currentPosts.length > 0 ? (
              <ResponiveSlider>
                {currentPosts?.map((item) => (
                  <div key={item.id} className={style.cardImg} style={{ marginRight: "10px" }}>
                    <Link
                      to={`/show-blog/${item.slug}/${item?.id}`} state={(urlId = { id: item?.id })}
                      onClick={handleChangePage}
                    >
                      <div className={style.cardImageDiv}>
                        <LazyLoadImage src={item.image} alt="blogImage" />
                      </div>
                      <div className={style.cardText}>
                        <h5 className={style.textH5}>{item.title} </h5>
                        <p className={style.lastCardParagraph}>
                          {item.description}
                        </p>
                      </div>
                      <Link
                        key={item.id}
                        to={`/show-blog/${item.slug}/${item?.id}`} state={(urlId = { id: item?.id })}
                        onClick={handleChangePage}
                      >
                        <div className={style.readMoreContainer}>
                          <small className={style.readMoreText}>
                            {t("Read More")}
                          </small>
                        </div>
                      </Link>
                    </Link>
                  </div>
                ))}
              </ResponiveSlider>
            ) : (
              <p>No BLog post</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
export default PlacesToVisitSection;
