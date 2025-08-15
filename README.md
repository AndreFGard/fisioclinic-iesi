<div align="center">
  <img src="fisioclinic-IESI/public/logo.png" alt="Fisioclinic Logo" width="120" />
  
  <h1>Fisioclinic-IESI</h1>
  <p><strong>Gestão de Clínica de Fisioterapia Universitária</strong></p>
  <p>Uma solução completa para o gerenciamento de pacientes, agendamentos, prontuários e equipes em clínicas-escola de fisioterapia.</p>
</div>

---

## ✨ Visão Geral

O <strong>Fisioclinic-IESI</strong> é um sistema robusto, moderno e seguro, desenvolvido para atender às necessidades de clínicas universitárias de fisioterapia. Ele integra cadastro de pacientes, fila de espera, agendamento, prontuários eletrônicos, gestão de profissionais e estudantes, tudo em uma interface intuitiva e responsiva.

---

## 🚀 Funcionalidades Principais
- **Fila de Mensagens**
- **Cadastro e Gerenciamento de Pacientes**
- **Fila de Espera Dinâmica**
- **Agendamento Inteligente de Consultas**
- **Prontuário Eletrônico Completo**
- **Gestão de Equipes (Profissionais e Estudantes)**
- **Filtros Avançados e Busca Rápida**
- **Controle de Prioridade e Situação Clínica**
- **Painéis Específicos para Recepção, Fisioterapeutas e Estudantes**
- **Segurança e Privacidade dos Dados**

---

## 🏗️ Estrutura do Projeto

```
├── backend/                # API FastAPI, banco de dados, lógica de negócio
│   ├── controllers.py      # Rotas e controladores principais
│   ├── repositories/       # Camada de acesso a dados
│   ├── services/           # Serviços e integrações (RabbitMQ, etc)
│   ├── schemas.py          # Schemas Pydantic (validação)
│   └── ...
├── fisioclinic-IESI/       # Frontend React + Vite + Shadcn UI
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas principais
│   │   ├── hooks/          # Hooks customizados
│   │   └── lib/            # Funções utilitárias e API
│   └── ...
├── docker-compose.yml      # Orquestração de containers
├── Dockerfile              # Imagem do backend
└── README.md               # Este arquivo
```

---

## ⚡ Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) >= 18
- [Python](https://www.python.org/) >= 3.11
- [Docker](https://www.docker.com/) (opcional, recomendado)

### 1. Clone o repositório
```bash
 git clone https://github.com/seu-usuario/fisioclinic-iesi.git
 cd fisioclinic-iesi
```

### 2. Backend (API FastAPI)

#### Usando Docker (recomendado)
```bash
docker-compose up --build
```

#### Ou manualmente
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend (React + Vite)
```bash
cd fisioclinic-IESI/scr
npm install
npm run dev
```

Acesse: [http://localhost:8080](http://localhost:8080)

---

## 🧩 Tecnologias Utilizadas
- **Frontend:** React, Vite, TypeScript, Shadcn UI, TailwindCSS, React Query, React Router
- **Backend:** FastAPI, SQLAlchemy, Pydantic, SQLite, RabbitMQ
- **DevOps:** Docker, Docker Compose

---

## 📚 Documentação
- O backend expõe uma API RESTful documentada automaticamente via Swagger em [http://localhost:8000/docs](http://localhost:8000/docs)
- O frontend é modular, com componentes reutilizáveis e tipagem forte.

---

## 👥 Contribuição

Contribuições são bem-vindas! Siga as etapas abaixo:
1. Fork este repositório
2. Crie uma branch (`git checkout -b feature/sua-feature`)
3. Commit suas alterações (`git commit -m 'feat: minha contribuição'`)
4. Push para o branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

---

## 🛡️ Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <strong>Fisioclinic-IESI</strong> — Gestão séria, eficiente e inovadora para clínicas universitárias de fisioterapia.
</div>
