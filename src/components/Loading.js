import React, { Component } from 'react';
import styled from 'styled-components';

const LoadingStyled = styled.div`
font-size: 30px;
`;

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoadingStyled>
                loading
            </LoadingStyled>
        )
    }
}
