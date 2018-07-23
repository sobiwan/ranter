import axios from "axios";

/** 
 * A wrapper around axios API call that formats erros, etc
 * @param {string} method the HTTP verb to use
 * @param {string} path the route path/endpoint
 * @param {object} data (optional) data in JSON form for POST requests
*/

export function apiCall(method, path, data){
    return new Promise((resolve, reject)=> {
        return axios[method](path, data).then(res => {
            return resolve(res.data)
        }).catch(err => {
            return reject(err.response.data.error);
        })
    })
}