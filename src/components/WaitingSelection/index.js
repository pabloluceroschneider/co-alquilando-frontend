import React from 'react';

const WaitingSelection = ({message, render, icon}) => {
    return (
        <div className={`waiting-selection ${!!render}`}>
            <div className="container">
                {icon}
                <div>{message}</div>
            </div>
        </div>
    )
}
export default WaitingSelection;