import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../Auth/Auth';
function Privateroute() {

   

    if(isLoggedIn()){
        return <Outlet/>
    }
    else{
        alert("User Is Not Authinticated Please Register & Login")
        return <Navigate to ={"/"}/>
    }

}

export default Privateroute