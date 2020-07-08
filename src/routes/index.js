import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home'
import SignIn from "./signIn";
import Profile from "./profile";
import Property from "./property";
import PropertyList from "./propertyList";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/profile/:nickname" component={Profile} />
        <Route path="/property" exact component={Property} />
        <Route path="/propertyList" exact component={PropertyList} />
      </Switch>
    </Router>
  );
};

export default Routes;
