import ApiService from "../apiService";
import ValidationError from "../exceptions/validationError";

class RecordService extends ApiService{

    constructor(){
        super('/api/records/')
    }

    getRecords(userId){
        return this.get(`?user=${userId}`)
    }

    search(userId, record){
        let params = `?user=${userId}`

        if(record.artist){
            params = `${params}&artist=${record.artist}`
        }
        if(record.label){
            params = `${params}&label=${record.label}`
        }
        if(record.year){
            params = `${params}&year=${record.year}`
        }

        return this.get(params)
    }

    addRecord(record){
        return this.post('', record)
    }

    updateRecord(record){
        return this.put(`${record.id}`, record)
    }

    validateRecord(record){
        const errors = []

        if(!record.name){errors.push('insert Name!')}
        if(!record.artist){errors.push('insert Artist!')}
        if(!record.label){errors.push('insert Record Label!')}
        if(!record.year){errors.push('insert Release Year!')}
        if(!record.pictureUrl){errors.push('insert Picture url!')}
        if(!record.spotifyUrl){errors.push('insert Spotify url!')}

        if(errors && errors.length > 0){throw new ValidationError(errors)}
    }

    deleteRecord(id){
        return this.delete(`${id}`)
    }
}

export default RecordService