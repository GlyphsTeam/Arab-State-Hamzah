import React, { useEffect} from 'react'
import style from "../../../assets/style/homePage/testimonial.module.scss"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactHtmlParser from 'html-react-parser';
import { LazyLoadImage } from "react-lazy-load-image-component";

function TestimonialCard({name, message, image, index}) {
  
    const boxVariant = {
        visible: { opacity: 1,y:0, transition: { duration: 1 } },
        hidden: { opacity: 0, y:-200, },
        evenHidden: { opacity: 0, y:200, }
      };

      const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
        if(index%2 === 0){
            control.start("evenHidden");

        }else{

            control.start("hidden");
        }
    }
  }, [control, inView]);


  return (
    <motion.div
    className="box"
    ref={ref}
    variants={boxVariant}
    // initial="hidden"
    initial={index%2 === 0 ? "evenHidden" : "hidden"}
    animate={control}
  >
    <div className={style.testimonialCardBody}>
        <LazyLoadImage src={image} alt="Testimonial" className={style.testimonialImg}/>
        <div className={style.testimonialTextBox}>
            <h1 className={style.qStart}><i className="fas fa-quote-left"></i></h1>
            <h1 className={style.cardTitle}>{name}</h1>
            <p  className={style.cardMessage}>{message && ReactHtmlParser(`${message}`)}</p>
            <h1 className={style.qEnd}><i className="fas fa-quote-right"></i></h1>
        </div>

    </div>
  </motion.div>

  )
}

export default TestimonialCard