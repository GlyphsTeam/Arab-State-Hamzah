import style from "../../assets/style/common/mainRowCard.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser';
import { LazyLoadImage } from "react-lazy-load-image-component";

function MainRowCard({ data}) {
  const [t] = useTranslation();
  const handleChangePage = () => {
    window.scrollTo(0, 0);
  };
  console.log("data>>>",data)
  return (
    <>
      {/* <h2 className={style.popularHeader}>{t("Our Services")}</h2>
      <div className={`${style.columnCardsContainer} pt-4`}> */}
        {data?.map((item, index) => (
          <Link
            key={index}
            to={item?.link}
            onClick={handleChangePage}
          >
            <div className={style.columnCardsContainerDiv}>
              <div className={style.colCardImg}>
                <LazyLoadImage src={item.image} />
              </div>
              <div className={style.cloumnParagraph}>
                <h3>{item.title} </h3>
                <div className={style.textDiv}>
                <p>
                  {item?.web_short && ReactHtmlParser(`${item?.web_short}`)}
                  </p>
                  </div>
                  <div className={style.columnCardReadMore}>
                  <Link
                     key={index}
                     to={item?.link}
                     onClick={handleChangePage}
                  >
                    <small className={style.readMoreText}>
                      {t("Read More")}
                    </small>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
      
      {/* </div> */}
    </>
  );
}
export default MainRowCard;