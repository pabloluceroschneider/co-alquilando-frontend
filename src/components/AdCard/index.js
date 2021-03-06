import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { CheckCircleTwoTone } from "@ant-design/icons";

const AdCard = (props) => {
  return (
    <Card hoverable className="pubicity-card--container">
      <img
        src="https://gastrofranchising.com/wp-content/uploads/2018/07/logo_franquicia_pizzeria_popular.jpg"
        alt="pizzeria popular"
      />
      <div className="ad-card--content">
        <div className="ad-card--content-title">
          <Link to={`/ad/1/update`}>Pizzeria Popular</Link>
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        </div>
        <div className="ad-card--content-description">
          Desde: 06/03/2021 - Hasta: 06/12/2022
        </div>
      </div>
    </Card>
  );
};

export default AdCard;
