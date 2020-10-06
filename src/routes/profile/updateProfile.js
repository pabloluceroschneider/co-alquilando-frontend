import React, { useEffect, useState, useContext } from "react";
import { SessionContext } from '../../store'
import { useHistory } from "react-router-dom";
import { Form, notification } from "antd";
import CustomizedForm from "../../components/CustomizedForm";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import moment from "moment";
import provinces from '../../util/provinces'


const userData = {
  name: "user",
  layout: "vertical",
  btnSubmit: "Actualizar Datos",
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
          required:true,
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
          component: "Input",
        },
        {
          label: "Provincia",
          name: ["attributes", "city"],
          component: "Select",
          options: provinces
        },
      ],
      [
        {
          label: "Ocupación",
          name: ["attributes", "occupation"],
          component: "SelectDB",
          endpoint: '/occupation/all',
          search: 'occupation'
        },
        {
          label: "Descripción Personal",
          name: "userDescription",
          component: "Input.TextArea",
        },

      ],
      [
        {
          label: "Cargar Imagen",
          name: "photos",
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
  const history = useHistory();
  const { state } = useContext(SessionContext);
  const [photosUpdate, setPhotosUpdate] = useState(null);
  useEffect(() => {
    let asyncGetUser = async () => {
      await ApiRequest.get(`/user/${state.user.userNickname}`).then((res) => {
        let { data } = res;
        let attributes = {};

        if (data.attributes && data.attributes !== 'photos') {
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

  useEffect(() => {
    if (fields) {
      var attributes = Object.entries(fields.attributes);
      let arrayAttributes = [];
      attributes.map((t) => {
        return arrayAttributes.push({ attributeType: t[0], value: t[1] });
      });
      let bodyReq = { ...fields, attributes: arrayAttributes };
      delete bodyReq.userConfirmEmail;
      delete bodyReq.userConfirmPassword;
      delete bodyReq.photos;

      console.log("BODY", bodyReq);

      let asyncPutUser = new Promise(async (res, rej) => {
        await ApiRequest.put(`/user/${idUser}`, bodyReq).then((res) => {
          if (res.status === 200) {
            notification.success({
              message: `Datos Actualizados`,
              placement: "bottomLeft",
            });
          } else {
            notification.error({
              message: `Error: No se pudo actualizar sus datos`,
              placement: "bottomLeft",
            });
          }
        })


        if (fields && fields.photos && fields.photos.file) {
          var plist = fields.photos.file.fileList;

          const formData = new FormData();
          formData.append('type', 'file')
          let hasFile = false;
          for (const ph in plist) {
            hasFile = true;
            if (plist[ph].originFileObj) {
              let phLast = plist[ph].originFileObj
              formData.append("photos", phLast)
            }
          }

          let header = {
            'Content-Type': 'multipart/form-data'
          }

          if (hasFile) {
            await ApiRequest.multipartPut(`/user/${idUser}/photos`, formData, header).then((res) => {
              console.log(res);
              if (res.status === 200) {
                notification.success({
                  message: `Datos Actualizados`,
                  placement: "bottomLeft",
                });
              } else {
                notification.error({
                  message: `Error: No se pudo actualizar sus datos`,
                  placement: "bottomLeft",
                });
              }
            });
          }
        }
        res()
      }

      );
      asyncPutUser.then(() => {
        history.push(`/my-profile`);
      });
    }
  }, [fields, idUser, history]);


  /*useEffect(() => {
    if (fields && fields.photos && fields.photos.file) {
      var plist = fields.photos.file.fileList;

      const formData = new FormData();
      formData.append('type', 'file')
      let hasFile = false;
      for (const ph in plist) {
        hasFile = true;
        if (plist[ph].originFileObj) {
          let phLast = plist[ph].originFileObj
          formData.append("photos", phLast)
        }
      }

      let header = {
        'Content-Type': 'multipart/form-data'
      }

      if (hasFile) {
          let asyncPutUser = new Promise(async (res, rej) => {
          await ApiRequest.multipartPut(`/user/${idUser}/photos`, formData, header).then((res) => {
            console.log(res);
            if (res.status === 200) {
              notification.success({
                message: `Datos Actualizados`,
                placement: "bottomLeft",
              });
            } else {
              notification.error({
                message: `Error: No se pudo actualizar sus datos`,
                placement: "bottomLeft",
              });
            }
          });
          res()
        })
        asyncPutUser.then(() => {
          history.push(`/my-profile`);
        });
      }
    }
  }, [idUser, fields, history]);*/


  // Delete photos
  useEffect(() => {
    if (fields && fields.photos && fields.photos.file) {
      var listPhoto = fields.photos.file.fileList;
      console.log("photosUpdate -->", photosUpdate);
      console.log("listPhoto -->", listPhoto);

      var auxListPhoto = [];
      listPhoto.forEach((photo, index) => {
        if (!photo.originFileObj) {
          auxListPhoto.push(photo);
        }
      });
      console.log("auxListPhoto -->", auxListPhoto);

      auxListPhoto.forEach((photoAux, indexAux) => {
        photosUpdate.forEach((photo, index) => {
          console.log("photoAux -->", photoAux.name);
          console.log("photo -->", photo);

          if (photoAux.name === photo) {
            let asyncPutPhoto = async () => {
              console.log("Photo a eliminar: ", photo)
              await ApiRequest.delete(`/user/${idUser}/photos/${photo}`).then((res) => {
                console.log(res);
                if (res.status === 200) {
                  notification.success({
                    message: "Datos Actualizados",
                    placement: "bottomLeft",
                  });
                } else {
                  notification.error({
                    message: "Error: No se pudo actualizar sus datos",
                    placement: "bottomLeft",
                  });
                }
              });
            };
            asyncPutPhoto();
          }
        })
      })
    }
  }, [idUser, history, fields, photosUpdate]);

  return (
    <ContentWrapper topNav title="Actualizar Perfil">
      <CustomizedForm form={form} data={userData} onfinish={setFields} />
    </ContentWrapper>
  );
};

export default UpdateForm;
