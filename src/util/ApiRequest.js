
import axios from './Api';

export default class ApiRequest {

    static get = async (endpoint) => {
        return new Promise( async (res, rej) => {
            try{
                let data = await axios.get(endpoint)
                res(data)
            }catch(err){
                rej(err)
            }
        })
    }
    static post = async (endpoint, body) => {
        return new Promise( async (res, rej) => {
            try{
                let data = await axios.post(endpoint, body)
                res(data)
            }catch(err){
                rej(err)
            }
        })
    }

}