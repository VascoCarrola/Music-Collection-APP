import React from "react";

class NavbarItem extends React.Component{

    render(){
        return(    
            <ul className="navbar-nav">
                <li className="nav-item">
                    {this.props.children}
                </li>
            </ul>
        )
    } 
}

export default NavbarItem