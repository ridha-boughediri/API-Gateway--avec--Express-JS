const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 3002;
const HOST = "localhost";

app.use(express.json());

app.get('/fakeapi', (req, res, next) => {
    res.send('Bonjour de la fake API pour test');
});

app.post('/bogusapi', (req, res, next) => {
    res.send('Bogus API dit shalom');
});

axios({
    method: 'POST',
    url: `http://localhost:3000/register`,
    headers: {
        "Content-Type": "application/json"
    },
    data: {
        apiName: "registrytest",
        protocol: "http",
        host: HOST,
        port: PORT,
        url: `http://${HOST}:${PORT}/`,
    }
}).then(response => {
    console.log(response.data);
}).catch(error => {
    console.error("Erreur lors de l'enregistrement de l'API:", error);
});

app.listen(PORT, () => {
    console.log('Le serveur de l\'API fake est sur le port ' + PORT);
});
