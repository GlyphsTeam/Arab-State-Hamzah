import style from "../../assets/style/marketProfile.module.css";
import { useTranslation } from "react-i18next";
function WorkHours({ data }) {
  const [t] = useTranslation();
  // const handleClick = (lat, lng) => {
  //   const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  //   window.open(url, "_blank");

  // };
  return (
    <div className={`${style.workHoursSection} container col-12`}>
      <div className={`${style.workHoursLeft} col-lg-3 col-md-6 col-sm-6`}>
        <i className="far fa-clock"></i>
        {/* <div className={style.workHoursStatus}>{t("open")}</div> */}
      </div>
      {data?.worktime?.map((item, index) => (
        <div
          className={`${style.workHoursRight} col-lg-12 col-md-6 col-sm-6`}
          key={index}
        >
          {item.type === "r" ? (
            <p className={`${style.workHoursRightDays} col-4`}>
              {item.day_from} - {item.day_to}
            </p>
          ) : (
            <p className={`${style.workHoursRightDays} col-4`}>
              {item.day_from}
            </p>
          )}
          <p className={`col-5 justify-content-${t('timeDir')} ${style.timeDirection}`}>
            {item.start_time} <br /> {item.end_time}
          </p>
          {item.status ? (
            <p className={`col-3 ${style.openWorkingHours}`}>{t('Open')}</p>
          ) : (
            <p className={`col-3 ${style.closeWorkingHours}`}>{t('Closed')}</p>
          )}
        </div>
      ))}
      <div className={style.mapButton}>
        {/* <p className={style.locationName}>
          <strong>Address:</strong>
          {data?.locations_address}
        </p> */}

      </div>
    </div>
  );
}
export default WorkHours;