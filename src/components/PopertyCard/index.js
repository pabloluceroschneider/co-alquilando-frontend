import React from 'react';
import Carrousel from '../Carrousel/index';
import '../../styles/PropertyCard.css';
import tilde from '../../assets/Icons/tilde.png'
import x from '../../assets/Icons/x.png'



const propertyCard = props => {
    const {description,price,status,address,attributes} = props
    const {rentPrice}=price
    const {street,number,floor,apartment,neighborhood,province} = address

    let attr = []
    attributes.forEach( t => {
    attr = { ...attr, [t.attributeType]:t.value }
    })
    let typologies = {
        "APARMENT": "Departamento",
        "HOUSE":"Casa"
    }
    
    console.log("asdasdasdasd",typologies[attr.typology])
    return (

        <div className="content">               
                <Carrousel data={[
                    { imgUrl: "", caption: "", position: "" },
                    { imgUrl: "", caption: "", position: "" },
                    { imgUrl: "", caption: "", position: "" }
                ]}>
                </Carrousel>
           
            <div >
            <div className="items">
                       <label  className="title"> ${rentPrice}</label>
                       <label> {typologies[attr.typology]}</label>
                       <label>Habitaciones:{attr.rooms}</label>
                       <label>Ubicacion: {street}</label>
                       <label>Baños: {attr.bathrooms}</label>
                       <label>Maximo Inquilinos: {attr.amountPeople}</label>
                       <label>{description}</label>
                    </div>
                       
                      <div className="fila">
             
                      <label>Sum <img className="img" src={attr.sum ? tilde : x}/> </label>
                      <label>Gym <img className="img" src={attr.gym ? tilde : x}/> </label>
                      <label>Pileta <img className="img" src={attr.pool ? tilde : x}/> </label>
                      <label>Playroom <img className="img" src={attr.playroom ? tilde : x}/> </label>
                      <label>Amoblado <img className="img" src={attr.furnished ? tilde : x}/> </label>
                      <label>Cochera <img className="img" src={attr.garage ? tilde : x}/> </label>
                      <label>Balcon <img className="img" src={attr.balcony ? tilde : x}/> </label>
                      <label>Ascensor <img className="img" src={attr.elevator ? tilde : x}/> </label>
                      <label>Asador <img className="img" src={attr.roaster ? tilde : x}/> </label>
                      <label>Aire Acondicionado <img className="img" src={attr.aa ? tilde : x}/> </label>
                      <label>Calefaccion <img className="img" src={attr.calefaction ? tilde : x}/> </label>
                      <label>Mascotas <img className="img" src={attr.pets ? tilde : x}/> </label>
                       
                       
                      </div>
         
                     
                    
                </div>


        </div>
    );
   

}

export default propertyCard;