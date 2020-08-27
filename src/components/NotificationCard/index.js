import React from 'react';
import { Card, notification } from 'antd';
import ApiRequest from '../../util/ApiRequest';
import Notification from '../../classes/Notification';
const { Meta } = Card;

const Description = ({desc}) => {
	return (
		<div>
			<div>{desc}</div>
		</div>
	)
}

const NotificationCard = props => {

	const response = async type => {
		let bodyReq = new Notification(
			props.to,
			props.from,
			type
		);
		await ApiRequest.post("/notifications/send", bodyReq);
		notification.success({
			message: `¡Tu respuesta fue enviada con éxito!`,
			placement: 'bottomLeft'
		});
	}
	
	const actions = {
		group_send_invitation: [
			<span onClick={()=>{ response("group_decline_invitation") }} >Rechazar</span>,
			<span onClick={()=>{ response("group_accept_invitation") }}>Aceptar</span>,
		]
	}

	return (
		<Card
			hoverable
            className={`notificationCard ${props.type}`}
			actions={actions[props.type]}
		>
			<Meta
				// avatar={<Avatar></Avatar>}
				title={props.to}
				description={<Description desc={props.type} />}
			/>
		</Card>
	);
};



export default NotificationCard;

