import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Rate } from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';
import Property from '../../classes/Property';


const useVotations = () => {
    const [data, setData] = useState(null); 
    const [votations, setVotations] = useState(null); 
    let { group } = useParams();

    useEffect( () => {
        const getVotations = async () => {
            const { data } = await ApiRequest.get(`/group/votation/all/${group}`);
            setData(data);
            };
        getVotations();
    }, [])

    useEffect( () => {
        if(!data) return;

        let ongoing = {}
        let history = []
        data.map( item => {
            if (item.result === "ongoing"){
                ongoing = item 
                let votos = Object.entries(item.votes)
                ongoing = {...ongoing, votospositivos: votos.filter(voto => voto[1]).length }
            }else{
                history = [...history, item]
            }
        })
        setVotations({ongoing, history})

    },[data])

    return [votations];
}

const OnGoing = ({item, detail}) => {
    const [ property, setProperty ] = useState(null);
    const { state } = useContext(SessionContext);
    

    useEffect(() => {
        if (!item) return;
        let asyncGetUser = async () => {
            let { data } = await ApiRequest.get(`/property/${item?.propertyId}`);
            let formatedProperty = new Property(data).mapResponseToJson();
            console.log("Propiedad :", formatedProperty )
            setProperty(formatedProperty);
        };
        asyncGetUser();
    },[item]);

    const handleVote = async vote => {
        let bodyReq = {
            userId: state.user.id,
            votationId: item?.id,
            vote
        }
        let { data } = await ApiRequest.put(`/group/votation/vote/${detail?.id}`, bodyReq);
    }

    return (
        <div className="ongoing">

            <div className="votation">
                <div className="title">{property?.title}</div>
                <div className="buttons">
                    <CheckSquareOutlined onClick={() => handleVote(true)}/>
                    <CloseSquareOutlined onClick={() => handleVote(false)} />
                </div>
            </div>

            <div className="results"> 
                <Rate character={<CheckCircleOutlined />} disabled count={detail?.membersId.length} value={item?.votospositivos} />
            </div>

            <div className="state">
                state
            </div>
        </div>
    )
}
const History = ({items}) => {
    return (
        <div className="history">History</div>
    )
}

const Votation = ({detail}) => {
    const [ votations ] = useVotations();
    console.log("detalle del grupo :", detail)

    return (
        <div className="votation-wrapper">
            <OnGoing item={votations?.ongoing} detail={detail}/>
            <History items={votations?.history} />
        </div>
    )
}

export default Votation;