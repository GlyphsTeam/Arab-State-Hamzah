import Map from "./Map";
import WorkHours from "./WorkHours";
import style from '../../assets/style/marketProfile.module.css';
import { useTranslation } from "react-i18next";

function StoreMap({ data }) {
  const handleClick = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");

  };
  const [t] = useTranslation();

  return (
    <>
      <div className={style.MarketingMapContainer}>
        <Map lat={data?.locations_lat} lng={data?.locations_lng} />
        <WorkHours data={data} />
        {data?.locations_lat && data?.locations_lng && <p className={style.locationDirectionBtnNew}
          onClick={() => handleClick(data?.locations_lat, data?.locations_lng)}>{t("Get Directions")}</p>
        }
      </div>
    </>
  );
}
export default StoreMap;
