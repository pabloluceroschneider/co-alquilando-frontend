import React, { useState, useEffect, useContext } from 'react';
import { Avatar } from 'antd';
import { useHistory } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import ApiRequest from "../../util/ApiRequest";
import { SessionContext } from '../../store';

const Item = ({ name, channel }) => {
	let history = useHistory();

	const handleClick = () => {
		history.push(`/groups/${name}/chat/${channel}`);
	};

	function date() {
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		return h + ':' + m;
	}
	return (
		<div className="item clickeable" onClick={handleClick}>
			<Avatar />
			<div className="name-msg">
				<div className="name">{channel}</div>
				<div className="msg">last message</div>
			</div>
			<div className="time">{date()}</div>
		</div>
	);
};

const Votation = () => {
	const handleClick = () => {
		alert("Funcionalidad En Contrucción!")
	};
	return (
		<div className="item" onClick={handleClick}>
			<StarFilled />
			<div className="name-msg">
				<div className="">Votaciones</div>
			</div>
		</div>
	);
};

const Info = () => {
	return (
        <div className="info">
            <div>Info de Grupo</div>
            <div>Miembros</div>
            <div>Etc</div>
		</div>
	);
};



const GroupDetail = ({render, group}) => {
	const { state } = useContext(SessionContext);
	const [detail, setDetail] = useState(null)

	useEffect( () => {
		let getGroupInformation = async () => {
			let { data } = await ApiRequest.get(`/group/${group}/detail`)
			setDetail(data);
		};
		getGroupInformation();
	}, [group])

	return (
		<div className={`group-detail ${!!render}`}>
            <div className="container">
				<Info />
				<Votation />
				{detail?.channels?.map( ch => {
					return <Item key={ch} name={detail?.id} channel={ch} />
				})}
			</div>
		</div>
	);
};
export default GroupDetail;
