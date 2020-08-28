import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "typology": "Tipología",
      "APARMENT": "Departamento",
      "HOUSE": "Casa",

      "pre_rented": "Reservada",
      "available": "Disponible",
      "amountPeople": "Cantidad de personas",
      "rooms": "Habitaciones",
      "bathrooms": "Baños",
      "gym": "Gimnacio",
      "pool": "Pileta",
      "playroom": "Salon de juegos",
      "roaster": "Asador",
      "garage": "Garage",
      "balcony": "Balcón",
      "elevator": "Ascensor",
      "furnished": "Amoblado",
      "aa": "Aire acondicionado",
      "sum": "Salon de usos múltiples",
      "calefaction": "Calefacción",
      "pets": "Acepta mascotas",
      "true": "Sí",
      "false": "No"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;