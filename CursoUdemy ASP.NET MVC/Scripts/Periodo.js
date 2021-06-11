
$.get("Periodo/listarPeriodo", function (data) {
    crearListado(data);
});

function crearListado(data) {
    var contenido = "";
    contenido += "<table id='tabla-periodo' class = 'table'>";

    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>Id Periodo</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Fecha inicio</td>";
    contenido += "<td>Fecha fin</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDPERIODO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].FECHAINICIO + "</td>";
        contenido += "<td>" + data[i].FECHAFIN + "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-periodo").dataTable({
        searching: false
    });
}