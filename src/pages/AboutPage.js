import style from "../assets/style/about/about.module.css";
import AboutImage from "../components/aboutUs/AboutImage";
import AboutParagraph from "../components/aboutUs/AboutParagraph";
import DiscoverService from "../components/common/DiscoverService";
import EasySearch from "../components/aboutUs/EasySearch";
import UserAnalytics from "../components/aboutUs/UserAnalytics";
import HeroBanner from "../components/common/banner/HeroBanner";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { aboutState, setAboutData } from '../redux/About/about'
import { useEffect } from "react";
import { setLoading } from '../redux/slices/login';
import { useTranslation } from "react-i18next";

import axios from 'axios'
function AboutPage() {
  const dispatch = useDispatch();
  const aboutDataRed = useSelector(aboutState);
  const [t] = useTranslation();
  const url = `about`;
 
  const getAboutData = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if(aboutDataRed.aboutData===null){
    dispatch(setLoading(true))
    await axios.get(`${baseURL}/${url}`, {
      headers: { "Authorization": `Bearer ${token}`}
    }).then((res) => {
      dispatch(setAboutData(res.data?.data));
      dispatch(setLoading(false));
    }).catch((err)=>{
      console.log(err);
      dispatch(setLoading(false));
    })
  }
  }
  useEffect(() => {
    getAboutData()

  }, [])

  return (
    <>
      <Helmet>
        <title>{aboutDataRed?.aboutData?.slider[0]?.title}</title>
        <meta name="description" content={aboutDataRed?.aboutData?.slider[0]?.description} />
      </Helmet>
      <HeroBanner data={aboutDataRed?.aboutData?.slider} />

      <div className={`${style.aboutUsMain}`}>
        <div className={`container`}>
          <div className={style.aboutTitle}></div>
          <div className={`row`}>
            <AboutParagraph aboutData={aboutDataRed?.aboutData} />
            <AboutImage aboutData={aboutDataRed?.aboutData} />
          </div>
        </div>
      </div>

      {/* Include other components */}
      <UserAnalytics aboutData={aboutDataRed?.aboutData?.statistics} />
      <DiscoverService data={aboutDataRed?.aboutData?.our_services} />
      <EasySearch aboutData={aboutDataRed?.aboutData?.easy_search} />
    </>
  );
}

export default AboutPage;