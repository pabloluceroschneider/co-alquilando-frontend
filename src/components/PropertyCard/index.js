import React from 'react';
import '../../styles/PropertyCard.css'
import { Card } from 'antd';
import { Divider } from 'antd';
import '../../assets/Icons/Icon/styles.css'
import CarrouselPequeño from '../CarrouselPequeño';


const propertyCard = props => {
    const { description, price, address, attributes } = props
    const { rentPrice } = price
    const { street, number, province } = address

    let attr = []
    attributes.forEach(t => {
        attr = { ...attr, [t.attributeType]: t.value }
    })
    let typologies = {
        "APARMENT": "Departamento",
        "HOUSE": "Casa"
    }

    return (

        <div className="contentPC">
        
            <Card
                hoverable
                style={{ width: 260 }}
                cover={
                    <CarrouselPequeño className="carruselPC" data={[
                        { imgUrl: "", caption: "", position: "" },
                        { imgUrl: "", caption: "", position: "" },
                        { imgUrl: "", caption: "", position: "" }
                    ]}>
                    </CarrouselPequeño>
                }
            >
                <div >
                    <div className="cabeceraPC">
                        <label className="titlePC"> ${rentPrice}</label> <br></br>
                        <label className="typologyPC"> {typologies[attr.typology]}</label>
                    </div>

                    <div className="itemsPC">
                        <label>{province}</label>
                        <label>Ubicacion: {street} {number}</label>
                        <label>Habitaciones: {attr.rooms}  </label>
                        <label>Baños: {attr.bathrooms}</label>
                        <label>Maximo Inquilinos: {attr.amountPeople}</label>
                        <Divider className="dividerPC"></Divider>
                        <label>{description}</label>
                        <Divider className="dividerPC"></Divider>
                    </div>

                    <div className="filaPC">

                        {attr.sum ? <label className="icon icon-bookmark" title="Salon de usos multiples">  </label> : null}
                        {attr.gym ? <label className="icon icon-barbell" title="Gym">  </label> : null}
                        {attr.pool ? <label className="icon icon-swimming" title="Pileta">  </label> : null}
                        {attr.playroom ? <label className="icon icon-play" title="Playroom">  </label> : null}
                        {attr.furnished ? <label className="icon icon-easel" title="Amoblado">  </label> : null}
                        {attr.garage ? <label className="icon icon-car-side" title="Cochera">  </label> : null}
                        {attr.balcony ? <label className="icon icon-weibo" title="Balcon"> </label> : null}
                        {attr.elevator ? <label className="icon icon-arrow-circle-1-up" title="Ascensor"></label> : null}
                        {attr.roaster ? <label className="icon icon-barbecue-eat-food-streamline" title="Asador">  </label> : null}
                        {attr.aa ? <label className="icon icon-air" title="Aire Acondcionado"> </label> : null}
                        {attr.calefaction ? <label className="icon icon-fire"> title="Calefaccion" </label> : null}
                        {attr.pets ? <label className="icon icon-paw" title="Acepta Mascotas">  </label> : null}


                    </div>

                </div>

            </Card>

                
        </div>
    );


}

export default propertyCard;