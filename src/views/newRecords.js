import React from "react";
import Card from "../components/card";
import FormGroup from "../components/formGroup";
import Navbar2 from "../components/navbar2";

import RecordService from "../app/service/recordService";
import LocalStorageService from "../app/service/localStorageService";
import { showSuccessMessage, showErrorMessage } from "../components/toastr";
import { withRouter } from "../components/withRouter";

class NewRecords extends React.Component{

    constructor(){
        super()
        this.service = new RecordService()
        this.addRecord=this.addRecord.bind(this);
        this.updateRecord=this.updateRecord.bind(this);
    }

    state = {
        id: null,
        name: '',
        artist: '',
        label: '',
        year: '',
        pictureUrl: '',
        spotifyUrl: '',
        user:'',
        updating: false
    }

    componentDidMount(){
        const recordToUpdate = LocalStorageService.getItem('record')
        if(recordToUpdate){
            this.setState({
                id: recordToUpdate.id,
                name: recordToUpdate.name,
                artist: recordToUpdate.artist,
                label: recordToUpdate.label,
                year: recordToUpdate.year,
                pictureUrl: recordToUpdate.pictureUrl,
                spotifyUrl: recordToUpdate.spotifyUrl,
                user: recordToUpdate.user,
                updating: true
            })
            LocalStorageService.removeItem('record')
        }
    }

    addRecord = () => {
        const loggedUser = LocalStorageService.getItem('logged_user')
        const record = {
            name: this.state.name,
            artist: this.state.artist,
            label: this.state.label,
            year: this.state.year,
            pictureUrl: this.state.pictureUrl,
            spotifyUrl: this.state.spotifyUrl,
            user: loggedUser
        }

        try{
            this.service.validateRecord(record)
        }catch(error){
            const errorMessages = error.msgs
            errorMessages.forEach(msg => showErrorMessage(msg))
            return false
        }

        this.service.addRecord(record)
                    .then(response => {
                        showSuccessMessage('The record was added to your collection!')
                        this.props.navigate('/home')
                    }
                    ).catch(error => {showErrorMessage(error.response.data)})
    }

    updateRecord = () => {
        const record = {
            id: this.state.id,
            name: this.state.name,
            artist: this.state.artist,
            label: this.state.label,
            year: this.state.year,
            pictureUrl: this.state.pictureUrl,
            spotifyUrl: this.state.spotifyUrl,
            user: this.state.user
        }
        
        this.service.updateRecord(record)
                    .then(response =>{
                        showSuccessMessage('The Record was Updated!')
                        this.props.navigate('/home')
                    }
                    ).catch(error =>{
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
                            <Card title={this.state.updating? "Make Your Changes" : "New Record"}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <FormGroup label="Name: * " htmlFor="inputName">
                                                <input type="text" 
                                                    className="form-control" 
                                                    id="inputName" 
                                                    name="name"
                                                    placeholder={this.state.name} 
                                                    onChange={e => this.setState({name: e.target.value})} />
                                            </FormGroup>
                                            <FormGroup label="Artist: * " htmlFor="inputArtist">
                                                <input type="text" 
                                                    className="form-control" 
                                                    id="inputArtist" 
                                                    name="artist"
                                                    placeholder={this.state.artist}  
                                                    onChange={e => this.setState({artist: e.target.value})} />
                                            </FormGroup>
                                            <FormGroup label="Label: * " htmlFor="inputLabel">
                                                <input type="text" 
                                                    className="form-control" 
                                                    id="inputLabel" 
                                                    name="label" 
                                                    placeholder={this.state.label} 
                                                    onChange={e => this.setState({label: e.target.value})} />
                                            </FormGroup>
                                            <FormGroup label="Release Year: * " htmlFor="inputYear">
                                                <input type="text" 
                                                    className="form-control" 
                                                    id="inputYear" 
                                                    name="year"
                                                    placeholder={this.state.year}  
                                                    onChange={e => this.setState({year: e.target.value})} />
                                            </FormGroup>
                                            <FormGroup label="Picture url: * " htmlFor="inputPic">
                                                <input type="text" 
                                                    className="form-control" 
                                                    id="inputPic" 
                                                    name="Picture"
                                                    placeholder={this.state.pictureUrl}  
                                                    onChange={e => this.setState({pictureUrl: e.target.value})} />
                                            </FormGroup>
                                            <FormGroup label="Spotify url: * " htmlFor="inputSpotify">
                                                <input type="text" 
                                                    className="form-control" 
                                                    id="inputSpotify" 
                                                    name="spotify"
                                                    placeholder={this.state.spotifyUrl}  
                                                    onChange={e => this.setState({spotifyUrl: e.target.value})} />
                                            </FormGroup>
                                            <br/>
                                            {
                                                this.state.updating ? (
                                                    <button onClick={this.updateRecord} type="button" className="btn btn-primary">Update</button>
                                                ) : (
                                                    <button onClick={this.addRecord} type="button" className="btn btn-primary">Add Record</button>
                                                )
                                            }
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

export default withRouter(NewRecords)