import style from "../../assets/style/showProduct/subProductInformation.module.css";
import { useTranslation } from "react-i18next";

function SubProductInformation({showProductData}) {
  const [t] = useTranslation();

  return (
    <div className={`${style.subProductInformationContainer} pt-5`}>
      <h2>{t("Information")}</h2>
      <div >
          {showProductData?.information.map((item, index)=> (
            
            item.value && (
              <div key={index} className={`${style.subProductDiv}`}>
              <p>{item.title}: <span className="p-4">{item.value}</span></p>
              </div>
            )

          ))}
      
         
      </div>
    </div>
  );
}

export default SubProductInformation;
