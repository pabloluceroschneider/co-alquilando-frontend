import React from 'react'
import { useParams, Link } from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';

const Group = ({name, link}) => {
    const { group } = useParams();

    return (
        <Link to={`/groups/${link}`}>
            <div className={`detail clickeable selected-${group===link}`}>
                <div className="header">
                    <div className="name">{name}</div>
                    <ArrowRightOutlined className={`${group===link}`} />
                </div>
            </div>
        </Link>
    )
}


const GroupList = ({ groups, render}) => {
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
