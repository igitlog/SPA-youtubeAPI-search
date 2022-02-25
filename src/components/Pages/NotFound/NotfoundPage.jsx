import React from "react";
import { NavLink } from "react-router-dom";

const NotfoundPage = () => {
  return (
    <div>
      <h1 style={{ padding: "20vh 50px", fontSize: "24px" }}>
        Once upon a time there lived a wanderer seeking adventure and in memory
        of him this page has been created, click
        <NavLink to="/"> HERE</NavLink>, to honor his memory and go to home
      </h1>
    </div>
  );
};

export default NotfoundPage;
