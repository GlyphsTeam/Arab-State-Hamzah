
import Menu from '../components/common/UserProfileMenu';
import SavedSection from '../components/userProfile/SavedSection';
import style from '../assets/style/userProfile/userProfile.module.css'
import { setSavedJobData } from '../redux/Rent/rent';
import axios from 'axios';
import { setLoading } from '../redux/slices/login';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
function SavedJobPage() {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const savedJob = useSelector((state) => state.rent.savedDataJob);

  const url = `profile/save`;

  const getSavedJob = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;

    if (savedJob === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }

      }).then((res) => {
        dispatch(setSavedJobData(res.data?.data));
        dispatch(setLoading(false));

      }).catch((err) => {
        console.log(err);
      });
    }

  }
  useEffect(() => {
    getSavedJob();
  }, []);

  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='1' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <SavedSection savedData={savedJob?.jobs} type='job' />
      </div>

    </div>
  )
}

export default SavedJobPage