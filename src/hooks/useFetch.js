import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function useFetch(url, formData, send) {
  const [Res, setRes] = useState([]);
  const { t, i18n } = useTranslation();

  const token = localStorage.getItem("arab_user_token");
  const cityId = localStorage.getItem("cityId");
  let cityIdUrl = '/0';
  useEffect(() => {
    if(cityId){
      cityIdUrl = `/${cityId}`;
    }else{
      cityIdUrl = '/0';
    }
    }, [cityId]);
    
    const baseUrl = token? `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0` : `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/0`;

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
