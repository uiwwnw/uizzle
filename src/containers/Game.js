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

    // switch(){
    //     const xyid = {
    //         x: this.props.x,
    //         y: this.props.y,
    //         i: this.props.dataMap,
    //         d: arguments[0]
    //     };
    //     this.props.switch(xyid);
    // }

    render() {
        const {dataMap:num} = this.props;
        if (num === 0) {
            return (
                <this.I>empty</this.I>
            )            
        }
        return (
            // <Conponents.Cell switch={this.switch.bind(this)} x={this.props.x} y={this.props.y} num={num} />
            <Conponents.Cell switch={this.props.switch} x={this.props.x} y={this.props.y} num={num} />
        )
    }
};
class Coll extends Component {
    constructor(props) {
        super(props);
        this.Coll = styled.div`
            display: flex;
            flex-direction: column-reverse;
        `;
    };
   

    render() {
        let row = this.props.dataMap.map((coll, collIdx) => {
            return (
                <Row dataMap={coll} key={collIdx} y={collIdx} x={this.props.x} switch={this.props.switch} />
            )
        })
        return (
            <this.Coll>
                {row}
            </this.Coll>
        )
    }
};
class Map extends Component {
    constructor(props){
        super(props);
        this.Map = styled.div`
            display: flex;
        `;
    }
    render() {
        let coll = this.props.dataMap.map((map, mapIdx) => {
            return (
                <Coll dataMap={map} key={mapIdx} x={mapIdx} switch={this.props.switch} />
            )
        });
        return (
            <this.Map>
                {coll}
            </this.Map>
        )
    }
};

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.Game = styled.section`
            user-select: none;
        `;

        this.state = {
            dataBg: [
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            dataMap: []
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
        const {dataBg} = this.state;
        for (let col of dataBg) {
            const coll = [];
            for (let row of col) {
                if (row !== 0) {
                    coll.push(this.random(1, 7));
                } else {
                    coll.push(0);
                }
            }
            dataMap.push(coll);
        };
        return dataMap;
    }

    switch() {
        const [x, y, i, d] = arguments;
        const {dataMap} = this.state;
        // console.log(this.state.dataMap[x], x);
        let start;
        let end;
        let el;
        switch(d) {
            case 'u':
                start = dataMap[x].splice(y, 1);
                el = document.getElementById('i'+x+Number(y + 1));
                el.setAttribute('data-d','d');
                dataMap[x].splice(y+1, 0, start[0]);
                break;
            case 'd':
                start = dataMap[x].splice(y, 1);
                el = document.getElementById('i'+x+Number(y - 1));
                el.setAttribute('data-d','u');
                dataMap[x].splice(y, 0, start[0]);
                break;
            case 'r':
                start = dataMap[x].splice(y, 1);
                el = document.getElementById('i'+Number(x+1)+String(y));
                el.setAttribute('data-d', 'l');
                end = dataMap[x+1].splice(y, 1);
                dataMap[x+1].splice(y, 0, start[0]);
                dataMap[x].splice(y, 0, end[0]);
                break;
            case 'l':
                start = dataMap[x].splice(y, 1);
                el = document.getElementById('i'+Number(x-1)+String(y));
                el.setAttribute('data-d', 'r');
                end = dataMap[x-1].splice(y, 1);
                dataMap[x-1].splice(y, 0, start[0]);
                dataMap[x].splice(y, 0, end[0]);
                break;
        };
        
        this.setState({
            dataMap
        });
        // console.log(this.state.dataMap[x]);
    }

    // aaa(){
    //     const dataMap = this.setDataMap();
    //     this.setState({
    //         dataMap
    //     });
    // }

    componentDidMount(){
        this.setState({
            dataMap: this.setDataMap()
        });
    }
    // random (min, max) {
    //     return Math.floor(Math.random() * (max - min + 1) + min);
    // };

    render() {
        let map = <Map dataMap={this.state.dataMap} switch={this.switch.bind(this)} />;
        return (
            <this.Game>
                {map}
            </this.Game>
        )
    }
}
