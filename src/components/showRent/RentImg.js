import style from "../../assets/style/showRentPage.module.css";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function RentImg({rentData}) {
  return (
    <div className={style.imageDiv}>
      <LazyLoadImage
        className={style.imageSize}
        src={rentData?.image}
        alt="rentImage"
      />
    </div>
  );
}
export default RentImg;
