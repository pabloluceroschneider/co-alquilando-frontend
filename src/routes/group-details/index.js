import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import GroupDetail from '../../components/GroupDetail';

const GroupDetailRoute = () => {
    return (
        <ContentWrapper topNav >
            <GroupDetail />
        </ContentWrapper>
    )
}

export default GroupDetailRoute;