import React, { useState } from "react";
import style from "../../assets/style/authentication/auth.module.css";
import { useNavigate } from "react-router-dom";
import Alert from "../common/alert/Alert";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUsername } from "../../redux/slices/login.js";

function ChangePassword({ baseUrl }) {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();

  const [count, setCount] = useState(4);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("arab_user_token")

  const handleSubmit = () => {
    try {
      fetch(`${baseUrl}/profile/delete-user`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        method: 'DELETE'
      }).then(() => {
        setCount(4);
        setShowAlert(true);
      })
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setTimeout(() => {
        dispatch(setUsername("Guest"));
        localStorage.clear();
        navigate('/');
      }, 3000);

    }
  }
  const handleCancel = () => {
    navigate('/profile')
  }

  return (
    <>
      <div className={`${style.rightAuth} col-sm-12 col-md-6 col-lg-7`}>

        <div className={`${style.registerFormDiv}`}>
          <form>

            <div className={`w-100 ${style.changePasswordDiv}`}>
              <div className={`w-100 ${style.passwordInput}`}>
                <h3>{t('delete page')}</h3>
              </div>
            </div>
          </form>
          <div className={style.loginBtnsDiv}>
            <button className={`w-50 ${style.deleteAccountBtn}  ${style.ConfirmDeleteAccountBtn}`} onClick={handleSubmit}>{t('Yes')}</button>
            <button className={`w-50 ${style.deleteAccountBtn}  ${style.CancelDeleteAccountBtn}`} onClick={handleCancel}>{t('No')}</button>
          </div>

        </div>
      </div>

      {showAlert && (<Alert type='success' message={t('Your account has been deleted successfully.')} showAlert={showAlert} setShowAlert={setShowAlert} count={count} setCount={setCount} />)}

    </>
  );
}

export default ChangePassword;
