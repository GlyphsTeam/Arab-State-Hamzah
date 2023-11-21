import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import style from "../../../assets/style/layout/navbar.module.scss";

function AccordionComponent({handleCloseModal, data, serviceLinks}) {
  const [t, i18n] = useTranslation();

  return (
    <>
    {
    <Accordion defaultActiveKey="0">
      <Accordion.Item className={`${style.accordionItemMobile} accordion-public-class` } eventKey={''}>
        <Accordion.Header className={style.mainTitle} ><p >{t("Our Services")}</p></Accordion.Header>
        <Accordion.Body className={style.accordionBodyMobile}>
               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal} to="/show-service" state={({ id: serviceLinks?.service_provider?.id })}>
                {t("Service Provider")}
              </Link>

               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal}  to="/show-service" state={({ id: serviceLinks?.shops?.id })}>
               {t("Shops")}
              </Link>

               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal} to="/show-service" state={({ id: serviceLinks?.market_place?.id })}>
               {t("Market Place")}
              </Link>

               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal} to="/show-service" state={({ id: serviceLinks?.rent?.id })}>
               {t("Rent")}
              </Link>

               <Link className={`${style.linkColor} ${style.linkBlock}`} onClick={handleCloseModal} to="/show-service" state={({ id: serviceLinks?.jobs?.id })}>
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