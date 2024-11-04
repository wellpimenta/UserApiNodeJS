const request = require('supertest');
const app = require('../server');

describe('User Endpoints', () => {
  it('criando um novo usuario', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({
        cpf: '12345678901',
        nome: 'Teste',
        dataNascimento: '1990-01-01',
        endereco: {
          rua: 'Rua Teste',
          numero: '123',
          complemento: 'Apto 1',
          bairro: 'Bairro Teste',
          cidade: 'Cidade Teste',
          estado: 'SP',
          cep: '12345-678',
        },
        criadoPor: 'admin',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('cpf');
  });
});
