import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';


const Group = ({name, link}) => {
    let history = useHistory();

    const handleClick = () => {
        history.push(`/groups/${link}`);
    }
    return (
        <div className="detail">
            <div className="header">
                <div className="name">{name}</div>
                <ArrowRightOutlined onClick={handleClick} style={{color:"#5e83ba"}} />
            </div>
            <div className="info">
                <div>
                </div>
            </div>
        </div>
    )
}


const GroupList = () => {
    return (
        <div className="group-list">
            <Group name={"Grupo 1"} link="1"/>
            <Group name={"Grupo 2"} link="2"/>
            <Group name={"Grupo 3"} link="3"/>
        </div>
    )
}
export default GroupList;
