import React from "react";
import Banner from "../components/common/banner/Banner";
import SubCategoryBody from '../components/subCategory/SubCategoryBody';
import DealsCard from '../components/subCategory/DealsCard';
import style from "../assets/style/SubCategory.module.css";
import { useLocation } from "react-router-dom";

function SubCategory() {

  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 2];

  return (
    <>
      <Banner bannerUrl={`stores/slider/${id}`} />
      <div className={`${style.subCategoryMainDiv} pt-3`}>
        <SubCategoryBody advUrl="ads?page=stores" />
      </div>
      <DealsCard />
    </>
  )
}
export default SubCategory;