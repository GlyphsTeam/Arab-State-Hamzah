import style from "../../assets/style/marketProfile.module.css";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaLocationDot } from "react-icons/fa6";

function StoreHero({ data }) {
  const [t] = useTranslation();

  const handleClickMap = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className={style.MarketingContainer}>
      <div key={data?.id} className={style.MarketingImgContainer}>
        {data?.banners[0]?.image ? (
          data?.banners.slice(0, 1).map((item, index) => (
            <div key={index}>
              {item.type === 'video' ?
                <video className={style.MarketingImg} loop autoPlay muted disableRemotePlayback playsInline="" data-wf-ignore="true" data-object-fit="cover">
                  <source
                    src={item?.image}
                    type="video/mp4"
                  />
                </video>
                :

                <LazyLoadImage className={style.MarketingImg} src={item?.image} alt="marketing" />
              }
            </div>
          ))
        ) : (
          // <LazyLoadImage
          //   className={style.MarketingImg}
          //   src={require("../../assets/Images/blog/GeorgiaBlog.png")}
          // />
          ''
        )}
        <div className={style.subHeader}>
          <LazyLoadImage className={style.GlyphsImg} src={data?.image} alt="GlyImage" />
          <div className={`${style.marketTitle} px-4 pt-3 `}>
            <h2 className={`fw-bold ${style.marketTitleSize}`}>{data?.name}</h2>
            {data?.locations_address && (
              <p className={`px-2 ${style.favoriteIconCursor} ${style.locationHederMarket} ${style.webAddress}`} onClick={() => handleClickMap(data?.locations_lat, data?.locations_lng)} >
                {/* <i className={`fas fa-map-marker-alt ${style.shareIconMargin}`}></i> */}
                <FaLocationDot className={style.shareIconMargin} />
                {data?.locations_address}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={style.Marketbtn}>
        <button>
          {data?.website_url && (
            <a
              className={style.websiteLink}
              href={data?.website_url}
              target="_blank"
            >
              {t("Visit Website")}
            </a>
            //  <button>{t("Visit Website")}</button>
          )}
        </button>
      </div>
      {data?.locations_address && (
        <p className={`px-4 ${style.favoriteIconCursor} ${style.locationHederMarket} ${style.mobileAddress}`} onClick={() => handleClickMap(data?.locations_lat, data?.locations_lng)} >
          <i className={`fas fa-map-marker-alt ${style.shareIconMargin}`}></i>
          {data?.locations_address}
        </p>
      )}
    </div>

  );
}
export default StoreHero;
