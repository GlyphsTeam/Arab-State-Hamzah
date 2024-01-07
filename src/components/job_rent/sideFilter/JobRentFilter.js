import React, { useEffect, useState } from 'react';
import style from '../../../assets/style/job_rent/jobRentFilter.module.css'
import useAxios from '../../../hooks/useAxiosGet';
import DropDownSearch from './DropDownSearch';
import ButtonOne from '../../Button/ButtonOne';
import { useTranslation } from "react-i18next";
function JobRentFilter({ filterChange, filters, type, setFilters }) {
  const [t] = useTranslation();

  const [url, setUrl] = useState('');

  useEffect(() => {
    if (type === 'rent') {
      setUrl('rents/web/filter');
    } else {
      setUrl(`jobs/web/filter`);
    }
  }, [type]);

  const [Data] = useAxios(url);
  const resetFilter = () => {
    if (type === "rent") {
      setFilters({
        sort_by: "",
        type: "",
        order_by: "",
        price_from: "",
        price_to: "",
        place: "",
      })
    }
    else {
      setFilters({
        sort_by: "",
        type: "",
        experience: "",
        salary_from: "",
        salary_to: "",
        place: "",
      })
    }
  }
  return (
    <>
      <div className={style.mainFilterDiv}>
        <h2 className={style.filterTitle}>Filter</h2>

        {
          Data?.data?.map((item, index) => (
            <div key={index} className={style.productDiv}>

              <DropDownSearch index={index} title={item.title} id={item.id} subData={item.subtitle} filterChange={filterChange} name={item.name} nameTo={item.name_to} fields_num={item.fields_num} filter_type={item.type} filters={filters} />

            </div>
          ))
        }

<ButtonOne resetFilter={resetFilter}>{t("Reset Filter")}</ButtonOne>

      </div>
    </>
  )
}

export default JobRentFilter