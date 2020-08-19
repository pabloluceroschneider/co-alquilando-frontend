import React, { useEffect} from 'react';
import ApiRequest from '../../util/ApiRequest';

const Chat = () =>{
    

    useEffect (() => {
        const ws = new WebSocket('ws://localhost:8080/websocket-chat')
        // const ws = new WebSocket('/ws')
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            }
        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            this.setState({dataFromServer: message})
            console.log(message)
        }
    
        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
    
        }

    })

    return(
        <div>
            <label>Esto parece que anda</label>
        </div>
    )
}
export default Chat;


