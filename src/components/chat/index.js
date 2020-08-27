import React,{useContext, useState, useEffect} from 'react';
import SessionContext from '../../store';
import WebSocket from '../WebSocket';



const Chat = ()=>{

  return(
    <div className="chatContainer">
      <div className="groupContainer">
       
      </div>
      <div className="talkContainer">
      
      </div>
      <div className="msgContainer">
        <WebSocket/>
      </div>
    </div>
  )



}

export default Chat