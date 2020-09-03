import React, { useState, useEffect , useContext} from 'react'
import { useHistory } from "react-router-dom";
import { ArrowRightOutlined } from '@ant-design/icons';
import ApiRequest from "../../util/ApiRequest";
import { SessionContext } from '../../store';


const Group = ({name, link}) => {
    let history = useHistory();

    const handleClick = () => {
        history.push(`/groups/${link}`);
    }
    return (
        <div className="detail clickeable" onClick={handleClick} >
            <div className="header">
                <div className="name">{name}</div>
                <ArrowRightOutlined />
            </div>
            <div className="info">
                <div>
                </div>
            </div>
        </div>
    )
}


const GroupList = ({render}) => {
    const {state} = useContext(SessionContext);
    const [data, setData] = useState(null); 

    useEffect( () => {
        const getGroupInformation = async () => {
            const { data } = await ApiRequest.get(`/group/user/${state.user.id}`);
            setData(data);
            };
        getGroupInformation();
    }, [state.user.id])

    return (
        <div className={`group-list ${!!render}`}>
            <div className="container">
                { data ?
                    data.map( (grupo) => {
                       return <Group name={grupo.name} key={grupo.id} link={grupo.id}/>
                    }) : null
                } 

            </div>
        </div>
    )
}
export default GroupList;
