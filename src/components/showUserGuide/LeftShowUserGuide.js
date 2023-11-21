import React from "react";
import style from "../../assets/style/show_blog.module.css";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function LeftShowBlog({ Data, showUserGuide }) {
  const leftShowBlogData = Data?.data?.blog?.gallery;
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
    autoplay: true,
    autoplaySpeed: 5000,
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
      <Slider {...settings}>
        {leftShowBlogData?.slice(1).map((item, index) => (
          <div key={index}>
            <div>
              {item && (
                <LazyLoadImage key={item.id} className={style.showBlogImage} src={item} alt="blogData"/>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
export default LeftShowBlog;
