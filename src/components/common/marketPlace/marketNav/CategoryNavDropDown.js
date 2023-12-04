import React, { useState, useEffect } from "react";
import style from "../../../../assets/style/common/categoryNav.module.css";

function CategoryNavDropDown({
  title,
  id,
  subData,
  index,
  filerAction,
  categoryState,
  mobileFilerAction
}) {
  const [isDropdownOpen, setDropdownOpen] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const handleMouseEnter = (id) => {
    if (isDropdownOpen === id) {
      handleMouseLeave();
    } else {
      setDropdownOpen(id);
    }
  };

  const handleMouseLeave = () => {
    setDropdownOpen();
  };

  useEffect(() => {
    if (window.innerWidth < 1200) {
      setIsMobile(true);
      }
  },[]);

  return (
    <>
    {isMobile? 
      <li
      className={style.categoryLi}
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleMouseEnter(id)}
    >
      <p className={`${ categoryState.activeFilterTitle === title ? style.activeFilter : "" } `}>{title}</p>
      {isDropdownOpen === id && (
        <ul className={style.dropDownUl}>

          {subData?.map((subTitle, index) => (
            <>
            {index === 0 && (
            <li
              className={`${style.subFilterTitle}`}
              key={index}
              onClick={() => filerAction(title, id)}
            >
              All
            </li>
            )}
            <li
              className={`${ categoryState.activeSubFilterTitle === subTitle.name ? style.activeFilter : "" } ${style.subFilterTitle}`}
              key={index}
              onClick={() => filerAction(title, subTitle.main_id, subTitle.name, subTitle.id) }
            >
              {subTitle.name}
            </li>
            </>
          ))}
          
        </ul>
      )}
    </li>
    :
    <li
    className={style.categoryLi}
    onMouseEnter={() => handleMouseEnter(id)}
    onMouseLeave={handleMouseLeave}
    onClick={() => handleMouseEnter(id)}
  >
    <p onClick={() => filerAction(title, id)} className={`${ categoryState.activeFilterTitle === title ? style.activeFilter : "" } `}>{title}</p>
    {isDropdownOpen === id && (
      <ul className={style.dropDownUl}>

        {subData?.map((subTitle, index) => (
          <li
            className={`${ categoryState.activeSubFilterTitle === subTitle.name ? style.activeFilterSub : "" } ${style.subFilterTitle}`}
            key={index}
            onClick={() => filerAction(title, subTitle.main_id, subTitle.name, subTitle.id) }
          >
            {subTitle.name}
          </li>
        ))}
        
      </ul>
    )}
  </li>
    }
  
    </>
    
  );
}

export default CategoryNavDropDown;
