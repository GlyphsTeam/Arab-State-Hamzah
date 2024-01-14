import React from 'react'
import style from '../../assets/style/buttons/buttonSeven.module.css';

function ButtonSeven(props) {
  return (
    <>
    <button className={style.buttonSeven} onClick={props.handlerClick} type={props.buttonType}>
    {props.children} →
  </button>
  </>
  )
}

export default ButtonSeven
