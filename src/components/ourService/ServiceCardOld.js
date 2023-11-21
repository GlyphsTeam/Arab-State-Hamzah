import style from "../../assets/style/ourService.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { React, useState, useRef } from "react";
import ReactHtmlParser from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ServiceCard({ serviceCardData }) {
  const [t, i18n] = useTranslation();
  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = serviceCardData?.slice(firstPostIndex, lastPostIndex);
  const [activeIndex, setActiveIndex] = useState(0);
  const statisticsId = useRef(null);
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActiveIndex(currentPage - 2);
    }
  };
  const nextPage = () => {
    if (currentPage !== Math.ceil(serviceCardData?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
      setActiveIndex(currentPage);
    }
  };

  const scrollPagination = () => {
    if (window.innerWidth < 480) {
      statisticsId.current.scrollIntoView();
    }
  };
  return (
    <>
      <h2 className={style.popularHeader}>{t("Our Services")}</h2>
      <div className={`${style.columnCardsContainer} pt-4`}>
        {currentPosts?.map((item, index) => (
          <Link
            key={index}
            to={item?.link}
            onClick={handleChangePage}
          >
            <div
              className={
                  style.columnCardsContainerDiv
              }
              
            >
              <div
                className={
                  i18n.language === "en"
                    ? style.colCardImg
                    : style.colCardImgArabic
                }
              >
                <h3>{item.title} </h3>
                <LazyLoadImage src={item.image} alt="ImageT"/>
              </div>
              <div className={style.cloumnParagraph}>
                <p>
                  {item?.web_description && ReactHtmlParser(`${item?.web_description}`)}
                  </p>
                <div className={style.columnCardReadMore}>
                  <Link
                    key={item.id}
                    to={`/show-blog/${item.id}`}
                    onClick={handleChangePage}
                  >
                    <small className={style.readMoreText}>
                      {t("Read More")}
                    </small>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <Pagination
          totalPosts={serviceCardData?.length}
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
    </>
  );
}
export default ServiceCard;
