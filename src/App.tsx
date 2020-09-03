import React from 'react';
import MoneyPage from './view/Money'
import ChartPage from './view/Chart/Chart'
import { NumberPad as NumberPadPage } from './view/NumberPad'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";
import styled from 'styled-components';


const Nav = styled.nav`
  > ul{
    display:flex;
    justify-content:center;
    margin-bottom:0px;
    > li{
      padding:5px 10px;
      > a{
        font-size:18px;
        &.selected{
          color:#1296db
        }
      }
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
          <NavLink to="/money" activeClassName="selected">记账</NavLink>
        </li>
        <li>
          <NavLink to="/chart" activeClassName="selected">图表</NavLink>
        </li>
      </ul>
    </Nav>
    <MoneyPage />
  </>
}

function Chart() {
  return <>
    <Nav>
      <ul>
        <li>
          <NavLink to="/money" activeClassName="selected">记账</NavLink>
        </li>
        <li>
          <NavLink to="/chart" activeClassName="selected">图表</NavLink>
        </li>
      </ul>
    </Nav>
    <ChartPage />
  </>
}
function NumberPad() {
  return <NumberPadPage />
}
function NoMach() {
  return <h2>404</h2>;
}


export default App;
