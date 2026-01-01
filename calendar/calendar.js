
document.addEventListener("DOMContentLoaded", () => {



    
    // Elementos principales
    const calendarGrid = document.getElementById("calendarGrid");
    const currentMonthText = document.getElementById("currentMonth");
    const selectedDateText = document.getElementById("selectedDateText");
    const activityList = document.getElementById("activityList");

    // Botones
    const btnAgregar = document.getElementById("btnAgregar");
    const btnGuardar = document.getElementById("guardarActividad");
    const btnCancelar = document.getElementById("cancelarActividad");

    // Modal (tus IDs reales)
    const modal = document.getElementById("modalAct");
    const inputActividad = document.getElementById("actividadInput");

    let currentDate = new Date();
    let selectedDate = null; // yyyy-m-d


    function formatKey(y, m, d) {
        return `${y}-${m}-${d}`;
    }

    function cargarCalendario() {
        calendarGrid.innerHTML = "";

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        currentMonthText.textContent = currentDate.toLocaleString("es-ES", {
            month: "long",
            year: "numeric"
        });

        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement("div");
            calendarGrid.appendChild(empty);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dayBox = document.createElement("div");
            dayBox.classList.add("day");
            dayBox.textContent = d;

            const key = formatKey(year, month + 1, d);

            const tasks = JSON.parse(localStorage.getItem(key) || "[]");
            if (tasks.length > 0) dayBox.classList.add("has-task");

            const today = new Date();
            if (
                d === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                dayBox.classList.add("today");
            }

            dayBox.addEventListener("click", () => {
                seleccionarDia(year, month, d);
            });

            calendarGrid.appendChild(dayBox);
        }
    }

    function seleccionarDia(y, m, d) {
        selectedDate = formatKey(y, m + 1, d);
        selectedDateText.textContent = `Actividades del ${d}/${m + 1}/${y}`;
        mostrarActividades();
    }

    function mostrarActividades() {
        activityList.innerHTML = "";

        if (!selectedDate) return;

        const tasks = JSON.parse(localStorage.getItem(selectedDate) || "[]");

        tasks.forEach((t, index) => {
            const li = document.createElement("li");
            li.textContent = t;

            const btnDel = document.createElement("button");
            btnDel.textContent = "Eliminar";
            btnDel.className ="btn";
            btnDel.style.marginLeft = "10px";

            btnDel.addEventListener("click", () => eliminarActividad(index));

            li.appendChild(btnDel);
            activityList.appendChild(li);
        });
    }

    function eliminarActividad(i) {
        const tasks = JSON.parse(localStorage.getItem(selectedDate) || "[]");
        tasks.splice(i, 1);
        localStorage.setItem(selectedDate, JSON.stringify(tasks));
        mostrarActividades();
        cargarCalendario();
    }

    // Cambio de mes
    document.getElementById("prevMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        cargarCalendario();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        cargarCalendario();
    });

    // -------------------------
    //      MODAL
    // -------------------------

    // Abrir modal
    btnAgregar.addEventListener("click", () => {
        if (!selectedDate) {
            alert("Primero selecciona un día del calendario.");
            return;
        }

        modal.style.display = "flex";
        inputActividad.focus();
        
    });

    // Guardar actividad
    btnGuardar.addEventListener("click", () => {
        const texto = inputActividad.value.trim();
        if (texto === "") {
            alert("Ingresa una actividad.");
            return;
        }

        const tasks = JSON.parse(localStorage.getItem(selectedDate) || "[]");
        tasks.push(texto);
        localStorage.setItem(selectedDate, JSON.stringify(tasks));

        inputActividad.value = "";
        modal.style.display = "none";

        mostrarActividades();
        cargarCalendario();
    });

    // Cancelar modal
    btnCancelar.addEventListener("click", () => {
        modal.style.display = "none";
        inputActividad.value = "";
    });

    // Cerrar modal clickeando afuera
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            inputActividad.value = "";
        }
    });

    cargarCalendario();
});
