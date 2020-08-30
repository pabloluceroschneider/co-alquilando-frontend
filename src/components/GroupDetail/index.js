import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { useHistory } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';

const Item = ({ name, link }) => {
	let history = useHistory();

	const handleClick = () => {
		history.push(`/groups/${link}`);
	};

	function date() {
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		return h + ':' + m;
	}
	return (
		<div className="item">
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
	return (
		<div className="item">
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

const GroupDetail = ({render}) => {
	console.log("GroupDetail -->",render)
	return (
		<div className={`group-detail ${!!render}`}>
			<Info />
			<Votation />
			<Item name={'Grupo 1'} link="1" />
			<Item name={'Grupo 2'} link="2" />
			<Item name={'Grupo 3'} link="3" />
		</div>
	);
};
export default GroupDetail;
