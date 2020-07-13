import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiRequest from "../../util/ApiRequest";
import calculateAge from "../../util/CalculateAge";
import { Button } from "antd";

const image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const Profile = (props) => {
  let { nickname } = useParams();
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    if (!datos) {
      const getUser = async () => {
        const {data} = await ApiRequest.get(`/user/${nickname}`);
        console.log('Data: ', data);
        let attr = []
        data.attributes.forEach( t => {
        attr = { ...attr, [t.attributeType]:t.value }
        })
        setDatos({...data, attributes: attr});
      };
      getUser();
    }
    console.log('Datos =>', datos);
  }, [nickname, datos]);

  

  return (
    <>
      {datos ? (
        <div className="profileContent">
          <div className="group2">
            <div className="imageContent">
              <img
                alt="imagen de perfil"
                src={image}
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
                {datos.userCity} - {datos.userNationality}
              </h4>
            </div>
          </div>
          <div className="datosContent">
            <div className="group3">
              <div>
                <p>Nickname: {nickname}</p>
              </div>
              <div>
                <p>
                  Sexo: {datos.userSex === "Male" ? "Masculino" : "Femenino"}
                </p>
              </div>
              <div>
                <p>Edad: {calculateAge(datos.userBirthDate)}</p>
              </div>
            </div>
          </div>
          <div className="profileButton">
            <Button id="buttonConectar">Conectar</Button>
          </div>
        </div>
      ) : null}

      {datos && datos.attributes ? (
        <div className="profileContent">
          <h3>Acerca de</h3>
          {datos.attributes.pets.value === "no" ? <p>Tengo mascotas</p>  : <p>No tengo mascotas</p> }
        </div>
      ) : null}

      {datos && datos.userDescription ? (
        <div className="profileContent">
          <h3>Más sobre {datos.userName}</h3>
          <p>{datos.userDescription}</p>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
