import React from "react";
import ReactHtmlParser from "html-react-parser";
import style from "../../assets/style/showService/showService.module.css"

const RightSection = ({ data }) => {
console.log("data>>>",data)
  return (
    <div>
      <p className={`px-5 ${style.rigthParagraph}`}>
        {data?.description}
      </p>
    </div>
  );
};

export default RightSection;
