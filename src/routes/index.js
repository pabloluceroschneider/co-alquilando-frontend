import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './signIn'
import Home from '../home/index'
import Menu from '../components/menu/index'
import Header from '../components/header/index'
import Footer from '../components/footer/index'

const Routes = props => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route path="/sign-in" exact component={SignIn} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default Routes;
