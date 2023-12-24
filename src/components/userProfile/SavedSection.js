import JobCard from "../../components/common/cards/JobCard";
import ProductCard from "../../components/common/cards/SavedProduct";
import StoreCard from "../../components/common/cards/StoreCard";
import HousingCard from "../../components/common/cards/HousingCard";
import style from "../../assets/style/userProfile/userProfile.module.css";
import { useTranslation } from "react-i18next";

function SavedSection({ savedData, type }) {
  const [t] = useTranslation();
  return (
    <>
      {type === "store" && (
        <div className={`row`}>
          <p className={style.parProfile}>Saved &gt; products</p>
          {savedData?.length > 0 ? (
            savedData?.map((item, index) => (
              <StoreCard
                key={index}
                isFavorite={item.favorites}
                storeData={item}
              />
            ))
          ) : (
            <>
              <p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>
            </>
          )}
        </div>
      )}
      {type === "house" && (
        <div className={`row `}>
          <p className={style.parProfile}>Saved &gt; accomodation</p>
          {savedData?.length > 0 ? (
            savedData?.map((item, index) => (
              <HousingCard key={index} houseData={item} />
            ))
          ) : (
            <>
              <p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>
            </>
          )}
        </div>
      )}

      {type === "job" && (
        <div className={`row mb-3 ${style.savedJobRow}`}>
          <p className={style.parProfile}>Saved &gt; jobs</p>
          <div className={style.cardContainerJob}>

            {savedData?.length > 0 ? (
              savedData?.map((item, index) => (
                <JobCard key={index} jobData={item} />
              ))
            ) : (
              <>
                <p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>
              </>
            )}
          </div>
        </div>
      )}

      {type === "product" && (
        <div className={`row mb-3 ${style.savedJobRow}`}>
          <p className={style.parProfile}>Saved &gt; products</p>
          {savedData?.length > 0 ? (
            savedData?.map((item, index) => (
              <ProductCard key={index} data={item} />
            ))
          ) : (
            <>
              <p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SavedSection;
