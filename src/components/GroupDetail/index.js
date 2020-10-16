import React, { useState, useContext } from "react";
import { SessionContext } from "../../store";
import { useHistory, useParams } from "react-router-dom";
import ApiRequest from "../../util/ApiRequest";
import { Button, notification, Modal } from "antd";
import { StarFilled, SettingOutlined } from "@ant-design/icons";
import Avatar from '../Avatar';
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
    history.push(`/groups/${group}/votations`);
  };
  return (
    <div className={`item clickeable selected-${votation}`} onClick={handleClick}>
      <StarFilled />
      <div className="name-msg">
        <div>Votaciones</div>
      </div>
    </div>
  );
};

const AdminMenu = ({channels}) => {
  const [ showModal, setShowModal] = useState(false);
  const [acceptGroup, setAcceptGroup] = useState(null)
  let history = useHistory();
  const toggleShowModal = () => setShowModal(visible => !visible);

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
		await ApiRequest.put(`/property/${channel_data_array[2]}/decideGroup`, bodyReq).then(res => {
			if (res.status === 200){
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
        <Button onClick={() => openModal(true)} type="primary">Aceptar Grupo</Button>
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

const Info = ({ detail, admin }) => {
  const [showConfig, setShowConfig] = useState(false)
  const toggleConfig = () => setShowConfig(!showConfig)
  return (
    <div className="info">
      <div>{detail?.name}</div>
      { admin && <div className="cog" onClick={toggleConfig}><SettingOutlined /></div> }
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

  const adminSearh = (detalle) => {
    var res = false;
    detalle != null &&
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
        <Info detail={detail} admin={detail?.adminId===state.user.id} />
        {isAdmin ? <AdminMenu channels={detail?.channels} /> : <Votation group={detail?.id} />}
        <div className="chats">
          {detail?.channels?.map((ch) => {
            return <Item key={ch.name} name={detail?.id} channel={ch} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default GroupDetail;
