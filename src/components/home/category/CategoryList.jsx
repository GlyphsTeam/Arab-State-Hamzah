import React, { useState, useEffect } from "react";
import style from "../../../assets/style/homePage/categoryList.module.css";
import AllCategoryList from "./AllCategoryList";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { homeState } from '../../../redux/Home/home';
import { useSelector } from 'react-redux'
function CategoryList({ data }) {
  const [t] = useTranslation();
  const [isWeb, setIsWeb] = useState(false)
  const stateHome = useSelector(homeState);
  


  useEffect(() => {
    if (window.innerWidth > 992) {
      setIsWeb(true)
    }
  }, [window.innerWidth]);


  return (
    <>
      {/* <HomeTitle title={t("Our Services")} /> */}
      <h2 className={style.titleServerice}>{t("Our Services")}</h2>
      <div className={style.mainCategoryDiv}>
        <div className={`container ${style.container}`}>

          {isWeb ?

            <div className="row">
              <div className={`col-lg-3 ${style.imgDiv}`}>
                <LazyLoadImage
                  className={style.categoryImg}
                  src={data?.image}
                  alt="img-Catge"
                />
              </div>
              <div className={`col-lg-9`}>
                <p className={style.subCategorySmallTitle}>{data?.title?.shops}</p>

                <AllCategoryList
                  data={data?.shops}
                  type="shops"
                  dir={true}
                  sliderToShow={4}
                />
                <br />
                <p className={style.subCategorySmallTitle}>{data?.title?.services}</p>

                <AllCategoryList
                  data={data?.services}
                  type="services"
                  dir={false}
                  sliderToShow={4}
                />
              </div>
            </div>
            :
            <>
              {
                data && (
                  <>
                    <p className={style.subCategorySmallTitle}>{t("Shops")}</p>

                    <AllCategoryList
                      data={data?.shops}
                      type="shops"
                      dir={true}
                      sliderToShow={4}
                    />
                    <br />
                    <br />
                    <p className={style.subCategorySmallTitle}>{t("Services")}</p>

                    <AllCategoryList
                      data={data?.services}
                      type="services"
                      dir={false}
                      sliderToShow={4}
                    />
                  </>
                )
              }
            </>
          }
        </div>
      </div>
    </>
  );
}
export default CategoryList;
