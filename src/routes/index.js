import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './signIn'

const Routes = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">Home</Route>
				<Route path="/sign-in" exact component={SignIn} />
			</Switch>
		</Router>
	);
};

export default Routes;
