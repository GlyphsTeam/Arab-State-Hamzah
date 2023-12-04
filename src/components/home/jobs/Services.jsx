import style from "../../../assets/style/homePage/job.module.css";
import Card from "../../common/Card";
import Slider from "react-slick";
function Services({ data }) {
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
    ],
  };
  return (
    <>
      <div className={style.mainDiv}>
        <div className={` ${style.blogContainer}`}>
          <div className={` ${style.cardsRowCenterDesktop}`}>
            {data?.map((data , index) => (
              <Card data={data} key={index}/>
            ))}
          </div>
          <div className={` ${style.cardsRowCenterMobile}`}>
            <Slider {...settings}>
              {data?.map((data , index) => (
                <Card data={data} key={index}/>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
export default Services;
