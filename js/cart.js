const CART_DESAFIATE = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

function showArticles(articleArray){
    let htmlContentToAppend = "";
    for (let i=0;i < articleArray.length; i++){
        htmlContentToAppend += `
        <tr>
            <td scope="col"><img class="img-fluid img-thumbnail" src="` + articleArray[i].src + `" width="100" alt=""></td>
            <td scope="col">` + articleArray[i].name + `</td>
            <td scope="col">` + articleArray[i].unitCost + `</td>
            <td scope="col">` + articleArray[i].currency + `</td>
            <td scope="col"><input onchange="
                changeSubtotal(this.value,` + articleArray[i].unitCost + `,'` + articleArray[i].currency + `',` + (i+1) + ` )"



            type="number" class="cartCantidad" name="quantity" value="` + articleArray[i].count + `" min="1"></td>
            <td scope="col"><span style="font-weight:bold;">` + articleArray[i].unitCost * articleArray[i].count + articleArray[i].currency + `</span></td>
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
        let moneda = table.rows[i].cells[3].innerHTML
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_DESAFIATE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartInfo = resultObj.data;

            //Muestro articulos
            showArticles(cartInfo.articles);

            costoTotal();

            
        }
    });


});