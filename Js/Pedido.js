var UrlPedidos = 'http://52.152.236.67:90/G2_20/controller/pedidos_proveedor.php?op=GetPedidos';
var UrlPostPedido = 'http://52.152.236.67:90/G2_20/controller/pedidos_proveedor.php?op=InsertPedido';
var UrlGetPedido = 'http://52.152.236.67:90/G2_20/controller/pedidos_proveedor.php?op=GetPedido';
var UrlPutPedido = 'http://52.152.236.67:90/G2_20/controller/pedidos_proveedor.php?op=UpdatePedido';
var UrlDeletePedido = 'http://52.152.236.67:90/G2_20/controller/pedidos_proveedor.php?op=DeletePedido';

$(document).ready(function(){
CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for (i=0; i < MiItems.length; i++) {
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+
                '<td>'+ MiItems[i].DETALLE +'</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
                '<td>'+ MiItems[i].TOTAL +'</td>'+
                '<td>'+ MiItems[i].FECHA_ENTREGA +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarPedido('+ MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-danger" id="btnEliminar" onclick="EliminarPedido('+ MiItems[i].ID +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.Pedidos').html(Valores);            
            }
        }
    });
}

function AgregarPedido(){
    var datosPedido={
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datosPedidoJson = JSON.stringify(datosPedido);

    $.ajax({
        url: UrlPostPedido,
        type: 'POST',
        data: datosPedidoJson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(){
            alert('Error al crear pedido');
        }
    });
    alert('Pedido agregado');
}

function CargarPedido(idPedido){
    var datosPedido = {
        ID: idPedido
    };
    var datosPedidoJson = JSON.stringify(datosPedido);

    $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data: datosPedidoJson,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            var MiItems = response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnActualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido('+ MiItems[0].ID +')" value="Actualizar" class="btn btn-primary">';
            $('#btnpedido').html(btnActualizar);
        }
    });
}

function ActualizarPedido(idPedido){ 
    var datosPedido={
        ID: idPedido,
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datosPedidoJson = JSON.stringify(datosPedido);

    $.ajax({
        url: UrlPutPedido,
        type: 'PUT',
        data: datosPedidoJson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(){
            alert('Error al actualizar pedido');
        }
    });
    alert('Pedido actualizado');
}

function EliminarPedido(idPedido){
    var datosPedido = {
        ID: idPedido
    };
    var datosPedidoJson = JSON.stringify(datosPedido);

    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data: datosPedidoJson,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response)
        },
        error: function(){
            alert('Error al eliminar pedido');
        }
    });
    alert('Pedido eliminado');

    $(document).ready(function(){
        CargarPedidos();
    });
}