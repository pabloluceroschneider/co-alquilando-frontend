import React,{useContext, useState, useEffect} from 'react';
import { SessionContext } from '../../store';
import WebSocket from '../WebSocket';
import ApiRequest from "../../util/ApiRequest";
import {notification} from 'antd';



const Chat = ()=>{

  const [datos, setDatos] = useState(null)
  const {state} = useContext(SessionContext);
  console.log("asdsdas", state)
  useEffect(
    () => {
        let asyncGet = async () => {
            try {
                let{data} = await ApiRequest.get(`/group/user/${state.user.id}`);
                setDatos(data)
            } catch (e) {
                notification.error({
                    message: `Error: ${e.message}`,
                    placement: 'bottomLeft'
                });
            }
        }
        asyncGet()

    }, [state]
)

  return(
    <div className="chatContainer">
      <div className="groupContainer">
       
      </div>
      <div className="talkContainer">
      
      </div>
      <div className="msgContainer">
        <WebSocket name={state.user.userNickname} id={state.user.id}/>
      </div>
    </div>
  )



}

export default Chat