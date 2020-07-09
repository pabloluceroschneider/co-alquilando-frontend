import React from "react";
import { Form, notification } from "antd";
import CustomizedForm from "../../components/CustomizedForm";
import ContentWrapper from "../../components/ContentWrapper";


const propertyData = {
  name: "property",
  layout: "vertical",
  btnSubmit: "Registrar Propiedad",
  fields: {
    primaries: [
      [
        {
          label: "Descripción",
          name: "description",
          component: "Input",
          required: true,
        },
      ],
      [
        {
          label: "Dirección",
          name: ["attributes","address"],
          component: "Input",
          required: true,
        },
        {
          label: "Tipología",
          name: ["attributes","typology"],
          component: "Input",
          required: true,
        },
      ],
      [
        {
          label: "Habitaciones",
          name: ["attributes","rooms"],
          component: "Input",
          required: true,
        },
        {
          label: "Baños",
          name: ["attributes","bathrooms"],
          component: "Input",
          required: true,
        },
      ],
      [
        {
          label: "Cantidad de personas",
          name: ["attributes", "amountPeople"],
          component: "Input",
          required: true,
        },
        {
          label: "Precio",
          name: "monto",
          component: "Input",
          required: true,
        },
      ],
    ],
    secondaries: [
      [
        {
          label: "Comodidades",
          component: "h2",
        },
      ],
      [
        {
          label: "Gimnasio",
          name: ["attributes", "gym"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Pileta",
          name: ["attributes", "pool"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Playroom",
          name: ["attributes", "playroom"],
          valuePropName: "checked",
          component: "Checkbox",
        },
      ],
      [
        {
          label: "Asador",
          name: ["attributes", "roaster"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Cochera",
          name: ["attributes", "garage"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Balcón",
          name: ["attributes", "balcony"],
          valuePropName: "checked",
          component: "Checkbox",
        },
      ],
      [
        {
          label: "Ascensor",
          name: ["attributes", "elevator"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Amoblado Incluido",
          name: ["attributes", "furnished"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Aire acondicionado",
          name: ["attributes", "aa"],
          valuePropName: "checked",
          component: "Checkbox",
        },
      ],
      [
        {
          label: "Salon de usos múltiples",
          name: ["attributes", "sum"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Calefacción",
          name: ["attributes", "calefaction"],
          valuePropName: "checked",
          component: "Checkbox",
        },
        {
          label: "Acepta Mascotas",
          name: ["attributes", "pets"],
          valuePropName: "checked",
          component: "Checkbox",
        },
      ],
    ],
  },
};

const Property = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    
    var atributos = Object.entries(values.attributes)
    const attributesFormate = atributos.map((a) => {
      let json = {
        attribute: a[0],
        value: `"${a[1]}"`,
        weigth: 0
      }

      return json
    })

    let formatedBody = {...values, attributes: attributesFormate}

    console.log('Body =>', formatedBody);
    
    
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
