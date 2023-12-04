import style from '../../assets/style/chatStyle/chat.module.scss';

function ChatButton({setChatButton}) {
  return (
    <>
    <div className={style.mainChatBtnDiv}>
    <div className={style.chatBtn} onClick={()=> setChatButton(false)}>
    <i className={`fas fa-comments ${style.chatIcon}`}></i>
    </div>
    </div>

    </>
  )
}

export default ChatButton