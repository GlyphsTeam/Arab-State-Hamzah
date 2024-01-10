import React, { useState, useEffect } from "react";
import style from "../../../assets/style/homePage/categoryList.module.css";
import AllCategoryList from "./AllCategoryList";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { homeState } from '../../../redux/Home/home';
import { useSelector } from 'react-redux'
function CategoryList() {
  const [t] = useTranslation();
  const [isWeb, setIsWeb] = useState(false)
  const stateHome = useSelector(homeState);
  const stateCategory = stateHome?.homeData?.category;


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
                  src={stateCategory?.image}
                  alt="img-Catge"
                />
              </div>
              <div className={`col-lg-9`}>
                <p className={style.subCategorySmallTitle}>{stateCategory?.title?.shops}</p>

                <AllCategoryList
                  data={stateCategory?.shops}
                  type="shops"
                  dir={true}
                  sliderToShow={4}
                />
                <br />
                <p className={style.subCategorySmallTitle}>{stateCategory?.title?.services}</p>

                <AllCategoryList
                  data={stateCategory?.services}
                  type="services"
                  dir={false}
                  sliderToShow={4}
                />
              </div>
            </div>
            :
            <>
              {
                stateCategory && (
                  <>
                    <p className={style.subCategorySmallTitle}>{t("Shops")}</p>

                    <AllCategoryList
                      data={stateCategory?.shops}
                      type="shops"
                      dir={true}
                      sliderToShow={4}
                    />
                    <br />
                    <br />
                    <p className={style.subCategorySmallTitle}>{t("Services")}</p>

                    <AllCategoryList
                      data={stateCategory?.services}
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
