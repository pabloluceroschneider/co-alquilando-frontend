import React, { useReducer } from 'react';
import { SessionContext, reducer, initialState } from '../store'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import useServiceWorker from '../util/useServiceWorker';
import Home from './home';
import SignIn from './signIn';
import Profile from './profile/index';
import MyProfile from './profile/myProfile';
import UpdateForm from './profile/updateProfile';
import Property from './property';
import PropertyDetail from './property-detail';
import UpdatePreferenciesForm from './profile/updatePreferenciesProfile';
import PropertyList from "./propertyList";
import MyProperties from "./my-properties";
import Roommates from "./roommates";
import Notifications from "./notifications";
import FormPropertyUpdate from './property/updateProperty';
import UserHome from '../routes/userHome';
import Groups from './groups';

const Routes = () => {
	useServiceWorker();
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
						<Route path="/profile/:nickname" component={Profile} />
						<Route path="/property/:idProperty/update" component={FormPropertyUpdate} />
						<Route path="/property/:idProperty" component={PropertyDetail} />
						<Route path="/property" exact component={Property} />
						<Route path="/properties" exact component={PropertyList} />
						<Route path="/my-properties" exact component={MyProperties} />
						<Route path="/roommates" exact component={Roommates} />
						<Route path="/groups/:group/chat/:chat/:name" component={Groups} />
						<Route path="/groups/:group" component={Groups} />
						<Route path="/groups" exact component={Groups} />
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
