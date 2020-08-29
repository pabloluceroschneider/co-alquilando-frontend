import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import SideList from '../../components/SideList';
import ChatList from '../../components/ChatList';
import Chat from '../../components/Chat';

const Groups = () => {
    return (
        <ContentWrapper topNav >
            <SideList />
            <div className="groups-container">
                <ChatList />
                <Chat />
            </div>
        </ContentWrapper>
    )
}

export default Groups;