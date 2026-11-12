const nombreGuardado = sessionStorage.getItem("nombre");
const fechaGuardada = sessionStorage.getItem("fecha");

function formatearNombre(texto) {
  const palabras = texto.trim().toLowerCase().split(" ");
  let resultado = "";
  for (let i = 0; i < palabras.length; i++) {
    if (palabras[i] !== "") {
      resultado += palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1) + " ";
    }
  }
  return resultado.trim();
}

function iniciarJuego() {
  const nombreFormateado = formatearNombre(nombreGuardado);
  document.getElementById("saludo").textContent = "¡Bienvenido, " + nombreFormateado + "!";

  const codigo = nombreFormateado.slice(0, 3).toUpperCase() + "-" +
                 nombreFormateado.split(" ").join("").length;
  document.getElementById("infoNombre").textContent = "Código de jugador: " + codigo;
}