//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function login(){
    var DataLogin = JSON.parse(localStorage.getItem('DataLogin'));
    
    var correoP = document.getElementById("inputEmail").value;
    var passP = document.getElementById("inputPassword").value;
    var bandera = false;
    var passCheck = false;
    for (var i = 0; i < DataLogin.length; i++){
        if (DataLogin[i].correo == correoP){
            bandera = true;
            if (DataLogin[i].password == passP){
                passCheck = true;
            }
            break;
        }
    }
    if (!bandera){
        var persona = {correo: correoP, password: passP, nombres: "", apellidos: "", edad: "", telefono: ""};
        DataLogin.push(persona);
        localStorage.setItem('contador', 1);
        localStorage.setItem('usuario', correoP)
        localStorage.setItem('DataLogin', JSON.stringify(DataLogin));
        window.location.href = "inicio.html";
    }
    else{
        if (passCheck){
            localStorage.setItem('contador', 1);
            localStorage.setItem('usuario', correoP)
            window.location.href = "inicio.html";
        }
        else{
            alert("La contraseña no es correcta.");
            correoP = "";
            passP = "";
        }   
    }
    
}
