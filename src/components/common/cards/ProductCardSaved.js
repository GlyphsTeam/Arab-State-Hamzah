import React, { useState, useEffect } from 'react';
import style from '../../../assets/style/common/prodyctCardSaved.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useLocation } from 'react-router-dom'
import ReactHtmlParser from 'html-react-parser'
import useFetch from "../../../hooks/useFetch";
import Alert from "../../common/alert/Alert";

function ProductCard({ data, isMyPost, baseUrl, type }) {
    const [t, i18n] = useTranslation();
    const [send, setSend] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const token = localStorage.getItem("arab_user_token");
    const [isFav, setIsFav] = useState(data?.save_job);
    let favoriteIcon = isFav ? 'fas fa-bookmark' : 'far fa-bookmark';
    const location = useLocation();
    const pathName = location.pathname;
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
    let formData = new FormData();

    formData.append("id", data?.id);
    const [Res] = useFetch('favorite/market', formData, send);
    const addToFavorite = () => {
        if (token) {
            setIsFav(!isFav);
            setSend(true);
            setTimeout(() => {
                setSend(false);
            }, 100);
        } else {
            setShowAlert(true);
            setCount(4);
        }
    };




    return (
        <>
            <div id={data.id} className={style.flexClass} >
                <Link to={`${url}/${data.slug}/${data?.id}`} className={style.wrapper} >
                    <div className={style.productImg}>
                        <LazyLoadImage className={i18n.language === 'en' ? style.enImgBorder : style.arImgBorder} src={data.image} alt='productImage' />
                    </div>
                </Link>

                <div className={style.productInfo}>
                    <div className={style.productText}>
                        <div className={style.trashContainer}>
                            <h1>{data.title}</h1>
                            {!data?.is_user_post ? <i className={`${favoriteIcon} ${style.favIconColor}`} onClick={() => addToFavorite()}></i> : <></>}
                        </div>
                        <h2>{data.main_category_name} {" > "} {data.category_name}</h2>
                        <p>{ReactHtmlParser(data.description)}</p>
                    </div>

                    <div className={`${pathName.includes("/my-product") ? i18n.language === 'en' ? style.myProductPost : style.myProductPostAr : i18n.language === 'en' ? style.enProductPriceBtn : style.arProductPriceBtn} ${style.productPriceBtn}`}>
                        <p className={style.productPrice}><span>{data.price}</span>{type === 'blog' ? '' : '$'}</p>
                        <p className={style.productDate}>{data.created_at}</p>

                    </div>
                </div>

                {isMyPost && (
                    <div className={`row ${i18n.language === 'en' ? style.deleteProductEn : style.deleteProductAr}`}>
                        <div className={style.approvalDiv}>

                            <p>
                                {" "}

                            </p>
                        </div>
                    </div>
                )}
            </div>
            {showAlert && (
                <Alert
                    type="warning"
                    message="Please login first."
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                    count={count}
                    setCount={setCount}
                />
            )}
        </>
    )
}

export default ProductCard