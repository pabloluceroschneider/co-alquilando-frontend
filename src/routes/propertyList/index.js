import React, { useEffect, useState } from 'react'
import ApiRequest from "../../util/ApiRequest"
import PropertyCard from '../../components/PropertyCard/index'
import {notification} from 'antd'
import '../../styles/PropertyList.css'

const Property = () => {
    const [datos, setDatos] = useState(null)
    useEffect(
        () => {
            let asyncGet = async () => {
                try {
                    let{data} = await ApiRequest.get("/property/properties");
                    setDatos(data)
                    console.log(data)
                } catch (e) {
                    notification.error({
                        message: `Error: ${e.message}`,
                        placement: 'bottomLeft'
                    });
                }
            }
            asyncGet()

        }, []
    )

    return (

        <div className="contentPL" >
            {datos? datos.map((p)=>{
                return(
                    <PropertyCard {...p} />
                )
            }  ):null}
           
        </div>
        

    )
}

export default Property;