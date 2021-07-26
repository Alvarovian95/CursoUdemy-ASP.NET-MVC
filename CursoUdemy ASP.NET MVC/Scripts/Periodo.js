$("#datepickerInicio").datepicker();
$("#datepickerFin").datepicker();

$.get("Periodo/listarPeriodo", function (data) {
    crearListado(data);
});

//Busqueda sensitiva
var nombrePeriodo = document.getElementById("txtnombre");
nombrePeriodo.onkeyup = function () {
    var nombre = document.getElementById("txtnombre").value;
    $.get("Periodo/buscarPeriodoPorNombre/?nombrePeriodo=" + nombre, function (data) {
        crearListado(data);
    });
}

function crearListado(data) {
    var contenido = "";
    contenido += "<table id='tabla-periodo' class = 'table'>";

    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>Id Periodo</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Fecha inicio</td>";
    contenido += "<td>Fecha fin</td>"; 
    contenido += "<td>Operaciones</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";

 

    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDPERIODO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].FECHAINICIO + "</td>";
        contenido += "<td>" + data[i].FECHAFIN + "</td>";
        contenido += "<td>";
        contenido += "<button class = 'btn btn-primary' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class = 'btn btn-danger' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-trash'></i></button> ";
        contenido += "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-periodo").dataTable({
        searching: false
    });
}