
import React, { useEffect, useState, useContext } from 'react';
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import PropertyCard from '../../components/PropertyCard';
import {notification} from 'antd';
import '../../styles/PropertyList.css';
import { SessionContext } from '../../store';


const Property = () => {
    const breadscrumb = [{'Mis Propiedades': '/my-properties'}]
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
    <ContentWrapper topNav title="Mis Propiedades" breadscrumb={breadscrumb}>
      <div className="contentMyProperties">
        {datos?.length
          ? datos.map((p) => {
              return <PropertyCard key={p.id} {...p} />;
            })
          : <div>No tienes ninguna propiedad publicada. Carga tu propiedad <a href="/property">aquí</a></div>}
      </div>
    </ContentWrapper>
  );
};

export default Property;
