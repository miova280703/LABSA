const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { logger } = require('../../logs');
const { check } = require('express-validator');

const app = express();
const port = 4000;

app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    logger.info('Hello World Cliente!');
    res.send('Hello World Cliente!');
});

app.post('/solicitar-pedido', [
    check('id_restaurante', 'El id del restaurante es obligatorio').not().isEmpty(),
    check('direccion_cliente', 'La direccion es obligatoria').not().isEmpty(),
    check('pedido', 'El pedido es obligatorio').not().isEmpty(),
    check('cantidad', 'El apellido es obligatorio').not().isEmpty(),
    check('pago', 'El pago no es valido').isEmail(),
    check('monto', 'La fecha es obligatoria').not().isEmpty(),

]
    , (req, res) => {
        const id_pedido = Math.floor(Math.random() * 1000) + 1;
        logger.info('Servicio Cliente: El cliente realizo este pedido: ' +req.body.pedido + ' con la cantidad de ' + req.body.cantidad + ' con el metodo de pago ' + req.body.pago + ' con el monto de ' + req.body.monto
        +'\n El id del producto es :'+id_pedido);
        res.status(200).json({
            msg: 'Tu pedido se ha procesado con exito, el id de tu pedido es: ' + id_pedido
        });
    });

app.get('/consultar-pedido-restaurante/:id_pedido', (req, res) => {
    switch (Math.floor(Math.random() * 4) + 1) {
        case 1:
            logger.info('Servicio Cliente: Consulta del pedido ' + req.params.id_pedido + ' El restaurante ha recibido tu pedido ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' El restaurante ha recibido tu pedido ' });
            break;
        case 2:
            logger.info('Servicio Cliente: Consulta del pedido ' + req.params.id_pedido + ' El restaurane esta preparando tu pedido  ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' El restaurane esta preparando tu pedido  ' });
            break;
        case 3:
            logger.info('Servicio Cliente: Consulta del pedido ' + req.params.id_pedido + ' El restaurante esta empacando tu pedido ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' El restaurante esta empacando tu pedido ' });
            break;
        case 4:
            logger.info('Servicio Cliente: Consulta del pedido ' + req.params.id_pedido + ' El restaurante ha cancelado tu pedido por falta de ingredientes ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' El restaurante ha cancelado tu pedido por falta de ingredientes ' });
    }
});

app.get('/verificar-pedido-repartidor/:id_pedido', (req, res) => {
    switch (Math.floor(Math.random() * 4) + 1) {
        case 1:
            logger.info('Servicio Cliente: Consulta del pedido ' + req.params.id_pedido + ' El repartidor ha recibido tu pedido ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' El repartidor ha recibido tu pedido ' });
            break;
        case 2:
            logger.info('Servicio Cliente: Consulta del pedido ' + req.params.id_pedido + ' El repartidor esta en camino a tu domicilio ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' El repartidor esta en camino a tu domicilio ' });
            break;
        case 3:
            logger.info('Servicio Cliente: Consulta del pedido ' + req.params.id_pedido + ' El repartidor ha llegado a tu domicilio ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' El repartidor ha llegado a tu domicilio ' });
            break;
        case 4:
            logger.info('Servicio Cliente: Consulta del pedido ' + req.params.id_pedido + ' El repartidor ha cancelado tu pedido debido a que te encuentras en una zona peligrosa ');
            res.status(200).json({ msg: 'Consulta del pedido ' + req.params.id_pedido + ' El repartidor ha cancelado tu pedido debido a que te encuentras en una zona peligrosa ' });
    }
});

app.listen(port, () => {
    console.log(`Servidor esta funcionando en http://localhost:${port}`);
});
