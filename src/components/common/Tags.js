import style from "../../assets/style/Blog.module.css";
import { useTranslation } from "react-i18next";

function Tags({ data}) {
  const [t] = useTranslation();


  return (
    <div className={style.TagContainer}>
      <h3 className={style.TagHeader}>{t("Tags")} </h3>
      <div className={style.TagContainerDiv}>
   
          {data?.slice(0, 5).map((item, index) => (
            <div key={index} className={`${style.tagDiv} ${style.tagCursor}`}>
              <p className={style.tagP}>{`#${item.tag}`}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Tags;
