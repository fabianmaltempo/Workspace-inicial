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
    htmlContentToAppend += `
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="` + array[0] + `" class="d-block w-100" alt="20">
            </div>`;
    
            

        

    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
            <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100 alt="20"">
            </div>
        `;        
    }
    htmlContentToAppend += `
        </div>
        <a class="carousel-control-prev" href="#productImagesGallery" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#productImagesGallery" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    `;
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
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

    var lista = JSON.parse(localStorage.getItem('comentarios'));
    for(let i = 0; i < lista.length; i++){

        htmlContentToAppend += `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>.checked {
            color: orange;
          }
        </style>
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">`;

        //mostrar estrellas
        for (let j = 0; j < lista[i].score; j++){
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
        }
        for (let j=0; j < 5-lista[i].score; j++){
            htmlContentToAppend += `<span class="fa fa-star"></span>`;
        } 

        //mostrar descripcion
        htmlContentToAppend += `<br>` + lista[i].description;

        //mostrar usuario
        htmlContentToAppend += `<br>` + lista[i].user;

        //mostrar fecha
        htmlContentToAppend += `<br>` + lista[i].dateTime;

        //cerrar
        htmlContentToAppend += `
            </div>
        </div>
        `;

        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}

function submitComment(){
    var radios = document.getElementsByName('agregarComentarioScore');
    var Puntuacion = 0;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            Puntuacion = (i+1);
            break;
        }
    }   
    var Comentario = document.getElementById("agregarComentarioCom").value;
    var Fecha = new Date().toISOString();
    var usuario = localStorage.getItem('usuario');

    var lista = JSON.parse(localStorage.getItem('comentarios'));
    var fullComent = {score: Puntuacion, description: Comentario, user: usuario, dateTime: Fecha};
    lista.push(fullComent);
    localStorage.setItem('comentarios', JSON.stringify(lista));
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