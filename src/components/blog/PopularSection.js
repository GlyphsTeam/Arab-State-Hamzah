import style from "../../assets/style/Blog.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { React, useState, useRef } from "react";
import ReactHtmlParser from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component'

function PopularSection({ data  , urlId}) {
  const [t,] = useTranslation();
 
  const around_georgia =data?.model;
  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = around_georgia?.slice(firstPostIndex, lastPostIndex);
  const [activeIndex, setActiveIndex] = useState(0);
  const statisticsId = useRef(null);
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActiveIndex(currentPage - 2);
    }
  };
  const nextPage = () => {
    if (currentPage !== Math.ceil(around_georgia?.length / postsPerPage)) {
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
      <h2 className={style.popularHeader}>{t("Feed and News")}</h2>
      <div className={`${style.columnCardsContainer} pt-4`}>
        {currentPosts?.map((item) => (
          <Link
            key={item.id}
            to={`/show-blog/${item.slug}/${item?.id}`}  state={(urlId = { id: item?.id })}
            onClick={handleChangePage}
          >
            <div className={style.columnCardsContainerDiv}>
              <div className={ style.colCardImg}>
                <LazyLoadImage src={item.image} alt="blogImage"/>
              </div>
              <div className={style.cloumnParagraph}>
                <h3>{item.title} </h3>
                <p style={{marginTop:'50px'}}>
                  {item?.web_description && ReactHtmlParser(`${item?.web_description}`)}
                  </p>
                <div className={style.columnCardReadMore}>
                  <Link
                    key={item.id}
                    to={`/show-blog/${item.slug}/${item?.id}`}  state={(urlId = { id: item?.id })}
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
          totalPosts={around_georgia?.length}
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
export default PopularSection;