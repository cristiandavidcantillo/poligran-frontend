// Esperar a que se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita que la página se recargue
      alert("¡Tu mensaje ha sido enviado exitosamente!");
      form.reset();
    });
  });
  