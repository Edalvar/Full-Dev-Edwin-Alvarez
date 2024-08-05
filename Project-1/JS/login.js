//construyo el objeto usuarios
const usuarios = [
    { id: 1, usuario: 'usuario1', clave: '1234' },
    { id: 2, usuario: 'usuario2', clave: '5678' },
    { id: 3, usuario: 'usuario3', clave: '9101' },
    { id: 4, usuario: 'usuario4', clave: '1121' },
    { id: 5, usuario: 'usuario5', clave: '3141' },
    { id: 6, usuario: 'edalvar', clave: '4818' }
];

const maxIntentos = 3;

/* Asigno a la variable "intentos" el valor que tiene en el local storage, 
si no existe (si devuelve Null), la parte || mira la segunda parte {} 
e inicia en el localstorage la variable "intentos" como un objeto vacío {} */

let intentos = JSON.parse(localStorage.getItem('intentos')) || {};

function login() {
    const inputUsuario = document.getElementById('usuario').value;
    const inputClave = document.getElementById('clave').value;

    const usuario = usuarios.find(u => u.usuario === inputUsuario);

    // impresiones de prueba en la consola  
    console.log(usuario); 
    console.log('Intentos antes de validar:', intentos);

    if (!usuario) { // el signo "!" niega el valor siguiente, es decir , si (usuario) es undefined, (!usuario) es true
       
        alert('Usuario incorrecto');

        return;  // si el usuario no es correcto ordeno finalizar la ejecución de la función
    }

    /*el siguiente "if" miro si intentos ya tiene un valor true (es decir que no sea false,Null, undefined, 0, etc),
     si no lo tiene brinca al siguiente "if", si lo tiene verifico que no sea mayor que el numero
      maximo de intentos permitidos (maxIntentos), si no es mayor brinca al siguiente "if" si es mayor, es decir se 
      se cumplem ambas condiciones(Intentos = true y >= 3) envio mensaje de bloqueo  y finalizo la
        */ 

    if (intentos[usuario.usuario] && intentos[usuario.usuario] >= maxIntentos) {

        alert('Usuario bloqueado por demasiados intentos fallidos');
        return;  // si los intentos de clave para un usuario superan los 3, ordeno finalizar función
    }

    if (usuario.clave === inputClave) {
        
        alert('Inicio de sesión exitoso');
        
        intentos[usuario.usuario] = 0;  // Resetear los intentos en caso de éxito
        localStorage.setItem('intentos', JSON.stringify(intentos));
    } else {
        alert('Clave incorrecta');
       
        /* en la siguiente linea sumo 1 en el contador por cada vez que la clave sea errónea, 
        igual que en el caso anterior agrego (|| 0) en caso de que no tenga valor anterior le asigne 0 */

        intentos[usuario.usuario] = (intentos[usuario.usuario] || 0) + 1;
        if (intentos[usuario.usuario] >= maxIntentos) {
            alert('Usuario bloqueado por demasiados intentos fallidos');
        }
        //setteo el nuevo valor de intentos 
        localStorage.setItem('intentos', JSON.stringify(intentos));
    }
}