import Menu from '../components/common/UserProfileMenu';
import UserPostsSection from '../components/userProfile/UserPostsSection';
import useAxios from "../hooks/useAxiosGet";
import style from '../assets/style/userProfile/userProfile.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { setSavedBlogData } from '../redux/Blog/blog';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { setLoading } from '../redux/slices/login';
// import { useEffect } from 'react';
function MySavedBlogs({ baseUrl }) {
  const url = `profile/save`;
  const [t] = useTranslation();
  const [Data] = useAxios(url);
  const myData = Data?.data;
  const dispatch = useDispatch();
  const savedState = useSelector((state)=>state.blog.savedBlogData)
// console.log("savedState>>>",savedState)
  const getSavedBlogs = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    dispatch(setLoading(true));
    await axios.get(`${baseURL}/${url}`, {
 
      headers: { authorization: `Bearer ${token}` },
    }).then((res) => {
 
      dispatch(setSavedBlogData(res.data?.data))
      dispatch(setLoading(false));
 
    }).catch((err) => {
      console.log(err)
    })
  }
  // useEffect(()=>{
  //   getSavedBlogs();
  // },[])
  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='2' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <UserPostsSection savedData={myData} type='blog' baseUrl={baseUrl} />
      </div>
    </div>
  )
}

export default MySavedBlogs