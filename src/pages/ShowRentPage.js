import React, { useState, useEffect } from "react";
import style from "../assets/style/showRentPage.module.css";
import TopRentCard from "../components/showRent/TopRentCard";
import RentImg from "../components/showRent/RentImg";
import BottomRentCard from "../components/showRent/BottomRentCard";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import Alert from "../components/customAlert/Alert";
import HeroBanner from "../components/common/banner/HeroBanner";
import { Helmet } from 'react-helmet'
const ShowRentPage = () => {
  const [rentData, setRentData] = useState();
  const [count, setCount] = useState();
  const [t] = useTranslation();
  const token = localStorage.getItem("arab_user_token");
  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1]
  let url = `rents/web/show/${id}`;
  const [Data] = useAxios(url);

  useEffect(() => {
    setRentData(Data?.data);
  });
  const [show, setShow] = useState(false);

console.log("Data>>>>>",Data?.data)
  return (
    <>
        <Helmet>
          <title>{rentData?.rent?.title}</title>
          <meta name='description' content={rentData?.rent?.description}/>
        </Helmet>
      <HeroBanner
        data={rentData?.hero}

      />
      <div>
        {rentData && (
          <div className={style.rentPageContainer}>
            <div className={style.rentPageSecondContainer}>
              <Link to={"/rents"}>
                <div className={style.backArrowMobile}>
                  <div className={style.backArrowIconDivMobile}>
                    <i class="fas fa-chevron-left"></i>
                  </div>
                </div>
              </Link>
              <div className={style.RentfirstSection}>
                <div className={style.mainImgDiv}>
                  <RentImg rentData={rentData?.rent} />
                </div>
                <div className={style.contactStyleMobile}>
                  <p
                    className={` ${style.contactParagraph} ${style.contactParagraphMobile}  `}
                  >
                    <a href={`mailto:${rentData?.email}`}>
                      <i
                        className={`fas fa-envelope-open-text ${style.contactIcon}`}
                      ></i>
                      {rentData?.rent?.email}
                    </a>
                  </p>
                  <p className={style.contactParagraphMobile}>
                    <a href={`tel:${rentData?.phone_number}`}>
                      <i className={`fas fa-phone-alt ${style.contactIcon}`}></i>
                      {rentData?.rent?.phone_number}
                    </a>
                  </p>
                </div>
                <div className={style.firstContainer}>
                  <TopRentCard
                    rentData={rentData?.rent}
                    id={id}
                    setShow={setShow}
                    token={token}
                    setCount={setCount}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className={style.BottomRentCardContainer}>
                <BottomRentCard rentData={rentData?.rent} />
              </div>
            </div>
          </div>
        )}
        <Alert
          type="warning"
          message={t("Please login first.")}
          show={show}
          setShow={setShow}
          time="5000"
          count={count}
          setCount={setCount}
        />
      </div>
    </>
  );
};
export default ShowRentPage;
