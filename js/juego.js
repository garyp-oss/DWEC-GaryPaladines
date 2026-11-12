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

const META = 100;
let puntos = 0;
let historial = [];            // array: todas las acciones de la partida
let misionesCompletadas = [];  // array: nombres de misiones hechas

function numeroAleatorio(min, max) {
  // entero entre min y max, ambos incluidos
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function completarMision(nombreMision) {
  if (!misionesCompletadas.includes(nombreMision)) {
    misionesCompletadas.push(nombreMision);
    historial.push(" Misión completada: " + nombreMision);
  }
}

function actualizarPantalla() {
  document.getElementById("puntos").textContent = puntos;
  document.getElementById("barra").value = puntos;
  document.getElementById("porcentaje").textContent =
    ((puntos / META) * 100).toFixed(1) + "%";

  const lista = document.getElementById("historial");
  lista.innerHTML = "";
  const ultimas = historial.slice(-5).reverse(); // las 5 últimas, la más nueva arriba
  for (let i = 0; i < ultimas.length; i++) {
    const li = document.createElement("li");
    li.textContent = ultimas[i];
    lista.appendChild(li);
  }
}

function cambiarPuntos(cantidad, texto) {
  puntos = Math.max(0, puntos + cantidad); // nunca baja de 0
  puntos = Math.min(puntos, META);         // nunca pasa de la meta
  historial.push(texto);
  document.getElementById("resultado").textContent = texto;
  actualizarPantalla();
}

function atacar() {
  completarMision("Primer ataque");
  if (Math.random() < 0.15) { // 15% de probabilidad de fallar
    cambiarPuntos(-5, " El monstruo contraataca: -5");
    return;
  }
  const base = numeroAleatorio(5, 15);
  const critico = Math.random() < 0.2; // 20% de golpe crítico
  const dano = Math.round(critico ? base * 1.5 : base);
  const etiqueta = critico ? " ¡Golpe crítico!" : " Ataque";
  cambiarPuntos(dano, etiqueta + ": +" + dano);
}

const premios = [
  { texto: "Moneda de oro", puntos: 5 },
  { texto: "Poción mágica", puntos: 10 },
  { texto: "Trampa explosiva", puntos: -8 },
  { texto: "Gema rara", puntos: 20 }
];

function abrirCofre() {
  completarMision("Primer cofre");
  const premio = premios[numeroAleatorio(0, premios.length - 1)];
  const signo = premio.puntos > 0 ? "+" : "";
  cambiarPuntos(premio.puntos, " Cofre: " + premio.texto + " (" + signo + premio.puntos + ")");
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
  document.getElementById("btnCofre").addEventListener("click", abrirCofre);

}

  document.getElementById("meta").textContent = META;
  document.getElementById("barra").max = META;
  document.getElementById("btnAtacar").addEventListener("click", atacar);
  actualizarPantalla();

  aplicarEstilos(nombreFormateado, edad);