import React, {useEffect, useState} from 'react';
import style from '../../../assets/style/job_rent/jobRentFilter.module.css'
import useAxios from '../../../hooks/useAxiosGet';
import DropDownSearch from './DropDownSearch';

function JobRentFilter({filterChange, filters, type}) {
 
    
const [url, setUrl] = useState('');

useEffect(() => {
  if (type === 'rent') {
    setUrl('rents/web/filter');
  } else {
    setUrl(`jobs/web/filter`);
  }
}, [type]);
    
    const [Data] = useAxios(url);
  return (
    <>
     <div className={style.mainFilterDiv}>

        <h2 className={style.filterTitle}>Filter</h2>
            
            {
            Data?.data?.map((item, index) => (
                <div key={index} className={style.productDiv}>

                    <DropDownSearch index={index} title={item.title} id = {item.id} subData= {item.subtitle} filterChange = {filterChange} name = {item.name} nameTo = {item.name_to} fields_num = {item.fields_num} filter_type = {item.type} filters = {filters} />

                </div>
                ))
            }


        </div>
    </>
  )
}

export default JobRentFilter