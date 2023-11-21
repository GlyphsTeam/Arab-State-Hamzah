import React, {useState} from "react";
import style from '../../assets/style/marketProfile.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Galllery({data, setShowGalleryModal, }) {

  const [activePhoto, setActivePhoto] = useState(0);

  const showPhoto = (e) => (
    setActivePhoto(e),
    document.body.style.overflow = "hidden",
    setShowGalleryModal(true)
  );

  return (
      <div className={`${style.rightCards} `}> 
        {data?.gallery?.map((item) => (
          <div className={style.rightCardsContainer} key={item.id} onClick={()=> showPhoto(item.id)}>
          <LazyLoadImage src={item.image} alt={item.id} />
          </div>
        ))}
      </div>
  );
}
export default Galllery;
