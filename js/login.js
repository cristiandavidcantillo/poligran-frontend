document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.querySelector("button[type='submit']");
  
    btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
  
      const usuarioInput = document.getElementById("usuario").value.trim();
      const passwordInput = document.getElementById("contrasena").value.trim();
  
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
      const usuarioEncontrado = usuarios.find(
        (u) => u.usuario === usuarioInput && u.password === passwordInput
      );
  
      if (usuarioEncontrado) {
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
  
        if (usuarioEncontrado.rol === "admin") {
          window.location.href = "./Page/admin/index.html";
        } else {
          window.location.href = "./Page/Home/index.html";
        }
      } else {
        alert("Usuario o contraseña incorrecta");
      }
    });
  });
  