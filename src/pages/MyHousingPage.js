import Menu from '../components/common/UserProfileMenu';
import UserPostsSection from '../components/userProfile/UserPostsSection';
import style from '../assets/style/userProfile/userProfile.module.css'
import { setPostedRent } from '../redux/Rent/rent';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/login';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SavedJobPage({ baseUrl }) {
  const location = useLocation();
  const { stateLoading } = location.state || {};

  const url = `user/my-post`;

  const dispatch = useDispatch();
  const postedRent = useSelector((state) => state.rent.postedRent);
  const [t] = useTranslation();
  const getPostedRent = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (postedRent === null || stateLoading === true) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }

      }).then((res) => {
        dispatch(setPostedRent(res.data?.data))
        dispatch(setLoading(false));
      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  useEffect(() => {
    getPostedRent();

  }, []);
  console.log("postedRent>>>>>>", postedRent)
  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='2' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <UserPostsSection savedData={postedRent} type='house' baseUrl={baseUrl} />
      </div>

    </div>
  )
}

export default SavedJobPage