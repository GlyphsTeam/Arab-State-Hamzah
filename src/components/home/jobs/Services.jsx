import style from "../../../assets/style/homePage/job.module.css";
import Card from "../../common/Card";
import Slider from "react-slick";
import { homeState } from '../../../redux/Home/home'
import { useSelector } from 'react-redux'
function Services() {
  const stateHome = useSelector(homeState);
  const dataServers = stateHome?.homeData?.our_service?.model;
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
            {dataServers?.map((data, index) => (
              <Card data={data} key={index} />
            ))}
          </div>
          <div className={` ${style.cardsRowCenterMobile}`}>
            <Slider {...settings}>
              {dataServers?.map((data, index) => (
                <Card data={data} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
export default Services;
