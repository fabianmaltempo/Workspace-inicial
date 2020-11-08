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
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <div class="col">
                        <li class="nav-item">
                            
                                <a class="py-2 d-none d-md-inline-block nav-link" href="inicio.html">Inicio</a>
                            
                        </li>
                    </div>
                    <div class="col">
                        <li class="nav-item">
                            
                                <a class="py-2 d-none d-md-inline-block nav-link" href="categories.html">Categorías</a>
                            
                        </li>
                    </div>
                    <div class="col">
                        <li class="nav-item">
                            
                                <a class="py-2 d-none d-md-inline-block nav-link" href="products.html">Productos</a>
                            
                        </li>
                    </div>
                    <div class="col">
                        <li class="nav-item">
                            
                                <a class="py-2 d-none d-md-inline-block nav-link" href="sell.html">Vender</a>
                            
                        </li>
                    </div>
                    <div class="col">
                        <li class="nav-item dropdown">
                            
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    ` + localStorage.getItem('usuario') + `
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" id="NavMiCarrito" href="cart.html">Mi Carrito</a>
                                    <a class="dropdown-item" id="NavMiPerfil" href="my-profile.html">Mi Perfil</a>
                                    <a class="dropdown-item" id="NavCerrarSesion" href="#" onClick="cerrar()">Cerrar Sesión</a>
                                </div>
                            
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
    `
    /*
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
    */   
    
    document.getElementById("header").innerHTML = htmlContentToAppend;
}

