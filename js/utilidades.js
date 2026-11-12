function parsearFecha(texto) {
  // "2008-05-20" -> Date(2008, 4, 20). Los meses empiezan en 0.
  const partes = texto.split("-").map(Number);
  return new Date(partes[0], partes[1] - 1, partes[2]);
}

function calcularEdad(fechaNac) {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const aunNoCumple =
    hoy.getMonth() < fechaNac.getMonth() ||
    (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate());
  if (aunNoCumple) {
    edad--; // este año todavía no ha cumplido años
  }
  return edad;
}