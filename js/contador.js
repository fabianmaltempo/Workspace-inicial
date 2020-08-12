function inicializar(){
    localStorage.setItem('contador', 0);
}

function check(){
    contador = localStorage.getItem('contador');
    if (contador == 0)
        window.location.href = 'login.html';
}

function login(){
    localStorage.setItem('contador', 1);
}
