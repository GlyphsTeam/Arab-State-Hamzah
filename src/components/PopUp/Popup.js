import style from "../../assets/style/popup/popup.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function PopUp({ setShowPopModal, navOne, navTwo, titleOne, titleTwo, title }) {
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
                        <span>{t(`Add ${title}`)}</span>
                        <div className={style.close} onClick={handleClose}>
                            <IoClose />
                        </div>
                    </header>
                    <div className={style.content}>
                        <button className={style.popupButton} onClick={() => handlerNavgation(navOne)} >+ {titleOne}</button>
                        <button className={style.popupButton} onClick={() => handlerNavgation(navTwo)} >+ {titleTwo}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUp;
