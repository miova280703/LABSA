const request = require('supertest');
const app = require('../src/restaurante/restaurante'); // Assuming your Express app is in app.js

describe('Pruebas de rutas', () => {
    it('Debería retornar "¡Hola, mundo!" al hacer una solicitud GET a /', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello World Restaurante!');
    });
  });

  describe('Pruebas de informe de pedido', () => {
    it('Informar del estado del pedido 1 Lo he recojido ', async () => {
      const response = await request(app).get('/informe-pedido-cliente/1');
      expect(response.status).toBe(200);
    });

  });

  describe('Pruebas de notificacion de pedido', () => {
    it('Consulta del pedido id El repartidor ha recibido tu pedido', async () => {
      const response = await request(app).get('/notificar-pedido-repartidor/1');
      expect(response.status).toBe(200);
      expect(response.text).toBe('{\"msg\":\"Consulta del pedido 1 El pedido esta listo para recogerlo  \"}');
    });

  });