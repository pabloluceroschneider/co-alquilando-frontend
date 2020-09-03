import React,{useContext, useState, useEffect} from 'react';
import { SessionContext } from '../../store';
import WebSocket from '../WebSocket';
import ApiRequest from "../../util/ApiRequest";
import {notification} from 'antd';
import { configConsumerProps } from 'antd/lib/config-provider';



const Chat = ({render, groupId, channel})=>{

  const [datos, setDatos] = useState(null)
  const {state} = useContext(SessionContext);
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
      {/* <div className="groupContainer">
       
      </div>
      <div className="talkContainer">
      
      </div> */}
      <div className="msgContainer">
        <WebSocket name={state.user.userNickname} id={state.user.id} groupId={groupId} channel={channel}/>
      </div>
    </div>
  )



}

const ChatContainer = ({render, groupId, channel}) => {
    return (
        <div className={`chat-container ${!!render}`}>
            <Chat groupId={groupId} channel={channel}/>
        </div>
    )
}
export default ChatContainer;