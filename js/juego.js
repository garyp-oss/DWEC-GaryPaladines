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

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
               "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function diasParaCumple(fechaNac) {
  const hoy = new Date();
  const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const proximo = new Date(hoy.getFullYear(), fechaNac.getMonth(), fechaNac.getDate());
  if (proximo < hoySinHora) {
    proximo.setFullYear(hoy.getFullYear() + 1); // ya pasó: será el año que viene
  }
  const msPorDia = 1000 * 60 * 60 * 24;
  return Math.round((proximo - hoySinHora) / msPorDia);
}

function aplicarEstilos(nombre, edad) {
  const panel = document.getElementById("panel");
  // El color de fondo depende de la longitud del nombre
  const tono = (nombre.length * 37) % 360;
  panel.style.backgroundColor = "hsl(" + tono + ", 70%, 88%)";

  // El color del texto y del borde dependen de la edad
  if (edad < 18) {
    panel.style.color = "#0d47a1";
    panel.style.borderLeft = "10px solid #1e88e5";
  } else {
    panel.style.color = "#4a148c";
    panel.style.borderLeft = "10px solid #8e24aa";
  }
}

function iniciarJuego() {
  const nombreFormateado = formatearNombre(nombreGuardado);
  document.getElementById("saludo").textContent = "¡Bienvenido, " + nombreFormateado + "!";

  const codigo = nombreFormateado.slice(0, 3).toUpperCase() + "-" +
                 nombreFormateado.split(" ").join("").length;
  document.getElementById("infoNombre").textContent = "Código de jugador: " + codigo;

    const fechaNac = parsearFecha(fechaGuardada);
  const edad = calcularEdad(fechaNac);
  document.getElementById("infoEdad").textContent =
    "Edad: " + edad + " años (nacido el " + fechaNac.getDate() + " de " +
    MESES[fechaNac.getMonth()] + " de " + fechaNac.getFullYear() + ")";
  document.getElementById("infoDia").textContent = "Naciste un " + DIAS[fechaNac.getDay()];

  const dias = diasParaCumple(fechaNac);
  document.getElementById("infoCumple").textContent =
    dias === 0 ? "¡Hoy es tu cumpleaños!" : "Faltan " + dias + " días para tu cumpleaños";

}
  aplicarEstilos(nombreFormateado, edad);