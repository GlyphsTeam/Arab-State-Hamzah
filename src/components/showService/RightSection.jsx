import React from "react";
import ReactHtmlParser from "html-react-parser";
import style from "../../assets/style/showService/showService.module.css"

const RightSection = ({ data }) => {
console.log("RightSection>>>",data?.web_description)
  return (
    <div>
      <p className={`px-5 ${style.rigthParagraph}`}>
      {ReactHtmlParser(`${data?.web_description}`)}
      </p>
    </div>
  );
};

export default RightSection;
