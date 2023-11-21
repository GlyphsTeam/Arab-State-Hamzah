import React from "react";
import style from "../../assets/style/show_blog.module.css";
import ReactHtmlParser from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ShowBlogParagraph({ Data, showBlogData }) {
  const showBlogParagraph = Data?.data?.blog?.paragraphs;
  return (
    <>
      { showBlogParagraph?.map((item, index) => (
          <div key={index} >
           <p className={style.showBlogMainTitle}>{item?.title} </p>
            {
               item?.image &&
            <div >
              {/* <p className={style.showBlogMainTitle}>{item?.title} </p> */}
              <LazyLoadImage key={item.id} className={style.showBlogImage} src={item?.image} alt="blog"/>
            </div>
  }
            <div className={style.showBlogParagraphDiv}>
              <p className={` ${style.showBlogParagraphTitle} pt-3 `} key={item?.id}>{item?.web_description && ReactHtmlParser(`${item?.web_description}`)} </p>
              <br/>
            </div>
        </div>
      ))}
    </>
  );
}
export default ShowBlogParagraph;
