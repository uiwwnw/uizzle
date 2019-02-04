import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const ButtonStyled = styled.button`
  display: block;
  margin: auto;
  text-align: center;
  font-size: 1.6rem;
  color: ${props => props.bg === undefined ? '#000' : '#fff'};
  transition: .3s background;
  background: ${props => props.bg === undefined ? '#fff' : '#000'};

  &:active {
    background: ${props => props.bg === undefined ? '#efefef' : '#999'};
  }
`;
export default class Button extends Component {
  render() {
    const text = this.props.text;

    return (
      <ButtonStyled bg={this.props.bg} to={this.props.to}>
        {text}
      </ButtonStyled>
    )
  }
}

Button.defaultProps = {
  text: PropTypes.string,
  to: PropTypes.string
};
