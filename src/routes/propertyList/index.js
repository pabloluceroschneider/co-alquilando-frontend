import React, { useEffect, useState, useContext } from 'react';
import ApiRequest from "../../util/ApiRequest";
import PropertyCard from '../../components/PropertyCard/index';
import {notification} from 'antd';
import '../../styles/PropertyList.css';
import { SessionContext } from '../../store';



const Property = () => {
  

    const [datos, setDatos] = useState(null)
    const {state} = useContext(SessionContext);
    useEffect(
        () => {
            let asyncGet = async () => {
                try {
                    let{data} = await ApiRequest.get(`/property/properties/owner/${state.user.id}`);
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

        }, [state]
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