import React from "react";
import style from "./components/login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

const EnterNewPassword = ({baseURL, logo}) => {
 const navigate = useNavigate();

    let formData = new FormData();
    const [userPassword,setUserPassword] = useState('')
    const userEmail = localStorage.getItem('arab_user_email')

    const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
    const [showLengthWarn, setShowLengthWarn] = useState(false);

    userEmail && formData.append('email',userEmail)
    userPassword && formData.append('password',userPassword)
    


const hendelRegester = async(e) =>{
    setShowPasswordSuccess(false);
        setShowLengthWarn(false);

    e.preventDefault();
  await fetch(`${baseURL}/forgot-password`,{
        method:"POST",
        body:formData
    })
    .then(response => response.json())
    .then(data => {
     if(data.status_number === "S400"){
        // alert("Please enter a valid email")
        setShowLengthWarn(true);

    } else{
//    alert('Password changed successfully now you can login')
   setShowPasswordSuccess(true);

   navigate('/Login')
//    window.location.reload();
    }
})}

const handleChangePage = () => {
    window.scrollTo(0, 0);
  };

    return(
        <>
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
                <form className={style.registerForm}>
                 
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
                        placeholder="Password"
                        type="password"
                         onChange={(e)=> setUserPassword(e.target.value)}
                    />
                    </div>
                    {showPasswordSuccess && <p className={style.contactValidationSuccess}>Password changed successfully.</p>}
                    {showLengthWarn && <p className={style.contactValidation}>Passwords must be at least 8 characters.</p>}

                    <div className={`row mt-4`}>
                        <div hidden className={`col-6 ${style.rememberDiv}`}>
                        <input hidden id="rememberReg"  onClick={"rememberClick"} value={formData.remember} type="checkbox" className={`col-2 ${style.checkbox}`}/>
                        <label hidden htmlFor="rememberReg" className={`col-10 ${style.rememberLabel}`}>Remember me</label>
                        </div>

                        <div hidden className={`col-6 ${style.forgotDiv}`}>
                            <a href="/" className={`col-12 ${style.forgotLink}`}>Forgot password?</a>
                        </div>
                        
                    </div>

                    <div className="row">
                       <button className={`mt-4 btn rounded-10 w-10 ${style.loginBtn}`}   onClick={hendelRegester}>Change password</button>

                    </div>

                </form>

                <div className="row mt-3">
                     {/* <button className={`${style.loginToAccount}`} onClick={handleOpenModalRegester}>Login to account</button> */}
                     <Link to={"/Login"} className={`${style.loginToAccount}`} onClick={handleChangePage}>Already have an account?</Link>

                </div>


            </div>
        </div>
    </>
        
    );
}

export default EnterNewPassword;