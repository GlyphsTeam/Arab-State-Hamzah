import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function useFetch(url, formData, send) {
  const [Res, setRes] = useState([]);
  const { t, i18n } = useTranslation();

  const token = localStorage.getItem("arab_user_token");
  const cityId = localStorage.getItem("cityId");
  const city_ID = process.REACT_APP_City_ID;

  let cityIdUrl = `/${city_ID}`;
  useEffect(() => {
    if(cityId){
      cityIdUrl = `/${cityId}`;
    }else{
      cityIdUrl = `/${city_ID}`;
    }
    }, [cityId]);
    
    const baseUrl = token? `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}` : `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;

  useEffect(() => {
    if(send){
     try {
        fetch(`${baseUrl}/${url}`, {
            headers: { 'Authorization': `Bearer ${token}` , 'Accept': 'application/json' },
            method: 'POST',
            body: formData
          })
          .then((response) => setRes(response.data))
      } 
      catch (error) {
        console.log(error);
      }
    }
    }, [url, formData, send]);
 
    return [Res , setRes];
}
  

export default useFetch;
