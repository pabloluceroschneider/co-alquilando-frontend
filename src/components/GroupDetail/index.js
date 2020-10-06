import React, { useState, useEffect, useContext } from "react";
import { Avatar, Button, notification } from "antd";
import { useHistory } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import ApiRequest from "../../util/ApiRequest";
import { SessionContext } from "../../store";

const Item = ({ name, channel }) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(`/groups/${name}/chat/${channel.channelId}`);
  };

  function date() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    return h + ":" + m;
  }
  return (
    <div className="item clickeable seleccionable" onClick={handleClick}>
      <Avatar />
      <div className="name-msg">
        <div className="name">{channel.name}</div>
        <div className="msg">{}</div>
      </div>
      <div className="time">{date()}</div>
    </div>
  );
};

const Votation = ({ group }) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(`/groups/${group}/votations`);
  };
  return (
    <div className="item clickeable" onClick={handleClick}>
      <StarFilled />
      <div className="name-msg">
        <div>Votaciones</div>
      </div>
    </div>
  );
};

const AdminMenu = ({channels}) => {
	const onclick = async resp => {
		let channel_data_array = channels[0]?.channelId.split('-');
		let bodyReq = {
			groupId: channel_data_array[0],
			decision: resp === 'accept_group' ? true : false
		}
		await ApiRequest.put(`/property/${channel_data_array[2]}/decideGroup`, bodyReq).then(res => {
			if (res.state == 200){
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
		});
	}


  return (
    <div className="admin-buttons">
        <Button onClick={() => {onclick('accept_group')}}>Aceptar Grupo</Button>
        <Button onClick={() => {onclick('decline_group')}}>Rechazar Grupo</Button>
    </div>
  );
};

const Info = ({ name }) => {
  return (
    <div className="info">
      <div>{name}</div>
    </div>
  );
};

const GroupDetail = ({ detail, render, group }) => {
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
        <Info name={detail?.name} />
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
