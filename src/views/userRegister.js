import React from "react";
import Card from "../components/card";
import FormGroup from "../components/formGroup";
import MyButton from "../components/myButtom";
import Navbar2 from "../components/navbar2";

import { withRouter } from "../components/withRouter";
import UserService from "../app/service/userService";
import { showSuccessMessage, showErrorMessage } from "../components/toastr";

class UserRegister extends React.Component{

    constructor(){
        super()
        this.service = new UserService()
        this.register=this.register.bind(this);
    }

    state={
        name: '',
        email: '',
        password: '',
        comfirmPassword: ''
    }

    register = () =>{
        const user = {name: this.state.name, email: this.state.email, password: this.state.password}

        try{
            this.service.validateUser(user)
        }catch(error){
            const errorMessages = error.msgs
            errorMessages.forEach(msg => showErrorMessage(msg))
            return false
        }

        this.service.register(user)
                    .then(response => {
                        showSuccessMessage('You are registred; and can login to use the App!')
                        this.props.navigate('/login')
                    }
                    ).catch(error => {
                        showErrorMessage(error.response.data)
                    })
    }

    render(){

        return(
            <div>
                <Navbar2/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"/>
                        <div className="col-md-4">
                            <Card title="User Registration">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <FormGroup label="Name: * " htmlFor="inputName">
                                                <input type="text" 
                                                    className="form-control" 
                                                    id="inputName" 
                                                    name="name" 
                                                    onChange={e => this.setState({name: e.target.value})} />
                                            </FormGroup>
                                            <FormGroup label="Email: * " htmlFor="inputEmail">
                                                <input type="email" 
                                                    className="form-control" 
                                                    id="inputEmail" 
                                                    name="email" 
                                                    onChange={e => this.setState({email: e.target.value})} />
                                            </FormGroup>
                                            <FormGroup label="Password: * " htmlFor="inputPassword">
                                                <input type="password" 
                                                    className="form-control" 
                                                    id="inputPassword" 
                                                    name="password" 
                                                    onChange={e => this.setState({password: e.target.value})} />
                                            </FormGroup>
                                            <FormGroup label="Confirm Password: * " htmlFor="inputComfirmPassword">
                                                <input type="password" 
                                                    className="form-control" 
                                                    id="inputComfirmPassword" 
                                                    name="comfirmPassword" 
                                                    onChange={e => this.setState({comfirmPassword: e.target.value})} />
                                            </FormGroup>
                                            <br/>
                                            <button onClick={this.register} type="button" className="btn btn-primary">Register</button>
                                            <MyButton href="/login" className="btn btn-warning" text="Go To Login"/>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserRegister)