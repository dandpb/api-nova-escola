import * as Yup from 'yup';
import Client from '../models/Client';

const validationSchema = Yup.object().shape({
  nome: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  dataDeNascimento: Yup.date().required(),
});

// index, show, store, update, destoy
class ClientController {
  async index(req, res) {
    const { limite, pagina } = req.query;
    const limit = Number(limite);
    const offset = (Number(pagina) - 1) * limit;

    const clients = await Client.findAndCountAll({
      limit,
      offset,
    });

    return res.json(clients);
  }

  async show(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(400).json({ error: 'Cliente não cadastrado' });
    }

    return res.json(client);
  }

  async store(req, res) {
    if (!(await validationSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const clientExists = await Client.findOne({
      where: { email: req.body.email },
    });

    if (clientExists) {
      return res
        .status(400)
        .json({ error: 'Cliente já existe, email deve ser único' });
    }

    const { id, nome, email, dataDeNascimento } = await Client.create(req.body);

    return res.json({ id, nome, email, dataDeNascimento });
  }

  async update(req, res) {
    if (!(await validationSchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const { email } = req.body;

    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(400).json({ error: 'Cliente não cadastrado' });
    }

    if (email && email !== client.email) {
      const clientExists = await Client.findOne({ where: { email } });

      if (clientExists) {
        return res
          .status(400)
          .json({ error: 'Cliente já existe, email deve ser único' });
      }
    }

    const { nome, dataDeNascimento } = await client.update(req.body);

    return res.json({ id, email, nome, dataDeNascimento });
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Client.destroy({ where: { id } });

    return res.status(200).json();
  }
}

export default new ClientController();
