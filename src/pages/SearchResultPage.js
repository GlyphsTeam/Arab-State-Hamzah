import React from "react";
import { useParams } from "react-router-dom";
import style from "../assets/style/searchResult/searchResultPage.module.css";
import SearchResultCard from "../components/searchResult/SearchResultsCard";
import useAxios from "../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import BannerWInfo from "../components/common/banner/BannerWInfo";

function SearchResultPage() {
  const { keyword } = useParams();
  const { type } = useParams();  
  const [t] = useTranslation();

  const url_search = type
    ? `search?keyword=${keyword}&type=${type}`
    : `search?keyword=${keyword}`;

  const [Data] = useAxios(url_search);
  const cardsData = Data?.data;
  const url = `home`;
  const [Data2] = useAxios(url);
  const homeData = Data2?.data;
  

  return (
    <>
      <BannerWInfo data={homeData?.hero} />

    <div className="container pt-4">
      <p>
      {t("Search Result")}
        <span className={style.searchResultPageSpan}>"{keyword}"</span>{" "}
        <span> {t("property found")}</span>{" "}
      </p>

      <SearchResultCard url_search={url_search} cardsData={cardsData} type={type}/>
    </div>
    </>
  );
}

export default SearchResultPage;
