import style from "./components/login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UseFetchPost from "../../hooks/useFetchPost";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ButtonSeven from '../Button/ButtonSeven';

const Regester = ({ baseURL, logo }) => {
    const [t] = useTranslation();
    const navigate = useNavigate()


    let formData = new FormData()
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [confirmPasswor, setConfirmPassword] = useState('')
    //  const [gender,setGender] = useState('male')
    const userEmail = localStorage.getItem('arab_user_email')

    const [showPasswordWarn, setShowPasswordWarn] = useState(false);
    const [showLengthWarn, setShowLengthWarn] = useState(false);
    const [showTermsWarn, setShowTermsWarn] = useState(false);
    const [showNameWarn, setShowNameWarn] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [subscribe, setSubscribe] = useState(false);
    const [adsEmail, setAdsEmail] = useState('');
    const [sendAdsEmail, setSendAdsEmail] = useState('');


    userName && formData.append('name', userName)
    userEmail && formData.append('email', userEmail)
    userPassword && formData.append('password', userPassword)
    confirmPasswor && formData.append('password_confirmation', confirmPasswor)
    // gender && formData.append('gender',gender)


    const handleChangePage = () => {
        window.scrollTo(0, 0);
    };

    const handleTerms = () => {
        acceptTerms ? setAcceptTerms(false) : setAcceptTerms(true);
    };

    let adsFormData = new FormData()
    let urlAds = `en/0/subscribes`;
    const [Res] = UseFetchPost(urlAds, adsFormData);
    sendAdsEmail && adsFormData.append("email", userEmail);

    const handleSendAdsEmail = (e) => {
        //   e.preventDefault();
        setSendAdsEmail(e);
        setAdsEmail('');
    }

    const handSubscribe = () => {
        subscribe ? setSubscribe(false) : setSubscribe(true);
    };

    const hendelRegester = async (e) => {
        e.preventDefault();

        setShowPasswordWarn(false);
        setShowLengthWarn(false);
        setShowTermsWarn(false);
        setShowNameWarn(false);
        if (userPassword === confirmPasswor && userPassword.length >= 8 && acceptTerms && userName !== '') {

            if (subscribe === true) {
                handleSendAdsEmail(userEmail);
            }
            const response = await fetch(`${baseURL}/register`, {
                method: "POST",
                body: formData
            })
            const { data } = await response.json()
            if (response.ok) {
                localStorage.setItem("arab_user_token", data.token);
                localStorage.setItem("arab_user_name", data.user.name);
                localStorage.setItem("arab_user_email", data.user.email);
                navigate('/')
                // window.location.reload();
            }
        } else if (acceptTerms == false) {
            // alert('please accept terms')
            setShowTermsWarn(true);
        } else if (userPassword.length < 8) {
            // alert("Please 8")
            setShowLengthWarn(true);

        } else if (userPassword !== confirmPasswor) {
            // alert("Please enter your password")
            setShowPasswordWarn(true);

        }
        else if (userName === '') {
            // alert("Please enter your password")
            setShowNameWarn(true);

        }

    }

    return (


        <>
            <div className={style.loginBody}>
                <div className={`${style.profileCard}`}>
                    <div className="row">
                        <div className={`col-md-12 col-sm-12 col-lg-6 d-flex ${style.imgOrder}`}>
                            <LazyLoadImage src={logo} alt="react logo" className={style.loginImg} />
                        </div>
                        <div className={`col-md-12 col-sm-12 col-lg-6 ${style.formOrder}`}>

                            <form className={style.registerForm}>
                                <div className={`row mt-4 ${style.formRow}`}>
                                    <label htmlFor="name" className={`col-2 `}><i className={`fas fa-user ${style.icon}`}></i></label>
                                    <input
                                        className={`col-10 ${style.formControl}`}
                                        id="name"
                                        name="name"
                                        placeholder={t('User Name')}
                                        type="text"
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>
                                {showNameWarn && <p className={style.contactValidation}>{t('Name is required.')}</p>}

                                <div className={`row mt-4 ${style.formRow}`}>
                                    <label htmlFor="email" className={`col-2 `}><i className={`fas fa-envelope ${style.icon}`}></i></label>
                                    <input
                                        className={`col-10 ${style.formControl}`}
                                        id="email"
                                        name="email"
                                        placeholder="Email ID"
                                        type="text"
                                        value={userEmail}
                                    />
                                </div>

                                <div className={`row mt-4 ${style.formRow}`}>
                                    <label htmlFor="email" className={`col-2 `}><i className={`fas fa-lock ${style.icon}`}></i></label>
                                    <input
                                        className={`col-10 ${style.formControl}`}
                                        id="password"
                                        name="password"
                                        placeholder={t('password')}
                                        type="password"
                                        onChange={(e) => setUserPassword(e.target.value)}
                                    />
                                </div>

                                {showLengthWarn && <p className={style.contactValidation}>{t('Passwords must be at least 8 characters.')}</p>}


                                <div className={`row mt-4 ${style.formRow}`}>
                                    <label htmlFor="email" className={`col-2 `}><i className={`fas fa-lock ${style.icon}`}></i></label>
                                    <input
                                        className={`col-10 ${style.formControl}`}
                                        id="password"
                                        name="password"
                                        placeholder={t('Confirm Password')}
                                        type="password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                {showPasswordWarn && <p className={style.contactValidation}> {t('Password does not match.')}</p>}
                                <div className={`row mt-4`}>
                                    <div className={`col-12 ${style.rememberDiv}`}>
                                        <input id="terms_conditionsReg" onClick={handleTerms} type="checkbox" className={`col-1 ${style.checkbox}`} />
                                        <label htmlFor="terms_conditionsReg" className={`col-11 ${style.rememberLabel}`}>{t('r1')} <Link to="/terms-conditions" className={style.termsRegister} onClick={handleChangePage}>{t('r2')}</Link>{t('r3')}  <Link to="/Privacy-policy" className={style.termsRegister} onClick={handleChangePage}> {t('r4')}</Link>.</label>
                                    </div>

                                </div>
                                {showTermsWarn && <p className={style.contactValidation}> {t('r5')} </p>}

                                <div className={`row mt-4`}>
                                    <div className={`col-12 ${style.rememberDiv}`}>
                                        <input id="adsReg" onClick={handSubscribe} type="checkbox" className={`col-1 ${style.checkbox}`} />
                                        <label htmlFor="adsReg" className={`col-11 ${style.rememberLabel}`}>{t('r6')}</label>
                                    </div>

                                </div>



                                <div className="row">
                                    <div className="mt-4 w-10">
                                    <ButtonSeven handlerClick={hendelRegester}>
                                        {t('Register')}
                                    </ButtonSeven>
                                    </div>

                                </div>

                            </form>


                            <div className="row mt-5">
                                {/* <Link className={`${style.loginToAccount}`} to="/login">Login to account</Link> */}
                                {/* <button className={`${style.loginToAccount}`} onClick={handleOpenModalRegester}>Login to account</button> */}
                                <Link to={"/Login"} className={`${style.loginToAccount}`}>{t('Already have an account?')}</Link>

                            </div>
                        </div>
                    </div>




                </div>
            </div>


        </>

    );
}

export default Regester;