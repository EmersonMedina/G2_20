let urlFacturas =
  "http://52.152.236.67:90/G2_20/controller/facturas_cliente.php?opc=GetFacturas";

let urlPostFactura =
  "http://52.152.236.67:90/G2_20/controller/facturas_cliente.php?opc=InsertarFactura";

let urlGetFacturaID = 
  "http://52.152.236.67:90/G2_20/controller/facturas_cliente.php?opc=GetFacturaId" ; 

let urlUpdateFactura = 
  "http://52.152.236.67:90/G2_20/controller/facturas_cliente.php?opc=ActualizarFactura" ; 

let urlDeleteFactura = 
  "http://52.152.236.67:90/G2_20/controller/facturas_cliente.php?opc=EliminarFactura" ; 

$(document).ready(function () {
  CargarFacturas();
  
});

let CargarFacturas = () => {
  $.ajax({
    url: urlFacturas,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      let FacturasItems = response;
      let valores = "";

      for (i = 0; i < FacturasItems.length; i++) {
        valores +=
          "<tr>" +
            "<td>" +
              FacturasItems[i].ID +
            "</td>" +
            "<td>" +
              FacturasItems[i].NUMERO_FACTURA +
            "</td>" +
            "<td>" +
              FacturasItems[i].ID_SOCIO +
            "</td>" +
            "<td>" +
              FacturasItems[i].FECHA_FACTURA +
            "</td>" +
            "<td>" +
              FacturasItems[i].DETALLE +
            "</td>" +
            "<td>" +
              FacturasItems[i].SUB_TOTAL +
            "</td>" +
            "<td>" +
              FacturasItems[i].TOTAL_ISV +
            "</td>" +
            "<td>" +
              FacturasItems[i].TOTAL +
            "</td>" +
            "<td>" +
              FacturasItems[i].FECHA_VENCIMIENTO +
            "</td>" +
            "<td>" +
              FacturasItems[i].ESTADO +
            "</td>" +
            "<td>" + 
              '<a href="#FormularioFactura"><button class="btn btn-primary m-1" id="btnEditar" onclick="GetFacturaEditar(' + FacturasItems[i].ID + ' )">Editar</button></a>' +
              '<button class="btn btn-danger" id="btnEliminar" onclick="EliminarFactura(' + FacturasItems[i].ID + ' )">Eliminar</button>' + 
            "</td>" +
          "</tr>";
        $(".Facturas").html(valores);
      }
    },
  });
};

function AgregarFactura() {
  let datosFactura = {
    NUMERO_FACTURA: $("#NumeroFactura").val(),
    ID_SOCIO: $("#IdSocio").val(),
    FECHA_FACTURA: $("#Fecha").val(),
    DETALLE: $("#Detalle").val(),
    SUB_TOTAL: $("#SubTotal").val(),
    TOTAL_ISV: $("#TotalISV").val(),
    TOTAL: $("#Total").val(),
    FECHA_VENCIMIENTO: $("#FechaVencimiento").val(),
    ESTADO: $("#Estado").val(),
  };
  let datosFacturaJson = JSON.stringify(datosFactura);
  $.ajax({
    url: urlPostFactura,
    type: "POST",
    data: datosFacturaJson,
    dataType: "JSON",
    contenType: "application/json",
    success: function (response) {
      console.log(response);
      window.location.reload();
    },
    error: function () {
      alert("Error al intentar crear la factura");
    }
  });
  alert("Factura agregada exitosamente");
}

let GetFacturaEditar = (IDFactura) => {
  let datosFactura  = {
    ID: IDFactura
  }; 

  let datosFacturaJson = JSON.stringify(datosFactura); 
  
  $.ajax({
    url: urlGetFacturaID,
    type: "POST",
    data: datosFacturaJson,
    dataType: "JSON",
    contenType: "application/json",
    success: function (response) {
      
      let datosFactura = response;

      let fechaSinTime =  (datosFactura[0].FECHA_FACTURA).substring(0,10);
      $('#NumeroFactura').val(datosFactura[0].NUMERO_FACTURA); 
      $('#IdSocio').val(datosFactura[0].ID_SOCIO); 
      $('#Fecha').val(fechaSinTime); 
      $('#Detalle').val(datosFactura[0].DETALLE); 
      $('#SubTotal').val(datosFactura[0].SUB_TOTAL); 
      $('#TotalISV').val(datosFactura[0].TOTAL_ISV); 
      $('#Total').val(datosFactura[0].TOTAL); 
      $('#FechaVencimiento').val(datosFactura[0].FECHA_VENCIMIENTO); 
      $('#Estado').val(datosFactura[0].ESTADO); 
      let btnActualizar = '<input type="submit" id="btnActualizar" onclick="ActualizarFactura('+ IDFactura + ')" value="Actualizar Factura" class="btn btn-info"/>'; 
      let tituloActualizar = '<h3>Actualizar Factura</h3>'
      $('#BtnAgregar').html(btnActualizar);
      $('#FormularioFactura').html(tituloActualizar); 
    },
    error: function () {
      alert("Error al intentar obtener la factura :(");
    }
  });
}

let ActualizarFactura = (IDFactura) => {
  let datosFactura  = {
    ID: IDFactura, 
    NUMERO_FACTURA: $("#NumeroFactura").val(),
    ID_SOCIO: $("#IdSocio").val(),
    FECHA_FACTURA: $("#Fecha").val(),
    DETALLE: $("#Detalle").val(),
    SUB_TOTAL: $("#SubTotal").val(),
    TOTAL_ISV: $("#TotalISV").val(),
    TOTAL: $("#Total").val(),
    FECHA_VENCIMIENTO: $("#FechaVencimiento").val(),
    ESTADO: $("#Estado").val(),
  }; 

  let datosFacturaJson = JSON.stringify(datosFactura); 
  
  $.ajax({
    url: urlUpdateFactura,
    type: "PUT",
    data: datosFacturaJson,
    dataType: "JSON",
    contenType: "application/json",
    success: function (response) {
      console.log(response); 
      window.location.reload();
    }
  });
  alert("Factura actualizada exitosamente");
}

let EliminarFactura = (IDFactura) => {
  if (confirm("¿Seguro que deseas eliminar la factura?") === true) {
    let datosFactura  = {
      ID: IDFactura
    }; 
    
    let datosFacturaJson = JSON.stringify(datosFactura); 
  
    $.ajax({
      url: urlDeleteFactura,
      type: "DELETE",
      data: datosFacturaJson,
      dataType: "JSON",
      contenType: "application/json",
      success: function (response) {
        alert(response); 
        CargarFacturas(); 
      },
      error: function () {
        alert("Error al intentar eliminar la factura :(");
      }
    });
  }else {
    return; 
  }
  
}