import React from 'react';
import MoneyPage from './view/Money'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import styled from 'styled-components';


const Nav = styled.nav`
  border:1px solid black;
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
          <Switch>
            <Route path="/money">
              <Money />
            </Route>
            <Route path="/chart">
              <Chart />
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
  return <MoneyPage />;
}

function Chart() {
  return <h2>chart</h2>;
}
function NoMach() {
  return <h2>404</h2>;
}


export default App;
