import React, { useEffect } from "react";
import style from "../../assets/style/about/userAnalytics.module.scss";
import Slider from "react-slick";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const UserAnalytics = ({ aboutData }) => {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  

  // const Box = ({ num }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  // };

  return (
    <>
      
        <div
          className={style.userAnalyticsContainer}
          style={{ backgroundImage: `url(${aboutData?.image})` }}
        >
          <div className={style.userAnalyticsText}>
            {/* {userAnalyticsDataArr?.map((item, index) => ( */}
            <div className={style.userAnalyticsCard}>
              {/* <img src={aboutData?.icon_businesses} alt="" /> */}
              <i className={aboutData?.icon_businesses}></i>
              <p>{aboutData?.businesses}</p>
              <h5>{aboutData?.title_businesses}</h5>
            </div>

            <div className={style.userAnalyticsCard}>
              <i className={aboutData?.icon_users}></i>
              <p>{aboutData?.users}</p>
              <h5>{aboutData?.title_users}</h5>
            </div>

            <div className={style.userAnalyticsCard}>
              <i className={aboutData?.icon_verified_users}></i>
              <p>{aboutData?.verified_users}</p>
              <h5>{aboutData?.title_verified_users}</h5>
            </div>
          </div>

          <div className={style.userAnalyticsTextMobile}>
            <Slider {...settings}>
              {/* {userAnalyticsDataArr?.map((item, index) => ( */}
              <div className={style.userAnalyticsCard}>
                <i className={aboutData?.icon_businesses}></i>
                <p>{aboutData?.businesses}</p>
                <h5>{aboutData?.title_businesses}</h5>
              </div>
              <div className={style.userAnalyticsCard}>
                <i className={aboutData?.icon_users}></i>
                <p>{aboutData?.users}</p>
                <h5>{aboutData?.title_users}</h5>
              </div>

              <div className={style.userAnalyticsCard}>
                <i className={aboutData?.icon_verified_users}></i>
                <p>{aboutData?.verified_users}</p>
                <h5>{aboutData?.title_verified_users}</h5>
              </div>
            </Slider>
          </div>
        </div>
    </>
  );
};

export default UserAnalytics;
