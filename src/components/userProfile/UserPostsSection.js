import JobCard from "../../components/common/cards/JobCard";
import HousingCard from "../../components/common/cards/HousingCard";
import ProductCard from "../../components/common/cards/ProductCard";
import style from "../../assets/style/userProfile/userProfile.module.css";
import { useTranslation } from "react-i18next";

function UserPostsSection({ savedData, type, baseUrl }) {
  const [t] = useTranslation();

  return (
    <>
      {type === "house" && (
        <div className={`row `}><p className={style.parProfile}><span dangerouslySetInnerHTML={{ __html: t('My Posts > Houses') }} /></p>

          {savedData?.rents?.length > 0 ? (
            savedData?.rents?.map((item, index) => (
              <HousingCard
                key={index}
                houseData={item}
                isMyPost={true}
                baseUrl={baseUrl}
                type='house'
              />
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
          <p className={style.parProfile}><span dangerouslySetInnerHTML={{ __html: t('My Posts > Jobs') }} /></p>
         {savedData?.jobs.length===0&&<p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>}
          <div className={style.cardContainerJob}>

            {savedData?.jobs.length > 0 ? (
              savedData?.jobs.map((item, index) => (
                <JobCard
                  key={index}
                  jobData={item}
                  isMyPost={true}
                  type='job'
                  baseUrl={baseUrl}
                />
              ))
            ) : (
              <>
              </>
            )}
          </div>
        </div>
      )}

      {type === "product" && (
        <div className={`row mt-5 mb-3 ${style.savedJobRow}`}>
          <p className={style.parProfile}><span dangerouslySetInnerHTML={{ __html: t('My Posts > Products') }} /></p>

          {savedData?.market?.length > 0 ? (
            savedData?.market?.map((item, index) => (
              <ProductCard
                key={index}
                data={item}
                isMyPost={true}
                baseUrl={baseUrl}
                type='market'
              />
            ))
          ) : (
            <>
              <p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>
            </>
          )}
        </div>
      )}
      {type === "blog" && (
        <div className={`row mt-5 mb-3 ${style.savedJobRow}`}>
          <p className={style.parProfile}><span dangerouslySetInnerHTML={{ __html: t('Saved > Blogs') }} /></p>
          {savedData?.blogs?.length > 0 ? (
            savedData?.blogs?.map((item, index) => (
              <ProductCard
                key={index}
                data={item}
                isMyPost={true}
                baseUrl={baseUrl}
                type='blog'
              />
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

export default UserPostsSection;
