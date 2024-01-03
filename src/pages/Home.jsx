import TryApp from "../components/home/tryApp/TryApp";
import CategoryList from "../components/home/category/CategoryList";
import Blog from "../components/home/blog/Blog";
import Services from "../components/home/jobs/Services";
import { useTranslation } from "react-i18next";
import AdvBanner from "../components/common/AdvBanner";
import BannerWInfo from "../components/common/banner/BannerWInfo";
import HomeTitle from "../components/common/title/HomeTitle";
import { Helmet } from 'react-helmet';
import { setHomeData, homeState } from '../redux/Home/home';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import axios from 'axios';
import { setLoading } from '../redux/slices/login';

function Home() {
  const dispatch = useDispatch();
  const stateHome = useSelector(homeState);
  let urlId;
  const [t] = useTranslation();
  const url = `home`;
  const getHomeData = async () => { 
    const token = localStorage.getItem('arab_user_token');
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (stateHome?.homeData === null) {
      dispatch(setLoading(true));
     await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        dispatch(setHomeData(res.data.data))
        dispatch(setLoading(false));
      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  useEffect(() => {
    getHomeData();
  }, [])
  return (
    <>
      <Helmet>
        <title>{stateHome?.homeData?.hero[0]?.title}</title>
        <meta name='description' content={stateHome?.homeData?.hero[0]?.description} />
      </Helmet>
      <BannerWInfo data={stateHome?.homeData?.hero} />

      <HomeTitle title={t("Advertisement")} />
      <AdvBanner />
      <CategoryList data={stateHome?.homeData?.category} urlId={urlId} />
      <Services data={stateHome?.homeData?.our_service?.model} />
      <TryApp data={stateHome?.homeData?.try_app} />
      <Blog data={stateHome?.homeData?.blogs_new} urlId={urlId} />

    </>
  );
}

export default Home;
