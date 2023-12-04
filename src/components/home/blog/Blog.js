import style from "../../../assets/style/homePage/blog.module.css";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import Slider from "react-slick";
function Blog({ data }) {
  const handleChangePage = () => {
    window.scrollTo(0, 0); 
  };
  let cards = data?.model?.map((item, index) => (
      <BlogCard
        key={index}
        description={item.description}
        image={item.image}
        title={item.title}
        slug={item.slug}
        id={item.id}
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
        breakpoint: 801,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
        <div className="container">
          <Link to="/Blog" className={style.blogTitleLink} onClick={handleChangePage}>
            {/* <h1 className={style.blogTitle}>{t("Blog")}</h1> */}
            <div className={style.titleDiv}>
                <p className={style.littleTitle}>{data?.sub_title}</p>
                <h1 className={style.mainTitle}>{data?.title}</h1>
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

