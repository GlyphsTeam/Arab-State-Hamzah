import React, { useState } from "react";
import style from "../../assets/style/Blog.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

function BlogSearch(props) {
  const [t] = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearchSubmit(event.target.value);
    }
  }
  const handleSearchSubmit = (event) => {
    if (event !== '') {
      navigate(`/search-result/${event}/blog`);
      setSearchQuery("");
    }
  }
  return (
    <div className={style.searchContainer}>
      <div className={style.blogSearchField}>
        <IoSearch className={style.searchIcon}/>
        <input
          type="search"
          placeholder={t("Search...")}
          // onChange={props.handleChange}
          onChange={handleSearchInput}
          onKeyDown={handleKeyDown}
          value={searchQuery}
        />
      </div>
    </div>
  );
}
export default BlogSearch;