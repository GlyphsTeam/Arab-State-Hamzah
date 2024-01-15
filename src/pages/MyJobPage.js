import Menu from '../components/common/UserProfileMenu';
import UserPostsSection from '../components/userProfile/UserPostsSection';
import style from '../assets/style/userProfile/userProfile.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { setPostedJob } from '../redux/Rent/rent';
import { setLoading } from '../redux/slices/login';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
function MyJobPage({ baseUrl }) {
  const url = `user/jobs`;
  const [t] = useTranslation();
  const jobPosted = useSelector((state) => state.rent.postedJob);
  const dispatch = useDispatch();
  const getJobPosted = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;

    dispatch(setLoading(true));
    await axios.get(`${baseURL}/${url}`, {

      headers: { "Authorization": `Bearer ${token}` }
    }).then((res) => {

      dispatch(setPostedJob(res.data?.data));
      dispatch(setLoading(false));

    }).catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
    })
  }
  useEffect(() => {
    getJobPosted();
  }, [])
  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='2' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <UserPostsSection savedData={jobPosted} type='job' baseUrl={baseUrl} />
      </div>

    </div>
  )
}

export default MyJobPage