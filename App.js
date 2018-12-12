import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Containers from './src/containers/Containers';
// import Game from './src/containers/Game';
// import Start from './src/containers/Start';
import { library } from '@fortawesome/fontawesome-svg-core';
//import { localDataSet } from './services/index';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHome, faSearch, faAddressBook, faVolumeUp, faWifi, faEdit } from '@fortawesome/free-solid-svg-icons';
import 'normalize.css';

library.add(faCamera, faHome, faSearch, faAddressBook, faVolumeUp, faWifi, faEdit);

class App extends Component {
  constructor(props) {
    super(props);
    this.App = styled.main`
      overflow: hidden; 
      display: flex;
      height: 100vh;
      align-items: center;
      background: #fefefe;
      
      > section {
        width: 100vmin;
        height: 100vmin;
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
  }

  // componentDidMount(){
  //     this.setState({
  //         'a': 'dsadd'
  //     });
  // }

  render() {
    return (
      <BrowserRouter>
        <this.App>
          {/* <Containers.Start/> */}
          {/* <Components.Header /> */}
          <Route exact path="/" component={Containers.Start}/>
          {/* <Route exact path="/" component={Start}/> */}
          {/* <Switch> */}
          <Route path="/game" component={Containers.Game}/>
          {/* <Route path="/game" component={Game}/> */}
          {/* <Route path="/login/" component={Containers.Login} /> */}
          {/* {
           pages.forEach((name)=>{
           const path= '/'+name.toLowerCase()+'/';
           // console.log(path)
           return(
           <Route path={path} component={Containers[name]} />
           )
           })
           // Object.keys(Containers).map((name)=>{
           //     console.log(name);
           //     return(
           //         <Route path={`/${name.toUpperCase()}/`} component={name} />
           //     )
           // })
           } */}
          {/* <Route path="/login" component={Containers.Login}/>
           <Route path="/join" component={Containers.Join}/>
           <Route path="/mypage" component={Containers.Mypage}/> */}
          {/* </Switch> */}
          {/* <Components.Footer /> */}
        </this.App>
      </BrowserRouter>
    );
  }
}

render(<App/>, document.getElementById('root'));