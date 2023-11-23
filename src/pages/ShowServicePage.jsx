import React from "react";
import LeftSection from "../components/showService/LeftSection";
import RightSection from "../components/showService/RightSection";
import Interested from "../components/showService/interested/Interested";
import useAxios from "../hooks/useAxiosGet";
import { Link, useLocation } from "react-router-dom";
import HeroBanner from '../components/common/banner/HeroBanner'
import style from "../assets/style/showService/showService.module.css";
import Tags from '../components/common/Tags';

const ShowServicePage = () => { 

  const location = useLocation();
  const id = location?.state?.id;
  let url = `our_services/show/${id}`
  const [Data] = useAxios(url);
  const data = Data?.data;

  return (
    <>
    <HeroBanner data={data?.slider}/>
   
    <div className="container mb-2 mt-5">
      <div className="row">
        <div className="col-lg-6">
          <LeftSection data = {data?.service}/>
          <div className={style.providerDiv}>

            {<p>{}</p>}
          <Link to={data?.service?.link}>
          <button className={style.linkBtn}>{data?.service?.title}</button>
        </Link> 
        </div>
        </div>

        <div className="col-lg-6 d-flex align-items-center ">
          <RightSection data = {data?.service}/>
        </div>
      </div>
      <div className="row">
        <div className={style.providerDiv}>
          { <p>{}</p> }

          {/* <Link to={data?.service?.link}>
          <button className={style.linkBtn}>{data?.service?.title}</button>
        </Link>  */}

        </div>
      </div>
    </div>

    {/* <Interested data = {data?.other_services}/> */}

    {/* <Tags data = {data?.tags}/> */}
    </>
  );
};

export default ShowServicePage;
