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
// LISTAR USUÁRIOS
//

async function carregarUsuarios() {

    try {

        const response =
            await fetch("http://localhost:8080/usuarios");

        const usuarios =
            await response.json();

        const tabela =
            document.getElementById("tabelaUsuarios");

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

                            Ativo

                        </span>

                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm me-2"
                            onclick="editarUsuario(${usuario.id})">

                            Editar

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="excluirUsuario(${usuario.id})">

                            Excluir

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    catch(error) {

        console.error(
            "Erro ao carregar usuários:",
            error
        );

    }

}

carregarUsuarios();


//
// CADASTRAR / EDITAR USUÁRIO
//

document.getElementById("formUsuario")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        // ID OCULTO
        const usuarioId =
            document.getElementById("usuarioId").value;

        // OBJETO
        const usuario = {

            nome:
                document.getElementById("nome")
                    .value
                    .toUpperCase(),

            email:
                document.getElementById("email").value,

            senha:
                document.getElementById("senha").value,

            perfil:
                document.getElementById("perfil").value,

            ativo: true

        };

        //
        // VALIDAÇÃO FRONTEND
        //

        if(usuario.nome.trim() === "") {

            alert(
                "O nome é obrigatório"
            );

            return;

        }

        if(!usuario.email.includes("@")) {

            alert(
                "Informe um e-mail válido"
            );

            return;

        }

        if(usuario.senha.length < 8) {

            alert(
                "A senha deve possuir no mínimo 8 caracteres"
            );

            return;

        }

        try {

            const response =
                await fetch(

                    usuarioId
                        ? `http://localhost:8080/usuarios/${usuarioId}`
                        : "http://localhost:8080/usuarios",

                    {

                        method:
                            usuarioId ? "PUT" : "POST",

                        headers: {

                            "Content-Type": "application/json"

                        },

                        body:
                            JSON.stringify(usuario)

                    }

                );

            if(response.ok) {

                alert(

                    usuarioId
                        ? "Usuário atualizado com sucesso!"
                        : "Usuário cadastrado com sucesso!"

                );

                carregarUsuarios();

                document.getElementById("formUsuario").reset();

                // LIMPAR ID
                document.getElementById("usuarioId").value = "";

                // FECHAR MODAL
                const modal =
                    bootstrap.Modal.getInstance(
                        document.getElementById("modalUsuario")
                    );

                modal.hide();

            }

            else {

                const erro =
                    await response.text();

                console.error(erro);

                alert(erro);

            }

        }

        catch(error) {

            console.error(error);

            alert(
                "Erro ao conectar com API"
            );

        }

    });


//
// EXCLUIR USUÁRIO
//

async function excluirUsuario(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este usuário?"
        );

    if(!confirmar) {

        return;

    }

    try {

        const response =
            await fetch(
                `http://localhost:8080/usuarios/${id}`,
                {
                    method: "DELETE"
                }
            );

        if(response.ok) {

            alert(
                "Usuário excluído com sucesso!"
            );

            carregarUsuarios();

        }

        else {

            alert(
                "Erro ao excluir usuário"
            );

        }

    }

    catch(error) {

        console.error(error);

        alert(
            "Erro ao conectar com API"
        );

    }

}


//
// EDITAR USUÁRIO
//

async function editarUsuario(id) {

    try {

        const response =
            await fetch(
                `http://localhost:8080/usuarios/${id}`
            );

        const usuario =
            await response.json();

        //
        // PREENCHER CAMPOS
        //

        document.getElementById("usuarioId").value =
            usuario.id;

        document.getElementById("nome").value =
            usuario.nome;

        document.getElementById("email").value =
            usuario.email;

        // NÃO MOSTRAR SENHA ANTIGA
        document.getElementById("senha").value = "";

        document.getElementById("perfil").value =
            usuario.perfil;

        //
        // ABRIR MODAL
        //

        const modal =
            new bootstrap.Modal(
                document.getElementById("modalUsuario")
            );

        modal.show();

    }

    catch(error) {

        console.error(error);

        alert(
            "Erro ao carregar usuário"
        );

    }

}