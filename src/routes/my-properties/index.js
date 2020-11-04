import React, { useEffect, useState, useContext } from "react";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import PropertyCard from "../../components/PropertyCard";
import { notification } from "antd";
import { SessionContext } from "../../store";
import WaitingSelection from "../../components/WaitingSelection";
import { HomeOutlined } from "@ant-design/icons";

const Property = () => {
  const breadscrumb = [{ "Mis Propiedades": "/my-properties" }];
  const [datos, setDatos] = useState(null);
  const { state } = useContext(SessionContext);
  useEffect(() => {
    let asyncGet = async () => {
      try {
        let { data } = await ApiRequest.get(
          `/property/properties/owner/${state.user.id}`
        );
        setDatos(data);
      } catch (e) {
        notification.error({
          message: `Error al obtener propiedades`,
          placement: "bottomLeft",
        });
      }
    };
    asyncGet();
  }, [state]);

  if (!datos?.length)
    return (
      <ContentWrapper topNav breadscrumb={breadscrumb}>
        <div className="no-groups">
          <WaitingSelection
            message={
              <div>
                No tienes ninguna propiedad publicada. Carga tu propiedad{" "}
                <a href="/property">aquí</a>
              </div>
            }
            render={!datos}
            icon={<HomeOutlined />}
          />
        </div>
      </ContentWrapper>
    );

  return (
    <ContentWrapper topNav breadscrumb={breadscrumb}>
      <div className="contentMyProperties">
        {datos?.length &&
          datos.map((p) => {
            return <PropertyCard key={p.id} {...p} />;
          })}
      </div>
    </ContentWrapper>
  );
};

export default Property;
