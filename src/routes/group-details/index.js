import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import GroupList from '../../components/GroupList';
import GroupDetail from '../../components/GroupDetail';
import Chat from '../../components/Chat';
import { useParams } from "react-router-dom";

const GroupDetailRoute = () => {
    let { group, chat } = useParams();
    console.log(group, chat)


    return (
        <ContentWrapper topNav >
            <div className="groups-container">
                <GroupList render={ !group && !chat} />
                <GroupDetail render={ group && !chat } />
                <Chat render={ chat } />
            </div>
        </ContentWrapper>
    )
}

export default GroupDetailRoute;