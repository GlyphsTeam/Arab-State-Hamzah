import React, { useState } from "react";
import style from "../../assets/style/marketProfile.module.css";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function MainStoreCard({ data, setShowPhotoModal }) {
  const [activePhoto, setActivePhoto] = useState(0);
  // const [showPhotoModal, setShowPhotoModal] = useState(false);
  const showPhoto = (e) => (
    setActivePhoto(e),
    (document.body.style.overflow = "hidden"),
    setShowPhotoModal(true)
  );
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className={style.customNextArrow} onClick={onClick}>
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className={style.customPrevArrow} onClick={onClick}>
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  }
  
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
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
  return (
    <>
      <div className={`${style.cardSection} mt-3`}>
        <Slider {...settings}>
          {data?.photos?.map((item, index) => (
            <div
              className={style.cardContainer}
              key={item.id}
              onClick={() => showPhoto(index)}
            >
              <LazyLoadImage src={item.image} className="mr-2" alt="imageSlider"/>
            </div>
          ))}
        </Slider>
      </div>
      <div className={`${style.cardDesktop} mt-3`}>
        {/* <Slider {...settings}> */}
        {data?.photos?.map((item, index) => (
          <div
            className={style.cardContainer}
            key={item.id}
            onClick={() => showPhoto(index)}
          >
            <LazyLoadImage src={item.image} className="mr-2" alt="photos"/>
          </div>
        ))}
        {/* </Slider> */}
      </div>
      {/* {showPhotoModal && (
     
      <PhotoPreview photoGroup = {data?.photos} />
    )
    } */}
    </>
  );
}
export default MainStoreCard;

