import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { useAlert } from 'react-alert'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); //for reload
  //const alert = useAlert()

  //for login
  const login = (e) => {
    e.preventDefault();
    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        localStorage.setItem("token", result.token);
        alert(result.message);
        history.push("/");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login rounded-3 border border-info bg-white bg-opacity-75 bg-gradient p-5 shadow rounded">
      <div className="row justify-content-start align-items-center">
        <div className="col-6">
          <img
            src="https://i.postimg.cc/j2wskfbt/logo-sayang-sq-fullsize.png"
            className="rounded mx-auto"
            alt="sayang logo"
          />
        </div>

        {/* START OF FORM */}
        <div className="col-6">
          <h1>Login</h1>
          <small className="text-muted">
            Please log in using the same credentials when creating your account
          </small>
          <form onSubmit={login}>
            {/*  USERNAME */}
            <div className="form-floating mt-3">
              <input
                className="form-control border border-info"
                id="floatingInputValue"
                type="text"
                autoComplete="off"
                placeholder="Username..."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label for="floatingInputValue">Your Username</label>
            </div>

            {/* PASSWORD */}
            <div className="form-floating mt-3">
              <input
                className="form-control border border-info"
                id="floatingInputValue"
                type="password"
                autoComplete="off"
                placeholder="Password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label for="floatingInputValue">Password</label>
            </div>

            <div className="d-grid gap-2 col-12 mt-4">
              <button
                className="btn btn-info rounded-pill text-white"
                type="submit"
              >
                Click to Login
              </button>
            </div>
          </form>

          <p />
          <small className="text-muted">
            Don't have an account?&nbsp;
            <Link to="/register">Click to Create an Account</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
