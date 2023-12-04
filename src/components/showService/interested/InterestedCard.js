import style from "../../../assets/style/showService/interested.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function BlogCard(props,urlId) {

  return (
    <>
      <div className={` ${style.card}`}>
        <Link
          to={`${props.link}`}
          state={(urlId = { id: props?.id })} >
          <div className={style.cardBody}>
            <div className={`row ${style.imgDiv}`}>
              <LazyLoadImage
                className={style.img}
                src={props.image}
                alt={`about ${props.title}`}
              />
            </div>
            <div className={`row ${style.aboutArticle}`}>
              <h1 className={style.aboutDisc}>{props.title}</h1>
            </div>
       
          </div>
        </Link>
      </div>
    </>
  );
}
export default BlogCard;
