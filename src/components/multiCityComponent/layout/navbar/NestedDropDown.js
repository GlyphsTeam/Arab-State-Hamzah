import React, {useState} from 'react';
import style from "../../../assets/style/layout/navbar.module.scss";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function NestedDropDown({data}) {
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
        <li className={`${style.nestedDropDownLi}`} onMouseEnter={() => handleMouseEnter('service')} onMouseLeave={handleMouseLeave}> 
            <Link className={style.linkColor} to="/Category/services">
                {t("Service Provider")}
                <i className={`fas fa-chevron-${t("nestedArrowDir")} ${style.nestedDropDownArrow} ${i18n.language === 'en'? style.nestedDropDownArrowDirEn : style.nestedDropDownArrowDirAr}`}></i>
              </Link>
        </li>
        <li className={style.nestedDropDownLi} onMouseEnter={() => handleMouseEnter('business')} onMouseLeave={handleMouseLeave}> 
            <Link className={style.linkColor} to="/Category/shops">
                {t("Shops")}
                <i className={`fas fa-chevron-${t("nestedArrowDir")} ${style.nestedDropDownArrow} ${i18n.language === 'en'? style.nestedDropDownArrowDirEn : style.nestedDropDownArrowDirAr} `}></i>
              </Link>
        </li>
        <li className={style.nestedDropDownLi}> 
            <Link className={style.linkColor} to="/market-place">
                {t("Market Place")}
              </Link>
        </li>
        <li className={style.nestedDropDownLi}> 
            <Link className={style.linkColor} to="/Rent">
                {t("Rent")}
              </Link>
        </li>
        <li className={style.nestedDropDownLi}> 
            <Link className={style.linkColor} to="/Job">
                {t("Jobs")}
              </Link>
        </li>

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
                          to={`/SubCategory/${list.name}/?Page=${
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