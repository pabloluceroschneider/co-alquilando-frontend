import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './signIn'
import Home from './home'
import Property from './property';

const Routes = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route path="/sign-in" exact component={SignIn} />
				<Route path="/property" exact component={Property} />
			</Switch>
		</Router>
	);
};

export default Routes;
