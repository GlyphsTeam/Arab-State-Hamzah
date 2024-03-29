import style from "../../assets/style/marketProfile.module.css";
import FavoriteContact from "./Favorite_Contact";
import Alert from "../customAlert/Alert";
import { useState } from "react";
import { useTranslation } from "react-i18next";
function Description({ data }) {
  const [t] = useTranslation();
  const [count, setCount] = useState();
  const [show, setShow] = useState(false);
  return (
    <>
      <FavoriteContact data={data} setShow={setShow} setCount={setCount} />
      <div className={`${style.descriptionSection}`}>
        <h4>{t("Description")}</h4>
        <p>{data?.description}</p>
      </div>
      <Alert
        type="warning"
        message={t("Please login first.")}
        show={show}
        setShow={setShow}
        time="5000"
        count={count}
        setCount={setCount}
      />
    </>
  );
}
export default Description;