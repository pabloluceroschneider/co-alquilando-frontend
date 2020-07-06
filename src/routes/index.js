import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./signIn";
import Profile from "./profile";
import Property from "./property";
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          Home
        </Route>
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/profile/:nickname" exact component={Profile} />
        <Route path="/property" exact component={Property} />
      </Switch>
    </Router>
  );
};

export default Routes;
