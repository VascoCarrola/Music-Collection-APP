import React from "react";
import NavbarItem from "./navbarItem";

import LocalStorageService from "../app/service/localStorageService";

function Navbar(props){

    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a className="navbar-brand" href='/home'>My Records</a>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <NavbarItem>
                        <a className="nav-link" href="/newRecord">Add a new Record!</a>
                    </NavbarItem>
                    <NavbarItem>
                        <input id="artistImput" placeholder="Artist" onChange={e => LocalStorageService.addItem('artist', e.target.value)}/>
                    </NavbarItem>
                    <NavbarItem>
                        <input placeholder="Label" onChange={e => LocalStorageService.addItem('label', e.target.value)}/>
                    </NavbarItem>
                    <NavbarItem>
                        <input placeholder="Year" onChange={e => LocalStorageService.addItem('year', e.target.value)}/>
                    </NavbarItem>
                    <NavbarItem>
                        <button onClick={props.search} type="button" className="btn btn-primary">Search!</button>
                    </NavbarItem>
                </div>
                <NavbarItem>
                    <button onClick={props.logout} type="button" className="btn btn-primary">Logout</button>
                </NavbarItem>
            </div>
        </div>
    )
}

export default Navbar