import React from 'react';
import Accordion from './Accordion';
import style from '../../../assets/style/common/filteredPage.module.css'
import useAxios from '../../../hooks/useAxiosGet';
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
function Filter({ filterType, filterTitle,categoryState, setCategoryState }) {
  const [t, i18n] = useTranslation();



  const navigate = useNavigate()

  // let url = `filter/${filterType}`;
  let url = `main-market/categories`;
  const [Data] = useAxios(url);
  // console.log(url);

  const filerActionCategory = (mainTitle, main_Id, subTitle, sub_Id) => {

    if(subTitle){

      if(categoryState.activeSubFilterTitle === subTitle){
        setCategoryState({...categoryState,activeFilterTitle: mainTitle, mainId: main_Id,activeSubFilterTitle: '', subId: ''});
        // dispatch(setCategoryId(main_Id));
        // dispatch(setSubCategoryId(''));
        // dispatch(setCategoryTitle(mainTitle));
        // dispatch(setSubCategoryTitle(''));
        localStorage.setItem('mainCategoryId', main_Id);
        localStorage.removeItem('subCategoryId');
        localStorage.setItem('mainCategoryTitle', mainTitle);
        localStorage.removeItem('subCategoryTitle');
        navigate('/market-place/subcategory');
      }else{
        setCategoryState({...categoryState,activeFilterTitle: mainTitle, mainId: main_Id,activeSubFilterTitle: subTitle, subId: sub_Id});
        // dispatch(setCategoryId(main_Id));
        // dispatch(setSubCategoryId(sub_Id));
        // dispatch(setCategoryTitle(mainTitle));
        // dispatch(setSubCategoryTitle(subTitle));
        localStorage.setItem('mainCategoryId', main_Id);
        localStorage.setItem('subCategoryId', sub_Id);
        localStorage.setItem('mainCategoryTitle', mainTitle);
        localStorage.setItem('subCategoryTitle', subTitle);
        navigate('/market-place/products');
      }

    }else{
      if(categoryState.activeFilterTitle === mainTitle){
        setCategoryState({...categoryState,activeFilterTitle: '', mainId: '',activeSubFilterTitle: '', subId: ''});
        // dispatch(setCategoryId(''));
        // dispatch(setSubCategoryId(''));
        // dispatch(setCategoryTitle(''));
        // dispatch(setSubCategoryTitle(''));
        localStorage.removeItem('mainCategoryId');
        localStorage.removeItem('subCategoryId');
        localStorage.removeItem('mainCategoryTitle');
        localStorage.removeItem('subCategoryTitle');
        navigate('/market-place');
      }else{
        setCategoryState({...categoryState,activeFilterTitle: mainTitle, mainId: main_Id, activeSubFilterTitle:'', subId:''});
        // dispatch(setCategoryId(main_Id));
        // dispatch(setSubCategoryId(''));
        // dispatch(setCategoryTitle(mainTitle));
        // dispatch(setSubCategoryTitle(''));
        localStorage.setItem('mainCategoryId', main_Id);
        localStorage.setItem('mainCategoryTitle', mainTitle);
        localStorage.removeItem('subCategoryId');
        localStorage.removeItem('subCategoryTitle'); 
        navigate('/market-place/subCategory');
      }
    }

  }


  return (
    <>
    <div className={style.mainFilterDiv}>

            <h1 className={style.filterTitle}>{t('filterTitle')}</h1>

                {/* Accordion */}
                
                {
                Data?.data?.map((item, index) => (
                       <div key={index} className={style.accordionDiv}>
                        <Accordion index={index} title={item.name} id = {item.id} subData= {item.categories} filerAction = {filerActionCategory} categoryState = {categoryState} setCategoryState = {setCategoryState} filterType = {filterType} />
                       </div>
                    ))
                }


    </div>

    </>
  )
}

export default Filter