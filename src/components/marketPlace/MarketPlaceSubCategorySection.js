
import React, {useState} from 'react';
import Card from '../common/cards/SquareMarketPlaceSubCategoryCard';
import style from '../../assets/style/house/housingCard.module.scss';
import filterStyle from '../../assets/style/common/filteredPage.module.css'
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/CategoryRedux';
import { setSubCategoryId } from '../../redux/CategoryRedux';
import { setCategoryTitle } from '../../redux/CategoryRedux';
import { setSubCategoryTitle } from '../../redux/CategoryRedux';
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from '../../components/common/alert/Alert';

function HouseSection({ categoryData, categoryState, setCategoryState , token,image_all_cat}) {
  const [t] = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const removeFilter = (e) => {
    if(e === 'main'){
      setCategoryState({...categoryState, activeFilterTitle:'', mainId:'', activeSubFilterTitle:'', subId:''})
      dispatch(setCategoryId(''));
      dispatch(setSubCategoryId(''));
      dispatch(setCategoryTitle(''));
      dispatch(setSubCategoryTitle(''));
      localStorage.removeItem('mainCategoryId');
      localStorage.removeItem('subCategoryId');
      localStorage.removeItem('mainCategoryTitle');
      localStorage.removeItem('subCategoryTitle');
      navigate('/market-place');
  }else if(e === 'sub'){
      setCategoryState({...categoryState, activeSubFilterTitle:'', subId:''})
      dispatch(setSubCategoryId(''));
      dispatch(setSubCategoryTitle(''));
      localStorage.removeItem('subCategoryId');
      localStorage.removeItem('subCategoryTitle');
  }
  }


  const allItems = {main_id: localStorage.getItem('mainCategoryId'), main_category : localStorage.getItem('mainCategoryTitle'), id : 'all', name : t('All'), image: image_all_cat}

  return (
    <>
       {/* <div className={`row `}>
        <div className={`col-6 ${shopStyle.menu} ${isShop? shopStyle.activeMenue : '' }`} onClick={() => menuAction()}>
          <h2>Shops</h2>
        </div>
        <div className={`col-6 ${shopStyle.menu} ${isMap? shopStyle.activeMenue : '' }`} onClick={() => menuAction()}>
          <h2>Map</h2>
        </div>
       </div> */}

<div className={filterStyle.addProductBtnDiv}>
       <div className={`row px-5`}>
        {categoryState.activeFilterTitle && (
          <h3 className={style.filterResult}>{categoryState.activeFilterTitle} <i className="far fa-times-circle" onClick={()=> removeFilter('main')}></i></h3>
        )}
        {/* {categoryState.activeSubFilterTitle && (
          <h3 className={style.filterResult}>{categoryState.activeSubFilterTitle} <i className="far fa-times-circle" onClick={()=> removeFilter('sub')}></i></h3>
        )} */}
    </div>


        <div onClick={navigateFunction} className={`mt-3 ${filterStyle.addProductBtn} ${filterStyle.webAddProductBtn}`}   > {t('Post your product')}</div>
      </div>


    <div className={filterStyle.circleRow}>
        <Card data = {allItems} /> 
        {
        categoryData?.map((item, index)=>
              <Card key={index} isFavorite = {item.favorites} data = {item} />
        )
        }

    </div>
     {
      showAlert && (
    <Alert type="warning" message={t("Please login first.")} showAlert = {showAlert} setShowAlert={setShowAlert} time = '5000' count={count}
            setCount={setCount}/>
     )}
    </>
  )
}

export default HouseSection