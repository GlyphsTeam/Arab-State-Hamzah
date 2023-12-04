import AuthImage from '../components/common/auth/AuthImage';
import style from '../assets/style/authentication/auth.module.css';
import DeleteAccount from '../components/deleteAccount/DeleteAccount';

function DeleteAccountPage({baseUrl , logo}) {

  return (
    <>
       <div className={`d-flex ${style.registerPage}`}>
        <AuthImage logo={logo}/>
        <DeleteAccount baseUrl = {baseUrl} />
    </div>
    </>
  )
}

export default DeleteAccountPage