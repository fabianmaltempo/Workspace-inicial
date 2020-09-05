var product = {};
var productsAll = [];
var comments = [];

function showRelatedProducts(array)
{
    
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++)
    {
        let pos = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + productsAll[pos].imgSrc + `" alt="">
            </div>
        </div>
        `

            
    }
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;    
}

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}


function showComments(array){
    let htmlContentToAppend = "";

    
    for(let i = 0; i < array.length; i++){

        htmlContentToAppend += `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>.checked {
            color: orange;
          }
        </style>
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">`;

        //mostrar estrellas
        for (let j = 0; j < array[i].score; j++){
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
        }
        for (let j=0; j < 5-array[i].score; j++){
            htmlContentToAppend += `<span class="fa fa-star"></span>`;
        } 

        //mostrar descripcion
        htmlContentToAppend += `<br>` + array[i].description;

        //mostrar usuario
        htmlContentToAppend += `<br>` + array[i].user;

        //mostrar fecha
        htmlContentToAppend += `<br>` + array[i].dateTime;

        //cerrar
        htmlContentToAppend += `
            </div>
        </div>
        `;

        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + product.currency;
            productCountHTML.innerHTML = product.soldCount;
            productCriteriaHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            //Muestro imágenes de productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultProd)
            {
                if (resultProd.status === "ok")
                {
                    productsAll = resultProd.data;
                    showRelatedProducts(product.relatedProducts);

                }
            });
            
            //Muestro comentarios
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultProd)
            {
                if (resultProd.status === "ok")
                {
                    comments = resultProd.data;
                    showComments(comments);

                }
            });
        }
    });
});