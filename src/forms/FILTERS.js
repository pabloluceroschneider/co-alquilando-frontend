import boulevards from '../util/boulevards';

export const propertyFilters = [
    {
        span: "Barrio",
        name: "boulevard",
        type: "datalist",
        options : boulevards
    },
    {
        span: "Precio Máximo $",
        name: "price",
        type: "number"
    },
    {
        span: "Habitaciones",
        name: "rooms",
        type: "number"
    },
    {
        span: "Acepta Mascotas",
        name: "pets",
        type: "checkbox"
    },
    {
        span: "Gimnacio",
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
        span: "Ascensor",
        name: "elevator",
        type: "checkbox"
    },
    {
        span: "Amoblado",
        name: "furnished",
        type: "checkbox"
    },
]