import React, { Component } from 'react';
import styled from 'styled-components';

const LoadingStyled = styled.div`
  font-size: 30px;
`;

export default class Loading extends Component {
  render() {
    return (
      <LoadingStyled>
        loading
      </LoadingStyled>
    );
  }
}
