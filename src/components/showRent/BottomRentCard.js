import style from "../../assets/style/showRentPage.module.css";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";

function BottomRentCard({ rentData }) {
  const [t, i18n] = useTranslation();

  function SampleNextArrow(props) {

    const { onClick } = props;
    return (
      <div className={style.customNextArrow} onClick={onClick}>
              <MdOutlineArrowForwardIos/>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className={style.customPrevArrow} onClick={onClick}>
              <MdOutlineArrowBackIosNew/>
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
      <div className={style.rentCardsContainerMainMobile}>
        <Slider {...settings}>
          {rentData?.gallery?.slice(1).map((item, index) => (
            <div key={index} className={style.rentCardsContainerMobileDiv}>
              <LazyLoadImage className={style.rentCardsContainerMobile} src={item} alt="rentCard"/>
            </div>
          ))}
        </Slider>
      </div>
      <div className={style.rentCardMain }>
        {rentData?.gallery?.slice(1).map((item, index) => (
          <LazyLoadImage key={index} className={i18n.language === "en" ?  style.rentCardsContainer :  style.rentCardsContainerAr } alt="red" src={item} />
        ))}
      </div>
    </>
  );
}
export default BottomRentCard;
