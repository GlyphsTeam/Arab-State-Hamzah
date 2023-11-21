import React from "react";
import style from "../../../assets/style/subCategorySlider.module.css";
import useAxios from "../../../hooks/useAxiosGet";
import ScrollContainer from "react-indiana-drag-scroll";
import SliderList from "./CardSlider";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function SubCategorySlider({activeIndex , handleClick , id}) {
  const [t] = useTranslation();
  const location = useLocation();
  const idI = location?.state?.id;

  let url = `main-categories/${id}/sub-categories`;
  let [Data] = useAxios(url);
  let [icon] = useAxios(`stores/all-cat/${idI}`);
  let subCategoryList = Data.data; 

  let sliderList = subCategoryList?.map((item) => (
    <SliderList
      activeIndex={activeIndex}
      handleClick={handleClick}
      name={item.name}
      id={item.id}
      key={item.id}
      image={item.image}
    />
  ));
  return (
    <>
      <div className={style.width_slider} style={{ position: "relative" }}>
        <ScrollContainer className="scroll-container">
          <ul className={`${style.slider_ul}`}>
            <li
              
              onClick={() => handleClick(0)}
            >
              <div className={`${activeIndex === 0 ? style.activeLi : style.notActiveLi}`}>
                <LazyLoadImage
                  className={style.subImg}
                  src={icon?.data}
                  alt="iconImage"
                />
              </div>
                <p className={style.subTitle}>{t("All")}</p>
            </li>

            {sliderList}
          </ul>
        </ScrollContainer>
      </div>
    </>
  );
}

export default SubCategorySlider;
