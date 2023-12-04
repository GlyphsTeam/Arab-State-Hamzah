import { Link } from "react-router-dom";
import style from "../../assets/style/homePage/job.module.css";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Card({ data }) {
  const [t, i18n] = useTranslation();

  return (
    <>
      {data && (
        <Link state={{ type: "" }} to={data?.link} className={style.navLink}>
          <div className={style.jobCard}>
            <LazyLoadImage
              className={style.jobSectionImg}
              src={data?.image}
              alt="Card cap"
            />
            <p className={style.cardParagraph}>{data?.short}</p>
          </div>
          <div className={style.descriptionParagraphDiv}>
            <h2 className={style.cardTitle}>{data?.title}</h2>
            <h2 className={style.cardText}>{t("find more")}</h2>
          </div>
        </Link>
      )}
    </>
  );
}

export default Card;
