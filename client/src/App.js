import React, { useContext, useState, useEffect } from "react";
import "./App.css";

import NaviBar from "./components/NaviBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Dependent from "./components/Dependent";
import MedSup from "./components/MedSup";
import Contact from "./components/Contact";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MedInfo from "./components/medInfo";

function App() {
  /* const date = Date().toLocaleString(); */
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = () => {
    fetch("/users/loggedIn", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        //store it locally
        //console.log(result);
        setLoggedIn(result.status);
        console.log(`check boolean: ${result.status} should be true or false`);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <div className="container">
      {/* <div className="container"> */}
      {/* <span className="nav justify-content-end">Current Time: {date}</span> */}
      <Router>
        <NaviBar loggedIn={loggedIn} />
        <Switch>
          {loggedIn === false && (
            <>
              <Route exact path="/" component={() => <Login />} />
              <Route path="/login" component={() => <Login />} />
              <Route path="/register" component={() => <Register />} />
            </>
          )}
          {loggedIn === true && (
            <>
              <Route exact path="/" component={() => <Dashboard />} />
              <Route path="/Dashboard" component={() => <Dashboard />} />
              <Route path="/Dependent" component={() => <Dependent />} />
              <Route path="/MedSup" component={() => <MedSup />} />
              <Route path="/Contact" component={() => <Contact />} />
              <Route path="/MedInfo" component={() => <MedInfo />} />
            </>
          )}
        </Switch>
      </Router>
      {/* </div> */}
    </div>
  );
}

export default App;
