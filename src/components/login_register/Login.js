import React, { useRef } from "react";
import style from "./components/login.module.css";
import { setUsername } from "../../redux/slices/login.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Login({ baseURL, logo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const inputRef = useRef(null);
  const [showPasswordWarn, setShowPasswordWarn] = useState(false);
  const [showLengthWarn, setShowLengthWarn] = useState(false);
  const [unRegisteredWarn, setUnRegisteredWarn] = useState(false);
  const [showEmailRegexWarn, setShowEmailRegexWarn] = useState(false);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let formData = new FormData();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [crossDoma, setCross]= useState("");
  userEmail && formData.append("email", userEmail);
  userPassword && formData.append("password", userPassword);

  const handelLogin = async (e) => {
    setShowPasswordWarn(false);
    setShowLengthWarn(false);
    setShowEmailRegexWarn(false);
    setUnRegisteredWarn(false);
    if (inputRef.current.value.length < 8) {
      setShowLengthWarn(true);
      // alert('Passwords must be at least 8 characters')
      inputRef.current.value = "";
    }
    if (!regex.test(userEmail)) {
      setShowEmailRegexWarn(true);
    }
    e.preventDefault();

    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      if (data.errors) {
        setUnRegisteredWarn(true);
      } else {
        localStorage.setItem("arab_user_token", data.data.token);
        localStorage.setItem("arab_user_name", data.data.user.name);
        localStorage.setItem("arab_user_email", data.data.user.email);
      
        setLoginSuccess(true);
        dispatch(setUsername(data.data.user.name));
        navigate("/");
      }
    } else {
      setShowPasswordWarn(true);
      // alert("Wrong Password")
      inputRef.current.value = "";
    }
  };
  return (
    <>
      {!loginSuccess && (
        <div className={style.loginBody}>
          <div className={` ${style.profileCard}`}>
            <div className={`row w-100 m-auto ${style.profileCardSubDiv}`}>
              <div
                className={`col-md-12 col-sm-12 col-lg-6 d-flex ${style.imgOrder}`}
              >
                <LazyLoadImage
                  src={logo}
                  alt="react logo"
                  className={style.loginImg}
                />
              </div>
              <div
                className={`col-md-12 col-sm-12 col-lg-6 ${style.formOrder}`}
              >
                <form className={style.form}>
                  <h1>Login</h1>
                  <div className={`row mt-4 ${style.formRow}`}>
                    <label htmlFor="email" className={`col-2 `}>
                      <i className={`fas fa-envelope ${style.icon}`}></i>
                    </label>
                    <input
                      className={`col-10 ${style.formControl}`}
                      id="email"
                      name="email"
                      placeholder={t("Email ID")}
                      type="text"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  {showEmailRegexWarn && (
                    <p className={style.contactValidation}>
                      {" "}
                      {t("Email is not valid")}
                    </p>
                  )}
                  {unRegisteredWarn && !showEmailRegexWarn && (
                    <p className={style.contactValidation}>
                      {t("This email is not registered.")}
                    </p>
                  )}
                  <div className={`row mt-4 ${style.formRow}`}>
                    <label htmlFor="email" className={`col-2 `}>
                      <i className={`fas fa-lock ${style.icon}`}></i>
                    </label>
                    <input
                      className={`col-10 ${style.formControl}`}
                      id="password"
                      name="password"
                      placeholder={t("password")}
                      type="password"
                      ref={inputRef}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                  </div>
                  {showPasswordWarn && (
                    <p className={style.contactValidation}>
                      {t("Wrong password.")}
                    </p>
                  )}
                  {showLengthWarn && (
                    <p className={style.contactValidation}>
                      {t("Passwords must be at least 8 characters.")}
                    </p>
                  )}
                  <div className={`row mt-4`}>
                    <div className={`col-6 ${style.rememberDiv}`}>
                      <input
                        id="remember"
                        value={formData.remember}
                        type="checkbox"
                        className={`col-2 ${style.checkbox}`}
                      />
                      <label
                        htmlFor="remember"
                        className={`col-10 ${style.rememberLabel}`}
                      >
                        {t("Remember me")}
                      </label>
                    </div>
                    <div className={`col-6 ${style.forgotDiv}`}>
                      <Link
                        to={"/Forget-password"}
                        className={`col-12 ${style.rememberLabel}`}
                      >
                        {t("Forgot password?")}
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <button
                      className={`mt-4 btn rounded-10 w-10 ${style.loginBtn}`}
                      onClick={handelLogin}
                    >
                      {t("login")}
                    </button>
                  </div>
                </form>
                <div className="row" hidden>
                  <h4 className={`mt-3 ${style.loginTitleChoice}`}>
                    Or login with{" "}
                  </h4>
                </div>
                <div
                  hidden
                  className={`row d-flex justify-content-center mt-3 ${style.icons_center}`}
                >
                  <a className=" col-2" href="/">
                    <i
                      className={`fab fa-facebook-square ${style.facebook} ${style.socialIcon}`}
                      hidden
                    ></i>
                  </a>
                  <a className=" col-2" href="/">
                    <i
                      className={`fab fa-google-plus-square ${style.google} ${style.socialIcon}`}
                      hidden
                    ></i>
                  </a>
                  <a className=" col-2" href="/">
                    <i
                      className={`fab fa-twitter-square ${style.twitter} ${style.socialIcon}`}
                      hidden
                    ></i>
                  </a>
                </div>
                <div className="row mt-3">
                  <Link to={"/Register"} className={`${style.regester}`}>
                    {t("Register New Account")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Login;
