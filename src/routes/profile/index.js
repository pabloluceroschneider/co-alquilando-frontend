import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiRequest } from "../../util/ApiRequest";
import calculateAge from "../../util/CalculateAge";
import { Button } from "antd";

const image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const Profile = (props) => {
  let { nickname } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      const getUser = async () => {
        const userData = await ApiRequest.get(`/user/${nickname}`);
        setData(userData.data);
      };
      getUser();
    }
  }, [nickname, data]);

  return (
    <>
      {data ? (
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
                  {data.userName} {data.userSurname}
                </strong>
              </h2>
              <h4>
                {data.userCity} - {data.userNationality}
              </h4>
              </div>
              </div>
            <div className="datosContent">
              <p>Nickname: {nickname}</p>
              <p>Sexo: {data.userSex === "Male" ? "Masculino" : "Femenino"}</p>
              <p>Edad: {calculateAge(data.userBirthDate)}</p>
              <p>Descripcion: {data.userDescription}</p>
            </div>
            <div className="profileButton">
              <Button id="buttonConectar">Conectar</Button>
            </div>
          
        </div>
      ) : null}
    </>
  );
};

export default Profile;
