import React, { useEffect , Component, useState} from 'react';
import ApiRequest from '../../util/ApiRequest';
import SockJsClient from "react-stomp";
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const Chat = () =>{
  const [clientConnected, setClientConnected] = useState(false);
    

    // useEffect (() => {
    //     // const ws = new WebSocket('/ws')
    //     ws.onopen = () => {
    //         // on connecting, do nothing but log it to the console
    //         console.log('connected')
    //         }
    //     ws.onmessage = evt => {
    //         // listen to data sent from the websocket server
    //         const message = JSON.parse(evt.data)
    //         this.setState({dataFromServer: message})
    //         console.log(message)
    //     }
    
    //     ws.onclose = () => {
    //         console.log('disconnected')
    //         // automatically try to reconnect on connection loss
    
    //     }

    // })

 
      const handleNewUserMessage = (newMessage) => {
            console.log(`New message incomig! ${newMessage}`);
            this.clientRef.sendMessage("/app/all", JSON.stringify(newMessage))
           }
   
      const wsSourceUrl = "http://localhost:8080/handler";
       return (
       <div>
         <Widget handleNewUserMessage={handleNewUserMessage} />
         <SockJsClient url={ wsSourceUrl } topics={["/topic/all"]}
          onMessage={ handleNewUserMessage } ref={ (client) => { this.clientRef = client }}
          onConnect={ () => { setClientConnected(true) }  }
          onDisconnect={ () => { setClientConnected(false)} } 
          debug={ false }/>
       </div>
     );
 
}
export default Chat;


