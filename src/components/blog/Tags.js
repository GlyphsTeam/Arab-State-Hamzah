import React from "react";
import style from "../../assets/style/Blog.module.css";
import { useNavigate } from 'react-router-dom';

function Tags({ data , id , pathName,isShowBlog}) {
  const navigate = useNavigate();

  const blogTags = isShowBlog? data?.blog?.tags : data?.model;

  const handleSearchSubmit = (event) => {
    if(event !== ''){
    navigate(`/search-result/${event}/blog`);
    }
  }

  return (
    <div className={pathName==='/Blog'|| pathName==='/blog'?  style.TagContainer : style.tagShowBlogContainer}>
      <h3 className={style.TagHeader}>{data?.title}</h3>
      <div className={style.TagContainerDiv}>
   
          {blogTags?.slice(0, 5).map((item, index) => (
            <div key={index} className={`${pathName==='/Blog' || pathName==='/blog'? style.tagDiv : style.tagShowBlogDiv} ${style.tagCursor}`} onClick={()=>handleSearchSubmit(item.name)}>
              <p>{`#${item.name}`}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Tags;
