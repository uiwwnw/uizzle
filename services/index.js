import axios from 'axios';

const dataFormat = {
  user: {
    id: null,
    profile_image: null,
    nickname: null,
    point: null,
  },
  score: {
    1: {},
  },
  backgrounds: {
    1: [],
  },
};

export function localDataSet(data) {
  const { id, profile_image, nickname, point, score, backgrounds } = data;
  localStorage.setItem('id', id);
  localStorage.setItem('profile_image', profile_image);
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('point', point);
  localStorage.setItem('score', score);
  localStorage.setItem('backgrounds', backgrounds);
};

export function localDataGet() {
  const { id, profile_image, nickname, point, score, backgrounds } = localStorage;
  return id, profile_image, nickname, point, score, backgrounds;
};

export function getUser(url) {
  return axios({
    method: 'get',
    url: 'http://localhost:3000/users?id=' + url[ 0 ],
  })
    .then(response => {
      const { id, profile_image, nickname, point } = response.data[ 0 ];
      const data = {
        id, profile_image, nickname, point,
      };
      localDataSet(data);
      // localStorage.setItem("id", response.data[0].id);
      // localStorage.setItem("profile_image", response.data[0].profile_image);
      // localStorage.setItem("nickname", response.data[0].nickname);
      // localStorage.setItem("point", response.data[0].point);
      return response;
    })
    .catch(response => { return response; }); // ERROR
};

export function postUser(data) {
  return axios({
    method: 'post',
    url: 'http://localhost:3000/users',
    data: {
      id: data[ 0 ],
      profile_image: data[ 1 ],
      nickname: data[ 2 ],
      point: 0,
    },
  })
    .then(
      response => {
        const data = {
          id: data[ 0 ],
          profile_image: data[ 1 ],
          nickname: data[ 2 ],
          point: 0,
        };
        localDataSet(data);
        return response;
      })
    .catch(response => { return response; }); // ERROR
};