import React, { useState, useEffect } from "react";
import ContentWrapper from "../../components/ContentWrapper";
import AdCard from "../../components/AdCard";
import AdInfo from "../../components/AdInfo";
import { notification } from "antd";
import ApiRequest from "../../util/ApiRequest";
import WaitingSelection from "../../components/WaitingSelection";
import { HomeOutlined } from "@ant-design/icons";
import Spin from "../../components/Spin";

const AdList = () => {
  const [datos, setDatos] = useState(null);
  const breadscrumb = [{ Publicidades: "/ads" }];

  useEffect(() => {
    let asyncGet = async () => {
      try {
        let { data } = await ApiRequest.get(`/ad`);
        setDatos(data);
      } catch (e) {
        notification.error({
          message: `Error al obtener propiedades`,
          placement: "bottomLeft",
        });
      }
    };
    asyncGet();
  }, []);

  return (
    <ContentWrapper topNav breadscrumb={breadscrumb}>
      <div className="ads-list--content">
        <AdInfo count={datos?.length} />

        <div className="ads">
          {!datos ? <Spin /> : null}

          {datos?.length
            ? datos.map((a) => {
                return <AdCard key={a.id} {...a} datos={datos} setDatos={setDatos} />;
              })
            : null}

          {datos && !datos.length ? (
            <div className="no-groups">
              <WaitingSelection
                message="No tienes ninguna publicidad publicada"
                render={true}
                icon={<HomeOutlined />}
              />
            </div>
          ) : null}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default AdList;
