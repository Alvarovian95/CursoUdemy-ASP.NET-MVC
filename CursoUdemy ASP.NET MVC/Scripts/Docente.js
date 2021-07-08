
listar();

function listar() {
    $.get("Docente/listarDocente", function (data) {

        crearListado(
            ["Id docente", "Nombre docente", "Apellido paterno", "Apellido materno", "Email"], data);

    });

}


function crearListado(arrayColumnas, data) {
    var contenido = "";
    contenido += "<table id ='tablas' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";

    for (var i = 0; i < arrayColumnas.length; i++) {
        contenido += "<td>";
        contenido += arrayColumnas[i];
        contenido += "</td>";
    }
    contenido += "</tr>";
    contenido += "</thead>";
    var llaves = Object.keys(data[0]);

    contenido += "<tbody>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";

        for (var j = 0; j < llaves.length; j++) {
            var valorLlaves = llaves[j];
            contenido += "<td>";
            contenido += data[i][valorLlaves];
            contenido += "</td>";

        }
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;

    $("#tablas").dataTable({
        searching: false
    });

}