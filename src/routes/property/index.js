import React, { useState, useEffect } from "react";
import { ApiRequest } from "../../util/ApiRequest";
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
          name: ["attributes", "address"],
          component: "Input",
          required: true,
        },
        {
          label: "Tipología",
          name: ["attributes", "typology"],
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
          label: "Cantidad de personas",
          name: ["attributes", "amountPeople"],
          component: "Input",
          required: true,
        },
        {
          label: "Precio",
          name: "price",
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

const usePostProperty = (values) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (values) {
      var atributos = Object.entries(values.attributes);
      const attributesFormate = atributos.map((a) => {
        let json = {
          attribute: a[0],
          value: `"${a[1]}"`,
          weigth: 0,
        };
        return json;
      });

      let formatedBody = { ...values, attributes: attributesFormate };

      let bodyReq = formatedBody;
      let asyncPost = async () => {
        try {
          let ok = await ApiRequest.post("/property", bodyReq);
          setResponse(ok);
        } catch (e) {
          notification.error({
            message: `Error: ${e.message}`,
            placement: "bottomLeft",
          });
        }
      };
      asyncPost();
    }
  }, [values]);
  return response;
};

const Property = () => {
  const [values, setValues] = useState(null);
  const [form] = Form.useForm();

  let property = usePostProperty(values);

  useEffect(() => {
    if (property) {
      console.log(property);
      notification.success({
        message: `Prpiedad Publicada`,
        placement: "bottomLeft",
      });
    }
  }, [property]);

  return (
    <ContentWrapper header footer>
      <CustomizedForm form={form} data={propertyData} onfinish={setValues} />
    </ContentWrapper>
  );
};

export default Property;
