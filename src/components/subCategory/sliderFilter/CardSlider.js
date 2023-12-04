import style from "../../../assets/style/subCategorySlider.module.css";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function SliderList({ id, name, image, handleClick, activeIndex }) {
  return (
    <>
      <li
        
        onClick={() => handleClick(id)}
      >
        <div className={`${activeIndex === id ? style.activeLi : style.notActiveLi}`}>
          <LazyLoadImage className={style.subImg} src={image} alt="CatergorySlider"/>
        </div>
          <p className={style.subTitle}>{`${name}`}</p>
      </li>
    </>
  );
}

export default SliderList;
