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
// API CONFIG
//
const API_USUARIOS = "http://localhost:8080/usuarios";

//
// LISTAR USUÁRIOS
//
async function carregarUsuarios() {
    try {
        const response = await fetch(API_USUARIOS);
        const usuarios = await response.json();
        const tabela = document.getElementById("tabelaUsuarios");
        tabela.innerHTML = "";

        usuarios.forEach(usuario => {
            tabela.innerHTML += `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.perfil}</td>
                    <td>
                        <span class="badge bg-success">
                            ${usuario.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2" onclick="editarUsuario(${usuario.id})">
                            Editar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="excluirUsuario(${usuario.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch(error) {
        console.error("Erro ao carregar usuários:", error);
    }
}

//
// CADASTRAR / EDITAR USUÁRIO
//
document.getElementById("formUsuario").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuarioId = document.getElementById("usuarioId").value;

    const usuario = {
        nome: document.getElementById("nome").value.toUpperCase(),
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        perfil: document.getElementById("perfil").value,
        ativo: true
    };

    // VALIDAÇÕES FRONTEND
    if(usuario.nome.trim() === "") {
        alert("O nome é obrigatório");
        return;
    }

    if(!usuario.email.includes("@")) {
        alert("Informe um e-mail válido");
        return;
    }

    // A validação de senha só bloqueia se for um novo cadastro ou se o campo foi preenchido na edição
    if(!usuarioId && usuario.senha.length < 8) {
        alert("A senha deve possuir no mínimo 8 caracteres");
        return;
    }

    try {
        const response = await fetch(
            usuarioId ? `${API_USUARIOS}/${usuarioId}` : API_USUARIOS,
            {
                method: usuarioId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            }
        );

        if(response.ok) {
            alert(usuarioId ? "Usuário atualizado com sucesso!" : "Usuário cadastrado com sucesso!");
            carregarUsuarios();
            document.getElementById("formUsuario").reset();
            document.getElementById("usuarioId").value = "";

            const modalElement = document.getElementById("modalUsuario");
            let modal = bootstrap.Modal.getInstance(modalElement);
            if (!modal) modal = new bootstrap.Modal(modalElement);
            modal.hide();
        } else {
            const erro = await response.text();
            console.error(erro);
            alert(erro || "Erro ao salvar usuário");
        }
    } catch(error) {
        console.error(error);
        alert("Erro ao conectar com API");
    }
});

//
// EXCLUIR USUÁRIO
//
async function excluirUsuario(id) {
    const confirmar = confirm("Deseja realmente excluir este usuário?");
    if(!confirmar) return;

    try {
        const response = await fetch(`${API_USUARIOS}/${id}`, {
            method: "DELETE"
        });

        if(response.ok) {
            alert("Usuário excluído com sucesso!");
            carregarUsuarios();
        } else {
            alert("Erro ao excluir usuário");
        }
    } catch(error) {
        console.error(error);
        alert("Erro ao conectar com API");
    }
}

//
// EDITAR USUÁRIO (Preencher Formulário e Abrir Modal)
//
async function editarUsuario(id) {
    try {
        const response = await fetch(`${API_USUARIOS}/${id}`);
        const usuario = await response.json();

        document.getElementById("usuarioId").value = usuario.id;
        document.getElementById("nome").value = usuario.nome;
        document.getElementById("email").value = usuario.email;
        document.getElementById("senha").value = ""; // Senha vazia por segurança
        document.getElementById("perfil").value = usuario.perfil;

        const modalElement = document.getElementById("modalUsuario");
        let modal = bootstrap.Modal.getInstance(modalElement);
        if (!modal) modal = new bootstrap.Modal(modalElement);
        modal.show();
    } catch(error) {
        console.error(error);
        alert("Erro ao carregar dados do usuário");
    }
}

//
// INICIALIZAR
//
document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios();
});