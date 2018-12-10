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
    if (num === 0) {
      return (
        <this.I>empty</this.I>
      );
    }
    return (
      // <Conponents.Cell switch={this.switch.bind(this)} x={this.props.x} y={this.props.y} num={num} />
      <Conponents.Cell switch={this.props.switch} x={this.props.x} y={this.props.y} num={num}/>
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
              <Row dataMap={coll} key={collIdx} y={collIdx} x={this.props.x} switch={this.props.switch}/>
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
              <Coll dataMap={map} key={mapIdx} x={mapIdx} switch={this.props.switch}/>
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
    };
    this.setDataMap = this.setDataMap.bind(this);
    // this.renderMap.apply(this);
    // console.log(dataMap);
  };

  random() {
    return Math.floor(Math.random() * 7 + 1);
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
    // console.log(this.state.dataMap[x], x);
    let start;
    // const startId = 'i'+x+String(y);
    // const startEl = document.getElementById(startId);
    let end;
    let endEl;
    let endId;
    switch (d) {
      case 'u':
        endId = 'i' + x + Number(y + 1);
        endEl = document.getElementById(endId);
        if (endEl === null) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        endEl.setAttribute('data-animation', 'd');
        dataMap[ x ].splice(y + 1, 0, start[ 0 ]);
        break;
      case 'd':
        endId = 'i' + x + Number(y - 1);
        endEl = document.getElementById(endId);
        if (endEl === null) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        endEl.setAttribute('data-animation', 'u');
        dataMap[ x ].splice(y - 1, 0, start[ 0 ]);
        break;
      case 'r':
        endId = 'i' + Number(x + 1) + String(y);
        endEl = document.getElementById(endId);
        if (endEl === null) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        endEl.setAttribute('data-animation', 'l');
        end = dataMap[ x + 1 ].splice(y, 1);
        dataMap[ x + 1 ].splice(y, 0, start[ 0 ]);
        dataMap[ x ].splice(y, 0, end[ 0 ]);
        break;
      case 'l':
        endId = 'i' + Number(x - 1) + String(y);
        endEl = document.getElementById(endId);
        if (endEl === null) {
          return false;
        }
        start = dataMap[ x ].splice(y, 1);
        endEl.setAttribute('data-animation', 'r');
        end = dataMap[ x - 1 ].splice(y, 1);
        dataMap[ x - 1 ].splice(y, 0, start[ 0 ]);
        dataMap[ x ].splice(y, 0, end[ 0 ]);
        break;
    }
    // startEl.setAttribute('id', endId);
    // endEl.setAttribute('id', startId);
    this.setState({
      dataMap,
    });
    // this.forceUpdate();
    // console.log(this.state.dataMap[x]);
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
        <Map dataMap={this.state.dataMap} switch={this.switch.bind(this)}/>
      </this.Game>
    )
  }
}
