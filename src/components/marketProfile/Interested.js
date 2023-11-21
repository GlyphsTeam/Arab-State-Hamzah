import React from "react";
import style from "../../assets/style/marketProfile.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Interested({ data }) {
  const [t, i18n] = useTranslation();
  let urlId;

  return (
    <div className={`${style.mainSection} row`}>
      <div className={`${style.subLastSection} col-10 mt-5`}>
        {data?.similar && (
          <>
            <h2 className={`mt-5 pb-3 ${style.interestedTitle}`}>
              {t("You may be interested in")}{" "}
            </h2>
            <div className={`${style.lastSection}`}>
              {data?.similar?.map((item, index) => (
                <div
                  key={index}
                  className={`col-3 ${style.interestedCardContainer}`}
                >
                  <Link
                    to={`/MarketProfile/${item?.slug}`}
                    state={(urlId = { id: item?.id })}
                  >
                    <LazyLoadImage src={item.image} alt="imageInter"/>
                    <p className={style.interested}>{item.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Interested;
