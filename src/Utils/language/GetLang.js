import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function LanguageGet() {
    const [t, i18n] = useTranslation();

    const [lang, setLang] = useState();



        useEffect(() => {
            const  pathname  = window.location.href;
            const params = pathname.split('/');
            const localLang = params[3]; 

            if(localLang !== 'en' && localLang !== 'ar'){
                window.location.replace(`/en`)
            }else{
                
                localLang === 'ar'
                ? changeLang('ar')
                : changeLang('en');
            }

          }, [window.location.href]);

          const changeLang = (newLang) =>{
           
            i18n.changeLanguage(newLang);
            localStorage.setItem("lang", newLang);
            langDir(newLang);
            setLang(localStorage.getItem('lang'));
        };

        const langDir = (newLang) => {
            if(newLang === 'ar'){
                document.getElementById("root").style.direction = "rtl";
            }else{
                document.getElementById("root").style.direction = "ltr";
            }
          };

    return [lang , setLang];
}
  

export default LanguageGet;
