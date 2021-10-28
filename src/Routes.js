import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/helper/privateRoutes";
import Signin from "./containers/signin/signin";
import Signup from "./containers/signup/signup";
import Dashboard from './containers/dashboard/index';
import Home from './containers/home';
import AddCategory from "./containers/category/addCategory";
import ManageCategories from "./containers/category/manageCategories";
import UpdateCategory from "./containers/category/updateCategory";
import AddNews from "./containers/news/addNews";
import ManageNews from "./containers/news/manageNews";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/create/category" exact component={AddCategory} />
        <PrivateRoute path="/categories" exact component={ManageCategories} />
        <PrivateRoute path="/category/update/:categoryId" exact component={UpdateCategory} />
        <PrivateRoute path="/create/news" exact component={AddNews} />
        <PrivateRoute path="/newses" exact component={ManageNews} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
