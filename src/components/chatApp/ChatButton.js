import React from 'react';
import style from '../../assets/style/chatStyle/chat.module.scss';

function ChatButton({setChatButton}) {
  return (
    <>
    <div className={style.mainChatBtnDiv}>
    <div className={style.chatBtn} onClick={()=> setChatButton(false)}>
        {/* <p className={style.chatText}>Chat</p> */}
    <i className={`fas fa-comments ${style.chatIcon}`}></i>
    </div>
    </div>

    </>
  )
}

export default ChatButton