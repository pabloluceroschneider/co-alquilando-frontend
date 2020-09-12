import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import ApiRequest from '../../util/ApiRequest';
import { SessionContext } from '../../store';
import ContentWrapper from '../../components/ContentWrapper';
import GroupList from '../../components/GroupList';
import GroupDetail from '../../components/GroupDetail';
import Chat from '../../components/Chat';
import WaitingSelection from '../../components/WaitingSelection';
import { SendOutlined, TeamOutlined } from '@ant-design/icons';

const Groups = () => {
    let { group, chat } = useParams();
    let breadscrumb = [{
        Grupos : "/groups"
    }]

    const {state} = useContext(SessionContext);
    const [data, setData] = useState(null); 

    useEffect( () => {
        const getGroupInformation = async () => {
            const { data } = await ApiRequest.get(`/group/user/${state.user.id}`);
            setData(data);
            };
        getGroupInformation();
    }, [state.user.id])

    if (!data?.length) return (
        <ContentWrapper topNav breadscrumb={breadscrumb} >
            <div className="no-groups">
                <WaitingSelection  message="No tienes grupos!" icon={<TeamOutlined />} />
            </div>
        </ContentWrapper>
    )

    return (
        <ContentWrapper topNav breadscrumb={breadscrumb} >
            <div className="groups-container">
                <GroupList groups={data} render={ !group && !chat} />
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