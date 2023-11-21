import React from 'react'
import style from '../../../assets/style/common/title/homeTitle.module.scss'

const HomeTitle = ({title}) => {
  return (
    <>
    <div className={style.mainDiv}>
        <hr className={style.topHr} />
        <h2 className={style.title}>{title}</h2>
        <hr className={style.bottomHr} />
    </div>
    </>
  )
}

export default HomeTitle