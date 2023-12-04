import React, { useEffect, useRef } from "react";
import style from "../../assets/style/chatStyle/chat.module.scss";

function ChatBox({ setChatButton }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    // window.scrollTo(0, document.documentElement.scrollHeight);
    // if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    // }
  };

  return (
    <>
      <div className={style.boxChatMainDiv}>
        <div className={style.chatHead}>
          <p className={style.admin}>Arab Georgia Admin</p>
          <i
            className={`fas fa-times ${style.close}`}
            onClick={() => setChatButton(true)}
          ></i>
        </div>
        <div ref={scrollRef} className={style.chatBody}>
          <div className={style.clientDiv}>
            <div className={style.clientName}>
              <p className={style.chatClientParagraph}>You</p>
            </div>
            <p className={style.clientMessage}>Hi</p>
          </div>

          <div className={style.adminDiv}>
            <div className={style.adminImage}>
              <p className={style.chatAdminParagraph}>Admin</p>
              {/* <LazyLoadImage
                className={style.chatAdminImage}
                src={require("../../assets/Images/chat/adminImage.png")}
                alt="Admin "
              /> */}
            </div>
            <p className={style.adminMessage}>Welcome </p>
          </div>

          <div className={style.clientDiv}>
            <div className={style.clientName}>
              <p className={style.chatClientParagraph}>You</p>
            </div>
            <p className={style.clientMessage}>Can i get some help?</p>
          </div>

          <div className={style.adminDiv}>
            <div className={style.adminImage}>
              <p className={style.chatAdminParagraph}>Admin</p>
              {/* <LazyLoadImage
                className={style.chatAdminImage}
                src={require("../../assets/Images/chat/adminImage.png")}
                alt="Admin "
              /> */}
            </div>
            <p className={style.adminMessage}>Sure, How can we help you? </p>
          </div>

          <div className={style.clientDiv}>
            <div className={style.clientName}>
              <p className={style.chatClientParagraph}>You</p>
            </div>
            <p className={style.clientMessage}>Thanks</p>
          </div>
        </div>

        <div className={style.chatInput}>
          <div className={style.uploadImageClient}>
            <label htmlFor="imageInput">
              <i className="fas fa-image"></i>
            </label>
            <input type="file" id="imageInput" style={{ display: "none" }} />
          </div>

          {/* <input type="text" placeholder="Write a message..." /> */}

          <textarea className={style.chatTextArea} rows="1" placeholder="Write a message...">
            </textarea>

          <svg
            className={style.sendIconSvg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="message"
          >
            <path
              fill="#FFFFFF"
              d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
