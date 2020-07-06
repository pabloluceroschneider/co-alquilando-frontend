import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './signIn'
import Home from './home'
// import Header from '../components/header/index'
// import Footer from '../components/footer/index'
import Footer from '../containers/Footer';
import Header from '../containers/Header';
import Property from './property';

const Routes = props => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route path="/sign-in" exact component={SignIn} />
				<Route path="/property" exact component={Property} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default Routes;
