import React, {useState, useEffect} from "react";
import CategoryCard from "./CategoryCard";
import style from "../../assets/style/SubCategory.module.css";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAxios from "../../hooks/useAxiosGet";
import {useNavigate} from "react-router-dom";

function Category() {
  const navigate = useNavigate()
  const [t] = useTranslation();
  const [activeFilter, setActiveFilter] = useState();
  const { type } = useParams();
  const url_api = (type === 'all'? `listings` : (type === 'services'? `listings?type=service`: `listings?type=business`));
  const [Data] = useAxios(url_api);


  useEffect(() =>{
    setActiveFilter(type)
    Filter(type)
  }, [type]);

  const Filter = (e) => {
    if (e === 'all') {
      navigate('/Category/all')
    } else if (e === 'shops') {
      navigate('/Category/shops')
    } else if (e === 'services') {
      navigate('/Category/services')
    }
    setActiveFilter(e);
  };

  return (
    <div className={`container`}>
        <div className={`${style.categoryBody} row`}>
          <div>
          <h1
        className={
          style.categoryTitle
        }
      >
        {
          <>
            <div className={`d-flex ${style.filterDiv}`}>
              <h3
                className={
                  activeFilter === 'all' ? style.activeFilterBackground : ``
                }
                onClick={() => Filter('all')}
              >
                {t("All")}
              </h3>
              <h3
                className={
                  activeFilter === 'shops' ? style.activeFilterBackground : ``
                }
                onClick={() => Filter('shops')}
              >
                {t("Shops")}
              </h3>
              <h3
                className={
                  activeFilter === 'services' ? style.activeFilterBackground : ``
                }
                onClick={() => Filter('services')}
              >
                {t("Services")}
              </h3>
            </div>
          </>
        }
      </h1>
          </div>

<div className="row">
          {Data?.data?.map((item, index) => (
            <CategoryCard key={index} data = {item} />
          ))

          }

</div>
          
          
        </div>
    </div>
  );
}
export default Category;