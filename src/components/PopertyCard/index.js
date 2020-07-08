import React from 'react';
import Carrousel from '../Carrousel/index';
import '../../styles/PropertyCard.css';
import { Checkbox } from 'antd';



const propertyCard = props => {
    const { imgUrl1, imgUrl2, imgUrl3, title ,price, rooms, location, description, tipologia, baño, sum, gym,
        pileta, playroom, asador, cochera, balcon, ascensor, cantMaxima, amoblado, aireAc, calefaccion, mascotas } = props

    return (

        <div className="content">
            <div>
               
                <Carrousel data={[
                    { imgUrl: imgUrl1, caption: "", position: "" },
                    { imgUrl: imgUrl2, caption: "", position: "" },
                    { imgUrl: imgUrl3, caption: "", position: "" }
                ]}>
                </Carrousel>
                
                <div>
                    <label className="subtitle">
                       <label> {title}</label>
                       <label> {tipologia}</label>
                       <label>Precio:{price}</label>
                       <label>Habitaciones:{rooms}</label>
                       <label>Ubicacion: {location}</label>
                       <label>{description}</label>
                       <label> {baño}
                        <checkbox>{sum}</checkbox>
                        {gym}
                        {pileta}
                        {playroom}
                        {asador}
                        {cochera}
                        {balcon}
                        {ascensor}
                        {cantMaxima}
                        {amoblado}
                        {aireAc}
                        {calefaccion}
                        {mascotas}</label>
                    </label>
                </div>

            </div>



        </div>
    );

}

export default propertyCard;