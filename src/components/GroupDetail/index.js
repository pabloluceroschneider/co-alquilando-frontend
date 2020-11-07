import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../store";
import { useHistory, useParams } from "react-router-dom";
import ApiRequest from "../../util/ApiRequest";
import { Button, notification, Modal } from "antd";
import { StarFilled, SettingOutlined } from "@ant-design/icons";
import Avatar from '../Avatar';
import Notification from "../../classes/Notification"
import ConfigGroup from '../ConfigGroup';


const Item = ({ name, channel }) => {
  let { chat } = useParams()
  let history = useHistory();

  const handleClick = () => {
    history.push(`/groups/${name}/chat/${channel.channelId}/${channel.name}`);
  };

  return (
    <div className={`item clickeable selected-${chat===channel.channelId}`} onClick={handleClick}>
      <Avatar letter={channel.name[0]} />
      <div className="name-msg">
        <div className="name">{channel.name}</div>
        <div className="msg">{}</div>
      </div>
      <div className="time">{}</div>
    </div>
  );
};

const Votation = ({ group }) => {
  let history = useHistory();
  const votation = window.location.pathname.split("/").includes("votations")

  const handleClick = () => {
    history.push(`/groups/${group?.id}/votations`);
  };

  if (group?.name === 'Mis chats'){
    return <div></div>;
  }

  return (
    <div className={`item clickeable selected-${votation}`} onClick={handleClick}>
      <StarFilled />
      <div className="name-msg">
        <div>Votaciones</div>
      </div>
    </div>
  );
};

const AdminMenu = ({channels, adminId}) => {
  const [ showModal, setShowModal] = useState(false);
  const [acceptGroup, setAcceptGroup] = useState(null);
  const [propertyStatus, setPropertyStatus] = useState(null)
  const { chat } = useParams();
  let idproperty = chat.split("-")[2]
  let history = useHistory();
  const toggleShowModal = () => setShowModal(visible => !visible);

  useEffect(() => {
    let asyncGetUser = async () => {
      let { data } = await ApiRequest.get(`/property/${idproperty}`);
      let available = data.status === "available";
      setPropertyStatus(available);
    };
    asyncGetUser();
  }, [idproperty])

  const openModal = value => {
    setAcceptGroup(value);
    toggleShowModal();
  }

	const sendDecision = async resp => {
		let channel_data_array = channels[0]?.channelId.split('-');
		let bodyReq = {
			groupId: channel_data_array[0],
			decision: acceptGroup
    }

    let notificationBodyReq = new Notification(channel_data_array[3], adminId, "group_reject");

		await ApiRequest.put(`/property/${channel_data_array[2]}/decideGroup`, bodyReq).then(async res => {
			if (res.status === 200){
        if (!acceptGroup){
          await ApiRequest.post("/notifications/send", notificationBodyReq);
        }
				notification.success({
					message: `¡Tu respuesta fue enviada con éxito!`,
					placement: "bottomLeft",
				  });
			} else {
				notification.error({
					message: `Ocurrio un error al enviar la respuesta`,
					placement: "bottomLeft",
				  });
      }
      history.push("/groups");
		});
	}


  return (
    <div className="admin-buttons">
        <Button onClick={() => openModal(false)} danger>Rechazar Grupo</Button>
        { propertyStatus ? <Button onClick={() => openModal(true)} type="primary">Aceptar Grupo</Button> : null}
        <Modal 
          visible={showModal}
          onOk={() => sendDecision()}
          onCancel={toggleShowModal}
          title={ acceptGroup ? `Confirmar reserva` : `Rechazar reserva`}
          okText={ acceptGroup ? `Confirmar` : `Rechazar`}
          cancelText="Cancelar"
          destroyOnClose
          >
            {acceptGroup? (
              <div>
                <p>Estás confirmando a este grupo potenciales inquilinos de tu Propiedad.</p>
                <p>Al hacerlo, tu Propiedad pasará automaticamente al estado "Reservada".</p>
                <p>Cuando conformes el alquiler por Contrato, no olvides actualizar su estado a "Alquilada".</p>
              </div> )
            :(
              <div>
                <p>Estas rechazando la solicitud de este grupo.</p>
              </div>
            )}
          </Modal>
    </div>
  );
};

const Info = ( {detail, admin} ) => {
  const [showConfig, setShowConfig] = useState(false)
  const toggleConfig = () => setShowConfig(!showConfig)
  return (
    <div className="info">
      <div>{detail?.name}</div>
      { admin && detail?.name !== 'Mis chats' && <div className="cog" onClick={toggleConfig}><SettingOutlined /></div> }
      <Modal 
          visible={showConfig}
          onOk={toggleConfig}
          onCancel={toggleConfig}
          title={"Configuración de Grupo"}
          footer={false}
          destroyOnClose
          >
            <ConfigGroup detail={detail} />
          </Modal>
    </div>
  );
};

const GroupDetail = ({ detail, render }) => {
  const { state } = useContext(SessionContext);
  const { chat } = useParams();

  const adminSearh = (detalle) => {
    var res = false;
    detalle && detalle.channels &&
      detalle.channels.forEach((a) => {
        let adminIDarray = a.channelId.split("-");
        if (adminIDarray[3] === state.user.id) {
          res = true;
        }
      });
    return res;
  };
  
  let isAdmin = adminSearh(detail);
  return (
    <div className={`group-detail ${!!render}`}>
      <div className="container">
        <Info detail={detail} admin={detail?.adminId===state.user.id}/>

        { isAdmin ? 
          chat ? 
          <AdminMenu channels={detail?.channels} adminId={detail?.adminId} /> 
          : null
        : <Votation group={detail} />}

        {detail?.channels.length ? <div className="chats">
          {detail?.channels?.map((ch) => {
            return <Item key={ch.name} name={detail?.id} channel={ch} />;
          })}

        </div> : <div className="noChats">No tienes ningún chat aún</div>}

      </div>
    </div>
  );
};
export default GroupDetail;
