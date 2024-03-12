import { useEffect, lazy, Suspense } from "react";
import style from "../assets/style/about/about.module.css";

import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { aboutState, setAboutData } from '../redux/About/about'
import { setLoading } from '../redux/slices/login';
import { useTranslation } from "react-i18next";
import axios from 'axios'
const AboutImage = lazy(() => import('../components/aboutUs/AboutImage'));
const AboutParagraph = lazy(() => import('../components/aboutUs/AboutParagraph'));
const DiscoverService = lazy(() => import('../components/common/DiscoverService'));
const EasySearch = lazy(() => import('../components/aboutUs/EasySearch'));
const UserAnalytics = lazy(()=>import('../components/aboutUs/UserAnalytics'));
const HeroBanner = lazy(()=>import('../components/common/banner/HeroBanner'));

function AboutPage() {
  const dispatch = useDispatch();
  const aboutDataRed = useSelector(aboutState);
  const [t] = useTranslation();
  const url = `about`;
  const getAboutData = async () => {
    
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (aboutDataRed.aboutData === null) {
      dispatch(setLoading(true))
      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        dispatch(setAboutData(res.data?.data));
        dispatch(setLoading(false));
      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  useEffect(() => {
    getAboutData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{aboutDataRed?.aboutData?.slider[0]?.title}</title>
        {aboutDataRed?.aboutData?.about.map((item) => {
          return <meta name="description" content={item?.description} />
        })
        }
      </Helmet>
      <Suspense fallback={<p>Loading....</p>}>
      <HeroBanner data={aboutDataRed?.aboutData?.slider} />
      <div className={`${style.aboutUsMain}`}>
        <div className={`container`}>
          <div className={style.aboutTitle}></div>
          <div className={`row`}>
            <AboutParagraph />
            <AboutImage aboutData={aboutDataRed?.aboutData} />
          </div>
        </div>
      </div>

      {/* Include other components */}
      <UserAnalytics />
      <DiscoverService />
      <EasySearch />
      </Suspense>
    </>
  );
}

export default AboutPage;