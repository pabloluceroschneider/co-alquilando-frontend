const adFields = {
  name: "update-ad",
  layout: "vertical",
  btnSubmit: "Actualizar Publicidad",
  fields: {
    primaries: [
      [
        {
          label: "Cliente",
          name: "client",
          component: "Input",
          required: true,
        },
        {
          label: "Precio",
          name: "price",
          component: "InputCurrency",
          required: true,
        },
      ],
      [
        {
          label: "Fecha de Pago",
          name: "paymentDate",
          component: "DatePicker",
          dependencies: ["startDate"],
          required: true,
        },
        {
          label: "Fecha de Inicio",
          name: "startDate",
          component: "DatePicker",
          dependencies: ["startDate"],
          required: true,
        },
        {
          label: "Fecha de Fin",
          name: "endDate",
          component: "DatePicker",
          dependencies: ["finishDate"],
          required: true,
        },
      ],
      [
        {
					label: "Activo",
					name: "active",
					valuePropName: "checked",
					component: "Checkbox",
				},
        {
					label: "Foto Vertical",
					name: "isVertical",
					valuePropName: "checked",
					component: "Checkbox",
				},
      ],
      [
        {
          label: "Cargar Imagen",
          name: "image",
          component: "Upload",
          aspect: 4/5,
          required: true,
        },
      ]
    ],
  },
};

export default adFields;
