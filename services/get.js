import axios from 'axios';

export default function get(url) {
    return axios({
        method: 'get',
        url: 'http://localhost:3000/' + url
    }).then( response => { return response } ) // SUCCESS
    .catch( response => { return response } ); // ERROR
};