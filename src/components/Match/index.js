import React, { useState, useEffect } from 'react';
import { Card, Avatar } from 'antd';
import { MessageOutlined, SettingOutlined } from '@ant-design/icons';
import ApiRequest from '../../util/ApiRequest';

const { Meta } = Card;

const UserCard = props => {
    const [ user ] = useState(props)
    const { userPhoto, userName, userSurname, userDescription } = user;
	return (
		<Card
            className="userCard"
			actions={[
				<SettingOutlined key="setting" />,
				<MessageOutlined key="message" />
			]}
		>
				<Meta
					avatar={<Avatar src={userPhoto}> {!userPhoto && userName[0].toUpperCase() } </Avatar>}
					title={userName+" "+userSurname}
					description={userDescription +" "+"Coincidencia 79%"}
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
