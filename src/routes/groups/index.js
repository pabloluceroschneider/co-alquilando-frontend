import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import SideList from '../../components/SideList';
import ScrollableHorizontalList from '../../components/ScrollableHorizontalList';
import GroupList from '../../components/GroupList';

const Groups = () => {
    return (
        <ContentWrapper topNav >
            <GroupList />
        </ContentWrapper>
    )
}

export default Groups;