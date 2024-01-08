import style from "../../assets/style/showRentPage.module.css";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useTranslation } from "react-i18next";
function RentImg({ rentData }) {
  const [t, i18n] = useTranslation();
  return (
    <div className={style.imageDiv}>
      <LazyLoadImage
        className={i18n.language === "en" ? style.imageSize : style.imageSizeAr}
        src={rentData?.image}
        alt="rentImage"
      />
    </div>
  );
}
export default RentImg;
