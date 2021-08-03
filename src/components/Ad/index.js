import React, { useState, useEffect } from "react";
import { Card, Divider, Button, notification, Modal } from "antd";
import { Link } from "react-router-dom";
import {
  CheckCircleTwoTone,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ApiRequest from "../../util/ApiRequest";
import moment from "moment";

const image = "http://anokha.world/images/not-found.png";

const AdCard = (props) => {
  const [photo, setPhoto] = useState();
  const { confirm } = Modal;

  useEffect(() => {
    let asyncGetPhoto = async () => {
      let photoJSON = {
        caption: "",
        position: "",
        imgUrl: `http://ec2-34-219-1-255.us-west-2.compute.amazonaws.com:8080/ad/${props.id}/image/${props.image}`,
      };
      setPhoto(photoJSON);
    };
    if (props.image) {
      asyncGetPhoto();
    } else {
      let photoJSON = {
        caption: "",
        position: "",
        imgUrl: "",
      };
      setPhoto(photoJSON);
    }
  }, [props.id, props.image]);

  const onDelete = async () => {
    await ApiRequest.delete(`/ad/${props.id}`).then((res) => {
      notification.success({
        message: `Publicidad eliminada con éxito`,
        placement: "bottomLeft",
      });
    }).then(async (res) => {
      let { data } = await ApiRequest.get(`/ad`);
      props.setDatos(data);
    });
  };

  const showDelete = () => {
    confirm({
      title: "¿Desea eliminar esta publicidad?",
      icon: <ExclamationCircleOutlined />,
      content: "Si selecciona 'Aceptar', se desactivará la publicidad.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onDelete();
      },
    });
  };

  return (
    <Card hoverable>
      <div className="pubicity-card--container">
        {props.image ? (
          <div
            className="publicity-card--image"
            style={{ backgroundImage: `url(${photo?.imgUrl})` }}
            key={photo?.position}
            alt={props.client}
          ></div>
        ) : (
          <img
            className="publicity-card--image"
            src={image}
            alt={props.client}
          ></img>
        )}
        <div className="ad-card--content">
          <div className="ad-card--content-title">
            <Link to={`/ad/${props.id}/update`}>{props.client}</Link>
            {props.active ? (
              <CheckCircleTwoTone title="Activa" twoToneColor="#52c41a" />
            ) : null}
          </div>
          <div className="ad-card--content-price">$ {props.price}</div>
          {props.paymentDate && (
            <div className="ad-card--content-paymentDate">
              Fecha de pago: {moment(props.paymentDate).format("L")}
            </div>
          )}
          <div className="ad-card--content-description">
            Desde: {moment(props.startDate).format("L")} - Hasta:{" "}
            {moment(props.endDate).format("L")}
          </div>
          <Divider />
          <div className="ad-card--content-buttons">
            {props.active && <Button danger onClick={showDelete}>
              Desactivar
            </Button>}
            <Link to={`/ad/${props.id}/update`}>
              <Button>
                <EditOutlined title="Editar" twoToneColor="#52c41a" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdCard;
