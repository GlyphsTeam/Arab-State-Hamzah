import React, { useEffect, useState } from "react";
import style from "../../assets/style/job_rent/card.module.css";
import Pagination from "../blog/Pagination";
import JobCard from "../../components/common/cards/AllJobs";
import JobLatestPost from "./JobLatestPost";
import AdvBanner from "../common/AdvBanner";
import JobRentFilter from "./sideFilter/JobRentFilter";

function JobSection({
  jobsData,
  jobs_api,
  setPage,
  page,
  filterChange,
  filters,
  token,
  setShowModal,
  setJobPopUp,
  popJobInfo,
  setPopJobInfo,
  handleShareClick,
  setShow,
  setFormSave,
  setCount,
}) {
  const total = jobsData?.jobs?.total;
  const [activeIndex, setActiveIndex] = useState(0);
  let urlId;

  const nextPage = () => {
    if (total / 6 > activeIndex + 1) {
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



  
  const [isMobile, setIsMobile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 992) {
      setIsMobile(true);
      }
  }, [window.innerWidth]);
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-3 p-0">
          {isMobile?
          <>
              <i onClick={()=> setShowFilter(!showFilter)} className={`fas fa-filter ${style.filterBtn}`}></i>
              {showFilter && (
                <JobRentFilter filterChange={filterChange} filters={filters} type='job' />
              )}
              </>
          :
            <JobRentFilter filterChange={filterChange} filters={filters} type='job' />
          }
          </div>

          <div className={`col-lg-9`}>
            <div className={style.cardContainer}>
              {jobsData?.jobs?.model?.map((item, index) => (
              <JobCard key={index} jobData={item} urlId={urlId} page="job" />
              ))}
            </div>

            <Pagination
              totalPosts={total}
              postsPerPage={6}
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

      <AdvBanner data={jobsData?.advertisements} />

      <JobLatestPost
        title={jobsData?.Latest_post?.title}
        data={jobsData?.Latest_post?.model}
      />
    </>
  );
}

export default JobSection;
