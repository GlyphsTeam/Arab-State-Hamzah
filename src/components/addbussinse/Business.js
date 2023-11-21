import React from 'react'
import style from "../../assets/style/common/bannerWInfo.module.scss";
import FormaddBusiness from './FormaddBusiness';

function Business({baseURL}) {

    return (
        
        <div className={style.mainDiv}>
      <FormaddBusiness baseURL={baseURL}/>

        </div>
      );
}

export default Business
