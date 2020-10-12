import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Card, Divider, Button, Tag } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import CarrouselPequeño from '../CarrouselPequeño';
import ModalMapa from '../Modal';


const PropertyCard = props => {
    const { title, price, address, attributes, id, photos } = props;
    const { rentPrice } = price;
    const {coordinates} = address;
    const history = useHistory();
    const { path } = useRouteMatch();
    const [ photoList, setPhotoList ] = useState([]);

    let attr = []
    if(attributes){
        attributes.forEach(t => {
            attr = { ...attr, [t.attributeType]: t.value }
        })
    }
    let typologies = {
        "APARMENT": "Departamento",
        "HOUSE": "Casa"
    }

    useEffect(() => {
        let asyncGet = async () => {
          photos.forEach( async (photo, index) => {
            let photoJson = {
                caption: "", 
                position: "",
                imgUrl: `http://localhost:8080/property/${id}/photos/${photo}`
            }
            setPhotoList(photoList => [...photoList, photoJson])
          })
        }
        if(photos){
          asyncGet();
        }else{
            let photoJson = {
                caption: "", 
                position: "",
                imgUrl: ""
            }
            setPhotoList(photoList => [...photoList, photoJson])
        }
      },[id, photos])
  

    const onEdit = () => {
        history.push(`/property/${id}/update`)
    }

    const redirectDetail = () => {
        history.push(`/property/${id}`)
    }

    return (

        <div className="contentPC">

            <Card
                hoverable
                style={{ width: 280 }}
                cover={
                    <CarrouselPequeño className="carruselPC" data={photoList}>
                    </CarrouselPequeño>
                }
            >
                <div >
                    <div className="cabeceraPC">
                        <label className="titlePC">{title}</label>
                        <div className="pricePC"> 
                            <label>${rentPrice}</label>
                            <Tag className="tagPC" title="Tipología" >{ typologies[attr.typology] }</Tag>
                        </div>
                    </div>

                    <Divider className="dividerPC"></Divider>

                    <div className="button-place">
                        <ModalMapa coordinates={coordinates}/>
                        {path === "/my-properties" &&
                            <Button className="icon-map-pin-5" onClick={() => onEdit()}>
                                <EditOutlined />
                            </Button>
                        }
                        <Button onClick={() => redirectDetail()}>
                            <EyeOutlined />
                        </Button>
                    </div>
                        
                </div>
            </Card>
        </div>
    );


}

export default PropertyCard;

