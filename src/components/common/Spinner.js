import style from '../../assets/style/spinner.module.css'
import { BeatLoader } from 'react-spinners';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useState, useEffect } from 'react';
function Spinner({ logo, text, textForm }) {
  const string = textForm;
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  let delay = 100;
  useEffect(() => {
    if (currentIndex < string?.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + string[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, string]);
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
            <BeatLoader className={style.BeatLoader}  loading={true} />
            {text && <p  className={style.loadingMessage}>{currentText}</p>
            }
          </>
        }
      </div>    </>
  )
}

export default Spinner