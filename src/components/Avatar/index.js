import React from 'react';
import { Avatar } from 'antd'

const CustomAvatar = ({letter, url }) => {
    return (
        <div>
             <Avatar
                src={url}
                style={{ backgroundColor: "#AED6F1", color: "#154360" }}
            >
                {letter}
            </Avatar>
        </div>
    )
}

export default CustomAvatar;
