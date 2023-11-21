import React from "react";
import style from "../../../assets/style/common/blog/blogSquareCard.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BlogSquareCard = ({data}) => {
  return (

    <div className={`${style.blogSquareDiv} `}>
      <div>
        <LazyLoadImage
          src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
          alt="imageBlog"
          className={style.blogSquareImage}
        />
      </div>
      <div className={style.blogSquareText}>
        <h2>Blog title</h2>
        <div>
          <p className={style.blogSquareParagraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            iusto minima, harum explicabo i
          </p>
          <div className={style.readMoreDiv}>
            <p>Read More</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSquareCard;
