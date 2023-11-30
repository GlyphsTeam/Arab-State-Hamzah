import React, { useState } from "react";
import style from "../assets/style/showUserGuide.module.css";
import LeftShowUserGuide from "../components/showUserGuide/LeftShowUserGuide";
import { useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxiosGet";
import Similar from "../components/blog/Similar";
import ShowGuideSteps from "../components/showUserGuide/ShowGuideSteps";
import BlogSearch from "../components/blog/BlogSearch";
import LatestPosts from "../components/showUserGuide/LatestPosts";
import { useTranslation } from "react-i18next";
import UserGuideHeader from "../components/UserGuideComponent/UserGuideHeader";
import Share from "../Utils/Share";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ShowUserGuide() {
  const [t, i18n] = useTranslation();

  const location = useLocation();
  const id = location.pathname.split("/")[location.pathname.split("/").length - 1];
  let showUserGuideUrl = `user_guides/show/web/${id}`;
  const [Data] = useAxios(showUserGuideUrl);
  let showUserGuide = Data?.data?.main;
  let mainShowGuideData = Data?.data;
  const [showShareModal, setShowShareModal] = useState(false);
  const pathName = `/${i18n?.language}` + location.pathname;
  const youtube_Url = mainShowGuideData?.main?.link_youtube;
  return (
    <>
      <div className={style.showBlogContainer}>
        <UserGuideHeader data={mainShowGuideData?.slider} />

        <div className={`container`}>
          <div className={`row`}>
            <div className="col-lg-8 col-md-12 col-sm-12 pt-5">
              <div>
                <h4 className={style.showBlogTitle}>{showUserGuide?.title}</h4>
              </div>
              <div className={style.iconsShareAndSave}>
                <p
                  className={`px-3 ${style.favoriteIconCursor}`}
                  onClick={() => setShowShareModal(true)}
                >
                  <i
                    className={`fas fa-share-square ${style.shareIconMargin}`}
                  ></i>
                  {t("Share Shop")}
                </p>

                <a href={youtube_Url} target="_blank" rel="noreferrer">
                  <i className={`fab fa-youtube ${style.youtubIcon}`}></i>
                </a>
              </div>
              {showShareModal && (
                <Share url={pathName} setShowShareModal={setShowShareModal} />
              )}

              <div className={style.youtubeDiv}>
                {showUserGuide?.type === "video" ? (
                  <>
                    <iframe
                      className={style.showBlogImage}
                      src={showUserGuide?.link_web}
                    ></iframe>
                  </>
                ) : (
                  <LazyLoadImage
                  // src={showUserGuide?.image}
                  // className={style.showBlogImage}
                  // alt="userGuideImage"
                  />
                )}
              </div>
              <div>
                <p className={` ${style.showBlogParagraph} pt-3`}>
                  {showUserGuide?.description}
                </p>
              </div>

              <ShowGuideSteps Data={Data} showUserGuide={showUserGuide} />
              <LeftShowUserGuide Data={Data} showUserGuide={showUserGuide} />
            </div>
            <div
              className={`col-lg-4 col-md-12 col-sm-12 ${style.eventCardContainer}`}
            >
              <BlogSearch />
              <LatestPosts mainShowGuideData={mainShowGuideData} />
            </div>
          </div>
        </div>
        <div>
          <Similar showUserGuide={showUserGuide} id={id} />
        </div>
      </div>
    </>
  );
}
export default ShowUserGuide;
