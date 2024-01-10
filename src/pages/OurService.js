import ServiceCard from "../components/ourService/ServiceCard";
import OurWebsite from "../components/ourService/OurWebsite";
import style from "../assets/style/ourService.module.css";
import ServiceLetter from "../components/ourService/ServiceLetter";
import ServiceImage from "../components/ourService/ServiceImage";
import HeroBanner from "../components/common/banner/HeroBanner";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/slices/login';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { serversState, setServicesData } from '../redux/OurServices/services';
import axios from 'axios';
function BlogPage() {
  const servicesData = useSelector(serversState);
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const url = `our_services`;
  const getServiersData = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (servicesData?.services?.servicesData === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        dispatch(setServicesData(res.data?.data));
        dispatch(setLoading(false))
      }).catch((err) => {
        console.log(err);
        dispatch(false)
      })
    }
  }

  useEffect(() => {
    getServiersData();
  }, [])
  return (
    <>
      <Helmet>
        <title>{servicesData?.services?.servicesData?.main?.title}</title>
        <meta name="description" content={servicesData?.services?.servicesData?.main?.short} />
      </Helmet>
      <div className={style.blogPageStyle}>
        <HeroBanner
          data={servicesData?.services?.servicesData?.slider}

        />
        {/* <ServiceHeader /> */}
        <div className={`${style.firstConBackground}`}>
          <div className={`container`}>
            <div className={`row ${style.rowBlog}`}>
              <div
                className={`col-lg-7 col-md-12 col-sm-12 ${style.blogLetterPaddingTop}`}
              >
                <ServiceLetter mainServiceData={servicesData?.services?.servicesData?.main} />
              </div>
              <div
                className={`col-lg-5 col-md-12 col-sm-12 pt-4 ${style.SearchEventContainer}`}
              >
                <div>
                  <ServiceImage serviceImageData={servicesData?.services?.servicesData?.main?.image} />
                </div>
              </div>
            </div>
          </div>
          {/* <AdvBanner Data={servicesData?.services?.servicesData?.advertisements} /> */}
        </div>

        <div className={`${style.lastConBackground}`}>
          <div className={`container`}>
            <div className={style.columnCardsMainDiv}>
              <ServiceCard serviceCardData={servicesData?.services?.servicesData?.services} />
            </div>
          </div>
          <div className={`container`}>
            <div className={`pt-5`}>
              <OurWebsite ourWebsiteData={servicesData?.services?.servicesData?.other_website} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BlogPage;
