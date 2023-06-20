const request = require('supertest');
const app = require('../src/cliente/cliente.js'); // Assuming your Express app is in app.js

describe('GET /solicitar-pedido', () => {
  test('should return a list of users', async () => {
    const response = await request(app).get('/consultar-pedido-restaurante/1');
    expect(response.status).toBe(200);
    // expect(response.text).toEqual('Se solicito el pedido al restaurante con id ' + 1);
  });
});