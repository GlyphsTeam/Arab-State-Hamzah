import React from "react";
import style from "../../../assets/style/homePage/city.module.css";
import AllCityList from "./AllCityList";
import { useTranslation } from "react-i18next";
function CategoryList({ data }) {
  const [t] = useTranslation();



  // console.log(data);
  return (
    <>
      <div className={style.mainCategoryDiv}>
        <div className={`container ${style.container}`}>



          <div className="row">

            <div className={`col-lg-12 mt-5`}>
              <p className={style.subCategorySmallTitle}>{t('Cities where there are Arab communities!')}</p>

              <AllCityList
                data={data}
                dir={true}
                sliderToShow={4}
              />

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
export default CategoryList;
