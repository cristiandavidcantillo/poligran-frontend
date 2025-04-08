document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btn-registrarse");
  
    btn.addEventListener("click", function (e) {
      e.preventDefault();
  
      const nombres = document.getElementById("nombres").value;
      const apellidos = document.getElementById("apellidos").value;
      const usuario = document.getElementById("usuario").value;
      const password = document.getElementById("password").value;
      const rol = document.getElementById("rol").value;
  
      const nuevoUsuario = {
        nombres,
        apellidos,
        usuario,
        password,
        rol
      };
  
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
      usuarios.push(nuevoUsuario);
  
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
      window.location.href = "../../index.html";
    });
  });
  