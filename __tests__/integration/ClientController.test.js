import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('ClientController', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register a client', async () => {
    const response = await request(app)
      .post('/cliente')
      .send({
        nome: 'José',
        email: 'jose@email.com',
        dataDeNascimento: '01/01/2002',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register a client with missing field', async () => {
    const response = await request(app)
      .post('/cliente')
      .send({
        nome: 'José',
        dataDeNascimento: '01/01/2002',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Falha na validação dos campos');
  });

  it('should not be able to register a client with a duplicated email', async () => {
    await request(app)
      .post('/cliente')
      .send({
        nome: 'José',
        email: 'jose@email.com',
        dataDeNascimento: '01/01/2002',
      });

    const response = await request(app)
      .post('/cliente')
      .send({
        nome: 'José',
        email: 'jose@email.com',
        dataDeNascimento: '01/01/2002',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Cliente já existe, email deve ser único');
  });

  it('should be able to list the clients with pagination', async () => {
    await request(app)
      .post('/cliente')
      .send({
        nome: 'José',
        email: 'jose@email.com',
        dataDeNascimento: '01/01/2002',
      });

    await request(app)
      .post('/cliente')
      .send({
        nome: 'Alberto',
        email: 'alberto@email.com',
        dataDeNascimento: '05/01/2012',
      });

    const response = await request(app)
      .get('/cliente?limite=1&pagina=1')
      .send();

    expect(response.body).toHaveProperty('lista');
    expect(response.body).toHaveProperty('total');

    expect(response.body.total).toBe(2);
    expect(response.body.lista.length).toBe(1);
  });

  it('should be able to see a client detail', async () => {
    const responsePost = await request(app)
      .post('/cliente')
      .send({
        nome: 'Alberto',
        email: 'alberto@email.com',
        dataDeNascimento: '05/01/2012',
      });

    const { id } = responsePost.body;
    const response = await request(app)
      .get(`/cliente/${id}`)
      .send();

    expect(response.body.nome).toBe('Alberto');
  });

  it("should not be able to see a client detail when client isn't registed", async () => {
    const response = await request(app)
      .get(`/cliente/1`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Cliente não cadastrado');
  });

  it('should be able to update a client data', async () => {
    const responsePost = await request(app)
      .post('/cliente')
      .send({
        nome: 'José',
        email: 'jose@email.com',
        dataDeNascimento: '01/01/2002',
      });

    const { id } = responsePost.body;
    const response = await request(app)
      .put(`/cliente/${id}`)
      .send({
        nome: 'Francisco',
      });

    expect(response.body.nome).toBe('Francisco');
  });

  it('should not be able to update a client data without the correct fields', async () => {
    const responsePost = await request(app)
      .post('/cliente')
      .send({
        nome: 'José',
        email: 'jose@email.com',
        dataDeNascimento: '01/01/2002',
      });

    const { id } = responsePost.body;
    const response = await request(app)
      .put(`/cliente/${id}`)
      .send({
        email: '123456',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Falha na validação dos campos');
  });

  it("should not be able to update a client data when client isn't registed", async () => {
    const response = await request(app)
      .put(`/cliente/1`)
      .send({
        nome: '123456',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Cliente não cadastrado');
  });

  it('should not be able to update a client data using a duplicated email', async () => {
    await request(app)
      .post('/cliente')
      .send({
        nome: 'Francisco',
        email: 'francisco@email.com',
        dataDeNascimento: '12/12/1950',
      });

    const responsePost = await request(app)
      .post('/cliente')
      .send({
        nome: 'José',
        email: 'jose@email.com',
        dataDeNascimento: '01/01/2002',
      });

    const { id } = responsePost.body;
    const response = await request(app)
      .put(`/cliente/${id}`)
      .send({
        email: 'francisco@email.com',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Cliente já existe, email deve ser único');
  });

  it('should be able to remove a client', async () => {
    const responsePost = await request(app)
      .post('/cliente')
      .send({
        nome: 'José',
        email: 'jose@email.com',
        dataDeNascimento: '01/01/2002',
      });

    const { id } = responsePost.body;
    const response = await request(app)
      .delete(`/cliente/${id}`)
      .send();

    expect(response.status).toBe(200);
  });

  it("should not be able to remove a client when the client isn't registed", async () => {
    const response = await request(app)
      .delete(`/cliente/1`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Cliente não cadastrado');
  });
});
