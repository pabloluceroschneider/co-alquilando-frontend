import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../store';
import ContentWrapper from '../../components/ContentWrapper';
import UserCard from '../../components/Match';

import ApiRequest from '../../util/ApiRequest';

const Match = () => {
	const [ users, setUsers ] = useState(null);
	const { state } = useContext(SessionContext);

	useEffect(
		() => {
			let asyncGet = async () => {
				let { data } = await ApiRequest.get(`/user/match/${state.user.id}`);
				setUsers(data);
			};
			asyncGet();
		},
		[ state.user ]
	);

	return (
		<ContentWrapper topNav optionsNav>
			<div className="match">
				{users &&
					users.map((u, index) => {
						return <UserCard key={index} {...u} />;
					})}
			</div>
		</ContentWrapper>
	);
};

export default Match;
