
var fff2 = [];
var fff0 = [];

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/Home/getUnidad",
        success: function (data) {
            console.log(data);
            var j = data;
            fff2.push({
                dataField: 'actions',
                caption: 'Eliminar',
                width: 100,
                cellTemplate: function (container, options) {
                    $('<div>')
                        .dxButton({
                            icon: 'https://cdn-icons-png.flaticon.com/512/4226/4226539.png',
                            onClick: function (e) {
                                const idUnidad = options.data.idUnidad;
                                eliminar(idUnidad);
                            }
                        })
                        .appendTo(container);
                }
            });
            fff0.push({
                dataField: 'actions',
                caption: 'Edit',
                width: 100,
                cellTemplate: function (container, options) {
                    $('<div>')
                        .dxButton({
                            icon: 'https://cdn-icons-png.flaticon.com/512/10336/10336582.png',
                            onClick: function (e) {

                                const idUnidad = options.data.idUnidad;  // Convierte los valores a una cadena de texto

                                edit(idUnidad); // Llama a la función edit pasando los valores actuales
                            }
                        })
                        .appendTo(container);
                }
            });

            $("#gridContainer").dxDataGrid({
                dataSource: data,
                width: '100%',
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: 'Buscar...',
                },
                headerFilter: {
                    visible: true,
                },
                columns: [
                    { dataField: 'idUnidad', caption: 'IdUnidad', width: 250 },
                    { dataField: 'nombre', caption: 'Nombre', width: 250 },
                    ...fff2,
                    ...fff0
                ],
                filterRow: { visible: true, applyFilter: "auto" },
                headerFilter: { visible: true },
                filterPanel: { visible: true, filterEnabled: true },
                columnWidth: 120,
                hoverStateEnabled: true,
                allowColumnReordering: true,
                allowColumnResizing: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columnFixing: {
                    enabled: true
                },
                columnsAutoWidth: true,
                paging: {
                    pageSize: 5
                },
                pager: {
                    showPageSizeSelector: true,
                    allowedPageSizes: [5, 10, 15, 20],
                    showNavigationButtons: true,
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('data');
                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Nota.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: true
                },
                selection: {
                    mode: "single"
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                groupPanel: { visible: true },
                grouping: {
                    autoExpandAll: true
                },
                columnChooser: {
                    enabled: true
                },
                scrolling: {
                    mode: "standard",
                    showScrollbar: "always",
                },
            });
        }
    });


});
function edit(idUnidad, rowIndex) {
    console.log("ada", idUnidad);
    var grid = $("#gridContainer").dxDataGrid("instance");
    var rowData = grid.cellValue(rowIndex, "nombre");
    $("#nombre").val(idUnidad);


    $("#editModal").modal('show');
}
function guardarEdit() {
    var IdUnidad = document.getElementById('nombre').value;
    var Nombre = document.getElementById('nombre2').value;
    const data = {
        Nombre: Nombre,
        IdUnidad: IdUnidad
    };

    $.ajax({
        url: "/Home/EditUnidades",
        type: "POST",
        data: data,
        success: function (data) {
            console.log("sdsdsdsd", data);
            if (data == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Editado correctamente',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refrescar la página
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Editado ',
                    showConfirmButton: true
                }).then((result) => {

                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}
function eliminar(idUnidad) {
    debugger;
    console.log("idUnidad:", idUnidad);

    const data = { idUnidad: idUnidad };
    $.ajax({
        url: "/Home/DltUnidad",
        type: "POST",
        data: data,
        success: function (data) {
            console.log("sdsdsdsd", data);
            if (data == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refrescar la página
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar ',
                    showConfirmButton: true
                }).then((result) => {

                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}
//tipo
var fff3 = [];
var fff4 = [];
$(document).ready(function () {
    debugger;
    $.ajax({
        type: "GET",
        url: "/Home/getProvedor",
        success: function (data) {
            console.log("gs", data);
            fff3.push({
                dataField: 'actions',
                caption: 'Eliminar',
                width: 100,
                cellTemplate: function (container, options) {
                    $('<div>')
                        .dxButton({
                            icon: 'https://cdn-icons-png.flaticon.com/512/4226/4226539.png',
                            onClick: function (e) {
                                const idProveedor = options.data.idProveedor;
                                eliminar2(idProveedor);
                            }
                        })
                        .appendTo(container);
                }
            });
            fff4.push({
                dataField: 'actions',
                caption: 'Edit',
                width: 100,
                cellTemplate: function (container, options) {
                    $('<div>')
                        .dxButton({
                            icon: 'https://cdn-icons-png.flaticon.com/512/10336/10336582.png',
                            onClick: function (e) {

                                const idProveedor = options.data.idProveedor;  // Convierte los valores a una cadena de texto

                                edit2(idProveedor); // Llama a la función edit pasando los valores actuales
                            }
                        })
                        .appendTo(container);
                }
            });

            $("#gridContainer2").dxDataGrid({
                dataSource: data,
                //keyExpr: "Legajo",
                //key: ["Legajo", "Legajo"],
                width: '100%',
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: 'Buscar...',
                },
                headerFilter: {
                    visible: true,
                },
                // editing: {
                //     mode: 'cell',
                //     allowUpdating: true,
                // },
                columns: [
                    { dataField: 'idProveedor', caption: 'idProveedor', width: 250 },
                    { dataField: 'nombre', caption: 'Nombre', width: 250 },
                    ...fff3,
                    ...fff4
                ],
                filterRow: { visible: true, applyFilter: "auto" }, // Fila de filtro visible
                headerFilter: { visible: true }, // Filtro en el encabezado de columna visible
                filterPanel: { visible: true, filterEnabled: true },
                // onEditorPreparing(e) {
                //     if (ConsultaColumnsTicket.includes(e.dataField)) {
                //         e.editorOptions.disabled = true;
                //         e.editorOptions.value = null;
                //     }
                // },
                columnWidth: 120,
                hoverStateEnabled: true,
                allowColumnReordering: true,
                allowColumnResizing: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columnFixing: {
                    enabled: true
                },
                columnsAutoWidth: true,
                paging: {
                    pageSize: 5
                },
                pager: {
                    showPageSizeSelector: true,
                    allowedPageSizes: [5, 10, 15, 20],
                    showNavigationButtons: true,
                },
                onExporting: function (e) {

                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('data');
                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Nota.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: true
                },
                selection: {
                    mode: "single"
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                groupPanel: { visible: true },
                grouping: {
                    autoExpandAll: true
                },
                columnChooser: {
                    enabled: true
                },
                scrolling: {
                    mode: "standard", // O "virtual" si prefieres un desplazamiento virtual
                    showScrollbar: "always", // Muestra siempre la barra de desplazamiento horizontal
                },
                // customizeColumns: function (columns) {
                //     columns[1].width = 60;
                //     columns[2].width = 150;
                //     columns[3].width = 120;
                //     columns[4].width = 150;
                //     //columns[8].width = 150;
                //     //columns[9].width = 150;
                //     //columns[10].width = 150;
                //     //columns[11].width = 200;
                //     //columns[12].width = 240;
                //     //columns[13].width = 180;
                // },
            });
        }
    });

});
function edit2(idProveedor, rowIndex) {
    debugger;
    console.log("dff",idProveedor);
    var grid = $("#gridContainer").dxDataGrid("instance");
    var rowData = grid.cellValue(rowIndex, "nombre");
    $("#nombre22").val(idProveedor);


    $("#editModal2").modal('show');
}
function guardarEdit2() {
    var IdProveedor = document.getElementById('nombre22').value;
    var Nombre = document.getElementById('nombre222').value;
    const data = {
        Nombre: Nombre,
        IdProveedor: IdProveedor
    };

    $.ajax({
        url: "/Home/EditProveedor",
        type: "POST",
        data: data,
        success: function (data) {
            console.log("sdsdsdsd", data);
            if (data == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Editado correctamente',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refrescar la página
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Editado ',
                    showConfirmButton: true
                }).then((result) => {

                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}
function eliminar2(idProveedor) {
    debugger;
    console.log("idUnidad:", idProveedor);

    const data = { idProveedor: idProveedor };
    $.ajax({
        url: "/Home/DltProveedor",
        type: "POST",
        data: data,
        success: function (data) {
            console.log("sdsdsdsd", data);
            if (data == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refrescar la página
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar ',
                    showConfirmButton: true
                }).then((result) => {

                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}


//requerimiento 
var mmm1 = [];
var mmm2 = [];
$(document).ready(function () {
    debugger;
    $.ajax({
        type: "GET",
        url: "/Home/GetRequerimientosMed",
        success: function (data) {
            mmm1.push({
                dataField: 'actions',
                caption: 'Eliminar',
                width: 100,
                cellTemplate: function (container, options) {
                    $('<div>')
                        .dxButton({
                            icon: 'https://cdn-icons-png.flaticon.com/512/4226/4226539.png',
                            onClick: function (e) {
                                const id = options.data.id;
                                eliminar3(id);
                            }
                        })
                        .appendTo(container);
                }
            });
            mmm2.push({
                dataField: 'actions',
                caption: 'Edit',
                width: 100,
                cellTemplate: function (container, options) {
                    $('<div>')
                        .dxButton({
                            icon: 'https://cdn-icons-png.flaticon.com/512/10336/10336582.png',
                            onClick: function (e) {

                                const id = options.data.id;  // Convierte los valores a una cadena de texto

                                edit3(id); // Llama a la función edit pasando los valores actuales
                            }
                        })
                        .appendTo(container);
                }
            });
            $("#gridContainer3").dxDataGrid({
                dataSource: data,
                //keyExpr: "Legajo",
                //key: ["Legajo", "Legajo"],
                width: '100%',
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: 'Buscar...',
                },
                headerFilter: {
                    visible: true,
                },
                // editing: {
                //     mode: 'cell',
                //     allowUpdating: true,
                // },
                columns: [
                    { dataField: 'id', caption: 'Cedula', width: 100 },
                    { dataField: 'presupuesto', caption: 'Presupuesto', width: 100 },
                    { dataField: 'idUnidad', caption: 'IdUnidad', width: 100 },
                    { dataField: 'tipo', caption: 'Tipo', width: 100 },
                    { dataField: 'cantidad', caption: 'Cantidad', width: 100 },
                    { dataField: 'valorUnitario', caption: 'Valor Unitario', width: 100 },
                    { dataField: 'valorTotal', caption: 'Valor Total', width: 100 },
                    { dataField: 'fechaAd', caption: 'FechaAd', width: 100 },
                    { dataField: 'idProveedor', caption: 'IdProveedor', width: 100 },
                    { dataField: 'documentacion', caption: 'Documentacion', width: 100 },
                    ...mmm1,
                    ...mmm2
                ],
                filterRow: { visible: true, applyFilter: "auto" }, // Fila de filtro visible
                headerFilter: { visible: true }, // Filtro en el encabezado de columna visible
                filterPanel: { visible: true, filterEnabled: true },
                // onEditorPreparing(e) {
                //     if (ConsultaColumnsTicket.includes(e.dataField)) {
                //         e.editorOptions.disabled = true;
                //         e.editorOptions.value = null;
                //     }
                // },
                columnWidth: 120,
                hoverStateEnabled: true,
                allowColumnReordering: true,
                allowColumnResizing: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columnFixing: {
                    enabled: true
                },
                columnsAutoWidth: true,
                paging: {
                    pageSize: 5
                },
                pager: {
                    showPageSizeSelector: true,
                    allowedPageSizes: [5, 10, 15, 20],
                    showNavigationButtons: true,
                },
                onExporting: function (e) {

                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('data');
                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Nota.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: true
                },
                selection: {
                    mode: "single"
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                groupPanel: { visible: true },
                grouping: {
                    autoExpandAll: true
                },
                columnChooser: {
                    enabled: true
                },
                scrolling: {
                    mode: "standard", // O "virtual" si prefieres un desplazamiento virtual
                    showScrollbar: "always", // Muestra siempre la barra de desplazamiento horizontal
                },
                // customizeColumns: function (columns) {
                //     columns[1].width = 60;
                //     columns[2].width = 150;
                //     columns[3].width = 120;
                //     columns[4].width = 150;
                //     //columns[8].width = 150;
                //     //columns[9].width = 150;
                //     //columns[10].width = 150;
                //     //columns[11].width = 200;
                //     //columns[12].width = 240;
                //     //columns[13].width = 180;
                // },
            });
        }
    });

});
function edit3(id, rowIndex) {

    debugger;
    console.log("dff", id);
    var grid = $("#gridContainer").dxDataGrid("instance");
    var rowData = grid.cellValue(rowIndex, "nombre");
    $("#Cedula").val(id);


    $("#editModal3").modal('show');
}
function guardarEdit3() {
    var Id = document.getElementById('Cedula').value;
    var Cantidad = document.getElementById('Cantidad').value;
    var Documentacion = document.getElementById('Documentacion').value;
    var ValorUnitario = document.getElementById('ValorUnitario').value;
    var ValorTotal = document.getElementById('ValorTotal').value;
    const data = {
        Id: Id,
        Cantidad: Cantidad,
        Documentacion: Documentacion,
        ValorUnitario: ValorUnitario,
        Cantidad: Cantidad,
        ValorTotal: ValorTotal
    };

    $.ajax({
        url: "/Home/EditRequerimientosMed",
        type: "POST",
        data: data,
        success: function (data) {
            console.log("sdsdsdsd", data);
            if (data == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Editado correctamente',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refrescar la página
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Editado ',
                    showConfirmButton: true
                }).then((result) => {

                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}
function eliminar3(id) {
    debugger;
    console.log("idUnidad:", id);

    const data = { id: id };
    $.ajax({
        url: "/Home/DltRequerimiento",
        type: "POST",
        data: data,
        success: function (data) {
            console.log("sdsdsdsd", data);
            if (data == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refrescar la página
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar ',
                    showConfirmButton: true
                }).then((result) => {

                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function modalReqMed() {

    $("#modalReqMed").modal('show');
}
function Añadir() {
    debugger;
    var Cedula = document.getElementById('xxx').value;
    var Presupuesto = document.getElementById('Presupuesto').value;
    var IdUnidad = document.getElementById('IdUnidad').value;
    var Tipo = document.getElementById('Tipo').value;
    var Cantidad = document.getElementById('lll').value;
    var ValorUnitario = document.getElementById('Valu').value;
    var ValorTotal = document.getElementById('Valt').value;
    var FechaAd = document.getElementById('FechaAd').value;
    var IdProveedor = document.getElementById('idp').value;
    var Documentacion = document.getElementById('doc').value;
    if (Cedula.trim() === '' || Presupuesto.trim() === '' || IdUnidad.trim() === '' || Tipo.trim() === '' || Cantidad.trim() === '' || ValorUnitario.trim() === '' || ValorTotal.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.',
            showConfirmButton: true
        });
        return; // Detener la ejecución si hay campos vacíos
    }
    const data = {
        Id: Cedula,
        Presupuesto: Presupuesto,
        IdUnidad: IdUnidad,
        Tipo: Tipo,
        Cantidad: Cantidad,
        ValorUnitario: ValorUnitario,
        ValorTotal: ValorTotal,
        FechaAd: FechaAd,
        IdProveedor: IdProveedor,
        Documentacion: Documentacion
    };
    $.ajax({
        url: "/Home/PostRequerimientosMed",
        type: "POST",
        data: data,
        success: function (data) {
            console.log("sdsdsdsd", data);
            if (data == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Añadido correctamente',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refrescar la página
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al añadir ',
                    showConfirmButton: true
                }).then((result) => {

                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}


//añadir idProveedor
function modalprov() {

    $("#modalprovv").modal('show');
}
function AñadirProv() {   
    var IdProveedor = document.getElementById('ppp').value;
    var Nombre = document.getElementById('name').value;
    if (IdProveedor.trim() === '' || Nombre.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.',
            showConfirmButton: true
        });
        return; // Detener la ejecución si hay campos vacíos
    }
    const data = {
        
        IdProveedor: IdProveedor,
        Nombre: Nombre
    };
    $.ajax({
        url: "/Home/PostProvedores",
        type: "POST",
        data: data,
        success: function (data) {
            console.log("sdsdsdsd", data);
            if (data == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Añadido correctamente',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refrescar la página
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al añadir ',
                    showConfirmButton: true
                }).then((result) => {

                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}
//añadir unidad de servicio
function modalUni() {

    $("#modalunid").modal('show');
}
function AñadirUn() {
    debugger;
    var IdUnidad = document.getElementById('IU').value;
    var Nombre = document.getElementById('name2').value;
    if (IdUnidad.trim() === '' || Nombre.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.',
            showConfirmButton: true
        });
        return; // Detener la ejecución si hay campos vacíos
    }
    const data = {

        IdUnidad: IdUnidad,
        Nombre: Nombre
    };
    $.ajax({
        url: "/Home/PostUnidades",
        type: "POST",
        data: data,
        success: function (data) {
            console.log("sdsdsdsd", data);
            if (data == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Añadido correctamente',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refrescar la página
                        location.reload();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al añadir ',
                    showConfirmButton: true
                }).then((result) => {

                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function cerrar() {

    $("#modalunid").modal('hide');
    $("#editModal").modal('hide');
    $("#editModal2").modal('hide');
    $("#editModal3").modal('hide');
    $("#modalReqMed").modal('hide');
    $("#modalprovv").modal('hide');
}