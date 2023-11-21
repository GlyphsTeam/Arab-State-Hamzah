import React, { useState } from "react";
// import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
// import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import style from "../../../assets/style/layout/navbar.module.scss";

export default function MenuDropDown({
  dropDownInfo,
  menuElements,
  title,
  handleCloseModal,
  type,
  data,
  categoryType,
}) {
  const [isDropdownOpen, setDropdownOpen] = useState();

  const handleMouseEnter = (title) => {
    // if (isDropdownOpen === title) {
    //   handleMouseLeave();
    // } else {
    setDropdownOpen(title);
    // }
  };

  const handleMouseLeave = () => {
    setDropdownOpen();
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <div variant="contained" {...bindTrigger(popupState)}>
            {dropDownInfo}
          </div>
          <Menu {...bindMenu(popupState)}>
            {menuElements?.map((item, index) => (
              <div key={index}>
                {item.type === "click" ? (
                  <Link to={item?.path} className={style.linkColor}>
                    <MenuItem
                      className={style.listColor}
                      onClick={() => {
                        // handleChange(item?.info);
                        popupState.close();
                        // onClick={handleCloseModal}
                        handleCloseModal();
                      }}
                    >
                      {item?.title}
                    </MenuItem>
                  </Link>
                ) : (
                  <div className={style.categoriesMainDropdown}>
                    <Link
                      to={item?.path}
                      key={index}
                      className={style.profileDropdown}
                    >
                      <MenuItem
                        className={style.listColor}
                        onClick={() => {
                          popupState.close();
                          handleCloseModal();
                        }}
                        onMouseEnter={() => handleMouseEnter(item?.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item?.title}
                      </MenuItem>
                    </Link>
                  </div>
                )}

                {isDropdownOpen === item?.title && (
                  <ul
                    className={style.subDropDown}
                    onMouseEnter={() => handleMouseEnter(item?.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {data?.map((list, index) => (
                      <div key={index}>
                        {item?.categoryType === list?.type && (
                          <li
                            onClick={() => {
                              popupState.close();
                              handleCloseModal();
                              handleMouseLeave();
                            }}
                          >
                            {" "}
                            <Link
                              to={`/SubCategory/${list.name}/${list.id}/?Page=${
                                list.type === "business" ? "shops" : "service"
                              }`}
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
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
