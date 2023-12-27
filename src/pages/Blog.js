import BlogHeader from "../components/blog/BlogHeader";
import BlogLetter from "../components/blog/BlogLetter";
import BlogCards from "../components/blog/StatisticsSection";
import PopularCards from "../components/blog/PopularSection";
import BlogSearch from "../components/blog/BlogSearch";
import EventCards from "../components/blog/EventCards";
import Tags from "../components/blog/Tags";
import PlacesToVisit from "../components/blog/PlacesToVisitSection";
import style from "../assets/style/Blog.module.css";
import useAxios from "../hooks/useAxiosGet";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
function BlogPage() {
  const url = `blogs/web`
  const [Data] = useAxios(url);
  const blogData = Data?.data;
  const urlpath = useLocation();
  const pathName = urlpath.pathname;
  let urlId;
  const titlePage = "Blog Page";
  console.log("cccc>>>",blogData)
  return (
    <>
    <Helmet>
      <title>{titlePage}</title>
      <meta name="description" content={blogData?.main?.description}/>
    </Helmet>
    <div className={style.blogPageStyle}>
      <BlogHeader data = {blogData?.slider} />
      <div className={`${style.firstConBackground}`}>
        <div className={`container`}>
          <div className= {`row ${style.rowBlog}`}>
            <div
              className={`col-lg-7 col-md-12 col-sm-12 ${style.blogLetterPaddingTop}`}
            >
              <BlogLetter Data = {Data} />
            </div>
            <div className={`col-lg-5 col-md-12 col-sm-12 pt-4 ${style.SearchEventContainer}`}>
              <BlogSearch Data = {Data} />
              <div>
                <EventCards data = {blogData?.events}  pathName={pathName} urlId={urlId} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.secondConBackground}`}>
        <div className={`container`}>
          <div className= {`row `}>
            <div>
              <BlogCards data = {blogData?.statistics} />
             
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.lastConBackground}`}>
        <div className={`container`}>
          <div className={style.columnCardsMainDiv}>
            <PopularCards  data = {blogData?.around} urlId={urlId} />
          </div>
        </div>
          <div className={`container`}>
        <div className={`pt-5`}>
            <PlacesToVisit  data = {blogData?.visit} urlId={urlId} />
            <Tags data = {blogData?.tags} pathName={pathName} />
        </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default BlogPage;

