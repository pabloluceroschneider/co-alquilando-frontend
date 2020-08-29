import React from 'react'
import { Carousel, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

const statusColor = {
    pre_rented: "magenta",
    available: "green"
}

const Header = ({status, typology}) => {
    const { t } = useTranslation();
    return (
        <div className="section header"> 
            <Tag> {t(typology)} </Tag>
            <Tag color={statusColor[status]}>{ t(status) }</Tag>
        </div>
    )
}

const PhotoSection = ({photos, alt}) => {
    let fake = [1]
    function onChange(a, b, c) {
        console.log(a, b, c);
    }
    return (
        <div className="section carrousel">
            <Carousel afterChange={onChange}>
                {fake.map( url => {
                    return <img key={alt} src={"https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=fl2H3Opv"} alt={alt} />
                })}
            </Carousel>
        </div>
    )
}

const TitleSection = ({title, description}) => {
    return (
        <div className="section description"> 
            <h3>{title}</h3>
            <div>{description} </div>
        </div>
    )
}

const validPrice = price => price ? price : "-"
const PriceSection = ({services, taxes, expenses, rentPrice }) => {
    return (
        <div>
            <span>Precios</span>
            <div className="section price">
                <div>Servicios</div>
                <div>Impuesto</div>
                <div>Expensas</div>
                <div>Alquiler</div>
                <div>${validPrice(services)}</div>
                <div>${validPrice(taxes)}</div>
                <div>${validPrice(expenses)}</div>
                <div>${validPrice(rentPrice)}</div>
            </div>
        </div>
    )
}

const FullAddress = ({province, neighborhood, street, 
    number, floor, apartment, description }) => {
        return (
            <div className="section fullAddress">
                <span>Dirección</span>
                <div>{province}, Bº {neighborhood}</div>
                <div>{street}, {number}. {floor}º {apartment}</div>
                <div>{description}</div>
            </div>
        )
}

const MapSection = ({latitude, length}) => {
    return (
        <div className="section map">
            <span>Ver Ubicación</span>
            {/* <span>{latitude}</span>
            <span>{length}</span> */}
        </div>
    )
}

const Attributes = ({attributes}) => {
    const { t } = useTranslation();
    return (
        <div className="section attributes">
            <span>Comodidades</span>
            {attributes?.map( (attr, index) => {
                return (
                    <div key={index} className="row">
                        <div>{ t(attr.attributeType) }</div>
                        <div>{ t(attr.value) }</div>
                    </div>
                )
            })}
        </div>
    )
}

const PropertyDetail = props => {
    console.log(props.address?.coordinates)
    return (
        <div className="propertyDetail">
            <Header status={props.status} typology={props.typology}/>
            <PhotoSection photos={props.photos} alt={props.description} />
            <TitleSection title={props.title} description={props.description} />
            <PriceSection {...props.price} />
            <FullAddress {...props.address} />
            <MapSection {...props.address?.coordinates} />
            <Attributes attributes={props.attributes} />
        </div>
    )
}

export default PropertyDetail;