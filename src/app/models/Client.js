import Sequelize, { Model } from 'sequelize';

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
}

export default Client;
