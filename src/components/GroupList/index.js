import React, { useState, useEffect , useContext} from 'react'
import { useHistory, useParams } from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';
import ApiRequest from "../../util/ApiRequest";
import { SessionContext } from '../../store';


const Group = ({name, link}) => {
    const { group } = useParams();
    const history = useHistory();

    const handleClick = () => {
        history.push(`/groups/${link}`);
    }
    return (
        <div className={`detail  ${group===link}`} onClick={handleClick} >
            <div className="header">
                <div className="name">{name}</div>
                <ArrowRightOutlined className={`${group===link}`} />
            </div>
        </div>
    )
}


const GroupList = ({groups, render}) => {

    return (
        <div className={`group-list ${!!render}`}>
            <div className="container">
                {groups?.map( (grupo) => {
                       return <Group name={grupo.name} key={grupo.id} link={grupo.id}/>
                })}
            </div>
        </div>
    )
}
export default GroupList;
