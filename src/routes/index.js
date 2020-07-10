import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home'
import SignIn from "./signIn";
import Profile from "./profile";
import Property from "./property";
import FormPropertyUpdate from './property/updateProperty';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/profile/:nickname" component={Profile} />
        <Route path="/property/:idProperty/update" component={FormPropertyUpdate}/>
        <Route path="/property" exact component={Property} />
      </Switch>
    </Router>
  );
};

export default Routes;
