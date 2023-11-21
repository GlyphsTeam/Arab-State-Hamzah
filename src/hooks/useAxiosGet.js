import { useState, useEffect } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";

function useAxios(url) {
  const [t, i18n] = useTranslation();
  const [Data, setData] = useState([]);
  const token = localStorage.getItem('arab_user_token');

  const cityId = localStorage.getItem("cityId");
  const city_ID = process.env.REACT_APP_City_ID;

  let cityIdUrl = `/${city_ID}`;
  useEffect(() => {
    if(cityId){
      cityIdUrl = `/${cityId}`;
    }else{
      cityIdUrl = `/${city_ID}`;
    }
    }, [cityId]);

  const baseURL = token
  ? `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`
  : `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
  useEffect(() => {
     try { 
        axios
        .get(`${baseURL}/${url}`, { headers: {"Authorization" : `Bearer ${token}`}
         
      })
        .then((response) => setData(response.data))
      } 
      catch (error) {
        console.log(error);
      }
    }, [url, i18n.language]);
  
    return [Data , setData];
}
  

export default useAxios;
