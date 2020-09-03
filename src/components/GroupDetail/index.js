import React, { useState, useEffect, useContext } from 'react';
import { Avatar } from 'antd';
import { useHistory } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import ApiRequest from "../../util/ApiRequest";
import { SessionContext } from '../../store';

const Item = ({ name, link }) => {
	let history = useHistory();

	const handleClick = () => {
		history.push(`/groups/${name}/chat/${link}`);
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
				<div className="name">Name</div>
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
				<div className="name">Votaciones</div>
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
        </div>);
};



const GroupDetail = ({render, group}) => {
	const { state } = useContext(SessionContext);
	const [data, setData] = useState(null);
	const [groupId, setGroupId] = useState(null);

	useEffect( () => {
		let getGroupInformation = async () => {
			await ApiRequest.get(`/group/` + group + `/detail`).then((res) => {
				let groupId = res.data.id
				setGroupId(groupId)
				let datos = res.data.channels
				setData(datos);
			});
		  };
		getGroupInformation();
	}, [group]
	)
	return (
		<div className={`group-detail ${!!render}`}>
            <div className="container">
				<Info />
				<Votation />
				{ data ?
                    data.map( (channels) => {
                       return <Item name={groupId} key={channels} link={channels}/>
                    }) : null
                }
			</div>
		</div>
	);
};
export default GroupDetail;
