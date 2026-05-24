//
// LOGIN
//

document.getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        // SIMULA LOGIN
        window.location.href =
            "dashboard.html";

    });


//
// MOSTRAR / OCULTAR SENHA
//

function togglePassword() {

    const password =
        document.getElementById("password");

    const icon =
        document.getElementById("eyeIcon");

    if(password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}