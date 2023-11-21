import React from "react";
import style from "../../../assets/style/homePage/aboutHome.module.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function AboutCard(props){
    return(
        <>
        <Link to='/About' key={props.id} className={` ${style.card}`}>
            <div className={style.cardBody}>
            <div className={`row ${style.imgDiv}`}>
                <LazyLoadImage className={style.img} src={props.image} alt={`${props.title}`} />
            </div>
            <div className={`row ${style.aboutArticle}`}>
                 <h1 className={style.aboutDisc}>{props.title}</h1>
                 <p className={style.description}>{props.description}</p>
            </div>
            </div>
        </Link>
        </>
    );
}
export default AboutCard;