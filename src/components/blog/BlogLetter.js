import React, { useState } from "react";
import style from "../../assets/style/Blog.module.css";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "html-react-parser";
import { useSelector } from 'react-redux';
import { blogState } from '../../redux/Blog/blog'

function BlogLetter() {
  const [t] = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const blogData = useSelector(blogState);
  const blog = blogData?.blogData?.main;
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const containerClass = expanded
    ? style.blogLetterContainerExpanded
    : style.blogLetterContainer; // CSS class for the container
  const paragraph = expanded
    ? style.blogLetterParagraph
    : style.blogLetterExpanded;
  return (
    <>
      <div className={containerClass}>
        <div className={style.paragraph}>
          <h2>{blog?.title}</h2>
          <p className={paragraph}>
            {blog?.web_description &&
              ReactHtmlParser(`${blog?.web_description}`)}
          </p>
        </div>
        <div className={style.seeMoreButton}>
          <button onClick={toggleExpand}>
            {expanded ? t("See Less") : t("See More")}
          </button>
        </div>
      </div>
    </>
  );
}
export default BlogLetter;
