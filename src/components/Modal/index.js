import React, { useState } from "react";
import { Modal, Button } from "antd";
import { EnvironmentOutlined } from '@ant-design/icons';
import Mapa from "../Map";

const ModalMap = (props) => {
const {coordinates} = props;
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };


  const handleCancel = () => {
    setVisible(false);
  };
  const location = {
    lat: parseFloat(coordinates?.latitude),
    lng: parseFloat(coordinates?.length),
}

  return (
    <>
      <Button onClick={showModal}>
        <EnvironmentOutlined />
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
        <Mapa
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          location={location}
          zoomLevel={15}
        />
      </Modal>
    </>
  );
};
export default ModalMap;
