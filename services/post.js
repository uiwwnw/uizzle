import axios from 'axios';

export default function post(url, data) {
  return axios({
    method: 'post',
    url: 'http://localhost:3000/' + url,
    data,
  }).then(response => { return response; }) // SUCCESS
    .catch(response => { return response; }); // ERROR
};