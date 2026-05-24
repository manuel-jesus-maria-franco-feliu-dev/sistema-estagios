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

                    <td>

                        <button
                            class="btn btn-warning btn-sm me-2"
                            onclick="editarVaga(${vaga.id})">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="excluirVaga(${vaga.id})">

                            Excluir

                        </button>

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
// CADASTRAR / EDITAR VAGA
//

document.getElementById("formVaga")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        // ID OCULTO
        const vagaId =
            document.getElementById("vagaId").value;

        // OBJETO
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

            const response =
                await fetch(

                    vagaId
                        ? `http://localhost:8080/vagas/${vagaId}`
                        : "http://localhost:8080/vagas",

                    {

                        method:
                            vagaId ? "PUT" : "POST",

                        headers: {

                            "Content-Type": "application/json"

                        },

                        body:
                            JSON.stringify(vaga)

                    }

                );

            if(response.ok) {

                alert(

                    vagaId
                        ? "Vaga atualizada com sucesso!"
                        : "Vaga cadastrada com sucesso!"

                );

                carregarVagas();

                document.getElementById("formVaga").reset();

                // LIMPAR ID
                document.getElementById("vagaId").value = "";

                // FECHAR MODAL
                const modal =
                    bootstrap.Modal.getInstance(
                        document.getElementById("modalVaga")
                    );

                modal.hide();

            }

            else {

                alert("Erro ao salvar vaga");

            }

        }

        catch(error) {

            console.error(error);

            alert("Erro ao conectar com API");

        }

    });


//
// EXCLUIR VAGA
//

async function excluirVaga(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta vaga?"
        );

    if(!confirmar) {

        return;

    }

    try {

        const response =
            await fetch(
                `http://localhost:8080/vagas/${id}`,
                {
                    method: "DELETE"
                }
            );

        if(response.ok) {

            alert("Vaga excluída com sucesso!");

            carregarVagas();

        }

        else {

            alert("Erro ao excluir vaga");

        }

    }

    catch(error) {

        console.error(error);

        alert("Erro ao conectar com API");

    }

}


//
// EDITAR VAGA
//

async function editarVaga(id) {

    try {

        const response =
            await fetch(
                `http://localhost:8080/vagas/${id}`
            );

        const vaga =
            await response.json();

        // PREENCHER CAMPOS
        document.getElementById("vagaId").value =
            vaga.id;

        document.getElementById("titulo").value =
            vaga.titulo;

        document.getElementById("empresa").value =
            vaga.empresa;

        document.getElementById("descricao").value =
            vaga.descricao;

        document.getElementById("cargaHoraria").value =
            vaga.cargaHoraria;

        // ABRIR MODAL
        const modal =
            new bootstrap.Modal(
                document.getElementById("modalVaga")
            );

        modal.show();

    }

    catch(error) {

        console.error(error);

        alert("Erro ao carregar vaga");

    }

}