import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../store';
import ContentWrapper from '../../components/ContentWrapper';
import UserCard from '../../components/Match';
import Spin from '../../components/Spin';
import ApiRequest from '../../util/ApiRequest';

const Match = () => {
	const [ matched, setMatched ] = useState(null);
	const [ users, setUsers ] = useState(null);
	const { state } = useContext(SessionContext);

	useEffect(() => {
			let asyncGet = async () => {
				try {
					let { data } = await ApiRequest.get(`/user/match/${state.user.id}`);
					setMatched(data);
				} catch (error) {
					let params = { userId : state.user.id }
					let { data } = await ApiRequest.getQuery(`/user/users`, params);
					setUsers(data);
				}
			};
			setTimeout(()=>{
				asyncGet();
			},1000)
		},[ state.user ]);

	return (
		<ContentWrapper topNav optionsNav>
			<div className="match">

				{!matched && !users ? <Spin/> : null}

				{matched?.map((u, index) => {
						return <UserCard key={index} {...u} />;
				})}

				{users &&
					<div>
						No hemos encontrado coincidencias para ti. Carga tus preferencias <a href="/my-profile/updatePreferencies">aqui</a>
						{users.map((u, index) => {
							return <UserCard key={index} user={{...u}}/>;
						})} 
					</div>
				}
			</div>
		</ContentWrapper>
	);
};

export default Match;
