/* ===============================
   CAJA DE CARTAS – JS FINAL
   =============================== */

const vault = document.getElementById("vault");
const cards = document.getElementById("cards");
const overlay = document.getElementById("overlay");
const iframe = document.getElementById("iframeCarta");
const cerrarPopup = document.getElementById("cerrarPopup");
const particlesContainer = document.getElementById("particles");

let vaultOpen = false;

/* ===============================
   ABRIR / CERRAR COFRE
   =============================== */
vault.addEventListener("click", () => {
    vaultOpen = !vaultOpen;

    if (vaultOpen) {
        vault.classList.add("open");
        cards.classList.remove("hidden");
        lanzarParticulas();
    } else {
        vault.classList.remove("open");
        cards.classList.add("hidden");
    }
});

/* ===============================
   PARTÍCULAS (SOLO AL ABRIR)
   =============================== */
function lanzarParticulas() {
    particlesContainer.innerHTML = "";

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("span");
        particle.classList.add("particle");

        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;

        particle.style.left = "50%";
        particle.style.top = "45%";
        particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--y", `${Math.sin(angle) * distance - 40}px`);

        particlesContainer.appendChild(particle);

        setTimeout(() => particle.remove(), 1200);
    }
}

/* ===============================
   ABRIR CARTA (POPUP)
   =============================== */
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", (e) => {
        e.stopPropagation(); // evita cerrar el baúl
        const url = card.dataset.carta;
        iframe.src = url;
        overlay.classList.remove("hidden");
    });
});

/* ===============================
   CERRAR POPUP
   =============================== */
cerrarPopup.addEventListener("click", cerrarCarta);
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cerrarCarta();
});

function cerrarCarta() {
    overlay.classList.add("hidden");
    iframe.src = "";
}
