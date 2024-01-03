import style from '../../../assets/style/common/title/homeTitle.module.css'

const HomeTitle = ({title}) => {
  return (
    <>
    <div className={style.mainDiv}>
        <h2 className={style.title}>{title}</h2>
    </div>
    </>
  )
}

export default HomeTitle