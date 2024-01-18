import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import style from "../../assets/style/SubCategory.module.css";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { serversState, setCateDataAll, setCategServers, setCategShop } from '../../redux/OurServices/services';
import { setLoading } from '../../redux/slices/login';
import axios from 'axios';

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryData = useSelector(serversState);
  const [t] = useTranslation();
  const [activeFilter, setActiveFilter] = useState();
  const { type } = useParams();
  const url_api = (type === 'all' ? `listings` : (type === 'services' ? `listings?type=service` : `listings?type=business`));
  // const [Data] = useAxios(url_api);
  const getDataCategory = async () => {
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    const token = localStorage.getItem("arab_user_token");
    if (
      categoryData?.services?.categpryDataAll === null ||
      categoryData?.services?.categoryDataServ === null ||
      categoryData?.services?.categoryDataShop === null
    ) {
      setLoading(true)
      await axios.get(`${baseURL}/${url_api}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        if (type === "all") {
          dispatch(setCateDataAll(res.data?.data));
        }
        else if (type === "services") {
          dispatch(setCategServers(res.data?.data));
        }
        else {
          dispatch(setCategShop(res.data?.data));
        }
        setLoading(false);
      }).catch((err) => { 
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }

  useEffect(() => {
    setActiveFilter(type)
    Filter(type);
    getDataCategory();
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

        <div className={style.categoryBussiness}>
          {type === "all" && categoryData?.services?.categpryDataAll?.map((item, index) => (
            <CategoryCard key={index} data={item} />
          ))
          }
          {type === "services" && categoryData?.services?.categoryDataServ?.map((item, index) => (
            <CategoryCard key={index} data={item} />
          ))
          }
          {type === "shops" && categoryData?.services?.categoryDataShop?.map((item, index) => (
            <CategoryCard key={index} data={item} />
          ))
          }
        </div>


      </div>
    </div>
  );
}
export default Category;