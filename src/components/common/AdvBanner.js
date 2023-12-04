import style from "../../assets/style/common/advBanner.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function AdvBanner({ ADV_left, ADV_Right }) {
  return (
    <div className={style.conatiner}>
      <div className={` row `}>
        {/* <Slider {...settings}> */}
        <div className={`col-lg-12 col-md-12 col-sm-12`}>
          {ADV_left?.slice(0, 1).map((item, index) => (
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
