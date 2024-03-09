import React, { useEffect, useState, lazy, Suspense } from "react";
import useAxios from "../hooks/useAxiosGet";
import style from "../assets/style/show_blog.module.css";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from 'html-react-parser';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { setSavedBlogData } from '../redux/Blog/blog';
import { IoLogoYoutube } from "react-icons/io";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";

const LeftShowBlog = lazy(() => import("../components/showBlog/LeftShowBlog"));
const Similar = lazy(() => import("../components/blog/Similar"));
const ShowBlogParagraph = lazy(() => import("../components/showBlog/ShowBlogParagraph"));
const BlogSearch = lazy(() => import("../components/blog/BlogSearch"));
const Banner = lazy(() => import("../components/common/banner/Banner"));
const BlogHeader = lazy(() => import("../components/blog/BlogHeader"));
const EventCards = lazy(() => import("../components/blog/EventCards"));
const Share = lazy(() => import("../Utils/Share"));

function ShowBlog() {
  const [t, i18n] = useTranslation();
  const location = useLocation();
  const [isSaved, setSaved] = useState(false);
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1]
  const [showShareModal, setShowShareModal] = useState(false);
  const dispatch = useDispatch();
  let showBlogUrl = `blogs/web/show/${id}`;
  const urlpath = useLocation();
  const pathName = `/${i18n?.language}` + urlpath.pathname;
  let urlId;
  const [Data] = useAxios(showBlogUrl);
  let showBlogData = Data?.data?.blog;
  let sliderData = Data?.data;
  const saveBlogHandler = async (id) => {
    const token = localStorage.getItem('arab_user_token')
    let formData = new FormData();
    formData.append('id', id);
    let backend_url = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${process.env.REACT_APP_City_ID}/favorite/blog`
    await axios.post(backend_url, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(setSavedBlogData(null));
      if (isSaved) {
        setSaved(false)
      }
      else {
        setSaved(true);
      }

    }).catch((err) => console.log(err))
  }
  useEffect(() => {
    if (showBlogData?.saved) {
      setSaved(true)
    }
    else {
      setSaved(false)
    }
  }, [showBlogData?.saved])
  let favoriteIcon = isSaved ? 'fas fa-bookmark' : 'far fa-bookmark';
  return (
    <div className={style.showBlogContainer}>
      <Helmet>
        <title>{showBlogData?.title}</title>
        <meta name="description" content={ReactHtmlParser(`${showBlogData?.web_description}`)} />
      </Helmet>
      <Suspense fallback={<p>Loading...</p>}>
        <BlogHeader data={sliderData?.slider} />
        <Banner />

        <div className={`container`}>
          <div className={`row`}>
            <div className="col-lg-8 col-md-12 col-sm-12 pt-5">
              <div className={style.blogTitileConinater}>
                <h4 className={style.showBlogTitle}>{showBlogData?.title}</h4>
                <p className={style.showBlogDate}>{showBlogData?.created_at} </p>
              </div>
              <div >
                {/* <img src={showBlogData?.image} className={style.showBlogImage} alt="img-showBlog"/> */}
                <div className={style.iconsShareAndSave}>
                  {isSaved ? <MdFavorite onClick={() => saveBlogHandler(id)} className={style.favIconColor} /> : <MdOutlineFavoriteBorder onClick={() => saveBlogHandler(id)} className={style.favIconColor} />}
                  <p className={`px-3 ${style.favoriteIconCursor}`} onClick={() => setShowShareModal(true)}>
                    <FaShareSquare className={style.shareIconMargin} />
                  </p>
                  <a href={showBlogData?.link_youtube} target="_blank" rel="noreferrer"><IoLogoYoutube className={style.youtubIcon} /></a>
                </div>
                {showShareModal && <Share url={pathName} setShowShareModal={setShowShareModal} />}

                <p className={` ${style.showBlogParagraph}`}>
                  {showBlogData?.web_description && ReactHtmlParser(`${showBlogData?.web_description}`)}
                </p>

              </div>
              <ShowBlogParagraph Data={Data} showBlogData={showBlogData} />
              <LeftShowBlog Data={Data} showBlogData={showBlogData} />
              {/* <Tag Data={Data} id={id} isShowBlog={true}/> */}
            </div>
            <div
              className={`col-lg-4 col-md-12 col-sm-12 ${style.eventCardContainer}`}
            >
              {/* <BlogSearch /> */}


              <BlogSearch Data={Data} />

              <EventCards data={sliderData?.events} pathName={pathName} urlId={urlId} />
              {/* <LatestPosts /> */}

            </div>
          </div>
        </div>
        <div>
          <Similar showBlogData={showBlogData} id={id} />
        </div>
      </Suspense>
    </div>

  );
}
export default ShowBlog;
