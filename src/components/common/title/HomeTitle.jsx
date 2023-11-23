import React from 'react'
import style from '../../../assets/style/common/title/homeTitle.module.css'

const HomeTitle = ({title}) => {
  console.log("title>>>>>",title)
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