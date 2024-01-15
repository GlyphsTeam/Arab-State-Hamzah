import Menu from '../components/common/UserProfileMenu';
import SavedSection from '../components/userProfile/SavedSection';
import style from '../assets/style/userProfile/userProfile.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/login';
import axiso from 'axios';
import { setSavedDataProfile } from '../redux/Rent/rent';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
function SavedJobPage() {
  const [t] = useTranslation();
  const url = `profile/save`;


  const dispatch = useDispatch();
  const savedRent = useSelector((state) => state.rent.savedDataRent);

  const getSavedRent = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;

    if (savedRent === null) { 
    dispatch(setLoading(true))
    await axiso.get(`${baseURL}/${url}`, {
      headers: { "Authorization": `Bearer ${token}` }

    }).then((res) => {
      dispatch(setSavedDataProfile(res.data?.data));
      dispatch(setLoading(false))

    }).catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
    })
  }
  }
  useEffect(() => {
    getSavedRent();
  }, []);

  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='1' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <SavedSection savedData={savedRent?.rents} type='house' />
      </div>

    </div>
  )
}

export default SavedJobPage