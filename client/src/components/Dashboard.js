import React, { useState } from "react";
import Contact from "./Contact";
import Dependent from "./Dependent";
import MedInfo from "./medInfo";

const date = Date().toLocaleString();
const Dashboard = () => {
  return (
    <div className="bg-white rounded-3 p-4 pt-0">
      <h4 className="text-secondary" style={{ textAlign: "right" }}>It is currently {date} </h4>
      <div className="row">
        <div className="col-lg-5">
          <Dependent />
        </div>
        <div className="col-lg">
          <Contact />
        </div>
        <div className="col-lg">
          <MedInfo />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
