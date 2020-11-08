   
function login(){
    var DataLogin = JSON.parse(localStorage.getItem('DataLogin')); //DataLogin es la lista, array, donde guardo los datos de cada usuario "registrado"
    
    var correoP = document.getElementById("inputEmail").value; //Tomo del form de login.html el mail y la contraseña
    var passP = document.getElementById("inputPassword").value;
    var bandera = false;
    var passCheck = false;
    for (var i = 0; i < DataLogin.length; i++){ //Miro si el usuario ingresado en el login no eixte ya en la lista (ya entró alguna vez y ya lo guardé)
        if (DataLogin[i].correo == correoP){
            bandera = true; //Si encuentra el correo setea esta variable en true
            if (DataLogin[i].password == passP){ //chequea que la contraseña sea la misma que la que usó la primera vez que ingresó (la guardada en al lista)
                passCheck = true; //Si la contraseña coincide con la ingresada la priemra vez, pongo esto en true
            }
            break;
        }
    }
    if (!bandera){
        var persona = {
            correo: correoP, 
            password: passP, 
            nombres: "", 
            apellidos: "", 
            edad: "", 
            telefono: "",
            img: `<img src="https://i.ibb.co/3yPgqkt/pexels-photo-220453.jpg" width="100" alt="100" border="0">`
        };
        DataLogin.push(persona);
        localStorage.setItem('contador', 1);
        localStorage.setItem('usuario', correoP) //Esta variable es un string que simplemente almacena el mail del usuario logueado. Se sobreescribe cada vez que cambia usuario.
        localStorage.setItem('DataLogin', JSON.stringify(DataLogin));
        window.location.href = "inicio.html";
    } //Si el correo no existe en DataLogin (bandera nunca es seteada a true), lo agrega a DataLoign, con el correo y la contraseña ingresados, y 
    //el resto de los valores del perfil vacíos
    else{
        if (passCheck){ 
            localStorage.setItem('contador', 1);
            localStorage.setItem('usuario', correoP)
            window.location.href = "inicio.html";
        } //Si el usuario ya existía y puso la contraseña bien, entro a la página y seteo usuario logueado en el mail.
        else{
            alert("La contraseña no es correcta.");
            correoP = "";
            passP = "";
        } //Si el mail ya fue usado pero la contraseña no es la misma que la guardada, hago esto (dejo en todo en blanco y cartelito)
    }
    
}
