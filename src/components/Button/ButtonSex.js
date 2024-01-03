import React from 'react'
import style from '../../assets/style/buttons/buttonSex.module.css'
function ButtonSex(props) {
  return (
    <button className={style.buttonSexCl}>{props.children}</button>
  )
}

export default ButtonSex
