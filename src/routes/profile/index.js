import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ApiRequest from "../../util/ApiRequest";
import calculateAge from "../../util/CalculateAge";
import ContentWrapper from "../../components/ContentWrapper";
import { Button, Modal, notification } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import Notification from "../../classes/Notification";
import { SessionContext } from "../../store";

const image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

let genders = {
  MALE: "Masculino",
  FEMALE: "Femenino",
  OTHER: "Otro",
};

const Profile = (props) => {
  let { nickname } = useParams();
  const [datos, setDatos] = useState(null);
  const { state } = useContext(SessionContext);

  const { confirm } = Modal;

  const handleConfirm = async () => {
    let bodyReq = new Notification(
      state.user.id,
      datos.id,
      "group_send_invitation"
    );
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
      content: `${datos.userName} recibirá tu invitación`,
      onOk() {
        handleConfirm();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    if (!datos) {
      const getUser = async () => {
        const { data } = await ApiRequest.get(`/user/${nickname}`);
        let attr = [];
        if (data.attributes) {
          data.attributes.forEach((t) => {
            attr = { ...attr, [t.attributeType]: t.value };
          });
        }
        setDatos({ ...data, attributes: attr });
        
      };
      getUser();
    }
  }, [nickname, datos]);

  return (
    <ContentWrapper topNav>
      {datos ? (
        <div className="profileContent">
          <div className="profileGroup2">
            <div className="imageContent">
              <img
                alt="imagen de perfil"
                src={datos?.photo ? `http://localhost:8080/user/${datos.id}/photos/${datos.photo[0]}`
                : image}
                className="profileImage"
              />
            </div>
            <div className="profileMainData">
              <h2>
                <strong>
                  {datos.userName} {datos.userSurname}
                </strong>
              </h2>
              <h4>
                {datos.attributes.nationality} - {datos.attributes.city}
              </h4>
            
            <div>
              <p>
                <b>Nickname:</b> {nickname}
              </p>
            </div>
            <div>
              <p>
                <b>Sexo:</b> {genders[datos.attributes.sex]}
              </p>
            </div>
            <div>
              <p>
                <b>Edad:</b> {calculateAge(datos.userBirthDate)}
              </p>
            </div>
            </div>
          </div>
          <div className="profileButton">
            <Button onClick={() => handleConnect()}>Conectar</Button>
          </div>
        </div>
      ) : null}

      {datos && datos.attributes ? (
        <div className="profileContent">
          <h3>Acerca de</h3>
          <div className="profileGroup2">
            {datos.attributes.pets === "true" ? (
              <p>Tengo mascotas</p>
            ) : (
              <p>No tengo mascotas</p>
            )}
            {datos.attributes.occupation ? (
              <p>Ocupación: {datos.attributes.occupation} </p>
            ) : (
              <p>Sin Ocupación</p>
            )}
          </div>
        </div>
      ) : null}

      {datos && datos.userDescription ? (
        <div className="profileContent">
          <h3>Más sobre {datos.userName}</h3>
          {datos.userDescription}
        </div>
      ) : null}
    </ContentWrapper>
  );
};

export default Profile;
