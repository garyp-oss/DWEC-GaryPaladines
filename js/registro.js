const EDAD_MINIMA = 12;

function denegarAcceso(motivo) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = "Acceso denegado";
  mensaje.className = "error";
  console.log("Motivo:", motivo); // solo para depurar
}

function validarPerfil() {
  const nombre = document.getElementById("nombre").value.trim();
  const fecha = document.getElementById("fecha").value;

  if (nombre === "") { denegarAcceso("nombre vacío"); return; }
  if (fecha === "") { denegarAcceso("fecha vacía"); return; }

  const fechaNac = parsearFecha(fecha);
  if (fechaNac >= new Date()) { denegarAcceso("fecha futura"); return; }
  if (calcularEdad(fechaNac) < EDAD_MINIMA) { denegarAcceso("edad mínima"); return; }

  sessionStorage.setItem("nombre", nombre);
  sessionStorage.setItem("fecha", fecha);
  window.location.href = "juego.html";
}

document.getElementById("btnEntrar").addEventListener("click", validarPerfil);