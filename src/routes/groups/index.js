import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import ApiRequest from '../../util/ApiRequest';
import { SessionContext } from '../../store';
import ContentWrapper from '../../components/ContentWrapper';
import GroupList from '../../components/GroupList';
import GroupDetail from '../../components/GroupDetail';
import Chat from '../../components/Chat';
import Votation from '../../components/Votation';
import WaitingSelection from '../../components/WaitingSelection';
import { SendOutlined, TeamOutlined } from '@ant-design/icons';

const Groups = () => {
    let { group, chat } = useParams();
    let votation = window.location.pathname.split("/").includes("votations")
    let breadscrumb = [{
        Grupos : "/groups"
    }]

    const {state} = useContext(SessionContext);
    const [data, setData] = useState(null); 

    const [detail, setDetail] = useState(null)

	useEffect( () => {
        if (!group) return
		let getGroupInformation = async () => {
			let { data } = await ApiRequest.get(`/group/${group}/detail`)
			setDetail(data);
		};
		getGroupInformation();
	}, [group])

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
                <WaitingSelection  message="No tienes grupos!" render={!group && !chat} icon={<TeamOutlined />} />
            </div>
        </ContentWrapper>
    )

    return (
        <ContentWrapper topNav breadscrumb={breadscrumb} >
            <div className="groups-container">
                <GroupList groups={data} render={ !group && !chat && !votation} />
                {   
                    group || chat ?  
                    <GroupDetail detail={detail} render={ group && !chat && !votation } group={group} /> 
                    : <WaitingSelection message="Seleccione Grupo" render={ group && !chat } icon={<TeamOutlined />}/> 
                }
                {
                    group ? (
                        chat ? 
                        <Chat render={ group && chat && !votation } groupId={group} channel={chat}/> 
                        : <Votation render={ group && !chat && votation } detail={detail} />
                    ) 
                    : <WaitingSelection message="Seleccione Grupo" render={ group && !chat } icon={<TeamOutlined />}/> 
                }
            </div>
        </ContentWrapper>
    )
}

export default Groups;