listar();

$("#datepickerInicio").datepicker(
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
        contenido += "<button class = 'btn btn-primary' data-toggle='modal' data-target='#myModal' onclick='abrirModal(" + data[i].IIDPERIODO + ") '><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class = 'btn btn-danger' onclick='Eliminar(" + data[i].IIDPERIODO + ")'><i class='glyphicon glyphicon-trash'></i></button> ";
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

function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;

    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}

function datosObligatorios() {
    var existo = true;
    var controlesObligatorios = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorios.length;

    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorios[i].value == "") {
            existo = false;
            controlesObligatorios[i].parentNode.classList.add("error");
        }
        else {
            controlesObligatorios[i].parentNode.classList.remove("error");
        }
    }
    return existo;
}

function Eliminar(id) {
    var frm = new FormData();
    frm.append("IIDPERIODO", id);
    if (confirm("¿Desea realmente eliminarlo?") == 1) {
        $.ajax({
            type: "POST",
            url: "Periodo/eliminar",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == 0) {
                    alert("Ocurrio un error");
                } else {
                    listar();
                    document.getElementById("btnCancelar").click();
                }
            }
        });
    }
}

function listar() {
    $.get("Periodo/listarPeriodo", function (data) {
        crearListado(data);
    });
}

function abrirModal(id) {
    var controlesObligatorios = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorios.length;

    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorios[i].parentNode.classList.remove("error");
    }

    if (id == 0) {
        borrarDatos();
    } else {
        $.get("Periodo/recuperarInformacion?id=" + id, function (data) {
            document.getElementById("txtIdPeriodo").value = data[0].IIDPERIODO;
            document.getElementById("txtNombrePopUp").value = data[0].NOMBRE;
            document.getElementById("datepickerInicio").value = data[0].FECHAINICIOCADENA;
            document.getElementById("datepickerFin").value = data[0].FECHAFINCADENA;
        });

    }
}

function Agregar() {
    if (datosObligatorios() == true) {
        var frm = new FormData();
        var idperiodo = document.getElementById("txtIdPeriodo").value;
        var nombre = document.getElementById("txtNombrePopUp").value;
        var fechaInicio = document.getElementById("datepickerInicio").value;
        var fechaFin = document.getElementById("datepickerFin").value;

        frm.append("IIDPERIODO", idperiodo);
        frm.append("NOMBRE", nombre);
        frm.append("FECHAINICIO", fechaInicio);
        frm.append("FECHAFIN", fechaFin);
        frm.append("BHABILITADO", 1);

        if (confirm("Desea realizar la operacion?") == 1) {
            $.ajax({
                type: "POST",
                url: "Periodo/guardarDatos",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        listar();
                        document.getElementById("btnCancelar").click();
                    } else {
                        alert("Ocurrio un error");
                    }
                }
            });
        }
    }
}
