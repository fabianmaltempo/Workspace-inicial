if (localStorage.getItem('contador') == null){
    localStorage.setItem('contador', 0);
    window.location.href = "login.html";    
}
if (localStorage.getItem('DataLogin') == null){
    var DataLogin = [];
    localStorage.setItem("DataLogin", JSON.stringify(DataLogin));
    window.location.href = "login.html";  
}
if (localStorage.getItem('comentarios') == null){
    var comentarios = [];
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
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
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <a class="py-2 d-none d-md-inline-block" href="inicio.html">Inicio</a>
            </div>
            <div class="col-sm">
                <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
            </div>
            <div class="col-sm">
                <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
            </div>
            <div class="col-sm">
                <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
            </div>
            <div class="col-sm">
                <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ` + localStorage.getItem('usuario') + `
                        </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" id="NavMiCarrito" href="cart.html">Mi Carrito</a>
                        <a class="dropdown-item" id="NavMiPerfil" href="my-profile.html">Mi Perfil</a>
                        <a class="dropdown-item" id="NavCerrarSesion" href="#" onClick="cerrar()">Cerrar Sesión</a>
                    </div>
                </div>
            </div>
        </div>
    `   
    
    document.getElementById("header").innerHTML = htmlContentToAppend;
}

