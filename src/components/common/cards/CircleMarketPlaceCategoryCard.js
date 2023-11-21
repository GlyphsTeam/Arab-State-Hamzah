import React from "react";
import style from "../../../assets/style/common/circleCard.module.css";
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../../../redux/CategoryRedux';
import { setSubCategoryId } from '../../../redux/CategoryRedux';
import { setCategoryTitle } from '../../../redux/CategoryRedux';
import { setSubCategoryTitle } from '../../../redux/CategoryRedux';
import {useNavigate} from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function CircleCard({data}) {
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
        localStorage.removeItem('subCategoryTitle');
        navigate('/market-place/subCategory');
    }

  return (
    <>
      <div className={style.mainCircleDiv}>
        <div onClick={() => Navigate(data.id, data.name)} className={style.cardBody}>
          <LazyLoadImage
            className={style.listImg}
            src={`${data.image}`}
            alt={`list ${data.name}`}
          />
          <h3 className={style.cardListTitle}>{data.name}</h3>
        </div>
      </div>
    </>
  );
}

export default CircleCard;
