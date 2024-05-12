const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 3002;
const HOST = "http://localhost"; // Supprimez la virgule ici

app.use(express.json());

app.get('/fakeapi', (req, res, next) => {
    res.send('Bonjour de la fake API pour test');
});

app.post('/bogusapi', (req, res, next) => {
    res.send('Bogus API dit shalom');
});

// Déplacez l'appel à l'API de registre en dehors de la méthode listen
axios({
    method: 'POST',
    url: `http://localhost:3000/register`,
    headers: {
        "Content-Type": "application/json"
    },
    data: {
        apiName: "registrytest",
        host: HOST,
        port: PORT,
        url: HOST + ":" + PORT + "/",
    }
}).then(response => {
    console.log(response.data);
}).catch(error => {
    console.error("Erreur lors de l'enregistrement de l'API:", error);
});

app.listen(PORT, () => {
    console.log('Le serveur de l\'API fake est sur le port ' + PORT);
});
