import React, { useContext } from 'react';
import { SessionContext } from '../../store';
import WebSocket from '../WebSocket';

const Chat = ({ render, groupId, channel, channelName }) => {
  	const { state } = useContext(SessionContext);

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
