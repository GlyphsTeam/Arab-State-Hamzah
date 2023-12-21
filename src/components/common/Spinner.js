import style from '../../assets/style/spinner.module.css'
import { BeatLoader } from 'react-spinners';
import { LazyLoadImage } from 'react-lazy-load-image-component'
function Spinner({ logo, text }) {

  let clasaSpinner;
  if (text) {
    clasaSpinner = style.spinnerCloum
  }
  else {
    clasaSpinner = style.spinner
  }

  return (
    <>
      <div className={`spinner ${clasaSpinner}`}>
        {logo ?
          <LazyLoadImage src={logo} alt='BeatLoader' />
          :
          <>
            <BeatLoader color={'#123abc'} loading={true} />
            {text && <p className={style.loadingMessage}>{text}</p>
            }
          </>
        }
      </div>    </>
  )
}

export default Spinner