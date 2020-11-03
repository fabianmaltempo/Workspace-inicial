//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showProfile();
});

function showProfile(){
    mpNombre = document.getElementById("mpNombre");
    eNombre = document.getElementById("eNombre");
    mpApellido = document.getElementById("mpApellido");
    eApellido = document.getElementById("eApellido");
    mpEdad = document.getElementById("mpEdad");
    eEdad = document.getElementById("eEdad");
    mpEmail = document.getElementById("mpEmail");
    eEmail = document.getElementById("eEmail");
    mpTelefono = document.getElementById("mpTelefono");
    eTelefono = document.getElementById("eTelefono");

    var DataLogin = JSON.parse(localStorage.getItem('DataLogin'));

    DataLogin.forEach(write);

    
    function write(p){
        var loggeduser= "";
        loggeduser = localStorage.getItem('usuario');
        
        if (p.correo == loggeduser){
            mpNombre.innerHTML += p.nombres;
            eNombre.value += p.nombres;
            mpApellido.innerHTML += p.apellidos;
            eApellido.value += p.apellidos;
            mpEdad.innerHTML += p.edad;
            eEdad.value += p.edad;
            mpEmail.innerHTML += p.correo;
            eEmail.value += p.correo;
            mpTelefono.innerHTML += p.telefono;
            eTelefono.value += p.telefono;
        }
        
    }
    
}


//Modificar datos personales
document.getElementById("mpForm").addEventListener("submit", function() {
    var DataLogin = JSON.parse(localStorage.getItem('DataLogin'));
    DataLogin.forEach(change);

    function change(p){
        var loggeduser= "";
        loggeduser = localStorage.getItem('usuario');
        
        if (p.correo == loggeduser){
            p.nombres = eNombre.value;
            p.apellidos = eApellido.value;
            p.edad = eEdad.value;
            p.correo = eEmail.value;
            p.telefono = eTelefono.value;
            localStorage.setItem('usuario', p.correo);
        }
    }

    localStorage.setItem('DataLogin', JSON.stringify(DataLogin));
    location.reload();
  });