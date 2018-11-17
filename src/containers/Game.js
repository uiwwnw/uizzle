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
            border: 1px solid #000;
            box-sizing: border-box;
        `;
    };

    render() {
        const {dataMap:icon} = this.props;
        if (icon === 0) {
            return (
                <this.I>empty</this.I>
            )            
        }
        return (
            <Conponents.Cell icon={icon} />
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
                    this.props.dataMap.map((coll, collIdx) => {
                        return (
                            <Coll dataMap={coll} key={collIdx} />
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
        const num = Math.floor(Math.random() * 7 + 1);
        // console.log(num)
        let icon = '';
        switch (num) {
            case 1:
                icon = 'camera';
                break;
            case 2:
                icon = 'home';
                break;
            case 3:
                icon = 'search';
                break;
            case 4:
                icon = 'address-book';
                break;
            case 5:
                icon = 'volume-up';
                break;
            case 6:
                icon = 'wifi';
                break;
            case 7:
                icon = 'edit';
                break;
        };

        return icon;
    };

    render() {
        return (
            <this.Game>
                <Map dataMap={this.state.dataMap} />
            </this.Game>
        )
    }
}
