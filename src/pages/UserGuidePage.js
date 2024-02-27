import { useEffect, lazy, Suspense } from "react";

import style from "../assets/style/UserGuide.module.css";
import { useLocation } from "react-router-dom";
import { setUserGuidData } from '../redux/Home/home';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { setLoading } from '../redux/slices/login';
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';
// import { imageOverlay } from "leaflet";
const UserGuideHeader = lazy(() => import('../components/UserGuideComponent/UserGuideHeader'));
const UserGuideLetter = lazy(() => import('../components/UserGuideComponent/UserGuideLetter'));
const CreateAccount = lazy(() => import("../components/UserGuideComponent/CreateAccount"));
const Use = lazy(() => import("../components/UserGuideComponent/Use"));
const UserGuideSearch = lazy(() => import("../components/UserGuideComponent/UserGuideSearch"));
const EventCards = lazy(() => import("../components/UserGuideComponent/EventCards"));
const FAQs = lazy(() => import("../components/UserGuideComponent/FAQs"));

function UserGuidePage() {
  const url = `user_guides/web`;
  const blogLocation = useLocation();
  const userGuidData = useSelector((state) => state.home.userGuidData)
  const pathName = blogLocation.pathname;
  let urlId;
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const getUserGuidePage = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (userGuidData === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        dispatch(setUserGuidData(res.data?.data));
        dispatch(setLoading(false));
      }).catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      })
    }
  }
  useEffect(() => {
    getUserGuidePage();
  }, [])

  return (
    <>
    <Helmet>
     <title>User Guide</title>
     <meta name="description" content="User Guide Page"/>
    </Helmet>
    <Suspense fallback={<p>Loading....</p>}>
      <div className={style.blogPageStyle}>
        <UserGuideHeader data={userGuidData?.payload?.slider} />
        <div className={`${style.firstConBackground}`}>
          <div className={`container`}>
            <div className={`row ${style.rowBlog}`}>
              <div
                className={`col-lg-7 col-md-12 col-sm-12 ${style.blogLetterPaddingTop}`}
              >
                <UserGuideLetter userGuide={userGuidData?.payload?.main} />
              </div>
              <div
                className={`col-lg-5 col-md-12 col-sm-12 pt-5 ${style.SearchEventContainer}`}
              >
                <UserGuideSearch userGuide={userGuidData?.payload} />
                <div>
                  <EventCards userGuide={userGuidData?.payload?.evens} pathName={pathName} urlId={urlId} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.secondConBackground}`}>
          <div className={`container`}>
            <div className={`row `}>
              <div>
                <CreateAccount userGuide={userGuidData?.payload?.account} urlId={urlId} media={userGuidData?.payload?.slider[0]?.media} />
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.lastConBackground}`}>
          <div className={`container`}>
            <div className={style.columnCardsMainDiv}>
              <Use userGuide={userGuidData?.payload?.use} urlId={urlId} />
            </div>
          </div>
          <div className={`container`}>
            <div className={`pt-5`}>
              <FAQs userGuide={userGuidData?.payload?.faq} urlId={urlId} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
    </>

  );
}
export default UserGuidePage;
