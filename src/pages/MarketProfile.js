import React, { useState } from "react";
import MainStoreCard from "../components/marketProfile/MainStoreCard";
import Description from "../components/marketProfile/Description";
import OfferComponent from "../components/marketProfile/OfferComponent";
import style from "../assets/style/marketProfile.module.css";
import StoreMap from "../components/marketProfile/StoreMap";
import SocialMedia from "../components/marketProfile/SocialMedia";
import Gallery from "../components/marketProfile/Gallery";
import Section from "../components/marketProfile/Interested";
import PhotoPreview from '../components/marketProfile/ViewImagesSlider';
import useAxios from "../hooks/useAxiosGet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StoreHero from "../components/marketProfile/StoreHero";
import { Helmet } from 'react-helmet';
function MarketProfile() {
  const [t] = useTranslation();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('arab_user_token');
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1];
  let url;
  if(token){
   url = `business/show/${id}`;
  }
  else{
    url = `show-store/${id}`;
  }
  let [Data] = useAxios(url);
  const data = Data.data;
  console.log("data>>>>>>",data)
  return (
    <>
    <Helmet>
      <title>{data?.name}</title>
      <meta name="description" content={data?.description}/>
    </Helmet>
      <div className={style.serviceComponent}>
        <StoreHero data={data} />
        <div className={`${style.marketingContainerSection} container col-12`}>
          <div className="row w-100 mt-1">
            <div className={`col-lg-8 col-md-12 col-sm-12`}>
              <Description data={data} />
              <MainStoreCard data={data} setShowPhotoModal={setShowPhotoModal} />
              <OfferComponent data={data} />
              <SocialMedia data={data} />
            </div>
            <div className={`col-lg-4 col-md-12 col-sm-12 pt-5 ${style.locationMargin}`}>
              <h4 className={style.mapTitle}>{t("Our location")}</h4>
              <StoreMap data={data} />
              {/* <Map lat='10.305385' lng='77.923029' /> */}
              <div className="mt-5">
                <div className={style.galleryTitleDiv}>
                  {data?.gallery?.length > 0 && (
                    <p className={style.galleryTitle}>{t("Photo Gallery")}</p>
                  )}
                </div>
                <Gallery data={data} setShowGalleryModal={setShowGalleryModal} />
              </div>
            </div>
          </div>
        </div>
        <Section data={data} />
      </div>

      {showPhotoModal && (
        <PhotoPreview photoGroup={data?.photos} setCloseModal={setShowPhotoModal} />
      )}

      {showGalleryModal && (
        <PhotoPreview photoGroup={data?.gallery} setCloseModal={setShowGalleryModal} />
      )}
    </>
  );
}
export default MarketProfile;
