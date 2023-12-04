import UserGuideHeader from "../components/UserGuideComponent/UserGuideHeader";
import UserGuideLetter from "../components/UserGuideComponent/UserGuideLetter";
import CreateAccount from "../components/UserGuideComponent/CreateAccount";
import Use from "../components/UserGuideComponent/Use";
import UserGuideSearch from "../components/UserGuideComponent/UserGuideSearch";
import EventCards from "../components/UserGuideComponent/EventCards";
import Tags from "../components/UserGuideComponent/Tags";
import FAQs from "../components/UserGuideComponent/FAQs";
import style from "../assets/style/UserGuide.module.css";
import useAxios from "../hooks/useAxiosGet";
import { useLocation } from "react-router-dom";

function UserGuidePage() {
  const url = `user_guides/web`;
  const [Data] = useAxios(url);
  const userGuide = Data?.data;
  const blogLocation = useLocation();
  const pathName = blogLocation.pathname;
  let urlId;
  return (
    <div className={style.blogPageStyle}>
      <UserGuideHeader data={userGuide?.slider} />
      <div className={`${style.firstConBackground}`}>
        <div className={`container`}>
          <div className={`row ${style.rowBlog}`}>
            <div
              className={`col-lg-7 col-md-12 col-sm-12 ${style.blogLetterPaddingTop}`}
            >
              <UserGuideLetter userGuide={userGuide?.main} />
            </div>
            <div
              className={`col-lg-5 col-md-12 col-sm-12 pt-5 ${style.SearchEventContainer}`}
            >
              <UserGuideSearch userGuide={userGuide} />
              <div>
                <EventCards userGuide={userGuide?.evens} pathName={pathName} urlId = {urlId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.secondConBackground}`}>
        <div className={`container`}>
          <div className={`row `}>
            <div>
              <CreateAccount userGuide={userGuide?.account} urlId={urlId} media={userGuide?.slider[0]?.media}/>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.lastConBackground}`}>
        <div className={`container`}>
          <div className={style.columnCardsMainDiv}>
            <Use userGuide={userGuide?.use} urlId={urlId} />
          </div>
        </div>
        <div className={`container`}>
          <div className={`pt-5`}>
            <FAQs userGuide={userGuide?.faq} urlId={urlId}/>
            <Tags userGuide={userGuide?.tags} pathName={pathName} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserGuidePage;
