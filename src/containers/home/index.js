import React from 'react';
import Dashboard from '../dashboard';
import Signin from '../signin/signin';
import Signup from '../signup/signup';
import { isAuthenticated } from '../../auth/helper';
import { Redirect } from 'react-router-dom';

const index = () => {

    const renderDashboard = () =>{
        if(isAuthenticated()){
            return <Redirect to="/dashboard" />
        }else{
            return <Redirect to="/signin" />
        }
    }

    return (
        <>
          {renderDashboard()}
        </>
    )
}

export default index;
