import React, { useEffect, useState } from "react";
import ContentWrapper from "../../components/ContentWrapper";
import CustomizedForm from "../../components/CustomizedForm";
import { Form, notification } from "antd";
import { useParams, useHistory } from "react-router-dom";
import ApiRequest from "../../util/ApiRequest";

const userPreferenciesRoomie = {
  name: "user",
  layout: "vertical",
  btnSubmit: "Actualizar Preferencias de Roomie",
  className: "userPreferencies",
  fields: {
    primaries: [
      [
        {
          label: "Preferencias de Roomie",
          component: "h2",
        },
      ],
      [
        {
          label: "Sexo",
          name: ["roommatePreferences", "sex"],
          component: "Select",
          options: [
            { name: "Femenino", value: "FEMALE" },
            { name: "Masculino", value: "MALE" },
            { name: "Otro", value: "NOT_DEFINED" },
          ],
        },
        {
          label:"Edad",
          name:["roommatePreferences", "edad"],
          component:"slider",
        }
        // {
        //   label: "Edad Minima",
        //   name: ["roommatePreferences", "minAge"],
        //   component: "Input",
        // },
        // {
        //   label: "Edad Máxima",
        //   name: ["roommatePreferences", "maxAge"],
        //   component: "Input",
        // },
      ],
      [
        {
          label: "Nacionalidad",
          name: ["roommatePreferences", "nationality"],
          component: "Input",
        },
        {
          label: "Ciudad",
          name: ["roommatePreferences", "city"],
          component: "Input",
        },
      ],
      [
        {
          label: "Ocupación",
          name: ["roommatePreferences", "occupation"],
          component: "Input",
        },
        {
          label: "Mascotas",
          name: ["roommatePreferences", "pets"],
          valuePropName: "checked",
          component: "Checkbox",
        },
      ],
    ],
  },
};

const userPreferenciesProperty = {
  name: "user",
  layout: "vertical",
  btnSubmit: "Actualizar Preferencias de Propiedad",
  className: "userPreferencies",
  fields: {
    primaries: [
      [
        {
          label: "Preferencias de Propiedad",
          component: "h2",
        },
      ],
      [
        {
          label: "Barrio",
          name: ["propertyPreferences", "address"],
          component: "Input",
        },
        {
          label: "Tipología",
          name: ["propertyPreferences", "typology"],
          component: "Select",
          options: [
            { name: "Departamento", value: "APARMENT" },
            { name: "Casa", value: "HOUSE" },
            { name: "Otro", value: "NOT_DEFINED" },
          ],
        },
      ],
      [
        {
          label: "Habitaciones",
          name: ["propertyPreferences", "rooms"],
          component: "Input",
        },
        {
          label: "Baños",
          name: ["propertyPreferences", "bathrooms"],
          component: "Input",
        },
      ],
      [
        {
          label: "Gimnasio",
          name: ["propertyPreferences", "gym"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Pileta",
          name: ["propertyPreferences", "pool"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Playroom",
          name: ["propertyPreferences", "playroom"],
          valuePropName: "checked",
          component: "Checkbox",
        },
      ],
      [
        {
          label: "Asador",
          name: ["propertyPreferences", "roaster"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Cochera",
          name: ["propertyPreferences", "garage"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Balcón",
          name: ["propertyPreferences", "balcony"],
          valuePropName: "checked",
          component: "Checkbox",
        },
      ],
      [
        {
          label: "Ascensor",
          name: ["propertyPreferences", "elevator"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Amoblado Incluido",
          name: ["propertyPreferences", "furnished"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Aire acondicionado",
          name: ["propertyPreferences", "aa"],
          valuePropName: "checked",
          component: "Checkbox",
        },
      ],
      [
        {
          label: "Salon de usos múltiples",
          name: ["propertyPreferences", "sum"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Calefacción",
          name: ["propertyPreferences", "calefaction"],
          valuePropName: "checked",
          component: "Checkbox",
        },
      ],
    ],
  },
};

const UpdatePreferenciesForm = (props) => {
  const [formRoom] = Form.useForm();
  const [formProp] = Form.useForm();
  const [fieldsRoom, setFieldsRoom] = useState(null);
  const [fieldsProp, setFieldsProp] = useState(null);
  let { nickname } = useParams();
  const [idUser, setIdUser] = useState(null);
  useEffect(() => {
    let asyncGetUser = async () => {
      await ApiRequest.get(`/user/${nickname}`).then((res) => {
        let { data } = res;
        setIdUser(data.id);
        data = data.preferences;
        let arrayRoommate = [];
        let arrayProperty = [];
        if (data) {
          if (data.roommatePreferences) {
            data.roommatePreferences.attributes.forEach((t) => {
              arrayRoommate.push({ [t.attributeType]: t.value });
            });
            delete data.roommatePreferences;
            arrayRoommate.forEach((t) => {
              data = {...data,
                roommatePreferences: { ...data.roommatePreferences, ...t },
              };
            });
            console.log(data);
            formRoom.setFieldsValue(data);
          }
          if (data.propertyPreferences) {
            data.propertyPreferences.attributes.forEach((t) => {
              arrayProperty.push({ [t.attributeType]: t.value });
            });
            delete data.propertyPreferences;
            arrayProperty.forEach((t) => {
              data = {
                ...data,
                propertyPreferences: { ...data.propertyPreferences, ...t },
              };
            });
            formProp.setFieldsValue(data);
          }
        }
      });
    };
    asyncGetUser();
  }, [formRoom, nickname, formProp]);
  useEffect(() => {
    if (fieldsRoom) {
      console.log("RoommatePreferences => ", fieldsRoom);
      var preferencesRoomate = Object.entries(fieldsRoom.roommatePreferences);
      preferencesRoomate = preferencesRoomate.filter((t) => t[1]);
      const attributes = preferencesRoomate.map((a) => {
        return { attributeType: a[0], value: a[1], weigth: 0 };
      });
      let bodyReq = { attributes };
      console.log(bodyReq);
      let asyncPutUser = async () => {
        await ApiRequest.put(
          `/user/preferences/roommate/${idUser}`,
          bodyReq
        ).then((res) => {
          console.log(res);
          if (res.status === 200) {
            notification.success({
              message: `Datos Actualizados`,
              placement: "bottomLeft",
            });
            //history.push(`/profile/${bodyReq.userNickname}`);
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
  }, [fieldsRoom, idUser]);
  useEffect(() => {
    if (fieldsProp) {
      console.log("PropertyPreferences => ", fieldsProp);
      var preferencesProperty = Object.entries(fieldsProp.propertyPreferences);
      preferencesProperty = preferencesProperty.filter((t) => t[1]);
      const attributes = preferencesProperty.map((a) => {
        return { attributeType: a[0], value: a[1], weigth: 0 };
      });
      let bodyReq = { attributes };
      console.log(bodyReq);
      let asyncPutUser = async () => {
        await ApiRequest.put(
          `/user/preferences/property/${idUser}`,
          bodyReq
        ).then((res) => {
          console.log(res);
          if (res.status === 200) {
            notification.success({
              message: `Datos Actualizados`,
              placement: "bottomLeft",
            });
            //history.push(`/profile/${bodyReq.userNickname}`);
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
  }, [fieldsProp, idUser]);
  return (
    <ContentWrapper header footer>
      <CustomizedForm
        form={formRoom}
        data={userPreferenciesRoomie}
        onfinish={setFieldsRoom}
      />
      <CustomizedForm
        form={formProp}
        data={userPreferenciesProperty}
        onfinish={setFieldsProp}
      />
    </ContentWrapper>
  );
};

export default UpdatePreferenciesForm;
