import React from 'react';
import { useParams } from "react-router-dom";
import ContentWrapper from '../../components/ContentWrapper';
import GroupList from '../../components/GroupList';
import GroupDetail from '../../components/GroupDetail';
import Chat from '../../components/Chat';
import WaitingSelection from '../../components/WaitingSelection';
import { SendOutlined, TeamOutlined } from '@ant-design/icons';

const Groups = () => {
    let { group, chat } = useParams();

    return (
        <ContentWrapper topNav >
            <div className="groups-container">
                <GroupList render={ !group && !chat} />
                {   
                    group || chat ?  
                    <GroupDetail render={ group && !chat } group={group} /> 
                    : <WaitingSelection message="Seleccione Grupo" render={ group && !chat } icon={<TeamOutlined />}/> 
                }
                { 
                    group && chat ?  
                    <Chat render={ group && chat } groupId={group} channel={chat}/> 
                    : <WaitingSelection message="Seleccione Chat"  render={ group && chat } icon={<SendOutlined />} /> 
                }
            </div>
        </ContentWrapper>
    )
}

export default Groups;