import axios from 'axios';

export function patch(url, data) {
  return axios({
    method: 'patch',
    url: 'http://localhost:3000/' + url,
    data,
  }).then(response => { return response; }) // SUCCESS
    .catch(response => { return response; }); // ERROR
};