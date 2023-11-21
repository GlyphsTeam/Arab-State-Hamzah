import React from "react";
import Map from "./Map";
import WorkHours from "./WorkHours";
import style from '../../assets/style/marketProfile.module.css';

function StoreMap({data}) {
  return (
    <>
    <div className={style.MarketingMapContainer}>
      <Map lat={data?.locations_lat} lng={data?.locations_lng} />
      <WorkHours data={data} />
    </div>
    </>
  );
}
export default StoreMap;
