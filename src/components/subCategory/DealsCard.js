/* eslint-disable jsx-a11y/alt-text */
import style from "../../assets/style/SubCategory.module.css";
import { useTranslation } from "react-i18next";


function DealsCard(props) {
  const [t] = useTranslation();

  const dealsCards = false;

  return (
    <>
  
    {dealsCards && (
    <div className={style.firstContainer}>
     <h1 className={style.dealsTitle}>{t("DEALS")}</h1>

      <div className={style.dealsContainer}>
        {dealsCards.map((item) => (
          <div key={item.id} className={style.dealsCard}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
       ) }
          </>
  );
}
export default DealsCard;
