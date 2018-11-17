import axios from 'axios';

export function put(url, data) {
    return axios({
        method: 'put',
        url: 'http://localhost:3000/' + url,
        data
    }).then( response => { return response } ) // SUCCESS
    .catch( response => { return response } ); // ERROR
};
 