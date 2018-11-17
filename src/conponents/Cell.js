import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        let color = null;
        let icon = null;
        switch (this.props.num) {
            case 1:
                icon = 'camera';
                color = '#999';
                break;
            case 2:
                icon = 'home';
                color = '#zzz';
                break;
            case 3:
                icon = 'search';
                color = '#777';
                break;
            case 4:
                icon = 'address-book';
                color = '#aaa';
                break;
            case 5:
                icon = 'volume-up';
                color = '#e2e2e2';
                break;
            case 6:
                icon = 'wifi';
                color = '#ddd';
                break;
            case 7:
                icon = 'edit';
                color = '#eee';
                break;
        };
        this.state = {
            icon,
            color
        };
        this.Cell = styled.button`
            flex: 1;
            width: 10vmin;
            height: 10vmin;
            margin: 0;
            padding: 0;
            border: 1px solid #000;
            /* transition: .3s transform; */
            /* animation: select .4s; */
            background: ${this.state.color};

            &:active {
                animation: select .3s;
                /* transform: scale(1.1); */
                /* background: ${props => props.bg === undefined ? '#efefef' : '#999'}; */
            };
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
        `;
    }

    aaa(){
        console.log(this);
    }

    render() {
        
        return (
            <this.Cell onClick={this.aaa.bind(this)}>
                <FontAwesomeIcon icon={this.state.icon} />
            </this.Cell>
        )
    }
};

Cell.defaultProps = {
    icon: PropTypes.string
};
