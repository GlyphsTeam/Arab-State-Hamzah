import style from "../../../assets/style/showService/interested.module.css";
import InterestedCard from "./InterestedCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Slider from "react-slick";
function Blog({ data }) {
  const [t] = useTranslation();
 
  let cards = data?.map((item, index) => (
      <InterestedCard
        key={index}
        description={item.description}
        image={item.image}
        title={item.title}
        slug={item.slug}
        id={item.id}
        link={item.link}
      />
  ));
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
  
  const length = data?.length;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: length < 4 ? length : 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: length < 3 ? length : 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 801,
        settings: {
          slidesToShow: length < 2 ? length : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 599,
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
      <div className={style.mainDiv}>
        <div className={`container ${style.blogContainer}`}>
          <Link to="/Blog" className={style.blogTitleLink} >
            <div className={style.titleDiv}>
                <h1 className={style.mainTitle}>{t("You may be interested in")}</h1>
            </div>
          </Link>
          <div className={`row ${style.cardsRowCenter}`}>
          <Slider {...settings}>
            {cards}
            </Slider>
            </div>
        </div>
      </div>
    </>
  );
}
export default Blog;

