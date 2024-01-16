import Menu from '../components/common/UserProfileMenu';
import UserPostsSection from '../components/userProfile/UserPostsSection';
import style from '../assets/style/userProfile/userProfile.module.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/login';
import { setPostedMarket } from '../redux/Market/market';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
function MyJobPage({ baseUrl }) {

  const url = `user/my-post`;

  const [t] = useTranslation();
  const dispatch = useDispatch();
  const postedProduct = useSelector((state) => state.market.postedMarket);

  const getPostedPage = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;

    dispatch(setLoading(true));
    await axios.get(`${baseURL}/${url}`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then((res) => {
   
      dispatch(setPostedMarket(res.data?.data))
      dispatch(setLoading(false));
   
    }).catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
    })

  }
  useEffect(()=>{
    getPostedPage()
  },[]);

  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='2' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <UserPostsSection savedData={postedProduct} type='product' baseUrl={baseUrl} />
      </div>

    </div>
  )
}

export default MyJobPage