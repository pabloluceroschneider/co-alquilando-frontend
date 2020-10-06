import React from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel, Tag } from 'antd';
import { SendOutlined, TeamOutlined } from '@ant-design/icons';
import Property from '../../classes/Property';
import ClickeableMap from '../ClickeableMap';
import ModalAsyncList from '../ModalAsyncList';

const statusColor = {
    available: "green",
    disabled: "error",
    pre_rented: "orange",
    rented: "error",
}

const Header = ({ status, typology }) => {
    const { t } = useTranslation();

    return (
        <div className="section header">
            <Tag>{t(typology)}</Tag>
            <Tag color={statusColor[status]}>{t(status)}</Tag>
            <ModalAsyncList
                label={<Tag icon={<SendOutlined />} color="#5e83ba">Compartir en Grupo</Tag>}
                title={<div><TeamOutlined />Seleccione Grupo</div>}
                endpoint={`/user/users`}
                itemTitle="userName"
            />
        </div>
    )
}

const PhotoSection = ({ photos, alt }) => {
    return (
        <div className="section carrousel">
            <Carousel>
                {photos.map(url => {
                    return <img key={alt} src={url} alt={alt} />
                })}
            </Carousel>
        </div>
    )
}

const TitleSection = ({ title, description }) => {
    return (
        <div className="section box description">
            <h3>{title}</h3>
            <div>{description} </div>
        </div>
    )
}

const validPrice = price => price ? price : "-"
const PriceSection = ({ services, taxes, expenses, rentPrice }) => {
    return (
        <div className="section box price">
            <span>Precios</span>
            <div className="table price">
                <div>Servicios</div>
                <div>Impuestos</div>
                <div>Expensas</div>
                <div>Alquiler</div>
                <div>${validPrice(rentPrice)}</div>
                <div>${validPrice(expenses)}</div>
                <div>${validPrice(services)}</div>
                <div>${validPrice(taxes)}</div>
            </div>
        </div>
    )
}

const FullAddress = ({province, neighborhood, street, tower, 
    number, floor, apartment, description }) => {
        return (
            <div className="section box fullAddress">
                <span>Dirección</span>
                <div>{province}, Bº {neighborhood}</div>
                <div>{street}, {number} </div>
                <div>{tower ? `Torre: ${tower}`: null} {floor}º {apartment}</div>
                <div>{description}</div>
            </div>
        )
}

const MapSection = props => {
    if (!props.latitude || !props.length) return <div className="section box">Geolocalización no disponible</div>

    return (
        <div className="section map">
            <span>Ver Ubicación</span>
            <ClickeableMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `auto`, width: `auto` }} />}
                mapElement={<div style={{ height: `auto` }} />}
                zoomLevel={10}
                notClickeable
                {...props}
            />
        </div>
    )
}

const Attributes = ({ attributes }) => {
    const { t } = useTranslation();
    let attrArray = Property.mapJsonToArray(attributes);
    return (
        <div className="section box attributes">
            <span>Comodidades</span>
            {attrArray?.map((attr, index) => {
                return (
                    <div key={index} className="row">
                        <div>{t(attr.attributeType)}</div>
                        <div>{t(attr.value)}</div>
                    </div>
                )
            })}
        </div>
    )
}

const PayingLink = ({ payingLink }) => {
    if (!payingLink) return <div className="section box">Link de Pago no disponible</div>
    return (
        <div className="section box payingLink">
            <span>Link de Pago</span>
            <div>{payingLink}</div>
        </div>
    )
}


const PropertyDetail = props => {
    return (
        <div className="propertyDetail">
            <Header status={props.status} typology={props.attributes?.typology} />
            <PhotoSection photos={props.photos} alt={props.description} />
            <TitleSection title={props.title} description={props.description} />
            <PriceSection {...props.price} />
            <FullAddress {...props.address} />
            <PayingLink payingLink={props.payingLink} />
            <MapSection {...props.address?.coordinates} />
            <Attributes attributes={props.attributes} />
        </div>
    )
}

PhotoSection.defaultProps = {
    photos: ["https://omegamma.com.au/wp-content/uploads/2017/04/default-image-720x530.jpg", "https://omegamma.com.au/wp-content/uploads/2017/04/default-image-720x530.jpg"],
    alt: "No image"
}

export default PropertyDetail;