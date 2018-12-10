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
    this.animation = this.animation.bind(this);
    this.animationEnd = this.animationEnd.bind(this);
    this.states = this.states.bind(this);
    this.state = {
      num: null,
      icon: null,
      animation : null
    };
    this.Cell = styled.button`
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
              transform: translateY(-10vmin);
          }
          100%{
              transform: translateY(0);
          }
      }
      @keyframes d {
          0%{
              transform: translateY(10vmin);
          }
          100%{
              transform: translateY(0);
          }
      }
      @keyframes l {
          0%{
              transform: translateX(-10vmin);
          }
          100%{
              transform: translateX(0);
          }
      }
      @keyframes r {
          0%{
              transform: translateX(10vmin);
          }
          100%{
              transform: translateX(0);
          }
      }
  `;
  }

  down(e) {
    this.d = null;
    this.el = e.target;
    this.setState({
      animation: 'select'
    });
    //this.sto = setTimeout(() => {
    //  this.setState({
    //    class: null,
    //  });
    //}, 300);
    this.sx = e.clientX;
    this.sy = e.clientY;
    window.addEventListener('mousemove', this.move, false);
    window.addEventListener('mouseup', this.up, false);
  }

  move(e) {
    let vmin = window.innerWidth >= window.innerHeight ? window.innerHeight : window.innerWidth;
    vmin = Math.floor(vmin / 10);
    let x = e.clientX;
    let y = e.clientY;
    let dx = -this.sx + x;
    let dy = this.sy - y;
    dx = dx > vmin ? vmin : dx;
    dy = dy > vmin ? vmin : dy;
    dx = dx < -vmin ? -vmin : dx;
    dy = dy < -vmin ? -vmin : dy;
    let ax = Math.abs(dx);
    let ay = Math.abs(dy);
    if (ax > 60 || ay > 60) {
      if (ax >= ay) {
        this.d = dx > 0 ? 'r' : 'l';
      } else {
        this.d = dy > 0 ? 'u' : 'd';
      }
    }
    if (this.d === 'r' || this.d === 'l') {
      this.el.setAttribute('style', `transform: scale(1.1) translateX(${dx}px);transition: none;`);
    } else {
      this.el.setAttribute('style', `transform: scale(1.1) translateY(${dy * -1}px);transition: none;`);
    }
  }

  up() {
    if (this.d !== null) {
      this.setState({
        animation: this.d,
      });
      this.props.switch(this.props.x, this.props.y, this.state.icon, this.d);
    } else {
      this.setState({
        animation: 'select'
      });
    }
    this.el.removeAttribute('style');
    //this.sto = setTimeout(() => {
    //  this.setState({
    //    class: null
    //  });
    //}, 300);
    // this.states();
    window.removeEventListener('mousemove', this.move, false);
    window.removeEventListener('mouseup', this.up, false);
  }

  animationEnd() {
    if(this.el !== undefined) {
      this.el.removeAttribute('data-animation');
      this.el.removeEventListener('animationend', this.animationEnd);
    }
  }

  animation() {
    if(this.el !== undefined) {
      this.el.addEventListener('animationend', this.animationEnd);
    }
  }

  states() {
    let icon;
    let num = this.props.num;
    if (num === this.state.num) {
      return false;
    }
    switch (this.props.num) {
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
    }
    this.setState({
      num,
      icon
    });
  }

  componentWillMount() {
    this.states();
  }

  componentDidUpdate() {
    this.states();
    this.animation();
  }

  render() {

    return (
      <this.Cell
        id={'i' + this.props.x + this.props.y}
        data-icon={this.state.icon}
        onMouseDown={this.down}
        // onMouseMoveCapture={this.move}
        // onMouseUp={this.up}
        onTouchStart={this.down}
        // onTouchMoveCapture={this.move}
        // onTouchEnd={this.up}
        data-animation={this.state.animation?this.state.animation:this.props.animation}
      >
        <FontAwesomeIcon icon={this.state.icon}/>
      </this.Cell>
    );
  }
};

Cell.defaultProps = {
  icon: PropTypes.string,
};
