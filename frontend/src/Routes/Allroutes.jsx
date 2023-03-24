import React from 'react'
import {Routes,Route} from "react-router-dom";
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Game from '../Pages/Game';
import Resultpage from '../Pages/Resultpage';
import Privateroute from '../Components/Privateroute';

function Allroutes() {
  return (
    <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    
    <Route path="/private" element={<Privateroute/>}>
    <Route path="result" element={<Resultpage />} />
    </Route>

    <Route path="/private" element={<Privateroute/>}>
    <Route path="game" element={<Game/>} />
    </Route>

    <Route path="*" element={<h1>404 | Not Found</h1>} />
    </Routes>
  )
}

export default Allroutes
