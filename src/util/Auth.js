import { Auth as Cognito } from 'aws-amplify';

export default class Auth {

    /** 
     * FUNCIÓN PARA CREAR UN USUARIO EN CÓGNITO
     * @param {string} username Nombre del usuario
     * @param {string} password Contraseña del usuario
     * @param {string} email Correo electrónico del usuario
     * @returns {Promise} res(user) Retorna el usuario creado
     */
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

    /** 
     * FUNCIÓN PARA LOGUEARSE
     * @param {string} username Nombre del usuario
     * @param {string} password Contraseña del usuario
     * @returns {Promise} res(user) Retorna el usuario logueado
     */
    static logIn = (username, password) => {}

    /** 
     * FUNCIÓN PARA DESLOGUEARSE
     * @returns {Promise} res(user) Retorna el usuario deslogueado
     */
    static logOut = () => {}
}