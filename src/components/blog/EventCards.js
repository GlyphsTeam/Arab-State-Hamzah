import React from "react";
import style from "../../assets/style/Blog.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function EventCards({data,pathName , urlId}) {
  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className={` pt-3  ${pathName === '/Blog' || pathName==='/blog'? style.eventContainer : style.eventShowBlogContainer }`}>
        <h3 className={style.eventMainTitle}>{data?.title}</h3>
        {data?.model?.slice(0,2).map((data) => (
            <Link  key={data.id} to={`/show-blog/${data.slug}/${data?.id }`}  state={(urlId = { id: data?.id })}
            onClick={handleChangePage}>
          <div className={`${style.eventColCardDiv} row pt-3`}>
            <div className={`col-5 ${style.leftEventext}`}>
            <p className={style.eventTitle}>{data.title}</p>
            </div>
            <div className={`${style.rightCardImg} col-7`}>
               <LazyLoadImage src={data?.image} alt="imgage"/>
            </div>
          </div>
            </Link>
        ))}
      </div>
    </>
  );
}
export default EventCards;