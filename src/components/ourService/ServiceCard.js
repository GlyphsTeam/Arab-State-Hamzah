import style from "../../assets/style/ourService.module.css";
import { useTranslation } from "react-i18next";

import { React } from "react";
import MainRowCard from "../common/MainRowCard";

function ServiceCard({ serviceCardData }) {
  const [t ] = useTranslation();

  return (
    <>
      <h2 className={style.popularHeader}>{t("Our Services")}</h2>
      <div className={`${style.columnCardsContainer} pt-4`}>
        <MainRowCard data={serviceCardData} />
      </div>
    </>
  );
}
export default ServiceCard;
