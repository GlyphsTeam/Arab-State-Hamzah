import ServiceHeader from "../components/ourService/ServiceHeader";
import ServiceCard from "../components/ourService/ServiceCard";
import OurWebsite from "../components/ourService/OurWebsite";
import style from "../assets/style/ourService.module.css";
import useAxios from "../hooks/useAxiosGet";
import ServiceLetter from "../components/ourService/ServiceLetter";
import ServiceImage from "../components/ourService/ServiceImage";
import AdvBanner from "../components/common/AdvBanner";
import HeroBanner from "../components/common/banner/HeroBanner";
import { Helmet } from "react-helmet";
function BlogPage() { 
  const url = `our_services`;
  const [Data] = useAxios(url);
  const ourServiceData = Data?.data;  
  return (
    <>
    <Helmet>
      <title>{ourServiceData?.main?.title}</title>
      <meta name="description" content={ourServiceData?.main?.short}/>
    </Helmet>
    <div className={style.blogPageStyle}>
      <HeroBanner
      data={ourServiceData?.slider}

      />
      <ServiceHeader Data={Data} />
      <div className={`${style.firstConBackground}`}>
        <div className={`container`}>
          <div className={`row ${style.rowBlog}`}>
            <div
              className={`col-lg-7 col-md-12 col-sm-12 ${style.blogLetterPaddingTop}`}
            >
              <ServiceLetter mainServiceData={ourServiceData?.main} />
            </div>
            <div
              className={`col-lg-5 col-md-12 col-sm-12 pt-4 ${style.SearchEventContainer}`}
            >
              <div>
                <ServiceImage serviceImageData={ourServiceData?.main?.image} />
              </div>
            </div>
          </div>
        </div>
            <AdvBanner Data={ourServiceData?.advertisements} />
      </div>

      <div className={`${style.lastConBackground}`}>
        <div className={`container`}>
          <div className={style.columnCardsMainDiv}>
            <ServiceCard serviceCardData={ourServiceData?.services} />
          </div>
        </div>
        <div className={`container`}>
          <div className={`pt-5`}>
            <OurWebsite ourWebsiteData={ourServiceData?.other_website} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default BlogPage;
