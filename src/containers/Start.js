import React, { Component } from 'react';
import * as Components from '../components/Components';
import styled from 'styled-components';
import { postUser, getUser } from '../../services/index';

const StartStyled = styled.section`
            display: flex;
            align-items: center;
        `;

export default class Start extends Component {
  constructor(props) {
    super(props);
    const { id, profile_image, nickname, point } = localStorage;
    this.state = { id, profile_image, nickname, point };

  }

  componentDidMount() {
    if (this.state.id !== undefined) {
      location.pathname = '/game';
    }
    const userInfo = (...res) => {
      getUser(res)
        .then((getRes) => {
          if (getRes.data.length === 0) {
            postUser(res)
              .then((postRes) => {
                console.log(postRes + '포스트성공');
              })
              .catch((postRes) => {
                console.log(postRes + '포스트실패');
              });
          } else {
            location.pathname = '/game';
            console.log(getRes + '겟성공');
          }
        })
        .catch((getRes) => {
          console.log(getRes + '겟실패');
        });
    };

    const kakaoLogin = (() => {
      // 사용할 앱의 JavaScript 키를 설정해 주세요.
      Kakao.init('8c6f50a3498bb7a95ee140fc621fdf8b');
      // 카카오 로그인 버튼을 생성합니다.
      Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        success: function (authObj) {
          // 로그인 성공시, API를 호출합니다.
          Kakao.API.request({
            url: '/v2/user/me',
            success: function (res) {
              // const data = res;
              const { id, properties } = res;
              userInfo(id, properties.profile_image, properties.nickname);
            },
            fail: function (error) {
              alert(JSON.stringify(error));
            },
          });
        },
        fail: function (err) {
          alert(JSON.stringify(err));
        },
      });
    })();
  }

  render() {
    return (
      <StartStyled>
        {/* <components.Button text="Start" to="/game" /> */}
        <button id="kakao-login-btn"></button>
      </StartStyled>
    );
  }
}