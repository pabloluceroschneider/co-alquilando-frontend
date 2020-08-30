import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import GroupList from '../../components/GroupList';
import GroupDetail from '../../components/GroupDetail';
import { useParams } from "react-router-dom";

const GroupDetailRoute = () => {
    let { group, chat } = useParams();


    return (
        <ContentWrapper topNav >
            <div className="groups-container">
                <GroupList render={ !group && !chat} />
                <GroupDetail render={ group } />
            </div>
        </ContentWrapper>
    )
}

export default GroupDetailRoute;