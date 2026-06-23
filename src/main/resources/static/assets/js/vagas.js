//
// COMPONENTES (Navbar e Footer)
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
// API CONFIG (Mantido em /vagas conforme seu Controller)
//
const API_VAGAS = "http://localhost:8080/vagas";

//
// LISTAR VAGAS
//
async function carregarVagas() {
    try {
        const response = await fetch(API_VAGAS);
        const vagas = await response.json();
        const tabela = document.getElementById("tabelaVagas");
        tabela.innerHTML = "";

        if (vagas.length === 0) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-4 text-muted">
                        Nenhuma vaga cadastrada
                    </td>
                </tr>
            `;
            return;
        }

        vagas.forEach(vaga => {
            let badgeClass = "bg-success";
            if (vaga.status === "EM_ANALISE") badgeClass = "bg-warning text-dark";
            if (vaga.status === "FECHADA") badgeClass = "bg-danger";

            tabela.innerHTML += `
                <tr>
                    <td>${vaga.id}</td>
                    <td>${vaga.titulo}</td>
                    <td>${vaga.descricao || 'Sem descrição'}</td>
                    <td>${vaga.cargaHoraria}h</td>
                    <td>
                        <span class="badge ${badgeClass}">
                            ${vaga.status}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2" onclick="editarVaga(${vaga.id})">
                            Editar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="excluirVaga(${vaga.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar vagas:", error);
    }
}

//
// CADASTRAR / EDITAR VAGA
//
document.getElementById("formVaga").addEventListener("submit", async function(event) {
    event.preventDefault();

    const vagaId = document.getElementById("vagaId").value;

    const vaga = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        cargaHoraria: parseInt(document.getElementById("cargaHoraria").value),
        status: document.getElementById("status").value
    };

    // VALIDAÇÕES
    if (vaga.titulo.trim() === "") {
        alert("Título obrigatório");
        return;
    }

    if (isNaN(vaga.cargaHoraria) || vaga.cargaHoraria <= 0) {
        alert("Carga horária inválida");
        return;
    }

    try {
        const response = await fetch(
            vagaId ? `${API_VAGAS}/${vagaId}` : API_VAGAS,
            {
                method: vagaId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(vaga)
            }
        );

        if (response.ok) {
            alert(vagaId ? "Vaga atualizada com sucesso!" : "Vaga cadastrada com sucesso!");
            carregarVagas();
            document.getElementById("formVaga").reset();
            document.getElementById("vagaId").value = "";

            const modalElement = document.getElementById("modalVaga");
            let modal = bootstrap.Modal.getInstance(modalElement);
            if (!modal) modal = new bootstrap.Modal(modalElement);
            modal.hide();
        } else {
            alert("Erro ao salvar vaga");
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com API");
    }
});

//
// EXCLUIR VAGA
//
async function excluirVaga(id) {
    const confirmar = confirm("Deseja realmente excluir esta vaga?");
    if (!confirmar) return;

    try {
        const response = await fetch(`${API_VAGAS}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Vaga excluída com sucesso!");
            carregarVagas();
        } else {
            alert("Erro ao excluir vaga");
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com API");
    }
}

//
// EDITAR VAGA (Preencher Formulário e Abrir Modal)
//
async function editarVaga(id) {
    try {
        const response = await fetch(`${API_VAGAS}/${id}`);
        const vaga = await response.json();

        document.getElementById("vagaId").value = vaga.id;
        document.getElementById("titulo").value = vaga.titulo;
        document.getElementById("descricao").value = vaga.descricao;
        document.getElementById("cargaHoraria").value = vaga.cargaHoraria;
        document.getElementById("status").value = vaga.status;

        const modalElement = document.getElementById("modalVaga");
        let modal = bootstrap.Modal.getInstance(modalElement);
        if (!modal) modal = new bootstrap.Modal(modalElement);
        modal.show();
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar dados da vaga");
    }
}

//
// INICIALIZAR
//
document.addEventListener('DOMContentLoaded', () => {
    carregarVagas();
});