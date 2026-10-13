# Trabalho Prático 1 — Programação para a Web

- **Instituição:** Instituto Federal Sul-rio-grandense (IFSUL) - Campus Passo Fundo
- **Curso:** Bacharelado em Ciência da Computação
- **Disciplina:** Programação para a Web
- **Professora:** Jéssica Di Domênico
- **Aluno:** Daniel Cipriano da Silva

---

### Repositórios do Projeto

- **Aplicação Frontend (React / PWA):** [gerenciador-pesagens](https://github.com/danielc-silva/gerenciador-pesagens.git)
- **Backend / API (Node.js / Express / Drizzle ORM):** [api-gerenciador-pesagens](https://github.com/danielc-silva/api-gerenciador-pesagens.git)

---

# API - Gerenciador de Pesagens

API desenvolvida em **Node.js** com **Express**, **PostgreSQL** e **Drizzle ORM** para gerenciamento de piquetes, rebanho bovino e histórico de pesagens.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **PostgreSQL**
- **Drizzle ORM** & **Drizzle Kit**
- **CORS**

---

## Estrutura do Banco de Dados

O banco de dados relacional é estruturado com 3 tabelas vinculadas por chaves estrangeiras com exclusão em cascata (`ON DELETE CASCADE`):

1. **`piquetes`**: Áreas de pastagem (`idPiquete`, `rotulo`, `lotacaoMaxima`).
2. **`bovinos`**: Animais alocados nos piquetes (`numeroBrinco`, `nascimento`, `piqueteAlocado` $\rightarrow$ FK `piquetes.idPiquete`).
3. **`pesagens`**: Registros periódicos de peso (`idPesagem`, `pesoKg`, `dataPesagem`, `brincoAferido` $\rightarrow$ FK `bovinos.numeroBrinco`).

---

## Estrutura do Projeto

```text
api-gerenciador-pesagens/
├── package.json
├── index.js                  # Inicialização do Express e montagem das rotas
├── db.js                     # Conexão do pool PostgreSQL com o Drizzle
├── schema.js                 # Definição das tabelas Drizzle
├── drizzle.config.js         # Configurações do Drizzle Kit
├── entities/                 # Modelos de domínio puros
│   ├── Piquete.js
│   ├── Bovino.js
│   └── Pesagem.js
├── usecases/                 # Regras de negócio e persistência via Drizzle
│   ├── piqueteUseCases.js
│   ├── bovinoUseCases.js
│   └── pesagemUseCases.js
├── controllers/              # Validação de dados e respostas HTTP
│   ├── piqueteController.js
│   ├── bovinoController.js
│   └── pesagemController.js
└── routes/                   # Definição dos endpoints REST
    ├── rotasPiquetes.js
    ├── rotasBovinos.js
    └── rotasPesagens.js
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Servidor [PostgreSQL](https://www.postgresql.org/) rodando localmente (porta padrão `5432`)

---

## Como Executar a Aplicação

### 1. Clonar o repositório e entrar na pasta
```bash
git clone <URL_DO_REPOSITORIO>
cd api-gerenciador-pesagens

npm install
```

### 3. Configurar a Conexão com o Banco
Verifique e ajuste a string de conexão nos arquivos `db.js` e `drizzle.config.js`:
```javascript
postgres://postgres:sua_senha@localhost:5432/nome_do_banco
```

### 4. Sincronizar o Schema com o Banco (Opcional via Drizzle Kit)
Para criar ou atualizar as tabelas diretamente no banco de dados:
```bash
npx drizzle-kit push
```

### 5. Iniciar o Servidor
```bash
npm start
```

A API estará disponível em: **`http://localhost:3001`**.

### 6. Executar o Drizzle Studio (Painel Visual)
Em outro terminal, você pode inicializar a interface visual do banco:
```bash
npx drizzle-kit studio
```
Acesse pelo navegador em: [https://local.drizzle.studio](https://local.drizzle.studio).

---

## Endpoints da API

### Piquetes (`/piquetes`)
| Método | Endpoint | Descrição | Corpo da Requisição (JSON) |
|---|---|---|---|
| `GET` | `/piquetes` | Lista todos os piquetes | — |
| `POST` | `/piquetes` | Cria um novo piquete | `{"rotulo": "Pasto Norte", "lotacao_maxima": 25}` |
| `PUT` | `/piquetes/:id` | Atualiza dados do piquete | `{"rotulo": "Pasto Norte Atualizado", "lotacao_maxima": 30}` |
| `DELETE`| `/piquetes/:id` | Remove um piquete | — |

---

### Bovinos (`/bovinos`)
| Método | Endpoint | Descrição | Corpo da Requisição (JSON) |
|---|---|---|---|
| `GET` | `/bovinos` | Lista todos os bovinos | — |
| `POST` | `/bovinos` | Cadastra bovino (valida capacidade máxima) | `{"nascimento": "2023-05-10", "piquete_alocado": 1}` |
| `PUT` | `/bovinos/:brinco` | Atualiza/transfere bovino | `{"nascimento": "2023-05-10", "piquete_alocado": 2}` |
| `DELETE`| `/bovinos/:brinco` | Remove um animal | — |

---

### Pesagens (`/pesagens`)
| Método | Endpoint | Descrição | Corpo da Requisição (JSON) |
|---|---|---|---|
| `GET` | `/pesagens` | Lista todas as pesagens | — |
| `POST` | `/pesagens` | Registra pesagem vinculada ao brinco | `{"peso_kg": 485.50, "data_pesagem": "2024-04-10", "brinco_aferido": 1}` |
| `PUT` | `/pesagens/:id` | Atualiza um registro de pesagem | `{"peso_kg": 490.00, "data_pesagem": "2024-04-10", "brinco_aferido": 1}` |
| `DELETE`| `/pesagens/:id` | Remove uma pesagem | — |
