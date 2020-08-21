import React, { useReducer } from 'react';
import { SessionContext, reducer, initialState } from '../store'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import SignIn from './signIn';
import Profile from './profile/index';
import MyProfile from './profile/myProfile';
import UpdateForm from './profile/updateProfile';
import Property from './property';
import UpdatePreferenciesForm from './profile/updatePreferenciesProfile';
import PropertyList from "./propertyList";
import MyProperties from "./my-properties";
import Roommates from "./roommates";
import Notifications from "./notifications";
import FormPropertyUpdate from './property/updateProperty';
import UserHome from '../routes/userHome';

const Routes = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<SessionContext.Provider value={ {state, dispatch} }>
			<Router>
				{state.user ? (
					<Switch>
						<Route exact path="/" component={UserHome} />
						<Route path="/my-profile/updatePreferencies" exact component={UpdatePreferenciesForm} />
						<Route path="/my-profile/update" exact component={UpdateForm} />
						<Route path="/my-profile" exact component={MyProfile} />
						<Route path="/profile/:nickname" exact component={Profile} />
						<Route path="/property/:idProperty/update" component={FormPropertyUpdate} />
						<Route path="/property" exact component={Property} />
						<Route path="/properties" exact component={PropertyList} />
						<Route path="/my-properties" exact component={MyProperties} />
						<Route path="/roommates" exact component={Roommates} />
						<Route path="/notifications" exact component={Notifications} />
						<Redirect from="*" to="/"/>
					</Switch>
				) : (
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/sign-in" exact component={SignIn} />
						<Redirect from="*" to="/"/>
					</Switch>
				)}
			</Router>
		</SessionContext.Provider>
	);
};

export default Routes;
