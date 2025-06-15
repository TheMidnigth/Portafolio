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

    //Validaciones del formulario
    const fields = {
        name: { regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/, errorMessage: "El nombre debe tener al menos 3 palabras y no contener numeros." },
        email: { regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, errorMessage: "El correo solo puede contener letras,numeros,puntos,guiones y guion bajo." },
        phone: { regex: /^\d{1,10}$/, errorMessage: "El teléfono solo puede contener números (máx. 10)." },
        emailsubject: { regex: /^.{3,}$/, errorMessage: "El asunto debe tener al menos 3 caracteres." },
        comentario: { regex: /^.{1,}$/, errorMessage: " Por favor, ingrese un comentario." }
    };

    //Variables
    const formulario = document.querySelector(".formulario__contactos");
    const advertencia = document.querySelector(".contactos__advertencia");

    // Validar en tiempo real los inputs
    Object.keys(fields).forEach(fieldId => {
        const input = formulario.querySelector(`#${fieldId}`);
        if (!input) return;

        const inputBox = input.closest(".item__box");
        const checkIcon = inputBox.querySelector(".ri-check-line");
        const errorIcon = inputBox.querySelector(".ri-close-line");
        const errorMessage = inputBox.nextElementSibling;
        const label = inputBox.querySelector("label");

        input.addEventListener("input", () => {
            advertencia.style.display = "none";

            const value = input.value.trim();
            if (value === "") {
                checkIcon.style.display = "none";
                errorIcon.style.display = "none";
                errorMessage.style.display = "none";
                input.style.border = "";
                label.style.color = "";
                inputBox.classList.remove("input-error");
            } else if (fields[fieldId].regex.test(value)) {
                checkIcon.style.display = "inline-block";
                errorIcon.style.display = "none";
                errorMessage.style.display = "none";
                input.style.border = "2px solid #0034de";
                label.style.color = "";
                inputBox.classList.remove("input-error");
            } else {
                checkIcon.style.display = "none";
                errorIcon.style.display = "inline-block";
                errorMessage.style.display = "block";
                input.style.border = "2px solid #fd1f1f";
                label.style.color = "red";
                inputBox.classList.add("input-error");
            }
        });
    });


    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita el envío por defecto

        let formularioValido = true;

        // Validar campos
        Object.keys(fields).forEach(fieldId => {
            const input = formulario.querySelector(`#${fieldId}`);
            const regex = fields[fieldId].regex;

            if (!regex.test(input.value.trim())) {
                formularioValido = false;
            }
        });

        if (!formularioValido) {
            advertencia.style.display = "block";
            return;
        }

        advertencia.style.display = "none";

        // Mostrar modal sin botones y cerrarlo automáticamente
        Swal.fire({
            title: "Formulario enviado exitosamente",
            icon: "success",
            draggable: true,
            timer: 3000, // Cierra en 2 segundos
            timerProgressBar: true
        }).then(() => {
            formulario.submit(); // Enviar el formulario después de que se cierre el modal
        });
    });
});
