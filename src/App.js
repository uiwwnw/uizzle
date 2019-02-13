import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from './containers/Container';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCamera, faHome, faSearch, faAddressBook, faVolumeUp, faWifi, faEdit, faBomb } from '@fortawesome/free-solid-svg-icons';
import store from './redux';

library.add(faCamera, faHome, faSearch, faAddressBook, faVolumeUp, faWifi, faEdit, faBomb);
const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
  }
`;

const AppStyled = styled.main`
  overflow: hidden; 
  display: flex;
  height: 100vh;
  align-items: center;
  background: #333;
  
  > div {
    margin: auto;
  }
  
  a ,
  button ,
  input {
    font: inherit;
    color: inherit;
  }

  /* &:before {
    display: block;
    content: "";
  }
  &:after {
    display: block;
    content: ""; 
  } */
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppStyled>
          <Container/>
          <GlobalStyle/>
        </AppStyled>
      </BrowserRouter>
    );
  }
}

const render = () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'));
};

store.subscribe(render);
render();

