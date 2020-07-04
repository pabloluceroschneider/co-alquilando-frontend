import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './signIn'
<<<<<<< HEAD
import Home from '../home/index'
import Menu from '../components/menu/index'
import Header from '../components/header/index'
import Footer from '../components/footer/index'
=======
import Property from './property';
>>>>>>> eb4eba03f5c7aa5d4814477e910211a4e2bf7df1

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
