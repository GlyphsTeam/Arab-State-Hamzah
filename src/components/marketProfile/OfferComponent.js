import React from "react";
import style from "../../assets/style/marketProfile.module.css";
import { useTranslation } from "react-i18next";

function OfferComponent({ data }) {
  const [t, i18n] = useTranslation();

  return (
    <div className="mt-5 pt-4">
      <div className={style.offerSection}>
      {data?.offers?.length > 0 && (
        <h2 className={style.offerTitle}>{t("What we offer")} </h2>
      )}

        {data?.offers.map((item, index) => (
          <div key={index} className={style.offerCards}>
            <li>{item.title}</li>
          </div>
        ))}
      </div>
    </div>
  );
}
export default OfferComponent;
