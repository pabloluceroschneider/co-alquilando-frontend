import React from "react";
import { Card, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import { CheckCircleTwoTone, EditOutlined } from "@ant-design/icons";
import moment from "moment";

const AdCard = (props) => {
  console.log("props", props);
  console.log("props.endDate", moment(props.endDate).format("L"));
  return (
    <Card hoverable>
      <div className="pubicity-card--container">
        <img
          src="https://gastrofranchising.com/wp-content/uploads/2018/07/logo_franquicia_pizzeria_popular.jpg"
          alt={props.client}
        />
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
          <div className="ad-card--content-button-editar">
          <Link to={`/ad/${props.id}/update`}>
            <Button >
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
