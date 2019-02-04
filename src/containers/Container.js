import React from "react";
import styled from "styled-components";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Game from "./Game";
import Start from "./Start";

function Container({ location }) {
  return (
    <Wrapper>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={{ enter: 3000, exit: 3000 }}
          classNames={'fade'}
        >
          <section className="route-section">
            <Switch location={location}>
              <Route exact path="/" component={Start} />
              <Route path="/Game" component={Game} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  div.transition-group {
    position: relative;
  }
  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

export default withRouter(Container);