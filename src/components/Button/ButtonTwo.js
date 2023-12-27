import style from '../../assets/style/buttons/buttonTwo.module.css'
function ButtonTwo(props) {
    return (

        <button  className={style.buttonTwoContainer} onClick={props.handlerClick} type={props.buttonType}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
            </svg>
            <div className={style.buttonTwoText}>
               {props.children}
            </div>

        </button>
    )
}

export default ButtonTwo
