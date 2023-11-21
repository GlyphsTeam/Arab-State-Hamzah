import React from 'react';
import style from '../../../assets/style/marketPlace/categoryCard.module.scss'
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../../../redux/CategoryRedux';
import { setSubCategoryId } from '../../../redux/CategoryRedux';
import { setCategoryTitle } from '../../../redux/CategoryRedux';
import { setSubCategoryTitle } from '../../../redux/CategoryRedux';
import {useNavigate} from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function HouseCard({categoryData}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const Navigate = (id, name) => {
        dispatch(setCategoryId(id));
        dispatch(setSubCategoryId(''));
        dispatch(setCategoryTitle(name));
        dispatch(setSubCategoryTitle(''));
        localStorage.setItem('mainCategoryId', id);
        localStorage.removeItem('subCategoryId');
        localStorage.setItem('mainCategoryTitle', name);
        localStorage.removeItem('subCategortTitle');
        navigate('/market-place/subCategory');
    }

  return (
    <div className={`col-lg-3 col-md-4 col-sm-6 ${style.mainCategoryCard}`}>
        <div onClick={() => Navigate(categoryData.id, categoryData.name)} className={`${style.categoryCardBody}`}>
            <LazyLoadImage className={style.categoryImage} src={categoryData.image} alt='catergoryImage' />

            <div className={`row ${style.categoryMainInfoBox}`}>
                <div className={`col-12 ${style.categoryInfo}`}>
                    <h4 className={style.categoryTitle}>{categoryData.name}</h4>
                    <p className={style.categoryDescription}>{categoryData.type}</p>
                </div>

            </div>

        </div>
    </div>
  )
}

export default HouseCard