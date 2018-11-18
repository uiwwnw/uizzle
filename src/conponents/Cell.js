import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        let color = null;
        let icon = null;
        this.down = this.down.bind(this);
        this.move = this.move.bind(this);
        this.up = this.up.bind(this);
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
        this.sto;
        this.state = {
            icon,
            color,
            class: null
        };
        this.Cell = styled.button`
            flex: 1;
            width: 10vmin;
            height: 10vmin;
            margin: 0;
            padding: 0;
            border: 1px solid #000;
            transition: .3s transform;
            /* animation: select .4s; */
            background: ${this.state.color};

            &.active {
                animation: select .3s;
            };

            &.move {
                transform: scale(1.15);
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
    down(e){
        this.setState({
            class: 'active'
        });
        clearTimeout(this.sto);
        this.sto = setTimeout(()=>{
            this.setState({
                class: null
            });
        }, 300);
        this.sx= e.clientX;
        this.sy= e.clientY;
        window.addEventListener('mousemove', this.move, false);
        window.addEventListener('mouseup', this.up, false);
    }

    move(e){
        let x = e.clientX;
        let y = e.clientY;
        let dx = -this.sx + x;
        let dy = this.sy - y;
        let ax = Math.abs(dx);
        let ay = Math.abs(dy);
        this.d;
        if(ax>=ay)this.d = dx>0?'r':'l';
        else this.d = dy>0?'u':'d';
        this.setState({
            class: 'move'
        });
        clearTimeout(this.sto);
        this.sto = setTimeout(()=>{
            this.setState({
                class: null
            });
        }, 300);
    }
    
    up() {
        this.setState({
            d: this.d
        });
        this.sto = setTimeout(()=>{
            this.setState({
                class: null
            });
        }, 300);
        window.removeEventListener('mousemove', this.move, false);
        window.removeEventListener('mouseup', this.up, false);
    }

    render() {
        
        return (
            <this.Cell 
                onMouseDown={this.down} 
                // onMouseMoveCapture={this.move}
                // onMouseUp={this.up} 
                onTouchStart={this.down} 
                // onTouchMoveCapture={this.move}
                // onTouchEnd={this.up}
                className={this.state.class} >
                <FontAwesomeIcon icon={this.state.icon} />
            </this.Cell>
        )
    }
};

Cell.defaultProps = {
    icon: PropTypes.string
};
