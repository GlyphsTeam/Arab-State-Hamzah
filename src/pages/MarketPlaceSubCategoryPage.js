import React, { useState, useEffect } from "react";
import filterStyle from "../assets/style/common/filteredPage.module.css";
import useAxios from "../hooks/useAxiosGet";
import SubCategorySection from "../components/marketPlace/MarketPlaceSubCategorySection";
import AdvBanner from "../components/common/banner/Banner";
import Header from "../components/marketPlace/MarketHeader";
import CategoryNav from "../components/common/marketPlace/marketNav/CategoryNav";
import HeroMobileButtons from "../components/common/marketPlace/HeroMobileButtons/HeroMobileButtons";

function CategoryPage() {
     
  const categoryId = localStorage.getItem("mainCategoryId")
    ? localStorage.getItem("mainCategoryId")
    : "";
  const subCategoryId = localStorage.getItem("subCategoryId")
    ? localStorage.getItem("subCategoryId")
    : "";
  const categoryTitle = localStorage.getItem("mainCategoryTitle")
    ? localStorage.getItem("mainCategoryTitle")
    : "";
  const subCategoryTitle = localStorage.getItem("subCategoryTitle")
    ? localStorage.getItem("subCategoryTitle")
    : "";

  
  const [activeIndex, setActiveIndex] = useState(0);

  const [categoryState, setCategoryState] = useState({
    mainId: categoryId,
    subId: subCategoryId,
    activeFilterTitle: categoryTitle,
    activeSubFilterTitle: subCategoryTitle,
  });

  let customApi = `filter-market?main_id=${categoryState.mainId}`;

  useEffect(() => {
    customApi = `filter-market?main_id=${categoryState.mainId}`;
  }, []);


  const token = localStorage.getItem('arab_user_token');
  const [Data] = useAxios(customApi);
  const categoryData = Data?.data;
  const total = Data?.total;

  const url = `main-market/show/${categoryState.mainId}`;
  const [Data2] = useAxios(url);
  const categoryData2 = Data2?.data;
  const scrollPagination = () => {};

  const [openMobileCategory, setOpenMobileCategory] = useState(false);

  return (
    <>
      <div className={filterStyle.bannerMarketPlace}>
      <AdvBanner bannerUrl="sliders/page?page=App\Models\MarketMainCategoryPage"/>
      <Header data = {categoryData2?.slider} />
        <HeroMobileButtons setOpenMobileCategory={setOpenMobileCategory} />
      </div>
      <CategoryNav
        openMobileCategory={openMobileCategory}
        setOpenMobileCategory={setOpenMobileCategory}
        categoryState={categoryState}
        setCategoryState={setCategoryState}
        token = {token}
      />

      <div className={`row ${filterStyle.pageContainer}`}>
        <div className={`col-sm-12 col-md-12 col-lg-12 ${filterStyle.pageRow}`}>
          <SubCategorySection
            categoryData={categoryData}
            total={total}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            scrollPagination={scrollPagination}
            categoryState={categoryState}
            setCategoryState={setCategoryState}
            token = {token}
            image_all_cat = {categoryData2?.image_all_cat}
          />
        </div>
      </div>

      {/* <Interested type='store' /> */}
    </>
  );
}

export default CategoryPage;
