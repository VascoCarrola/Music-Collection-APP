import React from "react";
import RecordCard from "../components/recordCard";
import Navbar from "../components/navbar";
import Card from "../components/card";
import login from "./login";

import RecordService from "../app/service/recordService";
import LocalStorageService from "../app/service/localStorageService";
import { withRouter } from "../components/withRouter";
import { showSuccessMessage, showErrorMessage } from "../components/toastr";
import { Dialog } from 'primereact/dialog'

class Home extends React.Component{

    constructor(){
        super()
        this.service = new RecordService()
        this.edit=this.edit.bind(this)
        this.delete=this.delete.bind(this)
    }

    state = {
        logged: LocalStorageService.getItem('logged_user'),
        records: [],
        pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBVE8RUcsARPfqKGCirAAFZOZBKWgplxDEuE-KAAZwk1X_LYPc3T648ve4Ln6LshKHtaw&usqp=CAU",
        dialogVisible: false,
        recordToDelete: null
    }

    componentDidMount(){
        if(this.state.logged){
            const loggedUser = LocalStorageService.getItem('logged_user')
        this.setState({name: loggedUser.name})

        this.service.getRecords(loggedUser.id)
             .then(response => {
                this.setState({records: response.data})
             }
             ).catch(error => {
                showErrorMessage(error.response.data)
             })
        }
    }

    edit = (record) => {
        LocalStorageService.addItem('record', record)
        this.props.navigate('/newRecord')
    }

    openDeleteDialog = (record) =>{
        this.setState({dialogVisible: true, recordToDelete: record})
    }

    delete = () => {
        this.service.delete(this.state.recordToDelete.id)
            .then(response =>{
                const records = this.state.records
                const index = records.indexOf(this.recordToDelete)
                records.splice(index,1)
                this.setState(records)
                showSuccessMessage('Record Deleted!')
            }
            ).catch(error =>{
                showErrorMessage(error.response.data)
            })
            this.setState({dialogVisible: false})
    }

    logout = () =>{
        LocalStorageService.removeItem('logged_user')
        this.props.navigate('/login')
    }

    search = () =>{
        const loggedUser = LocalStorageService.getItem('logged_user')
        const record = {
            artist: LocalStorageService.getItem('artist'),
            label: LocalStorageService.getItem('label'),
            year: LocalStorageService.getItem('year')
        }
        LocalStorageService.removeItem('artist')
        LocalStorageService.removeItem('label')
        LocalStorageService.removeItem('year')
        
        this.service.search(loggedUser.id, record)
                .then(response => {
                    this.setState({records: response.data})
                 }
                 ).catch(error => {
                    showErrorMessage(error.response.data)
                 })
    }

    render(){
        const dialogFooter = (
            <div>
                <button onClick={this.delete} type="button" className="btn btn-primary">Delete</button>
            </div>
        );
        if(! this.state.logged){
            return(
                <div className="container">
                    <div className="row">
                    <div className="col-md-4"/>
                        <div className="col-md-4">
                            <div className="bs-docs-section">
                                <Card title={<a className="nav-link" href="/login">Click and Go To Login!</a>}>
                                    <p>you have to be logged to use the app</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <Navbar logout={this.logout} search={this.search}/>
                <div className="container">
                    <div className="container">
                        <div className="d-flex align-items-center">
                            <div className="col-md-2">
                                <div className="col-md-11">
                                    <img className="avatar-md rounded-circle img-thumbnail" src={this.state.pic} alt=''/>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="col-md-10">
                                    <h5 className="card-title">{this.state.name}'s Records: </h5>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-md-2"/>
                            <div className="col-md-8">
                                <RecordCard delete={this.openDeleteDialog} edit={this.edit} records={this.state.records}/>
                            </div>
                        </div>
                        <Dialog header="WARNING"
                                visible={this.state.dialogVisible} 
                                style={{ width: '25vw' }} 
                                modal={true}
                                footer={dialogFooter}
                                onHide={() => this.setState({dialogVisible: false})}>
                            Do you realy whant to delete this Record!
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home)