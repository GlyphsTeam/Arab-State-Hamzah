import React, { useState } from "react";
import style from "../../../assets/style/layout/footer.module.css";
import UseFetchPost from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";
// import useAxios from "../../hooks/useAxios";
function SubscribeFooter() {
  let url = `subscribes`;

  const [email, setEmail] = useState("");
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [send, setSend] = useState(false);
  const formData = new FormData();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { t, i18n } = useTranslation();

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  email && formData.append("email", email);
  const [Res] = UseFetchPost(url, formData, send);

  const checkValidation = (event) => {
    setIsValidEmail(regex.test(event));
    setEmail(event);
    if (regex.test(event)) {
      setShowEmailWarning(false);
    }
  };
  const handleSubscribe = (event) => {
    // event.preventDefault();
    // setIsValidEmail(regex.test(email));
    setShowEmailWarning(false);
    if (regex.test(email)) {
      setSend(true);
      setIsSubscribed(true);
      setTimeout(() => {
        setSend(false);
        setEmail("");
      }, 100);
      setTimeout(() => {
        setIsSubscribed(false);
      }, 4000);
    } else {
      setShowEmailWarning(true);
    }
  };
  return (
    <div className={style.mainSubscribeDiv}>
      <div className={style.mainSubscribe}>
        <input
          className={style.subscribeInput}
          type="text"
          id="email"
          name="email"
          placeholder={t("Enter your email")}
          value={email}
          onChange={(e) => checkValidation(e.target.value)}
        />
        {showEmailWarning && (
          <p className={style.warnEmail}>{t("Email is not valid")}</p>
        )}
        <div className={style.subscribeBtn}>
          <button
            className={`${style.subscribeButton} ${
              isSubscribed ? style.subscribed : ""
            }`}
            onClick={handleSubscribe}
          >
            {isSubscribed ? (
              <>
                <p>{t("subscribed")}</p>
                <i className="far fa-check-circle"></i>
              </>
            ) : (
              t("subscribe")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscribeFooter;
