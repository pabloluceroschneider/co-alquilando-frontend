import React from "react";
import {
  Card,
  Tag,
} from "antd";
import Avatar from '../Avatar'
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
      {
        coincidence && 
        <Tag color={handleTagCoincidence(coincidence)}>
          {parseFloat(coincidence).toFixed(2)} %
        </Tag>
      }
    </div>
  );
};

const UserCard = ({ user, coincidence } ) => {

  const ViewProfile = ({ title }) => {
    return (
      <a href={`profile/${user?.userNickname}`} rel="noopener noreferrer">
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
        avatar={ <Avatar user={user} letter={user?.userName[0].toUpperCase()} url={ user?.photos ? `http://localhost:8080/user/${user?.id}/photos/${user?.photos[0]}` : null} />}
        title={
          <Name name={user?.userName + " " + user?.userSurname} coincidence={coincidence} />
        }
        description={
          <Description desc={user?.userDescription} coincidence={coincidence} />
        }
      />
    </Card>
  );
};

export default UserCard;
