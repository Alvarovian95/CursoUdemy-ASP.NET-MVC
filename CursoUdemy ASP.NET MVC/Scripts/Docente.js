$("#dtFechaContrato").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);
$("#datepickerFin").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);


listar();
listarComboModalidad();

var cboTipoModalidad = document.getElementById("cboTipoModalidad");

cboTipoModalidad.onchange = function () {

    var iidmodalidad = document.getElementById("cboTipoModalidad").value;

    if (iidmodalidad == "") {
        listar();
    }
    else {
        $.get("Docente/filtrarDocentePorModalidad/?iidmodaldiad=" + iidmodalidad, function (data) {
            crearListado(["Id docente", "Nombre docente", "Apellido paterno", "Apellido materno", "Email"], data);
        });
    }

}

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

    //añadiremos una columna de acciones
    contenido += "<td>Operaciones</td>";


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
        contenido += "<td>";
        contenido += "<button class = 'btn btn-primary' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class = 'btn btn-danger' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-trash'></i></button> ";
        contenido += "</td>";

        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;

    $("#tablas").dataTable({
        searching: false
    });

}

function llenarCombo(data, control, primerElemento) {
    var contenido = "";

    if (primerElemento == true) {
        contenido += "<option value =''>--Seleccione--</option>";
    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value ='" + data[i].IID + " '>";
        contenido += data[i].NOMBRE;
        contenido += "</option>";
    }
    control.innerHTML = contenido;
}

function listarComboModalidad() {
    $.get("Docente/listarModalidadContrato", function (data) {

        llenarCombo(data, document.getElementById("cboTipoModalidad"), true);
        llenarCombo(data, document.getElementById("cboModalidadContratoPopup"), true);
        


    });
}

$.get("Docente/listarSexos", function (data) {
    llenarCombo(data, document.getElementById("cboSexoPopup"), true);
})