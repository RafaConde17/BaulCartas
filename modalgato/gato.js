document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnComenzar");
    const popup = document.getElementById("popupGato");
    const mensaje = document.getElementById("mensajeGato");

    btn.addEventListener("click", () => {
        popup.classList.remove("oculto");

        // Mensaje de despedida a los 8s
        setTimeout(() => {
            mensaje.textContent = "Adiós humano 😼✨";
            mensaje.style.animation = "fadeIn 0.6s ease-out";
        }, 8000);

        // Ocultar a los 10s
        setTimeout(() => {
            popup.classList.add("oculto");
        }, 10000);
    });
});
