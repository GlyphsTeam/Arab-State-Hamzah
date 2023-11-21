import React from "react";
import CategoryHeader from "../components/common/banner/Banner";
import Category from '../components/category/Category';
import DealsCard from '../components/subCategory/DealsCard';
import style from "../assets/style/SubCategory.module.css";

function CategoryPage({baseURL}){
return(
    <>
     <CategoryHeader bannerUrl="sliders/page?page=App\Models\StoreMainCategoryPage"/>
     <div className={`${style.subCategoryMainDiv} pt-3` }>
       <Category baseURL = {baseURL}/>
     </div>
     <DealsCard/>
     </>
)
}
export default CategoryPage;