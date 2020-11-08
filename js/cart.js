const CART_DESAFIATE = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const formaPagoEfectivoHTML = "";
const formaPagoDebitoHTML = `
    <table class="table">
        <tbody>
            <tr>
                <td style="border:none;" scope="col"><label for="NroCuentaDeb">Numero de cuenta:</label></td>
                <td style="border:none;" scope="col"><label for="CodigoSegDeb">Codigo de seguridad:</label></td>
            </tr>
            <tr>
                <td style="border:none;" scope="row"><input type="text" id="NroCuentaDeb" required="" autofocus=""></td>
                <td style="border:none;"><input type="text" id="CodigoSegDeb" required="" autofocus=""></td>
            </tr>
            <tr>
                <td style="border:none;" scope="row"><label for="VencimientoDeb">Vencimiento (MM/AA):</label></td>
            </tr>
            <tr>
                <td style="border:none;" scope="row"><input type="text" id="VencimientoDeb" required="" autofocus=""></td>
            </tr>
        </tbody>
    </table>
`;
const formaPagoCreditoHTML = `
    <table class="table">
        <tbody>
            <tr>
                <td style="border:none;" scope="col"><label for="NroCuentaCred">Numero de cuenta:</label></td>
                <td style="border:none;" scope="col"><label for="CodigoSegCred">Codigo de seguridad:</label></td>
            </tr>
            <tr>
                <td style="border:none;" scope="row"><input type="text" id="NroCuentaCred" required="" autofocus=""></td>
                <td style="border:none;"><input type="text" id="CodigoSegCred" required="" autofocus=""></td>
            </tr>
            <tr>
                <td style="border:none;" scope="row"><label for="VencimientoCred">Vencimiento (MM/AA):</label></td>
            </tr>
            <tr>
                <td style="border:none;" scope="row"><input type="text" id="VencimientoCred" required="" autofocus=""></td>
            </tr>
        </tbody>
    </table>
`;

_articulos = [];


function showArticles(articleArray){
    let htmlContentToAppend = "";
    for (let i=0;i < articleArray.length; i++){
        htmlContentToAppend += `
        <tr>
            <td scope="row"><img class="img-fluid img-thumbnail" src="` + articleArray[i].src + `" width="100" alt=""></td>
            <td>` + articleArray[i].name + `</td>
            <td>` + articleArray[i].unitCost + `</td>
            <td>` + articleArray[i].currency + `</td>
            <td><input onchange="
                changeSubtotal(this.value,` + articleArray[i].unitCost + `,'` + articleArray[i].currency + `',` + (i+1) + ` )
            " type="number" class="cartCantidad" name="quantity" value="` + articleArray[i].count + `" min="1"></td>
            <td><span style="font-weight:bold;">` + articleArray[i].unitCost * articleArray[i].count + articleArray[i].currency + `</span></td>
            <td><button type="button" class="button" onclick="eliminarArticulo(` + i + `)">><</button></td>
        </tr>
        `
        
    }
    document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;
}

function changeSubtotal(cantidad, costo, moneda, fila){
 //código a ejecutar en change del input. Cambia solo el subtotal del producto específico, en la lista del carrito.
    let subtotal = cantidad * costo + moneda;
    var x=document.getElementById('articlesTable').rows[fila].cells; //.cells crea un array de las columnas en una fila. Le paso la fila del artículo que se modificó la cantidad.
    x[5].innerHTML=`<span style="font-weight:bold;">` + subtotal + `</span>`;//cambio el valor de la columna subtotal (la columna 5) por la que calcula con los parámetros.
    costoTotal();
}

function costoTotal(){
//Actualiza el monto total, sumando los precios de cada artículo y el costo de envío.
    var table = document.getElementById("articlesTable");
    let subTotal = 0;
    let cantidades = document.getElementsByClassName("cartCantidad");
    for (let i=1;i < table.rows.length; i++){//sumo el subtotal de cada artículo en el carrito
        let costo = table.rows[i].cells[2].innerHTML;
        let cantidad = cantidades[i-1].value;
        let moneda = table.rows[i].cells[3].innerHTML;
        if (moneda == "UYU")
            subTotal += costo * cantidad;
        else
            subTotal += costo * 40 * cantidad;//Si no está en UYU lo paso a UYU
    }
    let divSubTotal = document.getElementById("subTotalCostos");//el lugar donde quiero que se muestre el costo de todos los artículos sin el envío
    divSubTotal.innerHTML = subTotal + "UYU";

    let divCostoEnvioCostos = document.getElementById("costoEnvioCostos");//el lugar donde quiero que se muestre el costo de envio
    let CostoEnvio = 0.0;
    if (document.getElementById('premiumradio').checked)
        CostoEnvio = subTotal * 0.15;
    if (document.getElementById('expressradio').checked)
        CostoEnvio = subTotal * 0.07;
    if (document.getElementById('standardradio').checked)
        CostoEnvio = subTotal * 0.05;
    divCostoEnvioCostos.innerHTML = (CostoEnvio.toFixed()) + "UYU"; //El .toFixed() le saca las comas

    let divTotalCostos = document.getElementById("totalCostos");//el lugar donde quiero que se muestre el costo incluyendo el envio
    let totalTotal = subTotal + CostoEnvio;
    divTotalCostos.innerHTML = (totalTotal.toFixed() + "UYU");
    
}

function showFormaPago(){
    formaPago = document.getElementById("formaPagoHTML");
    btnFormaPago = document.getElementById("btnFormaPago")
    option = document.getElementById("formaPago").value;
    if (option == "Efectivo"){
        formaPago.innerHTML = formaPagoEfectivoHTML;
        btnFormaPago.innerHTML = "Efectivo";
    }
        
    if (option == "Debito"){
        formaPago.innerHTML = formaPagoDebitoHTML;
        btnFormaPago.innerHTML = "Debito";
    }
        
    if (option == "Credito"){
        formaPago.innerHTML = formaPagoCreditoHTML;
        btnFormaPago.innerHTML = "Credito";
    }
        
}

document.getElementById("formaPago").addEventListener("change",function(){
    showFormaPago();
});

function eliminarArticulo(id){
    _articulos.splice(id,1);
    showArticles(_articulos);
    costoTotal();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_DESAFIATE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartInfo = resultObj.data;
            _articulos = cartInfo.articles;
            //Muestro articulos
            showArticles(_articulos);

            costoTotal();

            showFormaPago();
        }
    });


});