import React from "react";
import { Form, notification } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import CustomizedForm from "../../components/CustomizedForm";
import ContentWrapper from "../../components/ContentWrapper";

// propertyPreferences: Ubicacion, tipologia, habitaciones, 
// baño, sum, gym, pileta, playroom, asador, cochera, 
// balcon, ascensor, cantidad de personas por propiedad, 
// amoblado, aire acondicionado, calefaccion, acepta mascotas.

const propertyData = {
  name: "property",
  layout: "vertical",
  btnSubmit: "Registrar Propiedad",
  fields: {
    primaries: [
      [
        {
          label: "Título",
          name: "title",
          component: "Input",
          required: true,
        },
      ],
      [
        {
          label: "Dirección",
          name: "address",
          component: "Input",
          required: true,
        },
        {
          label: "Habitaciones",
          name: "rooms",
          component: "Input",
          required: true,
        },
      ],
      // [
      // 	{
      // 		label: "Comodidades",
      // 		name: "propertyAmenities",
      // 		component: "Checkbox",
      //   },
      //   {
      // 		label: "",
      // 		name: "propertyAmenities",
      // 		component: "Checkbox",
      //   },
      //   {
      // 		name: "propertyAmenities",
      // 		component: "Checkbox",
      //   },
      //   {
      // 		label: "",
      // 		name: "propertyAmenities",
      // 		component: "Checkbox",
      // 	},
      // ],
      [
        {
          label: "Tipo de Contrato",
          name: "propertyContract",
          component: "Select",
          options: [
            { name: "Dueño", value: "DUEÑO" },
            { name: "Inmobiliaria", value: "INMOBILIARIA" },
          ],
          required: true,
        },
        {
          label: "Precio",
          name: "propertyPrice",
          component: "Input",
          required: true,
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

const Property = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    notification.success({
      message: "Se cargo con éxito",
      description: "Se agrego correctamente la propiedad",
      placement: "bottomLeft",
    });
  };

  return (
    <ContentWrapper header footer>
      <CustomizedForm form={form} data={propertyData} onfinish={onFinish} />
    </ContentWrapper>
  );
};

export default Property;
