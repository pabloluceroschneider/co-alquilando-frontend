import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, notification } from "antd";
import CustomizedForm from "../../components/CustomizedForm";
import { ApiRequest } from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import moment from "moment";

const userData = {
  name: "user",
  layout: "vertical",
  btnSubmit: "Actualizar Datos",
  fields: {
    primaries: [
      [
        {
          label: "Nombre de usuario",
          name: "userNickname",
          component: "Input",
        },
      ],
      [
        {
          label: "Nombre",
          name: "userName",
          component: "Input",
          required: true,
        },
        {
          label: "Apellido",
          name: "userSurname",
          component: "Input",
          required: true,
        },
      ],
      [
        {
          label: "Email",
          name: "userEmail",
          component: "Input",
          required: true,
        },
        {
          label: "Confirme Email",
          name: "userConfirmEmail",
          component: "Input",
          required: true,
          dependencies: ["userEmail"],
          hasFeedback: true,
          validate: ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("userEmail") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Los emails no coinciden!");
            },
          }),
        },
      ],
      [
        {
          label: "Fecha de Nacimiento",
          name: "userBirthDate",
          component: "DatePicker",
        },
        {
          label: "Número de Celular",
          name: "userPhone",
          component: "Input",
        },
      ],
    ],
    secondaries: [
      [
        {
          label: "Documento de Identidad",
          name: "userDni",
          component: "Input",
        },
        {
          label: "Sexo",
          name: "userSex",
          component: "Select",
          options: [
            { name: "Femenino", value: "FEMALE" },
            { name: "Masculino", value: "MALE" },
            { name: "Otro", value: "NOT_DEFINED" },
          ],
        },
      ],
      [
        {
          label: "Nacionalidad",
          name: "userNationality",
          component: "Input",
        },
        {
          label: "Ciudad",
          name: "userCity",
          component: "Input",
        },
      ],
      [
        {
          label: "Descripción Personal",
          name: "userDescription",
          component: "Input.TextArea",
        },
        {
          label: "Cargar Imagen",
          name: "userPhoto",
          component: "Upload",
        },
      ],
    ],
  },
};

const UpdateForm = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState(null);
  const [idUser, setIdUser] = useState(null);
  let { nickname } = useParams();
  const history = useHistory();
  useEffect(() => {
    let asyncGetUser = async () => {
      await ApiRequest.get(`/user/${nickname}`).then((res) => {
        console.log(res.data);
        let formated = {
          ...res.data,
          userBirthDate: moment(res.data.userBirthDate),
          userConfirmEmail: res.data.userEmail,
        };
        form.setFieldsValue(formated);
        setIdUser(formated.id);
      });
    };
    asyncGetUser();
  }, [form, nickname]);
  useEffect(() => {
    if (fields) {
      let bodyReq = fields;
      delete bodyReq.userConfirmEmail;
      delete bodyReq.userConfirmPassword;
      let asyncPutUser = async () => {
        await ApiRequest.put(`/user/${idUser}`, bodyReq).then((res) => {
          console.log(res);
          if (res.status === 200) {
            notification.success({
              message: `Datos Actualizados`,
              placement: "bottomLeft",
            });
            history.push(`/profile/${bodyReq.userNickname}`);
          } else {
            notification.error({
              message: `Error: No se pudo actualizar sus datos`,
              placement: "bottomLeft",
            });
          }
        });
      };
      asyncPutUser();
    }
  }, [fields, idUser,history]);
  return (
    <div>
      <div>Hola mundo: {nickname}</div>
      <ContentWrapper header footer>
        <CustomizedForm form={form} data={userData} onfinish={setFields} />
      </ContentWrapper>
    </div>
  );
};

export default UpdateForm;
