import Menu from '../components/common/UserProfileMenu';
import style from '../assets/style/userProfile/userProfile.module.css'
import CardBussiness from '../components/subCategory/SubCategoryCard';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { setPostedBussiness } from '../redux/Business/business';
import { setLoading } from '../redux/slices/login';
import axios from 'axios';
import { useEffect } from 'react';

function MyBusiness() {
  const url = 'business';
  const [t] = useTranslation();
 

  const dispatch = useDispatch();
  const bussinesPosted = useSelector((state) => state.business.postedBussiness);

  const getPostedBussines = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (bussinesPosted === null) {
      dispatch(setLoading(true));
      await axios.get(`${baseURL}/${url}`, {

        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        dispatch(setPostedBussiness(res.data?.data));
        dispatch(setLoading(false));
      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }

  }
  useEffect(()=>{
    getPostedBussines();
  },[])

  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='2' />
      </div>
      <p className={style.parProfile}><span dangerouslySetInnerHTML={{ __html: t('My Posts > Business') }} /></p>
      <div className={`col-lg-9 col-md-8 col-sm-12 ${bussinesPosted?.businesses?.length > 0 ? style.cardConianerGridBussiness : style.cs}`}>
        {bussinesPosted?.businesses?.length > 0 ?
          bussinesPosted?.businesses?.map((data) => {
            return (<CardBussiness data={data} key={data._id} typePage={2} />)
          }) :
          <p className={style.emptyUserMessage}>{t("emptyUserMessage")}</p>

        }
      </div>

    </div>
  )
}

export default MyBusiness