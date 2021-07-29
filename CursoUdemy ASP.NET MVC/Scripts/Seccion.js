
listar();

function listar() {
    $.get("Seccion/listarSeccion", function (data) {
        crearListado(data);
    });
}



function crearListado(data) {
    var contenido = "";
    contenido += "<table id='tabla-seccion' class = 'table'>";

    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>Id Seccion</td>";
    contenido += "<td>Nombre</td>";  
    contenido += "<td>Operaciones</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDSECCION + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";      
        contenido += "<td>";
        contenido += "<button class = 'btn btn-primary' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class = 'btn btn-danger' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-trash'></i></button> ";
        contenido += "</td>"
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-seccion").dataTable({
        searching: false
    });
}