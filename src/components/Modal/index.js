import React, { useState } from "react";
import { Modal, Button } from "antd";
import Mapa from "../Map";

const ModalMap = (props) => {
  const [visible, setVisible] = useState(false);
  const footerModal = () => {
    return (
      <Button key="back" onClick={handleCancel}>
        Cerrar
      </Button>
    );
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const location = {
    address: "Cordoba,Achaval Rodriguez 70",
    lat: -31.425286,
    lng: -64.188848,
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Ver Ubicación
      </Button>
      <Modal
        title="Ubicación"
        visible={visible}
        closable={true}
        onCancel={handleCancel}
        footer={[
            <Button type="primary" key="close" onClick={handleCancel}>
              Cerrar
            </Button>,
          ]}
      >
        <Mapa location={location} zoomLevel={17} />
      </Modal>
    </>
  );
};
export default ModalMap;
