import React from "react";
import style from "../../assets/style/showProduct/showProductGallery.module.css";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ShowProductGallery({ data }) {

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
    <div className={style.mainGalleryDiv}>
      <div className={style.mainImageDiv}>
        <Slider {...settings}>
          {data?.gallery.map((item, index) => (
            <div key={index}>
              {" "}
              <LazyLoadImage src={item} alt="gallery"/>
            </div>
          ))}
        </Slider>
      </div>
      <div className={style.subGalleryDiv}>
        {data?.gallery.map((item, index) => (
          <LazyLoadImage key={index} src={item} alt="gallery"/>
        ))}
      </div>
      {/* {isModalOpen && <ShowImage images={images} setIsModalOpen={setIsModalOpen} activeIndex={activeIndex}/>} */}
    </div>
  );
}

export default ShowProductGallery;
