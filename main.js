document.addEventListener("DOMContentLoaded", function () {
    //Variables
    const buttons = document.querySelectorAll(".box__button"); //Seleccionamos todos los botones con la clase .box__button
    const sections = document.querySelectorAll(".detalles__resumen"); //Seleccionamos todos los botones con la clase .detalles__resumen

    // Mostrar "Experiencia" al cargar
    showSection("experiencia");

    //Recorrecomes todos los botones y les aplicamos el evento addEventListener click
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
