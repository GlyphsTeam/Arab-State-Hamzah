import React, { useState } from 'react';
import filterStyle from '../../../../assets/style/common/filteredPage.module.css'
import { useTranslation } from "react-i18next";
import Alert from '../../alert/Alert';
// import {useNavigate} from "react-router-dom";

function HeroMobileButtons({ setOpenMobileCategory, token }) {
  const [t] = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  // const navigate = useNavigate();
  const [count, setCount] = useState();
  // const showAlertFunction = () => {
  //   setShowAlert(true);
  //   setCount(4);
  // }

  // const navigateFunction = () => {
  //   const tokenUser = localStorage.getItem("arab_user_token")
  //   if (tokenUser){
  //     navigate("/market-place/new-product");
  //   }
  //   else{
  //     showAlertFunction();
  //   }
  // }

  return (
    <>
      <div className={filterStyle.mainButtonsDiv}>

        <button onClick={() => setOpenMobileCategory(true)} className={`mt-3 ${filterStyle.addProductBtn} ${filterStyle.mobileAddProductBtn}`}>{t('Menu Category')}</button>
        {/* {
        <div onClick={navigateFunction} className={`mt-3 ${filterStyle.addProductBtn} ${filterStyle.mobileAddProductBtn}`}>{t('Post your product')}</div>
         } */}
      </div>
      {
        showAlert && (
          <Alert type="warning" message={t("Please login first.")} showAlert={showAlert} setShowAlert={setShowAlert} time='5000' count={count}
            setCount={setCount} />
        )}
    </>
  )
}

export default HeroMobileButtons