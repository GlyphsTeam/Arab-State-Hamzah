import style from '../../assets/style/showProduct/showProduct.module.css';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'html-react-parser';

function ShowProductDescription({showProductData}) {
  const [t] = useTranslation();

  return (
    <div className={`${style.showProductDescriptionContainer}  pt-5`}>
        <h2>
            {t("Description")}
        </h2>
        <p>
        {showProductData?.web_description ? ReactHtmlParser(`${showProductData?.web_description}`):showProductData?.description}
          </p>
    </div>
  )
}

export default ShowProductDescription