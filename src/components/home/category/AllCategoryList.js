import { useEffect } from "react";
import Slider from "react-slick";
import style from "../../../assets/style/homePage/categoryList.module.css";
import CategoryCard from "./CategoryCard";
import { Link } from 'react-router-dom';
import Title from "../../common/Title";

      export default function AutoPlay({data, type, dir ,urlId}) {
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
        
        let redirectType = '';
        if (type === 'shops'){
          redirectType = 'business'
        }
        else{
          redirectType = 'service'
        }
        const CardList = data?.map((item) => (
          (item.type === redirectType &&
          <Link
            key={item.id}
            to={`/SubCategory/${item?.name?.replaceAll(' ', '-')}/${item?.id}/?Page=${type}`}
            state={(urlId = { id: item?.id })}
            className={style.navLink}
          >
            <CategoryCard name={item.name} id={item.id} image={item.image} />
          </Link>
          )
        ));

        let slidesToShowNum = Math.round( data?.length/ 4);
        if (slidesToShowNum > 4) {
          slidesToShowNum = 4;
        }

        let mainCategorySlide = slidesToShowNum + 1;

      useEffect(() => {
        mainCategorySlide = slidesToShowNum;
      }, [slidesToShowNum]
      );

        const settings = { 
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        dots: false,
        infinite: true,
        slidesToShow: 5,
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
                  slidesToShow: 4,
                  slidesToScroll: 1,
                }
              },
            {
              breakpoint: 1024,
              settings: {
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplaySpeed: 3000

              }
            },
            {
              breakpoint: 380,
              settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplaySpeed: 3000
              }
            }
          ]
        };
        return (
          <div className={style.AllCategoryContainer}>
           <Title title="our service"/>

            <Slider className="categoryHomePage" {...settings}>
                {CardList}
                </Slider>
          </div>
        );
      }









