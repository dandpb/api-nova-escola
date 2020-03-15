# Api NovaEscola

## :information_source: Principais objetivos do projeto:

Fazer BACKEND de um CRUD clássico para Cliente com as funcionalidades abaixo:
- Cadastro do cliente
- Listagem do cliente
- Detalhamento do cliente
- Alteração do cliente
- Remoção do cliente


## :rocket: Tecnologias

Esse projeto foi desenvolvido para o desafio da Nova Escola com as tecnologias a seguir:
-  [NodeJS](https://nodejs.org/)
-  [MySQL Community Server 5.7](https://www.mysql.com/products/community/)
-  [Digital Ocian Cloud](https://www.digitalocean.com/)
-  [Buddy CI/CD](https://buddy.works)

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. From your command line:

```bash

# Clone this repository
$ git clone https://github.com/dandpb/apiNovaEscola

# Go into the repository
$ cd apiNovaEscola

# instalar dependências
$ yarn install

#criar o banco de dados no mysql
create database api_nova_escola_db;

#rodar migrations
yarn sequelize db:migrate

# rodar a aplicação
$ yarn dev

# rodar a aplicação no modo de debugger
$ yarn dev:debugger



```
## :memo: Como testar as request's
Usar o [Insomnia](https://insomnia.rest/), importar o workspace pegando o arquivo 'insomnia_api_nova_escola.json' na raiz do projeto para testar localmente.

Usar o [Insomnia](https://insomnia.rest/), importar o workspace pegando o arquivo 'insomnia_api_nova_escola_servidor_externo.json' na raiz do projeto para testar externamente. A api está hospedada no endereço http://novaescola.dbarreto.com.br/api/


## :memo: Integração continua
A integração continua foi feita usando o serviço do https://buddy.works/ . Toda vez que acontece um push na branch 'master', acontece o Build e Deploy na api hospedada no endereço http://novaescola.dbarreto.com.br/api/ . Ao termino do pipeline recebo uma notificação por email.


## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Made with ♥ by Daniel Barreto :wave: [Get in touch!](https://www.linkedin.com/in/daniel-barreto-65055a34/)
