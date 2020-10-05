import React, { useContext, useState, useEffect } from 'react';
import { SessionContext } from '../../store';
import WebSocket from '../WebSocket';
import ApiRequest from '../../util/ApiRequest';
import { notification } from 'antd';

const Chat = ({ render, groupId, channel, channelName }) => {
	const [ datos, setDatos ] = useState(null);
  	const { state } = useContext(SessionContext);
  
	useEffect(() => {
			let asyncGet = async () => {
				try {
					let { data } = await ApiRequest.get(`/group/user/${state.user.id}`);
					setDatos(data);
				} catch (e) {
					notification.error({
						message: `Error: ${e.message}`,
						placement: 'bottomLeft'
					});
				}
			};
			asyncGet();
		},[ state, channel ]);

	return (
		<div key={channel} className={`chat-container ${!!render}`}>

      <WebSocket 
        name={state.user.userNickname} 
        id={state.user.id} 
        groupId={groupId} 
		channel={channel} 
		channelName={channelName}
        />

		</div>
	);
};

export default Chat;
