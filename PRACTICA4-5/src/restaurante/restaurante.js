const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { logger } = require('../../logs');
const { check } = require('express-validator');

const app = express();
const port = 5000;

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    logger.info('Hello World Restaurante!');
    res.send('Hello World Restaurante!');
});

app.post('/recibir-pedido', [
    check('id_cliente', 'El id_cliente es obligatorio').not().isEmpty(),
    check('cantidad', 'El apellido es obligatorio').not().isEmpty(),
    check('pedido', 'El pedido es obligatorio').not().isEmpty(),

]
    , (req, res) => {
        logger.info('Servicio Restaurante: Se ha recibido el siguiente pedido del cliente con id ' + req.body.id_cliente + ' con la cantidad de ' + req.body.cantidad + ' de ' + req.body.pedido);
        res.status(200).json({
            msg: 'Se ha recibido el siguiente pedido del cliente con id ' + req.body.id_cliente + ' con la cantidad de ' + req.body.cantidad + ' de ' + req.body.pedido
        });
    });

app.get('/informe-pedido-cliente/:id_pedido', (req, res) => {
    switch (Math.floor(Math.random() * 4) + 1) {
        case 1:
            logger.info('Servicio Restaurante: Informar del pedido ' + req.params.id_pedido + ' Lo hemos recibido ');
            res.status(200).json({ msg: 'Informar del pedido ' + req.params.id_pedido + ' Lo hemos recibido ' });
            break;
        case 2:
            logger.info('Servicio Restaurante: Informar del pedido ' + req.params.id_pedido + ' Lo estamos preparando ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' Lo estamos preparando ' });
            break;
        case 3:
            logger.info('Servicio Restaurante: Informar del pedido ' + req.params.id_pedido + ' Lo estamos empacando ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' Lo estamos empacando ' });
            break;
        case 4:
            logger.info('Servicio Restaurante: Informar del pedido ' + req.params.id_pedido + ' Se ha entregado al repartidor ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' Se ha entregado al repartidor ' });
    }
});

app.get('/notificar-pedido-repartidor/:id_pedido', (req, res) => {
    logger.info('Servicio Restaurante: Consulta del pedido ' + req.params.id_pedido + ' El pedido esta listo para recogerlo ');
    res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' El pedido esta listo para recogerlo  ' });
});

app.listen(port, () => {
    console.log(`Servidor esta funcionando en http://localhost:${port}`);
});

module.exports = app;