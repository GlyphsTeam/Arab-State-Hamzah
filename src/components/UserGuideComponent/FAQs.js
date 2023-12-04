import { React, useState, useRef } from "react";
import style from "../../assets/style/UserGuide.module.css";
import Pagination from "./Pagination";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function FAQs({ userGuide  , urlId}) {
  const [t, i18n] = useTranslation();
  const faqs = userGuide?.model;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = faqs?.slice(firstPostIndex, lastPostIndex);
  const [activeIndex, setActiveIndex] = useState(0);
  const placesToVisitId = useRef(null);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActiveIndex(currentPage - 2);
    }
  };
  const nextPage = () => {
    if (currentPage !== Math.ceil(faqs?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
      setActiveIndex(currentPage);
    }
  };
  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };



   const scrollPagination = () => {
    if (window.innerWidth < 480) {
      placesToVisitId.current.scrollIntoView();
      }
  };


  return (
    <>
      <h2 ref={placesToVisitId} className={style.placesTitle}>{userGuide?.title}</h2>
      <div className={`${style.lastSectionContainer}`}>
        <div className={`${style.lastCardContainer}`}>
          <div
            className={
              i18n.language === "en"
                ? style.blogCardContainer
                : style.blogCardContainerAr
            }
          >
            {currentPosts &&
              currentPosts.map((item) => (
                <div key={item.id} className={style.cardImg}>
                  <Link to={`/Show-User-Guide/${item?.slug}`} state={(urlId = { id: item?.id })}
                   onClick={handleChangePage}>
                    <div className={style.cardImageDiv}>
                      <LazyLoadImage src={item.image} alt="cardImage" />
                    </div>
                    <div className={style.cardText}>
                      <h5>{item.title} </h5>
                      <p className={style.lastCardParagraph}>
                        {item.description}
                      </p>
                    </div>
                    <Link
                      key={item.id}
                      to={`/Show-User-Guide/${item?.slug}`} state={(urlId = { id: item?.id })}
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
          </div>
          <div>
            <Pagination
              totalPosts={faqs?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              previousPage={previousPage}
              nextPage={nextPage}
              currentPage={currentPage}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              scrollPagination={scrollPagination}
            />{" "}
          </div>
        </div>
      </div>
    </>
  );
}
export default FAQs;







