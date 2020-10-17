
import React, { useEffect, useState, useContext } from 'react';
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import PropertyCard from '../../components/PropertyCard';
import Spin from '../../components/Spin';
import {notification} from 'antd';
import '../../styles/PropertyList.css';
import { SessionContext } from '../../store';


const Property = () => {
    const breadscrumb = [{'Mis Propiedades': '/my-properties'}]
    const [datos, setDatos] = useState()
    const {state} = useContext(SessionContext);

    useEffect(() => {
      let asyncGet = async () => {
          try {
              let{data} = await ApiRequest.get(`/property/properties/owner/${state.user.id}`);
              setDatos(data)
          } catch (e) {
              notification.error({
                  message: `Error al obtener propiedades`,
                  placement: 'bottomLeft'
              });
          }
      }
      asyncGet()
    }, [state])

  return (
    <ContentWrapper topNav breadscrumb={breadscrumb}>
      <div className="contentMyProperties">

        {!datos ? <Spin /> : null}

        {datos?.length
        ? datos.map((p) => {
            return <PropertyCard key={p.id} {...p} />;
          })
        : null}

        {datos && !datos.length ? (
          <div className="no-properties">No tienes ninguna propiedad publicada. Carga tu propiedad <a href="/property">aquí</a></div>
        ) :null}
      </div>
    </ContentWrapper>
  );
};

export default Property;
