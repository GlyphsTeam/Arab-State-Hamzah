import { useState, useEffect } from "react";
function useFetch(url, formData, token) {
  const [Res, setRes] = useState([]);
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
    
  useEffect(() => {
     try {
        fetch(`https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${url}`, {
            headers: { 'Authorization': `Bearer ${token}` , 'Accept': 'application/json' },
            method: 'POST',
            body: formData
          })
          .then((response) => setRes(response.data))
      } 
      catch (error) {
        console.log(error);
      }
    }, [url, formData]);
 
    return [Res , setRes];
}
  

export default useFetch;
