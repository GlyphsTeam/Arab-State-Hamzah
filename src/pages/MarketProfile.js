import React, { lazy, useState } from "react";
import style from "../assets/style/marketProfile.module.css";
import useAxios from "../hooks/useAxiosGet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';

const MainStoreCard = lazy(() => import("../components/marketProfile/MainStoreCard"));
const Description = lazy(() => import("../components/marketProfile/Description"));
const OfferComponent = lazy(() => import("../components/marketProfile/OfferComponent"));
const StoreMap = lazy(() => import("../components/marketProfile/StoreMap"));
const SocialMedia = lazy(() => import("../components/marketProfile/SocialMedia"));
const Gallery = lazy(() => import("../components/marketProfile/Gallery"));
const Section = lazy(() => import("../components/marketProfile/Interested"));
const PhotoPreview = lazy(() => import("../components/marketProfile/ViewImagesSlider"));
const StoreHero = lazy(() => import("../components/marketProfile/StoreHero"));

function MarketProfile({isLoaded }) {
  const [t] = useTranslation();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('arab_user_token');
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1];
  let url;
  if (token) {
    url = `business/show/${id}`;
  }
  else {
    url = `show-store/${id}`;
  }
  let [Data] = useAxios(url);
  const data = Data.data;

  return (
    <>
      <Helmet>
        <title>{data?.name}</title>
        <meta name="description" content={data?.description} />
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
              <StoreMap data={data} isLoaded={isLoaded}/>
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
