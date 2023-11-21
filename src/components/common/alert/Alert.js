import React, { useEffect } from "react";
import style from '../../../assets/style/alert/alert.module.css';

function Alert({ type, message, setCount, count, showAlert, setShowAlert }) {

  { type === 'warning' ? type = style.warning : type = style.success }

  useEffect(() => {
    if (count === 0) {
      setShowAlert(false)
    } else {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <>
      <div>
        <p className={type}>{message}</p>
      </div>
    </>
  );
}

export default Alert;