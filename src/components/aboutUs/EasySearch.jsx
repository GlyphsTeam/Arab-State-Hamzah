import style from "../../assets/style/about/easySearch.module.css";
import Slider from "react-slick";
import Title from "../common/Title";
import { LazyLoadImage } from "react-lazy-load-image-component";
const EasySearch = ({ aboutData }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
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

  return (
    <>
      <div className={style.easySearchContainer}>
        <h5>{aboutData?.title}</h5>

          <div className={style.easySearchHr}>
            <hr />
          </div>
        <div className={style.easySearchCardContainer}>
          {aboutData?.model?.map((item, index) => (
            <div className={style.easySearchCard} key={index}>
              <LazyLoadImage src={item?.image} alt="" />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={style.easySearchContainerMobile}>
        {/* <h5>Quick And Easy Search</h5> */}
        <Title data={aboutData?.title}/>
        <div className={style.easySearchCardContainer}>
          <Slider {...settings}>
            {aboutData?.model?.map((item, index) => (
              <div className={style.easySearchCard} key={index}>
                <LazyLoadImage src={item?.image} alt="" />
                <p>{item.title}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default EasySearch;
