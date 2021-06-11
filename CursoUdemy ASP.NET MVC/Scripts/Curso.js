$.get("Curso/listarCursos", function (data) {
    crearListado(data);
});

var btnBuscar = document.getElementById("btnBuscar");
var btnLimpiar = document.getElementById("btnLimpiar");

btnBuscar.onclick = function () {
    var nombre = document.getElementById("txtnombre").value;
    $.get("Curso/buscarCursoPorNombre/?nombre=" + nombre, function (data) {
        crearListado(data);
    });
}


btnLimpiar.onclick = function () {    
    $.get("Curso/listarCursos", function (data) {
        crearListado(data);
    });

    document.getElementById("txtnombre").value = "";

}

function crearListado(data) {
    var contenido = "";
    contenido += "<table id='tabla-curso' class = 'table'>";

    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>Id Curso</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Descripcion</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDCURSO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].DESCRIPCION + "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-curso").dataTable({
        searching: false
    });
}