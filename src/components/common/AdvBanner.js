import style from "../../assets/style/common/advBanner.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useSelector } from 'react-redux';
import { homeState } from '../../redux/Home/home'
function AdvBanner() {
   const stateHome = useSelector(homeState);
   console.log("Homs>>>",stateHome)
  return (
    <div className={style.conatiner}>
      <div className={` row `}>
        {/* <Slider {...settings}> */}
        <div className={`col-lg-12 col-md-12 col-sm-12`}>
          {stateHome?.homeData?.advertisements_left?.slice(0, 1).map((item, index) => (
            <Link to={item.url} key={index}>
              <div className={style.categoryContainerDiv}>
                <LazyLoadImage src={item.image} alt="ad" />
              </div>
            </Link>
          ))}
        </div>

        <div className={`col-lg-4 col-md-12 col-sm-12`}>
        </div>
      </div>
    </div>
  );
}
export default AdvBanner;
