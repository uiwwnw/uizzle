import React, { Component } from 'react';
import * as Components from '../components/Components';
import { transitionTo } from 'react-router-dom';
import styled from 'styled-components';
import store from '../redux/index';
import { Link } from 'react-router-dom';
import { postUser, getUser } from '../../services/index';

const StageStyled = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  text-align: center;
  font-size: 20em;
  pointer-events: none;
  background: red;
  
  p {
    overflow: hidden;
    height: 1.4em;
    margin: 0 0 1em;
    line-height: 1;
    padding-top: 1em;
    font-size: .2em;
    animation: show 1s;
  }
  
  strong {
    overflow: hidden;
    display: inline-block;
    height: 1em;
    line-height: 4;
    animation: show 1s forwards;
    animation-delay: .6s;
  }
      
  @keyframes show {
    0% {
      line-height: 4;
    }
    
    100% {
      line-height: 1;
    }
  }
`;

export default class Stage extends Component {
  constructor(props) {
    super(props);
    this.sto;
  }

  componentDidMount() {
    this.sto = setTimeout(() => {
      this.props.history.push('/game');
    }, 1500);
  }

  render() {
    return (
      <StageStyled>
        <p>다음레벨로 넘어감니다</p>
        <strong>
          {store.getState().level}
        </strong>
      </StageStyled>
    );
  }
}
