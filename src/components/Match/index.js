import React, { useContext } from "react";
import { Card, Avatar, Tag, notification, Modal } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import Notification from "../../classes/Notification";
import ApiRequest from "../../util/ApiRequest";
import { SessionContext } from "../../store";

const { Meta } = Card;

const handleTagCoincidence = (coincidence) => {
  if (coincidence >= 90) {
    return "green";
  }
  if (coincidence >= 70) {
    return "blue";
  }
};

const Description = ({ desc }) => {
  return (
    <div>
      <div>{desc}</div>
    </div>
  );
};

const Name = ({ name, coincidence }) => {
  return (
    <div className="name">
      <p>{name}</p>
      <Tag color={handleTagCoincidence(coincidence)}>
        {parseFloat(coincidence).toFixed(2)} %
      </Tag>
    </div>
  );
};

const UserCard = ({ user, coincidence }) => {
  const {
    photo,
    userNickname,
    userName,
    userSurname,
    userDescription,
    id,
  } = user;
  const { state } = useContext(SessionContext);
  const { confirm } = Modal;

  const handleConfirm = async () => {
    let bodyReq = new Notification(state.user.id, id, "group_send_invitation");
    await ApiRequest.post("/notifications/send", bodyReq);
    notification.success({
      message: `¡Tu solicitud fue enviada con éxito!`,
      placement: "bottomLeft",
    });
  };

  const handleConnect = () => {
    confirm({
      title: "¿Quieres enviar la solicitud de grupo?",
      okText: "Confirmar",
      className: "notificationModal",
      icon: <UsergroupAddOutlined />,
      content: `${userName} recibirá tu invitación`,
      onOk() {
        console.log("OK");
        handleConfirm();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const ViewProfile = ({ title }) => {
    return (
      <a href={`profile/${userNickname}`} rel="noopener noreferrer">
        {title}
      </a>
    );
  };

  return (
    <Card
      hoverable
      className="userCard"
      actions={[
        <span onClick={() => handleConnect()}>Conectar</span>,
        <ViewProfile key="viewProfile" title={"Ver Perfil"} />,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            src={photo?.photoId}
            style={{ backgroundColor: "#AED6F1", color: "#154360" }}
          >
            {" "}
            {userName[0].toUpperCase()}{" "}
          </Avatar>
        }
        title={
          <Name name={userName + " " + userSurname} coincidence={coincidence} />
        }
        description={
          <Description desc={userDescription} coincidence={coincidence} />
        }
      />
    </Card>
  );
};

export default UserCard;
