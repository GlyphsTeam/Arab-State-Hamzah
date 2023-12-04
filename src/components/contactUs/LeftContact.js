import style from "../../assets/style/contactUs.module.css";
import ReactHtmlParser from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component'

function LeftContact({image, desc, title}) {

  return (
    <>
      <div className={`col-sm-12 col-md-7 col-lg-7 ${style.leftReachout}`}>
      <h1 className={style.contactTitle}>{title}</h1>
        <LazyLoadImage
          className={style.leftImage}
          src={image}
          alt="Reachout"
        />
        <p className={style.contactParagraph}>
        {desc && ReactHtmlParser(`${desc}`)} 
        </p> 
      </div>
    </>
  );
}
export default LeftContact;







