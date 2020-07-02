import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './signIn'
import Home from '../home/index'
import Menu from '../components/menu/index'

const Routes = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route path="/sign-in" exact component={SignIn} />
			</Switch>
		</Router>
	);
};

export default Routes;
