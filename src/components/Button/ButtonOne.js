import React from 'react'
import style from '../../assets/style/buttons/buttonOne.module.css'
function ButtonOne(props) {
    return (
        <button className={style.buttonOne} onClick={() => props.resetFilter()}>
            <span className={style.buttonOne_lg}>
                <span className={style.buttonOne_sl}></span>
                <span className={style.buttonOne_text}>{props.children}</span>
            </span>
        </button>
    )
}

export default ButtonOne
