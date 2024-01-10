import { useTranslation } from "react-i18next";
import style from "../../../assets/style/common/bannerWInfo.module.css";
import { Link } from 'react-router-dom';
import ReactHtmlParser from "html-react-parser";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ButtonThree from "../../Button/ButtonThree";
import { useSelector } from 'react-redux'
import { homeState } from '../../../redux/Home/home';

const BannerWInfo = () => {
  const [t, i18n] = useTranslation();
  const stateHome = useSelector(homeState);

  return (
    <>
      {stateHome?.homeData?.hero?.slice(0, 1).map((item, index) => (
        <div className={style.mainDiv}>

          <LazyLoadImage className={style.hero} src={item?.media} key={index} alt='Hero' />
          <div className={style.infoDiv}>
            <LazyLoadImage  className={`${style.square} ${i18n.language === 'ar' ? style.squareAr : ''}`} src={require('../../../assets/Images/common/heroSquare.png')} alt="Square"/>
            <div className={style.articleDiv}>
              <h2 className={style.mainTitle}>
                {item?.title}
              </h2>

              <p className={style.description}>
                {item?.description && ReactHtmlParser(`${item?.description}`)}
              </p>

              <Link className={i18n.language === 'en' ? style.btnLink : style.btnLinkAr} to={'/about'}>
                <ButtonThree>
                {t('Read More')}
                </ButtonThree>
              </Link>
            </div>
          </div>

        </div>
      ))}
    </>
  )
}

export default BannerWInfo