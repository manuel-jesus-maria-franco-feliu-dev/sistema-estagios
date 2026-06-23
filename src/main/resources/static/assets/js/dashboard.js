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
// URLs DAS APIs
//
const API_USUARIOS = 'http://localhost:8080/usuarios';
const API_VAGAS = 'http://localhost:8080/vagas';
const API_CANDIDATURAS = 'http://localhost:8080/candidaturas';

//
// CARREGAR TOTAIS NO DASHBOARD
//
async function carregarMétricasDashboard() {
    try {
        // Busca os dados simultaneamente do backend
        const [resUsuarios, resVagas, resCandidaturas] = await Promise.all([
            fetch(API_USUARIOS),
            fetch(API_VAGAS),
            fetch(API_CANDIDATURAS)
        ]);

        // Converte as respostas para JSON
        const usuarios = await resUsuarios.json();
        const vagas = await resVagas.json();
        const candidaturas = await resCandidaturas.json();

        // Atualiza os elementos HTML correspondentes com o tamanho dos arrays (length)
        document.getElementById("totalUsuarios").innerText = usuarios.length;
        document.getElementById("totalEstagios").innerText = vagas.length;
        document.getElementById("totalCandidaturas").innerText = candidaturas.length;

    } catch (error) {
        console.error("Erro ao carregar métricas do dashboard:", error);
        
        // Em caso de erro, exibe um indicativo visual no lugar do zero
        document.getElementById("totalUsuarios").innerText = "--";
        document.getElementById("totalEstagios").innerText = "--";
        document.getElementById("totalCandidaturas").innerText = "--";
    }
}

//
// INICIALIZAR
//
document.addEventListener('DOMContentLoaded', () => {
    carregarMétricasDashboard();
});