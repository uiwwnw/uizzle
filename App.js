import React, { Component } from 'react';
import { render } from 'react-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from './src/containers/Container';
import { library } from '@fortawesome/fontawesome-svg-core';
//import { localDataSet } from './services/index';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHome, faSearch, faAddressBook, faVolumeUp, faWifi, faEdit } from '@fortawesome/free-solid-svg-icons';
import 'normalize.css';

library.add(faCamera, faHome, faSearch, faAddressBook, faVolumeUp, faWifi, faEdit);
const AppStyled = styled.main`
  overflow: hidden; 
  display: flex;
  height: 100vh;
  align-items: center;
  background: #fefefe;

  > div {
    margin: auto;
  }
  
  section {
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
         <Container />
        </AppStyled>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('root'));