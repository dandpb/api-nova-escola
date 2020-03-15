# apiNovaEscola

Principais objetivos do projeto:

BACKEND
Fazer um CRUD clássico para Cliente com as funcionalidades abaixo:
- Cadastro do cliente
- Listagem do cliente
- Detalhamento do cliente
- Alteração do cliente
- Remoção do cliente


## :rocket: Technologies

This project was developed at the nova escola changele with the following technologies:

-  [NodeJS](https://nodejs.org/)
5.7.19 MySQL Community Server

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. From your command line:

```bash

# Clone this repository
$ git clone https://github.com/dandpb/apiNovaEscola

# Go into the repository
$ cd apiNovaEscola

# Install dependencies
$ yarn install

#criar db no mysql
create database api_nova_escola_db;

#rodar migrations
yarn sequelize db:migrate

# Run the app
$ yarn dev

```
## :memo: Como testar as request's
Usar o Insomnia, importar o workspace pegando o arquivo 'insomnia_api_nova_escola.json' na raiz do projeto para testar localmente.

Usar o Insomnia, importar o workspace pegando o arquivo 'insomnia_api_nova_escola_servidor_externo.json' na raiz do projeto para testar externamente. A api está hospedada no endereço http://134.122.123.128/api/



## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Made with ♥ by Daniel Barreto :wave: [Get in touch!](https://www.linkedin.com/in/daniel-barreto-65055a34/)
