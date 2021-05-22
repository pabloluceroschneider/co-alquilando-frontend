import boulevards from '../util/boulevards';

export const propertyFilters = [
    {
        span: "Barrio",
        name: "neighborhood",
        type: "datalist",
        options : boulevards
    },
    {
        span: "Precio Máximo $",
        name: "price",
        type: "number",
        min: 0
    },
    {
        span: "Habitaciones",
        name: "rooms",
        type: "number",
        min: 0
    },
    {
        span: "Acepta Mascotas",
        name: "pets",
        type: "checkbox"
    },
    {
        span: "Gimnasio",
        name: "gym",
        type: "checkbox"
    },
    {
        span: "Pileta",
        name: "pool",
        type: "checkbox"
    },
    {
        span: "Salón de Juegos",
        name: "playroom",
        type: "checkbox"
    },
    {
        span: "Garage",
        name: "garage",
        type: "checkbox"
    },
    {
        span: "Balcon",
        name: "balcony",
        type: "checkbox"
    },
    {
        span: "Ascensor",
        name: "elevator",
        type: "checkbox"
    },
    {
        span: "Amoblado",
        name: "furnished",
        type: "checkbox"
    },
    {
        span: "Dueño vive en propiedad",
        name: "ownerInhabited",
        type: "checkbox"
    },
]