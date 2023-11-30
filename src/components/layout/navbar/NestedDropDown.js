import React, {useState} from 'react';
import style from "../../../assets/style/layout/navbar.module.scss";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function NestedDropDown({data, serviceLinks}) {
    const [t, i18n] = useTranslation();
    const [isDropdownOpen, setDropdownOpen] = useState();
    let urlId;

    const handleMouseEnter = (title) => {
        setDropdownOpen(title);
      };
    
      const handleMouseLeave = () => {
        setDropdownOpen();
      };
    
  return (
    <>
    <div className={style.nestedDropDownDiv}>
    <ul>
    {serviceLinks?.service_provider?.id && (
        <li className={`${style.nestedDropDownLi}`} onMouseEnter={() => handleMouseEnter('service')} onMouseLeave={handleMouseLeave}> 
            <Link className={style.linkColor} to={`/show-service/${serviceLinks?.service_provider?.id}`}state={({ id: serviceLinks?.service_provider?.id })}>
                {t("Service Providers")}
                <i className={`fas fa-chevron-${t("nestedArrowDir")} ${style.nestedDropDownArrow} ${i18n.language === 'en'? style.nestedDropDownArrowDirEn : style.nestedDropDownArrowDirAr}`}></i>
              </Link>
        </li>
      )}
      {serviceLinks?.shops?.id && (
        <li className={style.nestedDropDownLi} onMouseEnter={() => handleMouseEnter('business')} onMouseLeave={handleMouseLeave}> 
            <Link className={style.linkColor} to={`/show-service/${serviceLinks?.shops?.id }`} state={({ id: serviceLinks?.shops?.id })}>
                {t("Shops")}
                <i className={`fas fa-chevron-${t("nestedArrowDir")} ${style.nestedDropDownArrow} ${i18n.language === 'en'? style.nestedDropDownArrowDirEn : style.nestedDropDownArrowDirAr} `}></i>
              </Link>
        </li>
      )}

      {serviceLinks?.market_place?.id && (

        <li className={style.nestedDropDownLi}> 
            <Link className={style.linkColor} to={`/show-service/${serviceLinks?.market_place?.id}`} state={({ id: serviceLinks?.market_place?.id })}>
                {t("Marketplace")}
              </Link>
        </li>
      )}
      { serviceLinks?.rent?.id && (

        <li className={style.nestedDropDownLi}> 
            <Link className={style.linkColor} to="/rent" state={({ id: serviceLinks?.rent?.id })}>
                {t("Rent")}
              </Link>
        </li>
      )}
      {serviceLinks?.jobs?.id && (
        <li className={style.nestedDropDownLi}> 
            <Link className={style.linkColor} to="/job" state={({ id: serviceLinks?.jobs?.id })}>
                {t("Jobs")}
              </Link>
        </li>
      )}

    </ul>

    {isDropdownOpen && (
                    <ul className={style.subDropDown}
                      onMouseEnter={() => handleMouseEnter(isDropdownOpen)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {data?.map((list, index) => (
                        <div key={index}>
                        {isDropdownOpen === list?.type &&(
                        
                      <li className={style.nestedDropDownLi} onClick={() => {handleMouseLeave();}}>
                        {" "}
                        <Link
                          to={`/SubCategory/${list.name}/${list?.id}/?Page=${
                            list.type === "business" ? "shops" : "service"
                          }`}
                          state={(urlId = { id: list?.id })}
                        >
                          <p className={style.linkColor}>{list.name}</p>
                        </Link>
                      </li>
                      )}
                      </div>

                       ))}
                    </ul>
                  )}
    </div>
    </>
  )
}

export default NestedDropDown