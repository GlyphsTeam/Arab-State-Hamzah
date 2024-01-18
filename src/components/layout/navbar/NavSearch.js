import React, { useState } from "react";
import style from "../../../assets/style/layout/navbar.module.scss";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function NavSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };
  function handleKeyDown(event) {
    if (event.key === "Enter" && event.target.value !== "") {
      handleSearchSubmit(event.target.value);
    }
  }
  const handleSearchSubmit = (event) => {
    setShowInput(!showInput);
    if (event !== "") {
      navigate(`/search-result/${event}`);
      setSearchQuery("");
    }
  }


  // const handleSearchIconClick = () => {
  // };





  return (
    <div className={style.navSearchDiv}>
      {showInput && (
        <input
          className={style.searchText}
          type="text"
          placeholder={t("Search Anything")}
          onChange={handleSearchInput}
          onKeyDown={handleKeyDown}
          value={searchQuery}
        />
      )}
      <i
        className={`fa fa-search ${style.searchIcon}`}
        onClick={() => { handleSearchSubmit(searchQuery) }}
      ></i>
    </div>
  );
}
export default NavSearch;
