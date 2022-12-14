import ApiService from "../apiService";
import ValidationError from "../exceptions/validationError";

class UserService extends ApiService{
    constructor(){
        super('/api/users')
    }

    login(credentials){
        return this.post('/login', credentials)
    }

    register(user){
        return this.post('/', user);
    }

    validateUser(user){
        const errors = []

        if(!user.name){errors.push('insert name!')}
        if(!user.email){
            errors.push('insert email!')
        }else if(!user.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){errors.push('insert valid email!')}
        if(!user.password){
            errors.push('insert password!')
        }else if(!user.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\$%\^&\*])(?=.{8,})/)){
            errors.push('the password must have at least 8 digists, 1 uppercase letter, 1 lowercase letter, 1 number, and one of this charecters: "!, @, #, _"')
        }else if(user.password !== user.comfirmPassword){errors.push('comfirm your password!')}
        if(errors && errors.length > 0){throw new ValidationError(errors)}
    }
}

export default UserService