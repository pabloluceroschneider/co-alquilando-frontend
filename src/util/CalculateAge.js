export default function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleaños = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleaños.getFullYear();
    var m = hoy.getMonth() - cumpleaños.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleaños.getDate())) {
        edad--;
    }

    return fecha ? edad : '';
}