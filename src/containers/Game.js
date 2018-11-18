import React, { Component } from 'react';
import * as Conponents from '../conponents/Conponents';
import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Row extends Component {
    constructor(props) {
        super(props);
        this.I = styled.i`
            flex: 1;
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
        const {dataMap:num} = this.props;
        if (num === 0) {
            return (
                <this.I>empty</this.I>
            )            
        }
        return (
            <Conponents.Cell num={num} />
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
        return (
            <this.Coll>
                {
                    this.props.dataMap.map((coll, collIdx) => {
                        return (
                            <Row dataMap={coll} key={collIdx} />
                        )
                    })
                }
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
        return (
            <this.Map>
                {
                    this.props.dataMap.map((map, mapIdx) => {
                        return (
                            <Coll dataMap={map} key={mapIdx} />
                        )
                    })
                }
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
        const dataBg = [
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
        ];
        this.state = {
            dataBg
        };
        const dataMap = this.setDataMap.apply(this);
        this.state = {
            dataMap
        };
        // this.renderMap.apply(this);
        // console.log(dataMap);
    };
    setDataMap() {
        let dataMap = [];
        const dataBg = this.state.dataBg;
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
    // random (min, max) {
    //     return Math.floor(Math.random() * (max - min + 1) + min);
    // };
    random() {
        return Math.floor(Math.random() * 7 + 1);
    };

    render() {
        return (
            <this.Game>
                <Map dataMap={this.state.dataMap} />
            </this.Game>
        )
    }
}
