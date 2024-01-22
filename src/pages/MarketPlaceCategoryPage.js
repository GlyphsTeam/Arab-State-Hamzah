import React, { useState, useEffect, lazy, Suspense } from 'react';
import filterStyle from '../assets/style/common/filteredPage.module.css'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMarketPlace, marketState } from '../redux/Market/market';
import { setLoading } from '../redux/slices/login';
import { Helmet } from 'react-helmet'
const CategoryNav = lazy(() => import("../components/common/marketPlace/marketNav/CategoryNav"));
const CategorySection = lazy(() => import("../components/marketPlace/MarketPlaceCategorySection"));
const AdvBanner = lazy(() => import("../components/common/banner/Banner"));
const HeroMobileButtons = lazy(() => import("../components/common/marketPlace/HeroMobileButtons/HeroMobileButtons"));
const Alert = lazy(() => import("../components/common/alert/Alert"));
const ButtonFour = lazy(() => import("../components/Button/ButtonFour"));

function MarketPlaceCategory() {
  const [t] = useTranslation();
  const marketPlace = useSelector(marketState)

  const navigate = useNavigate();
  const token = localStorage.getItem('arab_user_token');
  const dispatch = useDispatch();

  const [openMobileCategory, setOpenMobileCategory] = useState(false);

  const [categoryState, setCategoryState] = useState({ mainId: '', subId: '', activeFilterTitle: '', activeSubFilterTitle: '' })

  const [showAlert, setShowAlert] = useState(false);
  const [count, setCount] = useState();
  const showAlertFunction = () => {
    setShowAlert(true);
    setCount(4);
  }

  const navigateFunction = () => {
    if (token) {
      navigate("/market-place/new-product");
    }
    else {
      showAlertFunction();
    }
  }




  let customApi = `filter-market?main_id=${categoryState.mainId}&category_id=${categoryState.subId}`;

  useEffect(() => {
    customApi = `filter-market?main_id=${categoryState.mainId}&category_id=${categoryState.subId}`;
    getMarketData(customApi);
  }, []);



  const getMarketData = async (url) => {
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (marketPlace.marketPlace === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {

        headers: { "Authorization": `Bearer ${token}` },

      }).then((res) => {
        dispatch(setMarketPlace(res.data?.data))
        dispatch(setLoading(false));
      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }

  }


  return (
    <>
      <Helmet>
        <title>marketPlace</title>
        <meta name='description' content='this page for marketPlace'/>
      </Helmet>
      <Suspense fallback={<p>Loading...</p>}>
        <div className={filterStyle.bannerMarketPlace}>
          <AdvBanner bannerUrl="sliders/page?page=App\Models\MarketMainCategoryPage" />

          <HeroMobileButtons setOpenMobileCategory={setOpenMobileCategory} />

        </div>

        <CategoryNav openMobileCategory={openMobileCategory} setOpenMobileCategory={setOpenMobileCategory} categoryState={categoryState} setCategoryState={setCategoryState} />

        <div className={`row ${filterStyle.pageContainer}`}>




          <div className={`col-sm-12 col-md-12 col-lg-12 ${filterStyle.pageRow}`}>



            <div className={filterStyle.addProductBtnDiv} onClick={navigateFunction}>
              <h1 className='px-4 mt-3'>{t('market category')}</h1>
              <ButtonFour>
                {t('Post your product')}

              </ButtonFour>
            </div>
            <CategorySection />
          </div>

        </div>

        {
          showAlert && (
            <Alert type="warning" message={t("Please login first.")} showAlert={showAlert} setShowAlert={setShowAlert} time='5000' count={count}
              setCount={setCount} />
          )}
      </Suspense>
    </>
  )
}

export default MarketPlaceCategory