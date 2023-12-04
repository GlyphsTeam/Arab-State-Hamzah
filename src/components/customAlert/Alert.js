import React, { useEffect} from "react";
import style from '../../assets/style/alert.module.css';

function Alert({type, message, show, setShow, time, setCount, count}) {    
        {type === 'warning'? type = style.warning : type = style.success}
            
        useEffect(() => {
          if (count === 0) {
            setShow(false)
          } else {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
          }
        }, [count]);
    

        
    return(
    <>
    {show && (
    <div>
      <p className={type}>{message}</p>
    </div>
     )} 
    </>
);

}

export default Alert;