import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import SignIn from './signIn';
import Profile from './profile/index';
import UpdateForm from './profile/updateProfile';
import Property from './property';
import PropertyList from "./propertyList";
import FormPropertyUpdate from './property/updateProperty';
import UserHome from '../routes/userHome'
import Match from '../components/Match';

const Routes = () => {
	const { user } = store.getState();
	return (
		<Provider store={store}>
			<Router>
				{user ? (
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/profile/:nickname/update" component={UpdateForm} />
						<Route path="/profile/:nickname" component={Profile} />
						<Route path="/property/:idProperty/update" component={FormPropertyUpdate} />
						<Route path="/property" exact component={Property} />
						<Route path="/property/properties" exact component={PropertyList} />
						<Route exact path="/userHome" component={UserHome} />
						<Route exact path="/match" component={Match} />
					</Switch>
				) : (
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/sign-in" exact component={SignIn} />
						<Redirect from="*" to="/"/>
					</Switch>
				)}
			</Router>
		</Provider>
	);
};

export default Routes;
