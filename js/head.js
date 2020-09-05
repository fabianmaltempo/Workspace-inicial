if (localStorage.getItem('contador') == null){
    localStorage.setItem('contador', 0);
    window.location.href = "login.html";    
}
if (localStorage.getItem('DataLogin') == null){
    var DataLogin = [];
    localStorage.setItem("DataLogin", JSON.stringify(DataLogin));
    window.location.href = "login.html";  
}

function check(){
    var contador = localStorage.getItem('contador');
    if (contador == 0){
        window.location.href = 'login.html';
    }
}



function cerrar(){
    localStorage.setItem('contador',0);
    window.location.href = "login.html";
}

function nav(){
    htmlContentToAppend = `
    <div class="container d-flex flex-column flex-md-row justify-content-between">
        <a class="py-2 d-none d-md-inline-block" href="inicio.html">Inicio</a>
        <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
        <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
        <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
        <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
        <p class="py-2 d-none d-md-inline-block">` + localStorage.getItem('usuario') + `</p>
        <button class="py-2 d-none d-md-inline-block" onclick="cerrar();">Cerrar sesión</button>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
    </div>
    `


        
    
    document.getElementById("header").innerHTML = htmlContentToAppend;
}

