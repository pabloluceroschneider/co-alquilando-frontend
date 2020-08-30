import React from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import GroupList from '../../components/GroupList';
import GroupDetail from '../../components/GroupDetail';
import Chat from '../../components/Chat';
import WaitingSelection from '../../components/WaitingSelection';
import { useParams } from "react-router-dom";

const Groups = () => {
    let { group, chat } = useParams();

    return (
        <ContentWrapper topNav >
            <div className="groups-container">
                <GroupList render={ !group && !chat} />
                {   
                    group || chat ?  
                    <GroupDetail render={ group && !chat } /> 
                    : <WaitingSelection message="Seleccione Grupo" render={ group && !chat }/> 
                }
                { 
                    group && chat ?  
                    <Chat render={ group && chat } /> 
                    : <WaitingSelection message="Seleccione Chat"  render={ group && chat } /> 
                }
            </div>
        </ContentWrapper>
    )
}

export default Groups;