import React, { Component } from "react";
import "./App.css";
import Signup from "./components/signUp/Signup";
import Signin from "./components/SignIn/Signin";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={Home}></Route>
          </Router>
      </div>
    );
  }
}

// vô hiệu hóa :exact

