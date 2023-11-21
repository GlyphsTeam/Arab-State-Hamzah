import React from 'react';
import LoginPage from '../components/login_register/Login';

function Login({baseURL, logo}) {
  return (
    <>
    <LoginPage baseURL = {baseURL} logo = {logo}/>
    </>
  )
}

export default Login