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
// CONFIGURAÇÃO DAS APIs
//

const API_CANDIDATURAS = 'http://localhost:8080/candidaturas';
const API_ALUNOS = 'http://localhost:8080/alunos';
const API_ESTAGIOS = 'http://localhost:8080/estagios';


//
// CARREGAR ALUNOS NO SELECT
//

async function carregarAlunos() {
    try {
        const response = await fetch(API_ALUNOS);
        const alunos = await response.json();

        const select = document.getElementById("alunoId");
        select.innerHTML = '<option value="">Selecione o aluno...</option>';

        if (alunos.length === 0) {
            select.innerHTML += '<option value="" disabled>Nenhum aluno cadastrado</option>';
            return;
        }

        alunos.forEach(aluno => {
            select.innerHTML += `
                <option value="${aluno.id}">
                    ${aluno.nome}
                </option>
            `;
        });

    } catch (error) {
        console.error("Erro ao carregar alunos:", error);
        document.getElementById("alunoId").innerHTML = 
            '<option value="" disabled>Erro ao carregar alunos</option>';
    }
}


//
// CARREGAR ESTÁGIOS NO SELECT
//

async function carregarEstagios() {
    try {
        const response = await fetch(API_ESTAGIOS);
        const estagios = await response.json();

        const select = document.getElementById("estagioId");
        select.innerHTML = '<option value="">Selecione o estágio...</option>';

        if (estagios.length === 0) {
            select.innerHTML += '<option value="" disabled>Nenhum estágio cadastrado</option>';
            return;
        }

        estagios.forEach(estagio => {
            select.innerHTML += `
                <option value="${estagio.id}">
                    ${estagio.titulo || estagio.nome || 'Estágio ' + estagio.id}
                </option>
            `;
        });

    } catch (error) {
        console.error("Erro ao carregar estágios:", error);
        document.getElementById("estagioId").innerHTML = 
            '<option value="" disabled>Erro ao carregar estágios</option>';
    }
}


//
// LISTAR CANDIDATURAS
//

async function carregarCandidaturas() {
    try {
        const response = await fetch(API_CANDIDATURAS);
        const candidaturas = await response.json();

        const tabela = document.getElementById("tabelaCandidaturas");
        tabela.innerHTML = "";

        if (candidaturas.length === 0) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        Nenhuma candidatura encontrada
                    </td>
                </tr>
            `;
            return;
        }

        candidaturas.forEach(c => {
            const badgeClass = {
                'PENDENTE': 'bg-warning text-dark',
                'APROVADO': 'bg-success',
                'REPROVADO': 'bg-danger'
            }[c.status] || 'bg-secondary';

            tabela.innerHTML += `
                <tr>
                    <td class="fw-bold">${c.id}</td>
                    <td>${c.aluno?.nome || 'N/A'}</td>
                    <td>${c.estagio?.titulo || 'N/A'}</td>
                    <td>${c.estagio?.empresa || 'N/A'}</td>
                    <td><span class="badge ${badgeClass}">${c.status}</span></td>
                    <td>${c.dataCandidatura || 'N/A'}</td>
                    <td class="text-center">
                        ${c.status === 'PENDENTE' ? `
                            <button class="btn btn-success btn-sm me-1" onclick="atualizarStatus(${c.id}, 'APROVADO')" title="Aprovar">
                                <i class="bi bi-check-lg"></i>
                            </button>
                            <button class="btn btn-danger btn-sm me-1" onclick="atualizarStatus(${c.id}, 'REPROVADO')" title="Reprovar">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        ` : ''}
                        <button class="btn btn-danger btn-sm" onclick="excluirCandidatura(${c.id})" title="Excluir">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Erro ao carregar candidaturas:", error);
    }
}


//
// CADASTRAR / EDITAR CANDIDATURA
//

document.getElementById("formCandidatura")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        // ID OCULTO
        const candidaturaId =
            document.getElementById("candidaturaId").value;

        // OBJETO - COM parseInt PARA GARANTIR NÚMEROS
        const candidatura = {
            alunoId: parseInt(document.getElementById("alunoId").value),
            estagioId: parseInt(document.getElementById("estagioId").value),
            observacao: document.getElementById("observacao").value
        };

        //
        // VALIDAÇÃO FRONTEND
        //

        if (isNaN(candidatura.alunoId) || candidatura.alunoId <= 0) {
            alert("Selecione um aluno válido!");
            return;
        }

        if (isNaN(candidatura.estagioId) || candidatura.estagioId <= 0) {
            alert("Selecione um estágio válido!");
            return;
        }

        try {
            const response = await fetch(
                candidaturaId
                    ? `${API_CANDIDATURAS}/${candidaturaId}`
                    : API_CANDIDATURAS,
                {
                    method: candidaturaId ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(candidatura)
                }
            );

            if (response.ok) {
                alert(
                    candidaturaId
                        ? "Candidatura atualizada com sucesso!"
                        : "Candidatura cadastrada com sucesso!"
                );

                carregarCandidaturas();
                document.getElementById("formCandidatura").reset();
                document.getElementById("candidaturaId").value = "";

                // FECHAR MODAL
                const modal =
                    bootstrap.Modal.getInstance(
                        document.getElementById("modalCandidatura")
                    );

                modal.hide();

            } else {
                const erro = await response.json();
                alert(erro.erro || "Erro ao salvar candidatura");
            }

        } catch (error) {
            console.error(error);
            alert("Erro ao conectar com API");
        }

    });


//
// ATUALIZAR STATUS (APROVAR/REPROVAR)
//

async function atualizarStatus(id, status) {
    const confirmar = confirm(`Deseja ${status === 'APROVADO' ? 'APROVAR' : 'REPROVAR'} esta candidatura?`);
    if (!confirmar) return;

    try {
        const response = await fetch(`${API_CANDIDATURAS}/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: status })
        });

        if (response.ok) {
            alert(`Candidatura ${status.toLowerCase()} com sucesso!`);
            carregarCandidaturas();
        } else {
            alert("Erro ao atualizar status");
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com API");
    }
}


//
// EXCLUIR CANDIDATURA
//

async function excluirCandidatura(id) {
    const confirmar = confirm("Deseja realmente excluir esta candidatura?");
    if (!confirmar) return;

    try {
        const response = await fetch(`${API_CANDIDATURAS}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Candidatura excluída com sucesso!");
            carregarCandidaturas();
        } else {
            alert("Erro ao excluir candidatura");
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com API");
    }
}


//
// INICIALIZAR
//

document.addEventListener('DOMContentLoaded', () => {
    carregarAlunos();
    carregarEstagios();
    carregarCandidaturas();
});