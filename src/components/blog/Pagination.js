import React from "react";
import style from "../../assets/style/pagination.module.css";
import { useTranslation } from "react-i18next";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  previousPage,
  nextPage,
  setActiveIndex,
  activeIndex,
  scrollPagination
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const [t] = useTranslation();

  return (
    <div className={style.pagination}>
      <li
        onClick={() => {
          previousPage();
          scrollPagination();
        }}
      >
        <i className={`fas ${t("fa-angle-double-left")} `}></i>
      </li>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            className={`${style.paginationBtn} ${activeIndex === index ? style.activeLi : ""}`}
            onClick={() => {
              setCurrentPage(page);
              setActiveIndex(index);
              scrollPagination();
            }}
          >
            {page}
          </button>
        );
      })}
      <li
        onClick={() => {
          nextPage();
          scrollPagination();
        }}
      >
        <i className={`fas ${t("fa-angle-double-right")}`}></i>
      </li>
    </div>
  );
};

export default Pagination;
