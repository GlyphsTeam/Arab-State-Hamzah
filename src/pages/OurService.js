import style from "../assets/style/ourService.module.css";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/slices/login';
import { lazy, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { serversState, setServicesData } from '../redux/OurServices/services';
import axios from 'axios';

const ServiceCard = lazy(() => import("../components/ourService/ServiceCard"));
const OurWebsite = lazy(() => import("../components/ourService/OurWebsite"));
const ServiceLetter = lazy(() => import("../components/ourService/ServiceLetter"));
const ServiceImage = lazy(() => import("../components/ourService/ServiceImage"));
const HeroBanner = lazy(() => import("../components/common/banner/HeroBanner"))

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
        {servicesData?.services?.servicesData?.services.map((item) => {
          return <meta name="description" content={item?.description} />
        })}
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
