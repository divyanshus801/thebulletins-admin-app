import React from "react";
import Menu from "./Menu";


const Base = ({
    tittle="My Tittle",
    description="My description",
    className=" bg-white text-dark  ",
    children
}) => (
  <div>
    <Menu/>
    <div className="container border shadow-sm bg-body roundeds mb-4 pb-3">
      <div className="jumbotron bg-white text-dark text-center">
        <h1 className="display-8">{tittle}</h1>
        <p className="lead"> {description}</p>
      </div>
      <div className={className}>{children}</div>
      
    </div>
    
  </div>
);

export default Base;
