export const formatearFecha = fecha => {

    const newFecha = new Date(fecha.split('T')[0].split('-'));

    const opciones = {
        weekday: 'long',//Nombre del día
        year: 'numeric', //Año
        month: 'long', //Mes
        day: 'numeric' //Dia
    }

    return newFecha.toLocaleDateString('es-ES',opciones)

}