import ShowProductDescription from "../components/productShow/ShowProductDescription";
import SubProductInformation from "../components/productShow/SubProductInformation";
import style from "../assets/style/showProduct/showProduct.module.css";
import { useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxiosGet";
import ShowProductImages from "../components/productShow/ShowProductImages";
import MainProductInfo from "../components/productShow/MainProductInfo";
import Interested from "../components/productShow/Interested";
import Header from "../components/marketPlace/MarketHeader";

function ProductShowPage() {
  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length-1];
  const url = `market/web/show/${id}`;
  const [Data] = useAxios(url);
  const showProductData = Data?.data?.item;
  const ProductData = Data?.data;
  return (
    <div className={style.mainShowProductColor}>

        <Header data = {ProductData?.slider} />
      <div className="container pt-5">
        <div className={`row ${style.productspace}` }>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <ShowProductImages data={showProductData} />
            <div className={style.infoDesktop}>
            <ShowProductDescription showProductData={showProductData} />
            <SubProductInformation showProductData={showProductData} />
            </div>
            <div className={style.infoMobile}>
            <MainProductInfo showProductData={showProductData} />
            </div>

          </div>
          <div className={`${style.verticalLineStyle} col-lg-1`}/>
          <div className="col-lg-5 col-md-12 col-sm-12 ">
            <div className={style.infoDesktop}>
            <MainProductInfo showProductData={showProductData} />
            </div>
            <div className={style.infoMobile}>
            <ShowProductDescription showProductData={showProductData} />
            <SubProductInformation showProductData={showProductData} />
            </div>
            <Interested/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShowPage;
