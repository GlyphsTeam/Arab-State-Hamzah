import Menu from '../components/common/UserProfileMenu';
import SavedSection from '../components/userProfile/SavedSection';
import style from '../assets/style/userProfile/userProfile.module.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSavedBussiness } from '../redux/Business/business';
import axios from 'axios';
import { setLoading } from '../redux/slices/login';
import { useTranslation } from 'react-i18next';
function SavedStorePage() {
  const [t] = useTranslation();
  const url = `profile/favorite`;
  const savedBuisness = useSelector((state) => state.business.savedBussiness);
  const dispatch = useDispatch();

  const getSavedBuisness = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;

    if (savedBuisness === null) {
      dispatch(setLoading(true));

      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }

      }).then((res) => {

        dispatch(setSavedBussiness(res.data?.data));
        dispatch(setLoading(false));

      }).catch((err) => {
        console.log(err);
      })
    }
    }
    useEffect(() => {
      getSavedBuisness();
    }, [])
    return (
      <div className={`row w-100 m-0 ${style.userPage}`}>

        <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
          <Menu activeList='1' />
        </div>

        <div className='col-lg-9 col-md-8 col-sm-12'>
          <SavedSection savedData={savedBuisness} type='store' />
        </div>

      </div>
    )
  }

  export default SavedStorePage