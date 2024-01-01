import Menu from '../components/common/UserProfileMenu';
import style from '../assets/style/userProfile/userProfile.module.css'
import CardBussiness from '../components/subCategory/SubCategoryCard';
import useAxios from '../hooks/useAxiosGet';
function MyBusiness({ baseUrl }) {
  const url = 'business';
  const [Data] = useAxios(url);
  const bussinseData = Data?.data?.businesses;

  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='2' />
      </div>
      <p className={style.parProfile}>My posts &gt; My Business</p>

      <div className={`col-lg-9 col-md-8 col-sm-12 ${style.cardConianerGridBussiness}`}>
        { bussinseData?.map((data) => {
          return (<CardBussiness data={data} key={data._id} typePage={2}/>)
        })
        }
      </div>

    </div>
  )
}

export default MyBusiness