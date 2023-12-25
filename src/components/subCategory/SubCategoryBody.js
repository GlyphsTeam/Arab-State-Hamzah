import { React, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxiosGet";
import Map from "./ReactMap";
import SubCategoryCard from "./SubCategoryCard";
import style from "../../assets/style/SubCategory.module.css";
import SubCategorySlider from "./sliderFilter/SubCategorySlider";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS


function SubCategoryBody() {
  const [t] = useTranslation();

  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 2]
  const [page, setPage]= useState(1)
  let [showMap, setShowMap] = useState(false);
  let [mobileMap, setMobileMap] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);
  let handleClick = (index) => {
    setActiveIndex(index);
    if (window.innerWidth > 768) {
      // statisticsId.current.scrollIntoView();
      window.scrollTo(0, 290);
    }
  };
  let url =
    activeIndex === 0
      ? `stores?main_id=${id}&limit_by=100`
      : `stores?main_id=${id}&category_id=${activeIndex}&limit_by=100`;

  let [Data] = useAxios(url);
  let categoryCards = Data?.data;
  useEffect(() => {
    if (window.innerWidth < 992) {
      setMobileMap(true);
    }
  }, []);

  const nextPage = () => {
    if (categoryCards?.length / 4 > activeIndex + 1) {
      setPage(page + 1);
      setActiveIndex(activeIndex + 1);
    }
  };
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setActiveIndex(activeIndex - 1);
    }
  };
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = categoryCards?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(categoryCards?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className={`container`}>
      <div className="row">
        {id !== 0 && (
          <SubCategorySlider
            activeIndex={activeIndex}
            handleClick={handleClick}
            id = {id}
          />
        )}
      </div>
      <div className={`${style.categoryBody} row`}>
          {mobileMap ? (
         <div className={`col-lg-4 col-md-12 col-sm-12 ${style.mapSection}`}>
            <div>
              {showMap? 
              <h1 className={style.hideMapButton} onClick={() => setShowMap(!showMap)}>{t('Hide Map')}</h1>
              :
              <h1 className={style.showMapButton} onClick={() => setShowMap(!showMap)}>{t('Show Map')}</h1>
            }
              {showMap && (
                <Map data={categoryCards} />
              )}
            </div>
            </div>
          ) : (
            <div className={`col-lg-4 col-md-12 col-sm-12 ${style.mapSection}`}>
            <Map data={categoryCards} />
            </div>
          )}
      <div className={`col-lg-8 col-md-12 col-sm-12 d-flex flex-wrap`}>
        {currentCards?.map((item, index) => (
          <SubCategoryCard key={index} data={item} typePage={1} />
        ))}
      </div>
      <div className="mt-3">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages })?.map((_, index) => (
            <li  key={index} className={`page-item ${currentPage === index + 1 ? `${style.numberStyle} text-white`: 'text-white'}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
        {/* <div className={`col-lg-8 col-md-12 col-sm-12 d-flex flex-wrap`}>
          {categoryCards?.map((item, index) => (
            <SubCategoryCard key={index} data={item} typePage={1}/>
          ))}
        </div> */}
      </div>
 
    </div>
  );
}
export default SubCategoryBody;
