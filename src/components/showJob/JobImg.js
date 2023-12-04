import style from '../../assets/style/ShowJobPage.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component'

function JobImg({ jobData }) {
  return (
    <>
      <div className={style.jobImageDiv}>
        <LazyLoadImage className={style.jobImageSize} src={jobData?.company_image ? jobData?.company_image : jobData?.user_image} alt="jobImage" />
      </div>
    </>
  );
}

export default JobImg;
