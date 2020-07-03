import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiRequest } from "../../util/ApiRequest";
import { Button } from "antd";

const image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const Profile = (props) => {
  let { nickname } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const userData = ApiRequest.get(`/users/${nickname}`);
    setData(userData.data);
    console.log(data);
  }, [nickname, data]);

  return (
    <>
      <div className="profileContent">
        <div className="group2">
          <div className="imageContent">
            <img alt="imagen de perfil" src={image} className="profileImage" />
            <h2>
              <strong>Michael Scofield</strong>
            </h2>
            <h4>Córdoba - Argentina</h4>
          </div>
          <div className="datosContent">
            <p>Nickname: {nickname}</p>
            <p>Edad: 28</p>
            <p>Descripcion: Aqui va la Descripcion</p>
            <Button type="primary">Conectar</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
