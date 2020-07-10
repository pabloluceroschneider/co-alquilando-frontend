import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, notification } from "antd";
import CustomizedForm from "../../components/CustomizedForm";
import { ApiRequest } from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import moment from "moment";

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
          label: "Tipología",
          name: ["attributes", "typology"],
          component: "Input",
          required: true,
        },
        {
          label: "Cantidad de personas",
          name: ["attributes", "amountPeople"],
          component: "Input",
          required: true,
        },
      ],
      [
        {
          label: "Habitaciones",
          name: ["attributes", "rooms"],
          component: "Input",
          required: true,
        },
        {
          label: "Baños",
          name: ["attributes", "bathrooms"],
          component: "Input",
          required: true,
        },
      ],
      [
        {
          label: "Dirección",
          component: "h2",
        },
      ],
      [
         {
           label: "Calle",
           name: ["address", "street"],
           component: "Input",
           required: true,
         },
         {
          label: "Número",
          name: ["address", "number"],
          component: "Input",
          required: true,
        },
        {
          label: "Barrio",
          name: ["address", "neighborhood"],
          component: "Input",
          required: true,
        },
      ],
      [
        {
          label: "Piso",
          name: ["address", "floor"],
          component: "Input",
        },
        {
          label: "Departamento",
          name: ["address", "apartment"],
          component: "Input",
        },
        {
          label: "Provincia",
          name: ["address", "province"],
          component: "Input",
          required: true,
        },
      ]
      ,
      [
        {
          label: "Precio",
          component: "h2",
        },
      ],
      [
        {
          label: "Monto",
          name: ["price","rentPrice"],
          component: "Input",
          required: true,
        },
        {
          label: "Expensas",
          name: ["price","expenses"],
          component: "Input",
          required: true,
        },
        {
          label: "Servicios",
          name: ["price","services"],
          component: "Input",
          
        },
        {
          label: "Impuestos",
          name: ["price","taxes"],
          component: "Input",
          
        },
      ],
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

const FormPropertyUpdate = (props) => {
  let { idProperty } = useParams();
  const [form] = Form.useForm();
  const [fields, setFields] = useState(null);
  const history = useHistory();
  useEffect(() => {
    let asyncGetUser = async () => {
      await ApiRequest.get(`/property/${idProperty}`).then((res) => {
        let data = res.data
        console.log(data);
        let array = [];
        res.data.attributes.forEach((t) => {
          array.push({ [t.attributeType]: t.value });
        });
        delete  res.data.attributes;
        array.forEach((t) => {
          res.data = { ...res.data, attributes: { ...res.data.attributes, ...t } };
        });
        console.log(res.data);
        //[{"typology":"departamento"},{"gym":"1"}]
        form.setFieldsValue(res.data);
      });
    };
    asyncGetUser();
  }, [form, idProperty]);
  
  return (
    <div>
      <div>Hola mundo: {idProperty}</div>
      <ContentWrapper header footer>
        <CustomizedForm form={form} data={propertyData} onfinish={setFields} />
      </ContentWrapper>
    </div>
  );
};

export default FormPropertyUpdate;
