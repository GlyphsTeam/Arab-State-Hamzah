import React, { useState, useEffect } from 'react';
import style from '../../../assets/style/common/productCard.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import useFetch from '../../../hooks/useFetch';
function ProductCardMarket({ data, isMyPost, baseUrl, type }) {
  const [t, i18n] = useTranslation();
  const token = localStorage.getItem("arab_user_token");
  const [isFav, setIsFav] = useState(data?.save_job);
  const [send, setSend] = useState(false);

  let formData = new FormData();
  formData.append('id', data?.id);
  const [Res] = useFetch('favorite/market', formData, send);

  let favoriteIcon = isFav ? 'fas fa-bookmark' : 'far fa-bookmark';

  let urlId;
  console.log("dataProduct<<<", data)
  console.log("baseUrl",baseUrl)
  let url='/Show-Product';

  useEffect(() => {
    if (data.saved) {
      setIsFav(true);
    }
    else {
      setIsFav(false);
    }
  }, [data.saved])

  const addToFavorite = (id) => {
    if (token) {
      setIsFav(!isFav);
      setSend(true);
      setTimeout(() => {
        setSend(false);
      }, 100);
    } else {
   
    }
  }
  return (
    <>
      <div id={data.id} className='flexClass' style={{display:'flex'}}>
        <Link to={`${url}/${data.slug}/${data?.id}`} state={(urlId = { id: data?.id })} className={style.wrapper} >
          <div className={style.productImg}>
            <LazyLoadImage className={i18n.language === 'en' ? style.enImgBorder : style.arImgBorder} src={data.image} alt='productImage' />
          </div>
          </Link>

          <div className={style.productInfo}>
            <div className={style.productText}>
              <div className={style.trashContainer}>
                <h1>{data.title}</h1>
                {!data?.is_user_post ? <i className={`${favoriteIcon} ${style.favIconColor}`} onClick={(()=>addToFavorite(data?.id))} ></i> : <></>}
              </div>
              <h2>{data.main_category_name} {" > "} {data.category_name}</h2>
              <p>{data.description}</p>
            </div>
    
            <div className={`${i18n.language === 'en' ? style.enProductPriceBtn : style.arProductPriceBtn} ${style.productPriceBtn}`}>
              <p className={style.productPrice}><span>{data.price}</span>{type === 'blog' ? '' : '$'}</p>
              <p className={style.productDate}>{data.created_at}</p>
            </div>
          </div>

        {isMyPost && (
          <div className={`row ${i18n.language === 'en' ? style.deleteProductEn : style.deleteProductAr}`}>
            <div className={style.approvalDiv}>
              {data.status ? (
                <p className={style.waitingApproval}>{t('Waiting for approval')}</p>
              ) : (
                <p className={style.published}  >{type === 'blog' ? '' : t('Published')}</p>
              )}
              <p>
                {" "}

              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductCardMarket