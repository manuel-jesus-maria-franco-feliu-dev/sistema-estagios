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
// LISTAR VAGAS
//

async function carregarVagas() {

    try {

        const response =
            await fetch("http://localhost:8080/vagas");

        const vagas =
            await response.json();

        const tabela =
            document.getElementById("tabelaVagas");

        tabela.innerHTML = "";

        vagas.forEach(vaga => {

            tabela.innerHTML += `
                <tr>
                    <td>${vaga.id}</td>
                    <td>${vaga.titulo}</td>
                    <td>${vaga.empresa}</td>
                    <td>${vaga.cargaHoraria}h</td>
                    <td>
                        <span class="badge bg-success">
                            Ativa
                        </span>
                    </td>
                </tr>
            `;

        });

    }

    catch(error) {

        console.error(
            "Erro ao carregar vagas:",
            error
        );

    }

}

carregarVagas();

//
// CADASTRAR VAGA
//

document.getElementById("formVaga")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const vaga = {

            titulo:
            document.getElementById("titulo").value,

            empresa:
            document.getElementById("empresa").value,

            descricao:
            document.getElementById("descricao").value,

            cargaHoraria:
                parseInt(
                    document.getElementById("cargaHoraria").value
                )

        };

        try {

            const response = await fetch(
                "http://localhost:8080/vagas",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(vaga)
                }
            );

            if(response.ok) {

                alert("Vaga cadastrada com sucesso!");

                carregarVagas();

                document.getElementById("formVaga").reset();

                const modal =
                    bootstrap.Modal.getInstance(
                        document.getElementById("modalVaga")
                    );

                modal.hide();

            }

            else {

                const erro =
                    await response.json();

                alert(
                    erro.message || "Erro ao cadastrar"
                );

            }

        }

        catch(error) {

            console.error(error);

            alert("Erro ao conectar com API");

        }

    });