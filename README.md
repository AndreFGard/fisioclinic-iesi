# 📌 FisioClinic

![Status do Projeto](https://img.shields.io/badge/status-em_desenvolvimento-yellow)
![Backend](https://img.shields.io/badge/backend-NestJS-red)
![Frontend](https://img.shields.io/badge/frontend-React-blueviolet)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)

---

## 📖 Tabela de Conteúdos
- [📝 Descrição](#-descrição)
- [🎯 Objetivo](#-objetivo)
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [⚙️ Como Executar o Projeto](#️-como-executar-o-projeto)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [👥 Integrantes do Grupo](#-integrantes-do-grupo)

---

## 📝 Descrição

O **FisioClinic** é um sistema web voltado para digitalizar e gerenciar os prontuários eletrônicos da clínica de fisioterapia da UFPE. O sistema centraliza as informações dos pacientes, tratamentos e atendimentos, permitindo que os profissionais de saúde acessem e atualizem os dados de forma rápida, segura e organizada.

Além disso, o projeto visa otimizar os seguintes processos de negócio da clínica:
-   Registro e atualização de prontuários de forma digital.
-   Agendamento e controle de sessões de fisioterapia.
-   Histórico de atendimentos acessível para profissionais autorizados.
-   Geração de relatórios administrativos e clínicos.
-   Controle de permissões para diferentes tipos de usuários (recepção, fisioterapeutas, administração).

#### Benefícios Esperados:
-   📈 **Aumento da produtividade** com a eliminação de registros manuais.
-   🔒 **Segurança e privacidade** dos dados de pacientes.
-   🕒 **Redução do tempo de atendimento** com acesso rápido às informações.
-   ♻️ **Sustentabilidade** com diminuição do uso de papel.
-   ✅ **Padronização** dos processos administrativos e clínicos.

---

## 🎯 Objetivo

Desenvolver uma solução integrada para gerenciar o fluxo de informações da clínica de fisioterapia, modernizando a gestão de prontuários e contribuindo para um atendimento mais ágil e eficiente.

---

## ✨ Funcionalidades

-   [✅] Cadastro e gerenciamento de pacientes
-   [🚧] Criação e atualização de prontuários eletrônicos
-   [🚧] Agendamento de consultas e sessões
-   [✅] Controle de acesso por nível de usuário
-   [❌] Geração de relatórios administrativos e clínicos

> **Legenda:**
> -   ✅: Implementado
> -   🚧: Em desenvolvimento
> -   ❌: Não iniciado

---

## 🚀 Tecnologias Utilizadas

| Categoria          | Tecnologia                                                              |
| :----------------- | :---------------------------------------------------------------------- |
| **Backend** | **NestJS (TypeScript)**, **TypeORM**, **PostgreSQL**, **Class Validator** |
| **Frontend** | **React (TypeScript)**, **Styled Components**, **Axios** |
| **Banco de Dados** | **PostgreSQL** |
| **DevOps** | **Docker** & **Docker Compose** |
| **Controle de Versão** | **Git** & **GitHub** |

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Passo a Passo
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/AndreFGard/fisioclinic-iesi.git](https://github.com/AndreFGard/fisioclinic-iesi.git)
    ```
2.  **Acesse o diretório do projeto:**
    ```bash
    cd fisioclinic-iesi
    ```
3.  **Configure as variáveis de ambiente do Backend:**
    -   Crie uma cópia do arquivo `back-end/.env.example` e renomeie para `back-end/.env`.
    -   Preencha as variáveis no arquivo `.env` conforme necessário.
4.  **Suba os contêineres com Docker Compose:**
    ```bash
    docker-compose up -d --build
    ```
5.  **Acesse a aplicação no navegador:**
    -   **Frontend:** `http://localhost:3000`
    -   **Backend (API):** `http://localhost:3001`

---

## 📂 Estrutura do Projeto

├── back-end/
│   ├── src/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── front-end/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── .gitignore
├── docker-compose.yml
└── README.md

---

## 👥 Integrantes do Grupo

| Nome              | Função no Projeto           |
| :---------------- | :-------------------------- |
| André Felipe Gard | Backend & DevOps            |
| `[Nome Completo]`   | Frontend                    |
| `[Nome Completo]`   | Banco de Dados & Testes     |
| `[Nome Completo]`   | Documentação & Requisitos |
