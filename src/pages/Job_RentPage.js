import React, { useEffect } from "react";
import HeroNav from "../components/common/HeroNav";
import Job_RentSearch from "../components/job_rent/Job_RentSearch";
import CardSection from "../components/job_rent/CardSection";
import style from "../assets/style/job_rent/heroNav.module.scss";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

function Job({ baseURL }) {
  const pathUrl = useLocation();
  const pathname = pathUrl.pathname;
  const token = localStorage.getItem("arab_user_token");

  let jobs_api = `jobs`;
  let rents_api = `rents`;
  

  const { type } = useParams();

  const [index, setIndex] = useState(type);

  useEffect(() => {
    setIndex(type);
  }, [type]);

  const [jobPopUp, setJobPopUp] = useState(false);
  const [rentPopUp, setRentPopUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [jobForm, setJobFormOpen] = useState(false);
  const [rentForm, setRentOpen] = useState(false);

  const handleOpenModalForm = () => {
    document.body.style.overflow = "hidden";
    setJobFormOpen(true);
  };
  const handleOpenRentModal = () => {
    document.body.style.overflow = "hidden";
    setRentOpen(true);
  };

  return (
    <>
      <div className={style.jobHead}></div>

      <div className={style.jobBody}>
        <div className={style.jobHeader}>
    
          {pathname === "/Jobs/Job" ? (
            <HeroNav
              index={index}
              setIndex={setIndex}
              setJobPopUp={setJobPopUp}
              setRentPopUp={setRentPopUp}
            />
          ) : (
            <HeroNav
              index={index}
              setIndex={setIndex}
              setJobPopUp={setJobPopUp}
              setRentPopUp={setRentPopUp}
            />
          )}
        </div>

        <Job_RentSearch
          token={token}
          searchType={index}
          setJobFormOpen={setJobFormOpen}
          setRentOpen={setRentOpen}
          handleOpenRentModal={handleOpenRentModal}
          handleOpenModalForm={handleOpenModalForm}
        />

        <CardSection
          baseURL={baseURL}
          token={token}
          index={index}
          showModal={showModal}
          setShowModal={setShowModal}
          rentPopUp={rentPopUp}
          jobPopUp={jobPopUp}
          setJobPopUp={setJobPopUp}
          setRentPopUp={setRentPopUp}
          jobs_api={jobs_api}
          rents_api={rents_api}
          setJobFormOpen={setJobFormOpen}
          setRentOpen={setRentOpen}
          jobForm={jobForm}
          rentForm={rentForm}
        />
      </div>
    </>
  );
}

export default Job;
