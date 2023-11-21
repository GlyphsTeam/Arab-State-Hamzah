import React from "react";
import JobCard from "../common/cards/JobCard";
import style from "../../assets/style/job/jobCard.module.scss";
const JobLatestPost = ({data, title}) => {
    let urlId;
  return (
    <div className="container ">
    <div className="row ">
      <h3 className={style.latestPostTitle}>{title}</h3>
      <div className={style.gridCards}>
      {data?.map((item, index) => (
        <JobCard key={index} jobData={item} urlId={urlId} />
      ))}
      </div>
    </div>
    </div>
  );
};

export default JobLatestPost;
