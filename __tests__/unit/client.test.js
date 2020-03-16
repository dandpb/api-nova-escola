import Client from '../../src/app/models/Client';

import truncate from '../util/truncate';

describe('Client Model', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should create a client instance ', async () => {
    const client = await Client.create({
      nome: 'José',
      email: 'jose@email.com',
      dataDeNascimento: '01/01/2002',
    });

    expect(client).toHaveProperty('id');
    expect(client).toHaveProperty('nome');
    expect(client).toHaveProperty('email');
    expect(client).toHaveProperty('dataDeNascimento');
    expect(client).toHaveProperty('createdAt');
    expect(client).toHaveProperty('updatedAt');
  });

  it('should return a parsed client obj', async () => {
    const client = await Client.create({
      nome: 'José',
      email: 'jose@email.com',
      dataDeNascimento: '01/01/2002',
    });

    const clientParsed = client.parseObjectToResponse(client);

    expect(clientParsed).not.toHaveProperty('createdAt');
    expect(clientParsed).not.toHaveProperty('updatedAt');
  });
});
