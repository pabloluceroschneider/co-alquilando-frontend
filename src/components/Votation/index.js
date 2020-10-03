import React, { useState, useEffect, useContext} from 'react';
import { useParams , useHistory} from "react-router-dom";
import { Rate, notification } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';
import Property from '../../classes/Property';
import '../../styles/VotationState.css';

const useVotations = (detail) => {
    const [data, setData] = useState(null);
    const [votations, setVotations] = useState(null);
    let { group } = useParams();

	

    useEffect(() => {
        const getVotations = async () => {
            const { data } = await ApiRequest.get(`/group/votation/all/${group}`);
            setData(data);
        };
        getVotations();
    }, [group])

    useEffect(() => {
        if (!data) return;

        let ongoing = {}
        let history = []
        data.map(item => {
            if (item.result === "ongoing") {
                ongoing = item
                let votos = Object.entries(item.votes)
                ongoing = { ...ongoing, votospositivos: votos.filter(voto => voto[1]).length }
            } else {
                history = [...history, item]
            }
        })
        setVotations({ ongoing, history })

    }, [data])

    return [votations];
}

const OnGoing = ({ item, detail }) => {
    const [property, setProperty] = useState(null);
    const { state } = useContext(SessionContext);
    let history = useHistory();

    useEffect(() => {
        if (!item) {
            setProperty(null);
            return;
        }
        let asyncGetUser = async () => {
            let { data } = await ApiRequest.get(`/property/${item?.propertyId}`);
            let formatedProperty = await new Property(data).mapResponseToJson();
            setProperty(formatedProperty);
        };
        asyncGetUser();
    }, [item, detail]);

    const handleVote = async vote => {
        let bodyReq = {
            userId: state.user.id,
            votationId: item?.id,
            vote
        }
        await ApiRequest.put(`/group/votation/vote/${detail?.id}`, bodyReq).then(
            (res)=> {
                console.log("res",res)
                if(res.status==200){
                    notification.success({
                        message: "Votación registrada",
                        placement: "bottomLeft",
                      });
                } else {
                    notification.success({
                        message: "Hubo un error al registrar su votación. Por favor, intente nuevamente.",
                        placement: "bottomLeft",
                      });
                }
               history.push(`/groups/${item.groupId}`);
            }  
        );
    }

    let typologies = {
        "ongoing": "En curso",
        "passed": "Aprobada",
        "failed": "Rechazada",
        "canceled": "Cancelada"
    }
    
    if(item && property){
        return (
            <div className="ongoing" key={item?.id}>
                <div className={`votation ${item.id}`} >
                    <div className="votationHeader">
                        <img
                            alt="imagen de perfil"
                            src={property?.photos[0]}
                            className="imageVotation"
                        />
                        <div key={item.id} className="contentVotationTitle">
                            <a href={`/property/${item?.propertyId}`} className="titleVotation">{property?.title}</a>
                            <div className="priceVotation">Precio: ${property?.price.rentPrice}</div>
                            <div className="buttonsVotation">
                                <CheckCircleOutlined className="buttonsVotationOk" onClick={() => handleVote(true)} />
                                <CloseCircleOutlined className="buttonsVotationNo" onClick={() => handleVote(false)} />
                            </div>
                        </div>
                    </div>


                    <div className="rowVotation">
                        <div className="subtitleVotation">Resultado actual</div>
                        <Rate className="actualVotation" character={<CheckCircleOutlined />} disabled count={detail?.membersId.length} value={item?.votospositivos} />
                    </div>

                    <div className="rowVotation">
                        <div className="resultVotation">{typologies[item?.result]}</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            No una votacion en curso
        </div>
    )
}
const History = ({ items }) => {
    
    let typologies = {
        "ongoing": "En curso",
        "passed": "Aprobada",
        "failed": "Rechazada",
        "canceled": "Cancelada"
    }
    return (
        <div className="history">
        {items?.map(item => {
            return (
                <div key={item.id}>
                    <a href={`/property/${item?.propertyId}`} className="titleVotation">Ver propiedad</a>
                    <div className="resultVotation">{typologies[item?.result]}</div>
                </div>
               )
        })}
        </div>

    )
}

const Votation = ({ detail, render }) => {
    const [votations] = useVotations(detail);

    return (
        <div key={detail?.id} className={`votation-wrapper ${!!render}`}>
            <OnGoing item={votations?.ongoing} detail={detail} />
            <History items={votations?.history} />
        </div>
    )
}

export default Votation;