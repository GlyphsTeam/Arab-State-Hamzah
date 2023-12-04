import { useEffect } from "react";
import Slider from "react-slick";
import style from "../../../assets/style/homePage/city.module.css";
import CityCard from "./CityCard";
      export default function AutoPlay({data}) {
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
        
     
        const CardList = data?.map((item) => (
          
          <div
            key={item.id}
            // to={`/SubCategory`}
            // state={(urlId = { id: item?.id })}
            className={style.navLink}
          >
            <CityCard name={item.name} id={item.id} image={item.image} />
          </div>
          
        ));

        let slidesToShowNum = data?.length;
        // let slidesToShowNum = Math.round( data?.length/ 4);
        if (slidesToShowNum > 4) {
          slidesToShowNum = 4;
        }

        let mainCategorySlide = slidesToShowNum;

      useEffect(() => {
        mainCategorySlide = slidesToShowNum;
      }, [slidesToShowNum]
      );

        const settings = { 
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        dots: false,
        infinite: true, 
        slidesToShow: 4,
        // slidesToShow: slidesToShowNum  ?  mainCategorySlide : 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 3500,
        // cssEase: "linear",
        pauseOnHover: true,
        // rtl: dir,
          responsive: [
            {
                breakpoint: 1200,
                settings: {
                  infinite: true,
                  // slidesToShow: 3,
                  slidesToShow: slidesToShowNum > 3  ?  3 : mainCategorySlide,
                  slidesToScroll: 1,
                }
              },
            {
              breakpoint: 1024,
              settings: {
                infinite: true,
                // slidesToShow: 3,
                slidesToShow: slidesToShowNum > 3  ?  3 : mainCategorySlide,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                infinite: true,
                // slidesToShow: 2,
                slidesToShow: slidesToShowNum > 2  ?  2 : mainCategorySlide,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                infinite: true,
                // slidesToShow: 2,
                slidesToShow: slidesToShowNum > 2  ?  2 : mainCategorySlide,
                slidesToScroll: 1,
                autoplaySpeed: 3000

              }
            },
            {
              breakpoint: 380,
              settings: {
                infinite: true,
                // slidesToShow: 2,
                slidesToShow: slidesToShowNum > 2  ?  2 : mainCategorySlide,
                slidesToScroll: 1,
                autoplaySpeed: 3000
              }
            }
          ]
        };
        return (
          <div className={`${style.AllCategoryContainer} mt-5`}>
            <Slider className="categoryHomePage" {...settings}>
                {CardList}
                {CardList}
                </Slider>
          </div>
        );
      }









