import * as Yup from 'yup';
import Client from '../models/Client';

// index, show, store, update, destoy
class ClientController {
  async index(req, res) {
    const { limite, pagina } = req.query;

    const clients = await Client.find({});

    return res.json(clients);
  }

  async show(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    return res.json(client);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      dataDeNascimento: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const clientExists = await Client.findOne({
      where: { email: req.body.email },
    });

    if (clientExists) {
      return res.status(400).json({ error: 'Client already exists.' });
    }

    const { id, nome, email, dataDeNascimento } = await Client.create(req.body);

    return res.json({ id, nome, email, dataDeNascimento });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      dataDeNascimento: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const client = await Client.findByPk(req.clientId);

    if (email && email !== client.email) {
      const clientExists = await Client.findOne({ where: { email } });

      if (clientExists) {
        return res.status(400).json({ error: 'Client already exists.' });
      }
    }

    const { id, nome, dataDeNascimento } = await client.update(req.body);

    return res.json({ id, email, nome, dataDeNascimento });
  }

  async destroy(req, res) {
    return res.json('ok');
  }
}

export default new ClientController();
