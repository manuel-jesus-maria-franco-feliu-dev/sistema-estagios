
# 🎓 Sistema de Gestão de Estágios Acadêmicos

Sistema desenvolvido como projeto acadêmico do curso de **Análise e Desenvolvimento de Sistemas**, com o objetivo de auxiliar instituições de ensino no gerenciamento de estágios curriculares de forma digital, organizada e eficiente.

O projeto busca simular um ambiente real de gestão acadêmica, permitindo o controle de alunos, professores orientadores, vagas de estágio e processos de candidatura.

---

# 📌 Objetivo do Projeto

O sistema foi criado para facilitar o acompanhamento e gerenciamento de estágios acadêmicos, centralizando informações importantes em uma única plataforma.

## Principais objetivos:

✔ Cadastro e autenticação de usuários  
✔ Controle de permissões e perfis  
✔ Gerenciamento de vagas de estágio  
✔ Processo de candidatura de alunos  
✔ Aprovação de estágios por professores  
✔ Controle de carga horária  
✔ Aplicação de regras de negócio  
✔ Integração com banco de dados  

---

# 🖥️ Funcionalidades do Sistema

## 🔐 Autenticação de Usuários

- Cadastro de usuários
- Login com e-mail e senha
- Diferenciação de perfis:
  - Aluno
  - Professor
  - Administrador

---

## 👨‍🎓 Gerenciamento de Usuários

- Cadastro de usuários
- Listagem de usuários
- Atualização de dados
- Exclusão de usuários
- Validações de cadastro

---

## 📄 Gerenciamento de Estágios

- Cadastro de estágios
- Controle de status
- Associação entre aluno e professor
- Controle de aprovação

---

## 🏢 Gerenciamento de Vagas

- Cadastro de vagas
- Descrição da vaga
- Área de atuação
- Empresa responsável
- Controle de carga horária

---

## ✅ Aprovação Acadêmica

- Aprovação de estágio pelo professor
- Controle de status:
  - ⏳ Pendente
  - ✅ Aprovado
  - ❌ Reprovado

---

# 🛠️ Tecnologias Utilizadas

## 💻 Backend

- Java
- Spring Boot
- Spring Data JPA
- Maven

---

## 🗄️ Banco de Dados

- MySQL
- DBeaver

---

## 🧰 Ferramentas Utilizadas

- IntelliJ IDEA
- Git
- GitHub
- Insomnia

---

# 🧱 Arquitetura do Projeto

O sistema está organizado utilizando arquitetura em camadas, seguindo padrões utilizados em aplicações Java profissionais.

**Controller** → **Service** → **Repository** → **Banco de Dados**

---

# 🛠 Tecnologias Utilizadas

## 💻 Backend

- Java
- Spring Boot
- Spring Data JPA
- Maven

## 📂 Estrutura das Pastas

src/main/java
│
├── controller
├── service
├── repository
├── model
├── dto
├── config
└── security

## 🚧 Funcionalidades em Desenvolvimento

- Login com autenticação JWT
- Controle de vagas
- Sistema de candidatura
- Aprovação de estágios
- Dashboard administrativo
- Controle de carga horária
- Frontend web

## 📡 Endpoints da API

👤 Usuários
➕ Criar usuário

POST /usuarios

📋 Listar usuários

GET /usuarios

🔍 Buscar usuário por ID

GET /usuarios/{id}

✏️ Atualizar usuário

PUT /usuarios/{id}

🗑️ Excluir usuário

DELETE /usuarios/{id}

## ⚠️ Regras de Negócio Implementadas

- Senha deve possuir no mínimo 8 caracteres
- Nome não pode estar vazio
- E-mail deve conter formato válido
- Usuário é ativado automaticamente no cadastro

## ▶️ Como Executar o Projeto

1️⃣ Clonar o repositório

git clone https://github.com/manuel-jesus-maria-franco-feliu-dev/sistema-gestao-estagios.git

2️⃣ Abrir no IntelliJ IDEA

## Importar o projeto Maven normalmente.

3️⃣ Configurar o banco de dados MySQL

## Criar o banco:

CREATE DATABASE sistema_estagios;

4️⃣ Configurar o arquivo application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_estagios
spring.datasource.username=root
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

5️⃣ Executar o projeto

## Rodar a classe principal:

SistemaEstagiosApplication
📚 Objetivos Acadêmicos

## Este projeto tem como finalidade aplicar na prática conceitos estudados durante o curso, como:

- Programação Orientada a Objetos
- APIs REST
- Banco de Dados Relacional
- Arquitetura de Software
- Validações
- Regras de Negócio
- Versionamento com Git
- Desenvolvimento Backend
- Desenvolvimento Frontend
- Estilização com CSS

## 👨‍💻 Autor

Manuel Jesus Maria Franco Feliu

Curso: Análise e Desenvolvimento de Sistemas

## 📌 Status do Projeto
🚧 Em desenvolvimento
