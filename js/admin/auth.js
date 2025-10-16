document.addEventListener("DOMContentLoaded", function () {
  // Mostrar el overlay de autenticación al cargar
  document.getElementById("authOverlay").classList.remove("hidden");
  document.getElementById("mainContent").classList.add("hidden");

  document.getElementById("loginButton").addEventListener("click", function () {
    // Aquí va tu lógica de validación de usuario/contraseña
    // (Ejemplo simple, ¡no usar en producción!)
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
      // Login exitoso: ocultar overlay y mostrar contenido principal
      document.getElementById("authOverlay").classList.add("hidden");
      document.getElementById("mainContent").classList.remove("hidden");
      document.getElementById("authMessage").textContent = "";
    } else {
      document.getElementById("authMessage").textContent = "Usuario o contraseña incorrectos.";
    }
  });
});
