import style from "../../assets/style/showUserGuide.module.css";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ShowGuideSteps({ Data, showUserGuide }) {
  const showBlogParagraph = showUserGuide?.steps;
  return (
    <>
      {showBlogParagraph?.map((item, index) => (
        <div key={index}>
          <p className={style.showBlogMainTitle}>{item?.title} </p>
          {item?.image && (
            <div>
              <LazyLoadImage
                key={item.id}
                className={style.showBlogImage}
                src={item?.image}
                alt="UserGuid"
              />
            </div>
          )}
          <div className={style.showBlogParagraphDiv}>
            <p
              className={` ${style.showBlogParagraphTitle} pt-3 `}
              key={item?.id}
            >
              {item?.description}{" "}
            </p>
            <br />
          </div>
        </div>
      ))}
    </>
  );
}
export default ShowGuideSteps;
