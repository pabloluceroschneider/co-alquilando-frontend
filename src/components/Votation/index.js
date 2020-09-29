import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Rate } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';
import Property from '../../classes/Property';
import '../../styles/VotationState.css';
import { convertLegacyProps } from 'antd/lib/button/button';

const useVotations = () => {
    const [data, setData] = useState(null);
    const [votations, setVotations] = useState(null);
    let { group } = useParams();



    useEffect(() => {
        const getVotations = async () => {
            const { data } = await ApiRequest.get(`/group/votation/all/${group}`);
            setData(data);
        };
        getVotations();
    }, [])

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


    useEffect(() => {
        if (!item) return;
        let asyncGetUser = async () => {
            let { data } = await ApiRequest.get(`/property/${item?.propertyId}`);
            let formatedProperty = new Property(data).mapResponseToJson();
            console.log("Propiedad :", formatedProperty)
            setProperty(formatedProperty);
        };
        asyncGetUser();
    }, [item]);

    const handleVote = async vote => {
        let bodyReq = {
            userId: state.user.id,
            votationId: item?.id,
            vote
        }
        let { data } = await ApiRequest.put(`/group/votation/vote/${detail?.id}`, bodyReq);
    }

    let typologies = {
        "ongoing": "En curso",
        "passed": "Aprobada",
        "failed": "Rechazada",
        "canceled": "Cancelada"
    }
    console.log("prop", property)
    return (
        <div className="ongoing">

            <div className="votation">
                <div className="votationHeader">
                    <img
                        alt="imagen de perfil"
                        src={property?.photos[0]}
                        className="imageVotation"
                    />
                    <div className="contentVotationTitle">
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
const History = ({ items }) => {
    return (
       <div className="history">
           Historial
        </div>

    )
}

const Votation = ({ detail }) => {
    const [votations] = useVotations();
    console.log("detalle del grupo :", detail)

    return (
        <div className="votation-wrapper">
            <OnGoing item={votations?.ongoing} detail={detail} />
            <History items={votations?.history} />
        </div>
    )
}

export default Votation;