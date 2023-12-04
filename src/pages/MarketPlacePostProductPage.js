import LeftAuth from "../components/common/auth/AuthImage";
import style from "../assets/style/postProduct/postProduct.module.css";
import MarketPlacePostSection from "../components/marketPlace/MarketPlacePostSection";
import Banner from "../components/common/banner/Banner";
import { useTranslation } from "react-i18next";

function PostRentPage({logo}) {
  const [t] = useTranslation();
  return (
    <>
     <Banner bannerUrl="sliders/page?page=App\Models\MarketPlacePage"/>
      <div className={`container ${style.registerPage} ${style.ContactUsPage}`}>
        <div className={`row`}>
          <div
            className={`d-flex align-items-center flex-column pt-5 col-sm-12 col-md-12 col-lg-5`}
          >
            <p className={style.postProductTitle}> {t("Post your product")}</p>
            <LeftAuth logo={logo}/>
          </div>

          <div className={`${style.rightAuth} col-sm-12 col-md-12 col-lg-7`}>
            <MarketPlacePostSection />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostRentPage;
