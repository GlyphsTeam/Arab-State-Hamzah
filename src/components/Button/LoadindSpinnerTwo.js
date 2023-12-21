import style from '../../assets/style/buttons/loadingSpinnerTwo.module.css';

function LoadindSpinnerTwo() {
  return (
    <div className={style.spinnerContainer}>
      <div className={style.spinnerTwo}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className={style.loadingMessage}>
        Please do not close the page. Business form submission may take a few minutes.
        Thank you for your patience!
      </p>
    </div>
  );
}

export default LoadindSpinnerTwo;
