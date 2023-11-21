import React, {useState} from 'react';
import Card from '../common/cards/ProductCardMarket';
import style from '../../assets/style/house/housingCard.module.scss';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/CategoryRedux';
import { setSubCategoryId } from '../../redux/CategoryRedux';
import { setCategoryTitle } from '../../redux/CategoryRedux';
import { setSubCategoryTitle } from '../../redux/CategoryRedux';
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import filterStyle from '../../assets/style/common/filteredPage.module.css'
import Alert from '../../components/common/alert/Alert';

function MarketPlaceProductSection({ categoryData, categoryState, setCategoryState , token}) {
  const [t] = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [isShop, setIsShop] = useState(true);
  const [isMap, setIsMap] = useState(false);

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
      navigate('/market-place/subCategory');
  }
  }
  return (
    <>

<div className={filterStyle.addProductBtnDiv}>
       <div className={`row ${style.smallTitlesPlace}`}>
        {categoryState.activeFilterTitle && (
          <h3 className={style.filterResult}>{categoryState.activeFilterTitle} <i className="far fa-times-circle" onClick={()=> removeFilter('main')}></i></h3>
        )}

        <h3 className={`${style.filterResult} ${style.arrowFilter}`}> &gt; </h3>
       
        {categoryState.activeSubFilterTitle && (
          <h3 className={style.filterResult}> {categoryState.activeSubFilterTitle} <i className="far fa-times-circle" onClick={()=> removeFilter('sub')}></i></h3>
        )}

    </div>
    
    <div  onClick={navigateFunction} className={`mt-3 ${filterStyle.addProductBtn} ${filterStyle.webAddProductBtn}`}>{t('Post your product')}</div>
      </div>
    <div className={`row `}>

        {
        categoryData?.map((item, index)=>
              <Card key={index} isFavorite = {item.favorites} data = {item} type="market"/>
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

export default MarketPlaceProductSection