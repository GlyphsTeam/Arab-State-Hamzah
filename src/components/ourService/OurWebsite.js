import { React, useState, useRef } from "react";
import style from "../../assets/style/ourService.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ResponiveSlider from "../Slider/ResponiveSlider";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function OurWebsite({ourWebsiteData}) {
  const [t, i18n] = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = ourWebsiteData?.slice(firstPostIndex, lastPostIndex);
  const placesToVisitId = useRef(null);


  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };


  return (
    <>
      <h2 ref={placesToVisitId} className={style.placesTitle}>{t("Discover Other States")}</h2>
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
              {currentPosts.map((item , index) => (
                <div key={index} className={style.cardImg}>
                  <a href={item?.link} target="_blank" onClick={handleChangePage}>
                    <div className={style.cardImageDiv}>
                      <LazyLoadImage src={item.image} alt="CardImage"/>
                    </div>
                    <div className={style.cardText}>
                      <h5>{item.title} </h5>
                      {/* <p className={style.lastCardParagraph}>
                        {item.description}
                      </p> */}
                    <Link
                      key={item.id}
                      to={`/show-blog/${item.id}`}
                      onClick={handleChangePage}
                    >
                      <div className={style.readMoreContainer}>
                        <small className={style.readMoreTextOutline}>
                          {t("visit")}
                        </small>
                      </div>
                    </Link>
                    </div>

                  </a>
                </div>
              ))}
              </ResponiveSlider>
            ):(
              <p>No blogs post</p>
            )}
          </div>
          {/* <div>
            <Pagination
              totalPosts={ourWebsiteData?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              previousPage={previousPage}
              nextPage={nextPage}
              currentPage={currentPage}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              scrollPagination={scrollPagination}
            />{" "}
          </div> */}
        </div>
      </div>
    </>
  );
}
export default OurWebsite;







