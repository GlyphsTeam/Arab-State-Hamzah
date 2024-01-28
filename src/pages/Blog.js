import { useEffect, lazy, Suspense } from "react";

import style from "../assets/style/Blog.module.css";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { blogState, setBlogData } from '../redux/Blog/blog';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { setLoading } from '../redux/slices/login';

const BlogHeader = lazy(() => import('../components/blog/BlogHeader'));
const BlogLetter = lazy(() => import("../components/blog/BlogLetter"));
const BlogCards = lazy(() => import("../components/blog/StatisticsSection"));
const PopularCards = lazy(() => import("../components/blog/PopularSection"));
const BlogSearch = lazy(() => import("../components/blog/BlogSearch"));
const EventCards = lazy(() => import("../components/blog/EventCards"));
const Tags = lazy(() => import("../components/blog/Tags"));
const PlacesToVisit = lazy(() => import("../components/blog/PlacesToVisitSection"))
function BlogPage() {

  const url = `blogs/web`
  const dispatch = useDispatch();
  const stateBlog = useSelector(blogState);
  const urlpath = useLocation();
  const [t] = useTranslation();
  const pathName = urlpath.pathname;
  let urlId;
  const titlePage = "Blog Page";

  const getDataBlogs = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (stateBlog?.blogData === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        dispatch(setBlogData(res.data?.data));
        dispatch(setLoading(false));
      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  useEffect(() => {
    getDataBlogs();
  }, []);
  return (
    <>
      <Helmet>
        <title>{titlePage}</title>
        <meta name="description" content={stateBlog?.blogData?.main?.description} />
      </Helmet>
      <Suspense fallback={<p>Loading...</p>}>
      <div className={style.blogPageStyle}>
        <BlogHeader data={stateBlog?.blogData?.slider} />
        <div className={`${style.firstConBackground}`}>
          <div className={`container`}>
            <div className={`row ${style.rowBlog}`}>
              <div
                className={`col-lg-7 col-md-12 col-sm-12 ${style.blogLetterPaddingTop}`}
              >
                <BlogLetter />
              </div>
              <div className={`col-lg-5 col-md-12 col-sm-12 pt-4 ${style.SearchEventContainer}`}>
                <BlogSearch />
                <div>
                  <EventCards data={stateBlog?.blogData?.events} pathName={pathName} urlId={urlId} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.secondConBackground}`}>
          <div className={`container`}>
            <div className={`row `}>
              <div>
                <BlogCards data={stateBlog?.blogData?.statistics} lengthCards={stateBlog?.blogData?.statistics?.model?.length}/>

              </div>
            </div>
          </div>
        </div>
        <div className={`${style.lastConBackground}`}>
          <div className={`container`}>
            <div className={style.columnCardsMainDiv}>
              <PopularCards data={stateBlog?.blogData?.around} urlId={urlId} />
            </div>
          </div>
          <div className={`container`}>
            <div className={`pt-5`}>
              <PlacesToVisit data={stateBlog?.blogData?.visit} lengthCards={stateBlog?.blogData?.visit?.model?.length} urlId={urlId} />
              <Tags data={stateBlog?.blogData?.tags} pathName={pathName} />
            </div>
          </div>
        </div>
      </div>
      </Suspense>
    </>
  );
}
export default BlogPage;

