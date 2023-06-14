const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { logger } = require('../../logs');
const { check } = require('express-validator');

const app = express();
const port = 6000;

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    logger.info('Hello World Repartidor!');
    res.send('Hello World Repartidor!');
});

app.post('/recibir-pedido-repartidor', [
    check('id_cliente', 'El id_cliente es obligatorio').not().isEmpty(),
    check('id_restaurante', 'El id_restaurante es obligatorio').not().isEmpty(),
    check('id_pedido', 'El id_pedido es obligatorio').not().isEmpty(),
    check('dirección_cliente', 'El dirección_cliente es obligatorio').not().isEmpty(),
    check('dirección_restaurante', 'El dirección_restaurante es obligatorio').not().isEmpty(),

]
    , (req, res) => {
        logger.info('Servicio Repartidor: Se ha recibido el siguiente pedido del cliente con id ' + req.body.id_cliente + ' del restaurante con id ' + req.body.id_restaurante);
        res.status(200).json({
            msg: 'Se ha recibido el siguiente pedido del cliente con id ' + req.body.id_cliente + ' del restaurante con id ' + req.body.id_restaurante
        });
    });

app.get('/informe-pedido-cliente/:id_pedido', (req, res) => {
    switch (Math.floor(Math.random() * 2) + 1) {
        case 1:
            logger.info('Servicio Repartidor: Informar del estado del pedido ' + req.params.id_pedido + ' Lo he recojido ');
            res.status(200).json({ msg: 'Informar del estado del pedido ' + req.params.id_pedido + ' Lo he recojido ' });
            break;
        case 2:
            logger.info('Servicio Repartidor: Informar del del estado del pedido ' + req.params.id_pedido + ' Me dirijo a tu domicilio ');
            res.status(200).json({ msg: 'Informar del del estado del pedido ' + req.params.id_pedido + ' Me dirijo a tu domicilio ' });
            break;
    }
});

app.get('/notificar-entrega/:id_pedido', (req, res) => {
    logger.info('Servicio Repartidor: Notificación de entrega del pedido ' + req.params.id_pedido );
    res.status(200).json({ msg: 'Notificación de entrega del pedido ' + req.params.id_pedido  });
});

app.listen(port, () => {
    console.log(`Servidor esta funcionando en http://localhost:${port}`);
});
