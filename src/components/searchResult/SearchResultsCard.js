import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchStyle from "../../assets/style/searchResult/searchResultPage.module.css";
import SearchCard from "./SearchCard";
import { useTranslation } from "react-i18next";

export default function SearchResultsCard({ cardsData, url_search, type }) {
  const [t] = useTranslation();
  const [activeFilter, setActiveAnchor] = useState();
  let urlId;

  // check if no data found for any category
  const noDataFound =

  cardsData?.rents?.length === 0 &&
  cardsData?.jobs?.length === 0 &&
  cardsData?.blogs?.length === 0 &&
  cardsData?.stores?.length === 0 &&
  cardsData?.guide?.length === 0 &&
  cardsData?.market?.length === 0;



  return (
    <div
      className={`row d-flex justify-content-between ${searchStyle.searchContainer}`}
    >
      {noDataFound ? (
        <div className={`text-center w-100 ${searchStyle.noResultDiv} `}>
          <p>{t("No results found")}</p>
        </div>
      ) : (
        <>
         {type? 
        ""
        :
          <div className={searchStyle.searchAnchor}>
            <a
              href="#store"
              onClick={() => setActiveAnchor(1)}
              className={`${searchStyle.anchorElement} ${
                activeFilter === 1 ? searchStyle.activeAnchor : ""
              }`}
            >
              {t("Stores")}
            </a>
            <a
              href="#rent"
              onClick={() => setActiveAnchor(2)}
              className={`${searchStyle.anchorElement} ${
                activeFilter === 2 ? searchStyle.activeAnchor : ""
              }`}
            >
              {t("Rents")}
            </a>
            <a
              href="#job"
              onClick={() => setActiveAnchor(3)}
              className={`${searchStyle.anchorElement} ${
                activeFilter === 3 ? searchStyle.activeAnchor : ""
              }`}
            >
              {t("Jobs")}
            </a>
            <a
              href="#blog"
              onClick={() => setActiveAnchor(4)}
              className={`${searchStyle.anchorElement} ${
                activeFilter === 4 ? searchStyle.activeAnchor : ""
              }`}
            >
              {t("Blogs")}
            </a>
            <a
              href="#product"
              onClick={() => setActiveAnchor(5)}
              className={`${searchStyle.anchorElement} ${
                activeFilter === 5 ? searchStyle.activeAnchor : ""
              }`}
            >
              {t("Products")}
            </a>
            <a
              href="#guide"
              onClick={() => setActiveAnchor(6)}
              className={`${searchStyle.anchorElement} ${
                activeFilter === 6 ? searchStyle.activeAnchor : ""
              }`}
            >
              {t("User Guide")}
            </a>
          </div>
           }
         
          {cardsData?.rents?.length > 0 && (
            <div className="pt-2">
              <h3>{t("Rent Result")}</h3>
              <div
                id="rent"
                className={`${searchStyle.searchResultCards} ${searchStyle.searchResultTitleScroll}`}
              >
                {cardsData?.rents?.map((rent) => (
                  <div
                    className={`${searchStyle.SearchResultsLink}  col-lg-3 col-md-6 col-sm-4`}
                  >
                    <Link to={`/Rent/${rent.slug}/${rent?.id}`} state={(urlId = { id: rent?.id })}>
                      <SearchCard item={rent} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          { cardsData?.jobs?.length > 0 && (
            <>
              <h3>{t("Jobs Result")}</h3>

              <div
                id="job"
                className={`${searchStyle.searchResultCards} ${searchStyle.searchResultTitleScroll}`}
              >
                {cardsData?.jobs?.map((job) => (
                  <div
                    className={`${searchStyle.SearchResultsLink}  col-lg-3 col-md-6 col-sm-4`}
                  >
                    <Link to={`/Job/${job.slug}/${job?.id}`} state={(urlId = { id: job?.id })}>
                      <SearchCard item={job} />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}

          { cardsData?.blogs?.length > 0 && (
            <>
              <h3>{t("Blog Result")}</h3>

              <div
                id="blog"
                className={`${searchStyle.searchResultCards} ${searchStyle.searchResultTitleScroll}`}
              >
                {cardsData?.blogs?.map((blog) => (
                  <div
                    className={`${searchStyle.SearchResultsLink}  col-lg-3 col-md-6 col-sm-4`}
                  >
                    <Link to={`/Show-Blog/${blog.slug}/${blog?.id}`} state={(urlId = { id: blog?.id })}>
                      <SearchCard item={blog} />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
          {cardsData?.stores?.length > 0 && (
            <>
              <h3>{t("Store Result")}</h3>
              <div
                id="store"
                className={`${searchStyle.searchResultCards} ${searchStyle.searchResultTitleScroll}`}
              >
                {cardsData?.stores?.map((store) => (
                  <div
                    className={`${searchStyle.SearchResultsLink}  col-lg-3 col-md-6 col-sm-4`}
                  >
                    <Link to={`/MarketProfile/${store.slug}/${store?.id}`} state={(urlId = { id: store?.id })}>
                      <SearchCard item={store} />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
          {cardsData?.guide?.length > 0 && (
            <>
              <h3>{t("User Guide Result")}</h3>
              <div
                id="guide"
                className={`${searchStyle.searchResultCards} ${searchStyle.searchResultTitleScroll}`}
              >
                {cardsData?.guide?.map((guide) => (
                  <div
                    className={`${searchStyle.SearchResultsLink}  col-lg-3 col-md-6 col-sm-4`}
                  >
                    <Link to={`/Show-User-Guide/${guide.slug}/${guide.id}` } state={(urlId = { id: guide?.id })}>
                      <SearchCard item={guide} />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
