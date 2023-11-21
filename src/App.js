import React, { useEffect, useState } from "react";
import { Crisp } from "crisp-sdk-web";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import UserProfilePage from "./pages/UserProfilePage";
import SavedStorePage from "./pages/SavedStorePage";
import SavedAccomodationPage from "./pages/SavedAccomodationPage";
import SavedJobPage from "./pages/SavedJobPage";
import SavedProductPage from "./pages/SavedProductPage";
import MyJobPage from "./pages/MyJobPage";
import MyProductPage from "./pages/MyProductPage";
import MyHousingPage from "./pages/MyHousingPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import MarketProfile from "./pages/MarketProfile";
import Category from "./pages/CategoryPage";
import SubCategory from "./pages/SubCategory";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/ContactUs";
import Page404 from "./pages/Page404";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import Terms_conditions from "./components/legal/Terms_conditions";
import { useTranslation } from "react-i18next";
import ShowBlog from "./pages/ShowBlog";
import About from "./pages/AboutPage";
import ChangePassword from './components/userProfile/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';
import MarketPlaceCategory from './pages/MarketPlaceCategoryPage';
import MarketPlaceSubCategory from './pages/MarketPlaceSubCategoryPage';
import MarketPlaceProductResults from './pages/MarketPlaceProductResultsPage';
import MarketPlacePostProduct from './pages/MarketPlacePostProductPage';
import OneSignal from 'react-onesignal';
import ScrollToTop from './components/common/ScrollToTop';
import ProductShowPage from './pages/ProductShowPage';
import EulaGeorgiaPage from "./pages/EulaGeorgiaPage";
import MetaPixel from "./Utils/MetaPixel";
import UserGuide from "./pages/UserGuidePage";
import ShowUserGuide from "./pages/ShowUserGuide";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import SearchResultPage from "./pages/SearchResultPage";
import OurService from "./pages/OurService";
import ShowRentPage from "./pages/ShowRentPage";
import ShowJobPage from "./pages/ShowJobPage";
import JotForm from "./pages/JotFormPage";
import PrivateRoutes from "./Utils/PrivateRoutes";
import useAxios from "./hooks/useAxiosGet";
import ShowServicePage from "./pages/ShowServicePage";
import GetLang from './Utils/language/GetLang';
import JobPage from "./pages/LookingForJobPage";
import RentPage from "./pages/LookingForRentPage";
import Jobs from "./pages/JobPage";
import Rents from "./pages/RentPage";
import PostJobPage from "./pages/PostJobPage";
import PostRentPage from "./pages/PostRentPage";
import CityHome from "./pages/multiCity/Home";
import Spinner from './Utils/SpinnerFunction';
import SpinnerStatic from './components/common/Spinner';
import Business from "./components/addbussinse/Business";
import MyBusiness from "./pages/MyBusiness";
import RentFormAc from './components/JobRentForm/rentForm/RentFormApartment'
import MySavedBlogs from './pages/MySavedBlogs';
import PostJobCompany from './pages/PostJobCompany'
function App() {
  let generalUrl = "general-setting";
  const [Data] = useAxios(generalUrl);
  const logoImage = Data?.data?.navbar?.logo;
  const logoBlueImage = Data?.data?.logo;
  const spinnerLogo = Data?.data?.icon_loading;

  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONE_SIGNAL_KEY,
    });
  }, []);

  const [t] = useTranslation();

  const autherized = localStorage.getItem("arab_user_token");

  const cityId = localStorage.getItem("cityId");
  let cityIdUrl = '/0';
  useEffect(() => {
    if (cityId) {
      cityIdUrl = `/${cityId}`;
    } else {
      cityIdUrl = '/0';
    }
  }, [cityId]);

  const authAPI = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0`;
  const guestAPI = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0`;

  useEffect(() => {
    autherized
      ? setBaseURL(authAPI)
      : setBaseURL(guestAPI);
  }, [autherized]);


  const login_api = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/en${cityIdUrl}/login`;
  const regester_api = `${baseURL}/register`;
  const profile_api = `${baseURL}/profile`;
  const blogs_api = `${baseURL}/blogs`;
  const fav_api = `${baseURL}/profile/favorite`;
  const saved_api = `${baseURL}/profile/save`;

  useEffect(() => {
    Crisp.configure(process.env.REACT_APP_CRISP_KEY);
  }, []);

  const token = localStorage.getItem('arab_user_token');
  const userName = localStorage.getItem('arab_user_name');
  const userEmail = localStorage.getItem('arab_user_email');

  useEffect(() => {
    if (token) {
      Crisp.setTokenId(token);
      Crisp.user.setEmail(userEmail);
      Crisp.user.setNickname(userName);
    } else {
      Crisp.user.setNickname("Guest");
    }
  }, []);



  const [lang] = GetLang();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 1000);

  }, []);


  return (
    <>

      <Router basename={`/${lang}`}>
        {isLoading ? (
          <>
            <SpinnerStatic />
          </>
        )
          :
          <Spinner logo={spinnerLogo} />
        }

        <MetaPixel />
        <ScrollToTop />
        <ScrollToTopButton />
        <Navbar url={login_api} regesterUrl={regester_api} logoImage={logoImage} />
        <main className="mainSection">

          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path={`/Profile`} element={<UserProfilePage url={profile_api} fav={fav_api} saved={saved_api} />} />
              <Route path={`/saved-store`} element={<SavedStorePage />} />
              <Route path={`/saved-accomodation`} element={<SavedAccomodationPage />} />
              <Route path={`/saved-job`} element={<SavedJobPage />} />
              <Route path={`/saved-product`} element={<SavedProductPage />} />
              <Route path={`/my-product`} element={<MyProductPage baseUrl={baseURL} />} />
              <Route path={`/my-job`} element={<MyJobPage baseUrl={baseURL} />} />
              <Route path={`/my-housing`} element={<MyHousingPage baseUrl={baseURL} />} />
              <Route path={`/my-business`} element={<MyBusiness />} baseURL={baseURL} />
              <Route path={`/saved-blogs`} element={<MySavedBlogs/>}/>
              <Route path={`/delete-account`} element={<DeleteAccountPage baseUrl={authAPI} logo={logoBlueImage} />} />
              <Route path={`/changePassword`} element={<ChangePassword baseUrl={authAPI} logo={logoImage} />} />
              <Route path={'/add-bussinse'} element={<Business baseURL={baseURL}/>} />
            </Route>

            <Route path={``} element={<Home baseURL={baseURL} />} />
            <Route path={`/home`} element={<CityHome baseURL={baseURL} />} />
            <Route path={`/jobs`} element={<Jobs baseURL={baseURL} />} />
            <Route path={`/rents`} element={<Rents baseURL={baseURL} />} />
            <Route exact path={`/SubCategory/:categoryName?/:id`} element={<SubCategory />} />
            <Route exact path={`/Category/:type`} element={<Category baseURL={baseURL} />} />
            <Route exact path={`/Blog`} element={<Blog url={blogs_api} />} />
            <Route exact path={`/Contact`} element={<Contact baseURL={guestAPI} />} />
            <Route exact path={`/Login`} element={<Login baseURL={guestAPI} logo={logoBlueImage} />} />
            <Route exact path={`/Register`} element={<Register baseURL={baseURL} logo={logoBlueImage} />} />
            <Route exact path={`/MarketProfile/:id/:slug?`} element={<MarketProfile />} />
            <Route exact path={`/search-result/:keyword/:type?`} element={<SearchResultPage />} />
            <Route exact path={`/Privacy-Policy`} element={<PrivacyPolicy />} />
            <Route exact path={`/Terms-conditions`} element={<Terms_conditions />} />
            <Route exact path={`/Rent/:id/:slug?`} element={<ShowRentPage />} />
            <Route exact path={`/show-job/:id?/:slug?`} element={<ShowJobPage />} />
            <Route exact path={`/Job`} element={<JobPage />} />
            <Route exact path={`/Rent`} element={<RentPage />} />
            <Route exact path={`/Show-Blog/:id?/:slug?`} element={<ShowBlog />} />
            <Route exact path={`/About`} element={<About />} />
            <Route exact path={`/Forget-Password`} element={<ForgetPassword baseURL={baseURL} logo={logoImage} />} />
            <Route exact path={`/market-place`} element={<MarketPlaceCategory baseUrl={baseURL} />} />
            <Route exact path={`/market-place/subCategory`} element={<MarketPlaceSubCategory baseUrl={baseURL} />} />
            <Route exact path={`/market-place/products`} element={<MarketPlaceProductResults baseUrl={baseURL} />} />
            <Route exact path={`/market-place/new-product`} element={<MarketPlacePostProduct baseUrl={baseURL} logo={logoBlueImage} />} />
            <Route exact path={`/Show-Product/:id/:slug?`} element={<ProductShowPage />} />
            <Route exact path={`/eula`} element={<EulaGeorgiaPage />} />
            <Route exact path={`/User-Guide`} element={<UserGuide url={blogs_api} />} />
            <Route exact path={`/Show-User-Guide/:id/:slug?`} element={<ShowUserGuide />} />
            <Route exact path={`/Show-Service/:id?/:slug?`} element={<ShowServicePage />} />
            <Route exact path={`/Our-Service`} element={<OurService />} />
            <Route exact path={`/post-job`} element={<PostJobPage baseUrl={baseURL} />} />
            <Route exact path={`/post-rent`} element={<PostRentPage baseUrl={baseURL} />} />
            <Route exact path={`/rentForm`} element={<RentFormAc  baseUrl={baseURL}/> } />
            <Route exact path={`/form/:slug`} element={<JotForm />} />
            <Route exact path="/*" element={<Page404 />} />
             <Route exact path={`/jobforcompany`} element={<PostJobCompany baseUrl={baseURL}/>}/>
          </Routes>

        </main>

        <Footer
          logoImage={logoImage}
        />
      </Router>
    </>
  );
}

export default App;
