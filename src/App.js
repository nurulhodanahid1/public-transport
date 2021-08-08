import './App.css';
import Home from './components/Home/Home';
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './Login/Login';
import Menu from './components/Menu/Menu';
import Destination from './components/Home/Destination/Destination';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [verifiedUser, setVerifiedUser] = useState({});
  return (
    <UserContext.Provider value={[verifiedUser, setVerifiedUser]}>
        <Router>
          <Menu></Menu>
          <p>email: {verifiedUser.email}</p>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/destination">
              <Destination></Destination>
            </PrivateRoute>

            <Route exact path="/">
              <Home></Home>
            </Route>
          </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
