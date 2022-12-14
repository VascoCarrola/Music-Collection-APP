import React from "react";
import Card from "../components/card";
import FormGroup from "../components/formGroup";
import MyButton from "../components/myButtom";
import Navbar2 from "../components/navbar2";

import { withRouter } from "../components/withRouter";
import UserService from "../app/service/userService";
import LocalStorageService from "../app/service/localStorageService";
import { showErrorMessage } from "../components/toastr";

class Login extends React.Component{

    constructor(){
        super()
        this.service = new UserService()
        this.login=this.login.bind(this);
    }

    state = {
        email: '',
        password: ''
    }

    login = () =>{  
        this.service.login(
            {email: this.state.email, password: this.state.password}
            ).then(response => {
                LocalStorageService.addItem('logged_user', response.data)
                this.props.navigate('/home')
            }
            ).catch(error => {
                showErrorMessage(error.response.data)
            }
            )
    }

    render(){
        return(
            <div>
                <Navbar2/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"/>
                        <div className="col-md-4">
                            <div className="bs-docs-section">
                                <Card title="Login">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="bs-component">
                                                <fieldset>
                                                    <FormGroup label="Email: *" htmlFor="exampleInputEmail">
                                                        <input type="email"
                                                        value={this.state.email}
                                                        onChange={e => this.setState({email: e.target.value})}
                                                        className="form-control"
                                                        id="exampleInputEmail1" 
                                                        aria-describedby="emailHelp" />
                                                    </FormGroup>
                                                    <FormGroup label="Password: *" htmlFor="exampleInputPassword">
                                                        <input type="password"
                                                        value={this.state.password}
                                                        onChange={e => this.setState({password: e.target.value})}                                                   
                                                        className="form-control" 
                                                        id="exampleInputPassword1" />
                                                    </FormGroup>
                                                    <br/>
                                                    <button onClick={this.login} type="button" className="btn btn-primary">Login</button>
                                                    <MyButton href="/userRegister" className="btn btn-warning" text="Regiter"/>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)