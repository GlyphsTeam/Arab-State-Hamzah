import React from "react";
import ReactHtmlParser from "html-react-parser";
import style from "../../assets/style/showService/showService.module.scss"

const RightSection = ({ data }) => {

  return (
    <div>
      <p className={`px-5 ${style.rigthParagraph}`}>
        {data?.web_description && ReactHtmlParser(`${data?.web_description}`)}
      </p>
    </div>
  );
};

export default RightSection;
