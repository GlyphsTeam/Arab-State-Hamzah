import React, { useState } from 'react';
import RegisterPage from '../components/login_register/Regester';
import Email from '../components/login_register/Email';

function Register({baseURL, logo}) {
    const [showEmail, setShowEmail] = useState(true);
    const [showRegister, setShowRegister] = useState(false);

  return (
    <>
    {showEmail && (<Email baseURL = {baseURL} setShowEmail={setShowEmail}  logo = {logo} setShowRegister={setShowRegister}/>)}
    {/* {showOtp && (<OTP baseURL = {baseURL}  setShowEmail={setShowEmail} setShowOtp = {setShowOtp} setShowRegister = {setShowRegister} logo = {logo} />)} */}
    {showRegister && (<RegisterPage baseURL = {baseURL} setShowRegister = {setShowRegister} logo = {logo}/>)}
    </>
    )
}

export default Register