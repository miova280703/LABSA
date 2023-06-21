const request = require('supertest');
const app = require('../src/repartidor/repartidor'); // Assuming your Express app is in app.js

describe('Pruebas de rutas', () => {
    it('Debería retornar "¡Hola, mundo!" al hacer una solicitud GET a /', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello World Repartidor!');
    });
  });

  describe('Pruebas de verificacion de pedido', () => {
    it('Informar del estado del pedido 1 Lo he recojido ', async () => {
      const response = await request(app).get('/informe-pedido-cliente/1');
      expect(response.status).toBe(200);
    });
    it('Informar del del estado del pedido 1 Me dirijo a tu domicilio', async () => {
      const response = await request(app).get('/informe-pedido-cliente/1');
      expect(response.status).toBe(200);
    });

  });

  describe('Pruebas de notificacion de pedido', () => {
    it('Consulta del pedido id El repartidor ha recibido tu pedido', async () => {
      const response = await request(app).get('/notificar-entrega/1');
      expect(response.status).toBe(200);
      expect(response.text).toBe('{\"msg\":\"Notificación de entrega del pedido 1\"}');
    });

  });