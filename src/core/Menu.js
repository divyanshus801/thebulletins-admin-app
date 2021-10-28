import React,{Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated, signout} from "../auth/helper/index";



const currentTab = (history, path) => {

    if(history.location.pathname === path){
        return { color: "#2ecc72"
      }
    }else{
        return {color : "grey"}
    }
}

const Menu = ({ history }) => (
  <div className="" >
    <ul className=" shadow-sm p-3 mb-5 bg-body rounded nav nav-tabs bg-white py-3 px-3">


      {/*isAuthenticated()  &&  (
        <li className="nav-item">
        <Link style={currentTab(history, "/dashboard")}
         className="nav-link" 
         to="/dashboard">
          Dashboard
        </Link>
      </li>
      )*/}
      {
        <span class="navbar-brand mb-0 h1" href="#">ADMIN PANEL</span>
      }

       {!isAuthenticated() && (
       <Fragment>
      <li className="nav-item">
        <Link style={currentTab(history, "/signup")}
         className="nav-link" to="/signup">
          Signup
        </Link>
      </li>

      <li className="nav-item">
        <Link style={currentTab(history, "/signin")}
         className="nav-link " to="/signin" >
          Signin
        </Link>
      </li>
      </Fragment>
      )}

      <li className="nav-item">
        {isAuthenticated() && (
          <Link onClick={()=> {
            console.log(history.push("/"));
            signout(() => {
              history.push("/")
            });
          }} 
          className="nav-link link-warning" 
          to="/signin">
          signout
          </Link>
        )}
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);
