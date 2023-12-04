import { useState } from 'react';
import style from '../../assets/style/chatStyle/chat.module.scss';
import ChatButton from './ChatButton';
import ChatBox from './ChatBox';

function ChatSection() {
  const [chatButton, setChatButton] = useState(true);


  return (
    <>
    <div className={style.mainChatSection}>
      {chatButton ? 
      <ChatButton setChatButton={setChatButton}/>
      :
      <ChatBox setChatButton={setChatButton}/>
    }
    </div>
    </>
  )
}

export default ChatSection