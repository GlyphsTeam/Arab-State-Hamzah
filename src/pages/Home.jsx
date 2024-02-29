import { useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';
import { setHomeData, homeState } from '../redux/Home/home';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { setLoading } from '../redux/slices/login';
const CategoryList = lazy(() => import('../components/home/category/CategoryList'));
const TryApp = lazy(() => import('../components/home/tryApp/TryApp'));
const Blog = lazy(() => import('../components/home/blog/Blog'));
const Services = lazy(() => import('../components/home/jobs/Services'));
const AdvBanner = lazy(() => import('../components/common/AdvBanner'));
const BannerWInfo = lazy(() => import('../components/common/banner/BannerWInfo'));
const HomeTitle = lazy(() => import('../components/common/title/HomeTitle'));

function Home() {
  const dispatch = useDispatch();
  const stateHome = useSelector(homeState);
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
  }, []);
  
  return (
    <>
      <Helmet>
        <title>{stateHome?.homeData?.hero[0]?.title}</title>
        <meta name='description' content={stateHome?.homeData?.hero[0]?.description} />
      </Helmet>
      <Suspense fallback={<p>Loading...</p>}>
      <BannerWInfo />
      <HomeTitle title={t("Advertisement")} />
      <AdvBanner />
      <CategoryList />
      <Services />
      <TryApp />
      <Blog />
      </Suspense>
    </>
  );
}

export default Home;
