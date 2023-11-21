import React, { useEffect, useState } from 'react';
import style from '../assets/style/jotForm/jotForm.module.css';
import Banner from '../components/common/banner/Banner';
import useAxios from '../hooks/useAxiosGet';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const JotFormEmbed = () => {
    const [t] = useTranslation();
    const {slug} = useParams();

    const [Data] = useAxios(`jotform/${slug}`);
    const [formHeight, setFormHeight] = useState(0);
  
  useEffect(() => {
    const handleIFrameMessage = (e) => {
      // Your message handling code here
    };

 
    if (window.addEventListener) {
      window.addEventListener("message", handleIFrameMessage, false);
    } else if (window.attachEvent) {
      window.attachEvent("onmessage", handleIFrameMessage);
    }

  }, []);

  useEffect(() => {
    if(Data?.data?.height){
        setFormHeight(Data?.data?.height);
    }else{
        setFormHeight(700);
    }
  }, [Data]);

  return (
    <>
    <Banner advUrl='ads?page=jotform' />

    {/* https://form.jotform.com/231413769138459 */}
    
    {Data?.data ? (
        <div style={{height: `${formHeight}px`}}>
        <iframe
            className={style.form}
            id={`JotFormIFrame-${Data?.data?.form_id}`}
            title={`${Data?.data?.title}`}
            allowtransparency="true"
            // allowfullscreen="true"
            allow="geolocation;"
            src={`https://form.jotform.com/${Data?.data?.form_id}`}
            // frameborder="0"
            style={{ minWidth: '100%', maxWidth: '100%',  border: 'none' }}
            // scrolling="no"
        />
        </div>
       )
      :
      <h1 className={style.expiredForm}>{t('Sorry this form has been expired or not available')}</h1>
      } 
    </>
  );
};

export default JotFormEmbed;
