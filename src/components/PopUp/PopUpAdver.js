import style from "../../assets/style/popup/popup.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function PopUp({ setShowPopModal }) {
    const [t] = useTranslation();
    const navigate = useNavigate();

    const handleClose = () => {
        setShowPopModal(false);
    };

    const handlerNavgation = (url) => {
        navigate(url);
    }


    return (
        <>
            <div className={style.popupDiv}>
                <div className={style.popup}>
                    <header>
                        <span>{t(`Add Advert`)}</span>
                        <div className={style.close} onClick={handleClose}>
                            <i className="fas fa-times"></i>
                        </div>
                    </header>
                    <div className={style.content}>
                        <h1>asdfasdasdsd</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUp;
