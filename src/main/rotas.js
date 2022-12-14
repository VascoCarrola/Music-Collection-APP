import React from "react";
import Login from "../views/login";
import UserRegister from "../views/userRegister";
import Home from "../views/home";
import NewRecords from "../views/newRecords";

import {Route, Routes, BrowserRouter} from 'react-router-dom'

function Rotas(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/userRegister' element={<UserRegister/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/newRecord' element={<NewRecords/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas