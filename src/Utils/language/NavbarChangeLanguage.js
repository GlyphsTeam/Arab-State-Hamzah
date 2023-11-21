import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavbarChangeLanguage() {
    const { t, i18n } = useTranslation();

    const location = useLocation();
    const navigate = useNavigate();

    const { pathname } = location;

    useEffect(() => {
      const { pathname } = location;
      const params = pathname.split('/');
      const lang = params[1]; 
  
      if(lang === 'ar' || lang === 'en'){
        urlChangeLang(lang);
      }else{
  
        urlChangeLanguageDefault();
      }
    }, [pathname]);
  
  
    
    const urlChangeLanguageDefault = () => {
      const { pathname } = location;
      const params = pathname.split('/');
      const lang = localStorage.getItem("lang");
      if(lang === 'ar' || lang === 'en'){
        urlChangeLang(lang, 'defaultPath')
      }else{
        urlChangeLang('en')
      }
  
    };
  
    
  
    const urlChangeLang = (lang, type) => {
      const { pathname } = location;
        const params = pathname.split('/');
        const langUrl = params[1]; 
        const newUrlLang = params[2];
        localStorage.setItem("lang", lang);
        i18n.changeLanguage(lang);
        langDir(lang);
  
        if(langUrl === 'ar' || langUrl === 'en'){
          const newPath = pathname.replace(`${langUrl}/`, "");
          navigate(`${lang}${newPath}`);
        }else{
          if(type === 'defaultPath'){
            navigate(`/${lang}${pathname}`)
          }else{
          newUrlLang?
                  navigate(`/${lang}/${pathname}`)
                  :
                  navigate(`/${lang}/`);
          }
        }
    };
  
  
  const langDir = (newLang) => {
    if(newLang === 'ar'){
        document.getElementById("root").style.direction = "rtl";
    }else{
        document.getElementById("root").style.direction = "ltr";
    }
  };

    return null;
}