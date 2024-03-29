import React, { useRef, useState } from "react";
import style from "../assets/style/share/share.module.css";
import { useTranslation } from "react-i18next";
import { FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLogoTelegram } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

function Share({ url, setShowShareModal }) {
  const inputRef = useRef(null);
  const [t] = useTranslation();

  const { protocol, host } = window.location;
  const sharedUrl = `${protocol}//${host}${url}`;
  const [isCopied, setIsCopied] = useState(false);
  const emailBody = encodeURIComponent(`${sharedUrl}`);
  const emailLink = `mailto:?subject=Check%20out%20this%20link&body=${emailBody}`;
  const handleCopyClick = () => {
    inputRef.current.select();
    document.execCommand("copy");
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 4000);
  };

  const handleClose = () => {
    setShowShareModal(false);
  };

  return (
    <>
      {/* <i
        onClick={handleClick}
        className="fas fa-share-square"
      ></i> */}
      {/* {visible && ( */}
      <div className={style.popupDiv}>
        <div className={style.popup}>
          <header>
            <span>{t("Share")}</span>
            <div className={style.close} onClick={handleClose}>
              <IoClose className={style.closeBuin}/>
            </div>
          </header>
          <div className={style.content}>
            <p>{t("Share this link via")} </p>
            <ul className={style.icons}>
              {/* <a
              href ={ 'fb-messenger://share?link=' + encodeURIComponent(sharedUrl) }


                target="_blank"
              >
                <i class="fab fa-facebook-messenger"></i>
              </a> */}

              <a
                href={
                  "https://twitter.com/intent/tweet?url=" +
                  encodeURIComponent(sharedUrl)
                }
                target="blank"
              >
                <FaTwitter />
              </a>

              <a href={emailLink} target="blank">
                <MdEmail />
              </a>

              <a
                href={
                  "https://api.whatsapp.com/send?text=" +
                  encodeURIComponent(sharedUrl)
                }
                target="blank"
              >
                <FaWhatsapp />
              </a>

              <a
                href={
                  "https://t.me/share/url?url=" + encodeURIComponent(sharedUrl)
                }
                target="blank"
              >
                <BiLogoTelegram />
              </a>
            </ul>
            <p>{t("Or copy link")}</p>
            <div className={style.field}>
              <i className="fas fa-link"></i>
              <input
                type={style.text}
                readOnly
                value={sharedUrl}
                ref={inputRef}
              />
              <button
                className={`${style.subscribeButton} ${isCopied ? style.subscribed : ""
                  } button`}
                onClick={handleCopyClick}
              >
                {isCopied ? (
                  <>
                    <p className={style.copiedParagraph}>{t("copied!")}</p>
                    {/* <i className="far fa-check-circle"></i> */}
                  </>
                ) : (
                  t("copy")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* )}  */}
    </>
  );
}

export default Share;
