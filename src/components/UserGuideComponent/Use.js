import { React, useState, useRef } from "react";
import style from "../../assets/style/UserGuide.module.css";
import { useTranslation } from "react-i18next";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import Banner from "../common/banner/HeroBanner";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function CreateAccount({ userGuide , urlId, media }) {
  const [t, i18n] = useTranslation();
  const createAccountData = userGuide?.model;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = createAccountData?.slice(firstPostIndex, lastPostIndex);
  const [activeIndex, setActiveIndex] = useState(0);
  const statisticsId = useRef(null);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActiveIndex(currentPage - 2);
    }
  };
  const nextPage = () => {
    if (currentPage !== Math.ceil(createAccountData?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
      setActiveIndex(currentPage);
    }
  };

  const scrollPagination = () => {
    if (window.innerWidth < 480) {
      statisticsId.current.scrollIntoView();
      }
  };


  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
    <Banner/>
      <h2 ref={statisticsId} className={style.statisticsHeader}>{userGuide?.title}</h2>
      <div
        className={
          i18n.language === "en"
            ? style.blogCardContainer
            : style.blogCardContainerAr
        }
      >
        {currentPosts &&
          currentPosts.map((item) => (
            <div key={item.id} className={style.cardStatisticsImg}>
              <Link to={`/Show-User-Guide/${item?.slug}/${item?.id}`} state={(urlId = { id: item?.id })}
                   onClick={handleChangePage}>
                <div className={style.cardImageDiv}>
                  <LazyLoadImage src={item.image} alt="cardImage"/>
                </div>
                <div className={style.cardText}>
                  <h5>{item.title}</h5>
                  <p className={style.statisticsParagraph}>
                    {item.description}
                  </p>
                </div>
                <Link
                  key={item.id}
                  to={`/Show-User-Guide/${item?.slug}/${item?.id}`} state={(urlId = { id: item?.id })}
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
          totalPosts={createAccountData?.length}
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
export default CreateAccount;







