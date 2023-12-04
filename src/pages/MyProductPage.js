import Menu from '../components/common/UserProfileMenu';
import UserPostsSection from '../components/userProfile/UserPostsSection';
import useAxios from "../hooks/useAxiosGet";
import style from '../assets/style/userProfile/userProfile.module.css'

function MyJobPage({baseUrl}) {

  const url = `user/my-post`;
  const [Data] = useAxios(url);
  const myData = Data?.data;
  return (
    <div className={`row w-100 m-0 ${style.userPage}`}>

      <div className='col-lg-3 col-md-4 col-sm-12 px-0'>
        <Menu activeList='2' />
      </div>

      <div className='col-lg-9 col-md-8 col-sm-12'>
        <UserPostsSection savedData = {myData} type='product' baseUrl={baseUrl} />
      </div>

    </div>
  )
}

export default MyJobPage