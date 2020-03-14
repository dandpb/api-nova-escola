import Sequelize, { Model } from 'sequelize';
import dateFormat from 'date-fns/format';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        dataDeNascimento: Sequelize.DATE,
      },
      { sequelize }
    );
  }

  parseObjectToResponse(client) {
    const { id, nome, email, dataDeNascimento } = client;
    const birthDateFormat = dateFormat(dataDeNascimento, 'dd/MM/yyyy');

    return { id, nome, email, dataDeNascimento: birthDateFormat };
  }
}

export default Client;
