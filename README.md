API de Cadastro de Usuários
Índice
Descrição
Estrutura do Projeto
Tecnologias Utilizadas
Pré-requisitos
Configuração do Ambiente
Instalação
Modelos de Dados
Endpoints da API
Testes
Contribuições
Licença
Descrição
Esta API de Cadastro de Usuários foi desenvolvida utilizando Node.js, com autenticação JWT e persistência de dados em MySQL. A API foi construída com arquitetura RESTful, seguindo padrões de segurança e boas práticas para gerenciamento de usuários e permissões.

A API permite que você:

Cadastre novos usuários com dados completos de identificação e endereço.
Realize autenticação e autorização através de JWT.
Atualize dados do usuário e aplique remoção lógica (soft delete).
Consulte o status de usuários.
Estrutura do Projeto
A estrutura do projeto é organizada da seguinte forma:

bash
Copiar código
/user-registration
├── /src
│   ├── /controllers       # Controladores para manipulação de requisições
│   ├── /models            # Modelos de dados (Sequelize)
│   ├── /routes            # Rotas da API
│   ├── /middleware        # Middleware para autenticação JWT
│   └── /config            # Configurações de banco de dados
├── /tests                 # Testes unitários
├── server.js              # Arquivo principal do servidor
├── .env                   # Variáveis de ambiente
└── README.md              # Documentação da API
Tecnologias Utilizadas
Node.js
Express
MySQL com Sequelize
JWT para autenticação
Bcrypt.js para hash de senhas
Jest e Supertest para testes unitários
Pré-requisitos
Para rodar esta aplicação, você precisa ter instalado:

Node.js (versão 14 ou superior)
MySQL (versão 5.7 ou superior)
Um gerenciador de pacotes como npm ou yarn
Configuração do Ambiente
Crie um arquivo .env na raiz do projeto e configure as seguintes variáveis de ambiente:

env
Copiar código
DB_HOST=localhost            # Host do MySQL
DB_USER=seu_usuario          # Usuário do MySQL
DB_PASS=sua_senha            # Senha do MySQL
DB_NAME=userDB               # Nome do banco de dados
JWT_SECRET=sua_chave_secreta # Chave secreta para JWT
Nota: Crie um banco de dados no MySQL com o nome definido na variável DB_NAME antes de iniciar a API.

Instalação
Clone este repositório e acesse o diretório do projeto:

bash
Copiar código
git clone <url-do-repositorio>
cd user-registration
Instale as dependências:

bash
Copiar código
npm install
Sincronize o banco de dados (irá criar tabelas automaticamente):

bash
Copiar código
node server.js
Acesse a API em http://localhost:3000.

Modelos de Dados
Usuário
Campos principais:
id (chave primária, gerada automaticamente)
cpf (string, chave única)
nome (string)
dataNascimento (data)
endereco (JSON)
rua, numero, complemento, bairro, cidade, estado, cep
status (Ativo ou Removido)
Campos de auditoria: criadoEm, atualizadoEm, removidoEm, criadoPor, atualizadoPor, removidoPor
Endpoints da API
Método	Rota	Descrição
POST	/api/login	Autentica um usuário e retorna um token JWT.
POST	/api/usuarios	Cria um novo usuário. Requer token JWT.
PUT	/api/usuarios/:id	Atualiza os dados de um usuário pelo id. Requer token JWT.
DELETE	/api/usuarios/:id	Aplica remoção lógica em um usuário pelo id. Requer token JWT.
Exemplo de Requisições
1. Autenticação (Login)
Rota: /api/login

Método: POST

Body:

json
Copiar código
{
  "cpf": "12345678901",
  "senha": "sua_senha"
}
Resposta:

json
Copiar código
{
  "token": "jwt_token"
}
2. Criar Usuário
Rota: /api/usuarios

Método: POST

Headers: Authorization: Bearer jwt_token

Body:

json
Copiar código
{
  "cpf": "12345678901",
  "nome": "Fulano de Tal",
  "dataNascimento": "1990-01-01",
  "endereco": {
    "rua": "Rua A",
    "numero": "123",
    "complemento": "Apto 1",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "12345-678"
  },
  "criadoPor": "admin"
}
3. Atualizar Usuário
Rota: /api/usuarios/:id

Método: PUT

Headers: Authorization: Bearer jwt_token

Body:

json
Copiar código
{
  "nome": "Fulano de Tal Atualizado",
  "endereco": {
    "rua": "Rua B",
    "numero": "456"
  },
  "atualizadoPor": "admin"
}
4. Remover Usuário (Soft Delete)
Rota: /api/usuarios/:id

Método: DELETE

Headers: Authorization: Bearer jwt_token

Body:

json
Copiar código
{
  "removidoPor": "admin"
}
Testes
Para rodar os testes unitários, use o comando:

bash
Copiar código
npm test
Testes de Exemplo
O arquivo tests/user.test.js contém testes para as principais funcionalidades da API, como:

Criação de usuários
Autenticação de usuários
Atualização de dados
Remoção lógica de usuários
Contribuições
Contribuições são bem-vindas! Se você quiser sugerir melhorias ou corrigir bugs, faça um fork deste repositório, crie uma nova branch com suas alterações e envie um pull request.

Licença
Este projeto é licenciado sob a licença MIT.
