document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".box__button");
    const sections = document.querySelectorAll(".detalles__resumen");

    // Mostrar "Experiencia" al cargar
    showSection("experiencia");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const texto = button.textContent.trim().toLowerCase().replace(/\s+/g, ''); // experiencia, educacion, etc.
            showSection(texto);
        });
    });

    function showSection(className) {
        sections.forEach((section) => {
            if (section.classList.contains(className)) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    }
});
