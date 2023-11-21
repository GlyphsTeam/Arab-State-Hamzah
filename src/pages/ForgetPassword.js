import React, { useState } from 'react';
import ForgetPassword from '../components/login_register/ForgetPassword';
import ForgetOtp from '../components/login_register/ForgetOtp';
import EnterNewPass from '../components/login_register/EnterNewPassword';

function ForgetPasswordPage({baseURL, logo}) {
    const [showForgetPass, setShowForgetPass] = useState(true);
    const [showForgetOtp, setShowForgetOtp] = useState(false);
    const [showEnterNewPass, setShowEnterNewPass] = useState(false);
  return (
      <>
    {showForgetPass && (<ForgetPassword baseURL = {baseURL} setShowForgetPass={setShowForgetPass} setShowForgetOtp = {setShowForgetOtp} logo = {logo}/>)}
    {showForgetOtp && (<ForgetOtp baseURL = {baseURL} setShowForgetPass={setShowForgetPass} setShowForgetOtp = {setShowForgetOtp} setShowEnterNewPass = {setShowEnterNewPass}  logo = {logo}/>)}
    {showEnterNewPass && (<EnterNewPass baseURL = {baseURL} setShowEnterNewPass = {setShowEnterNewPass}  logo = {logo}/>)}
    </>
  )
}

export default ForgetPasswordPage