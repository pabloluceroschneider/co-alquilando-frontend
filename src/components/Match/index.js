import React, { useState, useEffect } from 'react';
import { Card, Avatar } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import ApiRequest from '../../util/ApiRequest';

const { Meta } = Card;

const Description = ({desc}) => {
	return (
		<div>
			<div>{desc}</div>
		</div>
	)
}

const Name = ({name}) => {
	return (
		<div className="match name">
			<span>{name}</span>
		</div>
	)
}

const UserCard = ({ userPhoto, userNickname, userName, userSurname, userDescription }) => {
	const ViewProfile = ({title}) => { return <a href={`profile/${userNickname}`} rel="noopener noreferrer">{title}</a>}
	return (
		<Card
            className="userCard"
			actions={[
				<MessageOutlined key="message" />,
				<ViewProfile title={"Ver Perfil"} />
			]}
		>
			<Meta
				avatar={<Avatar src={userPhoto} style={{backgroundColor:"#AED6F1", color:"#154360"}}> {!userPhoto && userName[0].toUpperCase() } </Avatar>}
				title={<Name name={userName+" "+userSurname} />}
				description={<Description desc={userDescription} coincidence />}
			/>
		</Card>
	);
};

const Match = () => {
	const { preferences } = useState(localStorage.getItem('user'));
	const [ users, setUsers ] = useState(null);

	useEffect(() => {
		let asyncGet = async () => {
			let { data } = await ApiRequest.get('/user/users', preferences);
			setUsers(data);
		};
		asyncGet();
	}, [preferences]);

	return (
		<div className="match">
			{users &&
				users.map((u) => {
					return <UserCard key={u.id} {...u} />;
				})}
		</div>
	);
};

export default Match;
