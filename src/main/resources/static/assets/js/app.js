//
// COMPONENTES
//

fetch("../components/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });

fetch("../components/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });


//
// DASHBOARD
//

async function carregarTotais() {

    try {

        // USUÁRIOS
        const responseUsuarios =
            await fetch("http://localhost:8080/usuarios");

        const usuarios =
            await responseUsuarios.json();

        document.getElementById("totalUsuarios")
            .innerText = usuarios.length;


        // VAGAS
        const responseVagas =
            await fetch("http://localhost:8080/vagas");

        const vagas =
            await responseVagas.json();

        document.getElementById("totalVagas")
            .innerText = vagas.length;

    }

    catch(error) {

        console.error(
            "Erro ao carregar dashboard:",
            error
        );

    }

}

carregarTotais();