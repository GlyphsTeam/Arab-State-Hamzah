import React from 'react';
import Menu from '../components/common/UserProfileMenu';
import UserProfile from '../components/userProfile/UserProfile';
import useAxios from "../hooks/useAxiosGet";
import style from '../assets/style/userProfile/userProfile.module.css'

function UserProfilePage() {
  const url = `profile`;
  const [Data] = useAxios(url);
  const userData = Data?.data; 

  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='0' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <UserProfile userData = {userData} />
      </div>

    </div>
  )
}

export default UserProfilePage