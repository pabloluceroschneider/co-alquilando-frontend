import React from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import GroupList from '../../components/GroupList';
import GroupDetail from '../../components/GroupDetail';
import Chat from '../../components/Chat';
import { useParams } from "react-router-dom";

const Groups = () => {
    let { group, chat } = useParams();

    return (
        <ContentWrapper topNav >
            <div className="groups-container">
                <GroupList render={ !group && !chat} />
                <GroupDetail render={ group && !chat } />
                <Chat render={ group && chat } />
            </div>
        </ContentWrapper>
    )
}

export default Groups;