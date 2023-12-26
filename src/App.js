import React, { useEffect, useState, lazy, Suspense } from "react";
import { Crisp } from "crisp-sdk-web";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import { useTranslation } from "react-i18next";
import OneSignal from 'react-onesignal';
import useAxios from "./hooks/useAxiosGet";
import Spinner from './Utils/SpinnerFunction';
import { useSelector } from 'react-redux';
import { stateCategory } from './redux/slices/login';
import GetLang from './Utils/language/GetLang'
const Home = lazy(() => import('./pages/Home'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const SavedStorePage = lazy(() => import('./pages/SavedStorePage'));
const SavedAccomodationPage = lazy(() => import('./pages/SavedAccomodationPage'));
const SavedJobPage = lazy(() => import('./pages/SavedJobPage'));
const SavedProductPage = lazy(() => import('./pages/SavedProductPage'));
const MyJobPage = lazy(() => import('./pages/MyJobPage'));
const MyProductPage = lazy(() => import('./pages/MyProductPage'));
const MyHousingPage = lazy(() => import('./pages/MyHousingPage'));
const DeleteAccountPage = lazy(() => import('./pages/DeleteAccountPage'));
const MarketProfile = lazy(() => import('./pages/MarketProfile'));
const Category = lazy(() => import('./pages/CategoryPage'));
const SubCategory = lazy(() => import('./pages/SubCategory'));
const Blog = lazy(() => import('./pages/Blog'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Contact = lazy(() => import('./pages/ContactUs'));
const Page404 = lazy(() => import('./pages/Page404'));
const PrivacyPolicy = lazy(() => import('./components/legal/PrivacyPolicy'));
const Terms_conditions = lazy(() => import('./components/legal/Terms_conditions'));
const ShowBlog = lazy(() => import('./pages/ShowBlog'));
const About = lazy(() => import('./pages/AboutPage'));
const ChangePassword = lazy(() => import('./components/userProfile/ChangePassword'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const MarketPlaceCategory = lazy(() => import('./pages/MarketPlaceCategoryPage'));
const MarketPlaceSubCategory = lazy(() => import('./pages/MarketPlaceSubCategoryPage'));
const MarketPlaceProductResults = lazy(() => import('./pages/MarketPlaceProductResultsPage'));
const MarketPlacePostProduct = lazy(() => import('./pages/MarketPlacePostProductPage'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));
const ProductShowPage = lazy(() => import('./pages/ProductShowPage'));
const EulaGeorgiaPage = lazy(() => import('./pages/EulaGeorgiaPage'));
const MetaPixel = lazy(() => import('./Utils/MetaPixel'));
const UserGuide = lazy(() => import('./pages/UserGuidePage'));
const ShowUserGuide = lazy(() => import('./pages/ShowUserGuide'));
const ScrollToTopButton = lazy(() => import('./components/common/ScrollToTopButton'));
const SearchResultPage = lazy(() => import('./pages/SearchResultPage'));
const OurService = lazy(() => import('./pages/OurService'));
const ShowRentPage = lazy(() => import('./pages/ShowRentPage'));
const ShowJobPage = lazy(() => import('./pages/ShowJobPage'));
const JotForm = lazy(() => import('./pages/JotFormPage'));
const PrivateRoutes = lazy(() => import('./Utils/PrivateRoutes'));
const JobPage = lazy(() => import('./pages/LookingForJobPage'));
const RentPage = lazy(() => import('./pages/LookingForRentPage'));
const Jobs = lazy(() => import('./pages/JobPage'));
const Rents = lazy(() => import('./pages/RentPage'));
const PostJobPage = lazy(() => import('./pages/PostJobPage'));
const PostRentPage = lazy(() => import('./pages/PostJobPage'));
const CityHome = lazy(() => import('./pages/multiCity/Home'));
const SpinnerStatic = lazy(() => import('./components/common/Spinner'));
const Business = lazy(() => import('./components/addbussinse/Business'));
const MyBusiness = lazy(() => import('./pages/MyBusiness'));
const RentFormAc = lazy(() => import('./components/JobRentForm/rentForm/RentFormApartment'));
const MySavedBlogs = lazy(() => import('./pages/MySavedBlogs'));
const PostJobCompany = lazy(() => import('./pages/PostJobCompany'))
function App() {
  let generalUrl = "general-setting";
  const [Data] = useAxios(generalUrl);
  const logoImage = Data?.data?.navbar?.logo;
  const logoBlueImage = Data?.data?.logo;
  const city = process.env.REACT_APP_City;
  const stateMus = useSelector(stateCategory);
  if (city === "GA") {
    import('./assets/style/App.module.css').then(() => {
    }).catch((error) => console.log(error))
  }
  if (city === "NY") {
    import('./assets/style/statesPalettes/arabNewYork/App.module.css').then(() => {
    }).catch((err) => console.log(err))
  }
  if (city === "IL") {
    import('./assets/style/statesPalettes/arabChicago/App.module.css').then(() => {
    }).catch((error) => console.log(error))
  }
  if (city === "NJ") {
    import('./assets/style/statesPalettes/arabNewJersey/App.module.css').then(() => {
    }).catch((err) => console.log(err))
  }
  if (city === "DE") {
    import('./assets/style/statesPalettes/arabdetroit/App.module.css').then(() => {
    }).catch((err) => console.log(err));
  }
  if (city === "TX") {
    import('./assets/style/statesPalettes/arabHouston/App.module.css').then(() => {
    }).catch(((err) => console.log(err)))
  }
  if (city === "FL") {
    import('./assets/style/statesPalettes/arabOrlando/App.module.css').then(() => {
    }).catch((err) => console.log(err));
  }
  if (city === "CA") {
    import('./assets/style/statesPalettes/LosAngeles/App.module.css').then(() => {
    }).catch((err) => console.log(err));
  }
  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONE_SIGNAL_KEY,
    });
  }, []);

  const [t] = useTranslation();

  const autherized = localStorage.getItem("arab_user_token");

  const cityId = localStorage.getItem("cityId");
  const city_ID = process.env.REACT_APP_City_ID;
  let cityIdUrl = `/${city_ID}`;
  useEffect(() => {
    if (cityId) {
      cityIdUrl = `/${cityId}`;
    } else {
      cityIdUrl = `/${city_ID}`;
    }
  }, [cityId]);

  const authAPI = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
  const guestAPI = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;

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

  return (
    <>

      <Router basename={`/${lang}`}>
        {stateMus?.isLoading ? (
          <>
            <SpinnerStatic />
          </>
        ) : <></>}

        <MetaPixel />
        <ScrollToTop />
        <ScrollToTopButton />
        <Navbar url={login_api} regesterUrl={regester_api} logoImage={logoImage} />
        <Suspense fallback={<Spinner />}>
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
                <Route path={`/saved-blogs`} element={<MySavedBlogs />} />
                <Route path={`/delete-account`} element={<DeleteAccountPage baseUrl={authAPI} logo={logoBlueImage} />} />
                <Route path={`/changePassword`} element={<ChangePassword baseUrl={authAPI} logo={logoImage} />} />
                <Route path={'/add-bussinse'} element={<Business baseURL={baseURL} />} />
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
              {/* <Route exact path={`/Show-Service/:id?/:slug?`} element={<ShowServicePage />} /> */}
              <Route exact path={`/Our-Service`} element={<OurService />} />
              <Route exact path={`/post-job`} element={<PostJobPage baseUrl={baseURL} />} />
              <Route exact path={`/post-rent`} element={<PostRentPage baseUrl={baseURL} />} />
              <Route exact path={`/rentForm`} element={<RentFormAc baseUrl={baseURL} />} />
              <Route exact path={`/form/:slug`} element={<JotForm />} />
              <Route exact path="/*" element={<Page404 />} />
              <Route exact path={`/jobforcompany`} element={<PostJobCompany baseUrl={baseURL} />} />
            </Routes>

          </main>
        </Suspense>
        <Footer
          logoImage={logoImage}
        />
      </Router>
    </>
  );
}

export default App;
