const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Chemin correct vers registry.json
const registryPath = path.join(__dirname, 'routes', 'registry.json');
let registry; // Définir comme variable mutable

try {
    const registryData = fs.readFileSync(registryPath, 'utf8');
    registry = JSON.parse(registryData);
} catch (error) {
    console.error('Erreur lors de la lecture ou de l\'analyse de registry.json:', error);
    process.exit(1); // Arrêter l'application si le fichier de configuration ne peut être lu
}

// Importer les modules nécessaires
const loadbalancer = require('./utils/loadbalancer'); // Assurez-vous que le chemin est correct
const router = require('./routes/index'); // Chemin vers index.js dans routes

// Middleware de sécurité
app.use(helmet());
app.use(express.json());

// Utiliser les routes définies dans index.js
app.use('/', router);

app.listen(PORT, () => {
    console.log('Gateway a démarré sur le port ' + PORT);
});
