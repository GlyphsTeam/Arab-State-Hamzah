import React, { useState, useEffect } from 'react';
import filterStyle from '../assets/style/common/filteredPage.module.css'
import CategoryNav from '../components/common/marketPlace/marketNav/CategoryNav';
import CategorySection from '../components/marketPlace/MarketPlaceCategorySection';
import AdvBanner from '../components/common/banner/Banner';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import HeroMobileButtons from '../components/common/marketPlace/HeroMobileButtons/HeroMobileButtons';
import Alert from '../components/common/alert/Alert';
import ButtonFour from '../components/Button/ButtonFour';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMarketPlace, marketState } from '../redux/Market/market';
import { setLoading } from '../redux/slices/login';
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
    if(marketPlace.marketPlace===null){
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
          <CategorySection  />
        </div>

      </div>

      {
        showAlert && (
          <Alert type="warning" message={t("Please login first.")} showAlert={showAlert} setShowAlert={setShowAlert} time='5000' count={count}
            setCount={setCount} />
        )}
    </>
  )
}

export default MarketPlaceCategory