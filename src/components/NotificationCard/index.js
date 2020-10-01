import React from "react";
import { Card, notification, Avatar } from "antd";
import ApiRequest from "../../util/ApiRequest";
import Notification from "../../classes/Notification";
import { CloseCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";

const { Meta } = Card;

let notification_types = {
  group_decline_invitation: "Invitación Rechazada",
  group_accept_invitation: "Invitación Aceptada",
  group_send_invitation: "Invitación de Grupo",
};

const Description = ({ desc }) => {
  return (
    <div>
      <div>{notification_types[desc]}</div>
    </div>
  );
};

const Name = ({ name, userNickname }) => {
  return (
    <a href={`profile/${userNickname}`} rel="noopener noreferrer">
      {name}
    </a>
  );
};

const NotificationCard = (props) => {
  const response = async (type) => {
    let bodyReq = new Notification(props.to, props.from, type);
    await ApiRequest.post("/notifications/send", bodyReq);
    notification.success({
      message: `¡Tu respuesta fue enviada con éxito!`,
      placement: "bottomLeft",
    });
  };

  const actions = {
    group_send_invitation: [
      <span
        onClick={() => {
          response("group_accept_invitation");
        }}
      >
        <CheckCircleTwoTone className="responseButton" twoToneColor="#52c41a" />
      </span>,
      <span
        onClick={() => {
          response("group_decline_invitation");
        }}
      >
        <CloseCircleTwoTone className="responseButton" twoToneColor="#FB8888" />
      </span>,
    ],
  };

  return (
    <Card
      hoverable
      className={`notificationCard ${props.type}`}
      actions={actions[props.type]}
    >
      <Meta
        avatar={
          <Avatar
            src={props.userFrom.photo?.photoId}
            style={{ backgroundColor: "#AED6F1", color: "#154360" }}
          >
            {" "}
            {props.userFrom.userName[0].toUpperCase()}{" "}
          </Avatar>
        }
        title={
          <Name
            name={props.userFrom.userName + " " + props.userFrom.userSurname}
            userNickname={props.userFrom.userNickname}
          />
        }
        description={<Description desc={props.type} />}
      />
    </Card>
  );
};

export default NotificationCard;
