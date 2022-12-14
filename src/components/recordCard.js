import React from "react";

function RecordCard(props){

    const cards = props.records.map(record => {

        return(
            <div key = {record.id}>            
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <div className="col-md-1">
                            <img className="avatar-md rounded-circle img-thumbnail" src={record.pictureUrl} alt=""/>
                        </div>
                        <div className="flex-1 ms-3">
                            <h5 className="font-size-15 mb-1">{record.name}</h5>
                        </div>
                        <div className="flex-1 ms-3">
                            <span>{record.artist}</span>
                        </div>
                        <div className="flex-1 ms-3">
                            <p className="text-muted mb-0">Label: {record.label}</p>
                        </div>
                        <div className="flex-1 ms-3">
                            <p className="text-muted mb-0 mt-0">Realease Year: {record.year}</p>
                        </div>
                        <div className="flex-1 ms-3">
                            <button type="button" className="btn btn-primary btn-sm w-100">
                                <a className="nav-link" target="_blank" href={record.spotifyUrl}>Spotify</a>
                            </button>
                        </div>
                        <div className="flex-1 ms-3">
                            <button onClick={e => props.edit(record)} type="button" className="btn btn-primary btn-sm w-100">Edit</button>
                        </div>
                        <div className="flex-1 ms-3">
                            <button onClick={e => props.delete(record)} type="button" className="btn btn-warning btn-sm w-100">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            </div>
        )
    })

    return cards
    
    

}
export default RecordCard