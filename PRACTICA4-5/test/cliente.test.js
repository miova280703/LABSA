const request = require('supertest');
const app = require('../src/cliente/cliente'); // Assuming your Express app is in app.js

describe('Pruebas de rutas', () => {
    it('Debería retornar "¡Hola, mundo!" al hacer una solicitud GET a /', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello World Cliente!');
    });
  });

  describe('Pruebas de verificacion de pedido', () => {
    it('Consulta del pedido id El repartidor ha recibido tu pedido', async () => {
      const response = await request(app).get('/verificar-pedido-repartidor/1');
      expect(response.status).toBe(200);
    });
    it('Consulta del pedido 1 El repartidor esta en camino a tu domicilio', async () => {
      const response = await request(app).get('/verificar-pedido-repartidor/1');
      expect(response.status).toBe(200);
    });
    it('Consulta del pedido id El repartidor ha llegado a tu domicilio', async () => {
      const response = await request(app).get('/verificar-pedido-repartidor/1');
      expect(response.status).toBe(200);
    });
    it('Consulta del pedido id El repartidor ha cancelado tu pedido debido a que te encuentras en una zona peligrosa ', async () => {
      const response = await request(app).get('/verificar-pedido-repartidor/1');
      expect(response.status).toBe(200);
    });

  });

  describe('Pruebas de verificacion de pedido', () => {
    it('Consulta del pedido id El repartidor ha recibido tu pedido', async () => {
      const response = await request(app).get('/consultar-pedido-restaurante/1');
      expect(response.status).toBe(200);
    });
    it('Consulta del pedido 1 El repartidor esta en camino a tu domicilio', async () => {
      const response = await request(app).get('/consultar-pedido-restaurante/1');
      expect(response.status).toBe(200);
    });
    it('Consulta del pedido id El repartidor ha llegado a tu domicilio', async () => {
      const response = await request(app).get('/consultar-pedido-restaurante/1');
      expect(response.status).toBe(200);
    });
    it('Consulta del pedido id El repartidor ha cancelado tu pedido debido a que te encuentras en una zona peligrosa ', async () => {
      const response = await request(app).get('/consultar-pedido-restaurante/1');
      expect(response.status).toBe(200);
    });

  });