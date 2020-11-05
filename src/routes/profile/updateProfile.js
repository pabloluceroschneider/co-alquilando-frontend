import React, { useEffect, useState, useContext } from "react";
import { SessionContext, SIGN_IN, SIGN_OUT } from "../../store";
import { useHistory } from "react-router-dom";
import { Form, notification } from "antd";
import CustomizedForm from "../../components/CustomizedForm";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import moment from "moment";
import provinces from "../../util/provinces";
import { Auth } from "aws-amplify";
import User from '../../classes/User';

const userData = {
  name: "user",
  layout: "vertical",
  btnSubmit: "Actualizar Datos",
  btnDelete: "Eliminar perfil",
  titleDelete: "Eliminar perfil",
  deleteContentModal:
    "¿Desea eliminar este perfil de usuario? Si selecciona 'Aceptar', no podrá recuperar su cuenta.",
  fields: {
    primaries: [
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
          required: true,
        },
        {
          label: "Número de Celular",
          name: "userPhone",
          component: "Input",
        },
      ],
      [
        {
          label: "Documento de Identidad",
          name: "userDni",
          component: "Input",
        },
        {
          label: "Sexo",
          name: ["attributes", "sex"],
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
          name: ["attributes", "nationality"],
          component: "SelectDB",
          endpoint: "/nationality/all",
          search: "nationality",
        },
        {
          label: "Provincia",
          name: ["attributes", "city"],
          component: "Select",
          options: provinces,
        },
      ],
      [
        {
          label: "Ocupación",
          name: ["attributes", "occupation"],
          component: "SelectDB",
          endpoint: "/occupation/all",
          search: "occupation",
        },
        {
          label: "Tengo Mascotas",
          name: ["attributes", "pets"],
          component: "Select",
          options: [
            { name: "Si", value: "true" },
            { name: "No", value: "False" },
          ],
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
          name: "photos",
          component: "Upload",
          aspect: 1/1
        },
      ],
    ],
  },
};
const UpdateForm = (props) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const history = useHistory();
  const { state, dispatch } = useContext(SessionContext);
  const [photosUpdate, setPhotosUpdate] = useState(null);
  const breadscrumb = [
    { "Mi Perfil": "/my-profile" },
    { "Actualizar Mi Perfil": "/my-profile/update" },
  ];

  useEffect(() => {
    let asyncGetUser = async () => {
      await ApiRequest.get(`/user/${state.user.userNickname}`).then((res) => {
        let { data } = res;
        let attributes = {};

        if (data.attributes && data.attributes !== "photos") {
          data.attributes.forEach((t) => {
            attributes = { ...attributes, [t.attributeType]: t.value };
          });
        }
        let formated = {
          ...data,
          userBirthDate: data.userBirthDate ? moment(data.userBirthDate) : null,
          userConfirmEmail: data.userEmail,
        };
        delete formated.attributes;
        formated = { ...formated, attributes };
        form.setFieldsValue(formated);
        setIdUser(formated.id);
        setPhotosUpdate(res.data.photos);
      });
    };
    asyncGetUser();
  }, [form, state, idUser, history]);


  let updateProfile = async fields => {
    let updatePhotoPromise = new Promise( async (res,rej) => {
      try {
        if(!fields.photos.file) res()
        let plist = fields.photos.file.fileList;
        const formData = new FormData();
        formData.append("type", "file");
        let hasFile = false;
        for (const ph in plist) {
            if (plist[ph].originFileObj) {
            hasFile = true;
            let phLast = plist[ph].originFileObj;
            console.log(plist[ph])
            formData.append("photos", phLast);
            }
        }
        if(!hasFile) res()
        await ApiRequest.multipartPut(`/user/${idUser}/photos`, formData)
        res()
      } catch (error) {
        rej(error)
      }
    })
    updatePhotoPromise.then(()=>{
      let deletePhotoPromise = new Promise( async (res,rej) => {
        try {
          photosUpdate.forEach( async photo => {
            let find = fields.photos.file.fileList.find( t => t.name === photo )
            if(!find){
                await ApiRequest.delete(`/user/${idUser}/photos/${photo}`)
            }
          })
          res()
        } catch (error) {
          rej(error)
        }
      })
      deletePhotoPromise.then(()=>{
        let updateDataProfile = new Promise( async (res,rej) => {
          try {
            let user = new User(fields).mapFormToUpdate();
            let { data } = await ApiRequest.put(`/user/${idUser}`, user)
            res(data)
          } catch (error) {
            rej(error)
          }
        })
        updateDataProfile.then( async (data) => {
          notification.success({
            message: `Datos Actualizados con éxito`,
            placement: "bottomLeft",
          })
          if(data.photos.length > 1){
            data = {...data, photos: [data.photos[1]]}
          }
          await dispatch( SIGN_IN(data) );
          history.push("/my-profile");
        }).catch(e => {
        notification.error({
          message: `Error: No se pudo actualizar sus datos`,
          placement: "bottomLeft",
        });
      })
      }).catch(e =>{
        notification.error({
          message: `Error: No se pudo actualizar sus datos`,
          placement: "bottomLeft",
        });
      })
    }).catch(e=>{
      notification.error({
        message: `Error: No se pudo actualizar sus datos`,
        placement: "bottomLeft",
      });
    })

  }

  const onDelete = async () => {
    await ApiRequest.delete(`/user/${idUser}`).then((res) => {
      Auth.signOut();
      dispatch(SIGN_OUT());
      history.push("/");
    });
  };

  return (
    <ContentWrapper topNav breadscrumb={breadscrumb}>
      <CustomizedForm
        form={form}
        data={userData}
        onfinish={updateProfile}
        onDelete={onDelete}
      />
    </ContentWrapper>
  );
};

export default UpdateForm;
