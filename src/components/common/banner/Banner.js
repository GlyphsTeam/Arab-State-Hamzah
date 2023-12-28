import style from "../../../assets/style/common/bannerTwo.module.css";
import Slider from "react-slick";
import useAxios from "../../../hooks/useAxiosGet";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Banner({ bannerUrl }) {
  let url = useLocation();
  const path = url.pathname;
  const { id } = useParams();
  const [t, i18n] = useTranslation();
  const [Data] = useAxios(`${bannerUrl}`);
  const getPageName = () => {
    switch (path) {
      case "/Category/0":
        return "";
      case "/Jobs/Job":
        return "";
      case "/Jobs/Rent":
        return "";
      case "/About":
        return t("about us");
      case "/User-Guide":
        return t("User Guide");
      case "/Blog":
        return "";
      case "/Our-Service":
        return t("Our Services");
      default:
        return "";
    }
  };
  console.log("Data>>>Market",Data)
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    // fade: true,
    arrows: false,
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
    <div className={`${style.categoryContainer} `}>
      {/* <Slider {...settings}> */}
        {Data?.data?.map((item, index) => (
          <Link to={item.url} key={index}>
            <div className={i18n.language === "en" ? style.categoryContainerDiv : style.categoryContainerDivAr} >
              <LazyLoadImage
                src={item?.image}
                alt="ad"
               
                className={
                  `
                  ${path === "/Blog" || path === `/Show-User-Guide/${id}`
                    ? style.categoryImage
                    : style.categoryImageFilter
                  }
                `
                }

              />
              <div
                className={
                  path === "/Blog"
                    ? style.categoryHeaderHidden
                    : path === "/Jobs/Job" || path === "/Jobs/Rent"
                      ? style.categoryHeaderTextJobRent
                      : style.categoryHeaderText
                }
              >
                <p>{getPageName()}</p>
              </div>
            </div>
          </Link>
        ))}
      {/* </Slider> */}
    </div>
  );
}
export default Banner;
