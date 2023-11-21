import React, { useState, useEffect } from "react";
import style from "../../assets/style/job_rent/card.module.css";
import Pagination from "../blog/Pagination";
import HousingCard from "../../components/common/cards/AllRent";
import JobRentFilter from "./sideFilter/JobRentFilter";

function RentSection({
  rents_api, 
  setPage,
  page,
  filterChange,
  filters,
  rentsData,
  token,
  setShowModal,
  setRentPopUp,
  popRentInfo,
  setPopRentInfo,
  handleShareClick,
  setShow,
  setFormSave,
  setCount,
}) {

  // const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  let urlId;

  const nextPage = () => {
    if (total / 4 > activeIndex + 1) {
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


  const scrollPagination = () => {
    // if (window.innerWidth < 480) {
    //   placesToVisitId.current.scrollIntoView();
    //   }
  };

  
  const total = rentsData?.rents?.total;

  const [isMobile, setIsMobile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 992) {
      setIsMobile(true);
      }
  }, [window.innerWidth]);
  return (
    <div className="container ">
      <div className="row px-4">
        <div className="col-lg-3">
          {isMobile?
          <>
              <i onClick={()=> setShowFilter(!showFilter)} className={`fas fa-filter ${style.filterBtn}`}></i>
              {showFilter && (
                <JobRentFilter filterChange={filterChange} filters={filters} type='rent' />
              )}
              </>
          :
            <JobRentFilter filterChange={filterChange} filters={filters} type='rent' />
          }
        </div>
        <div className="col-lg-9">
          {rentsData?.rents?.model?.map((item, index) => (
            <HousingCard key={index} houseData={item} urlId={urlId} />
          ))}

          <Pagination
            totalPosts={total}
            postsPerPage={4}
            setCurrentPage={setPage}
            previousPage={previousPage}
            nextPage={nextPage}
            currentPage={page}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            scrollPagination={scrollPagination}
          />
        </div>
      </div>
    </div>
  );
}

export default RentSection;
