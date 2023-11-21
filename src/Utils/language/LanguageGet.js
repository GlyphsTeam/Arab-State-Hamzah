import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LanguageGet() {
    const [t, i18n] = useTranslation();

    const [lang, setLang] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    const urlChangeLang = (lang) => {
        const { pathname } = location;
        const params = pathname.split('/');
        const newUrlLang = params[2]; 
//   newUrlLang?
//           navigate(`${lang}/${newUrlLang}`)
//           :
//           navigate(`${lang}`);
    };

    // useEffect(() => {
    //     setLang(localStorage.getItem('lang'));
    //     // urlChangeLang(localStorage.getItem('lang'));
    //     }, [localStorage.getItem('lang')]);
  
        useEffect(() => {
            const { pathname } = location;
            const params = pathname.split('/');
            const localLang = params[1]; 
    
                 localLang === 'ar'
              ? changeLang('ar')
              : changeLang('en');
          }, [location]);

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
