
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
    static put = async (endpoint, body) => {
        return new Promise( async (res, rej) => {
            try{
                let data = await axios.put(endpoint, body)
                res(data)
            }catch(err){
                rej(err)
            }
        })
    }

    static multipartPut = async (endpoint, body, header) => {
        return new Promise( async (res, rej) => {
            try{
                console.log("Headers" + header)
                let data = await axios.put(endpoint, body, header)
                res(data)
            }catch(err){
                rej(err)
            }
        })
    }

    static delete = async (endpoint) => {
        return new Promise( async (res, rej) => {
            try{
                let data = await axios.delete(endpoint)
                res(data)
            }catch(err){
                rej(err)
            }
        })
    }
}