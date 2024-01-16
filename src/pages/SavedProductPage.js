import Menu from '../components/common/UserProfileMenu';
import SavedSection from '../components/userProfile/SavedSection';
import style from '../assets/style/userProfile/userProfile.module.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSavedMarket } from '../redux/Market/market';
import { setLoading } from '../redux/slices/login';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function SavedProductPage() {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const productSaved = useSelector((state) => state.market.savedMarket);

  const url = `profile/market/save`;

  const getSavedProduct = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (productSaved === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {

        dispatch(setLoading(false));
        dispatch(setSavedMarket(res.data?.data));

      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));

      });
    }
  }
  useEffect(() => {
    getSavedProduct();
  }, []);
  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='1' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <SavedSection savedData={productSaved} type='product' />
      </div>

    </div>
  )
}

export default SavedProductPage