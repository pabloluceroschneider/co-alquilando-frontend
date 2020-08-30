import React, { useState, useEffect } from 'react'

const ChatContainer = ({render}) => {
    return (
        <div className={`chat-container ${!!render}`}>
            ChatContainer
        </div>
    )
}
export default ChatContainer;