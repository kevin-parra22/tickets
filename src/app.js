const express = require('express');
const route = require('./routes/route');

const app = express();

app.use(express.json());

const PORT = 1008;

app.use('/routes', route);

app.listen(PORT, () => {
    console.log(`Aplicación siendo ejecutada en puerto ${PORT}`)
});
