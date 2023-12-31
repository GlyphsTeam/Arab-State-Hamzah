import React, { useEffect } from "react";
import Job_RentSearch from "../components/job_rent/Job_RentSearch";
import CardSection from "../components/job_rent/CardSection";
import style from "../assets/style/job_rent/heroNav.module.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import HeroNav from "../components/common/HeroNav";
import useAxios from "../hooks/useAxiosGet";

function Job({ baseURL }) {
  const location = useLocation();
  const pageType = location?.state?.type;
  const token = localStorage.getItem("arab_user_token");
  const [showPopUp, setShowPopModal] = useState(false);

  const [filters, setFilters] = useState({
    sort_by: "",
    type: "",
    experience: "",
    salary_from: "",
    salary_to: "",
    place: "",
  });

  let jobs_api = `jobs`;
  const [page, setPage] = useState(1);
  const limit = 10;

  let url = `jobs/web?limit_by=6&looking=${pageType}&page=${page}&limit_by=${limit}&sort_by=${filters.sort_by}&type=${filters.type}&experience=${filters.experience}&salary_from=${filters.salary_from}&salary_to=${filters.salary_to}&place=${filters.place}`;
 
  useEffect(() => {
    url = `jobs/web?limit_by=6&looking=${pageType}&page=${page}&limit_by=${limit}&sort_by=${filters.sort_by}&type=${filters.type}&experience=${filters.experience}&salary_from=${filters.salary_from}&salary_to=${filters.salary_to}&place=${filters.place}`;
  }, [page]);
  const [Data] = useAxios(url);
  const jobsData = Data?.data;

  const [jobPopUp, setJobPopUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [jobForm, setJobFormOpen] = useState(false);

  const handleOpenModalForm = () => {
    document.body.style.overflow = "hidden";
    setJobFormOpen(true);
  };



  const filterChange = (event, type) => {
    if (type === 2) {
      const { name, value } = event.target;
      setFilters({ ...filters, [name]: value });
    } else {
      setFilters({ ...filters, [event.name]: event.value });
    }

}

  return (
    <>
     <HeroNav
        mainData={jobsData?.slider}
        subData={jobsData?.slider?.model}
      />


      <div className={style.jobBody}>
       
        <Job_RentSearch
          token={token}
          searchType='job'
          setJobFormOpen={setJobFormOpen}
          handleOpenModalForm={handleOpenModalForm}
          setShowPopModal={setShowPopModal}
          showPopUp={showPopUp}

        />

        <CardSection
          baseURL={baseURL}
          token={token}
          index='job'
          showModal={showModal}
          setShowModal={setShowModal}
          jobPopUp={jobPopUp}
          setJobPopUp={setJobPopUp}
          jobs_api={jobs_api}
          setJobFormOpen={setJobFormOpen}
          jobForm={jobForm}
          jobsData={jobsData}
          setPage={setPage}
          page = {page}
          filterChange = {filterChange}
          filters={filters}
          setShowPopModal={setShowPopModal}
          showPopUp={showPopUp}
          setFilters={setFilters}
        />
      </div>
    </>
  );
}

export default Job;
