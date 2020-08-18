import React, { useEffect, useState, useContext } from "react";
import { SessionContext } from '../../store';
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import calculateAge from "../../util/CalculateAge";


const image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

let genders = {
    "MALE": "Masculino",
    "FEMALE": "Femenino",
    "OTHER": "Otro"
}

const MyProfile = (props) => {
  const {state} = useContext(SessionContext);
  const [datos, setDatos] = useState(null);


  useEffect(() => {
    if (!datos) {
      const getUser = async () => {
        const { data } = await ApiRequest.get(`/user/${state.user.userNickname}`);
        let attr = [];
        data.attributes.forEach((t) => {
          attr = { ...attr, [t.attributeType]: t.value };
        });
        setDatos({ ...data, attributes: attr });
      };
      getUser();
    }
  }, [state, datos]);

  return (
    <ContentWrapper topNav>
      {datos ? (
        <div className="profileContent">
          <div className="profileGroup2">
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
                {datos.attributes.nationality} - {datos.attributes.city}
              </h4>
            </div>
          </div>
          <div className="datosContent">
            <div className="profileGroup3">
              <div>
                <p>Nickname: {state.user.userNickname}</p>
              </div>
              <div>
                <p>
                  Sexo:{" "}
                  {genders[datos.attributes.sex]}
                </p>
              </div>
              <div>
                <p>Edad: {calculateAge(datos.userBirthDate)}</p>
              </div>
            </div>
          </div>
          <div className="profileButton">
            <button className="buttonEdit"><a href="/my-profile/update">Editar Datos</a></button>
            <button className="buttonEdit"><a href="/my-profile/updatePreferencies">Editar Preferencias</a></button>
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

export default MyProfile;
