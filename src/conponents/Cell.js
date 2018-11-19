import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        // let color = null;
        // let icon = null;
        this.down = this.down.bind(this);
        this.move = this.move.bind(this);
        this.up = this.up.bind(this);
        this.states = this.states.bind(this);
        this.sto;
        this.stateSto;
        this.state = {
            num: null,
            icon: null,
            color: null,
            class: null,
            d: null
        };
        this.Cell = styled.button`
            width: 10vmin;
            height: 10vmin;
            margin: 0;
            padding: 0;
            border: 1px solid #000;
            transition: .3s transform;
            /* animation: select .4s; */
            background: ${this.state.color};
            &:active {
                transform: scale(1.1);
            };

            &.active {
                animation: select .3s;
            };

            /* &.move { */
                /* transform: scale(1.15); */
            /* }; */

            &[data-d="u"] {
                /* transform: translateY(-10vmin); */
                animation: u .3s;
            }
            &[data-d="d"] {
                /* transform: translateY(10vmin); */
                animation: d .3s;
            }
            &[data-d="l"] {
                /* transform: translateX(-10vmin); */
                animation: l .3s;
            }
            &[data-d="r"] {
                /* transform: translateX(10vmin); */
                animation: r .3s;
            }

            svg {
                pointer-events: none;
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
                100%{
                    transform: translateY(-10vmin);
                }
            }
            @keyframes d {
                100%{
                    transform: translateY(10vmin);
                }
            }
            @keyframes l {
                100%{
                    transform: translateX(-10vmin);
                }
            }
            @keyframes r {
                100%{
                    transform: translateX(10vmin);
                }
            }
        `;
    }
    down(e){
        this.d = null;
        this.el = e.target;
        this.setState({
            class: 'active',
            d: null
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
        let vmin = window.innerWidth>=window.innerHeight?window.innerHeight:window.innerWidth;
        vmin=Math.floor(vmin/10);
        let x = e.clientX;
        let y = e.clientY;
        let dx = -this.sx + x;
        let dy = this.sy - y;
        dx = dx>vmin?vmin:dx;
        dy = dy>vmin?vmin:dy;
        dx = dx<-vmin?-vmin:dx;
        dy = dy<-vmin?-vmin:dy;
        let ax = Math.abs(dx);
        let ay = Math.abs(dy);
        if(ax > 5 || ay > 5) {
            if(ax>=ay)this.d = dx>0?'r':'l';
            else this.d = dy>0?'u':'d';
        };
        if(this.d==='r'||this.d==='l')this.el.setAttribute('style', `transform: scale(1.1) translateX(${dx}px);transition: none;`);
        else this.el.setAttribute('style', `transform: scale(1.1) translateY(${dy*-1}px);transition: none;`);
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
        if(this.d !== null) {
            this.setState({
                d: this.d
            });
            this.props.switch(this.props.x,this.props.y,this.state.icon, this.d);
        };
        this.el.removeAttribute('style');
        this.sto = setTimeout(()=>{
            this.setState({
                class: null
            });
        }, 300);
        // this.states();
        window.removeEventListener('mousemove', this.move, false);
        window.removeEventListener('mouseup', this.up, false);
    }

    states(){
        let icon;
        let color;
        let num = this.props.num;
        if(num === this.state.num) return false;
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
        this.setState({
            num,
            icon,
            color
        });
    }

    componentWillMount(){
        this.states();
    }

    componentDidUpdate() {
        this.states();
    }

    render() {
        
        return (
            <this.Cell 
                id={'i'+this.props.x+this.props.y}
                onMouseDown={this.down} 
                // onMouseMoveCapture={this.move}
                // onMouseUp={this.up} 
                onTouchStart={this.down} 
                // onTouchMoveCapture={this.move}
                // onTouchEnd={this.up}
                className={this.state.class}
                data-d={this.state.d}
            >
                <FontAwesomeIcon icon={this.state.icon} />
            </this.Cell>
        )
    }
};

Cell.defaultProps = {
    icon: PropTypes.string
};
