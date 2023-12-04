import style from '../../assets/style/common/button.module.css';
import { useTranslation } from 'react-i18next';
function Button({btnInfo ,  handleCloseModal}) {
  const { t, i18n } = useTranslation();

  return (    
   
  <div className={` ${i18n.language === 'ar'? style.categoryBtnDivAr : ""}`}>
    <button className={style.buttonContainer}   onClick={() => { handleCloseModal() }}>
        {btnInfo}
    </button>
  </div>
  )
}

export default Button