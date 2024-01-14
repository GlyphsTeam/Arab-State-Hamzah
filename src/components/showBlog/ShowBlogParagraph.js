import style from "../../assets/style/show_blog.module.css";
import ReactHtmlParser from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Helmet } from 'react-helmet';

function ShowBlogParagraph({ Data }) {
  const showBlogParagraph = Data?.data?.blog?.paragraphs;
  return (
    <>
    <Helmet>
      {showBlogParagraph?.map((item)=>{
        return  <meta name="description" content={item?.web_description &&ReactHtmlParser(`${item?.web_description}`)}/>
      })}
    
    </Helmet>
      { showBlogParagraph?.map((item, index) => (
          <div key={index} >
          {item?.title&&<p className={style.showBlogMainTitle}>{item?.title} </p>}
            {
               item?.image &&
            <div >
              {/* <p className={style.showBlogMainTitle}>{item?.title} </p> */}
              <LazyLoadImage key={item.id} className={style.showBlogImage} src={item?.image} alt="blog"/>
            </div>
  }
            <div className={`${style.showBlogParagraphDiv}` } >
             {item?.web_description&&<>{item?.web_description && ReactHtmlParser(`${item?.web_description}`)} </>}
              <br/>
            </div>
        </div>
      ))}
    </>
  );
}
export default ShowBlogParagraph;
