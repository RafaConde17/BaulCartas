const btn = document.getElementById("btnComenzar");
const cerrar = document.getElementById("cerrarPopup");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const cartaCerrada = document.getElementById("cartaCerrada");
const musica = document.getElementById("musica");
const snow = document.getElementById("snow");

snow.style.display = "none";

/* BOTÓN COMENZAR */
btn.addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.classList.add("locked");

    cartaCerrada.style.display = "flex";
    popup.style.display = "none";

    snow.style.display = "block";

    musica.volume = 0;
    musica.play();

    let vol = 0;
    const fadeIn = setInterval(() => {
        if (vol < 0.4) {
            vol += 0.02;
            musica.volume = vol;
        } else {
            clearInterval(fadeIn);
        }
    }, 100);
});

/* ABRIR CARTA */
cartaCerrada.addEventListener("click", () => {
    cartaCerrada.style.display = "none";
    popup.style.display = "block";
});

/* CERRAR TODO */
cerrar.addEventListener("click", () => {
    overlay.classList.remove("active");
    document.body.classList.remove("locked");

    popup.style.display = "none";
    cartaCerrada.style.display = "none";
    snow.style.display = "none";

    let vol = musica.volume;
    const fadeOut = setInterval(() => {
        if (vol > 0) {
            vol -= 0.02;
            musica.volume = vol;
        } else {
            musica.pause();
            musica.currentTime = 0;
            clearInterval(fadeOut);
        }
    }, 100);
});
