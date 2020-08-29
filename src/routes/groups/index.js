import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import SideList from '../../components/SideList';
import ScrollableHorizontalList from '../../components/ScrollableHorizontalList';
import Chat from '../../components/Chat';

const Groups = () => {
    return (
        <ContentWrapper topNav >
            <SideList />
            <div className="groups-container">
                <ScrollableHorizontalList />
                <Chat />
            </div>
        </ContentWrapper>
    )
}

export default Groups;