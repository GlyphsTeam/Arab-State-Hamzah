import style from '../../assets/style/marketProfile.module.css';
import { useTranslation } from "react-i18next";
import blogStyle from "../../assets/style/show_blog.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Similar({showBlogData, id , urlId}) {
  const [t] = useTranslation();
    const handleChangePage = () => {
      window.scrollTo(0, 0);
    };
    return (
      <div className={`${blogStyle.mainSectionBlog} row`}>
        <div className={`${style.subLastSection} col-10 mt-5`}>
          {showBlogData?.similar && (
            <>
              <h2 className={`mt-5 pb-3 ${style.interestedTitle}`}>
                {t("You may be interested in")}{" "}
              </h2>
              <div className={`${style.lastSection}`}>
                {showBlogData?.similar?.map((item) => (
                 item.image && (
                  <div
                    key={item.id}
                    className={`col-4 ${style.interestedCardContainer} ${blogStyle.interestedCardContainerBlog}`}
                  >
                     <Link
                   to={`/show-blog/${item?.slug}/${item?.id}`}  state={(urlId = { id: item?.id })}
                   onClick={handleChangePage}
                >
                    <LazyLoadImage src={item.image} alt='imageU'/>
                    <p className={style.interested}>{item.title}</p>
                    </Link>
                  </div>
                 )
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
export default Similar;