
---

### README for the Backend Repository ([back](http://_vscodecontentref_/1))

```markdown
# Web Mensagens - Backend

Este é o repositório do backend do projeto **Web Mensagens**, uma API RESTful desenvolvida com **Node.js**, **Express** e **Sequelize** para gerenciar mensagens, usuários e grupos.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação de APIs.
- **Sequelize**: ORM para banco de dados relacional.
- **PostgreSQL**: Banco de dados utilizado.
- **Multer**: Upload de arquivos.
- **Argon2**: Hashing de senhas.

## Estrutura do Projeto

- `src/models`: Modelos Sequelize para as tabelas do banco de dados.
- `src/services`: Lógica de negócios e manipulação de dados.
- `src/controllers`: Controladores para as rotas da API.
- `src/routes`: Definição das rotas da API.
- `src/config`: Configuração do servidor Express.
- `uploads`: Diretório para armazenamento de arquivos enviados.

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/joaopaulo0007/back-web-mensagens
   cd back
2. Instale as depêndencias:
   ```bash
   npm install --force
3. Configure as variáveis de ambiente no arquivo .env:
   DATABASE_URL=postgres://<usuario>:<senha>@<host>:<porta>/<banco>
4. Inicie o servidor:
   npm run dev
5. A api estará disponível em http://localhost:8080.

6. Funcionalidades:
    Registro e autenticação de usuários.
    Criação e gerenciamento de grupos.
    Envio e recebimento de mensagens.
    Upload de arquivos.
    Notificações de mensagens.
7. Banco de Dados:
    O banco de dados utilizado é o PostgreSQL. 