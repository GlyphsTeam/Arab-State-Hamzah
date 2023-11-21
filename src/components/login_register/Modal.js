import React from "react";
import Login from "./Login";
 

function Modal({url,regesterUrl,setIsLogedIn,setUserName}){
 
    return(
        <>
               <div>
                <Login url={url} regesterUrl={regesterUrl} setIsLogedIn = {setIsLogedIn} setUserName = {setUserName}   />
              </div>

 


        </>
    );

}
export default Modal;