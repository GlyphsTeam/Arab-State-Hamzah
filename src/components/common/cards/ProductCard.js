import React, { useState, useEffect } from 'react';
import style from '../../../assets/style/common/productCard.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ProductCard({ data, isMyPost, baseUrl, type }) {
  const [t, i18n] = useTranslation();
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const token = localStorage.getItem("arab_user_token");
  const [isFav, setIsFav] = useState(data?.save_job);
  let favoriteIcon = isFav ? 'fas fa-bookmark' : 'far fa-bookmark';

  const [count, setCount] = useState(4);
  let urlId;

  let url;
  if (type === "market") {
    url = '/Show-Product'
  }
  else {
    url = '/show-blog';
  }
  useEffect(() => {
    if (data.saved) {
      setIsFav(true);
    }
    else {
      setIsFav(false);
    }
  }, [data.saved])

  const deleteProduct = (id) => {
    try {
      fetch(`https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0/user/market/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        method: "DELETE",
      }).then(() => {
        deleteDiv(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setShowAlertDelete(true);
      setCount(4);
    }
  };
  const handlerDeleteBlog = async (id, type) => {
    if (type === 'blog') {
      const token = localStorage.getItem('arab_user_token')
      let formData = new FormData();
      formData.append('id', id);
      let backend_url = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0/favorite/blog`
      await axios.post(backend_url, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        deleteDiv(id)
      }).catch((err) => console.log(err))
    }
    else {
      deleteProduct(id);
    }
  }

  const deleteDiv = (id) => {
    const element = document.getElementById(`${id}`);
    element.parentNode.removeChild(element);
  };

  return (
    <>
      <div id={data.id} className='flexClass' style={{ display: 'flex' }}>
        <Link to={`${url}/${data.slug}/${data?.id}`} state={(urlId = { id: data?.id })} className={style.wrapper} >
          <div className={style.productImg}>
            <LazyLoadImage className={i18n.language === 'en' ? style.enImgBorder : style.arImgBorder} src={data.image} alt='productImage' />
          </div>
        </Link>

        <div className={style.productInfo}>
          <div className={style.productText}>
            <div className={style.trashContainer}>
              <h1>{data.title}</h1>
              {!data?.is_user_post ? <i className={`${favoriteIcon} ${style.favIconColor}`} onClick={() => handlerDeleteBlog(data.id, type)}></i> : <></>}
            </div>
            <h2>{data.main_category_name} {" > "} {data.category_name}</h2>
            <p>{data.description}</p>
            <i className={`fas fa-trash-alt ${style.deleteIcon}`} onClick={() => handlerDeleteBlog(data.id)}
            ></i>
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
                <p className={style.published} onClick={() => handlerDeleteBlog(data.id)} >{type === 'blog' ? '' : t('Published')}</p>
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

export default ProductCard