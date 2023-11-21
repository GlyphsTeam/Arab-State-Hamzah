import React, { useState, useRef } from "react";
import style from "../../assets/style/userProfile.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Alert from "../customAlert/Alert";
const ChangePassword = ({baseUrl}) => {
  const token = localStorage.getItem("arab_user_token");
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [count, setCount] = useState();

  const [show, setShow] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [t, i18n] = useTranslation();
  const [showPassword, setShowPassword] = useState([false, false, false]);
  const changePasswordFunction = (e) => {
    e.preventDefault();
    if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
      setPasswordsMatch(false);
      return;
    }

    const formdata = new FormData();
    formdata.append("password", oldPasswordRef.current.value);
    formdata.append("new_password", newPasswordRef.current.value);
    fetch(
      `${baseUrl}/profile/change-password`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === false) {
          const errorField = Object.keys(data.errors)[0];
          const errorMessage = data.errors[errorField][0];
          alert(`Error: ${errorMessage}`);
        } else {
          // alert("Success");
          oldPasswordRef.current.value = "";
          newPasswordRef.current.value = "";
          confirmPasswordRef.current.value = "";

          setShow(true);
          setSuccess(true);
          setCount(4);

          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
      })
      .catch((error) => alert(`Error: ${error}`));
  };
  return (
    <div className={style.background}>
      <form className={style.changeForm}>
        {[oldPasswordRef, newPasswordRef, confirmPasswordRef].map(
          (passwordRef, index) => (
            <div className={style.changeInputContainer} key={index}>
              <input
                placeholder={
                  index === 0
                    ? t("Old Password")
                    : index === 1
                    ? t("New Password")
                    : t("Confirm Password")
                }
                className={style.changeInput}
                ref={passwordRef}
                type={showPassword[index] ? "text" : "password"}
              />
              <div
                className={
                  i18n.language === "en"
                    ? style.passwordInputIcon
                    : style.passwordInputIconAr
                }
                onClick={() => {
                  const newShowPassword = [...showPassword];
                  newShowPassword[index] = !newShowPassword[index];
                  setShowPassword(newShowPassword);
                }}
              >
                {showPassword[index] ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          )
        )}
        {!passwordsMatch && (
          <div className={style.passwordsMatchError}>
            Passwords do not match
          </div>
        )}
        <button className={style.changeButton} onClick={changePasswordFunction}>
          {t("Update")}
        </button>
      </form>
      {success ? (
        <Alert
          type="success"
          message={t("Your password has been changed successfully")}
          show={show}
          setShow={setShow}
          time="4000"
          count={count}
          setCount={setCount}
        />
      ) : (
        <Alert
          type="warning"
          message={t("there is something wrong with your password")}
          show={show}
          setShow={setShow}
          time="4000"
          count={count}
          setCount={setCount}
        />
      )}
    </div>
  );
};
export default ChangePassword;
