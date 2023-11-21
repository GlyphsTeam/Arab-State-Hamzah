import React from "react";
import style from "../../assets/style/UserGuide.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function EventCards({userGuide,pathName , urlId}) {
  const latest_post = userGuide?.model;
  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className={` pt-3  ${pathName === '/User-Guide' || pathName==='/user-guide'? style.eventContainer : style.eventShowBlogContainer }`}>
        <h3 className={style.eventMainTitle}>{userGuide?.title}</h3>
        {latest_post?.slice(0,2).map((data) => (
            <Link  key={data.id} to={`/Show-User-Guide/${data?.slug}/${data?.id}`} state={(urlId = { id: data?.id })}
            onClick={handleChangePage}>
          <div className={`${style.eventColCardDiv} row pt-3`}>
            <div className={`col-5 ${style.leftEventext}`}>
            <p className={style.eventTitle}>{data.title}</p>
            </div>
            <div className={`${style.rightCardImg} col-7`}>
               <LazyLoadImage src={data?.image} alt="rightCard"/>
            </div>
          </div>
            </Link>
        ))}
      </div>
    </>
  );
}
export default EventCards;