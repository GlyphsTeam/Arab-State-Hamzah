import style from "../../assets/style/UserGuide.module.css";
import { useNavigate } from 'react-router-dom';

function Tags({ userGuide, id, pathName, isShowBlog }) {
  const navigate = useNavigate();

  const userGuideTags = isShowBlog ? userGuideTags?.tags : userGuide?.model;

  const handleSearchSubmit = (event) => {
    if (event !== '') {
      navigate(`/search-result/${event}/blog`);
    }
  }

  return (
    <div className={pathName === '/User-Guide' || pathName === '/user-guide' ? style.TagContainer : style.tagShowBlogContainer}>
      <h3 className={style.TagHeader}>{userGuide?.title} </h3>
      <div className={style.TagContainerDiv}>

        {userGuideTags?.slice(0, 5).map((item, index) => (
          <div key={index} className={`${pathName === '/User-Guide' || pathName === '/user-guide' ? style.tagDiv : style.tagShowBlogDiv} ${style.tagCursor}`} onClick={() => handleSearchSubmit(item.name)}>
            <p>{`#${item.name}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
