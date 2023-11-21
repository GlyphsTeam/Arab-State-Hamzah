import React from "react";
import TryApp from "../components/home/tryApp/TryApp";
import CategoryList from "../components/home/category/CategoryList";
import Blog from "../components/home/blog/Blog";
import Services from "../components/home/jobs/Services";
import useAxios from "../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import AdvBanner from "../components/common/AdvBanner";
import BannerWInfo from "../components/common/banner/BannerWInfo";
import HomeTitle from "../components/common/title/HomeTitle";
import { Helmet } from 'react-helmet';


function Home({ baseURL }) {
  let urlId;

  const [t] = useTranslation();

  const url = `home`;

  const [Data] = useAxios(url);
  const homeData = Data?.data;
  return (
    <>
      <Helmet>
        <title>{homeData?.hero[0]?.title}</title>
        <meta name='description' content={homeData?.hero[0].description} />
      </Helmet>
      <BannerWInfo data={homeData?.hero} />

      <HomeTitle title={t("Advertisement")} />
      <AdvBanner ADV_left={homeData?.advertisements_left}
        ADV_Right={homeData?.advertisements_right} />
      <CategoryList data={homeData?.category} urlId={urlId} />
      <Services data={homeData?.our_service?.model} />
      <TryApp data={homeData?.try_app} />
      <Blog data={homeData?.blogs_new} urlId={urlId} />

    </>
  );
}

export default Home;
