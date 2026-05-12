# 🎓 Sistema de estágios

[![Java](https://img.shields.io/badge/Java-17-blue)](https://adoptium.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)](https://spring.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://mysql.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)](https://getbootstrap.com/)

Sistema web para gerenciamento de estágios acadêmicos, permitindo que alunos se candidatem a vagas de estágio, professores aprovem solicitações e empresas publiquem oportunidades.

## 📌 Objetivo

O objetivo do sistema é facilitar o processo de gestão de estágios curriculares dentro de instituições acadêmicas, permitindo o controle de vagas, candidaturas e aprovação por orientadores.

## 🚀 Funcionalidades

- Cadastro e autenticação de usuários
- Diferentes perfis de acesso (Aluno, Professor, Empresa)
- CRUD de vagas de estágio
- Inscrição de alunos em vagas
- Aprovação ou reprovação de estágios pelo professor
- Controle de carga horária do estágio

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **JDK 17+** - [Download Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) ou [OpenJDK](https://adoptium.net/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download](https://git-scm.com/)
- **Navegador atualizado** (Chrome, Firefox, Edge)

## 🛠 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Spring Security
- Maven
- REST API

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3
- Fetch API

### Banco de Dados
- MySQL 8.0

### Ferramentas
- Git
- GitHub
- Postman (testes de API)

## 🏗 Arquitetura

O projeto segue uma arquitetura inspirada no padrão MVC (Model-View-Controller):


- **Model** → Representação das entidades do sistema
- **Controller** → Controle das requisições HTTP
- **Service** → Regras de negócio e lógica da aplicação
- **Repository** → Acesso e persistência ao banco de dados
- **DTO** → Transferência de dados entre camadas
- **Security** → Autenticação e autorização (JWT/Session)

## 📂 Estrutura do Projeto
sistema-estagios/
├── backend/
│ ├── config/ # Configurações (CORS, Swagger, etc)
│ ├── controllers/ # Controladores REST
│ ├── dto/ # Objetos de transferência de dados
│ ├── model/ # Entidades JPA
│ ├── repository/ # Interfaces JPA Repository
│ ├── security/ # Configurações de segurança
│ ├── services/ # Regras de negócio
│ └── resources/ # Properties, SQL scripts
│
├── frontend/
│ ├── assets/
│ │ ├── css/ # Estilos customizados
│ │ ├── icons/ # Favicons e ícones
│ │ ├── images/ # Imagens do sistema
│ │ └── js/ # Scripts JavaScript
│ ├── components/ # Componentes reutilizáveis
│ ├── docs/ # Documentação adicional
│ ├── layouts/ # Templates de layout
│ └── pages/ # Páginas HTML
│
└── README.md

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/manuel-jesus-maria-franco-feliu-dev/sistema-estagios.git
cd sistema-estagios

-- Crie o banco de dados
CREATE DATABASE sistema_estagios;

-- Crie um usuário (opcional)
CREATE USER 'estagio_user'@'localhost' IDENTIFIED BY 'sua_senha';
GRANT ALL PRIVILEGES ON sistema_estagios.* TO 'estagio_user'@'localhost';
FLUSH PRIVILEGES;

-- Crie o banco de dados
CREATE DATABASE sistema_estagios;

-- Crie um usuário (opcional)
CREATE USER 'estagio_user'@'localhost' IDENTIFIED BY 'sua_senha';
GRANT ALL PRIVILEGES ON sistema_estagios.* TO 'estagio_user'@'localhost';
FLUSH PRIVILEGES;


3. Configure o backend

Navegue até a pasta do backend:

cd backend

Edite o arquivo src/main/resources/application.properties:

# Conexão com o banco
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_estagios?useSSL=false&serverTimezone=UTC
spring.datasource.username=estagio_user
spring.datasource.password=sua_senha

# JPA configurações
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Servidor
server.port=8080

4. Execute o backend
Linux/Mac:
./mvnw spring-boot:run

Windows:
mvnw.cmd spring-boot:run

O backend estará disponível em: http://localhost:8080

5. Execute o frontend
Opção 1 - Abrir diretamente:

Navegue até a pasta frontend/pages/

Abra o arquivo index.html no navegador

Opção 2 - Live Server (recomendado):

Instale a extensão "Live Server" no VS Code

Clique com botão direito em index.html → "Open with Live Server"

O frontend estará em: http://127.0.0.1:5500

Opção 3 - Python HTTP Server:

cd frontend
python3 -m http.server 8000

Acesse: http://localhost:8000

🔄 Fluxo da Aplicação

1. Empresa se cadastra → Publica vaga de estágio
                ↓
2. Aluno se cadastra → Navega pelas vagas disponíveis
                ↓
3. Aluno se candidata à vaga de interesse
                ↓
4. Professor autentica → Visualiza candidaturas pendentes
                ↓
5. Professor aprova/reprova a candidatura
                ↓
6. Sistema registra carga horária do estágio

📡 Endpoints da API (exemplos)

Método	Endpoint	Descrição
POST	/api/auth/register	Registro de usuário
POST	/api/auth/login	Login e obtenção de token
GET	/api/vagas	Listar todas as vagas
POST	/api/vagas	Criar nova vaga (empresa)
POST	/api/candidaturas	Aluno se candidatar
PUT	/api/candidaturas/{id}/aprovar	Professor aprovar
GET	/api/estagios/carga-horaria/{alunoId}	Consultar carga horária
🔐 Perfis de Acesso
Perfil	Permissões
Aluno	Visualizar vagas, candidatar-se, ver status das candidaturas
Professor	Aprovar/reprovar estágios, visualizar todos os alunos
Empresa	Publicar, editar e remover vagas, ver candidatos
📈 Possíveis melhorias futuras
Implementação de upload de documentos (currículo, termo de compromisso)

Sistema de notificações por e-mail e/ou push

Dashboard administrativo com gráficos estatísticos

Integração com APIs externas (Google Calendar, API de CEP)

Geração automática de relatórios em PDF

Recuperação de senha via e-mail

Chat integrado entre aluno e empresa

Avaliação do aluno pela empresa ao final do estágio

🐛 Como reportar problemas
Caso encontre algum bug ou tenha sugestões:

Acesse a aba Issues

Clique em "New Issue"

Descreva detalhadamente o problema ou sugestão

Se possível, adicione prints da tela e passos para reproduzir

📄 Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

👨‍💻 Autor
Manuel Jesus Maria Franco Feliu

https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white