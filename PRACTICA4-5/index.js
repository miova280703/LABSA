const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const { logger } = require('./logs');

const port = 7000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World! ESB');
});
/**
 * 
 * CLIENTE
 */

app.post('/cliente-pedido', (req, res) => {
    axios.post('http://localhost:4000/solicitar-pedido', req.body)
        .then((response) => {
            console.log(response.data);
            logger.info('Servicio ESB:  ' + response.data);
            res.status(200).json(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/cliente/restaurante-pedido/:id_pedido', (req, res) => {
    console.log(req.params.id_pedido);
    axios.get(`http://localhost:4000/consultar-pedido-restaurante/${req.params.id_pedido}`)
        .then((response) => {
            console.log(response.data);
            logger.info('Servicio ESB:  ' + response.data);
            res.status(200).json(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/cliente/repartidor-pedido/:id_pedido', (req, res) => {
    axios.get(`http://localhost:4000/verificar-pedido-repartidor/${req.params.id_pedido}`)
        .then((response) => {
            console.log(response.data);
            logger.info('Servicio ESB:  ' + response.data);
            res.status(200).json(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

/**
 * 
 * RESTAURANTE
 */
app.post('/restaurante-pedido', (req, res) => {
    axios.post('http://localhost:5000/recibir-pedido', req.body)
    .then((response) => {
        console.log(response.data);
        logger.info('Servicio ESB:  ' + response.data);
        res.status(200).json(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/restaurante/repartidor-notificar/:id_pedido', (req, res) => {
    axios.get(`http://localhost:5000/notificar-pedido-repartidor/${req.params.id_pedido}`)
    .then((response) => {
        console.log(response.data);
        logger.info('Servicio ESB:  ' + response.data);
        res.status(200).json(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/restaurante/cliente-informe/:id_pedido', (req, res) => {
    axios.get(`http://localhost:5000/informe-pedido-cliente/${req.params.id_pedido}`)
    .then((response) => {
        console.log(response.data);
        logger.info('Servicio ESB:  ' + response.data);
        res.status(200).json(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
});

/**
 * 
 * REPARTIDOR
 */

app.post('/repartidor-pedido', (req, res) => {
    axios.post('http://localhost:6000/recibir-pedido-repartidor', req.body)
    .then((response) => {
        console.log(response.data);
        logger.info('Servicio ESB:  ' + response.data);
        res.status(200).json(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/repartidor/cliente-informe/:id_pedido', (req, res) => {
    axios.get(`http://localhost:6000/informe-pedido-cliente/${req.params.id_pedido}`)
    .then((response) => {
        console.log(response.data);
        logger.info('Servicio ESB:  ' + response.data);
        res.status(200).json(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/repartidor/notificacion-entrega/:id_pedido', (req, res) => {
    axios.get(`http://localhost:6000/notificar-entrega/${req.params.id_pedido}`)
    .then((response) => {
        console.log(response.data);
        logger.info('Servicio ESB:  ' + response.data);
        res.status(200).json(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.listen(port, () => {
    console.log(`Servidor esta funcionando en http://localhost:${port}`);
});
