import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './signIn'
import Profile from './profile';

const Routes = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">Home</Route>
				<Route path="/sign-in" exact component={SignIn} />
				<Route path="/profile/:nickname" exact component={Profile} />
			</Switch>
		</Router>
	);
};

export default Routes;
