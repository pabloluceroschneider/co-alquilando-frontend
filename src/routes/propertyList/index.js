import React, { useEffect, useState, useContext } from 'react';
import { SessionContext } from '../../store';
import ApiRequest from "../../util/ApiRequest";
import { notification } from 'antd';
import ContentWrapper from '../../components/ContentWrapper';
import PropertyCard from '../../components/PropertyCard/index';

const Property = () => {
    const [datos, setDatos] = useState(null)
    const {state} = useContext(SessionContext);

    useEffect(
        () => {
            let asyncGet = async () => {
                try {
                    let{data} = await ApiRequest.get(`/property/properties/owner/${state.user.id}`);
                    setDatos(data)
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
		<ContentWrapper topNav optionsNav>


        <div className="contentPL" >
            {datos? datos.map((p)=>{
                return(
                    <PropertyCard key={p.id} {...p} />
                )
            }  ):null}
        </div>
		</ContentWrapper>

        
    )
}

export default Property;