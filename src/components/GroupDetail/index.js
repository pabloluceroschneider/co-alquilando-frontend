import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { useHistory } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import ApiRequest from "../../util/ApiRequest";

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

const Votation = ({group}) => {
	let history = useHistory();

	const handleClick = () => {
		history.push(`/groups/${group}/votations`);
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

const Info = ({name}) => {
	return (
        <div className="info">
            <div>{name}</div>
		</div>
	);
};



const GroupDetail = ({detail, render, group}) => {


	return (
		<div className={`group-detail ${!!render}`}>
            <div className="container">
				<Info name={detail?.name} />
				<Votation group={detail?.id} />
				{detail?.channels?.map( ch => {
					return <Item key={ch} name={detail?.id} channel={ch} />
				})}
			</div>
		</div>
	);
};
export default GroupDetail;
