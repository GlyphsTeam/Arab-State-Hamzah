import { useState, useEffect } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/login';
function useAxios(url, loading) {
  const [t] = useTranslation();
  const [Data, setData] = useState([]);
  const token = localStorage.getItem('arab_user_token');
  const dispatch = useDispatch();
  const cityId = localStorage.getItem("cityId");
  const city_ID = process.env.REACT_APP_City_ID;
  let loadingStatus;
  if(loading==="false"){
    loadingStatus = false;
  }
  else{
    loadingStatus = true;
  }
  let cityIdUrl = `/${city_ID}`;
  useEffect(() => {
    if (cityId) {
      cityIdUrl = `/${cityId}`;
    } else {
      cityIdUrl = `/${city_ID}`;
    }
  }, [cityId]);

  const baseURL = token
    ? `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`
    : `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
  useEffect(() => {
    dispatch(setLoading(loadingStatus));
    try {
      axios
        .get(`${baseURL}/${url}`, {
          headers: { "Authorization": `Bearer ${token}` }

        })
        .then((response) =>{
          setData(response.data);
          dispatch(setLoading(false));

        })
    }
    catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  }, [url]);

  return [Data, setData];
}


export default useAxios;
