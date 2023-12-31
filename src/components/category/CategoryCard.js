import style from "../../assets/style/category/category.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function SubCategoryCard({ data }) {
  return (
    <>
    <div className={`${style.cardDiv} col-lg-3 col-md-6 col-sm-3`} >
      <Link
        to={`/SubCategory/${data?.name?.replaceAll(' ', '-')}/${data?.id}/?Page=${
          data.type === "business" ? "shops" : "service"
        }`}
        className={`${style.cardLink} `}
      >
        <LazyLoadImage className={`${style.categoryImage}`} src={data.image} height={215} alt="categoryImage" />
        <p className={`${style.cardTitle} `}>{data.name}</p>
      </Link>
      </div>
    </>
  );
}
export default SubCategoryCard;
