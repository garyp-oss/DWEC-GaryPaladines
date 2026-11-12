const nombreGuardado = sessionStorage.getItem("nombre");
const fechaGuardada = sessionStorage.getItem("fecha");

function iniciarJuego() {
  document.getElementById("saludo").textContent = "Hola, " + nombreGuardado;
}

// Si alguien entra directo a juego.html sin perfil, lo mandamos al registro
if (nombreGuardado === null || fechaGuardada === null) {
  window.location.href = "index.html";
} else {
  iniciarJuego();
}