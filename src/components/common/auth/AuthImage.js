import React from 'react';
import style from '../../../assets/style/authentication/imageAuth.module.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function AuthImage({logo}) {
  return (
    <div className={`${style.imageAuthDelete} col-sm-12 col-md-6 col-lg-5 `}>
        <LazyLoadImage src={logo} alt="Login Logo" />
    </div>
  ) 
}

export default AuthImage