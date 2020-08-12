function inicializar(){
    localStorage.setItem('contador', 0);
    window.location.href = 'inicio.html';

}

function check(){
    var contador = localStorage.getItem('contador');
    if (contador == 0)
        window.location.href = 'login.html';
}

function login(){
    localStorage.setItem('contador', 1);
}
