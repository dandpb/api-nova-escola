import * as Yup from 'yup';

import Client from '../models/Client';

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

    clients.rows = clients.rows.map(client =>
      client.parseObjectToResponse(client)
    );

    return res.json({ total: clients.count, lista: clients.rows });
  }

  async show(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(400).json({ error: 'Cliente não cadastrado' });
    }

    return res.json(client.parseObjectToResponse(client));
  }

  async store(req, res) {
    const validationSchema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      dataDeNascimento: Yup.date().required(),
    });

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

    const client = await Client.create(req.body);

    return res.json(client.parseObjectToResponse(client));
  }

  async update(req, res) {
    const validationSchema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      dataDeNascimento: Yup.date(),
    });

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

    const clientUpdated = await client.update(req.body);
    return res.json(clientUpdated.parseObjectToResponse(clientUpdated));
  }

  async destroy(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(400).json({ error: 'Cliente não cadastrado' });
    }

    await client.destroy();

    return res.status(200).json();
  }
}

export default new ClientController();
