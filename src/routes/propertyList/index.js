import React from 'react'
import PropertyCard from '../../components/PopertyCard/index'
import image1 from '../../assets/images/Home/1.jpg'
import image2 from '../../assets/images/Home/2.jpg'
import image3 from '../../assets/images/Home/3.jpg'


const Property = () => {


    const PropertyCardProps = {
        imgUrl1: image1,
        imgUrl2: image2,
        imgUrl3: image3,
        title: "Achaval Deluxe",
        price: "13000",
        rooms:"2",
        location:"Cordoba",
        description:"Un lugar magico",
        tipologia:"Departamento",
        baño:"1",
        sum: false,
        gym: true,
        pileta: false,
        playroom: false,
        asador: false,
        cochera: false,
        balcon: true,
        ascensor: true,
        cantMaxima: "2",
        amoblado: false,
        aireAc: true,
        calefaccion: false,
        mascotas: false
    }
    return (
        <div >
            <PropertyCard {...PropertyCardProps}/>
        </div>

    )
}

export default Property;