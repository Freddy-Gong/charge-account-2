import React from 'react';
import MoneyPage from './view/Money'
import ChartPage from './view/Chart/Chart'
import { NumberPad as NumberPadPage } from './view/NumberPad'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import styled from 'styled-components';


const Nav = styled.nav`
  > ul{
    display:flex;
    justify-content:center;
    > li{
      padding:5px 10px;
    }
  }
  
`

function App() {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/money">
              <Money />
            </Route>
            <Route path="/chart">
              <Chart />
            </Route>
            <Route path="/number">
              <NumberPad />
            </Route>
            <Redirect from="/" to="/money" />
            <Route path="*">
              <NoMach />
            </Route>
          </Switch>
        </div>
      </Router>

    </>
  );
}
function Money() {

  return <>
    <Nav>
      <ul>
        <li>
          <Link to="/money">记账</Link>
        </li>
        <li>
          <Link to="/chart">图表</Link>
        </li>
      </ul>
    </Nav>
    <MoneyPage />;
  </>
}

function Chart() {
  return <>
    <Nav>
      <ul>
        <li>
          <Link to="/money">记账</Link>
        </li>
        <li>
          <Link to="/chart">图表</Link>
        </li>
      </ul>
    </Nav>
    <ChartPage />;
  </>
}
function NumberPad() {
  return <NumberPadPage />
}
function NoMach() {
  return <h2>404</h2>;
}


export default App;
