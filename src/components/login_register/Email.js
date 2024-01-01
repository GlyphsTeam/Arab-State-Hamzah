/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import style from "./components/login.module.css";
import profileImg from "../../assets/Images/loginLogo.png"
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Email = ({baseURL, setShowEmail,setShowOtp, logo, setShowRegister}) => {
    const [t, i18n] = useTranslation();
    const [userEmail, setUserEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [showEmailWarn, setShowEmailWarn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let formData = new FormData();

    userEmail && formData.append('email', userEmail);
  
    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setUserEmail(email);
        setIsValidEmail(validateEmail(email));
    };


        const handelSendEmail = async () => {
            setShowEmailWarn(false);

            const response =   await fetch(`${baseURL}/check-email`,{method:"POST", body:formData});

            const error = await response.json();

            if (error.status === false && error.status_number === 'S400' && error.errors.email) {
                setErrorMessage(error.errors.email[0]);
                setShowEmailWarn(true);
                setUserEmail('');
              } else if(response.ok) {
            setShowEmail(false); 
            setShowRegister(true)
            // setShowOtp(true);
            localStorage.setItem('arab_user_email',userEmail)
    
              }
            else{
                console.log('Error:', response.statusText);
                
            }
            }
              
    return (
        <>
            <div className={style.loginBody}>
                <div className={`col-lg-3 col-md-8 col-sm-10 ${style.profileCard}`}>
                    <div className="row">
                        <div className={style.emailLogo}>
                            <LazyLoadImage src={logo} alt="react logo" className={style.profileImg} />
                        </div>
                        <h1 className={`text-center ${style.signUpTi}`}>{t("Sign Up")}</h1>
                    </div>
                    <div>
                        <div className={`row mt-4 ${style.formRow}`}>
                            <label htmlFor="email" className={`col-2 ${style.userSign}`}><i className={`fas fa-envelope ${style.icon}`}></i></label>
                            <input
                                className={`col-10 ${style.formControl}`}
                                id="email"
                                name="email"
                                placeholder={t('Email ID')}
                                type="text"
                                value={userEmail}
                                onChange={handleEmailChange}
                            />
                        </div>
                        {showEmailWarn && <p className={style.contactValidation}>{errorMessage} </p>}

                        <div className="row">
                            <button
                                type='button'
                                className={`mt-4 btn rounded-10 w-2 ${style.loginBtn}`}
                                onClick={handelSendEmail}
                                disabled={!isValidEmail}
                            >
                                {t('Confirm')}
                            </button>
                    </div>

                </div>

                <div hidden className="row">
                    <h4 className={`mt-3 ${style.loginTitleChoice}`}>Or login with </h4>
                </div>
                <div hidden className="row d-flex justify-content-center mt-3">
                    <a hidden className=" col-2" href="/"><i className={`fab fa-facebook-square ${style.facebook} ${style.socialIcon}`}></i></a>
                    <a hidden className=" col-2" href="/"><i className={`fab fa-google-plus-square ${style.google} ${style.socialIcon}`}></i></a>
                    <a hidden className=" col-2" href="/"><i className={`fab fa-twitter-square ${style.twitter} ${style.socialIcon}`}></i></a>
                </div>

                <div className="row mt-3">
                <Link to={"/Login"} className={`${style.regester}`}>{t('Back to login')}</Link>

                {/* <Link className={`${style.regester}`} to="/Regester">Back to login</Link> */}
                 </div>


                

            </div>
        </div>


        {/* {showModalRegester && (
        <OTP />
                             )} */}
    </>
  )
}

export default Email