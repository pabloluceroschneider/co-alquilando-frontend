import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './signIn'
import Property from './property/index';
import PropertyId from './property/property_id'

const Routes = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">Home</Route>
				<Route path="/sign-in" exact component={SignIn} />
				<Route path="/property/:idProperty/update" exact component={PropertyId}/>
				<Route path="/property" exact component={Property} />
			</Switch>
		</Router>
	);
};

export default Routes;
