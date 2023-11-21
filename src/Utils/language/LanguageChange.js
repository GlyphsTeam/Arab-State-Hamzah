import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function LanguageChange() {
    const location = useLocation();
    const navigate = useNavigate();
    const [t, i18n] = useTranslation();

    const langDir = (newLang) => {
        if(newLang === 'ar'){
            document.getElementById("root").style.direction = "rtl";
        }else{
            document.getElementById("root").style.direction = "ltr";
        }
      };

    const changeLang = (newLang) =>{
        i18n.changeLanguage(newLang);
        localStorage.setItem("lang", newLang);
        langDir(newLang);
    };

    useEffect(() => {
        const { pathname } = location;
        const params = pathname.split('/'); // Split the pathname by '/' character
        const localLang = params[1]; // Access the parameter value at the desired index

             localLang === 'ar'
          ? changeLang('ar')
          : changeLang('en');
      }, [location]);

    return null;
}