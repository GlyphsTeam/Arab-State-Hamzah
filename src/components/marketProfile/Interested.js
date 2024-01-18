import style from "../../assets/style/marketProfile.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import React, { useState, useEffect } from "react";

function Interested({ data }) {
  const [t] = useTranslation();
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const [stateAndEnd, setStartEnd] = useState({
    start: 0,
    end: 3
  })
  useEffect(() => {
    const handleResize = () => {
      setWidthScreen(window.innerWidth);
    };
    if (widthScreen < 500) {
      setStartEnd({
        ...stateAndEnd,
        end:2
      });
    }
    else{
      setStartEnd({
        ...stateAndEnd,
        end:3
      });
    }
    window.addEventListener('resize', handleResize);
  }, [])
  console.log("widthScreen>>>",widthScreen)
  let urlId;

  return (
    <div className={`${style.mainSection} row`}>
      <div className={`${style.subLastSection} col-10 mt-5`}>
        {data?.similar && (
          <>
            <h2 className={`mt-5 pb-3 ${style.interestedTitle}`}>
              {t("You may be interested in")}{" "}
            </h2>
            <div className={`${style.lastSection}`}>
              {data?.similar?.slice(stateAndEnd.start, stateAndEnd.end).map((item, index) => (
                <div
                  key={index}
                  className={`col-12 col-sm-6 ${style.interestedCardContainer}`}
                >
                  <Link
                    to={`/MarketProfile/${item?.slug}/${item?.id}`}
                    state={(urlId = { id: item?.id })}
                  >
                    <LazyLoadImage src={item.image} alt="imageInter" />
                    <p className={style.interested}>{item.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Interested;
