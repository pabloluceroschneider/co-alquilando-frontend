import React from "react";
import {
  Card,
  Avatar,
  Tag,
} from "antd";
import ModalGroup from "../ModalGroup";

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
        <ModalGroup user={user} itemTitle="name" />,
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
