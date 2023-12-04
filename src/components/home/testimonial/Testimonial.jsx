import Slider from "react-slick";
import style from "../../../assets/style/homePage/testimonial.module.scss";
import Card from "./TestimonialCard"
function Testimonial(data) {

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

    const list = [
        {
            image: require(`../../../assets/Images/home/job_rent.png`),
            name: "name1",
            message: "message1"
        },
        {
            image: require(`../../../assets/Images/home/job_rent.png`),
            name: "name2",
            message: "message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2 message2"
        },
        {
            image: require(`../../../assets/Images/home/job_rent.png`),
            name: "name3",
            message: "message3"
        },
    ]

    const CardList = list?.map((item, index) => (
        
        <Card key={index} index={index} image={item.image} name={item.name} message={item.message} />
        
      ));

      const settings = { 
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1500,
      autoplaySpeed: 4000,
      // cssEase: "linear",
      pauseOnHover: true,
      // rtl: dir,
        responsive: [
          {
              breakpoint: 1200,
              settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
          {
            breakpoint: 1024,
            settings: {
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplaySpeed: 3000

            }
          },
          {
            breakpoint: 380,
            settings: {
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplaySpeed: 3000
            }
          }
        ]
      };


  return (

    <>

    <div>
        <div className={style.titleDiv}>
            <h1 className={style.mainTitle}>Our satisfied users</h1>
        </div>

        <div className={style.mainCardsDiv}>
            <Slider className="" {...settings}>
                {CardList}
            </Slider>
        </div>


    </div>
        
    </>
  )
}

export default Testimonial