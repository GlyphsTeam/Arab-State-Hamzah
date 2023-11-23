import React from "react";
import style from "../../assets/style/common/title.module.css"
const Title = ({data}) => {
  return (
    <div className={style.titleDiv}>
      <h5 className={style.title}>{data}</h5>
    </div>
  );
};

export default Title;
