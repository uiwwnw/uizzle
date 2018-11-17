import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        let color = '';
        switch (this.props.icon) {
            case 'camera':
                color = '#999';
                break;
            case 'home':
                color = '#zzz';
                break;
            case 'search':
                color = '#777';
                break;
            case 'address-book':
                color = '#aaa';
                break;
            case 'volume-up':
                color = '#e2e2e2';
                break;
            case 'wifi':
                color = '#ddd';
                break;
            case 'edit':
                color = '#eee';
                break;
        };
        this.state = {
            icon: this.props.icon,
            color
        };
        this.Cell = styled.button`
            flex: 1;
            width: 10vmin;
            height: 10vmin;
            margin: 0;
            padding: 0;
            border: 1px solid #000;
            background: ${this.state.color};

            &:active {
                /* background: ${props => props.bg === undefined ? '#efefef' : '#999'}; */
            }
        `;
    }

    render() {
        
        return (
            <this.Cell>
                <FontAwesomeIcon icon={this.state.icon} />
            </this.Cell>
        )
    }
};

Cell.defaultProps = {
    icon: PropTypes.string
};
