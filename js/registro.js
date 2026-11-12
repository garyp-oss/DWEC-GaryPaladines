function validarPerfil() {
  const nombre = document.getElementById("nombre").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (nombre === "") {
    mensaje.textContent = "Acceso denegado";
    mensaje.className = "error";
    return; // return corta la función: "no continuar"
  }
  mensaje.textContent = "Bienvenido, " + nombre;
  mensaje.className = "ok";
}

document.getElementById("btnEntrar").addEventListener("click", validarPerfil);