import { Outlet, Navigate } from "react-router";


const PrivateRoutes = () => {

    let token = window.localStorage.getItem('arab_user_name');



    return (
        token !== null || undefined ? <Outlet /> : <Navigate to="/" />

    )
}

export default PrivateRoutes