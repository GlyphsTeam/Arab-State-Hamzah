import style from "../assets/style/about/about.module.css";
import useAxios from "../hooks/useAxiosGet";
import AboutImage from "../components/aboutUs/AboutImage";
import AboutParagraph from "../components/aboutUs/AboutParagraph";
import DiscoverService from "../components/common/DiscoverService";
import EasySearch from "../components/aboutUs/EasySearch";
import UserAnalytics from "../components/aboutUs/UserAnalytics";
import HeroBanner from "../components/common/banner/HeroBanner";
import { Helmet } from "react-helmet";

function AboutPage() {
  const url = `about`;
  const [Data] = useAxios(url);
  const aboutData = Data?.data;

  return (
    <>
      <Helmet>
        <title>{aboutData?.slider[0]?.title}</title>
        <meta name="description" content={aboutData?.slider[0]?.description} />
      </Helmet>
      <HeroBanner data={aboutData?.slider} />

      <div className={`${style.aboutUsMain}`}>
        <div className={`container`}>
          <div className={style.aboutTitle}></div>
          <div className={`row`}>
            <AboutParagraph aboutData={aboutData} />
            <AboutImage aboutData={aboutData} />
          </div>
        </div>
      </div>

      {/* Include other components */}
      <UserAnalytics aboutData={aboutData?.statistics} />
      <DiscoverService data={aboutData?.our_services} />
      <EasySearch aboutData={aboutData?.easy_search} />
    </>
  );
}

export default AboutPage;