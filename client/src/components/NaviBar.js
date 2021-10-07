import React from "react";
import { Link, useHistory } from "react-router-dom";

const NaviBar = ({ loggedIn }) => {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    alert("You have been logged out.");
    history.push("/");
    window.location.reload();
  };

  return (
    <>
      {loggedIn === true && (
      
        <nav className="container-fluid navbar fixed-top navbar-light bg-white shadow-sm">
          
          {/* Logo */}
          <Link className="nav-item nav-link" to="/">
            <img
              src="https://i.postimg.cc/sDLhJjr8/logo-sayang-space-hor.png"
              height="75"
              alt="Sayang Logo"
            ></img>
          </Link>

          <div className="nav justify-content-end">
            <a className="navbar-brand">
              <Link className="nav-item text-info nav-link" to="/dashboard">
                Dashboard
              </Link>
            </a>

            <a className="navbar-brand">
              <Link className="nav-item text-info nav-link" to="/dependent">
                Dependents
              </Link>
            </a>
            
            <a className="navbar-brand">  
              <Link className="nav-item text-info nav-link" to="/contact">
                Contact List
              </Link>
            </a>

            <a className="navbar-brand">  
              <Link className="nav-item text-info nav-link" to="/medsup">
                Medication
              </Link>
            </a>
            
            <a className="navbar-brand">
              <Link className="nav-item text-info nav-link" to="/medinfo">
              Drug Info Search
              </Link>
            </a>
            
            <a className="navbar-brand">
              <Link className="nav-item text-info nav-link btn btn-outline-warning" onClick={logout}>
                Logout
              </Link>
            </a>
          </div>
        </nav>
      
      )}
    </>
  );
};

export default NaviBar;
