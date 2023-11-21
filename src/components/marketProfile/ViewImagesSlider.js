import React from "react";
import style from "../../assets/style/marketProfile.module.css";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ViewImagesSlider({ photoGroup, setCloseModal }) {
  const closeModal = (e) => (
    (document.body.style.overflow = "auto"), setCloseModal(false)
  );
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`${className}`} style={{ ...style }} onClick={onClick} />
    );
  }
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
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
    // width: 90%;
    // margin: 0 5%;
    // position: fixed;
    // top: 0;
    // z-index: 2;
    // background: rgb(0 0 0 / 0.5);
    <div className={style.mainViewPhotoDiv}>
      <div className={`${style.viewPhotoContainer} pt-3`}>
        <i onClick={closeModal} className="far fa-times-circle"></i>
        <Slider {...settings}>
          {photoGroup.map((item, index) => (
            <div key={item.id} className={style.subViewPhotoDiv}>
              {/* <i className="far fa-times-circle"></i> */}
              <LazyLoadImage className={style.viewPhotoImg} src={item.image} alt="ad" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
export default ViewImagesSlider;