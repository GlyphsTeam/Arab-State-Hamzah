import style from '../../assets/style/buttons/loadingSpiner.module.css';
function LoadingSpiner() {
  return (
<div className={style.customloadercontainer}>
  <div className={style.customloader}></div>
  <div className={style.customloadertext}>Loading...</div>
</div>

  )
}

export default LoadingSpiner
