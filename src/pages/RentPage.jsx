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

   
  const [filters, setFilters] = useState({
    sort_by: "",
    type: "",
    order_by: "",
    price_from: "",
    price_to: "",
    place: "",
    room_from:"",
    room_to:""
  });
  const [page, setPage] = useState(1);
  const limit = 4;

  let url = `rents/web?page=${page}&limit_by=${limit}&looking=${pageType}&type=${filters.type}&price_from=${filters.price_from}&price_to=${filters.price_to}&place=${filters.place}&room_from=${filters.room_from}&room_to=${filters.room_to}`;

  useEffect(() => {
    url = `rents/web?page=${page}&limit_by=${limit}&looking=${pageType}&type=${filters.type}&price_from=${filters.price_from}&price_to=${filters.price_to}&place=${filters.place}}&room_from=${filters.room_from}&room_to=${filters.room_to}`;
  }, [page]);

  const [Data] = useAxios(url, "false");
  const rentsData = Data?.data;

  const [rentPopUp, setRentPopUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rentForm, setRentOpen] = useState(false);
  const [showPopUp, setShowPopModal] = useState(false);

  const handleOpenRentModal = () => {
    document.body.style.overflow = "hidden";
    setRentOpen(true);
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
        mainData={rentsData?.slider}
        subData={rentsData?.slider?.model}
      />



      <div className={style.jobBody}>
       
        <Job_RentSearch
          token={token}
          searchType='Rent'
          setRentOpen={setRentOpen}
          handleOpenRentModal={handleOpenRentModal}
          setShowPopModal={setShowPopModal}
          setFilters={setFilters}
          filters={filters}

        />

        <CardSection 
          baseURL={baseURL}
          setShowPopModal={setShowPopModal}
          showPopUp={showPopUp}
          token={token}
          index='Rent'
          showModal={showModal}
          setShowModal={setShowModal}
          rentPopUp={rentPopUp}
          setRentPopUp={setRentPopUp}
          setRentOpen={setRentOpen}
          rentForm={rentForm}
          rentsData = {rentsData}
          setPage={setPage}
          page = {page}
          filterChange = {filterChange}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </>
  );
}

export default Job;
