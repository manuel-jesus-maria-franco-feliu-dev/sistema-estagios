//
// CRIAÇÃO DO COMPONENTE PARA INJETAR CABEÇALHO E RODAPÉ NAS PÁGINAS
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

async function carregarTotais() { //Permissão para esperar respostas da API

    try {

        // USUÁRIOS
        const responseUsuarios =
            await fetch("http://localhost:8080/usuarios");

        const usuarios =
            await responseUsuarios.json(); 

        document.getElementById("totalUsuarios")
            .innerText = usuarios.length; //Contando quantos usuários existem e atualizando número no card..


        // VAGAS
        const responseVagas =
            await fetch("http://localhost:8080/vagas"); //Fazendo requisição HTTP

        const vagas =
            await responseVagas.json(); // Convertendo resposta em objeto JavaScript.

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