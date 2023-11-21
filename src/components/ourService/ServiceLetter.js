import React, { useState } from "react";
import style from "../../assets/style/ourService.module.css";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from 'html-react-parser';

function ServiceLetter({ mainServiceData }) {
  const [t] = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const containerClass = expanded
    ? style.blogLetterContainerExpanded
    : style.blogLetterContainer; // CSS class for the container
  const paragraph = expanded
    ? style.blogLetterExpanded
    : style.blogLetterParagraph;
  return (
    <>
      <div className={containerClass}>
        <div className={style.paragraph}>
          <h2>{mainServiceData?.title}</h2>
          <p className={paragraph}>
            {mainServiceData?.web_description && ReactHtmlParser(`${mainServiceData?.web_description}`)}
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
export default ServiceLetter;
