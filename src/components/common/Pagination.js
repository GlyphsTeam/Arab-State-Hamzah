import style from "../../assets/style/common/pagination.module.css";

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


  return (
    <div className={style.pagination}>
      <li
        onClick={() => {
          previousPage();
          scrollPagination();
        }}
      >
        <i className="fas fa-chevron-left"></i>
        {" "}
        Previous
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
        Next {" "}
        <i className="fas fa-chevron-right"></i>
      </li>
    </div>
  );
};

export default Pagination;
