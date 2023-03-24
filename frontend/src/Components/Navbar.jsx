import React from 'react'
import { isLoggedIn } from '../Auth/Auth'
import "./Navbar.css";
import { Heading } from '@chakra-ui/react';



function Navbar() {

  const logOut = () =>{
    
      alert("Are You sure want to logout ? ")
      window.localStorage.clear();
      window.location.reload();
  
  }
    
  const name = JSON.parse(localStorage.getItem("name"))
  return (
    <div className='navbar'>
        <Heading mt={2}>{name}</Heading>

        <div className='items'>
        <p><a href="/private/game">
            Home
                </a>
        </p>
                
           
            <button className='login_button'> <a href="/private/result">Winner Button  </a></button>
            <button className='login_button' onClick={logOut}> Log Out </button>
          

           
        </div>
    </div>
  )
}

export default Navbar