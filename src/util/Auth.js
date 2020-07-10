import { Auth as Cognito } from 'aws-amplify';

export default class Auth {

    static signUp = (username, password, email) => {
        return new Promise ( async (res, rej) => {
            try {
                let user = await Cognito.signUp({
                    username,
                    password,
                    attributes: {
                        email: email
                    }
                })
                res(user)
            } catch (error) {
                rej(error)
            }
        }) 
    }
    static signIn = () => {}
    static logOut = () => {}
}