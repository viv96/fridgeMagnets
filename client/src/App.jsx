import React, { useState, useEffect, useContext } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Amplify from "aws-amplify";
import { COGNITO } from "./configs/aws";
import Dashboard from "./components/Dashboard/Dashboard";
import { Account } from "./components/Accounts/Accounts";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Status from "./components/Accounts/Status";
import { AccountContext } from "./components/Accounts/Accounts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Account>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Status} />
          <Route
            path="*"
            component={() => {
              return (
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    top: "10%",
                  }}
                >
                  <h2>{"404 NOT FOUND"}</h2>
                </p>
              );
            }}
          />
        </Switch>
      </Router>
    </Account>
  );
};

export default App;
