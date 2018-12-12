import React, { Component } from 'react';
import * as Conponents from '../conponents/Conponents';
import styled from 'styled-components';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Row extends Component {
  constructor(props) {
    super(props);
    this.I = styled.i`
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
  };

  render() {
    const { dataMap: num } = this.props;
    let animation = false;
    if (num === 0) {
      return (
        <this.I>empty</this.I>
      );
    }
    if(this.props.x === this.props.dx && this.props.y === this.props.dy) {
      animation = this.props.animation;
    }
    return (
      // <Conponents.Cell switch={this.switch.bind(this)} x={this.props.x} y={this.props.y} num={num} />
      <Conponents.Cell {...this.props} animation={animation} num={num}/>
    );
  }
}

class Coll extends Component {
  constructor(props) {
    super(props);
    this.Coll = styled.div`
      display: flex;
      flex-direction: column-reverse;
    `;
  };


  render() {
    return (
      <this.Coll>
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
      </this.Coll>
    );
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.Map = styled.div`
            display: flex;
        `;
  }

  render() {
    return (
      <this.Map>
        {
          this.props.dataMap.map((map, mapIdx) => {
            return (
              <Coll {...this.props} dataMap={map} key={mapIdx} x={mapIdx} />
            );
          })
        }
      </this.Map>
    );
  }
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.Game = styled.section`
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

    this.dataBg = [
      [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 0, 1, 1, 1, 1, 1, 1, 0, 0, 0 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    ];
    this.state = {
      dataMap: this.setDataMap(),
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

  setDataMap() {
    let dataMap = [];
    for (let col of this.dataBg) {
      const coll = [];
      for (let row of col) {
        if (row !== 0) {
          coll.push(this.random(1, 7));
        } else {
          coll.push(0);
        }
      }
      dataMap.push(coll);
    }
    return dataMap;
  }

  switch() {
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
        dy = y+1;
        if(dx < 0 || dy < 0 || dataMap[dx][dy] === 0) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'd');
        dataMap[ x ].splice(y + 1, 0, start[ 0 ]);
        break;
      case 'd':
        dx = x;
        dy = y-1;
        if(dx < 0 || dy < 0 || dataMap[dx][dy] === 0) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'u');
        dataMap[ x ].splice(y - 1, 0, start[ 0 ]);
        break;
      case 'r':
        dx = x+1;
        dy = y;
        if(dx < 0 || dy < 0 || dataMap[dx][dy] === 0) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'l');
        end = dataMap[ x + 1 ].splice(y, 1);
        dataMap[ x + 1 ].splice(y, 0, start[ 0 ]);
        dataMap[ x ].splice(y, 0, end[ 0 ]);
        break;
      case 'l':
        dx = x-1;
        dy = y;
        if(dx < 0 || dy < 0 || dataMap[dx][dy] === 0) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'r');
        end = dataMap[ x - 1 ].splice(y, 1);
        dataMap[ x - 1 ].splice(y, 0, start[ 0 ]);
        dataMap[ x ].splice(y, 0, end[ 0 ]);
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

  check(){
    const [ x, y, i, d ] = arguments;
    const { dataMap } = this.state;
    let start;
    let end;
    let animation;
    let dx;
    let dy;
    switch (d) {
      case 'u':
        dx = x;
        dy = y+1;
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'd');
        animation = 'd';
        dataMap[ x ].splice(y + 1, 0, start[ 0 ]);
        break;
      case 'd':
        dx = x;
        dy = y-1;
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'u');
        animation = 'u';
        dataMap[ x ].splice(y - 1, 0, start[ 0 ]);
        break;
      case 'r':
        dx = x+1;
        dy = y;
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'l');
        animation = 'l';
        end = dataMap[ x + 1 ].splice(y, 1);
        dataMap[ x + 1 ].splice(y, 0, start[ 0 ]);
        dataMap[ x ].splice(y, 0, end[ 0 ]);
        break;
      case 'l':
        dx = x-1;
        dy = y;
        start = dataMap[ x ].splice(y, 1);
        //endEl.setAttribute('data-animation', 'r');
        animation = 'r';
        end = dataMap[ x - 1 ].splice(y, 1);
        dataMap[ x - 1 ].splice(y, 0, start[ 0 ]);
        dataMap[ x ].splice(y, 0, end[ 0 ]);
        break;
    }
  }

  // aaa(){
  //     const dataMap = this.setDataMap();
  //     this.setState({
  //         dataMap
  //     });
  // }

  componentDidMount() {
    // this.setState({
    //     dataMap: this.setDataMap()
    // });
  }

  // random (min, max) {
  //     return Math.floor(Math.random() * (max - min + 1) + min);
  // };

  render() {
    return (
      <this.Game>
        <Map {...this.state} switch={this.switch.bind(this)}/>
      </this.Game>
    )
  }
}
