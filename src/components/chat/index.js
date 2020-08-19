import React, { useEffect , Component} from 'react';
import ApiRequest from '../../util/ApiRequest';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const Chat = () =>{

      const ws = new WebSocket('ws://localhost:8080/chat-messaging') 

    useEffect (() => {
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

 
      const handleNewUserMessage = (newMessage) => {
            console.log(`New message incomig! ${newMessage}`);
            ws.onmessage(newMessage)
           }
   
       return (
       <div>
         <Widget handleNewUserMessage={handleNewUserMessage} />
       </div>
     );
 
}
export default Chat;


