import React from "react";
import { Provider } from 'react-redux';
import store from '../store'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home";
import SignIn from "./signIn";
import Profile from "./profile/index";
import UpdateForm from "./profile/updateProfile";
import Property from "./property";
import FormPropertyUpdate from './property/updateProperty';
import Match from "../components/Match";

const Routes = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/profile/:nickname/update" component={UpdateForm} />
          <Route path="/profile/:nickname" component={Profile} />
          <Route path="/property/:idProperty/update" component={FormPropertyUpdate}/>
          <Route path="/property" exact component={Property} />
          <Route path="/match" exact component={Match} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Routes;
