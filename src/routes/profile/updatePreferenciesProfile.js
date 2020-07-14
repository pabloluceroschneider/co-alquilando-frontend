const userPreferencies = {
    name: "user",
    layout: "vertical",
    btnSubmit: "Actualizar Preferencias",
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
                name: "userSex",
                component: "Select",
                options: [
                  { name: "Femenino", value: "FEMALE" },
                  { name: "Masculino", value: "MALE" },
                  { name: "Otro", value: "NOT_DEFINED" },
                ],
            },
            {
                label:"Edad",
                name:"userAge",
                component:"Input"
            }
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
             component:"Input"
         }
        ],
        [
          {
            label: "Ocupación",
            name: "userOcupation",
            component: "Input",
          },
         
        ],
      ],
    },
  };