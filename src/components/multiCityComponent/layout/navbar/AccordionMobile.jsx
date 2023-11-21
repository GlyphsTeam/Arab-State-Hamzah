import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import style from "../../../assets/style/layout/navbar.module.scss";

function AccordionComponent({handleCloseModal}) {
  const [t, i18n] = useTranslation();

  return (
    <>
    {
    <Accordion defaultActiveKey="0">
      <Accordion.Item className={`${style.accordionItemMobile} accordion-public-class` } eventKey={''}>
        <Accordion.Header className={style.mainTitle} ><p >{t("Our Services")}</p></Accordion.Header>
        <Accordion.Body className={style.accordionBodyMobile}>
               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal} to="/Category/services">
                {t("Service Provider")}
              </Link>

               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal} to="/Category/shops">
               {t("Shops")}
              </Link>

               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal} to="/market-place">
               {t("Market Place")}
              </Link>

               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal} to="/Jobs/Rent">
               {t("Rent")}
              </Link>

               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal} to="/Jobs/Job">
               {t("Jobs")}
              </Link>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    }
</>
  );
}

export default AccordionComponent;