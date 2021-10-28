import React, { useState } from "react";
import Base from "../../core/Base";

import { Link, Redirect } from "react-router-dom";
import {signin, isAuthenticated, authenticate} from "../../auth/helper";

const Signin = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const {email, password, error, loading, didRedirect} = values;

  const {user} = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values,error: false, loading: true})
    signin({email, password})
    .then(data => {
      if(data.error){
        setValues({...values,error: data.error, loading: false})
      }
      else{
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,

          })
        })
      }
    })
    .catch(console.log("signin request failed"))
  }

  const performRedirect = () => {
    if(didRedirect){
      
        return <Redirect to="/dashboard" />
      
    }
    if(isAuthenticated()){
      return <Redirect to="/" />;
    }
  }

  const loadingMessage = () => {
   return(
     loading && (
       <div className="alert alert-info">
        <h2>Loading...</h2>
       </div>
     )
   )
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };


  const signInForm = () => {
    return (
      <div className="row mt-3 pt-4 ">
        <div className="col-4 my-3">
<img src="signin.svg" className="img-fluid" />
        </div>
        <div className="col-8">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
          
            <div className="form-group py-1">
              <label className="text-dark">Email</label>
              <input 
              onChange={handleChange("email")}
              value={email} 
              className="form-control" 
              type="email" />
            </div>

            <div className="form-group py-3">
              <label className="text-dark">Password</label>
              <input 
              onChange={handleChange("password")}
              value={password} 
              className="form-control" 
              type="password" />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block form-control">Submit</button>
          </form>
        </div>
        </div>
      </div>
    );
  };

  return (
    <Base tittle="Signin Page" description="A page for user to signin!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
