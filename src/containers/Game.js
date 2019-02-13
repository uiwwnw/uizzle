import React, { Component } from 'react';
import axios from 'axios';
import * as Components from '../components/Components';
import styled from 'styled-components';
import '@babel/polyfill';
import store from '../redux/index';

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
        <IStyled>disabled</IStyled>
      );
    }
    //if (this.props.x === this.props.dx && this.props.y === this.props.dy) {
    //  animation = this.props.animation;
    //}
    return (
      // <components.Cell switch={this.switch.bind(this)} x={this.props.x} y={this.props.y} num={num} />
      <Components.Cell {...this.props} animation={animation} num={num}/>
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
  align-items: baseline;
`;

class Map extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let view = <Components.Loading/>;
    if (this.props.dataMap) {
      view = this.props.dataMap.map((map, mapIdx) => {
        return (
          <Coll {...this.props} dataMap={map} key={mapIdx} x={mapIdx}/>
        );
      });
    }

    return (
      <MapStyled>
        {view}
      </MapStyled>
    );
  }
}

const GameStyled = styled.section`
  display: flex;
  height: 100vh;
  align-items: center;
  user-select: none;
  
  &[disabled] {
    pointer-events: none;
    
    &:before {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: .5;
      background: #000;
      content: '';
    }
    
    &:after {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 5em;
      color: #fff;
      content: '잠시 기다려주세요';
    }
  }
  
  .level {
    position: absolute;
    right: 100%;
    top: 0;
    padding: 10px;
    border: 1px solid #000;
    background: #fff;
  }

  .score {
    position: absolute;
    left: 100%;
    top: 0;
    padding: 10px;
    border: 1px solid #000; 
    background: #fff;
  }
  
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
    
        
    &[data-icon="bomb"] {
      animation: bomb .3s forwards;
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
    
    @keyframes bomb {
      0%{
          transform: scale(1);
      }
      10%{
          transform: scale(.9) rotate(30deg);
      }
      20%{
          transform: scale(.5) rotate(-30deg);
      }
      30%{
          transform: scale(2);
      }
      40%{
          transform: scale(0) rotate(0);
      }
      50%{
          width: 10vmin;
          height: 10vmin;
      }
      100%{
          width: 0;
          height: 0;
          font-size: 0;
          border: 0;
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
    const { level } = store.getState();
    this.state = {
      level: level,
      dataMap: null,
      dx: null,
      dy: null,
      score: 0,
      goal: 1000 * level,
      animation: null,
      disabled: false,
    };
    this.sto;
    this.sto2;
    this.setDataMap = this.setDataMap.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.setScore = this.setScore.bind(this);
    // this.renderMap.apply(this);
    // console.log(dataMap);
  };

  random(min, max) {
    return Math.floor(Math.random() * max + min);
  }

  setScore(score) {
    score += this.state.score;
    this.setState({
      score,
    });
    if (this.state.goal < score) {
      clearTimeout(this.sto2);
      this.setState({
        disabled: true,
      });
      this.sto2 = setTimeout(() => {
        const nextLevel = this.state.level + 1;
        store.dispatch({
          type: 'setLevel',
          level: nextLevel,
        });
        this.props.history.push('/stage');
      }, 1500);
    }
  }

  onMove() {
    const [ x, y, i, d ] = arguments;
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
        if (dx < 0 || dy < 0 || dataMap[ dx ][ dy ] === 0 || dataMap[ dx ][ dy ] === undefined) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'd');
        dataMap[ x ].splice(y + 1, 0, start[ 0 ]);
        this.setScore(-1 * this.state.level);

        break;
      case 'd':
        dx = x;
        dy = y - 1;
        if (dx < 0 || dy < 0 || dataMap[ dx ][ dy ] === 0 || dataMap[ dx ][ dy ] === undefined) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'u');
        dataMap[ x ].splice(y - 1, 0, start[ 0 ]);
        this.setScore(-1 * this.state.level);

        break;
      case 'r':
        dx = x + 1;
        dy = y;
        if (dx < 0 || dy < 0 || dataMap[ dx ][ dy ] === 0 || dataMap[ dx ][ dy ] === undefined) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'l');
        end = dataMap[ x + 1 ].splice(y, 1);
        dataMap[ x + 1 ].splice(y, 0, start[ 0 ]);
        dataMap[ x ].splice(y, 0, end[ 0 ]);
        this.setScore(-1 * this.state.level);

        break;
      case 'l':
        dx = x - 1;
        dy = y;
        if (dx < 0 || dy < 0 || dataMap[ dx ][ dy ] === 0 || dataMap[ dx ][ dy ] === undefined) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'r');
        end = dataMap[ x - 1 ].splice(y, 1);
        dataMap[ x - 1 ].splice(y, 0, start[ 0 ]);
        dataMap[ x ].splice(y, 0, end[ 0 ]);
        this.setScore(-1 * this.state.level);

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
      animation,
    });
    this.onCheck();
    // this.forceUpdate();
    // console.log(this.state.dataMap[x]);
    //this.check(x, y, i, d);
  }

  onCheck() {
    // Todo 소스개선 및 겹치는 것 체크 못함 해결
    // Todo 사라지는 에니메이션 추가
    let switchs = false;
    let { dataMap } = this.state;
    let colSwitch = 0;
    let rowSwitch = 0;
    let rows = null;
    let newMap = dataMap.map((row, rowIndex) => {
      return row.map((col, colIndex, arr) => {
        if (col > 0) {
          if (colIndex < (dataMap[ 0 ].length - 4) && col === arr[ colIndex + 1 ] && col === arr[ colIndex + 2 ] && col === arr[ colIndex + 3 ] && col === arr[ colIndex + 4 ]) {
            colSwitch = 5;
          } else if (colIndex < (dataMap[ 0 ].length - 3) && col === arr[ colIndex + 1 ] && col === arr[ colIndex + 2 ] && col === arr[ colIndex + 3 ]) {
            colSwitch = 4;
          } else if (colIndex < (dataMap[ 0 ].length - 2) && col === arr[ colIndex + 1 ] && col === arr[ colIndex + 2 ]) {
            colSwitch = 3;
          }
          if (rowIndex < (dataMap.length - 4) && col === dataMap[ rowIndex + 1 ][ colIndex ] && col === dataMap[ rowIndex + 2 ][ colIndex ] && col === dataMap[ rowIndex + 3 ][ colIndex ] && col === dataMap[ rowIndex + 4 ][ colIndex ]) {
            rowSwitch = 5;
            rows = colIndex;
          } else if (rowIndex < (dataMap.length - 3) && col === dataMap[ rowIndex + 1 ][ colIndex ] && col === dataMap[ rowIndex + 2 ][ colIndex ] && col === dataMap[ rowIndex + 3 ][ colIndex ]) {
            rowSwitch = 4;
            rows = colIndex;
          } else if (rowIndex < (dataMap.length - 2) && col === dataMap[ rowIndex + 1 ][ colIndex ] && col === dataMap[ rowIndex + 2 ][ colIndex ]) {
            rowSwitch = 3;
            rows = colIndex;
          }
          if (colSwitch) {
            this.setScore(Math.pow(colSwitch, colSwitch));
            colSwitch--;
            return 8;
          }
          if (rowSwitch && rows === colIndex) {
            this.setScore(Math.pow(rowSwitch, rowSwitch));
            rowSwitch--;
            return 8;
          }
          return col;
        } else {
          return col;
        }
      });
    });

    clearTimeout(this.sto);
    this.sto = setTimeout(() => {
      newMap.forEach((row, idx) => {
        row.forEach((col) => {
          if (col === 8) {
            newMap[ idx ].push(this.random(1, 7));
          }
        });
      });
      newMap = newMap.map((row) => {
        return row.filter((col) => {
          if (col === 8) {
            switchs = true;
          }
          return col !== 8;
        });
      });

      //newMap = newMap.filter((row) => {
      //  return row.length !== 0;
      //});
      this.setState({
        dataMap: newMap,
      });
      //if (newMap.length < 5) {
      //  const nextLevel = this.state.level + 1;
      //  store.dispatch({
      //    type: 'setLevel',
      //    level: nextLevel,
      //  });
      //  this.props.history.push('/stage');
      //  return false;
      //}
      if (switchs) {
        this.onCheck();
      }
    }, 500);

    this.setState({
      dataMap: newMap,
    });

    if (switchs) {
      this.onCheck();
    }
  }

  //onCheck() {
  //  // Todo 소스개선 및 겹치는 것 체크 못함 해결
  //  // Todo 사라지는 에니메이션 추가
  //  let switchs = false;
  //  let { dataMap } = this.state;
  //  let colSwitch = 0;
  //  let rowSwitch = 0;
  //  let rows = null;
  //  const newMap = dataMap.map((row, rowIndex) => {
  //    return row.filter((col, colIndex, arr) => {
  //      if (col > 0) {
  //        if (colIndex < (dataMap[0].length - 4) && col === arr[colIndex + 1] && col === arr[colIndex + 2] && col === arr[colIndex + 3] && col === arr[colIndex + 4]) {
  //          colSwitch = 5;
  //        } else if (colIndex < (dataMap[0].length - 3) && col === arr[colIndex + 1] && col === arr[colIndex + 2] && col === arr[colIndex + 3]) {
  //          colSwitch = 4;
  //        } else if (colIndex < (dataMap[0].length - 2) && col === arr[colIndex + 1] && col === arr[colIndex + 2]) {
  //          colSwitch = 3;
  //        }
  //        if (rowIndex < (dataMap.length - 4) && col === dataMap[rowIndex + 1][colIndex] && col === dataMap[rowIndex + 2][colIndex] && col === dataMap[rowIndex + 3][colIndex] && col === dataMap[rowIndex + 4][colIndex]) {
  //          rowSwitch = 5;
  //          rows = colIndex;
  //        } else if (rowIndex < (dataMap.length - 3) && col === dataMap[rowIndex + 1][colIndex] && col === dataMap[rowIndex + 2][colIndex] && col === dataMap[rowIndex + 3][colIndex]) {
  //          rowSwitch = 4;
  //          rows = colIndex;
  //        } else if (rowIndex < (dataMap.length - 2) && col === dataMap[rowIndex + 1][colIndex] && col === dataMap[rowIndex + 2][colIndex]) {
  //          rowSwitch = 3;
  //          rows = colIndex;
  //        }
  //        if (colSwitch) {
  //          this.setScore(Math.pow(colSwitch, colSwitch));
  //          colSwitch--;
  //          return false;
  //        }
  //        if (rowSwitch && rows === colIndex) {
  //          this.setScore(Math.pow(rowSwitch, rowSwitch));
  //          rowSwitch--;
  //          return false;
  //        }
  //        return true;
  //      } else {
  //        return true;
  //      }
  //    });
  //  });
  //  newMap.map((row, idx)=>{
  //    while(row.length !== dataMap[idx].length) {
  //      switchs = true;
  //      row.push(this.random(1, 7));
  //    }
  //  });
  //
  //  this.setState({
  //    dataMap: newMap
  //  });
  //
  //  if(switchs) {
  //    this.onCheck();
  //  }
  //}

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

          if (collLength > 1 && rowLength < 2) {
            while (num === coll[ collLength - 1 ] && num === coll[ collLength - 2 ]) {
              num = this.random(1, 7);
            }
          } else if (rowLength > 1 && collLength < 2) {
            while (num === dataMap[ rowLength - 1 ][ collLength ] && num === dataMap[ rowLength - 2 ][ collLength ]) {
              num = this.random(1, 7);
            }
          } else if (rowLength > 1 && collLength > 1) {
            while (num === coll[ collLength - 1 ] && num === coll[ collLength - 2 ] || num === dataMap[ rowLength - 1 ][ collLength ] && num === dataMap[ rowLength - 2 ][ collLength ]) {
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
      dataMap,
    });
  }

  async componentDidMount() {
    await this.setDataMap();
    this.onCheck();
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
      <GameStyled disabled={this.state.disabled}>
        <strong className="level">레벨{this.state.level}</strong>
        <strong className="score">{this.state.score + ' / ' + this.state.goal}</strong>
        <Map {...this.state} onMove={this.onMove.bind(this)}/>
      </GameStyled>
    );
  }
}
