import style from "../../assets/style/common/bannerWInfo.module.css";
import FormaddBusiness from './FormaddBusiness';

function Business({baseURL, isLoaded }) {
    return (
        <div className={style.mainDiv}>
      <FormaddBusiness baseURL={baseURL} isLoaded={isLoaded}/>

        </div>
      );
}

export default Business
