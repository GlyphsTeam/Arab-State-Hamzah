import React from "react";
import style from "../../assets/style/Blog.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxiosGet";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function LatestPosts() {
    const [t] = useTranslation();
    const url = `blogs/web`
    const [Data] = useAxios(url);
    const latest_post = Data?.data?.events;
    let urlId;


    const handleChangePage = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div className={` pt-3  ${ style.eventShowBlogContainer}`}>
            <h3 className={style.eventMainTitle}>{t("Latest Posts")}</h3>
            {latest_post?.slice(0, 2).map((data) => (
                <Link key={data.id}   to={`/show-blog/${data.slug}`}  state={(urlId = { id: data?.id })}
                onClick={handleChangePage}>
                    <div className={`${style.eventColCardDiv} row pt-3`}>
                        <div className={`col-5 ${style.leftEventext}`}>
                            <p className={style.eventTitle}>{data.title}</p>
                        </div>
                        <div className={`${style.rightCardImg} col-7`}>
                             <LazyLoadImage src={data?.image} alt="rightCard" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default LatestPosts