import React from 'react';
import { SendOutlined } from '@ant-design/icons';


const WaitingSelection = ({message, render}) => {
    return (
        <div className={`waiting-selection ${!!render}`}>
            <div className="container">
                <SendOutlined />
                <div>{message}</div>
            </div>
        </div>
    )
}
export default WaitingSelection;