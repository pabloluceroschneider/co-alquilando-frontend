import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../store'
import { Card, Avatar, Tag } from 'antd';
import { MessageOutlined} from '@ant-design/icons';
import ApiRequest from '../../util/ApiRequest';

const { Meta } = Card;

const handleTagCoincidence = coincidence => {
	if(coincidence >= 90){
		return "gold"
	}
	if(coincidence >= 50){
		return "blue"
	}
}

const Description = ({desc}) => {
	return (
		<div>
			<div>{desc}</div>
		</div>
	)
}

const Name = ({name, coincidence}) => {
	return (
		<div className="name">
			<p>{name}</p>
			<Tag color={handleTagCoincidence(coincidence)}>{parseFloat(coincidence).toFixed(2)} %</Tag>
		</div>
	)
}

const UserCard = ({ user, coincidence }) => {
	const { userPhoto, userNickname, userName, userSurname, userDescription } = user;
	const { photoId } = userPhoto;
	const ViewProfile = ({title}) => { return <a href={`profile/${userNickname}`} rel="noopener noreferrer">{title}</a>}
	return (
		<Card
            className="userCard"
			actions={[
				<MessageOutlined key="message" />,
				<ViewProfile key="viewProfile" title={"Ver Perfil"} />
			]}
		>
			<Meta
				avatar={<Avatar src={photoId} style={{backgroundColor:"#AED6F1", color:"#154360"}}> {userName[0].toUpperCase()} </Avatar>}
				title={<Name name={userName+" "+userSurname} coincidence={coincidence} />}
				description={<Description desc={userDescription} coincidence={coincidence} />}
			/>
		</Card>
	);
};

const Match = () => {
	const [ users, setUsers ] = useState(null);
	const { state } = useContext(SessionContext);


	useEffect(() => {
		let asyncGet = async () => {
			let { data } = await ApiRequest.get(`/user/match/${state.user.id}`);
			setUsers(data);
		};
		asyncGet();
	}, [state.user]);

	return (
		<div className="match">
			<h1>Listado de usuarios por preferencias</h1>
			{users &&
				users.map((u) => {
					return <UserCard key={u.id} {...u} />;
				})}
		</div>
	);
};

export default  Match
