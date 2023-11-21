/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import style from "./components/login.module.css";
import profileImg from "../../assets/Images/loginLogo.png";
import { useTranslation } from "react-i18next";
import Regester from './Regester';
import EnterNewPassword from './EnterNewPassword';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ForgetOtp = ({baseURL, setShowForgetPass, setShowForgetOtp, setShowEnterNewPass, logo }) => {
    const [t, i18n] = useTranslation();
    // const [showModalRegester, setShowModalRegester] = useState(false);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
     const code = otpValues.join(''); 
    const inputRefs = useRef([]);
    const [showOtpWarn, setShowOtpWarn] = useState(false);

    let formData = new FormData();

    const userEmailGoriga = localStorage.getItem('arab_user_email')
    formData.append('email',userEmailGoriga)
    otpValues && formData.append('code',code)

    const handleOpenForgetPassword = () => {
        // document.body.style.overflow = 'hidden';
        // setShowModalRegester(true);
        setShowForgetOtp(false);
        setShowForgetPass(true);
    };

    const handleOtpChange = (event, index) => {
        const value = event.target.value;
        if (value.length > 1) {
             return;
        }

         const newValues = [...otpValues];
        newValues[index] = value;
        setOtpValues(newValues);

         if (value !== '' && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && otpValues[index] === '' && index > 0) {
             inputRefs.current[index - 1].focus();
        }
    };

    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const handelVerificationCode = async () => {
      setShowOtpWarn(false);

        const response = await fetch(`${baseURL}/check-code`,{
            method:'POST',
            body:formData
        }).then(response => response.json())
        .then(data => {
          if (data.status_number === 'S400') {
            //  alert('OTP is not valid');
            setShowOtpWarn(true);

             setOtpValues(Array(otpValues.length).fill(""));

           
          }
          else{
            // setShowModalRegester(true)
            setShowForgetOtp(false);
            setShowEnterNewPass(true);
          }
         })
  
        var timeleft = 30;
        setIsResendDisabled(true);  
        var downloadTimer = setInterval(function() {
          timeleft--;
          document.getElementById("countdowntimer").textContent = timeleft;
          if (timeleft <= 0) {
            clearInterval(downloadTimer);
            setIsResendDisabled(false);  
            document.getElementById("resendCodeSow").style.display = 'block';  
          }
        }, 1000);
      };
   

    return (
        <div className={style.modalMain}>
            <div className={style.loginBody}>
                <div className={`col-lg-3 col-md-8 col-sm-10 ${style.profileCard}`}>

                <div className="row">
            <div className={style.emailLogo}>
              <LazyLoadImage
                src={logo}
                alt="react logo"
                className={style.profileImg}
              />
            </div>
            {" "}
          </div>

                    <div>
                        <div className={`row mt-4 ${style.formRow}`}>
                            <label htmlFor="email" className={`col-2 `}><i className={`fas fa-envelope ${style.icon}`}></i></label>
                            <input
                                className={`col-10 ${style.formControl}`}
                                id="email"
                                name="email"
                                placeholder={t('Email ID')}
                                type="text"
                                value={userEmailGoriga}
                                disabled
                                readOnly
                            />
                        </div>

                        <div className={`row mt-4 ${style.formRow}`}>
                        <label htmlFor="otp" className={`col-2 `}><i className={`fas fa-key ${style.icon}`}></i></label>
                        <div className="col-10 d-flex justify-content-between">
                          {otpValues.map((value, index) => (
                            <input
                              className={`${style.formControl} ${style.otpInput}`}
                              key={index}
                              name={`otp${index}`}
                              maxLength="1"
                              value={value}
                              onChange={(event) => handleOtpChange(event, index)}
                              onKeyDown={(event) => handleKeyDown(event, index)}
                              ref={(ref) => inputRefs.current[index] = ref}
                            />
                          ))}
                        </div>
                      </div>
                      {showOtpWarn && <p className={style.contactValidation}>OTP is not valid </p>}

                      
                        <div className="row">
                            <button className={`mt-4 btn rounded-10 w-10 ${style.loginBtn}`} onClick={handelVerificationCode} disabled={code.length !== 6}>{t('Confirm')}</button>
                        </div>
                    </div>


        <div className="row mt-5">
        {/* <Link className={`${style.regester}`} to="/Regester">Regester New Account</Link> */}
        <button className={`${style.regester}`} onClick={handleOpenForgetPassword}>Change Email</button>
        {/* <Link to={"/Login"} className={`${style.regester}`} onClick={handleChangePage}>Change Email</Link> */}

        </div>


        

    </div>
</div>

{/* {showModalRegester && (
    <EnterNewPassword />
)} */}


</div>
)
}

export default ForgetOtp