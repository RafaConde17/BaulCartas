/* ===============================
   VARIABLES
================================ */
const chatbot = document.getElementById("chatbot");
const chatbotMin = document.getElementById("chatbotMin");
const chatBody = document.getElementById("chatBody");
const botOptions = document.getElementById("botOptions");
const moreOptions = document.getElementById("moreOptions");

/* ===============================
   MOSTRAR BOT AL CARGAR
================================ */
window.addEventListener("load", () => {
  setTimeout(() => {
    chatbot.classList.add("show");
  }, 800);
});

/* ===============================
   RESPUESTAS
================================ */
const respuestas = {
 color: "🎨 Su color favorito es el lila 💜",
        cumple: "🎂 Su cumpleaños es el 3 de abril",
        nombre: "💜 Se llama Yael Sarai Flores",
        canciones: "🎶 Canciones dedicadas: Locos – León Larregui, Bad – Wave to Earth",
        gatito: "🐱 Sus gatitos se llaman Corazón y Lasaño",
        conocieron: "📍 Se conocieron en la Zona Peruana 🇵🇪",
        fecha: "📅 Se conocieron el 07 de noviembre",
        mesiversario: "💞 Celebran su mesiversario los 18 y 19 de noviembre",
        bts: "🎤 Su grupo favorito es BTS y ama a Taehyung",
        regalo: "🎁 El regalo perfecto sería un peluche de BT21",
        tradicion: "💋 Tradición: 12 besos al final del año 💜",
        besos: "😘 Tipos de besos: Peruano 🇵🇪, Antártida ❄️, Mexicano 🇲🇽"};

/* ===============================
   RESPONDER
================================ */
function responder(tipo) {
  // Mensaje del usuario
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = document.querySelector(
    `button[onclick="responder('${tipo}')"]`
  ).textContent;
  chatBody.appendChild(userMsg);

  // Respuesta del bot
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.textContent = respuestas[tipo];
    chatBody.appendChild(botMsg);




    chatBody.scrollTop = chatBody.scrollHeight;

    // Ocultar botones principales
    botOptions.classList.add("hidden");
    moreOptions.classList.remove("hidden");
  }, 150);
}

/* ===============================
   MOSTRAR OPCIONES OTRA VEZ
================================ */
function mostrarOpciones() {
  moreOptions.classList.add("hidden");
  botOptions.classList.remove("hidden");
}

/* ===============================
   MINIMIZAR BOT
================================ */
function minimizarBot() {
  chatbot.classList.remove("show");
  chatbotMin.style.display = "flex";
}

/* ===============================
   ABRIR BOT DESDE ICONO
================================ */
function abrirBot() {
  chatbot.classList.add("show");
  chatbotMin.style.display = "none";
}
