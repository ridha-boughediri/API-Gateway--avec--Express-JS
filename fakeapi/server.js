const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3002;
const HOST = "localhost";

app.use(express.json());

app.get('/fakeapi', (req, res) => {
    res.send('Bonjour de la fake API pour test');
});

app.post('/bogusapi', (req, res) => {
    res.send('Bogus API dit shalom');
});

// Fonction pour enregistrer le microservice auprès de l'API Gateway
async function registerMicroservice(retryCount = 0) {
    try {
        const response = await axios.post(`http://localhost:3000/register`, {
            apiName: "registrytest",
            protocol: "http",
            host: HOST,
            port: PORT,
            url: `http://${HOST}:${PORT}/`,
        });
        console.log("Microservice enregistré avec succès :", response.data);
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du microservice :", error.message);
        if (retryCount < 5) {
            console.log(`Tentative de reconnexion ${retryCount + 1}...`);
            setTimeout(() => registerMicroservice(retryCount + 1), 5000);
        }
    }
}

// Démarrage du serveur
const server = app.listen(PORT, () => {
    console.log('Le serveur de l\'API fake est sur le port ' + PORT);
    // Enregistrement du microservice après le démarrage du serveur
    registerMicroservice();
});
