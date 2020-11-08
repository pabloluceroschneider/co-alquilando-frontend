import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../store';
import ContentWrapper from '../../components/ContentWrapper';
import UserCard from '../../components/Match';
import Spin from '../../components/Spin';
import ApiRequest from '../../util/ApiRequest';
import { ArrowDownOutlined } from '@ant-design/icons';

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
			asyncGet();
		},[ state.user ]);

	return (
		<ContentWrapper topNav optionsNav>
			<div className="roommates-wrapper">

				<div className="info-column">

					{!matched ? (
						<div className="no-match">
							<p>No tienes preferencias cargadas</p>
							<div>
								<p className="here">Cargalas aqui</p>
								<ArrowDownOutlined />
							</div>
						</div>
					) : null}

					<div className="edit preferences">
						<a href="my-profile/updatePreferencies">Editar Preferencias</a>
					</div>
				</div>

				<div className="match">

					{!matched && !users ? <Spin/> : null}

					{matched?.map((u, index) => {
						return <UserCard key={index} {...u} />;
					})}

					{users &&
						<div>
							{users.map((u, index) => {
								return <UserCard key={index} user={{...u}}/>;
							})} 
						</div>
					}
				</div>
			</div>
		</ContentWrapper>
	);
};

export default Match;
