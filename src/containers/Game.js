import React, { Component } from 'react';
import axios from 'axios';
import * as Components from '../components/Components';
import styled from 'styled-components';

const IStyled = styled.i`
      /* flex: 1; */
      width: 10vmin;
      height: 10vmin;
      color: #fff;
      line-height: 10vmin;
      text-align: center;
      border: 1px solid #000;
      box-sizing: border-box;
      font-style: normal;
      background: #000;
    `;
class Row extends Component {
  constructor(props) {
    super(props);

  };

  render() {
    const { dataMap: num } = this.props;
    let animation = false;
    if (num === 0) {
      return (
        <IStyled>empty</IStyled>
      );
    }
    if (this.props.x === this.props.dx && this.props.y === this.props.dy) {
      animation = this.props.animation;
    }
    return (
      // <components.Cell switch={this.switch.bind(this)} x={this.props.x} y={this.props.y} num={num} />
      <Components.Cell {...this.props} animation={animation} num={num} />
    );
  }
}
const CollStyled = styled.div`
      display: flex;
      flex-direction: column-reverse;
    `;
class Coll extends Component {
  constructor(props) {
    super(props);

  };


  render() {
    return (
      <CollStyled>
        {
          this.props.dataMap.map((coll, collIdx) => {
            return (
              <Row
                {...this.props}
                dataMap={coll}
                key={collIdx}
                y={collIdx}
              />
            );
          })
        }
      </CollStyled>
    );
  }
}
const MapStyled = styled.div`
    display: flex;
  `;
class Map extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let view = <Components.Loading />
    if(this.props.dataMap) {
      view = this.props.dataMap.map((map, mapIdx) => {
        return (
          <Coll {...this.props} dataMap={map} key={mapIdx} x={mapIdx} />
        );
      })
    }

    return (
      <MapStyled>
        {view}
      </MapStyled>
    );
  }
}

const GameStyled = styled.section`
      user-select: none;
      
      button {
        width: 10vmin;
        height: 10vmin;
        margin: 0;
        padding: 0;
        border: 1px solid #000;
        transition: .3s transform;
        /* animation: select .4s; */
        &:active {
            transform: scale(1.1);
        };
  
        &[data-animation="select"] {
            animation: select .3s;
        };
        &[data-animation="u"] {
            /* transform: translateY(-10vmin); */
            animation: u .3s;
        }
        &[data-animation="d"] {
            /* transform: translateY(10vmin); */
            animation: d .3s;
        }
        &[data-animation="l"] {
            /* transform: translateX(-10vmin); */
            animation: l .3s;
        }
        &[data-animation="r"] {
            /* transform: translateX(10vmin); */
            animation: r .3s;
        }
        
        &[data-icon="home"] {
          background: yellow;
          
          svg {
            color: black;
          }
        }
        
        &[data-icon="wifi"] {
          background: green;
        }
    
        &[data-icon="address-book"] {
          background: blue;
        }
    
        &[data-icon="camera"] {
          background: orange;
        }
        
        &[data-icon="search"] {
          background: gray;
        }    
         
        &[data-icon="edit"] {
          background: white;
          
          svg {
            color: black;
          }
        }  
        
        &[data-icon="volume-up"] {
          background: red;
        }
    
        svg {
          pointer-events: none;
          color: #fff;
        }
        
        @keyframes select {
            0%{
                transform: scale(0);
            }
            10%{
                transform: scale(.9);
            }
            50%{
                transform: scale(1.1) rotate(30deg);
            }
            80%{
                transform: scale(1.1) rotate(-30deg);
            }
            100%{
                transform: scale(1) rotate(0);
            }
        }
        
        @keyframes u {
            0%{
                transform: translateY(10vmin);
            }
            100%{
                transform: translateY(0);
            }
        }
        @keyframes d {
            0%{
                transform: translateY(-10vmin);
            }
            100%{
                transform: translateY(0);
            }
        }
        @keyframes l {
            0%{
                transform: translateX(10vmin);
            }
            100%{
                transform: translateX(0);
            }
        }
        @keyframes r {
            0%{
                transform: translateX(-10vmin);
            }
            100%{
                transform: translateX(0);
            }
        }
      }
    `;

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      dataMap: null,
      dx: null,
      dy: null,
      animation: null
    };
    this.setDataMap = this.setDataMap.bind(this);
    // this.renderMap.apply(this);
    // console.log(dataMap);
  };

  random(min, max) {
    return Math.floor(Math.random() * max + min);
  }


  switch() {
    const [x, y, i, d] = arguments;
    const { dataMap } = this.state;
    let start;
    let end;
    let animation = d;
    let dx;
    let dy;
    switch (animation) {
      case 'u':
        dx = x;
        dy = y + 1;
        if (dx < 0 || dy < 0 || dataMap[dx][dy] === 0) {
          return false;
        }
        start = dataMap[x].splice(y, 1);
        //endEl.setAttribute('data-animation', 'd');
        dataMap[x].splice(y + 1, 0, start[0]);
        break;
      case 'd':
        dx = x;
        dy = y - 1;
        if (dx < 0 || dy < 0 || dataMap[dx][dy] === 0) {
          return false;
        }
        start = dataMap[x].splice(y, 1);
        //endEl.setAttribute('data-animation', 'u');
        dataMap[x].splice(y - 1, 0, start[0]);
        break;
      case 'r':
        dx = x + 1;
        dy = y;
        if (dx < 0 || dy < 0 || dataMap[dx][dy] === 0) {
          return false;
        }
        start = dataMap[x].splice(y, 1);
        //endEl.setAttribute('data-animation', 'l');
        end = dataMap[x + 1].splice(y, 1);
        dataMap[x + 1].splice(y, 0, start[0]);
        dataMap[x].splice(y, 0, end[0]);
        break;
      case 'l':
        dx = x - 1;
        dy = y;
        if (dx < 0 || dy < 0 || dataMap[dx][dy] === 0) {
          return false;
        }
        start = dataMap[x].splice(y, 1);
        //endEl.setAttribute('data-animation', 'r');
        end = dataMap[x - 1].splice(y, 1);
        dataMap[x - 1].splice(y, 0, start[0]);
        dataMap[x].splice(y, 0, end[0]);
        break;
      case null:
        dx = this.state.dx;
        dy = this.state.dy;
        break;
    }
    // startEl.setAttribute('id', endId);
    // endEl.setAttribute('id', startId);

    this.setState({
      dataMap,
      dx,
      dy,
      animation
    });
    // this.forceUpdate();
    // console.log(this.state.dataMap[x]);
    //this.check(x, y, i, d);
  }

  check() {
    const [x, y, i, d] = arguments;
    const { dataMap } = this.state;
    let start;
    let end;
    let animation;
    let dx;
    let dy;
    switch (d) {
      case 'u':
        dx = x;
        dy = y + 1;
        start = dataMap[x].splice(y, 1);
        //endEl.setAttribute('data-animation', 'd');
        animation = 'd';
        dataMap[x].splice(y + 1, 0, start[0]);
        break;
      case 'd':
        dx = x;
        dy = y - 1;
        start = dataMap[x].splice(y, 1);
        //endEl.setAttribute('data-animation', 'u');
        animation = 'u';
        dataMap[x].splice(y - 1, 0, start[0]);
        break;
      case 'r':
        dx = x + 1;
        dy = y;
        start = dataMap[x].splice(y, 1);
        //endEl.setAttribute('data-animation', 'l');
        animation = 'l';
        end = dataMap[x + 1].splice(y, 1);
        dataMap[x + 1].splice(y, 0, start[0]);
        dataMap[x].splice(y, 0, end[0]);
        break;
      case 'l':
        dx = x - 1;
        dy = y;
        start = dataMap[x].splice(y, 1);
        //endEl.setAttribute('data-animation', 'r');
        animation = 'r';
        end = dataMap[x - 1].splice(y, 1);
        dataMap[x - 1].splice(y, 0, start[0]);
        dataMap[x].splice(y, 0, end[0]);
        break;
    }
  }

  // aaa(){
  //     const dataMap = this.setDataMap();
  //     this.setState({
  //         dataMap
  //     });
  // }

  async setDataMap() {
    let dataMap = [];
    const dataBg = await axios(`//localhost:3000/bg${this.state.level}`);
    for (let col of dataBg.data) {
      const coll = [];
      for (let row of col) {
        if (row !== 0) {
          let num = this.random(1, 7);
          const collLength = coll.length;
          const rowLength = dataMap.length;
        
          if(collLength > 1 && rowLength < 2) {
            while(num === coll[collLength-1] && num === coll[collLength-2]) {
              num = this.random(1, 7);
            }
          } else if (rowLength > 1 && collLength < 2){
            while(num === dataMap[rowLength-1][collLength] && num === dataMap[rowLength-2][collLength]) {
              num = this.random(1, 7);
            }
          } else if (rowLength > 1 && collLength > 1){
            while(num === coll[collLength-1] && num === coll[collLength-2] || num === dataMap[rowLength-1][collLength] && num === dataMap[rowLength-2][collLength]) {
              num = this.random(1, 7);
            }
          }
          // while(condition) {
          //   num = this.random(1, 7);
          // }
          coll.push(num);
        } else {
          coll.push(0);
        }
      }
      dataMap.push(coll);
    }
    this.setState({
      dataMap
    });
  }

  componentDidMount() {
    this.setDataMap();
    // setTimeout(() => {
    //   this.setState({
    //     level:2
    //   });
    //   this.setDataMap();
    // }, 3000);
  }

  // random (min, max) {
  //     return Math.floor(Math.random() * (max - min + 1) + min);
  // };

  render() {
    return (
      <GameStyled>
        <Map {...this.state} switch={this.switch.bind(this)} />
      </GameStyled>
    )
  }
}
