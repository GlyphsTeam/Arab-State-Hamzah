import style from "../../../assets/style/homePage/aboutHome.module.css";
import AboutCard from "./AboutCard";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
function AboutHome({aboutData}){
  const [t] = useTranslation();
      let cards = aboutData?.map((item, index) =>
        <AboutCard key={index} order={index} description = {item.description} image = {item.image} title = {item.title} id = {item.id}/>
      )
      const settings = {
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 3,
          // nextArrow: <SampleNextArrow />,
          // prevArrow: <SamplePrevArrow />,
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
    return(
        <>
        <div className={style.mainDiv}>
        <div className="container">
          <div className={style.titleDiv}>
          <p className={style.littleTitle}>{t("Get To Know Us")}</p>
          <h1 className={style.mainTitle}>{t("about us")}</h1>
          </div>
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
export default AboutHome;