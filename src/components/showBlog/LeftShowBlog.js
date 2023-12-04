import style from "../../assets/style/show_blog.module.css";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function LeftShowBlog({   Data, showBlogData }) {
  const leftShowBlogData = Data?.data?.blog?.gallery;
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
      {/* {leftShowBlogData?.map((item) => (
          <div key={item.id} >
            <div >
            {item &&
              <img key={item.id} className={style.showBlogImage} src={item} />
            }
            </div>
   
        </div>
      ))} */}
    <Slider {...settings}>
   {leftShowBlogData?.slice(1).map((item, index) => (
          <div key={index} >
            <div >
            {item &&
              <LazyLoadImage key={item.id} className={style.showBlogImage} src={item} alt="leftShow" />
            }
            </div>
        </div>
      ))}
 </Slider>
    </>
  );
}
export default LeftShowBlog;
