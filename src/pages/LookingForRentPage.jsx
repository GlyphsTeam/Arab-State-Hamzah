import HeroNav from '../components/common/HeroNav'
import LookingFor from '../components/common/lookingFor/LookingFor'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux';
import { rentState, setRentData } from '../redux/Rent/rent';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { setLoading } from '../redux/slices/login'
import { useEffect } from 'react';

const LookingForRentPage = () => {
  const url = `rents/web/looking_for`;
  const dispatch = useDispatch();
  const stateLooking = useSelector(rentState);
  const [t] = useTranslation();

  const getLookingData = async () => {

    const token = localStorage.getItem("arab_user_token");

    const city_ID = process.env.REACT_APP_City_ID;

    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (stateLooking.rentData === null) {
      dispatch(setLoading(true));

      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {

        dispatch(setRentData(res.data?.data));

        dispatch(setLoading(false));

      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  useEffect(() => {
    getLookingData();
  }
    , [])
    console.log("stateLooking>>>>",stateLooking)
  return (
    <div>
      <Helmet>
        <title>{stateLooking?.rentData?.slider?.main?.title}</title>
        <meta name='description' content={stateLooking?.rentData?.slider?.main?.description} />
      </Helmet>
      <HeroNav
        mainData={stateLooking?.rentData?.slider}
        subData={stateLooking?.rentData?.slider?.model}
      />
      <LookingFor pageType='rent' />

    </div>
  )
}

export default LookingForRentPage