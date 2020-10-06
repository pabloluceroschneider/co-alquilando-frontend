import provinces from "../util/provinces.js";

const propertyFields = {
  name: "property",
  layout: "vertical",
  btnSubmit: "Actualizar Propiedad",
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
          label: "Tipología",
          name: ["attributes", "typology"],
          component: "Select",
          options: [
            { name: "Departamento", value: "APARMENT" },
            { name: "Casa", value: "HOUSE" },
            { name: "Otro", value: "NOT_DEFINED" },
          ],
          required: true,
        },
        {
          label: "Cantidad de personas",
          name: ["attributes", "amountPeople"],
          component: "InputNumber",
          required: true,
        },
      ],
      [
        {
          label: "Habitaciones",
          name: ["attributes", "rooms"],
          component: "InputNumber",
          required: true,
        },
        {
          label: "Baños",
          name: ["attributes", "bathrooms"],
          component: "InputNumber",
          required: true,
        },
      ],
      [
        {
          label: "Descripción",
          name: "description",
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
      [
        {
          label: "Dirección",
          component: "h2",
        },
      ],
      [
        {
          label: "Provincia",
          name: ["address", "province"],
          component: "Select",
          options: [{ name: "Córdoba", value: "Córdoba" }],
          required: true,
		},
		{
			label: "Barrio",
			name: ["address", "neighborhood"],
			component: "SelectDB",
			endpoint: "/location/all",
			search: "neighborhood",
			required: true,
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
          component: "InputNumber",
          required: true,
        },
        
      ],
      [
        {
          label: "Torre",
          name: ["address", "tower"],
          component: "Input",
        },
        {
          label: "Piso",
          name: ["address", "floor"],
          component: "InputNumber",
        },
        {
          label: "Departamento",
          name: ["address", "apartment"],
          component: "Input",
        },
      ],
      [
        {
          label: "Geolocalizacion",
          name: "coordinates",
          component: "Map",
          required: true,
        },
      ],
      [
        {
          label: "Precio",
          component: "h2",
        },
      ],
      [
        {
          label: "Monto",
          name: ["price", "rentPrice"],
          component: "Input.Currency",
          required: true,
        },
        {
          label: "Expensas",
          name: ["price", "expenses"],
          component: "Input.Currency",
          required: true,
        },
        {
          label: "Servicios",
          name: ["price", "services"],
          component: "Input.Currency",
        },
        {
          label: "Impuestos",
          name: ["price", "taxes"],
          component: "Input.Currency",
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

export default propertyFields;
