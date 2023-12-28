import React, { useState, useEffect } from 'react';
import filterStyle from '../assets/style/common/filteredPage.module.css'
import CategoryNav from '../components/common/marketPlace/marketNav/CategoryNav';
import useAxios from '../hooks/useAxiosGet';
import CategorySection from '../components/marketPlace/MarketPlaceCategorySection';
import AdvBanner from '../components/common/banner/Banner';
import { useTranslation } from "react-i18next";
import {  useNavigate } from 'react-router-dom';
import HeroMobileButtons from '../components/common/marketPlace/HeroMobileButtons/HeroMobileButtons';
import Alert from '../components/common/alert/Alert';
import ButtonFour from '../components/Button/ButtonFour';
function MarketPlaceCategory() {
  const [t] = useTranslation();

  const navigate = useNavigate();
  const token = localStorage.getItem('arab_user_token');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [openMobileCategory, setOpenMobileCategory] = useState(false);

  const [categoryState, setCategoryState] = useState({mainId: '', subId: '', activeFilterTitle: '', activeSubFilterTitle : ''  })
  
  const [showAlert, setShowAlert] = useState(false);
  const [count, setCount] = useState();
  const showAlertFunction = () => {
    setShowAlert(true);
    setCount(4);
  }

  const navigateFunction = () => {
    if (token){
      navigate("/market-place/new-product");
    }
    else{
      showAlertFunction();
    }
  }



let customApi = `filter-market?main_id=${categoryState.mainId}&category_id=${categoryState.subId}`;
      
useEffect(() => {
  customApi =  `filter-market?main_id=${categoryState.mainId}&category_id=${categoryState.subId}`;
}, []); 

  const [Data] = useAxios(customApi);
  const categoryData = Data?.data;
  const total = Data?.total;

  const scrollPagination = () => {
  };


  return (
    <>
    <div className={filterStyle.bannerMarketPlace}>
        <AdvBanner bannerUrl="sliders/page?page=App\Models\MarketMainCategoryPage"/>

        <HeroMobileButtons setOpenMobileCategory={setOpenMobileCategory}/>

    </div>

        <CategoryNav openMobileCategory = {openMobileCategory} setOpenMobileCategory = {setOpenMobileCategory} categoryState = {categoryState} setCategoryState = {setCategoryState} />

    <div className={`row ${filterStyle.pageContainer}`}>


   

      <div className={`col-sm-12 col-md-12 col-lg-12 ${filterStyle.pageRow}`}>

  

      <div className={filterStyle.addProductBtnDiv} onClick={navigateFunction}>
        <h1 className='px-4 mt-3'>{t('market category')}</h1>
        <ButtonFour>
        {t('Post your product')}

        </ButtonFour>     
      </div>
        <CategorySection limit = {limit} categoryData={categoryData} total={total}  setActiveIndex = {setActiveIndex} activeIndex={activeIndex} page={page} setPage = {setPage} scrollPagination={scrollPagination} categoryState = {categoryState} setCategoryState = {setCategoryState} />
      </div>

    </div>

    {
      showAlert && (
    <Alert type="warning" message={t("Please login first.")} showAlert = {showAlert} setShowAlert={setShowAlert} time = '5000' count={count}
            setCount={setCount}/>
     )}
    </>
  )
}

export default MarketPlaceCategory