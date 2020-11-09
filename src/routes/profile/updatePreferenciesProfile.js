import React, { useEffect, useState, useContext } from "react";
import { SessionContext } from "../../store";
import ContentWrapper from "../../components/ContentWrapper";
import CustomizedForm from "../../components/CustomizedForm";
import { Form, notification } from "antd";
import { useHistory } from "react-router-dom";
import ApiRequest from "../../util/ApiRequest";
import provinces from "../../util/provinces.js";

const userPreferenciesRoomie = {
  name: "user",
  layout: "vertical",
  btnSubmit: "Actualizar Preferencias de Coinquilino",
  fields: {
    primaries: [
      [
        {
          label: "Preferencias de Coinquilino",
          component: "h2",
        },
      ],
      [
        {
          content: [
            "Aquí podras cargar tus preferencias con respecto tus potenciales coinquilinos, para que podamos ayudarte a encontrarlo.",
          ],
          name: ["info"],
          component: "multiple-line",
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
          label: "Ocupación",
          name: ["roommatePreferences", "occupation"],
          component: "SelectDB",
          endpoint: "/occupation/all",
          search: "occupation",
        },
      ],
      [
        {
          label: "Nacionalidad",
          name: ["roommatePreferences", "nationality"],
          component: "SelectDB",
          endpoint: "/nationality/all",
          search: "nationality",
        },
        {
          label: "Provincia",
          name: ["address", "province"],
          component: "Select",
          options: provinces,
        },
      ],
      [
        {
          label: "Edad",
          name: ["roommatePreferences", "age"],
          component: "slider",
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
					name: ["address", "neighborhood"],
					component: "SelectDB",
					endpoint: "/location/all",
					search: "neighborhood",
					required: true,
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
  const [idUser, setIdUser] = useState(null);
  const history = useHistory();
  const { state } = useContext(SessionContext);
  const breadscrumb = [
    { "Mi Perfil": "/my-profile" },
    { "Mi Preferencias": "/my-profile/updatePreferencies" },
  ];
  useEffect(() => {
    let asyncGetUser = async () => {
      await ApiRequest.get(`/user/${state.user.userNickname}`).then((res) => {
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
            let rangeAge = [0, 0];
            arrayRoommate.forEach((t) => {
              if (Object.keys(t)[0] === "minAge") {
                rangeAge[0] = Object.values(t)[0];
              }
              if (Object.keys(t)[0] === "maxAge") {
                rangeAge[1] = Object.values(t)[0];
              } else {
                data = {
                  ...data,
                  roommatePreferences: { ...data.roommatePreferences, ...t },
                };
              }
            });
            data = {
              ...data,
              roommatePreferences: {
                ...data.roommatePreferences,
                age: rangeAge,
              },
            };
            delete data.roommatePreferences.minAge;
            delete data.roommatePreferences.maxAge;
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
  }, [formRoom, state, formProp]);
  useEffect(() => {
    if (fieldsRoom) {
      var preferencesRoomate = Object.entries(fieldsRoom.roommatePreferences);
      preferencesRoomate = preferencesRoomate.filter((t) => t[1]);
      let attributes = [];
      preferencesRoomate.map((a) => {
        if (a[0] === "age") {
          return (attributes = [
            ...attributes,
            { attributeType: "minAge", value: a[1][0] },
            { attributeType: "maxAge", value: a[1][1] },
          ]);
        } else {
          return (attributes = [
            ...attributes,
            { attributeType: a[0], value: a[1], weigth: 0 },
          ]);
        }
      });
      let bodyReq = { attributes };
      let asyncPutUser = async () => {
        await ApiRequest.put(
          `/user/preferences/roommate/${idUser}`,
          bodyReq
        ).then((res) => {
          if (res.status === 200) {
            notification.success({
              message: `Preferencias de Coinquilino Actualizadas`,
              placement: "bottomLeft",
            });
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
      var preferencesProperty = Object.entries(fieldsProp.propertyPreferences);
      preferencesProperty = preferencesProperty.filter((t) => t[1]);
      const attributes = preferencesProperty.map((a) => {
        return { attributeType: a[0], value: a[1], weigth: 0 };
      });
      let bodyReq = { attributes };
      let asyncPutUser = async () => {
        await ApiRequest.put(
          `/user/preferences/property/${idUser}`,
          bodyReq
        ).then((res) => {
          if (res.status === 200) {
            notification.success({
              message: `Preferencias de Propiedades Actualizadas`,
              placement: "bottomLeft",
            });
            history.push(`/my-profile`);
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
  }, [fieldsProp, idUser, history, state]);
  return (
    <ContentWrapper topNav breadscrumb={breadscrumb}>
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
